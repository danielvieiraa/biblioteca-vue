import { createRouter, createWebHistory } from 'vue-router';
import Autor from './paginas/Autor.vue';
import AutorCadastro from './paginas/AutorCadastro.vue';
import Devolver from './paginas/Devolver.vue';
import Emprestar from './paginas/Emprestar.vue';
import Livro from './paginas/Livro.vue';
import LivroCadastro from './paginas/LivroCadastro.vue';
import Funcionario from './paginas/Funcionario.vue';
import FuncionarioCadastro from './paginas/FuncionarioCadastro.vue';
import Home from './paginas/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/Autores', component: Autor }, // Rota para listar os autores
  { path: '/Autor', component: AutorCadastro }, // Rota para adicionar um novo autor
  { path: '/Autor/:id', component: AutorCadastro }, // Rota para editar um autor existente
  { path: '/emprestimos-pendentes', component: Devolver}, // Rota para emprestimo
  { path: '/emprestar/:idlivro', component: Emprestar},
  {path: '/Livros', component: Livro}, // Rota para listar livros
  {path: '/Livro', component: LivroCadastro}, //Rota para adicionar novo livro
  {path: '/Livro/:id', component: LivroCadastro}, // Rota para Altera Livro
  {path: '/Funcionarios', component: Funcionario}, //Rota para listar funcionarios
  {path: '/Funcionario', component: FuncionarioCadastro}, //Rota para Inserir Funcionario
  {path: '/Funcionario/:id', component: FuncionarioCadastro}, //Rota para Alterar Funcionario
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
