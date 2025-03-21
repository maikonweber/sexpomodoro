<script>
    import { Carousel } from 'flowbite-svelte';
    import CardProduct from './CardProduct.svelte';
    import { scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
  
    const scaleAnimation = (x) => scale(x, { duration: 500, easing: quintOut });
    let images = [
  {
    alt: "Binance Refer",
    src: "https://conteudointimo.s3.amazonaws.com/56e93a94570d8e976ded439a2c17ff6ee370bd0b9adb9b7776e105b3f31ce880.jpeg",
    title: "Binance Refer"
  },
  {
    alt: "Liberdade do Tabaco: Pare de Fumar e Reconquistar sua Saúde",
    src: "https://conteudointimo.s3.amazonaws.com/01ff0ed71c22eee1c1537969077735553124fde9b40531ca4272b5f3f96e69c9.png",
    title: "Liberdade do Tabaco: Pare de Fumar e Reconquistar sua Saúde"
  },
  {
    alt: "Método Renda com Cortes",
    src: "https://conteudointimo.s3.amazonaws.com/afab3c49f93e0550f8ef513dfaeb66ec5af6a37532dbad7963563154006fb86e.png",
    title: "Método Renda com Cortes"
  },
  {
    alt: "Ladrões de Cassinos",
    src: "https://conteudointimo.s3.amazonaws.com/4824a9039674ccb775a42922af392eeab4f95d46cf52e156998a91db71601f58.png",
    title: "Ladrões de Cassinos"
  },
  {
    alt: "Sinais Milionários",
    src: "https://conteudointimo.s3.amazonaws.com/0d025aa992861545cd0c8639967b18f40bcb7171e40ffd6ad9f7c47b2927340b.png",
    title: "Sinais Milionários"
  },
  {
    alt: "Magnata Dos Cortes",
    src: "https://conteudointimo.s3.amazonaws.com/37eb52efa60beb47434d177e67b87364783eacdbc2e2cd808e9b8b6e2cce8b3d.png",
    title: "Magnata Dos Cortes"
  },
  {
    alt: "Desafio Secar em 20 Dias - Aplicativo de Emagrecimento",
    src: "https://conteudointimo.s3.amazonaws.com/4ab31f163dabfa6741097be05fdc8855c2bde66286828850d402a747351cf91a.png",
    title: "Desafio Secar em 20 Dias - Aplicativo de Emagrecimento"
  },
  {
    alt: "Creatina Monohidratada Pote 300g - 100% Pura Importada - Soldiers Nutrition",
    src: "https://conteudointimo.s3.amazonaws.com/a13551f4122b6fbeba740de5916d62ad43b68b061d4ef5e5f9e7ae6727d02d8c.png",
    title: "Creatina Monohidratada Pote 300g - 100% Pura Importada - Soldiers Nutrition"
  },
  {
    alt: "Whey Protein Concentrado 1kg - 100% Importado - Soldiers Nutrition",
    src: "https://conteudointimo.s3.amazonaws.com/9081eca4c5f1fdba5b47a6e52cab661dd32d23f0a1aa9d33c0d05420159ef0fe.png",
    title: "Whey Protein Concentrado 1kg - 100% Importado - Soldiers Nutrition"
  },
  {
    alt: "Whey Protein Black Skull Turbo REFIL 907G Caveira Preta",
    src: "https://conteudointimo.s3.amazonaws.com/d2fefe58d8d7f65705f9f96ffb3fdd92557c2c6ab12660231bcb268f674e9871.png",
    title: "Whey Protein Black Skull Turbo REFIL 907G Caveira Preta"
  },
  {
    alt: "Creatina Monohidratada Pura Max Titanium - 100%",
    src: "https://conteudointimo.s3.amazonaws.com/2c1bd68870a49fbd165f5674bde769e25194677190bd2ec3228f6b528058a302.png",
    title: "Creatina Monohidratada Pura Max Titanium - 100%"
  },
];


</script>
  
  <div class="max-w-full mx-auto h-full w-100% p-2">
    <Carousel imgClass='' {images} transition={scaleAnimation } let:Controls let:Indicators>
      <Controls />
      <!-- <Indicators /> -->
    </Carousel>
  </div>