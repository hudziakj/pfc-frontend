<template>
  <div>
    <div class="container">
      <div class="one">
        <img src="@/assets/logoParana.png" alt="Logo Paraná" />
        <form @submit.prevent="login">
          <div class="input-container">
            <label for="email">E-mail:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="input-container">
            <label for="password">Senha:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="lembrarMe">
            <input type="checkbox" id="lembrarSenha" v-model="rememberMe" />
            <label for="lembrarSenha">Lembrar-me</label>
          </div>
          <button class="botao-entrar" type="submit">Acessar</button>
          <button class="botao-egov" type="button" @click="loginWithEgov">Entrar com e-gov.br</button>
          <router-link to="/register">Não tem uma conta? Registre-se aqui!</router-link>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
      <div class="two"></div>
    </div>
  </div>
</template>

<script>
import "../styles/Login.css";
import api from '@/utils/axios.js';

export default {
  name: "LoginPage",
  created() {
    console.log("🚀 Login.vue carregado!");
  },
  mounted() {
    console.log("🎯 Login.vue montadooo!");
  },
  data() {
    return {
      email: '',
      senha: '',
      error: null,
      rememberMe: false, // Controle para o checkbox "lembrar-me"
    };
  },
  methods: {
    async login() {
      try {
        // Faz a requisição para a rota /users/login do backend
        const response = await api.post('/users/login', {
          email: this.email,
          senha: this.password,
        });

        // Salva os dados retornados (ex: token ou usuário)
        const userData = response.data;

        // Salve o nome do usuário (ou outra informação) no Vuex, LocalStorage ou diretamente no estado
        localStorage.setItem('user', JSON.stringify(userData));

        localStorage.setItem('userId', JSON.stringify(userData.userId));

        localStorage.setItem("token", response.data.token);

        localStorage.setItem("nome", response.data.nome);
        // Navega para a rota de "Hello World"
        this.$router.push({ name: 'ChamadosPage', params: { name: userData.name } });
      } catch (err) {
        // Trata erros (exemplo: credenciais inválidas)
        this.error = 'Login falhou. Verifique suas credenciais.';
      }
    },
    loginWithEgov() {
      console.log("Entrar com e-gov.br");
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

.one {
  width: 45vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

form {
  margin-top: 1.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

input[type="email"],
input[type="password"],
input[type="submit"],
button {
  width: 25vw;
}

input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
}

.input-container input {
  font-size: 1.2rem;
  background-color: #ffffff;
  border: 1px #c4c4c4 solid;
  padding: 0.6rem;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.lembrarMe {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.botao-entrar {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #0069d9;
  border: none;
  padding: 0.6rem;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.botao-egov {
  font-size: 1.2rem;
  color: #c4c4c4;
  background-color: #ffffff;
  border: 1px #c4c4c4 solid;
  padding: 0.6rem;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.two {
  width: 45vw;
  height: 90vh;
  border-radius: 1rem;
  background: url("@/assets/araucaria.jpg");
  background-size: cover;
  background-position: 100% 10%;
}

.container {
  width: 100%;
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  color: red;
  font-size: 1.2rem;
  margin-top: 1rem;
}
</style>
