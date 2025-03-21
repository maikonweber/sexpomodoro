<script>
  import { onMount } from 'svelte';
  
  // Para criar o toast
  let toastMessage = '';
  let showToast = false;

  function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value; // Obtendo o valor do e-mail do input
    const token = localStorage.getItem('MutterCorp');

    fetch('https://dev.muttercorp.com.br/email/send-email-subcription', {
      method: 'POST', // Geralmente POST é mais apropriado para submissão de formulários
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${'xrF876o8976xsdfr3431'}`,
      },
      body: JSON.stringify({ email }), // Passando o e-mail no corpo da requisição
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao enviar mensagem');
        return response.json();
      })
      .then((data) => {
        // Exibe mensagem de sucesso
        toastMessage = 'Inscrição realizada com sucesso!';
        showToast = true;

        setTimeout(() => (showToast = false), 3000); // Oculta o toast após 3 segundos
      })
      .catch((error) => {
        console.error('Erro ao enviar mensagem:', error);
        toastMessage = 'Erro ao realizar inscrição.';
        showToast = true;

        setTimeout(() => (showToast = false), 3000);
      });
  }
</script>

<style>
  @keyframes slideIn {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-slide {
    animation: slideIn 1s ease-out forwards;
  }

  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    font-family: 'Roboto', sans-serif;
  }
</style>

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

<div
  class="relative flex flex-col items-center justify-center 
  bg-gradient-to-r from-gray-400 to-gray-900 h-auto 
  rounded-xl shadow-2xl text-white text-center 
  p-8 m-6 sm:m-10 md:m-14 lg:m-18 xl:m-24 2xl:m-28 space-y-8 font-roboto"
>
  <div class="relative z-10 space-y-6 animate-slide">
    <h1 class="text-3xl sm:text-4xl font-bold leading-tight">
      Inovação em Soluções de Negócios
    </h1>
    <p class="text-lg sm:text-xl font-medium">
      Transformando ideias em realidade,<br /> impulsionando o futuro dos negócios.
    </p>
  </div>

  <!-- Formulário -->
  <form
    on:submit={handleSubmit}
    class="relative z-10 flex flex-col sm:flex-row items-center w-full max-w-lg space-y-3 sm:space-y-0 sm:space-x-3"
  >
    <input
      name="email"
      type="email"
      placeholder="Digite seu e-mail"
      class="flex-grow p-3 text-gray-700 rounded-md focus:outline-none focus:ring-4 focus:ring-cyan-600 focus:border-transparent shadow-md"
      required
    />
    <button
      type="submit"
      class="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-6 rounded-md shadow-lg"
    >
      Inscreva-se
    </button>
  </form>
</div>

<!-- Toast de Notificação -->
{#if showToast}
  <div class="toast">{toastMessage}</div>
{/if}
