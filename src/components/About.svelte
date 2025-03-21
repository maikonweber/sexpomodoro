<style>
  .about-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 2rem;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    max-width: 900px;
    margin: 2rem auto;
    text-align: center;
    overflow: hidden;
    position: relative;
    background: linear-gradient(90deg, #f2eef7, #2575fc);
    color: #faf5f5;
  }

  .about-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, #6a11cb, #2575fc);
  }

  .title {
    font-size: 2.5rem;
    font-weight: 800;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 1rem;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .title span {
    color: #6a11cb;
  }

  .subtitle {
    font-size: 1.25rem;
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.8;
    max-width: 700px;
  }

  .typing-text {
    font-size: 1.125rem;
    font-family: 'Roboto Mono', monospace;
    color: #444;
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.05);
    margin-top: 1.5rem;
    width: 100%;
    max-width: 700px;
    position: relative;
  }

  .caret {
    display: inline-block;
    width: 8px;
    height: 24px;
    background-color: #444;
    animation: blink 0.7s step-end infinite;
    margin-left: 4px;
    vertical-align: bottom;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .image-container {
    width: 100%;
    max-width: 300px;
    margin-bottom: 2rem;
  }

  .image-container img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  /* Responsive Styles */
  @media (max-width: 1024px) {
    .about-card {
      padding: 2rem 1.5rem;
    }

    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.125rem;
    }

    .typing-text {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    .about-card {
      padding: 1.5rem 1rem;
    }

    .title {
      font-size: 1.75rem;
    }

    .subtitle {
      font-size: 1rem;
    }

    .typing-text {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .about-card {
      padding: 1rem;
    }

    .title {
      font-size: 1.5rem;
    }

    .subtitle {
      font-size: 0.875rem;
    }

    .typing-text {
      font-size: 0.8rem;
    }
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';

  let h2 = `Mutter<span>Corporation</span>`;

  // Texto completo que será digitado pela máquina de escrever
  let Text = `MutterCorporation é uma referência em soluções de TI, oferecendo ferramentas inovadoras para transformar ideias em realidade. Nosso compromisso vai além da tecnologia: ajudamos pessoas e impulsionamos o futuro por meio de impacto positivo e ações relevantes.`;

  let displayText = ''; // Texto que será exibido com o efeito de digitação
  let currentIndex = 0; // Índice para acompanhar a posição atual do texto

  const typingSpeed = 50; // Velocidade de digitação (em milissegundos por caractere)

  onMount(() => {
    // Iniciar a animação de máquina de escrever
    startTyping();
  });

  function startTyping() {
    if (currentIndex < Text.length) {
      displayText += Text[currentIndex];
      currentIndex++;

      // Continua digitando o próximo caractere após o intervalo de tempo
      setTimeout(startTyping, typingSpeed);
    }
  }
</script>

<div class="about-card">
  <!-- Imagem de Destaque -->
  <!-- <div class="image-container">
    <img src="./logo.png" alt="Mutter Corporation" />
  </div> -->

  <!-- Título -->
  <h2 class="title" innerHTML={h2}></h2>

  <!-- Subtítulo -->
  <p class="subtitle">
    Somos especialistas em tecnologia, inovação e transformação digital, comprometidos em entregar o melhor para nossos clientes.
  </p>

  <!-- Texto Digitado -->
  <div class="typing-text">
    {displayText}
    <span class="caret"></span>
  </div>
</div>
