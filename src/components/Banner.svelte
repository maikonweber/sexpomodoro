<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    // Store for banner data
    const bannerData = writable([]);
    const isLoading = writable(true);
    const currentIndex = writable(0);
    let error = null;

    // Props
    export let interval = 5000; // Time between slides in ms
    export let autoplay = true;
    export let height = "200px";

    let timer;

    onMount(async () => {
        await loadBannerData();
        if (autoplay) startAutoplay();

        return () => {
            if (timer) clearInterval(timer);
        };
    });

    async function loadBannerData() {
        try {
            isLoading.set(true);
            const token = localStorage.getItem('MutterCorp');
            const response = await fetch('https://dev.muttercorp.com.br/product-refer', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch banner data');
            }

            const data = await response.json();
            bannerData.set(data);
        } catch (err) {
            error = err.message;
            console.error('Error loading banner data:', err);
        } finally {
            isLoading.set(false);
        }
    }

    function startAutoplay() {
        timer = setInterval(() => {
            currentIndex.update(n => ($bannerData.length > 0 ? (n + 1) % $bannerData.length : 0));
        }, interval);
    }

    function stopAutoplay() {
        if (timer) clearInterval(timer);
    }

    function handleMouseEnter() {
        if (autoplay) stopAutoplay();
    }

    function handleMouseLeave() {
        if (autoplay) startAutoplay();
    }

    function goToSlide(index) {
        currentIndex.set(index);
    }

    function handleBannerClick(banner) {
        if (banner.link) {
            window.open(banner.link, '_blank');
        }
    }
</script>

<div 
    class="banner-container"
    style="height: {height}"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
>
    {#if $isLoading}
        <div class="loading-state">
            <div class="spinner"></div>
        </div>
    {:else if error}
        <div class="error-state">
            <p>Failed to load promotional content</p>
            <button on:click={loadBannerData} class="retry-button">
                Retry
            </button>
        </div>
    {:else if $bannerData.length === 0}
        <div class="empty-state">
            No promotional content available
        </div>
    {:else}
        <div class="banner-content">
            {#each $bannerData as banner, i}
                <div 
                    class="banner-slide"
                    class:active={i === $currentIndex}
                    on:click={() => handleBannerClick(banner)}
                    style="cursor: {banner.link ? 'pointer' : 'default'}"
                >
                    <img 
                        src={banner.imageUrl} 
                        alt={banner.title || 'Promotional banner'}
                        loading="lazy"
                    />
                    {#if banner.title}
                        <div class="banner-title">
                            {banner.title}
                        </div>
                    {/if}
                </div>
            {/each}

            <!-- Navigation dots -->
            <div class="banner-dots">
                {#each $bannerData as _, i}
                    <button
                        class="dot"
                        class:active={i === $currentIndex}
                        on:click={() => goToSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    ></button>
                {/each}
            </div>

            <!-- Navigation arrows -->
            <button 
                class="nav-button prev"
                on:click={() => currentIndex.update(n => n === 0 ? $bannerData.length - 1 : n - 1)}
                aria-label="Previous slide"
            >
                ‹
            </button>
            <button 
                class="nav-button next"
                on:click={() => currentIndex.update(n => (n + 1) % $bannerData.length)}
                aria-label="Next slide"
            >
                ›
            </button>
        </div>
    {/if}
</div>

<style>
    .banner-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        background-color: #f5f5f5;
        border-radius: 8px;
    }

    .loading-state,
    .error-state,
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #666;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .banner-content {
        position: relative;
        height: 100%;
    }

    .banner-slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        display: none;
    }

    .banner-slide.active {
        opacity: 1;
        display: block;
    }

    .banner-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .banner-title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 15px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        font-size: 1.1rem;
    }

    .banner-dots {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 2;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        border: none;
        cursor: pointer;
        padding: 0;
        transition: background-color 0.3s;
    }

    .dot.active {
        background: white;
    }

    .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.3);
        color: white;
        border: none;
        padding: 15px 10px;
        cursor: pointer;
        font-size: 24px;
        transition: background-color 0.3s;
        z-index: 2;
    }

    .nav-button:hover {
        background: rgba(0, 0, 0, 0.5);
    }

    .prev {
        left: 0;
        border-radius: 0 3px 3px 0;
    }

    .next {
        right: 0;
        border-radius: 3px 0 0 3px;
    }

    .retry-button {
        margin-top: 10px;
        padding: 8px 16px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>