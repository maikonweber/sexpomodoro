<script lang="ts">
    import { onMount } from 'svelte';
    import { tasks, timeLeft, isRunning as storeIsRunning, currentTask } from '../store/store';

    interface Categoria {
        id: number;
        tipo: string[];
        estimulacao: string[];
        penetracao: string[];
        caricias: string[];
        localizacao: string[];
        atividade: string[];
        complexidade: string[];
    }

    interface CategoriaPosition {
        id: number;
        kamasutra_position_id: number;
        categoria_id: number;
        categoria: Categoria;
    }

    interface KamasutraPosition {
        id: number;
        name: string;
        url: string;
        ref_number: number;
        descricao: string;
        dificulty: string;
        categorias: CategoriaPosition[];
    }

    interface Position {
        name: string;
        description: string;
        image: string;
    }

    let newTaskInput = '';
    let timer: ReturnType<typeof setInterval>;
    const selectedMinutes = 25;
    let time = selectedMinutes * 60;
    let isRunning = false;
  
    let selectedPositions: KamasutraPosition[] = [];
    let currentPosition: KamasutraPosition | null = null;
    let isRolling = false;
    let showModal = false;
    let loading = false;
    let error = '';
    let isMuted = false;
    let isMobile = false;

    async function fetchKamasutraPositions(): Promise<KamasutraPosition[]> {
        loading = true;
        error = '';
        try {
            const response = await fetch('https://dev.muttercorp.com.br/kamasutra', {
                headers: {
                    'accept': '*/*'
                }
            });
            
            if (!response.ok) {
                throw new Error('Falha ao carregar posições');
            }
            
            return await response.json();
        } catch (err) {
            console.error('Erro ao buscar posições:', err);
            error = 'Erro ao carregar posições. Tente novamente mais tarde.';
            return [];
        } finally {
            loading = false;
        }
    }

    let allPositions: KamasutraPosition[] = [];

    onMount(async () => {
        allPositions = await fetchKamasutraPositions();
    });
  
    // Format time for display
    const formatTime = (seconds: number): string => {
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
      if (allPositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * allPositions.length);
        currentPosition = allPositions[randomIndex];
      }
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
  
    function toggleTask(id: number) {
      tasks.update(t =>
        t.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    }
  
    function deleteTask(id: number) {
      tasks.update(t => t.filter(task => task.id !== id));
      if ($currentTask === id) {
        currentTask.set(null);
      }
    }
  
    function selectTask(id: number) {
      currentTask.set(id);
      resetTimer();
    }
  
    function incrementPomodoro(id: number) {
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
          body: `Time to take a break and change position to: ${currentPosition?.name}`,
        });
        if ($currentTask) {
          incrementPomodoro($currentTask);
        }
      }
    }
  
    function togglePosition(position: KamasutraPosition) {
      if (selectedPositions.some(p => p.name === position.name)) {
        selectedPositions = selectedPositions.filter(p => p.name !== position.name);
      } else {
        selectedPositions = [...selectedPositions, position];
      }
    }
  
    let diceSound: HTMLAudioElement;
    let selectSound: HTMLAudioElement;
    let hoverSound: HTMLAudioElement;
  
    onMount(() => {
      Notification.requestPermission();
      diceSound = new Audio('../sounds/dice-roll.mp3');
      selectSound = new Audio('../sounds/select.mp3');
      hoverSound = new Audio('../sounds/hover.mp3');
      
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
  
    async function fetchKamasutraPosition(id: number): Promise<KamasutraPosition | null> {
        try {
            const response = await fetch(`https://dev.muttercorp.com.br/kamasutra/${id}`, {
                headers: {
                    'accept': '*/*'
                }
            });
            
            if (!response.ok) {
                throw new Error('Falha ao carregar posição');
            }
            
            return await response.json();
        } catch (err) {
            console.error('Erro ao buscar posição:', err);
            return null;
        }
    }
  
    async function rollDice() {
        if (selectedPositions.length < 6) return;
        
        playSound(diceSound);
        isRolling = true;
        showModal = true;

        // Rola a página para o topo imediatamente
        window.scrollTo(0, 0);

        try {
            // Seleciona uma posição aleatória das posições selecionadas
            const randomIndex = Math.floor(Math.random() * selectedPositions.length);
            const selectedPosition = selectedPositions[randomIndex];
            console.log('Posição selecionada:', selectedPosition);

            // Busca os detalhes completos da posição na API usando o ID da posição selecionada
            const positionDetails = await fetchKamasutraPosition(selectedPosition.id);
            console.log('Detalhes da posição:', positionDetails);
            
            if (positionDetails) {
                currentPosition = positionDetails;
                console.log('URL da imagem:', currentPosition.url);
            } else {
                // Fallback para a posição selecionada se a API falhar
                currentPosition = selectedPosition;
            }
        } catch (error) {
            console.error('Erro ao rolar o dado:', error);
            // Fallback para uma posição aleatória das selecionadas em caso de erro
            const fallbackIndex = Math.floor(Math.random() * selectedPositions.length);
            currentPosition = selectedPositions[fallbackIndex];
        } finally {
            isRolling = false;
        }
    }
  
    function closeModal() {
      showModal = false;
    }
  </script>
  
  <div class="min-h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 p-4 md:p-8 backdrop-blur-md">
    <!-- Barra de Navegação -->
    <div class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border-b border-white/10">
      <div class="max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
        <h1 class="text-white/80 text-xl font-medium"> Sex Pomodoro </h1>
        <div class="flex gap-4">
          <a
            href="/"
            class="glass-button-outline px-4 py-2 rounded-full text-sm md:text-base text-white/80 hover:text-white transition-all duration-300"
            on:mouseenter={() => playSound(hoverSound)}
          >
            Timer
          </a>
          <a
            href="/kamasutra-dado"
            class="glass-button-outline px-4 py-2 rounded-full text-sm md:text-base text-white/80 hover:text-white transition-all duration-300"
            on:mouseenter={() => playSound(hoverSound)}
          >
            Kamasutra Dado
          </a>
          <a
            href="/raspadinha"
            class="glass-button-outline px-4 py-2 rounded-full text-sm md:text-base text-white/80 hover:text-white transition-all duration-300"
            on:mouseenter={() => playSound(hoverSound)}
          >
            Raspadinha
          </a>
        </div>
      </div>
    </div>

    <!-- Botão de Som -->
    <button
      class="fixed top-20 right-2 md:top-24 md:right-4 z-50 glass-button-outline p-2 md:p-3 rounded-full"
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

    <div class="max-w-6xl mx-auto pt-24">
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
            {#if loading}
              {#each Array(6) as _, i}
                <div class="glass-card group relative overflow-hidden rounded-2xl md:rounded-3xl animate-pulse">
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50"></div>
                  <div class="relative p-4 md:p-8 backdrop-blur-sm bg-white/5 h-full">
                    <div class="h-8 bg-white/10 rounded w-3/4 mb-4"></div>
                    <div class="h-4 bg-white/10 rounded w-full mb-2"></div>
                    <div class="h-4 bg-white/10 rounded w-5/6"></div>
                  </div>
                </div>
              {/each}
            {:else if error}
              <div class="col-span-full text-center py-12">
                <div class="glass-card p-8 rounded-2xl">
                  <p class="text-white/90 text-xl mb-4">{error}</p>
                  <button 
                    class="glass-button-outline px-6 py-3 rounded-full"
                    on:click={async () => {
                      allPositions = await fetchKamasutraPositions();
                    }}
                  >
                    Tentar Novamente
                  </button>
                </div>
              </div>
            {:else}
              {#each allPositions as position}
                <button
                  class="glass-card group relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 hover:scale-105"
                  on:click={() => togglePosition(position)}
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50"></div>
                  <div class="absolute inset-0">
                    <img
                      src={position.url}
                      alt={position.name}
                      class="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-500 scale-105"
                    />
                  </div>
                  <div class="relative p-4 md:p-8 backdrop-blur-sm bg-white/5 h-full">
                    <h3 class="font-display text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{position.name}</h3>
                    <p class="text-white/90 text-base md:text-lg font-light">{position.descricao}</p>
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
            {/if}
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
    <div class="sticky bottom-8 right-8 float-right z-[100]">
      <button
        on:click={rollDice}
        disabled={selectedPositions.length < 6 || isRolling}
        class="floating-dice-button {selectedPositions.length >= 6 ? 'animate-bounce-subtle' : ''}"
        aria-label="Rolar o dado"
      >
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-50"></div>
          <div class="relative bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <svg class="w-8 h-8 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
        {#if selectedPositions.length < 6}
          <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white whitespace-nowrap">
            Selecione {6 - selectedPositions.length} posições
          </div>
        {/if}
      </button>
    </div>

    <!-- Indicador de Progresso -->
    <div class="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
      <div
        class="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
        style="width: {(selectedPositions.length / 20) * 100}%"
      ></div>
    </div>

    <!-- Modal do Resultado -->
    {#if showModal && currentPosition}
      <div 
        class="fixed inset-0 flex items-start justify-center z-[200] overflow-y-auto" 
        role="dialog"
        aria-modal="true"
        on:click={closeModal}
        on:keydown={e => e.key === 'Escape' && closeModal()}
        tabindex="-1"
      >
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
        <div 
          class="relative max-w-4xl w-full mx-4 modal-content mt-8"
          role="document"
          on:click|stopPropagation
        >
          <div class="relative overflow-hidden rounded-3xl bg-black/50">
            <div class="relative h-[60vh] min-h-[400px]">
              {#if currentPosition.url}
                <img
                  src={currentPosition.url}
                  alt={currentPosition.name}
                  class="w-full h-full object-contain bg-black/30"
                  loading="lazy"
                  on:load={() => console.log('Imagem carregada com sucesso')}
                  on:error={(e) => {
                    console.error('Erro ao carregar imagem:', e);
                    const img = e.currentTarget as HTMLImageElement;
                    img.src = 'https://via.placeholder.com/800x600?text=Imagem+não+disponível';
                  }}
                />
              {:else}
                <div class="w-full h-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                  <span class="text-white/80 text-xl">Imagem não disponível</span>
                </div>
              {/if}
            </div>
            <div class="relative p-12 backdrop-blur-md bg-gradient-to-b from-black/90 via-black/80 to-black/90">
              <button 
                class="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-200"
                on:click={closeModal}
                aria-label="Fechar modal"
              >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 class="font-display text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-lg">
                {currentPosition.name}
              </h2>
              <p class="text-white text-2xl font-light leading-relaxed drop-shadow-lg whitespace-pre-line">
                {currentPosition.descricao}
              </p>
              <div class="mt-4 flex items-center gap-2">
                <span class="text-white/80 text-sm">Dificuldade: {currentPosition.dificulty}</span>
                <span class="text-white/80 text-sm">•</span>
                <span class="text-white/80 text-sm">Ref: {currentPosition.ref_number}</span>
              </div>
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

    .floating-dice-button {
      @apply transition-all duration-300 transform hover:scale-110 focus:outline-none;
      position: relative;
      z-index: 100;
    }

    .floating-dice-button:disabled {
      @apply opacity-50 cursor-not-allowed hover:scale-100;
    }

    .modal-content {
      animation: modalFadeIn 0.3s ease-out;
      max-height: 90vh;
      overflow-y: auto;
      margin-top: 2rem;
    }

    .modal-content img {
      transition: transform 0.3s ease;
    }

    .modal-content:hover img {
      transform: scale(1.05);
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
        transform: scale(0.95) translateY(-10px);
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

    @media (max-width: 360px) {
      .floating-dice-button {
        @apply scale-90;
      }

      h1 {
        @apply text-3xl;
      }

      h2 {
        @apply text-xl;
      }
    }

    @media (max-width: 767px) {
      .modal-content {
        @apply mx-2;
      }

      .modal-content :global(.relative.p-12) {
        @apply p-6;
      }

      .modal-content h2 {
        @apply text-3xl mb-4;
      }

      .modal-content p {
        @apply text-lg;
      }

      .floating-dice-button {
        transform: scale(0.9);
      }
    }

    @media (min-width: 768px) {
      .floating-dice-button {
        transform: scale(1);
      }
    }
  </style>