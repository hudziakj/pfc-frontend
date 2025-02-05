<template>
  <div class="container">
    <!-- Conteúdo principal -->
    <main class="content">
      <h1>Meus Chamados</h1>
      <table class="chamados-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Andamento</th>
            <th>Categoria</th>
            <th>Data de Abertura</th>
            <th>Requerente</th>
            <th>Responsável</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chamado in chamados" :key="chamado.id">
            <td>{{ chamado.id }}</td>
            <!-- Navegação para os detalhes do chamado -->
            <td class="link">
              <router-link :to="`/ticket/${chamado.id}`">{{ chamado.titulo }}</router-link>
            </td>
            <td>{{ chamado.andamento }}</td>
            <td>{{ chamado.categoria }}</td>
            <td>{{ formatDate(chamado.createdAt) }}</td>
            <td>{{ chamado.requerente ? capitalizeFirstLetter(chamado.requerente.nome) : 'Não atribuído' }}</td>
            <td>{{ chamado.responsavel.nome }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import api from '@/utils/axios.js'; // Importa o arquivo axios.js
import dayjs from 'dayjs'; // Importa o dayjs
export default {
  name: 'ChamadosPage',
  data() {
    return {
      chamados: [], // Array para armazenar os chamados
    };
  },
  mounted() {
    this.fetchChamados();
  },
  methods: {
    async fetchChamados() {
      try {
        const token = localStorage.getItem("token"); // Pegue o token do localStorage
        const userId = localStorage.getItem('userId');
        const response = await api.get('http://localhost:5000/tickets/', {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho da requisição
          },
          params: {userId: userId}
        });

        this.chamados = response.data; // Adapte os campos conforme os dados da API]
        console.log(this.chamados)
      } catch (err) {
        console.error('Erro ao carregar chamados', err);
      }
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    capitalizeFirstLetter(string) {
    if (!string) return ''; // Caso a string seja undefined ou vazia
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
    formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm'); // Formata a data no formato desejado
    },
  },
};
</script>

<style scoped>

a {
  text-decoration: none;
}

a:visited{
  color: blue;
}

.content {
  flex: 1;
  padding-left: 1rem;
} 

.chamados-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.chamados-table th,
.chamados-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.chamados-table th {
  background-color: #f4f4f4;
}
</style>
