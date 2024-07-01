<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { defineProps } from 'vue';

const props = defineProps({
  titulo: String,
  subtitulo: String,
  url: String,
});
</script>

<template>
    <b-alert variant="dark" show>
      <h4 class="alert-heading">{{ titulo }}</h4>
      <p>{{ subtitulo }}</p>
      <hr>
      <div class="d-flex justify-content-end">
        <router-link :to="url" class="btn btn-primary">Adicionar</router-link>
      </div>
    </b-alert>
  </template>