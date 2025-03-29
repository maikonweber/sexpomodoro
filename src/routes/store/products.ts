import { writable } from 'svelte/store';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateLink: string;
}

export const products = writable<Product[]>([]);
export const currentProductIndex = writable(0);

export async function fetchProducts() {
  try {
    const response = await fetch('https://dev.muttercorp.com.br/products');
    if (!response.ok) throw new Error('Falha ao carregar produtos');
    const data = await response.json();
    products.set(data);
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    // Produtos padrão caso a API falhe
    products.set([
      {
        id: 1,
        name: "Kit Massagem Sensual",
        description: "Óleos, velas e acessórios para uma massagem relaxante",
        price: 89.90,
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71YHX5kO1QL._AC_SL1500_.jpg",
        affiliateLink: "https://amzn.to/3xKXZ9Y"
      },
      {
        id: 2,
        name: "Jogo de Dados Eróticos",
        description: "Dados com desafios picantes para apimentar a relação",
        price: 49.90,
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71YHX5kO1QL._AC_SL1500_.jpg",
        affiliateLink: "https://amzn.to/3xKXZ9Y"
      },
      {
        id: 3,
        name: "Kit Romance",
        description: "Acessórios para tornar o momento mais especial",
        price: 129.90,
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71YHX5kO1QL._AC_SL1500_.jpg",
        affiliateLink: "https://amzn.to/3xKXZ9Y"
      }
    ]);
  }
}

export function rotateProduct() {
  currentProductIndex.update(index => {
    const productsLength = $products.length;
    return (index + 1) % productsLength;
  });
} 