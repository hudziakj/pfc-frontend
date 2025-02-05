<template>
  <div class="container">
    <aside class="sidebar">
      <!-- Avatar no topo do menu lateral -->
      <div class="avatar-container">
        <img :src="avatarUrl" alt="Avatar" class="avatar" v-if="avatarUrl" />
      </div>
      <p v-if="user.nome" class="user-name">{{ user.nome }}</p> <!-- Nome do usuário -->
      <button @click="navigateTo('CriarChamado')">Criar Chamado</button>
      <button @click="navigateTo('ChamadosPage')">Meus Chamados</button>

      <!-- Botão de Sair no final -->
      <button class="logout-btn" @click="logout">Sair</button>
    </aside>

    <!-- Conteúdo principal -->
    <div class="content">
      <slot></slot> <!-- Aqui você coloca o conteúdo da página, como detalhes de chamados -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {}, // Dados do usuário
      avatarUrl: "", // URL do avatar
      isLoggedIn: false, // Para controlar se o usuário está logado
    };
  },
  created() {
    this.checkLoginStatus();
    this.fetchUser(); // Busca dados do usuário (incluindo avatar)
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem("token");
      this.isLoggedIn = token ? true : false;
    },
    async fetchUser() {
      try {
        const userId = localStorage.getItem("userId").replace(/^"|"$/g, "");
        const response = await axios.get(`http://localhost:5000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token do usuário
          },
        });
        this.user = response.data;

        // Monta a URL do avatar
        if (this.user.avatar) {
          this.avatarUrl = `data:image/png;base64,${this.user.avatar}`;
        }
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
      }
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    logout() {
      console.log("Acionou logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$router.push("/login"); // Redireciona para a página de login
    },
  },
};
</script>

<style scoped>

.user-name {
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
}

/* Envolver Foto do perfil*/
.avatar-container {
  display: flex;
  justify-content: center;
}

/* Foto do perfil*/
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

/* Menu lateral */
.sidebar {
  width: 15vw;
  background-color: #f4f4f4;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: 1px solid #ccc;
  top: 0;
  left: 0;
  height: 100vh; /* O menu lateral ocupa toda a altura da tela */
  position: fixed; /* Fixa o menu na lateral */
}

/* Botões do Menu */
.sidebar button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

</style>
