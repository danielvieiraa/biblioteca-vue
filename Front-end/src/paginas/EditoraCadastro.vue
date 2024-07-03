<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '@/componentes/Navbar.vue';

const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);
const editora = ref('');

const voltar = () => {
  router.push('/editoras');
};

const inserir = async () => {
  try {
    const json = {
      editora: editora.value,
    };
    await axios.post('http://localhost:4000/editora/', json);
    voltar();
  } catch (error) {
    console.error('Erro ao inserir editora:', error);
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
      editora: editora.value,
    };

    await axios.put(`http://localhost:4000/editora/${id.value}`, json);
    voltar();
  } catch (error) {
    console.error('Erro ao alterar editora:', error);
  }
};

const excluir = async () => {
  if (window.confirm('Deseja mesmo excluir?')) {
    try {
      await axios.delete(`http://localhost:4000/editora/${id.value}`);
      voltar();
    } catch (error) {
      console.error('Erro ao excluir editora:', error);
    }
  }
};
const carregareditora = async () => {
  if (id.value) {
    try {
      const response = await axios.get(`http://localhost:4000/editora/${id.value}`);
      const editoras = response.data;
      editora.value = editoras.editora;
    } catch (error) {
      console.error('Erro ao carregar Autor:', error);
    }
  }
};
carregareditora();
</script>

<template>
  <Navbar></Navbar>
  <div class="container">
    <h1>{{ id ? 'Alterar Editora' : 'Inserir Editora' }}</h1>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label for="pessoa" class="form-label">Insira o nome da Editora:</label>
        <input type="text" placeholder="Insira aqui" class="form-control" id="editora" v-model="editora" />
      </div>
      <button type="submit" class="btn btn-primary me-2">Salvar</button>
      <button type="button" class="btn btn-secondary me-2" @click="voltar">Cancelar</button>
      <button type="button" class="btn btn-danger me-2" v-if="id" @click="excluir">Excluir</button>
    </form>
  </div>
</template>
