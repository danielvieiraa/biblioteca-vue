<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '@/componentes/Navbar.vue';

const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);
const categoria = ref('');

const voltar = () => {
  router.push('/categorias');
};

const inserir = async () => {
  try {
    const json = {
      categoria: categoria.value,
    };
    await axios.post('http://localhost:4000/categoria/', json);
    voltar();
  } catch (error) {
    console.error('Erro ao inserir categoria:', error);
  }
};

const salvar = async () => {
  if (id.value) {
    alterar();
  } else {
    inserir();
  }
};

const alterar = async () => {
  try {
    const json = {
      categoria: categoria.value,
    };

    await axios.put(`http://localhost:4000/categoria/${id.value}`, json);
    voltar();
  } catch (error) {
    console.error('Erro ao alterar categoria:', error);
  }
};

const excluir = async () => {
  if (window.confirm('Deseja mesmo excluir?')) {
    try {
      await axios.delete(`http://localhost:4000/categoria/${id.value}`);
      voltar();
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  }
};
const carregarcategoria = async () => {
  if (id.value) {
    try {
      const response = await axios.get(`http://localhost:4000/categoria/${id.value}`);
      const categorias = response.data;
      categoria.value = categorias.categoria;
    } catch (error) {
      console.error('Erro ao carregar Autor:', error);
    }
  }
};
carregarcategoria();
</script>

<template>
  <Navbar></Navbar>
  <div class="container">
    <h1>{{ id ? 'Alterar Categoria' : 'Inserir Categoria' }}</h1>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label for="categoria" class="form-label">Insira o nome da Categoria:</label>
        <input type="text" placeholder="Insira aqui" class="form-control" id="categoria" v-model="categoria" />
      </div>
      <button type="submit" class="btn btn-primary me-2">Salvar</button>
      <button type="button" class="btn btn-secondary me-2" @click="voltar">Cancelar</button>
      <button type="button" class="btn btn-danger me-2" v-if="id" @click="excluir">Excluir</button>
    </form>
  </div>
</template>
