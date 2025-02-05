import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/Login.vue";
import RegisterPage from "@/views/Register.vue";
import ChamadosPage from "@/views/ChamadosPage.vue";
import CriarChamado from "@/views/CriarChamado.vue";
import ChamadoDetalhe from "@/views/ChamadoDetalhe.vue";
import ErroPage from "@/views/ErroPage.vue";
import AcessoNegado from "@/views/AcessoNegado.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
  {
    path: "/chamados",
    name: "ChamadosPage",
    component: ChamadosPage,
    meta: { requiresAuth: true }, // Proteção de rota
    props: true,
  },
  {
    path: "/chamadosCriar",
    name: "CriarChamado",
    component: CriarChamado,
    meta: { requiresAuth: true }, // Proteção de rota
    props: true,
  },
  {
    path: "/ticket/:id",
    name: "ChamadoDetalhe",
    component: ChamadoDetalhe,
    meta: { requiresAuth: true }, // Proteção de rota
    props: true,
  },
  {
    path: "/403",
    name: "AcessoNegado",
    component: AcessoNegado,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "ErroPage",
    component: ErroPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Impede que o usuário acesse uma rota sem estar logado
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // Verifica se o token existe

  console.log("Rota acessada:", to.path);
  console.log("Usuário autenticado:", isAuthenticated ? "Sim" : "Não");

  // Se o usuário autenticado tentar acessar "/login" ou "/", redireciona para "/chamados"
  if ((to.path === "/" || to.path === "/login") && isAuthenticated) {
    console.log("Redirecionando para /chamados");
    next({ path: "/chamados", replace: true });
  }
  // Se a rota requer autenticação e o usuário não está logado, redireciona para "/403"
  else if (to.meta.requiresAuth && !isAuthenticated) {
    console.log("Acesso negado! Redirecionando para /403");
    next("/403");
  }
  // Permite acesso normal
  else {
    console.log("Acesso permitido!");
    next();
  }
});

export default router;
