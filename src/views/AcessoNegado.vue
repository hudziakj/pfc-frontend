<template>
    <div class="access-denied-page">
      <h1>403 - Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <router-link to="/login">Fazer login</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "AcessoNegado",
  };
  </script>
  
  <style scoped>
  .access-denied-page {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  