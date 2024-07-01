<script setup>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.min.js';
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary w-100">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Biblioteca</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/emprestimos-pendentes">Devolução</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Cadastros
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/pessoas">Pessoas</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link class="dropdown-item" to="/livros">Livros</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link class="dropdown-item" to="/funcionarios">Funcionários</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link class="dropdown-item" to="/autores">Autores</router-link></li>
                <li><router-link class="dropdown-item" to="/categorias">Categoria</router-link></li>
                <li><router-link class="dropdown-item" to="/editoras">Editora</router-link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>

  