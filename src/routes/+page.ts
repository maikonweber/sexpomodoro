export async function load({ fetch }) {
  const fetchRandomPositions = async (count: number = 6) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * 450) + 1;
      try {
        const response = await fetch(`https://dev.muttercorp.com.br/kamasutra/${randomIndex}`, {
          headers: {
            'accept': '*/*'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          positions.push({
            name: data.name,
            description: data.descricao,
            imageUrl: data.url,
            difficulty: data.dificulty,
            categories: data.categorias
          });
        }
      } catch (error) {
        console.error('Erro ao buscar posição:', error);
      }
    }
    return positions;
  };

  return {
    initialPositions: await fetchRandomPositions()
  };
} 