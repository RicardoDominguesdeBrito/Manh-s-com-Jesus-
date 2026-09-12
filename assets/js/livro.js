async function carregarLivro() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const modoAdmin = params.get('admin') === '1';

  const titulo = document.getElementById('exemplar-titulo');
  const erro = document.getElementById('erro-livro');

  if (!id) {
    if (titulo) titulo.textContent = 'Exemplar não informado';
    if (erro) {
      erro.hidden = false;
      erro.textContent = 'Use uma URL com o identificador do livro, por exemplo: ?id=0001';
    }
    return;
  }

  try {
    const resposta = await fetch('../data/livros.json', { cache: 'no-store' });
    if (!resposta.ok) throw new Error('Não foi possível carregar os dados dos exemplares.');

    const dados = await resposta.json();
    const livro = Array.isArray(dados.livros)
      ? dados.livros.find((item) => item.id === id)
      : null;

    if (!livro) {
      if (titulo) titulo.textContent = `Exemplar nº ${id}`;
      if (erro) {
        erro.hidden = false;
        erro.textContent = 'Este exemplar ainda não está cadastrado.';
      }
      return;
    }

    document.title = `Manhãs com Jesus — Exemplar ${livro.id}`;
    if (titulo) titulo.textContent = `Exemplar nº ${livro.id}`;

    // Registra a passagem em segundo plano. O número não é exibido ao visitante.
    registrarPassagemEmSegundoPlano(livro.id, modoAdmin);
  } catch (falha) {
    if (erro) {
      erro.hidden = false;
      erro.textContent = falha.message || 'Ocorreu um erro ao carregar este exemplar.';
    }
  }
}

async function registrarPassagemEmSegundoPlano(id, modoAdmin) {
  try {
    if (!window.ContadorManhasComJesus) return;

    await window.ContadorManhasComJesus.registrarAcesso(id, {
      somenteLeitura: modoAdmin
    });
  } catch (falha) {
    // A contagem é administrativa e não deve interromper nem exibir erro ao visitante.
    console.warn('Não foi possível registrar a passagem deste exemplar.', falha);
  }
}

carregarLivro();
