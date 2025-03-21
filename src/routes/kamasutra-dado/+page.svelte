<script lang="ts">
    import { onMount } from 'svelte';
    import { tasks, timeLeft, isRunning as storeIsRunning, currentTask } from '../store/store';
  
    let newTaskInput = '';
    let timer: number;
    let selectedMinutes = 25;
    let time = selectedMinutes * 60;
    let isRunning = false;
  
    let selectedPositions: Array<{ name: string; description: string; image: string }> = [];
    let currentPosition = null;
    let isRolling = false;
  
    let showModal = false;
  
    const allPositions = [
      {
        name: 'Lotus',
        description: 'Uma posição relaxante e íntima para conexão profunda',
        image: 'https://images.unsplash.com/photo-1578876816633-5b1749e8d02b?q=80&w=400'
      },
      {
        name: 'Borboleta',
        description: 'Posição delicada e romântica para momentos suaves',
        image: 'https://images.unsplash.com/photo-1564710589537-28d89165f99c?q=80&w=400'
      },
      {
        name: 'Lua Crescente',
        description: 'Perfeita para momentos especiais e românticos',
        image: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=400'
      },
      {
        name: 'Ponte',
        description: 'Uma posição desafiadora e excitante para explorar',
        image: 'https://images.unsplash.com/photo-1506967726964-da9127fdec36?q=80&w=400'
      },
      {
        name: 'Tigre',
        description: 'Posição intensa e apaixonada para momentos ardentes',
        image: 'https://images.unsplash.com/photo-1590767950092-42b8362368da?q=80&w=400'
      },
      {
        name: 'Cascata',
        description: 'Fluidez e prazer em movimentos suaves',
        image: 'https://images.unsplash.com/photo-1498598457418-36ef20772bb9?q=80&w=400'
      },
      {
        name: 'Fênix',
        description: 'Renascimento da paixão em uma posição elevada',
        image: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?q=80&w=400'
      },
      {
        name: 'Dragão',
        description: 'Força e dominância em perfeita harmonia',
        image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=400'
      },
      {
        name: 'Oceano',
        description: 'Movimentos ondulantes como as ondas do mar',
        image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=400'
      },
      {
        name: 'Montanha',
        description: 'Estabilidade e força em uma posição elevada',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400'
      }
    ];
  
    // Format time for display
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
  
    function updateTimer() {
      time = selectedMinutes * 60;
    }
  
    function startTimer() {
      if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
          if (time > 0) {
            time--;
          } else {
            clearInterval(timer);
            isRunning = false;
            changePosition();
          }
        }, 1000);
      }
    }
  
    function pauseTimer() {
      clearInterval(timer);
      isRunning = false;
    }
  
    function resetTimer() {
      clearInterval(timer);
      isRunning = false;
      time = selectedMinutes * 60;
    }
  
    function changePosition() {
      const randomIndex = Math.floor(Math.random() * allPositions.length);
      currentPosition = allPositions[randomIndex];
    }
  
    // Task Management
    function addTask() {
      if (newTaskInput.trim()) {
        tasks.update(t => [...t, {
          id: Date.now(),
          text: newTaskInput,
          completed: false,
          pomodoros: 0
        }]);
        newTaskInput = '';
      }
    }
  
    function toggleTask(id) {
      tasks.update(t =>
        t.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    }
  
    function deleteTask(id) {
      tasks.update(t => t.filter(task => task.id !== id));
      if ($currentTask === id) {
        currentTask.set(null);
      }
    }
  
    function selectTask(id) {
      currentTask.set(id);
      resetTimer();
    }
  
    function incrementPomodoro(id) {
      tasks.update(t =>
        t.map(task =>
          task.id === id ? { ...task, pomodoros: task.pomodoros + 1 } : task
        )
      );
    }
  
    // Notification
    function notify() {
      if (Notification.permission === "granted") {
        new Notification("Pomodoro Completed!", {
          body: "Time to take a break and change position to: " + currentPosition.name,
        });
        if ($currentTask) {
          incrementPomodoro($currentTask);
        }
      }
    }
  
    function togglePosition(position) {
      if (selectedPositions.some(p => p.name === position.name)) {
        selectedPositions = selectedPositions.filter(p => p.name !== position.name);
      } else {
        selectedPositions = [...selectedPositions, position];
      }
    }
  
    let diceSound: HTMLAudioElement;
    let selectSound: HTMLAudioElement;
    let isMuted = false;
    let isMobile = false;
  
    onMount(() => {
      Notification.requestPermission();
      diceSound = new Audio('../sounds/dice-roll.mp3');
      selectSound = new Audio('../sounds/select.mp3');
      
      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => {
        if (timer) clearInterval(timer);
        window.removeEventListener('resize', checkMobile);
      };
    });
  
    function checkMobile() {
      isMobile = window.innerWidth < 768;
    }
  
    function playSound(sound: HTMLAudioElement) {
      if (!isMuted) {
        sound.currentTime = 0;
        sound.play();
      }
    }
  
    function rollDice() {
      playSound(diceSound);
      isRolling = true;
      showModal = true;
      setTimeout(() => {
        changePosition();
        isRolling = false;
      }, 1000);
    }
  
    function closeModal() {
      showModal = false;
    }
  </script>
  
  <div class="min-h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 p-4 md:p-8 pb-32 backdrop-blur-md relative">
    <!-- Botão de Som - Ajustado para mobile -->
    <button
      class="fixed top-2 right-2 md:top-4 md:right-4 z-50 glass-button-outline p-2 md:p-3 rounded-full"
      on:click={() => isMuted = !isMuted}
    >
      {#if isMuted}
        <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      {:else}
        <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 8v8m-5.536-6.464a5 5 0 010 7.072" />
        </svg>
      {/if}
    </button>

    <div class="max-w-6xl mx-auto">
      <div class="glass-container p-4 md:p-8 rounded-3xl mb-24">
        <!-- Título responsivo -->
        <h1 class="font-display text-4xl md:text-7xl font-bold text-center mb-8 md:mb-12 animate-gradient">
          Dados do Kamasutra
        </h1>
  
        <!-- Seleção de Posições -->
        <div class="mb-8">
          <h2 class="font-display text-2xl md:text-3xl text-white/90 mb-4 md:mb-8 text-center backdrop-blur-sm tracking-wider">
            Escolha suas Posições 
            <span class="text-pink-400">({selectedPositions.length}/20)</span>
          </h2>
          
          <!-- Grid ajustado para mobile -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8">
            {#each allPositions as position}
              <button
                class="glass-card group relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 hover:scale-105"
                on:click={() => togglePosition(position)}
              >
                <div class="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50"></div>
                <div class="absolute inset-0">
                  <img
                    src={position.image}
                    alt={position.name}
                    class="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-500 scale-105"
                  />
                </div>
                <div class="relative p-4 md:p-8 backdrop-blur-sm bg-white/5 h-full">
                  <h3 class="font-display text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{position.name}</h3>
                  <p class="text-white/90 text-base md:text-lg font-light">{position.description}</p>
                  <div class="absolute top-4 right-4">
                    {#if selectedPositions.some(p => p.name === position.name)}
                      <span class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        Selecionado
                      </span>
                    {/if}
                  </div>
                </div>
              </button>
            {/each}
          </div>
        </div>
      </div>

      <!-- Banner de Propaganda - Ajustado para mobile -->
      <div class="fixed bottom-24 md:bottom-32 left-0 right-0 z-30 px-4 md:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="glass-container overflow-hidden">
            <a href="https://erecaoduradoura.com.br" 
               target="_blank"
               class="block relative group"
            >
              <div class="relative overflow-hidden rounded-xl md:rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=1200"
                  alt="Ereção Duradoura"
                  class="w-full h-16 md:h-24 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/70 backdrop-blur-sm"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <h3 class="text-lg md:text-xl font-bold text-white mb-0 md:mb-1">Descubra o Segredo</h3>
                    <p class="text-white/90 text-xs md:text-sm">Clique aqui para uma performance extraordinária</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Botão de Rolar - Ajustado para mobile -->
    <div class="fixed bottom-0 left-0 right-0 z-40 p-2 md:p-4 bg-gradient-to-t from-slate-900 to-transparent h-20 md:h-24 flex items-center justify-center">
      <button
        on:click={rollDice}
        disabled={selectedPositions.length < 6 || isRolling}
        class="floating-button {selectedPositions.length >= 6 ? 'animate-bounce-subtle' : ''}"
      >
        <span class="relative z-10">
          {#if selectedPositions.length < 6}
            Selecione {6 - selectedPositions.length} posições
          {:else if isRolling}
            Rolando...
          {:else}
            Rolar o Dado
          {/if}
        </span>
      </button>
    </div>

    <!-- Indicador de Progresso -->
    <div class="fixed bottom-24 left-0 right-0 h-1 bg-white/10 z-30">
      <div
        class="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
        style="width: {(selectedPositions.length / 20) * 100}%"
      ></div>
    </div>

    <!-- Modal do Resultado -->
    {#if showModal && currentPosition}
      <div class="fixed inset-0 flex items-center justify-center z-50" on:click={closeModal}>
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
        <div 
          class="relative max-w-4xl w-full mx-4 modal-content"
          on:click|stopPropagation
        >
          <div class="relative overflow-hidden rounded-3xl">
            <div class="absolute inset-0">
              <img
                src={currentPosition.image}
                alt={currentPosition.name}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="relative p-12 backdrop-blur-md bg-gradient-to-b from-black/70 to-black/90">
              <button 
                class="absolute top-4 right-4 text-white/80 hover:text-white"
                on:click={closeModal}
              >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 class="font-display text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                {currentPosition.name}
              </h2>
              <p class="text-white/90 text-2xl font-light leading-relaxed">
                {currentPosition.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <style lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

    :global(body) {
      @apply m-0 p-0;
      background: url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200') center/cover fixed;
      font-family: 'Cinzel', serif;
    }

    .animate-gradient {
      @apply text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400;
      background-size: 300% 300%;
      animation: gradient 8s ease infinite;
    }

    .floating-button.s-6vshDfNb189Y {
      @apply px-6 py-3 md:px-16 md:py-6 text-lg md:text-2xl rounded-xl md:rounded-2xl;
      margin-bottom: 0.5rem;
    }

    .modal-content {
      animation: modalFadeIn 0.3s ease-out;
    }

    .glass-container {
      @apply backdrop-blur-xl bg-white/5 border border-white/10;
      box-shadow: 0 0 50px rgba(168, 85, 247, 0.2);
    }

    .glass-card {
      @apply backdrop-blur-md border border-white/10;
      box-shadow: 0 0 30px rgba(168, 85, 247, 0.1);
    }

    .glass-card:hover {
      box-shadow: 0 0 40px rgba(168, 85, 247, 0.2);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @keyframes modalFadeIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Ajustes responsivos aprimorados */
    .floating-button.s-6vshDfNb189Y {
      @apply px-6 py-3 md:px-16 md:py-6 text-lg md:text-2xl rounded-xl md:rounded-2xl;
      margin-bottom: 0.5rem;
    }

    /* Ajustes para telas muito pequenas */
    @media (max-width: 360px) {
      .floating-button.s-6vshDfNb189Y {
        @apply px-4 py-2 text-base;
      }

      h1 {
        @apply text-3xl;
      }

      h2 {
        @apply text-xl;
      }
    }

    /* Ajuste para garantir espaço suficiente para o banner e botão */
    @media (max-height: 700px) {
      .glass-container {
        margin-bottom: 10rem;
      }
    }

    /* Ajuste para o modal em mobile */
    @media (max-width: 767px) {
      .modal-content {
        @apply mx-2;
      }

      .modal-content .relative.p-12 {
        @apply p-6;
      }

      .modal-content h2 {
        @apply text-3xl mb-4;
      }

      .modal-content p {
        @apply text-lg;
      }

      .floating-button.s-6vshDfNb189Y {
        margin-bottom: 1rem;
      }
    }
  </style>