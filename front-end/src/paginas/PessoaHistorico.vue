<script setup>
    import Navbar from '../componentes/Navbar.vue';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/js/bootstrap.min.js';
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router'

    const route = useRoute();
    const dados = ref([]);
    const idpessoa = ref(route.params.idpessoa);

    console.log("ID:", idpessoa.value);

    const listarHistóricoPessoa = async () => {
    try {
        const { data } = await axios.get(`http://localhost:4000/emprestimos/pessoa/${idpessoa.value}`);
        dados.value = data; 
    } catch (error) {
        console.error('Erro ao buscar empréstimos:', error);
    }
    };

    onMounted(() => {
        listarHistóricoPessoa();
    });
</script>

<template>
    <Navbar></Navbar>
    
    <!-- Cabeçalho -->
    <div class="row justify-content-md-center my-5">
      <div class="col col-md-auto">
        <div class="jumbotron">
          <h1 class="display-4">Histórico de empréstimos da pessoa</h1>
          <p class="lead">Neste local você visualiza todos os empréstimos que uma pessoa já fez</p>
          <hr class="my-4">
        </div>
      </div>
    </div>
    <!-- Fim Cabeçalho -->

    <!-- Lista De Registros -->
    <div class="container">
      <div class="row">
        <div class="col p-4">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">ID - Livro</th>
                <th scope="col">Data de empréstimo</th>
                <th scope="col">Data de vencimento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emprestimo in dados" :key="emprestimo.idemprestimo">
                <td>{{ emprestimo.idemprestimo }}</td>
                <td>{{ emprestimo.idlivro }} - {{ emprestimo.livro.titulo }}</td>
                <td>{{ emprestimo.emprestimo }}</td>
                <td>{{ emprestimo.vencimento }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>