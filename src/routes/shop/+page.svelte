<script lang="ts">
  import { onMount } from 'svelte';

  const data = {
    "data": {
      "productOfferV2": {
        "nodes":  [
        {
          "productName": "K12 Alto-falante Bluetooth Karaoke com Microfone, Luzes LED e Diversão para Toda a Família",
          "itemId": 22697316947,
          "commissionRate": "0.03",
          "commission": "1.0194",
          "price": "33.98",
          "sales": 2333,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-m0lw7vlp78u9d3",
          "shopName": "YUMI CELL",
          "productLink": "https://shopee.com.br/product/1025824477/22697316947",
          "offerLink": "https://s.shopee.com.br/1B8brvSGMW",
          "periodStartTime": 1665802800,
          "periodEndTime": 32503651199,
          "priceMin": "33.98",
          "priceMax": "49.98",
          "productCatIds": [
            100535,
            100582,
            100625
          ],
          "ratingStar": "4.8",
          "priceDiscountRate": 60,
          "shopId": 1025824477,
          "shopType": [],
          "sellerCommissionRate": "0",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Kit 13 Pçs Pincéis De Maquiagem Contorno Kabuki Profissional",
          "itemId": 20097410950,
          "commissionRate": "0.08",
          "commission": "1.0952",
          "price": "13.69",
          "sales": 2314,
          "imageUrl": "https://cf.shopee.com.br/file/sg-11134201-7rble-lm3rmq41uguoa6",
          "shopName": "Mini Rosa",
          "productLink": "https://shopee.com.br/product/399255895/20097410950",
          "offerLink": "https://s.shopee.com.br/10pBfcSthV",
          "periodStartTime": 1711519860,
          "periodEndTime": 32503651199,
          "priceMin": "13.69",
          "priceMax": "13.69",
          "productCatIds": [
            100630,
            100663,
            100885
          ],
          "ratingStar": "4.6",
          "priceDiscountRate": 54,
          "shopId": 399255895,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.05",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Inox Prata Torneira com chuveiro com rotação de 360° Cozinha Luxo Parede Promoção",
          "itemId": 23197701909,
          "commissionRate": "0.15",
          "commission": "4.1985",
          "price": "27.99",
          "sales": 7083,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-lyog4l1ocm690d",
          "shopName": "FAST MO",
          "productLink": "https://shopee.com.br/product/530370669/23197701909",
          "offerLink": "https://s.shopee.com.br/qVlTJTX2U",
          "periodStartTime": 1726918980,
          "periodEndTime": 32503651199,
          "priceMin": "27.99",
          "priceMax": "45.99",
          "productCatIds": [
            100636,
            100715,
            101188
          ],
          "ratingStar": "4.7",
          "priceDiscountRate": 77,
          "shopId": 530370669,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.12",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Lençol Com Elástico Avulso 400 Fios Micropercal Poliéster Liso Toque Macio",
          "itemId": 22997623488,
          "commissionRate": "0.11",
          "commission": "2.156",
          "price": "19.6",
          "sales": 7122,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-lxactdip6lx2ed",
          "shopName": "Rech Enxovais",
          "productLink": "https://shopee.com.br/product/746089778/22997623488",
          "offerLink": "https://s.shopee.com.br/gCLH0UANT",
          "periodStartTime": 1722547096,
          "periodEndTime": 32503651199,
          "priceMin": "19.6",
          "priceMax": "32.5",
          "productCatIds": [
            100636,
            100710,
            101148
          ],
          "ratingStar": "4.8",
          "priceDiscountRate": 40,
          "shopId": 746089778,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.08",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Videogame Stick 10mil 2 Controles Sem Fio Console  Portatil Jogos Retro Antigo",
          "itemId": 23707678384,
          "commissionRate": "0.07",
          "commission": "6.5793",
          "price": "93.99",
          "sales": 3847,
          "imageUrl": "https://cf.shopee.com.br/file/sg-11134201-7rd5o-lx71dpls5spr1f",
          "shopName": "ANJ.GG store",
          "productLink": "https://shopee.com.br/product/391739739/23707678384",
          "offerLink": "https://s.shopee.com.br/1qOIf9Pj0i",
          "periodStartTime": 1712079214,
          "periodEndTime": 32503651199,
          "priceMin": "93.99",
          "priceMax": "93.99",
          "productCatIds": [
            100634,
            100695,
            101081
          ],
          "ratingStar": "4.7",
          "priceDiscountRate": 53,
          "shopId": 391739739,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.04",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Kit 2 Óleos Extraordinarios para Cabelos Elseve Loreal Paris, 100ml",
          "itemId": 18627997750,
          "commissionRate": "0.21",
          "commission": "20.2944",
          "price": "96.64",
          "sales": 3896,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-lzp75go4xjc532",
          "shopName": "L'Oréal Paris Loja Oficial",
          "productLink": "https://shopee.com.br/product/689225278/18627997750",
          "offerLink": "https://s.shopee.com.br/1g4sSqQMLh",
          "periodStartTime": 1741274880,
          "periodEndTime": 1743476399,
          "priceMin": "96.64",
          "priceMax": "96.64",
          "productCatIds": [
            100630,
            100659,
            100871
          ],
          "ratingStar": "5",
          "priceDiscountRate": 20,
          "shopId": 689225278,
          "shopType": [
            1
          ],
          "sellerCommissionRate": "0.18",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Escova De Limpeza Ajustável Janela Banheiro e Cozinha Ferramenta 3 em 1 Recarregável",
          "itemId": 20797473907,
          "commissionRate": "0.09",
          "commission": "7.1991",
          "price": "79.99",
          "sales": 6640,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-lqp8s8f2ez2bc0",
          "shopName": "DAFUSHOP_brasil",
          "productLink": "https://shopee.com.br/product/328666563/20797473907",
          "offerLink": "https://s.shopee.com.br/1VlSGXQzgg",
          "periodStartTime": 1723645566,
          "periodEndTime": 32503651199,
          "priceMin": "79.99",
          "priceMax": "79.99",
          "productCatIds": [
            100636,
            100716,
            101201
          ],
          "ratingStar": "4.8",
          "priceDiscountRate": 68,
          "shopId": 328666563,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.06",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Areia Catbio Biodegradável 4 Kg - Max Clean - Grãos Finos",
          "itemId": 22996121313,
          "commissionRate": "0.03",
          "commission": "1.287",
          "price": "42.9",
          "sales": 10901,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-m605sjhkzmtse8",
          "shopName": "petpremier",
          "productLink": "https://shopee.com.br/product/1023760886/22996121313",
          "offerLink": "https://s.shopee.com.br/1LS24ERd1f",
          "periodStartTime": 1665802800,
          "periodEndTime": 32503651199,
          "priceMin": "42.9",
          "priceMax": "42.9",
          "productCatIds": [
            100631,
            100669,
            100923
          ],
          "ratingStar": "4.9",
          "priceDiscountRate": 12,
          "shopId": 1023760886,
          "shopType": [],
          "sellerCommissionRate": "0",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Coala Odorizante de Ambientes e Tecidos Chá Branco 260ML",
          "itemId": 22692884559,
          "commissionRate": "0.13",
          "commission": "3.887",
          "price": "29.9",
          "sales": 11941,
          "imageUrl": "https://cf.shopee.com.br/file/sg-11134201-7rcby-lslpihaneuut25",
          "shopName": "Coala Essências Oficial",
          "productLink": "https://shopee.com.br/product/1177903362/22692884559",
          "offerLink": "https://s.shopee.com.br/2VdzSNNBeu",
          "periodStartTime": 1742156911,
          "periodEndTime": 32503651199,
          "priceMin": "29.9",
          "priceMax": "29.9",
          "productCatIds": [
            100636,
            100708,
            101127
          ],
          "ratingStar": "4.9",
          "priceDiscountRate": 0,
          "shopId": 1177903362,
          "shopType": [
            1
          ],
          "sellerCommissionRate": "0.1",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Máscara karseell De Colágeno 500g",
          "itemId": 19797626536,
          "commissionRate": "0.15",
          "commission": "3.45",
          "price": "23",
          "sales": 2034,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-lwlretvo6opef6",
          "shopName": "Karseell Oficial",
          "productLink": "https://shopee.com.br/product/1179613076/19797626536",
          "offerLink": "https://s.shopee.com.br/2LKZG4Nozt",
          "periodStartTime": 1712233922,
          "periodEndTime": 32503651199,
          "priceMin": "23",
          "priceMax": "23",
          "productCatIds": [
            100630,
            100659,
            100871
          ],
          "ratingStar": "4.7",
          "priceDiscountRate": 81,
          "shopId": 1179613076,
          "shopType": [],
          "sellerCommissionRate": "0.12",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Calça Pantalona Alfaiataria Premium Wide Leg",
          "itemId": 18297739619,
          "commissionRate": "0.03",
          "commission": "1.95",
          "price": "65",
          "sales": 10676,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-lykuw0sz8isl32",
          "shopName": "Raimbow",
          "productLink": "https://shopee.com.br/product/1130464645/18297739619",
          "offerLink": "https://s.shopee.com.br/2B193lOSKs",
          "periodStartTime": 1665802800,
          "periodEndTime": 32503651199,
          "priceMin": "65",
          "priceMax": "99",
          "productCatIds": [
            100017,
            100100,
            100358
          ],
          "ratingStar": "4.7",
          "priceDiscountRate": 56,
          "shopId": 1130464645,
          "shopType": [],
          "sellerCommissionRate": "0",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Escova Secadora Britânia 1300W Bivolt BES24P",
          "itemId": 22698047796,
          "commissionRate": "0.03",
          "commission": "3.597",
          "price": "119.9",
          "sales": 785,
          "imageUrl": "https://cf.shopee.com.br/file/sg-11134201-7rd56-m7wuw9npi90583",
          "shopName": "Bella Casa Eletro",
          "productLink": "https://shopee.com.br/product/811879342/22698047796",
          "offerLink": "https://s.shopee.com.br/20hirSP5fr",
          "periodStartTime": 1665802800,
          "periodEndTime": 32503651199,
          "priceMin": "119.9",
          "priceMax": "119.9",
          "productCatIds": [
            100630,
            100663,
            100889
          ],
          "ratingStar": "4.9",
          "priceDiscountRate": 45,
          "shopId": 811879342,
          "shopType": [
            1
          ],
          "sellerCommissionRate": "0",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Kit 2 Travesseiro Pluma de Ganso Descanso Antiacaro 70x50cm",
          "itemId": 19798930110,
          "commissionRate": "0.14",
          "commission": "5.1786",
          "price": "36.99",
          "sales": 9556,
          "imageUrl": "https://cf.shopee.com.br/file/sg-11134201-7rbki-ll9jwp6mt5ytad",
          "shopName": "Alice Confecções",
          "productLink": "https://shopee.com.br/product/301990718/19798930110",
          "offerLink": "https://s.shopee.com.br/3AtgFbKeJ6",
          "periodStartTime": 1733843400,
          "periodEndTime": 32503651199,
          "priceMin": "36.99",
          "priceMax": "36.99",
          "productCatIds": [
            100636,
            100710,
            101147
          ],
          "ratingStar": "4.8",
          "priceDiscountRate": 41,
          "shopId": 301990718,
          "shopType": [],
          "sellerCommissionRate": "0.11",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Base Mate Cobre Tudo 30ml Boca Rosa Beauty By Payot",
          "itemId": 23497759778,
          "commissionRate": "0.03",
          "commission": "0.6798",
          "price": "22.66",
          "sales": 2156,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-lzt12nkmvixh0c",
          "shopName": "Beleza&chique",
          "productLink": "https://shopee.com.br/product/340746999/23497759778",
          "offerLink": "https://s.shopee.com.br/30aG3ILHe5",
          "periodStartTime": 1665802800,
          "periodEndTime": 32503651199,
          "priceMin": "22.66",
          "priceMax": "22.66",
          "productCatIds": [
            100630,
            100662,
            100881
          ],
          "ratingStar": "4.9",
          "priceDiscountRate": 52,
          "shopId": 340746999,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Calça Pantalona Feminina Cintura Alta  Com Bolso Tecido Duna",
          "itemId": 22697383155,
          "commissionRate": "0.13",
          "commission": "3.7687",
          "price": "28.99",
          "sales": 6700,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-lsoi8287u0qj4d",
          "shopName": "ElisJeans",
          "productLink": "https://shopee.com.br/product/1157950131/22697383155",
          "offerLink": "https://s.shopee.com.br/2qGpqzLuz4",
          "periodStartTime": 1730827258,
          "periodEndTime": 32503651199,
          "priceMin": "28.99",
          "priceMax": "28.99",
          "productCatIds": [
            100017,
            100100,
            100358
          ],
          "ratingStar": "4.7",
          "priceDiscountRate": 74,
          "shopId": 1157950131,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.1",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Kit facas de cozinha/Churrasco Profissional Antiaderente 6 Peças Preto/colorido",
          "itemId": 23692960598,
          "commissionRate": "0.07",
          "commission": "1.1753",
          "price": "16.79",
          "sales": 7010,
          "imageUrl": "https://cf.shopee.com.br/file/sg-11134201-7rd4k-lu5etfkbmlecf4",
          "shopName": "ZSZ_brasil",
          "productLink": "https://shopee.com.br/product/390307022/23692960598",
          "offerLink": "https://s.shopee.com.br/2fxPegMYK3",
          "periodStartTime": 1722349380,
          "periodEndTime": 32503651199,
          "priceMin": "16.79",
          "priceMax": "23.9",
          "productCatIds": [
            100636,
            100717,
            101228
          ],
          "ratingStar": "4.6",
          "priceDiscountRate": 79,
          "shopId": 390307022,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.04",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Prateleira Organizador Diamante Acrílico Porta Maquiagem Suporte Multiuso De Mesa",
          "itemId": 19697632807,
          "commissionRate": "0.11",
          "commission": "3.0679",
          "price": "27.89",
          "sales": 3271,
          "imageUrl": "https://cf.shopee.com.br/file/sg-11134201-7rce7-ls1p4g1owou3b1",
          "shopName": "Isabela Top",
          "productLink": "https://shopee.com.br/product/415175805/19697632807",
          "offerLink": "https://s.shopee.com.br/3q9N2pI6xI",
          "periodStartTime": 1737039183,
          "periodEndTime": 32503651199,
          "priceMin": "27.89",
          "priceMax": "27.89",
          "productCatIds": [
            100636,
            100721,
            101258
          ],
          "ratingStar": "4.8",
          "priceDiscountRate": 69,
          "shopId": 415175805,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.08",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Kit 7 Pecas Bolsa Organizadoras Para Mala Roupas Bagagem Viagem",
          "itemId": 22719293954,
          "commissionRate": "0.08",
          "commission": "2.552",
          "price": "31.9",
          "sales": 7255,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-lungd923nxqs3c",
          "shopName": "RAJORK SHOP_BRASIL",
          "productLink": "https://shopee.com.br/product/800287152/22719293954",
          "offerLink": "https://s.shopee.com.br/3fpwqWIkIH",
          "periodStartTime": 1730402612,
          "periodEndTime": 32503651199,
          "priceMin": "31.9",
          "priceMax": "42.9",
          "productCatIds": [
            100015,
            100087,
            100325
          ],
          "ratingStar": "4.9",
          "priceDiscountRate": 71,
          "shopId": 800287152,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.05",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Fone de Ouvido Sem Fio Airpods PRO 3 Com Cancelamento De Ruído Bluetooth Pop-Up para iOS e Android",
          "itemId": 23597477899,
          "commissionRate": "0.07",
          "commission": "4.102",
          "price": "58.6",
          "sales": 7773,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-ly54dm79v8zk28",
          "shopName": "Eliane Moreira da Silva",
          "productLink": "https://shopee.com.br/product/966159843/23597477899",
          "offerLink": "https://s.shopee.com.br/3VWWeDJNdG",
          "periodStartTime": 1738839360,
          "periodEndTime": 32503651199,
          "priceMin": "58.6",
          "priceMax": "59.9",
          "productCatIds": [
            100535,
            100578,
            0
          ],
          "ratingStar": "4.8",
          "priceDiscountRate": 71,
          "shopId": 966159843,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.04",
          "shopeeCommissionRate": "0.03"
        },
        {
          "productName": "Kit 10 Potes Vidro Hermético 1040ml Retangular 4 Travas Marmita Premium",
          "itemId": 21899192645,
          "commissionRate": "0.1",
          "commission": "6.79",
          "price": "67.9",
          "sales": 3195,
          "imageUrl": "https://cf.shopee.com.br/file/br-11134207-7r98o-lqw4b1nyjsb1e8",
          "shopName": "UnyMix Home",
          "productLink": "https://shopee.com.br/product/811924245/21899192645",
          "offerLink": "https://s.shopee.com.br/3LD6RuK0yF",
          "periodStartTime": 1713746591,
          "periodEndTime": 32503651199,
          "priceMin": "67.9",
          "priceMax": "225.9",
          "productCatIds": [
            100636,
            100717,
            101220
          ],
          "ratingStar": "4.9",
          "priceDiscountRate": 77,
          "shopId": 811924245,
          "shopType": [
            2
          ],
          "sellerCommissionRate": "0.07",
          "shopeeCommissionRate": "0.03"
        }
      ]
      }
    }
  };




  let products = data.data.productOfferV2.nodes;
  let loading = false;
  let isMuted = false;
  let hoverSound: HTMLAudioElement;

  onMount(() => {
    hoverSound = new Audio('../sounds/hover.mp3');
  });

  function playSound(sound: HTMLAudioElement) {
    if (!isMuted && sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.error('Erro ao tocar som:', err));
    }
  }

  function formatPrice(price: string): string {
    return `R$ ${Number(price).toFixed(2).replace('.', ',')}`;
  }

  function formatSales(sales: number): string {
    if (sales >= 1000) {
      return `${(sales/1000).toFixed(1)}k`;
    }
    return sales.toString();
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-md relative overflow-x-hidden">
  <!-- Header -->
  <div class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border-b border-white/10">
    <div class="max-w-6xl mx-auto h-16 flex items-center justify-between px-2 md:px-4">
      <h1 class="text-white/80 text-sm md:text-xl font-medium whitespace-nowrap"> Sex Pomodoro </h1>
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

  <main class="max-w-6xl mx-auto px-2 md:px-4 pt-24 pb-24">
    <!-- Banner -->
    <div class="glass-container mb-8 overflow-hidden">
      <div class="relative overflow-hidden rounded-xl md:rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=1200"
          alt="Banner Promocional"
          class="w-full h-32 md:h-48 object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/70 backdrop-blur-sm"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">Produtos em Destaque</h2>
            <p class="text-sm md:text-lg text-white/90">Ofertas exclusivas para você</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de Produtos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each products as product}
        <a
          href={product.offerLink}
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]"
          on:mouseenter={() => playSound(hoverSound)}
        >
          <div class="relative">
            <img
              src={product.imageUrl}
              alt={product.productName}
              class="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            {#if product.priceDiscountRate > 0}
              <div class="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                -{product.priceDiscountRate}%
              </div>
            {/if}
          </div>
          
          <div class="p-4 bg-gradient-to-b from-transparent via-black/50 to-black/80">
            <h3 class="text-white font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
              {product.productName}
            </h3>
            
            <div class="flex items-center justify-between mb-2">
              <div>
                <p class="text-pink-400 font-bold text-lg">
                  {formatPrice(product.price)}
                </p>
                <div class="flex items-center gap-1 text-xs text-white/60">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {product.ratingStar}
                  </span>
                  <span>•</span>
                  <span>{formatSales(product.sales)} vendidos</span>
                </div>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <p class="text-white/60 text-xs truncate max-w-[70%]">
                {product.shopName}
              </p>
              <div 
                class="comprar-button px-4 py-1.5 rounded-full text-sm font-medium 
                bg-gradient-to-r from-pink-500 to-purple-500 
                text-white transform transition-all duration-300 
                hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] 
                active:scale-95 group-hover:animate-pulse flex items-center gap-2"
              >
                Comprar Agora
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </main>
</div>

<style lang="postcss">
  .glass-card {
    @apply backdrop-blur-xl bg-white/5 border border-white/10;
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.1);
  }

  .glass-card:hover {
    box-shadow: 0 0 50px rgba(236, 72, 153, 0.2);
  }

  .glass-button-outline {
    @apply border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300;
  }

  .glass-button-outline:hover {
    @apply border-white/40 bg-white/10;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .comprar-button {
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    box-shadow: 0 2px 10px rgba(236, 72, 153, 0.2),
                inset 0 1px 0 rgba(255,255,255,0.2);
    position: relative;
    overflow: hidden;
  }

  .comprar-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.2),
      transparent
    );
    transition: 0.5s;
  }

  .comprar-button:hover::before {
    left: 100%;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }
</style>
