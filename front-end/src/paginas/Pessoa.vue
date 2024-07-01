<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Navbar from '@/componentes/Navbar.vue';

const router = useRouter();
const dados = ref([]);

const listarpessoas = async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/pessoa');
    dados.value = data;
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error);
  }
};

const adicionar = () => {
  router.push(`/Pessoa`);
};

const verDetalhes = (id) => {
  router.push(`/Pessoa/${id}`);
};

const exibirHistorico = (id) => {
  router.push(`/historico/pessoa/${id}`);
};

onMounted(() => {
  listarpessoas();
});
</script>

<template>
  <Navbar/>
    <!-- Cabeçalho -->
    <div class="row justify-content-md-center my-5">
      <div class="col col-md-auto">
        <div class="jumbotron">
          <h1 class="display-4">Pessoas</h1>
          <p class="lead">Listagem de Pessoas</p>
          <hr class="my-4">
          <p>Esta é uma listagem de todas as Pessoas</p>
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
                <th scope="col">Pessoa</th>
                <th scope="col">Email</th>
                <th scope="col">Telefone</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pessoa in dados" :key="pessoa.idpessoa">
                <td>{{ pessoa.idpessoa }}</td>
                <td>{{ pessoa.pessoa }}</td>
                <td>{{ pessoa.email }}</td>
                <td>{{ pessoa.telefone }}</td>
                <td>
                  <button @click="verDetalhes(pessoa.idpessoa)" class="btn btn-primary">Alterar</button>
                  <button @click="exibirHistorico(pessoa.idpessoa)" class="btn btn-primary ms-md-2">Histórico</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
</template>

