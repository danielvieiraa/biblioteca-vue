<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Navbar from '@/componentes/Navbar.vue';

const router = useRouter();
const dados = ref([]);

const listarAutores = async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/Autor');
    dados.value = data;
  } catch (error) {
    console.error('Erro ao buscar autores:', error);
  }
};

const adicionar = () => {
  router.push(`/Autor`);
};

const verDetalhes = (id) => {
  router.push(`/autor/${id}`);
};

onMounted(() => {
  listarAutores();
});
</script>

<template>
  <Navbar/>
  <div class="container">
    <!-- Cabeçalho -->
    <div class="row justify-content-md-center" style="margin-top: 10px;">
      <div class="col col-md-auto">
        <div class="jumbotron">
          <h1 class="display-4">Autores</h1>
          <p class="lead">Listagem de Autores</p>
          <hr class="my-4">
          <p>Esta é uma listagem de todos os autores da Biblioteca</p>
          <button @click="adicionar" class="btn btn-primary btn-lg" role="button">Adicionar</button>
        </div>
      </div>
    </div>
    <!-- Fim Cabeçalho -->

    <!-- Lista De Registros -->
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Autor</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="autor in dados" :key="autor.idautor">
              <td>{{ autor.idautor }}</td>
              <td>{{ autor.autor }}</td>
              <td>
                <button @click="verDetalhes(autor.idautor)" class="btn btn-primary">Alterar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

