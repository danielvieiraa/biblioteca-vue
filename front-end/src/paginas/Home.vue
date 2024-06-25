<script setup>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/js/bootstrap.min.js';
    import Navbar from '@/componentes/Navbar.vue';
    </script>

<template>
<navbar></navbar>
<div class="background-image">
    <div class="text-content">
      <h1>Bem-vindos à Biblioteca.</h1>
      <h3>
        Feito por:<br>
        Daniel Ferndo Vieira,<br>
        Carlos Eduardo,<br>
        Guilherme Bottcher,<br>
        Maicon Padilha Klitzke
      </h3>
    </div>
  </div>





</template>
<style scoped>
.background-image {
  background-image: url('img.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.text-content {
  background-color: rgba(0, 0, 0, 0.5); 
  padding: 100px;
  
}
</style>