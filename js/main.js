/* ════════════════════════════════════════════
   Andressa & Tácio · lógica do convite
   ════════════════════════════════════════════ */

/* ── DADOS ── */
const PIX_KEY = "andressa.torres81@gmail.com";
const PIX_QR_CODE = "00020126580014BR.GOV.BCB.PIX01368cfb559c-dff3-403a-869a-217db66acf625204000053039865802BR5919Tacio Soares Aguiar6009SAO PAULO62140510PbUbjewrFM630429F2";
const PIX_CHAVE = "8cfb559c-dff3-403a-869a-217db66acf62";
const PRESENTES = [
  {nome:"Fogão",                   valor:1802.70, emoji:"🍳"},
  {nome:"Geladeira",               valor:4639.98, emoji:"❄️"},
  {nome:"Armários",                valor:1659.99, emoji:"🚪"},
  {nome:"Aparelho de jantar",      valor:189.00,  emoji:"🍽️"},
  {nome:"Conjunto de panelas",     valor:329.82,  emoji:"🥘"},
  {nome:"Ventilador",              valor:360.00,  emoji:"💨"},
  {nome:"Máquina de lavar",        valor:2294.15, emoji:"👕"},
  {nome:"Maquiagem & cabelo",      valor:570.00,  emoji:"💄"},
  {nome:"Escorredor de louça",     valor:94.30,   emoji:"🫙"},
  {nome:"Jarra",                   valor:72.00,   emoji:"🫗"},
  {nome:"Jogo americano",          valor:80.00,   emoji:"🪄"},
  {nome:"Jogo de toalhas de rosto",valor:55.00,   emoji:"🛁"},
  {nome:"Aspirador de pó",         valor:220.00,  emoji:"🌀"},
  {nome:"Cesto de roupa suja",     valor:90.00,   emoji:"🧺"},
  {nome:"Tapetinhos",              valor:78.99,   emoji:"🟫"},
  {nome:"Kit organização de bancada",valor:60.00, emoji:"🗂️"},
  {nome:"Tábua de passar roupa",   valor:140.00,  emoji:"👔"},
  {nome:"Jogo de lençóis",         valor:120.00,  emoji:"🛏️"},
  {nome:"Porta-temperos",          valor:65.00,   emoji:"🧂"},
  {nome:"Kit de banheiro",         valor:85.00,   emoji:"🪥"},
];

const fmt = v => 'R$ ' + v.toFixed(2).replace('.', ',');

/* ── PAYLOAD PIX (EMV) ── */
function pixPayload(valor) {
  const v = valor.toFixed(2);
  const tlv = (id, val) => id + val.length.toString().padStart(2, '0') + val;
  const pixInfo = tlv('00', 'BR.GOV.BCB.PIX') + tlv('01', PIX_KEY);
  const payload =
    tlv('00', '01') +
    tlv('01', '12') +
    tlv('26', pixInfo) +
    tlv('52', '0000') +
    tlv('53', '986') +
    tlv('54', v) +
    tlv('58', 'BR') +
    tlv('59', 'Andressa e Tacio') +
    tlv('60', 'Parnaiba') +
    tlv('62', tlv('05', '***')) +
    '6304';
  function crc16(s) {
    let c = 0xFFFF;
    for (let i = 0; i < s.length; i++) {
      c ^= s.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) c = (c & 0x8000) ? (c << 1) ^ 0x1021 : c << 1;
      c &= 0xFFFF;
    }
    return c.toString(16).toUpperCase().padStart(4, '0');
  }
  return payload + crc16(payload);
}

/* ── GRADE DE PRESENTES ── */
function buildGrid() {
  const grid = document.getElementById('presentes-grid');
  if (!grid || grid.childElementCount) return;
  PRESENTES.forEach(p => {
    const card = document.createElement('div');
    card.className = 'presente-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', p.nome + ' ' + fmt(p.valor));
    card.innerHTML = `
      <div class="card-img-placeholder" aria-hidden="true">${p.emoji}</div>
      <span class="card-pix-badge">Pix</span>
      <div class="card-overlay"><span>Presentear</span></div>
      <div class="card-body">
        <p class="card-nome">${p.nome}</p>
        <p class="card-valor">${fmt(p.valor)}</p>
      </div>`;
    card.onclick = () => openModal(p);
    card.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(p); } };
    grid.appendChild(card);
  });
}

/* ── MODAL ── */
function openModal(p) {
  document.getElementById('m-nome').textContent = p.nome;
  document.getElementById('m-valor').textContent = fmt(p.valor);
  const div = document.getElementById('qr-div');
  div.innerHTML = '';
  new QRCode(div, {
    text: PIX_QR_CODE,
    width: 190,
    height: 190,
    colorDark: '#3a2e24',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

async function copyToClipboard(text, btn, feedbackText) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (!btn) return;
    const isIcon = btn.classList.contains('pix-copy-icon');
    const original = btn.innerHTML;
    if (!isIcon) btn.innerHTML = '<span class="copy-text">' + (feedbackText || 'Copiado!') + '</span>';
    btn.classList.add('copied');
    setTimeout(() => {
      if (!isIcon) btn.innerHTML = original;
      btn.classList.remove('copied');
    }, 1600);
  } catch (err) {
    console.error('Falha ao copiar:', err);
  }
}
function copyQRCode() {
  copyToClipboard(PIX_QR_CODE, document.getElementById('m-copy-code'));
}
function copyPixKey() {
  copyToClipboard(PIX_CHAVE, document.getElementById('m-copy-key'));
}

/* ── ENVELOPE ── */
function openEnvelope() {
  document.getElementById('envWrap').classList.add('opened');
  setTimeout(() => {
    document.getElementById('envelope-screen').classList.add('hidden');
    document.getElementById('main-site').classList.add('visible');
    document.getElementById('navDots').classList.add('visible');
    startCountdown();
    startNav();
    buildGrid();
    initReveal();
  }, 760);
}

/* ── COUNTDOWN ── */
function startCountdown() {
  const target = new Date('2027-01-16T10:00:00');
  function upd() {
    const diff = target - new Date();
    if (diff <= 0) return;
    document.getElementById('cd-d').textContent = Math.floor(diff / 86400000);
    document.getElementById('cd-h').textContent = Math.floor((diff % 86400000) / 3600000);
    document.getElementById('cd-m').textContent = Math.floor((diff % 3600000) / 60000);
    document.getElementById('cd-s').textContent = Math.floor((diff % 60000) / 1000);
  }
  upd();
  setInterval(upd, 1000);
}

/* ── LISTA DE PRESENTES (retrátil) ── */
function toggleGifts() {
  const grid = document.getElementById('presentes-grid');
  const btn = document.getElementById('toggleGifts');
  const collapsed = grid.classList.toggle('collapsed');
  btn.textContent = collapsed ? 'Ver lista completa' : 'Recolher lista';
  btn.setAttribute('aria-expanded', String(!collapsed));
  if (collapsed) {
    document.getElementById('presentes').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ── NAV ── */
function scrollToId(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }
function startNav() {
  const secs = ['hero', 'countdown', 'local', 'recepcao', 'historia', 'presentes', 'rsvp'];
  const dots = document.querySelectorAll('.nav-dot');
  window.addEventListener('scroll', () => {
    let idx = 0;
    secs.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) idx = i;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  });
}

/* ── REVEAL ON SCROLL ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
  /* fallback de segurança: garante visibilidade após 2.5s */
  setTimeout(() => els.forEach(el => el.classList.add('in-view')), 2500);
}

/* ── PARALLAX SUTIL NOS ARABESCOS ── */
function initParallax() {
  const corners = document.querySelectorAll('.arabesque-corner');
  if (!corners.length) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      corners.forEach((c, i) => {
        const dir = i % 2 ? 1 : -1;
        c.style.setProperty('--py', (y * 0.03 * dir).toFixed(1) + 'px');
      });
      ticking = false;
    });
  }, { passive: true });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  initParallax();
});
