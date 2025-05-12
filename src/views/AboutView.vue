<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="bg-black text-white">
    <nav class="flex justify-between items-center p-4 border-b border-gray-700">
      <div class="flex space-x-4">
        <span class="font-bold">EASY FOOTBALL MANAGEMENT</span>
        <a href="#" class="hover:underline">Início Rápido</a>
        <a href="#" class="hover:underline">Sobre Nós</a>
        <a href="#" class="hover:underline">Contato</a>
        <a href="#" class="hover:underline">Mais Opções</a>
      </div>
      <RouterLink to="/login">login</RouterLink>
      <button class="bg-green-500 text-black px-4 py-2 rounded">Acessar</button>
    </nav>

    <div class="grid grid-cols-3 gap-4 p-6">
      <div>
        <h3 class="font-bold mb-2">Navegação Principal</h3>
        <ul class="space-y-2">
          <li><strong>Página Inicial</strong> - Explore nossas funcionalidades e torneios.</li>
          <li><strong>Torneios Abertos</strong> - Participe dos nossos torneios emocionantes.</li>
          <li><strong>Resultados Recentes</strong> - Veja os resultados mais recentes aqui.</li>
          <li><strong>Notícias Importantes</strong> - Fique por dentro das últimas notícias.</li>
        </ul>
      </div>

      <div>
        <h3 class="font-bold mb-2">Artigos em Destaque</h3>
        <ul class="space-y-2">
          <li><strong>Título do Artigo</strong> - Leia sobre as últimas atualizações.</li>
          <li><strong>Título do Artigo</strong> - Descubra dicas e estratégias para o jogo.</li>
          <li><strong>Título do Artigo</strong> - Acompanhe as novidades do nosso site.</li>
          <li><strong>Título do Artigo</strong> - Entenda as regras dos torneios.</li>
        </ul>
      </div>

      <div>
        <h3 class="font-bold mb-2">Destaques do Blog</h3>
        <div class="space-y-4">
          <div class="flex items-start space-x-4">
            <div class="bg-gray-600 w-16 h-16"></div>
            <div>
              <strong>Artigo Relevante</strong>
              <p>Um guia para iniciantes no futebol.</p>
              <a href="#" class="text-blue-400 hover:underline">Leia mais</a>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="bg-gray-600 w-16 h-16"></div>
            <div>
              <strong>Artigo Importante</strong>
              <p>Dicas para melhorar seu desempenho.</p>
              <a href="#" class="text-blue-400 hover:underline">Leia mais</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="p-10 bg-gray-900">
      <h1 class="text-4xl font-bold">Gestão de Torneios de Futebol Eficiente</h1>
    </section>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
