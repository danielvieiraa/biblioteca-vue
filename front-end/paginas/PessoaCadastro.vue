<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '@/componentes/Navbar.vue';

const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);
const pessoa = ref('');
const email = ref('');
const telefone = ref('');

const voltar = () => {
  router.push('/pessoas');
};

const inserir = async () => {
  try {
    const json = {
      pessoa: pessoa.value,
      email: email.value,
      telefone: telefone.value,
    };
    await axios.post('http://localhost:4000/pessoa/', json);
    voltar();
  } catch (error) {
    console.error('Erro ao inserir pessoa:', error);
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
      pessoa: pessoa.value,
      email: email.value,
      telefone: telefone.value,
    };
    await axios.put(`http://localhost:4000/pessoa/${id.value}`, json);
    voltar();
  } catch (error) {
    console.error('Erro ao alterar pessoa:', error);
  }
};

const excluir = async () => {
  if (window.confirm('Deseja mesmo excluir?')) {
    try {
      await axios.delete(`http://localhost:4000/pessoa/${id.value}`);
      voltar();
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
    }
  }
};
</script>

<template>
  <Navbar></Navbar>
  <div class="container">
    <h1>{{ id ? 'Alterar Pessoa' : 'Inserir Pessoa' }}</h1>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label for="pessoa" class="form-label">Insira o nome da Pessoa:</label>
        <input type="text" placeholder="Insira aqui" class="form-control" id="pessoa" v-model="pessoa" />
      </div>
      <div class="mb-3">
        <label for="autor" class="form-label">Insira o email da pessoa:</label>
        <input type="text" placeholder="Insira aqui" class="form-control" id="email" v-model="email" />
      </div>
      <div class="mb-3">
        <label for="telefone" class="form-label">Telefone</label>
        <input type="text" class="form-control" id="telefone" v-model="telefone" />
      </div>
      <button type="submit" class="btn btn-primary me-2">Salvar</button>
      <button type="button" class="btn btn-secondary me-2" @click="voltar">Cancelar</button>
      <button type="button" class="btn btn-danger me-2" v-if="id" @click="excluir">Excluir</button>
    </form>
  </div>
</template>
