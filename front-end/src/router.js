import { createRouter, createWebHistory } from 'vue-router';
import Navbar from './componentes/Navbar.vue';
import Autor from './paginas/Autor.vue';
import AutorCadastro from './paginas/AutorCadastro.vue';
import Emprestimo from './paginas/Emprestimo.vue';
import Emprestar from './paginas/Emprestar.vue';

const routes = [
  { path: '/', component: Navbar },
  { path: '/Autores', component: Autor }, // Rota para listar os autores
  { path: '/Autor', component: AutorCadastro }, // Rota para adicionar um novo autor
  { path: '/Autor/:id', component: AutorCadastro }, // Rota para editar um autor existente
  { path: '/emprestimos', component: Emprestimo}, // Rota para emprestimo
  { path: '/emprestar', component: Emprestar}
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
