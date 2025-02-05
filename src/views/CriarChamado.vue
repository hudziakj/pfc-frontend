<template>
  <div class="container">
    <main class="content">
      <h1>Criar Chamado</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="titulo">Título:</label>
          <input type="text" id="titulo" v-model="titulo" required />
        </div>
        <div class="form-group">
          <label for="descricao">Descrição:</label>
          <textarea id="descricao" v-model="descricao" required></textarea>
        </div>
        <div class="form-group">
          <label for="categoria">Categoria:</label>
          <select id="categoria" v-model="categoria" required>
            <option value="Outros">Outros</option>
            <option value="Manutenção">Manutenção</option>
            <option value="Compras">Compras</option>
          </select>
        </div>
        <!-- Campo de Técnico Responsável -->
        <div class="form-group">
          <label for="tecnico">Responsável:</label>
          <select id="tecnico" v-model="tecnico" required>
            <option value="" disabled>Selecione um técnico</option>
            <option v-for="usuario in usuarios" :key="usuario._id" :value="usuario._id">
              {{ usuario.nome }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit">Criar Chamado</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import api from "@/utils/axios.js"; // Importa o Axios configurado
import axios from 'axios';

export default {
  name: "CriarChamado",
  data() {
    return {
      titulo: "",
      descricao: "",
      categoria: "Suporte", // Valor padrão da categoria
      tecnico: "", // ID do técnico selecionado
      usuarios: [], // Lista de usuários cadastrados
      requerente: ""
    };
  },
  async created() {
    const userId = localStorage.getItem("userId");
    this.requerente = userId ? JSON.parse(userId) : "";

    // Carregar lista de usuários ao abrir a tela
    await this.fetchUsuarios();
  },
  methods: {
    async fetchUsuarios() {
      try {
        const token = localStorage.getItem("token"); // Pegue o token do localStorage
        const response = await axios.get(`http://localhost:5000/users/usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho da requisição
          },
        });
        console.log(response.data);
        this.usuarios = response.data; // Assume que a API retorna uma lista de usuários [{_id, nome}]
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    },
    async submitForm() {
      if (!this.tecnico) {
        alert("Por favor, selecione um responsável para o chamado.");
        return;
      }

      const chamadoData = {
        titulo: this.titulo,
        descricao: this.descricao,
        categoria: this.categoria,
        responsavel: this.tecnico, // Armazena o ObjectId do técnico
        requerente: this.requerente
      };

      try {
        await api.post("tickets/create", chamadoData);
        this.$router.push({ name: "ChamadosPage" });
      } catch (err) {
        console.error("Erro ao criar chamado", err);
      }
    }
  }
};
</script>

<style scoped>
textarea {
  resize: none;
  height: 25vh;
}

.container {
  display: flex;
  flex-direction: row;
}

.content {
  flex-grow: 1;
  padding: 1rem;
}

.content > h1 {
  margin-top: -1rem;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
}

input,
textarea,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

input[readonly] {
  background-color: #f4f4f4;
  cursor: not-allowed;
}

button {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
