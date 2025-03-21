<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sua Página</title>
  <style>
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh; /* Garante que a página ocupe pelo menos a altura da tela */
      margin: 0;
    }
    main {
      flex: 1; /* Faz o conteúdo principal ocupar o espaço restante */
      padding: 1rem;
    }
    footer {
      background:#f21d41;
      color: #fff;
      padding: 1rem;
      text-align: center;
      /* Fixa o footer no rodapé da página */
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  </style>
</head>
<body>
  <main>
    <!-- Conteúdo principal da sua página aqui -->
    <h1>Título da sua página</h1>
    <p>Conteúdo da sua página...</p>
  </main>
  <footer>
    <p>&copy; 2024 MutterCorporation. Todos os direitos reservados.</p>
    <p>Created with Svelte</p>
  </footer>
</body>
</html>
