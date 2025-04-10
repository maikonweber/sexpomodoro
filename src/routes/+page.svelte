<script lang="ts">
  import { onMount } from 'svelte';
  import { tasks, timeLeft, isRunning as storeIsRunning, currentTask } from './store/store';
  import Header from './components/Header.svelte';
	import AdultProductsBanner from './components/AdultProductsBanner.svelte';

  interface Task {
    id: number;
    text: string;
    completed: boolean;
    pomodoros: number;
  }

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
    imageUrl?: string;
  }

  // URLs dos sons com fallback para CDN
  const SOUND_URLS = {
    click: {
      local: '/sounds/clicks.mp3',
      cdn: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c6a797f1.mp3?filename=click-button-140881.mp3'
    },
    timerEnd: {
      local: '/sounds/times-end.mp3',
      cdn: 'https://cdn.pixabay.com/download/audio/2022/03/19/audio_c8c6a797f1.mp3?filename=notification-sound-127856.mp3'
    },
    hover: {
      local: '/sounds/hover.mp3',
      cdn: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_c8c6a797f1.mp3?filename=hover-pop-125867.mp3'
    }
  };

  let newTaskInput = '';
  let timer: number;
  // biome-ignore lint/style/useConst: <explanation>
  let selectedMinutes = 25;
  let lastSelectedMinutes = selectedMinutes;
  let time = selectedMinutes * 60;
  let isRunning = false;
  let currentPosition: Position = { 
    name: 'Carregando...', 
    description: 'Buscando posição...',
    imageUrl: ''
  };
  let loading = false;

  // Sons
  let clickSound: HTMLAudioElement;
  let timerEndSound: HTMLAudioElement;
  let hoverSound: HTMLAudioElement;
  // biome-ignore lint/style/useConst: <explanation>
  let isMuted = false;

  // Responsividade
  let isMobile = false;

  // svelte-ignore export_let_unused
    export let data;

  async function fetchRandomPosition() {
    loading = true;
    try {
      const randomIndex = Math.floor(Math.random() * 450) + 1; // Gera número entre 1 e 450
      const response = await fetch(`https://dev.muttercorp.com.br/kamasutra/${randomIndex}`, {
        headers: {
          'accept': '*/*'
        }
      });
      
      if (!response.ok) {
        // Se a posição não existir, tenta novamente com outro número
        if (response.status === 404) {
          return fetchRandomPosition();
        }
        throw new Error('Falha ao carregar posição');
      }
      
      const data: KamasutraPosition = await response.json();
      currentPosition = {
        name: data.name,
        description: data.descricao,
        imageUrl: data.url
      };
    } catch (err) {
      console.error('Erro ao buscar posição:', err);
      currentPosition = {
        name: 'Posição Offline',
        description: 'Tente novamente mais tarde',
        imageUrl: ''
      };
    } finally {
      loading = false;
    }
  }

  // Format time for display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  function updateTimer() {
    lastSelectedMinutes = selectedMinutes;
    time = selectedMinutes * 60;
  }

  function startTimer() {
    if (!isRunning) {
      playSound(clickSound);
      isRunning = true;
      timer = setInterval(() => {
        if (time > 0) {
          time--;
        } else {
          clearInterval(timer);
          isRunning = false;
          playSound(timerEndSound);
          fetchRandomPosition();
          time = lastSelectedMinutes * 60; // Restaura o último tempo selecionado
          notify();
        }
      }, 1000) as unknown as number;
    }
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    time = lastSelectedMinutes * 60; // Usa o último tempo selecionado
  }

  // Task Management
  function addTask() {
    if (newTaskInput.trim()) {
      tasks.update((t: Task[]) => [...t, {
        id: Date.now(),
        text: newTaskInput,
        completed: false,
        pomodoros: 0
      }]);
      newTaskInput = '';
    }
  }

  function toggleTask(id: number) {
    tasks.update((t: Task[]) =>
      t.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id: number) {
    tasks.update((t: Task[]) => t.filter(task => task.id !== id));
    if ($currentTask === id) {
      currentTask.set(null);
    }
  }

  function selectTask(id: number) {
    currentTask.set(id);
    resetTimer();
  }

  function incrementPomodoro(id: number) {
    tasks.update((t: Task[]) =>
      t.map(task =>
        task.id === id ? { ...task, pomodoros: task.pomodoros + 1 } : task
      )
    );
  }

  // Notification
  function notify() {
    if (Notification.permission === "granted") {
      new Notification("Pomodoro Completed!", {
        body: `Time to take a break and change position to: ${currentPosition.name}`,
      });
      if ($currentTask) {
        incrementPomodoro($currentTask);
      }
    }
  }

  async function loadSound(soundType: keyof typeof SOUND_URLS): Promise<HTMLAudioElement> {
    const sound = new Audio(SOUND_URLS[soundType].local);
    
    try {
      await sound.load();
      return sound;
    } catch (err) {
      console.warn(`Falha ao carregar som local ${soundType}, usando CDN`, err);
      return new Audio(SOUND_URLS[soundType].cdn);
    }
  }

  onMount(() => {
    (async () => {
      try {
        // Inicializa os sons
        clickSound = await loadSound('click');
        timerEndSound = await loadSound('timerEnd');
        hoverSound = await loadSound('hover');
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        fetchRandomPosition();
        lastSelectedMinutes = selectedMinutes;

        Notification.requestPermission();
      } catch (err) {
        console.error('Erro ao inicializar sons:', err);
      }
    })();
    
    return () => {
      if (timer) clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  });

  function checkMobile() {
    isMobile = window.innerWidth < 768;
  }

  async function playSound(sound: HTMLAudioElement | null) {
    if (!isMuted && sound) {
      try {
        sound.currentTime = 0;
        await sound.play();
      } catch (err) {
        console.error('Erro ao tocar som:', err);
      }
    }
  }
</script>

<svelte:head>
  <title>Kama-Doro | Pomodoro Timer com Posições do Kamasutra</title>
  <meta name="description" content="Combine a técnica Pomodoro com posições do Kamasutra para uma experiência única de produtividade e intimidade. Timer personalizável com sugestões de posições." />
  <meta name="keywords" content="pomodoro, kamasutra, timer, produtividade, relacionamento, intimidade, meditação" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="SexPomodoro | Pomodoro Timer com Kamasutra" />
  <meta property="og:description" content="Combine a técnica Pomodoro com posições do Kamasutra para uma experiência única de produtividade e intimidade." />
  <meta property="og:image" content="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="SexPomodoro | Pomodoro Timer com Kamasutra" />
  <meta name="twitter:description" content="Timer Pomodoro com sugestões de posições do Kamasutra para uma experiência única." />
  <meta name="twitter:image" content="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200" />
  
  <!-- Additional Meta Tags -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#4A1D96" />
  <meta name="author" content="Maikon Weber de Carvalho" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sexpomodoro.com.br" />
  
  <!-- PWA Tags -->
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Kama-Doro" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-md relative overflow-x-hidden">
  <Header />

  <!-- Botão de Som -->
  <button
    class="fixed top-20 right-2 md:top-24 md:right-4 z-50 glass-button-outline p-2 md:p-3 rounded-full"
    on:click={() => isMuted = !isMuted}
  >
    {#if isMuted}
      <svg class="w-4 h-4 md:w-6 md:h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      </svg>
    {:else}
      <svg class="w-4 h-4 md:w-6 md:h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 8v8m-5.536-6.464a5 5 0 010 7.072" />
      </svg>
    {/if}
  </button>

  <main class="max-w-6xl mx-auto px-2 md:px-4 pt-20 md:pt-24 pb-24 relative">
    <!-- Banner -->
    <div class="glass-container mb-4 md:mb-8 overflow-hidden">
      <a href="https://erecaoduradoura.com.br" 
         target="_blank"
         class="block relative group"
         on:mouseenter={() => playSound(hoverSound)}
      >
        <div class="relative overflow-hidden rounded-xl md:rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=1200"
            alt="Ereção Duradoura"
            class="w-full h-24 md:h-32 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/70 backdrop-blur-sm"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <h3 class="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">Descubra o Segredo</h3>
              <p class="text-sm md:text-base text-white/90">Clique aqui para uma performance extraordinária</p>
            </div>
          </div>
        </div>
      </a>
    </div>

    <div class="glass-container p-4 md:p-8 rounded-2xl md:rounded-3xl mb-8 md:mb-12">
      <h1 class="font-display text-4xl md:text-7xl font-bold text-center mb-8 md:mb-12 animate-gradient">
        Kama-Doro
      </h1>
      
      <!-- Seletor de Tempo -->
      <div class="mb-8 md:mb-12 text-center">
        <select
          bind:value={selectedMinutes}
          on:change={updateTimer}
          class="glass-select px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-xl md:text-2xl backdrop-blur-lg
                 bg-white/5 border border-white/20 text-white/90
                 hover:border-pink-400 transition-all duration-500"
          disabled={isRunning}
        >
          <option value={0.5}>30 segundos</option>
          <option value={1}>1 minuto</option>
          <option value={5}>5 minutos</option>
          <option value={10}>10 minutos</option>
          <option value={15}>15 minutos</option>
          <option value={25}>25 minutos</option>
          <option value={30}>30 minutos</option>
        </select>
      </div>

      <!-- Timer -->
      <div class="relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-8 md:mb-16">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50"></div>
        <div class="relative w-full h-full bg-gradient-to-br from-purple-900/80 to-slate-900/80 rounded-full 
                    border border-white/20 backdrop-blur-md flex flex-col items-center justify-center
                    shadow-[0_0_50px_rgba(168,85,247,0.3)] hover:shadow-[0_0_70px_rgba(168,85,247,0.4)] 
                    transition-all duration-500">
          <span class="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            {formatTime(time)}
          </span>
          <span class="text-sm md:text-base text-white/60 mt-2">
            Tempo selecionado: {lastSelectedMinutes < 1 ? '30 segundos' : `${lastSelectedMinutes} ${lastSelectedMinutes === 1 ? 'minuto' : 'minutos'}`}
          </span>
        </div>
      </div>

      <!-- Controles -->
      <div class="flex justify-center gap-4 md:gap-8 mb-8 md:mb-16">
        {#if !isRunning}
          <button
            on:click={startTimer}
            class="glass-button px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-xl md:text-2xl text-white/90
                   shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)]
                   hover:scale-105 transition-all duration-500"
          >
            Iniciar
          </button>
        {:else}
          <button
            on:click={pauseTimer}
            class="glass-button-alt px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-xl md:text-2xl text-white/90
                   shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]
                   hover:scale-105 transition-all duration-500 {time <= 10 ? 'animate-pulse' : ''}"
          >
            Pausar
          </button>
        {/if}
        <button
          on:click={resetTimer}
          class="glass-button-outline px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-xl md:text-2xl text-white/80
                 hover:text-white transition-all duration-500 hover:scale-105"
        >
          Reiniciar
        </button>
      </div>

      <!-- Card da Posição -->
      <div
        class="glass-card group relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 hover:scale-102 w-full"
        role="region"
        aria-label="Posição do Kamasutra"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50"></div>
        <div class="relative p-4 md:p-8 backdrop-blur-sm bg-white/5">
          {#if loading}
            <div class="flex items-center justify-center py-16">
              <div class="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" role="progressbar" aria-label="Carregando..."></div>
            </div>
          {:else}
            <div class="flex flex-col gap-6">
              {#if currentPosition.imageUrl}
                <div class="max-w-2xl mx-auto w-full relative overflow-hidden rounded-xl shadow-2xl">
                  <img 
                    src={currentPosition.imageUrl} 
                    alt={currentPosition.name}
                    class="w-full h-auto max-h-[400px] object-contain bg-black/20 backdrop-blur-md transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                </div>
              {/if}
              <div class="w-full max-w-3xl mx-auto">
                <h2 class="font-display text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  {currentPosition.name}
                </h2>
                <p class="text-lg md:text-xl font-light leading-relaxed text-white/90">
                  {currentPosition.description}
                </p>
              </div>
            </div>
          {/if}
        </div>

        <div class="absolute bottom-4 right-4 flex gap-2">
          <button
            class="glass-button-outline p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            on:click={fetchRandomPosition}
            aria-label="Próxima posição"
          >
            <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </main>

  <!-- Indicador de Progresso -->
  <div class="fixed bottom-0 left-0 right-0 h-1 bg-white/10">
    <div
      class="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
      style="width: {((selectedMinutes * 60 - time) / (selectedMinutes * 60)) * 100}%"
    ></div>
  </div>


  <AdultProductsBanner />
</div>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

  :global(body) {
    @apply m-0 p-0 overflow-x-hidden;
    background: url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200') center/cover fixed;
    font-family: 'Cinzel', serif;
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }

  :global(html) {
    height: -webkit-fill-available;
  }

  .min-h-screen {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }

  .animate-gradient {
    @apply text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400;
    background-size: 300% 300%;
    animation: gradient 8s ease infinite;
  }

  .glass-container {
    @apply backdrop-blur-xl bg-white/5 border border-white/10 w-full max-w-full;
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.2);
    transition: transform 0.3s ease;
  }

  .glass-container:hover {
    transform: translateY(-2px);
  }

  .glass-button {
    @apply bg-gradient-to-r from-pink-500/50 to-purple-500/50 border border-white/20 backdrop-blur-md;
  }

  .glass-button-alt {
    @apply bg-gradient-to-r from-purple-500/50 to-pink-500/50 border border-white/20 backdrop-blur-md;
  }

  .glass-button-outline {
    @apply bg-transparent border-2 border-white/20 backdrop-blur-md hover:border-pink-500/50 hover:bg-white/5 max-w-full;
  }

  .glass-select {
    @apply appearance-none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.5em;
    padding-right: 2.5rem;
  }

  .glass-select option {
    @apply bg-slate-900 text-white;
  }

  .glass-card {
    @apply backdrop-blur-xl bg-white/5 border border-white/10;
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.2);
  }

  .glass-card:hover {
    box-shadow: 0 0 70px rgba(236, 72, 153, 0.3);
  }

  /* Animações e transições */
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Ajustes para mobile */
  @media (max-width: 640px) {
    main {
      @apply px-2;
    }

    .glass-container {
      @apply mx-0;
    }

    .glass-button-outline {
      @apply text-xs px-2 py-1;
    }

    h1 {
      @apply text-2xl;
    }

    h2 {
      @apply text-xl;
    }
  }

  /* Fix para iOS */
  @supports (-webkit-touch-callout: none) {
    .min-h-screen {
      min-height: -webkit-fill-available;
    }
  }

  /* Otimizações de performance */
  * {
    @apply transform-gpu transition-all duration-300;
  }

  /* Hide scrollbar */
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>