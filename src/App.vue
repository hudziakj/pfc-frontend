<template>
  <div class="container">
    <!-- O MenuLateral só aparece se o usuário estiver logado e a rota for uma das especificadas -->
    <aside v-if="isLoggedIn && showMenuLateral">
      <MenuLateral />
    </aside>
      <div class="main-content">
      <router-view /> 
    </div> 
  </div>
</template>

<script>
import MenuLateral from '@/components/MenuLateral.vue';

export default {
  components: {
    MenuLateral,
  },
  data() {
    return {
      isLoggedIn: false, // Estado do login
      showMenuLateral: false, // Para controlar a visibilidade do menu lateral
    };
  },
  created() {
    this.checkLoginStatus();
    this.checkMenuVisibility(); // Verifica se o menu deve ser mostrado
  },
  watch: {
    // Observa mudanças nas rotas e atualiza a visibilidade do menu
    $route() {
      this.checkMenuVisibility();
    },
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('token'); // Verifica se o token está no localStorage
      this.isLoggedIn = token ? true : false; // Se tiver token, está logado
    },
    checkMenuVisibility() {
      // Defina as rotas nas quais o menu lateral deve aparecer
      const routesWithMenu = ['CriarChamado', 'ChamadosPage', 'ChamadoDetalhe'];
      // Atualiza a visibilidade do menu com base na rota atual
      this.showMenuLateral = routesWithMenu.includes(this.$route.name);
    },
  },
};
</script>

<style scoped>

.container {
  display: flex; /* Define um layout flex para organizar os filhos em linha ou coluna */
}

aside {
  width: 250px; /* Define a largura fixa do menu lateral */
  background-color: #f4f4f4; /* Cor de fundo do menu */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Sombra para destaque */
  z-index: 1; /* Garante que o menu fique sobre outros elementos */
}

.main-content {
  flex: 1; /* Faz o conteúdo principal ocupar o espaço restante */
  padding: 20px; /* Adiciona espaçamento interno */
  overflow-y: auto; /* Permite rolagem caso o conteúdo ultrapasse a altura */
}

</style>
