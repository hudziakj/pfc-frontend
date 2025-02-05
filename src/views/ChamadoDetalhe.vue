<style scoped>
/* Estrutura do layout */
.container {
  display: flex;
}

/* Conteúdo principal */
.content {
  padding: 2rem;
  width: 100%;
  overflow-y: auto; /* Garante que o conteúdo tenha rolagem se necessário */
}

.content h1 {
  margin-bottom: 1rem;
}

.content p {
  margin-bottom: 0.5rem;
}

/* Estilo do textarea (campo de comentário) */
.content textarea {
  width: 74vw;
  height: 100px;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave para dar profundidade */
  resize: none; /* Evita redimensionamento manual */
  transition: all 0.3s ease; /* Transição suave para interações */
}

.content textarea:focus {
  border-color: #007bff; /* Cor da borda ao focar */
  outline: none; /* Remove o contorno padrão */
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3); /* Efeito de sombra quando o campo está em foco */
}

.content button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease; /* Transição suave para a cor do botão */
}

.content button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.content button:hover:not(:disabled) {
  background-color: #0056b3;
}

/* Estilo para o container de comentários */
.comments-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-card {
  display: flex;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  margin-top: .5rem;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%; /* Torna o avatar circular */
  background-color: #ccc; /* Cor de fundo para o avatar */
  margin-right: 1rem;
  overflow: hidden; /* Garante que a imagem não saia do contorno circular */
}

.avatar img {
  width: 100%; /* Faz com que a imagem ocupe todo o espaço disponível */
  height: 100%; /* Garante que a altura seja a mesma da largura */
  object-fit: cover; /* Garante que a imagem seja cortada para se ajustar ao contorno */
}


.comment-content h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.comment-content p {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #333;
}

.content h1{
  margin-top: -1rem;
}
</style>


<script>
import axios from 'axios';


export default {
  data() {
    return {
      ticket: null,
      newComment: '',
      loading: false,
    };
  },
  components: {
  },
  created() {
    this.fetchTicketDetail();
  },
  methods: {
    async fetchTicketDetail() {
      try {
        const token = localStorage.getItem("token"); // Pegue o token do localStorage
        const response = await axios.get(`http://localhost:5000/tickets/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho da requisição
          },
        });
        this.ticket = response.data;
        console.log(this.ticket.comentarios);
      } catch (error) {
        console.error("Erro ao carregar os detalhes do chamado:", error);
      }
    },
    async addComment() {
      if (this.newComment.trim()) {
        this.loading = true; // Indica carregamento
        try {
          const token = localStorage.getItem("token");
          let userId = localStorage.getItem("userId");
          let nome = localStorage.getItem("nome");
          console.log(nome);
          
          // Remover aspas ou barras invertidas, caso existam
          userId = userId.replace(/["\\]/g, '');  // Remove aspas e barras invertidas
          
          await axios.post(
            `http://localhost:5000/tickets/${this.ticket._id}/comentarios`,
            {
              comentario: this.newComment,
              usuarioId: userId, // ID do usuário logado
              nome,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.newComment = ''; // Limpa o campo de comentário
          await this.fetchTicketDetail(); // Atualiza os detalhes do chamado
        } catch (error) {
          console.error("Erro ao adicionar o comentário:", error);
        } finally {
          this.loading = false; // Termina o carregamento
        }
      }
    },
  },
};
</script>

<template>
  <div class="container">
    
    <!-- Conteúdo Principal -->
    <div class="content">
      <div v-if="ticket">
        <h1>Detalhes do Chamado: {{ ticket.titulo }}</h1>
        <p><strong>Descrição:</strong> {{ ticket.descricao }}</p>
        <p><strong>Categoria:</strong> {{ ticket.categoria }}</p>
        <p><strong>Andamento:</strong> {{ ticket.andamento }}</p>
        <p><strong>Requerente:</strong> {{ ticket.requerente.nome }}</p>
        <p><strong>Responsável:</strong> {{ ticket.responsavel.nome }}</p>
        
        <!-- Comentários -->
        <div v-for="comment in ticket.comentarios" :key="comment._id" class="comment-card">
  <!-- Usando uma tag <img> para renderizar o avatar -->
  <div class="avatar">
    <img :src="'data:image/jpeg;base64,' + comment.usuario.avatar" alt="Avatar" />
  </div>

  <div class="comment-content">
    <h3>{{ comment.usuario.nome || 'Anônimo' }}</h3>
    <p>{{ comment.comentario }}</p>
  </div>
</div>


        <!-- Formulário para adicionar comentário -->
        <div>
          <textarea v-model="newComment" placeholder="Adicionar um comentário"></textarea>
          <button @click="addComment" :disabled="loading">Adicionar Comentário</button>
        </div>
      </div>
      
      <div v-else>
        <p>Carregando...</p>
      </div>
    </div>
  </div>
</template>
