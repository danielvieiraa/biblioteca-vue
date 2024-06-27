<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '@/componentes/Navbar.vue';

const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);
const autor = ref('');

const voltar = () => {
  router.push('/autores');
};

const inserir = async () => {
  try {
    const json = {
      autor: autor.value, 
    };
    await axios.post('http://localhost:4000/autor/', json);
    voltar();
  } catch (error) {
    console.error('Erro ao inserir autor:', error);
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
      autor: autor.value, // Acessando o valor de autor corretamente
    };
    await axios.put(`http://localhost:4000/autor/${id.value}`, json);
    voltar();
  } catch (error) {
    console.error('Erro ao alterar autor:', error);
  }
};

const excluir = async () => {
  if (window.confirm('Deseja mesmo excluir?')) {
    try {
      await axios.delete(`http://localhost:4000/autor/${id.value}`);
      voltar();
    } catch (error) {
      console.error('Erro ao excluir autor:', error);
    }
  }
};
</script>

<template>
  <Navbar></Navbar>
  <div class="container">
    <h1>{{ id ? 'Alterar Autor' : 'Inserir Autor' }}</h1>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label for="autor" class="form-label">Nome do Autor</label>
        <input type="text" class="form-control" id="autor" v-model="autor" />
      </div>
      <button type="submit" class="btn btn-primary me-2">Salvar</button>
      <button type="button" class="btn btn-secondary me-2" @click="voltar">Cancelar</button>
      <button type="button" class="btn btn-danger me-2" v-if="id" @click="excluir">Excluir</button>
    </form>
  </div>
</template>
