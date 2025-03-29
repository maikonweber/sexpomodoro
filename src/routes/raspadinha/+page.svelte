<script lang="ts">
    import { onMount } from 'svelte';

    interface RaspadinhaItem {
        id: number;
        frase: string;
        revelado: boolean;
        jogador: number | null;
        raspando: boolean;
        progresso: number;
    }

    let items: RaspadinhaItem[] = [];
    let isMuted = false;
    let numJogadores = 2;
    let jogadorAtual = 1;
    let raspadinhaSound: HTMLAudioElement;
    let reveladoSound: HTMLAudioElement;
    let hoverSound: HTMLAudioElement;
    let itemAtual: RaspadinhaItem | null = null;
    let intervaloRaspagem: ReturnType<typeof setInterval>;

    const todasFrases = [
        "Beije seu parceiro(a) por 30 segundos",
        "Faça uma massagem sensual nas costas de alguém à sua escolha",
        "Dance uma música romântica com uma pessoa do grupo",
        "Faça um striptease lento para todos assistirem",
        "Beije o pescoço de uma pessoa à sua escolha",
        "Faça uma massagem nos pés de alguém",
        "Dê um beijo na boca da pessoa à sua direita",
        "Faça uma dança do ventre para o grupo",
        "Beije as mãos de uma pessoa à sua escolha",
        "Faça uma massagem sensual nas pernas de alguém",
        "Dê um beijo na testa de cada pessoa do grupo",
        "Faça uma dança sensual para o grupo",
        "Beije as orelhas de uma pessoa à sua escolha",
        "Faça uma massagem nos ombros de alguém",
        "Dê um beijo no pescoço da pessoa à sua esquerda",
        "Sussurre algo extremamente excitante no ouvido de uma pessoa à sua escolha",
        "Lamba lentamente alguma parte do corpo de uma pessoa do grupo",
        "Joguem um desafio onde cada rodada alguém precisa tirar uma peça de roupa",
        "Use gelo para estimular diferentes partes do corpo de alguém",
        "Passe uma pena pelo corpo de uma pessoa do grupo lentamente",
        "Provoque alguém do grupo com beijos sem deixar que te toque",
        "Use chocolate, chantilly ou mel para brincar com alguém",
        "Venda os olhos de uma pessoa e explore o corpo dela com toques suaves",
        "Sussurre fantasias sexuais no ouvido da pessoa à sua frente",
        "Morda suavemente alguma parte do corpo de uma pessoa à sua escolha",
        "Beije a boca de uma pessoa do grupo sem usar as mãos",
        "Faça um desafio onde uma pessoa do grupo não pode gemer enquanto você a provoca",
        "Brinquem de 'não toque', encostando-se de leve sem permitir o toque completo",
        "Escolha um lugar proibido do corpo de alguém e toque nele lentamente",
        "Recrie uma cena de filme ou série sensual com outra pessoa",
        "Joguem um dado erótico e sigam a ação indicada",
        "Fale algo extremamente picante olhando nos olhos de uma pessoa do grupo",
        "Dê beijos molhados pelo corpo de alguém por 1 minuto",
        "Beije e morda suavemente os lábios de uma pessoa do grupo",
        "Brinque de roleplay sexy com alguém",
        "Tire uma peça de roupa de uma pessoa usando apenas os dentes",
        "Escreva algo sensual no corpo de uma pessoa com a língua",
        "Deite-se e deixe uma pessoa do grupo explorar seu corpo por 2 minutos sem se mover",
        "Toque alguém apenas com a ponta dos dedos de forma provocante",
        "Escolha um acessório sensual para usar ou para colocar em outra pessoa",
        "Envie uma mensagem picante para alguém do grupo sem dizer para quem foi",
        "Diga a uma pessoa três coisas que adoraria fazer com ela agora",
        "Beije duas pessoas do grupo ao mesmo tempo",
        "Dança sensual no colo de alguém",
        "Fique sussurrando provocações no ouvido de uma pessoa do grupo por 1 minuto",
        "Tente excitar alguém sem usar as mãos",
        "Passe os lábios pelo corpo de uma pessoa sem beijá-la",
        "Escolha dois jogadores e peça para eles trocarem beijos",
        "Deixe que o grupo escolha um desafio sensual para você cumprir",
        "Simulem um encontro proibido como se fossem desconhecidos se encontrando pela primeira vez",
        "O grupo escolhe uma parte do corpo que você deve beijar em outra pessoa",
        "Escolha alguém para trocar carícias às cegas por 1 minuto",
        "Alguém do grupo pode sussurrar uma fantasia no seu ouvido, e você deve cumpri-la",
        "Escolha uma pessoa do grupo e obedeça a um comando sensual dela",
        "Faça um jogo de sedução: o primeiro a gemer perde",
        "Forme duplas e revezem beijos provocantes",
        "O grupo decide quem dará um beijo mais ousado em você"
    ];

    function selecionarFrasesAleatorias() {
        const frasesSelecionadas = [...todasFrases]
            .sort(() => Math.random() - 0.5)
            .slice(0, 15);
        
        return frasesSelecionadas;
    }

    onMount(() => {
        // Inicializa os itens da raspadinha com 15 frases aleatórias
        const frasesSelecionadas = selecionarFrasesAleatorias();
        items = frasesSelecionadas.map((frase, index) => ({
            id: index + 1,
            frase,
            revelado: false,
            jogador: null,
            raspando: false,
            progresso: 0
        }));

        // Inicializa os sons
        try {
            raspadinhaSound = new Audio('/sounds/raspadinha.mp3');
            reveladoSound = new Audio('/sounds/revelado.mp3');
            hoverSound = new Audio('/sounds/hover.mp3');
        } catch (error) {
            console.error('Erro ao carregar sons:', error);
        }
    });

    function playSound(sound: HTMLAudioElement) {
        if (!isMuted && sound) {
            sound.currentTime = 0;
            sound.play().catch(error => console.error('Erro ao tocar som:', error));
        }
    }

    function iniciarRaspagem(id: number) {
        const item = items.find(i => i.id === id);
        if (item && !item.revelado) {
            item.raspando = true;
            itemAtual = item;
            playSound(raspadinhaSound);
            
            // Inicia a animação de raspagem
            intervaloRaspagem = setInterval(() => {
                if (item.progresso < 100) {
                    item.progresso += 2;
                } else {
                    clearInterval(intervaloRaspagem);
                    revelarItem(id);
                }
            }, 50);
        }
    }

    function revelarItem(id: number) {
        const item = items.find(i => i.id === id);
        if (item && !item.revelado) {
            clearInterval(intervaloRaspagem);
            item.revelado = true;
            item.raspando = false;
            item.jogador = jogadorAtual;
            playSound(reveladoSound);
            
            // Próximo jogador
            jogadorAtual = (jogadorAtual % numJogadores) + 1;
        }
    }

    function resetarRaspadinha() {
        clearInterval(intervaloRaspagem);
        // Seleciona novas frases aleatórias
        const frasesSelecionadas = selecionarFrasesAleatorias();
        items = frasesSelecionadas.map((frase, index) => ({
            id: index + 1,
            frase,
            revelado: false,
            jogador: null,
            raspando: false,
            progresso: 0
        }));
        jogadorAtual = 1;
        itemAtual = null;
    }

    function setNumJogadores(num: number) {
        numJogadores = num;
        resetarRaspadinha();
    }

    function toggleMute() {
        isMuted = !isMuted;
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 p-4 md:p-8 backdrop-blur-md">
    <!-- Barra de Navegação -->
    <div class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border-b border-white/10">
        <div class="max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
            <h1 class="text-white/80 text-xl font-medium">Sex Pomodoro</h1>
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
        on:click={toggleMute}
        aria-label={isMuted ? "Ativar som" : "Desativar som"}
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
        <!-- Banner Ereção Duradoura -->
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

        <div class="glass-container p-4 md:p-8 rounded-3xl mb-24">
            <!-- Título -->
            <h1 class="font-display text-4xl md:text-7xl font-bold text-center mb-8 md:mb-12 animate-gradient">
                Raspadinha do Amor
            </h1>

            <!-- Seleção de Jogadores -->
            <div class="flex justify-center gap-4 mb-8">
                {#each Array(3) as _, i}
                    <button
                        class="glass-button-outline px-6 py-3 rounded-full text-lg font-medium {numJogadores === i + 2 ? 'bg-white/20 border-white/40' : ''}"
                        on:click={() => setNumJogadores(i + 2)}
                        aria-pressed={numJogadores === i + 2}
                    >
                        {i + 2} Jogadores
                    </button>
                {/each}
            </div>

            <!-- Indicador de Jogador Atual -->
            <div class="text-center mb-8">
                <div class="inline-block glass-button-outline px-6 py-3 rounded-full">
                    <span class="text-white/80">Jogador Atual: </span>
                    <span class="text-pink-400 font-bold">{jogadorAtual}</span>
                </div>
            </div>

            <!-- Grid de Raspadinhas -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {#each items as item}
                    <div class="glass-card group relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 hover:scale-105">
                        <div class="relative h-48">
                            {#if item.revelado}
                                <div class="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm flex flex-col items-center justify-center p-6">
                                    <p class="text-white text-xl text-center font-medium mb-2">{item.frase}</p>
                                    <span class="text-pink-400 text-sm">Jogador {item.jogador}</span>
                                </div>
                            {:else}
                                <button
                                    class="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500 cursor-pointer"
                                    on:mousedown={() => iniciarRaspagem(item.id)}
                                    on:mouseup={() => revelarItem(item.id)}
                                    on:mouseleave={() => {
                                        item.raspando = false;
                                        clearInterval(intervaloRaspagem);
                                        item.progresso = 0;
                                    }}
                                    aria-label="Revelar item"
                                >
                                    <div class="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500" style="clip-path: inset(0 {100 - item.progresso}% 0 0);"></div>
                                    <div class="text-white text-2xl font-bold relative z-10">?</div>
                                </button>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Botão de Reset -->
            <div class="mt-12 text-center">
                <button
                    class="glass-button-outline px-8 py-4 rounded-full text-xl font-medium"
                    on:click={resetarRaspadinha}
                >
                    Resetar Raspadinha
                </button>
            </div>
        </div>
    </div>

    <!-- Banner Inferior -->
    <div class="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border-t border-white/10">
        <div class="max-w-6xl mx-auto h-full flex items-center justify-center">
            <h2 class="text-white/80 text-xl md:text-2xl font-medium text-center">
                Divirta-se com Desafios Picantes
            </h2>
        </div>
    </div>
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

    .glass-button-outline {
        @apply bg-transparent border-2 border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-300;
    }

    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    @media (max-width: 360px) {
        h1 {
            @apply text-3xl;
        }
    }
</style>
