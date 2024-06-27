<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Navbar from '@/componentes/Navbar.vue';
const router = useRouter();
const funcionarios = ref([]);

const listarFuncionarios = async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/funcionario');
    funcionarios.value = data;
  } catch (error) {
    console.error('Erro ao buscar funcionarios:', error);
  }
};

const adicionar = () => {
  router.push(`/funcionario`);
};

const verDetalhes = (id) => {
  router.push(`/funcionario/${id}`);
};

onMounted(() => {
  listarFuncionarios();
});
</script>

<template>
  <div>
    <Navbar/>
    <div class="container">
      <!-- Header -->
      <div class="row justify-content-md-center my-5">
        <div class="col col-md-auto">
          <div class="jumbotron">
            <h1 class="display-4">Funcionários</h1>
            <p class="lead">Listagem de Funcionários</p>
            <hr class="my-4">
            <p>Esta é uma listagem de todos os Funcionários</p>
            <button @click="adicionar" class="btn btn-primary btn-lg" role="button">Adicionar</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="funcionario in funcionarios" :key="funcionario.idfuncionario">
                <td>{{ funcionario.nome }}</td>
                <td>{{ funcionario.email }}</td>
                <td>
                  <button @click="verDetalhes(funcionario.idfuncionario)" class="btn btn-primary">Alterar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
