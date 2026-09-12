(function () {
  const API_BASE = 'https://countapi.mileshilliard.com/api/v1';
  const PREFIXO = 'mcj-rdb-2026';

  function chaveRemota(id) {
    return `${PREFIXO}-exemplar-${id}-acessos`;
  }

  function chaveLocal(id) {
    return `manhas-com-jesus:exemplar:${id}:contado`;
  }

  function numeroDoRetorno(dados) {
    const valor = Number(dados && (dados.value ?? dados.count ?? dados.data));
    return Number.isFinite(valor) && valor >= 0 ? valor : 0;
  }

  async function requisitar(caminho) {
    const resposta = await fetch(`${API_BASE}${caminho}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    });

    if (!resposta.ok) {
      const erro = new Error(`Contador indisponível (${resposta.status})`);
      erro.status = resposta.status;
      throw erro;
    }

    return resposta.json();
  }

  function jaContado(id) {
    try {
      return localStorage.getItem(chaveLocal(id)) === '1';
    } catch (erro) {
      try {
        return sessionStorage.getItem(chaveLocal(id)) === '1';
      } catch (falha) {
        return false;
      }
    }
  }

  function marcarComoContado(id) {
    try {
      localStorage.setItem(chaveLocal(id), '1');
      return 'local';
    } catch (erro) {
      try {
        sessionStorage.setItem(chaveLocal(id), '1');
        return 'sessao';
      } catch (falha) {
        return null;
      }
    }
  }

  function desfazerMarcacao(id, tipo) {
    try {
      if (tipo === 'local') localStorage.removeItem(chaveLocal(id));
      if (tipo === 'sessao') sessionStorage.removeItem(chaveLocal(id));
    } catch (erro) {
      // Se o armazenamento estiver bloqueado, não há ação adicional necessária.
    }
  }

  async function obterTotal(id) {
    try {
      const dados = await requisitar(`/get/${encodeURIComponent(chaveRemota(id))}`);
      return numeroDoRetorno(dados);
    } catch (erro) {
      if (erro.status === 404) return 0;
      throw erro;
    }
  }

  async function registrarAcesso(id, opcoes = {}) {
    const somenteLeitura = Boolean(opcoes.somenteLeitura);

    if (somenteLeitura || jaContado(id)) {
      return obterTotal(id);
    }

    // Marca antes da chamada para reduzir contagem duplicada em abas abertas ao mesmo tempo.
    const tipoMarcacao = marcarComoContado(id);

    try {
      const dados = await requisitar(`/hit/${encodeURIComponent(chaveRemota(id))}`);
      return numeroDoRetorno(dados);
    } catch (erro) {
      desfazerMarcacao(id, tipoMarcacao);
      throw erro;
    }
  }

  window.ContadorManhasComJesus = {
    registrarAcesso,
    obterTotal
  };
})();
