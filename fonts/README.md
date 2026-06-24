# Fonte dos nomes — ALTA (opcional)

Os nomes **Andressa & Tácio** estão usando a fonte **Italiana** (Google Fonts)
como alternativa elegante à ALTA, porque a ALTA não está disponível
gratuitamente em CDN.

Se você tiver o arquivo da fonte ALTA (`.woff2`, `.ttf` ou `.otf`) e o direito
de uso, siga os passos abaixo para usá-la de verdade.

## Passo 1 — Coloque o arquivo aqui

Salve o arquivo nesta pasta `fonts/`, por exemplo:

```
fonts/Alta-Regular.woff2
```

## Passo 2 — Declare a fonte no CSS

No topo de `css/styles.css`, adicione um bloco `@font-face`:

```css
@font-face {
  font-family: 'ALTA';
  src: url('../fonts/Alta-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

## Passo 3 — Aponte a variável para a ALTA

Ainda em `css/styles.css`, dentro de `:root`, troque a linha da variável
`--font-name` para usar a ALTA primeiro (mantendo as alternativas como
fallback caso a fonte não carregue):

```css
--font-name: 'ALTA', 'Italiana', 'Cinzel', serif;
```

Pronto — só os nomes passam a usar a ALTA. O `&` continua em Alex Brush e o
restante em Cinzel.
