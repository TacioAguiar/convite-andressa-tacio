# Convite de Casamento — Andressa & Tácio 💍

Site estático (HTML + CSS puro, sem frameworks) usado como convite online
do casamento, feito para ser hospedado gratuitamente no GitHub Pages.

## Estrutura do projeto

```
convite-andressa-tacio/
├── index.html          → estrutura/conteúdo do convite (sem CSS/JS embutidos)
├── css/
│   └── styles.css      → cores, fontes, textura de papel, arabescos, efeitos
├── js/
│   └── main.js         → envelope, contagem regressiva, presentes/Pix, RSVP,
│                          animações de revelação ao rolar e parallax
├── fonts/
│   └── README.md       → como (opcionalmente) usar o arquivo da fonte ALTA
└── README.md           → este arquivo
```

## O que já está pronto

- Fundo na cor `#f7f6f2`
- Tipografia: **Italiana** (nomes — alternativa elegante à ALTA, via Google
  Fonts), **Alex Brush** (o "&"), **Cinzel** (todo o restante)
- Textura de papel de alta gramatura, gerada por código (ruído + fibras),
  sem depender de imagem externa
- **Arabescos** dourados nos cantos, no lugar das flores (um único SVG
  reaproveitado via `<symbol>`/`<use>`)
- Efeitos premium: abertura de envelope com lacre, brilho dourado animado no
  "&", revelação suave das seções ao rolar (IntersectionObserver), parallax
  sutil nos arabescos, micro-interações em botões e cards, modal com QR Code
  Pix por presente
- Layout responsivo e acessível (foco em celular)

## Trocar a fonte dos nomes pela ALTA real (opcional)

Hoje os nomes usam **Italiana** como alternativa. Se quiser a ALTA original,
veja as instruções em `fonts/README.md`.

## Editar o conteúdo

- Textos (nomes, bênção, história, RSVP): direto no `index.html`
- Data/horário: `js/main.js` (`startCountdown`) e textos no `index.html`
- Lista de presentes e chave Pix: array `PRESENTES` e `PIX_KEY` em `js/main.js`
- Cores e fontes: variáveis `:root` no topo de `css/styles.css`

## Publicar atualizações

Depois que o repositório estiver no GitHub e o GitHub Pages ativado,
toda vez que vocês enviarem (`push`) uma alteração para a branch `main`,
o site é atualizado automaticamente em menos de 1 minuto — não precisa
fazer mais nada.
