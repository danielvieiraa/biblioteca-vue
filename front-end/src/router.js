
import { createRouter, createWebHistory } from 'vue-router';
import Navbar from './componentes/Navbar.vue';
import Autor from './paginas/Autor.vue';
import AutorCadastro from './paginas/AutorCadastro.vue';
import Home from './paginas/Home.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/Autores', component: Autor }, // Rota para listar os autores
  { path: '/Autor', component: AutorCadastro }, // Rota para adicionar um novo autor
  { path: '/Autor/:id', component: AutorCadastro } // Rota para editar um autor existente
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
