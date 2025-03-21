// place files you want to import through the `$lib` alias in this folder.
export function handleFetchError(status) {
    if (status === 403 || status === 401) {
        redirectToLogin();
    } else {
        console.error('Failed to fetch data');
    }
}

export function redirectToLogin() {
    localStorage.removeItem('MutterCorp');
    window.location.href = '/login';
}


import { marked } from 'marked';

// Configuração opcional
marked.setOptions({
  breaks: true, // Quebra de linha no Markdown
  gfm: true,    // Suporte a GitHub Flavored Markdown
  headerIds: false, // Desativa a geração de IDs para cabeçalhos
});

// Função para renderizar Markdown
export function renderMarkdown(markdownText) {
  return marked.parse(markdownText);
}