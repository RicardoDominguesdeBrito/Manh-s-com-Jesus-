# Arquitetura inicial

## Objetivo técnico

Permitir que milhares de exemplares físicos usem uma única página dinâmica, identificando cada livro por um parâmetro de URL.

Exemplo:

`/livro/?id=0001`

A página `livro/index.html` lê o parâmetro `id` e consulta `data/livros.json`. Assim, não é necessário manter um HTML separado para cada exemplar.

## Estrutura

```text
/
├── index.html
├── livro/
│   └── index.html
├── assets/
│   ├── css/
│   │   └── base.css
│   └── js/
│       ├── main.js
│       └── livro.js
├── data/
│   ├── livros.json
│   └── schema-livro.json
└── docs/
    ├── conceito.md
    └── arquitetura.md
```

## Dados dos exemplares

Cada livro possui um ID único. Nesta fase, os dados são estáticos e ficam em `data/livros.json`.

Exemplo simplificado:

```json
{
  "id": "0001",
  "status": "em circulação",
  "leitoresRegistrados": 0,
  "valorDoacoesRegistrado": 0,
  "historico": []
}
```

## NFC

A etiqueta NFC deve armazenar apenas a URL do exemplar. Ela não deve conter chave Pix, senha, token, API ou dados pessoais.

A vantagem desse desenho é que o conteúdo pode mudar no site sem necessidade de regravar fisicamente a etiqueta.

## GitHub Pages

GitHub Pages serve arquivos estáticos. Ele é adequado para esta primeira fase de apresentação e leitura dos dados, mas não grava novos registros em tempo real.

Para permitir futuramente ações como:

- “Recebi este livro”;
- registrar uma cidade;
- atualizar quantidade de leitores;
- registrar histórico de circulação;
- consolidar doações;
- validar valores arrecadados;

será necessário integrar um backend ou serviço de banco de dados.

Esse backend ainda não foi escolhido deliberadamente.

## Escalabilidade

A arquitetura deve suportar IDs como:

`0001`, `0002`, `0003` ...

A página continuará sendo a mesma. Apenas o registro consultado muda.

Quando o volume crescer, o arquivo JSON poderá ser substituído por uma API sem alterar a lógica conceitual do NFC.

## Privacidade e segurança

Não registrar automaticamente localização precisa, nome, telefone, documento ou outro dado pessoal.

Uma cidade só deverá ser incluída na trajetória se o leitor optar voluntariamente por informá-la.

Nenhum segredo deve ser incluído em JavaScript do frontend, pois todo código servido pelo navegador é público.

## Próximas decisões

1. Nome público da campanha.
2. Identidade visual.
3. Experiência e linguagem da página.
4. Modelo seguro de contribuição por Pix.
5. Backend e banco de dados.
6. Regras de validação de circulação e impacto.
7. Domínio e publicação.
