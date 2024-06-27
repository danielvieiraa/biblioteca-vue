<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Navbar from '@/componentes/Navbar.vue';

const router = useRouter();
const dados = ref([]);

const listarlivros = async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/Livro');
    dados.value = data;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
  }
};

const adicionar = () => {
  router.push(`/Livro`);
};

const verDetalhes = (id) => {
  router.push(`/Livro/${id}`);
};

onMounted(() => {
  listarlivros();
});
</script>

<template>
  <Navbar/>
    <!-- Cabeçalho -->
    <div class="row justify-content-md-center my-5">
      <div class="col col-md-auto">
        <div class="jumbotron">
          <h1 class="display-4">Livros</h1>
          <p class="lead">Listagem de Livros</p>
          <hr class="my-4">
          <p>Esta é uma listagem de todos os Livros Da Biblioteca</p>
          <button @click="adicionar" class="btn btn-primary btn-lg" role="button">Adicionar</button>
        </div>
      </div>
    </div>
    <!-- Fim Cabeçalho -->

    <!-- Lista De Registros -->
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Título</th>
                <th scope="col">Ano</th>
                <th scope="col">Edição</th>
                <th scope="col">ID - Categoria</th>
                <th scope="col">ID - Editora</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="livro in dados" :key="livro.idlivro">
                <td>{{ livro.idlivro }}</td>
                <td>{{ livro.titulo }}</td>
                <td>{{ livro.ano }}</td>
                <td>{{ livro.edicao }}</td>
                <td>{{ livro.idcategoria }} - {{ livro.categoria.categoria }}</td>
                <td>{{ livro.ideditora }} - {{ livro.editora.editora }}</td>
                <td>
                  <button @click="verDetalhes(livro.idlivro)" class="btn btn-primary">Alterar</button>
                  <button @click="verDetalhes(livro.idlivro)" class="btn btn-primary ms-md-2">Emprestar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
</template>

