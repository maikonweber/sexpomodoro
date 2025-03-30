<script lang="ts">
  export let title = "Sex Pomodoro";
  let isMuted = false;
  let hoverSound: HTMLAudioElement;

  import { onMount } from 'svelte';

  onMount(() => {
    hoverSound = new Audio('../sounds/hover.mp3');
  });

  function playSound(sound: HTMLAudioElement) {
    if (!isMuted && sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.error('Erro ao tocar som:', err));
    }
  }
</script>

<div class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border-b border-white/10">
  <div class="max-w-6xl mx-auto h-16 flex items-center justify-between px-2 md:px-4">
    <h1 class="text-white/80 text-sm md:text-xl font-medium whitespace-nowrap">{title}</h1>
    <nav class="flex gap-2 md:gap-4 overflow-x-auto hide-scrollbar">
      <a
        href="/"
        class="glass-button-outline min-w-fit px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-base text-white/80 hover:text-white transition-all duration-300 whitespace-nowrap"
        on:mouseenter={() => playSound(hoverSound)}
      >
        Timer
      </a>
      <a
        href="/kamasutra-dado"
        class="glass-button-outline min-w-fit px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-base text-white/80 hover:text-white transition-all duration-300 whitespace-nowrap"
        on:mouseenter={() => playSound(hoverSound)}
      >
        K.Dado
      </a>
      <a
        href="/raspadinha"
        class="glass-button-outline min-w-fit px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-base text-white/80 hover:text-white transition-all duration-300 whitespace-nowrap"
        on:mouseenter={() => playSound(hoverSound)}
      >
        Raspadinha
      </a>
      <a
        href="/shop"
        class="glass-button-outline min-w-fit px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-base text-white/80 hover:text-white transition-all duration-300 whitespace-nowrap"
        on:mouseenter={() => playSound(hoverSound)}
      >
        Shop
      </a>
    </nav>
  </div>
</div>

<style lang="postcss">
  .glass-button-outline {
    @apply border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300;
  }

  .glass-button-outline:hover {
    @apply border-white/40 bg-white/10;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style> 