document.documentElement.classList.add('js');

(function configurarContribuicao() {
  const dialog = document.getElementById('pix-dialog');
  const abrirBotoes = document.querySelectorAll('[data-open-pix]');
  const copiarBotao = document.querySelector('[data-copy-pix]');
  const status = document.querySelector('[data-copy-status]');

  if (dialog) {
    abrirBotoes.forEach((botao) => {
      botao.addEventListener('click', () => {
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        } else {
          dialog.setAttribute('open', '');
        }
      });
    });

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  if (!copiarBotao) return;

  copiarBotao.addEventListener('click', async () => {
    const chave = copiarBotao.dataset.pixKey || '';
    let copiado = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(chave);
        copiado = true;
      } else {
        const campo = document.createElement('textarea');
        campo.value = chave;
        campo.setAttribute('readonly', '');
        campo.style.position = 'fixed';
        campo.style.opacity = '0';
        document.body.appendChild(campo);
        campo.select();
        copiado = document.execCommand('copy');
        campo.remove();
      }
    } catch (erro) {
      copiado = false;
    }

    if (status) {
      status.textContent = copiado ? 'Chave Pix copiada.' : 'Não foi possível copiar automaticamente. Selecione a chave acima.';
    }
  });
})();
