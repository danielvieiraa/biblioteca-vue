<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter, useRoute } from 'vue-router';
    import Navbar from '@/componentes/Navbar.vue';

    const router = useRouter();
    const route = useRoute();
    const idlivro = ref(route.params.idlivro);
    const idpessoa = ref('');

    const voltar = () => {
        router.push('/livros');
    };

    const emprestar = async () => {
        try {
            const json = {
                idlivro: idlivro.value,
                idpessoa: idpessoa.value
            };
            const response = await axios.post('http://localhost:4000/emprestar', json);
            window.alert(response.data.mensagem);
            voltar();
        } catch (error) {
            if(error.response && error.response.data && error.response.data.mensagem) {
                window.alert(`Erro: ${error.response.data.mensagem}`)
            } else {
                window.alert(`Erro desconhecido ao emprestar o livro: ${error.mensagem}`);
            }
        }
    };

    const salvar = async () => {
        emprestar();
    };
</script>

<template>
    <Navbar></Navbar>
    <div class="container">
        <div>
          <h1>Emprestarlivro</h1>
          <form @submit.prevent="salvar">
            <div class="mb-3">
                <label>Insira o ID da pessoa que vai emprestar o livro: </label>
                <input type="text" placeholder="Insira aqui" class="form-control" id="idpessoa" v-model="idpessoa" />
            </div>
            <button type="submit" class="btn btn-primary me-2">Salvar</button>
            <button type="button" class="btn btn-secondary me-2" @click="voltar">Cancelar</button>
          </form>
        </div>
    </div>
</template>
