<template>
  <div class="content">
    <h1>Registro</h1>

    <!-- Formulário de Registro -->
    <form @submit.prevent="register" class="form-container">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" v-model="form.nome" id="nome" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="form.email" id="email" required />
      </div>

      <div class="form-group">
        <label for="departamento">Departamento</label>
        <input type="text" v-model="form.departamento" id="departamento" required />
      </div>

      <div class="form-group">
        <label for="senha">Senha</label>
        <input type="password" v-model="form.senha" id="senha" required />
      </div>

      <div class="form-group">
        <label for="confirmaSenha">Confirmar Senha</label>
        <input type="password" v-model="form.confirmaSenha" id="confirmaSenha" required />
      </div>

      <!-- Campo de Upload de Imagem (Avatar) -->
      <div class="form-group">
        <label for="avatar">Escolha um Avatar</label>
        <input type="file" id="avatar" @change="handleAvatarUpload" accept="image/*" />
      </div>

      <!-- Exibição da Imagem Selecionada -->
      <div v-if="avatarPreview" class="avatar-preview">
        <img :src="avatarPreview" alt="Avatar Preview" class="avatar-img" />
      </div>

      <button type="submit" :disabled="loading">Registrar</button>
    </form>

    <!-- Exibir mensagem de erro ou sucesso -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import api from "@/utils/axios.js";

export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        nome: "",
        email: "",
        departamento: "",
        senha: "",
        confirmaSenha: "",
        avatar: null, // Campo para armazenar a imagem do avatar
      },
      avatarPreview: null, // Para mostrar a imagem escolhida antes do envio
      errorMessage: "",
      successMessage: "",
      loading: false, // Para controlar o botão de envio
    };
  },
  methods: {
    // Função para lidar com o upload de avatar
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Criar um preview da imagem selecionada
        this.avatarPreview = URL.createObjectURL(file);
        this.form.avatar = file; // Armazenar o arquivo de imagem
      }
    },

    async register() {
  if (!this.form.nome || !this.form.email || !this.form.departamento || !this.form.senha || !this.form.confirmaSenha) {
    this.errorMessage = "Por favor, preencha todos os campos.";
    return;
  }
  if (this.form.senha !== this.form.confirmaSenha) {
    this.errorMessage = "As senhas não coincidem.";
    return;
  }

  const formData = new FormData();
  formData.append("nome", this.form.nome);
  formData.append("email", this.form.email);
  formData.append("departamento", this.form.departamento);
  formData.append("senha", this.form.senha);
  formData.append("confirmaSenha", this.form.confirmaSenha);
  if (this.form.avatar) formData.append("avatar", this.form.avatar);

  try {
    this.loading = true;
    const response = await api.post("http://localhost:5000/users/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    
    this.successMessage = response.data.message;
    this.errorMessage = "";
    this.loading = false;
    
    // Redireciona para a tela de login após 2 segundos
    setTimeout(() => {
      this.$router.push("/login");
    }, 2000);
    
  } catch (error) {
    console.log(error);
    this.errorMessage = error.response?.data?.message || "Erro ao registrar.";
    this.successMessage = "";
    this.loading = false;
  }
}

  },
};
</script>

<style scoped>
.content {
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.avatar-preview {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.avatar-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
