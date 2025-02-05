<template>
    <div class="error-page">
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está tentando acessar não existe.</p>
      <router-link to="/">Voltar para a página inicial</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "ErroPage",
  };
  </script>
  
  <style scoped>
  .error-page {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  