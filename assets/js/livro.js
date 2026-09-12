async function carregarLivro() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const modoAdmin = params.get('admin') === '1';

  const titulo = document.getElementById('exemplar-titulo');
  const status = document.getElementById('status-livro');
  const leitores = document.getElementById('leitores-livro');
  const cidades = document.getElementById('cidades-livro');
  const historicoLista = document.getElementById('historico-livro');
  const historicoVazio = document.getElementById('trajetoria-vazia');
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
    status.textContent = livro.status;

    atualizarContador(livro.id, leitores, modoAdmin);

    if (Array.isArray(livro.cidades) && livro.cidades.length > 0) {
      cidades.textContent = livro.cidades.join(' • ');
    }

    if (Array.isArray(livro.historico) && livro.historico.length > 0) {
      historicoVazio.hidden = true;
      historicoLista.hidden = false;
      livro.historico.forEach((evento) => {
        const item = document.createElement('li');
        item.textContent = evento.descricao || 'Registro de circulação';
        historicoLista.appendChild(item);
      });
    }
  } catch (falha) {
    erro.hidden = false;
    erro.textContent = falha.message || 'Ocorreu um erro ao carregar este exemplar.';
  }
}

async function atualizarContador(id, elemento, modoAdmin) {
  if (!elemento) return;
  elemento.textContent = '…';

  try {
    if (!window.ContadorManhasComJesus) {
      throw new Error('Serviço de contagem não carregado.');
    }

    const total = await window.ContadorManhasComJesus.registrarAcesso(id, {
      somenteLeitura: modoAdmin
    });

    elemento.textContent = String(total);
  } catch (falha) {
    elemento.textContent = 'indisponível';
  }
}

carregarLivro();
