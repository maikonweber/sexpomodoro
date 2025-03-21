#!/bin/bash

# Defina a porta que você quer verificar
PORT=5173

# Encontre o container que está usando a porta 5173 e mate-o
CONTAINER_ID=$(docker ps -q --filter "publish=$PORT")

if [ ! -z "$CONTAINER_ID" ]; then
  echo "Matando o container na porta $PORT..."
  docker kill $CONTAINER_ID
  docker rm $CONTAINER_ID
else
  echo "Nenhum container encontrado na porta $PORT."
fi

# Encontre todas as imagens relacionadas ao projeto e remova-as
IMAGE_IDS=$(docker images -q sveltekit-app)

if [ ! -z "$IMAGE_IDS" ]; then
  echo "Removendo imagens relacionadas ao projeto..."
  docker rmi -f $IMAGE_IDS
else
  echo "Nenhuma imagem do projeto encontrada."
fi

# Construa a nova imagem do Docker
echo "Construindo a imagem Docker..."
docker build -t sveltekit-app .

# Verifique se a construção da imagem foi bem-sucedida
if [ $? -ne 0 ]; then
  echo "Falha ao construir a imagem Docker."
  exit 1
fi

# Execute o novo contêiner
echo "Executando o novo contêiner..."
docker run -d -p 5173:5173 sveltekit-app

# Verifique se o contêiner foi iniciado corretamente
if [ $? -ne 0 ]; then
  echo "Falha ao iniciar o contêiner Docker."
  exit 1
fi

echo "Contêiner rodando na porta $PORT."

