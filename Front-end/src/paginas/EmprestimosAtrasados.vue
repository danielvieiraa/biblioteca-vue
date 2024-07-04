<script setup>
    import Navbar from '../componentes/Navbar.vue';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/js/bootstrap.min.js';
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const dados = ref([]);

    const listarEmprestimosAtrasados = async () => {
    try {
        const { data } = await axios.get('http://localhost:4000/emprestimos/atrasados');
        dados.value = data;
    } catch (error) {
        console.error('Erro ao buscar empréstimos:', error);
    }
    };

    const devolver = async (idemprestimo) => {
        if (window.confirm("Deseja devolver o livro emprestado?")){
            const json = {
                idemprestimo: idemprestimo
            };
            try {
                const response = await axios.patch(`http://localhost:4000/devolver`, json);
                window.alert(response.data.mensagem);
                window.location.reload();
            } catch (error) {
                console.error('Erro ao devolver o livro', error);
                window.alert('Erro ao devolver o livro' + (error.response ? error.response.data.mensagem : error.message))
            }
        }
    };

    onMounted(() => {
        listarEmprestimosPendentes();
    });
</script>

<template>
    <Navbar></Navbar>
    
    <!-- Cabeçalho -->
    <div class="row justify-content-md-center my-5">
      <div class="col col-md-auto">
        <div class="jumbotron">
          <h1 class="display-4">Empréstimos atrasados</h1>
          <p class="lead">Listagem de empréstimos atrasados</p>
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
                <th scope="col">ID - Pessoa</th>
                <th scope="col">Data de empréstimo</th>
                <th scope="col">Data de vencimento</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emprestimo in dados" :key="emprestimo.idemprestimo">
                <td>{{ emprestimo.idemprestimo }}</td>
                <td>{{ emprestimo.idlivro }} - {{ emprestimo.livro.titulo }}</td>
                <td>{{ emprestimo.idpessoa }} - {{ emprestimo.pessoa.pessoa }}</td>
                <td>{{ emprestimo.emprestimo }}</td>
                <td>{{ emprestimo.vencimento }}</td>
                <td>
                  <button @click="devolver(emprestimo.idemprestimo)" class="btn btn-primary">Devolver</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>