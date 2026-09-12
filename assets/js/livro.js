async function carregarLivro() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const modoAdmin = params.get('admin') === '1';

  const titulo = document.getElementById('exemplar-titulo');
  const erro = document.getElementById('erro-livro');

  if (!id) {
    titulo.textContent = 'Exemplar não informado';
    erro.hidden = false;
    erro.textContent = 'Use uma URL com o identificador do livro, por exemplo: ?id=0001';
    return;
  }

  try {
    const resposta = await fetch('../data/livros.json', { cache: 'no-store' });
    if (!resposta.ok) throw new Error('Não foi possível carregar os dados dos exemplares.');

    const dados = await resposta.json();
    const livro = dados.livros.find((item) => item.id === id);

    if (!livro) {
      titulo.textContent = `Exemplar nº ${id}`;
      erro.hidden = false;
      erro.textContent = 'Este exemplar ainda não está cadastrado.';
      return;
    }

    document.title = `Manhãs com Jesus — Exemplar ${livro.id}`;
    titulo.textContent = `Exemplar nº ${livro.id}`;

    registrarPassagem(livro.id, modoAdmin);
  } catch (falha) {
    erro.hidden = false;
    erro.textContent = falha.message || 'Ocorreu um erro ao carregar este exemplar.';
  }
}

async function registrarPassagem(id, modoAdmin) {
  try {
    if (!window.ContadorManhasComJesus) return;

    await window.ContadorManhasComJesus.registrarAcesso(id, {
      somenteLeitura: modoAdmin
    });
  } catch (falha) {
    // A experiência pública do livro não depende do serviço de contagem.
  }
}

carregarLivro();
