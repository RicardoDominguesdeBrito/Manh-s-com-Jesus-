# Livro Solidário NFC

Projeto inicial para transformar livros físicos em uma corrente solidária acompanhável por NFC.

## Conceito

Cada exemplar recebe um identificador único, como `0001`, e uma etiqueta NFC apontando para uma URL desse exemplar.

Exemplo de URL futura:

`/livro/?id=0001`

Ao aproximar o celular do NFC, a pessoa poderá conhecer a campanha, identificar o exemplar, acompanhar sua trajetória, saber quantos leitores já participaram e, futuramente, contribuir com a ação solidária e registrar que recebeu o livro.

## Fluxo previsto

Pessoa recebe o livro → aproxima o celular do NFC → conhece a corrente → lê o livro → opcionalmente contribui → futuramente registra que recebeu o exemplar → entrega o livro a outra pessoa → o próximo leitor repete o ciclo.

## Estrutura atual

- `index.html`: apresentação provisória do projeto.
- `livro/index.html`: página dinâmica de um exemplar.
- `data/livros.json`: dados dos exemplares.
- `data/schema-livro.json`: modelo dos dados.
- `assets/css/base.css`: estilos provisórios e neutros.
- `assets/js/main.js`: comportamento básico da página inicial.
- `assets/js/livro.js`: carregamento do exemplar pelo parâmetro `id`.
- `docs/conceito.md`: experiência e princípios do projeto.
- `docs/arquitetura.md`: arquitetura técnica e evolução futura.

## Estado do projeto

Esta é a fase inicial. Ainda não foram definidos:

- identidade visual definitiva;
- nome público da campanha;
- chave Pix;
- backend;
- banco de dados;
- domínio próprio;
- publicação via GitHub Pages.

Nenhum dado bancário, token, senha ou informação pessoal de leitores deve ser armazenado neste repositório público.
