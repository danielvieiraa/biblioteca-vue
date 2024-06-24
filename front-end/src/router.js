
import { createRouter, createWebHistory } from 'vue-router';
import Navbar from './componentes/Navbar.vue';
import Autor from './paginas/Autor.vue';
import AutorCadastro from './paginas/AutorCadastro.vue';
import Livro from './paginas/Livro.vue';
import LivroCadastro from './paginas/LivroCadastro.vue';
import Funcionario from './paginas/Funcionario.vue';
import FuncionarioCadastro from './paginas/FuncionarioCadastro.vue';


const routes = [
  { path: '/', component: Navbar },
  { path: '/Autores', component: Autor }, // Rota para listar os autores
  { path: '/Autor', component: AutorCadastro }, // Rota para adicionar um novo autor
  { path: '/Autor/:id', component: AutorCadastro }, // Rota para editar um autor existente
  {path: '/Livros', component: Livro}, // Rota para listar livros
  {path: '/Livro', component: LivroCadastro}, //Rota para adicionar novo livro
  {path: '/Livro/:id', component: LivroCadastro}, // Rota para Altera Livro
  {path: '/Funcionarios', component: Funcionario}, //Rota para listar funcionarios
  {path: '/Funcionario', component: FuncionarioCadastro}, //Rota para Inserir Funcionario
  {path: '/Funcionario/:id', component: FuncionarioCadastro}, //Rota para Alterar Funcionario

]


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
