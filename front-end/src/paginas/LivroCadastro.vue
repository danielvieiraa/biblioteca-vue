<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '@/componentes/Navbar.vue';


const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);
const titulo = ref('');
const ano = ref('');
const edicao = ref('');
const paginas = ref('');
const resumo = ref('');
const ideditora = ref(''); 
const editoras = ref([]);
const idcategoria = ref('');
const categorias = ref([]);

const voltar = () => {
  router.push('/livros');
};


const carregarEditoras = async () => {
  try {
    const response = await axios.get('http://localhost:4000/editora');
    editoras.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar editoras:', error);
  }
};
const carregarCategorias = async () => {
  try {
    const response = await axios.get('http://localhost:4000/categoria');
    categorias.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar Categorias:', error);
  }
};


const inserir = async () => {
  try {
    const json = {
      titulo: titulo.value,
      ano: ano.value,
      edicao: edicao.value,
      paginas: paginas.value,
      resumo: resumo.value,
      emprestado: false,
      ideditora: ideditora.value,
      idcategoria: idcategoria.value
    };
    console.log('Enviando dados:', json); // Debug: mostra os dados enviados
    await axios.post('http://localhost:4000/livro/', json);
    voltar();
  } catch (error) {
    console.error('Erro ao inserir Livro:', error);
  }
};

// Função para alterar um livro existente
const alterar = async () => {
  try {
    const json = {
      titulo: titulo.value,
      ano: ano.value,
      edicao: edicao.value,
      paginas: paginas.value,
      resumo: resumo.value,
      emprestado: false,
      ideditora: ideditora.value,
      idcategoria: idcategoria.value
    };
    console.log('Enviando dados:', json);
    await axios.put(`http://localhost:4000/livro/${id.value}`, json);
    voltar();
  } catch (error) {
    console.error('Erro ao alterar livro:', error);
  }
};
const salvar = async () => {
  if (id.value) {
    alterar();
  } else {
    inserir();
  }
};

// Função para excluir um livro
const excluir = async () => {
  if (window.confirm('Deseja mesmo excluir?')) {
    try {
      await axios.delete(`http://localhost:4000/livro/${id.value}`);
      voltar();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  }
};


carregarEditoras();
carregarCategorias();
</script>

<template>
  <Navbar></Navbar>
  <div class="container">
    <h1>{{ id ? 'Alterar Livro' : 'Inserir Livro' }}</h1>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label for="titulo" class="form-label">Livro</label>
        <input type="text" class="form-control" id="titulo" v-model="titulo" />
      </div>
      <div class="mb-3">
        <label for="ano" class="form-label">Ano</label>
        <input type="text" class="form-control" id="ano" v-model="ano" />
      </div>
      <div class="mb-3">
        <label for="edicao" class="form-label">Edicao</label>
        <input type="text" class="form-control" id="edicao" v-model="edicao" />
      </div>
      <div class="mb-3">
        <label for="paginas" class="form-label">Paginas</label>
        <input type="text" class="form-control" id="paginas" v-model="paginas" />
      </div>
      <div class="mb-3">
        <label for="ideditora" class="form-label">Editora</label>
        <select class="form-control" id="ideditora" v-model="ideditora" required>
          <option value="" disabled>Selecione uma editora</option>
          <option v-for="editora in editoras" :key="editora.ideditora" :value="editora.ideditora">
            {{ editora.editora }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="idcategoria" class="form-label">Categoria</label>
        <select class="form-control" id="idcategoria" v-model="idcategoria" required>
          <option value="" disabled>Selecione uma editora</option>
          <option v-for="categoria in categorias" :key="categoria.idcategoria" :value="categoria.idcategoria">
            {{ categoria.categoria }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="resumo" class="form-label">Resumo</label>
        <textarea class="form-control" id="resumo" rows="3" placeholder="Insira aqui o resumo do livro"v-model="resumo"></textarea>
      </div>
      
      <button type="submit" class="btn btn-primary me-2">Salvar</button>
      <button type="button" class="btn btn-secondary me-2" @click="voltar">Cancelar</button>
      <button type="button" class="btn btn-danger me-2" v-if="id" @click="excluir">Excluir</button>
    </form>
  </div>
</template>
