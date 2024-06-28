<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter, useRoute } from 'vue-router';
    import Navbar from '@/componentes/Navbar.vue';

    const router = useRouter();
    const route = useRoute();
    const idlivro = ref(route.params.id);
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
            await axios.post('http://localhost:4000/emprestar', json);
            voltar();
        } catch (error) {
            window.alert('Erro ao emprestar o livro:', error);
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
          <h1>Emprestando o livro</h1>
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
