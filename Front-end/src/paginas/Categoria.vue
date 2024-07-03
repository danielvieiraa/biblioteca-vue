<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Navbar from '@/componentes/Navbar.vue';

const router = useRouter();
const dados = ref([]);

const listarcategorias = async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/categoria');
    dados.value = data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }
};

const adicionar = () => {
  router.push(`/Categoria`);
};

const verDetalhes = (id) => {
  router.push(`/Categoria/${id}`);
};


onMounted(() => {
  listarcategorias();
});
</script>

<template>
  <Navbar/>
    <!-- Cabeçalho -->
    <div class="row justify-content-md-center my-5">
      <div class="col col-md-auto">
        <div class="jumbotron">
          <h1 class="display-4">Categorias</h1>
          <p class="lead">Listagem de Categorias</p>
          <hr class="my-4">
          <p>Esta é uma listagem de todas as Categorais</p>
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
                <th scope="col">Categoria</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="categoria in dados" :key="categoria.idcategoria">
                <td>{{ categoria.idcategoria }}</td>
                <td>{{ categoria.categoria }}</td>
                <td>
                  <button @click="verDetalhes(categoria.idcategoria)" class="btn btn-primary">Alterar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
</template>

