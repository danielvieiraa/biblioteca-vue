<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);
const nome = ref('');
const email = ref('');
const senha = ref('');

const voltar = () => {
  router.push('/funcionarios');
};

const inserir = async () => {
  try {
    const json = {
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    };
    await axios.post('http://localhost:4000/funcionario/', json);
    voltar();
  } catch (error) {
    console.error('Erro ao inserir funcionario:', error);
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
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    };
    await axios.put(`http://localhost:4000/funcionario/${id.value}`, json);
    voltar();
  } catch (error) {
    console.error('Erro ao alterar funcionario:', error);
  }
};

const excluir = async () => {
  if (window.confirm('Deseja mesmo excluir?')) {
    try {
      await axios.delete(`http://localhost:4000/funcionario/${id.value}`);
      voltar();
    } catch (error) {
      console.error('Erro ao excluir funcionario:', error);
    }
  }
};
</script>

<template>
  <div>
    <h1>{{ id ? 'Alterar Funcionario' : 'Inserir Funcionario' }}</h1>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label for="autor" class="form-label">Nome do Funcionario</label>
        <input type="text" class="form-control" id="nome" v-model="nome" />
      </div>
      <div class="mb-3">
        <label for="autor" class="form-label">Email do Funcionario</label>
        <input type="text" class="form-control" id="email" v-model="email" />
      </div>
      <div class="mb-3">
        <label for="autor" class="form-label">Senha</label>
        <input type="text" class="form-control" id="senha" v-model="senha" />
      </div>
      <button type="submit" class="btn btn-primary me-2">Salvar</button>
      <button type="button" class="btn btn-secondary me-2" @click="voltar">Cancelar</button>
      <button type="button" class="btn btn-danger me-2" v-if="id" @click="excluir">Excluir</button>
    </form>
  </div>
</template>
