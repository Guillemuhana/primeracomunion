import './style.css';
import { toPng } from 'html-to-image';

  var SCHOOL_NAME = 'Instituto Nuestra Señora de Fátima';

  var PALETTE = {
    nene: { bg: '#eef6fb', bg2: '#d6e9f6', accent: '#7fa8c4', accentDeep: '#3d6c8f', ink: '#233a48' },
    nena: { bg: '#fdf1f5', bg2: '#f8dce7', accent: '#d998b3', accentDeep: '#af5c81', ink: '#4a2733' },
    _default: { bg: '#fbf6ec', bg2: '#f3e8d2', accent: '#c9a24b', accentDeep: '#9c7a2e', ink: '#3b3226' },
  };
  function getPalette(genero) {
    return PALETTE[genero] || PALETTE._default;
  }

  function motifSvg(id, accent, accentDeep, size) {
    size = size || 72;
    var s = { calix: '', paloma: '', trigo: '', cruz: '' };
    s.calix =
      '<svg viewBox="0 0 120 120" width="' + size + '" height="' + size + '" fill="none">' +
      '<circle cx="60" cy="38" r="17" fill="none" stroke="' + accent + '" stroke-width="2.2"/>' +
      '<path d="M43 42c0 10 7 18 17 18s17-8 17-18" stroke="' + accentDeep + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M60 60v22" stroke="' + accentDeep + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M46 90c0-6 6-8 14-8s14 2 14 8" stroke="' + accentDeep + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M44 90h32" stroke="' + accentDeep + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<g stroke="' + accent + '" stroke-width="1.6" stroke-linecap="round"><path d="M60 4v10M46 8l4 9M74 8l-4 9"/></g></svg>';
    s.paloma =
      '<svg viewBox="0 0 120 120" width="' + size + '" height="' + size + '" fill="none">' +
      '<path d="M60 30c6-10 20-14 30-9-4 11-15 18-26 17" stroke="' + accentDeep + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M60 30c-6-10-20-14-30-9 4 11 15 18 26 17" stroke="' + accentDeep + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M60 30c3 14-2 27-2 27s-16-2-20-14" stroke="' + accent + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="61" cy="27" r="2" fill="' + accentDeep + '"/>' +
      '<g stroke="' + accent + '" stroke-width="1.4" stroke-linecap="round" opacity="0.8"><path d="M28 66c8 2 16 2 24-2M68 66c8 2 16 2 24-2M40 82c6 2 12 2 18-1"/></g></svg>';
    s.trigo =
      '<svg viewBox="0 0 120 120" width="' + size + '" height="' + size + '" fill="none">' +
      '<path d="M45 20v70" stroke="' + accentDeep + '" stroke-width="2" stroke-linecap="round"/>' +
      '<g stroke="' + accent + '" stroke-width="1.6" stroke-linecap="round">' +
      [24, 34, 44, 54, 64].map(function (y) {
        return '<path d="M45 ' + y + 'c-6-2-10-6-10-10"/><path d="M45 ' + y + 'c6-2 10-6 10-10"/>';
      }).join('') +
      '</g>' +
      '<path d="M75 32c-4 12-4 30 2 46" stroke="' + accentDeep + '" stroke-width="2" stroke-linecap="round"/>' +
      '<g fill="' + accent + '"><circle cx="72" cy="46" r="4.5"/><circle cx="80" cy="52" r="4.5"/><circle cx="73" cy="60" r="4.5"/><circle cx="82" cy="66" r="4.5"/><circle cx="75" cy="74" r="4.5"/></g></svg>';
    s.cruz =
      '<svg viewBox="0 0 120 120" width="' + size + '" height="' + size + '" fill="none">' +
      '<path d="M60 14v78M32 42h56" stroke="' + accentDeep + '" stroke-width="3" stroke-linecap="round"/>' +
      '<g stroke="' + accent + '" stroke-width="1.6" stroke-linecap="round">' +
      '<circle cx="60" cy="14" r="4" fill="' + accent + '" stroke="none"/><circle cx="32" cy="42" r="4" fill="' + accent + '" stroke="none"/>' +
      '<circle cx="88" cy="42" r="4" fill="' + accent + '" stroke="none"/><circle cx="60" cy="92" r="4" fill="' + accent + '" stroke="none"/>' +
      '<path d="M48 20c-4 2-6 6-5 10M72 20c4 2 6 6 5 10"/><path d="M46 98c-2 4-1 8 2 11M74 98c2 4 1 8-2 11"/></g></svg>';
    return s[id] || s.calix;
  }

  function cornerFlourish(accent) {
    return (
      '<svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M2 2c8 0 14 2 18 6s6 10 6 18" stroke="' + accent + '" stroke-width="1.4" stroke-linecap="round"/>' +
      '<path d="M2 2c4 5 5 10 5 14" stroke="' + accent + '" stroke-width="1.1" stroke-linecap="round" opacity="0.75"/>' +
      '<circle cx="2" cy="2" r="2.4" fill="' + accent + '"/>' +
      '</svg>'
    );
  }

  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  function formatFechaEs(iso) {
    if (!iso) return '';
    var parts = iso.split('-').map(Number);
    var y = parts[0], m = parts[1], d = parts[2];
    if (!y || !m || !d) return '';
    var date = new Date(y, m - 1, d);
    var dia = DIAS[date.getDay()];
    var mes = MESES[m - 1];
    return dia.charAt(0).toUpperCase() + dia.slice(1) + ' ' + d + ' de ' + mes + ' de ' + y;
  }
  function formatHora(hhmm) {
    if (!hhmm) return '';
    return hhmm + ' hs';
  }
  function esc(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : str;
    return div.innerHTML;
  }

  // ---------- Ambient generative music (Web Audio, no external files) ----------
  var actx = null, masterGain = null, running = false, padOsc = [], timeouts = [];
  var CHORD = [261.63, 329.63, 392.0, 523.25];
  var BELLS = [523.25, 659.25, 783.99, 1046.5];
  function ensureCtx() {
    if (!actx) {
      actx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = actx.createGain();
      masterGain.gain.value = 0.0001;
      masterGain.connect(actx.destination);
    }
    return actx;
  }
  function playBell(time, freq) {
    var osc = actx.createOscillator(), gain = actx.createGain();
    osc.type = 'sine'; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.14, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.4);
    osc.connect(gain); gain.connect(masterGain);
    osc.start(time); osc.stop(time + 2.5);
  }
  function scheduleBells() {
    var delay = 2800 + Math.random() * 3200;
    var id = setTimeout(function () {
      if (!running) return;
      playBell(actx.currentTime, BELLS[Math.floor(Math.random() * BELLS.length)]);
      scheduleBells();
    }, delay);
    timeouts.push(id);
  }
  // Melodia simple y reverente sobre el pad
  var MELODIA = [523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 587.33, 659.25];
  var pasoMelodia = 0;
  function playNota(time, freq, dur) {
    var osc = actx.createOscillator(), gain = actx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.085, time + 0.14);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(gain); gain.connect(masterGain);
    osc.start(time); osc.stop(time + dur + 0.1);
  }
  function scheduleMelodia() {
    var id = setTimeout(function () {
      if (!running) return;
      playNota(actx.currentTime, MELODIA[pasoMelodia % MELODIA.length], 1.9);
      pasoMelodia++;
      scheduleMelodia();
    }, 1500);
    timeouts.push(id);
  }

  function startMusic() {
    ensureCtx();
    // resume() puede quedar pendiente o fallar segun el navegador, asi que
    // reintentamos cuando termine y dejamos el respaldo por interaccion.
    if (actx.state === 'suspended') {
      try {
        var r = actx.resume();
        if (r && r.then) r.then(function () {}, function () {});
      } catch (e) {}
    }
    if (running) return;
    running = true;
    padOsc = CHORD.map(function (freq, i) {
      var osc = actx.createOscillator(), gain = actx.createGain();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      gain.gain.value = 0.05 / (i + 1);
      osc.connect(gain); gain.connect(masterGain);
      osc.start();
      return osc;
    });
    masterGain.gain.cancelScheduledValues(actx.currentTime);
    masterGain.gain.setValueAtTime(masterGain.gain.value, actx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.55, actx.currentTime + 2.5);
    pasoMelodia = 0;
    scheduleBells();
    scheduleMelodia();
  }
  function stopMusic() {
    if (!actx || !running) return;
    running = false;
    timeouts.forEach(clearTimeout); timeouts = [];
    var now = actx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
    var oscs = padOsc;
    setTimeout(function () { oscs.forEach(function (o) { try { o.stop(); } catch (e) {} }); }, 1300);
    padOsc = [];
  }

  function desbloquearAudio() {
    if (!actx) return;
    if (actx.state === 'suspended') {
      try { actx.resume(); } catch (e) {}
    }
  }
  ['pointerdown', 'touchend', 'keydown'].forEach(function (ev) {
    document.addEventListener(ev, desbloquearAudio, { passive: true });
  });

  // ---------- State ----------
  // Cancion de Apple Music. Solo suena si el invitado toca play: los navegadores
  // bloquean el autoplay con sonido en iframes de otro dominio.
  var APPLE_MUSIC_SRC = 'https://embed.music.apple.com/es/song/mi-primera-comuni%C3%B3n/638856865';

  var DEFAULT_MSG = 'Hoy voy a recibir por primera vez el Cuerpo y la Sangre de Cristo en la Eucaristía. Quiero compartir este momento tan especial con las personas que más quiero, por eso te invito a acompañarme.';
  var FECHA_EVENTO = '2026-09-25';
  var HORA_EVENTO = '19:00';
  var DIRECCION_EVENTO = 'Rufino Varela Ortiz 2600 – B° Matienzo';
  var PARROQUIA_EVENTO = 'Parroquia Nuestra Señora de Fátima y San Pío V';
  var emptyForm = { nombre: '', fecha: FECHA_EVENTO, hora: HORA_EVENTO, parroquia: PARROQUIA_EVENTO, direccion: DIRECCION_EVENTO, padres: '', mensaje: '', genero: '' };
  function illusSrc(genero) { return genero === 'nene' ? '/boy.jpg' : '/girl.jpg'; }
  function coverSrc(genero) { return genero === 'nene' ? '/cover-boy.jpg' : '/cover-girl.jpg'; }
  var state = { view: 'intro', form: JSON.parse(JSON.stringify(emptyForm)), shareUrl: '', duplicateNote: '' };

  // ---------- Link corto ----------
  // Los datos del evento son fijos, asi que no viajan en la URL: solo el nombre,
  // el genero en una letra y un codigo corto -> ?n=Valentina+Gomez&g=a&c=k3f9
  var GEN_CODE = { nene: 'o', nena: 'a' };
  var CODE_GEN = { o: 'nene', a: 'nena' };

  function nuevoCodigo() {
    return Math.random().toString(36).slice(2, 6);
  }

  function buildShareUrl(data) {
    // Se comparte /nene o /nena: cada pagina trae su propia imagen de vista
    // previa, porque el crawler de WhatsApp no ejecuta JavaScript.
    var url = new URL(data.genero === 'nene' ? 'nene' : 'nena', location.href);
    url.search = '';
    url.hash = '';
    var q = url.searchParams;
    q.set('n', data.nombre);
    if (data.padres) q.set('p', data.padres);
    if (data.mensaje && data.mensaje !== DEFAULT_MSG) q.set('m', data.mensaje);
    q.set('c', data.codigo || nuevoCodigo());
    return url.toString();
  }

  // El genero sale de la pagina (/nene o /nena). El parametro ?g= se sigue
  // leyendo para no romper los links ya compartidos.
  function generoDeLaPagina() {
    if (/nene/.test(location.pathname)) return 'nene';
    if (/nena/.test(location.pathname)) return 'nena';
    return '';
  }

  function leerInvitacion(qs) {
    var nombre = qs.get('n');
    if (nombre) {
      return {
        nombre: nombre,
        genero: generoDeLaPagina() || CODE_GEN[qs.get('g')] || 'nena',
        padres: qs.get('p') || '',
        mensaje: qs.get('m') || '',
        codigo: qs.get('c') || '',
        fecha: FECHA_EVENTO,
        hora: HORA_EVENTO,
        parroquia: PARROQUIA_EVENTO,
        direccion: DIRECCION_EVENTO,
      };
    }
    // Compatibilidad: los links viejos llevaban el JSON entero en ?i=
    var legacy = qs.get('i');
    if (legacy) {
      try { return JSON.parse(legacy); } catch (e) { return null; }
    }
    return null;
  }

  var params = new URLSearchParams(location.search);
  var incoming = leerInvitacion(params);
  if (incoming && incoming.nombre) {
    state.view = 'invite';
    state.inviteData = incoming;
    state.opened = false;
    state.musicOn = true;
  }

  var app = document.getElementById('app');

  function coverHTML(data, opts) {
    opts = opts || {};
    var name = esc(data.nombre) || 'Nombre del niño/a';
    return (
      '<div class="cover-wrap"' + (opts.id ? ' id="' + opts.id + '"' : '') + '>' +
      '<img src="' + coverSrc(data.genero) + '" alt=""/>' +
      '<div class="cover-name">' + name + '</div>' +
      (opts.hint ? '<div class="cover-hint">' + esc(opts.hint) + '</div>' : '') +
      '</div>'
    );
  }

  function pageHTML(data, opts) {
    opts = opts || {};
    var t = getPalette(data.genero);
    var mensaje = (data.mensaje || '').trim() || DEFAULT_MSG;
    return (
      '<div class="page"' + (opts.id ? ' id="' + opts.id + '"' : '') + ' style="background:' + t.bg + ';color:' + t.ink + ';border:1px solid ' + t.accent + '55;">' +
      '<div class="corner tl">' + cornerFlourish(t.accentDeep) + '</div>' +
      '<div class="corner tr">' + cornerFlourish(t.accentDeep) + '</div>' +
      '<div class="corner bl">' + cornerFlourish(t.accentDeep) + '</div>' +
      '<div class="corner br">' + cornerFlourish(t.accentDeep) + '</div>' +
      '<div class="school"><img src="/logo.png" alt=""/><span style="color:' + t.accentDeep + '">' + esc(SCHOOL_NAME) + '</span></div>' +
      '<div class="church-banner"><img src="/church.jpg" alt=""/></div>' +
      '<img class="parroquia-logo" src="/parroquia-logo.png" alt=""/>' +
      '<p class="kicker" style="color:' + t.accentDeep + '"><i style="background:' + t.accent + '"></i>En su Primera Comunión<i style="background:' + t.accent + '"></i></p>' +
      '<h2 class="font-display">' + (esc(data.nombre) || 'Nombre del niño/a') + '</h2>' +
      '<div class="rule"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="' + t.accent + '"/></svg></div>' +
      '<p class="msg font-display">' + esc(mensaje) + '</p>' +
      '<div class="divider-motif">' + motifSvg('cruz', t.accent, t.accentDeep, 30) + '</div>' +
      '<div class="spacer"></div>' +
      '<div class="when"><span>' + (formatFechaEs(data.fecha) || 'Fecha a confirmar') + '</span>' +
      (data.hora ? '<span style="font-weight:600">' + esc(formatHora(data.hora)) + '</span>' : '') + '</div>' +
      (data.parroquia ? '<p class="parroquia">' + esc(data.parroquia) + '</p>' : '') +
      (data.direccion ? '<p class="direccion">' + esc(data.direccion) + '</p>' : '') +
      (data.padres ? '<p class="padres" style="color:' + t.accentDeep + '">' + esc(data.padres) + '</p>' : '') +
      '<div class="footer-logo"><img src="/logo.png" alt=""/><span style="color:' + t.accentDeep + '">' + esc(SCHOOL_NAME) + '</span></div>' +
      '<span class="shine"></span>' +
      '<span class="sparkles" aria-hidden="true">' +
      [1, 2, 3, 4, 5, 6].map(function (n) { return '<i class="sp sp' + n + '" style="background:' + t.accent + '"></i>'; }).join('') +
      '</span>' +
      '</div>'
    );
  }

  function bookHTML(id, data) {
    return (
      '<div class="book-wrap" id="' + id + '-wrap"><div class="pages-edge"></div><div class="book" id="' + id + '">' +
      '<div class="face front">' + coverHTML(data, { hint: 'Toca para abrir' }) + '</div>' +
      '<div class="face back">' + pageHTML(data) + '</div>' +
      '</div></div>'
    );
  }

  function wireBook(id, onOpen) {
    var book = document.getElementById(id);
    var wrap = document.getElementById(id + '-wrap');
    if (!book) return;
    book.addEventListener('click', function () {
      var willOpen = !book.classList.contains('open');
      book.classList.toggle('open');
      if (wrap) wrap.classList.toggle('is-open', willOpen);
      if (willOpen && onOpen) onOpen();
    });
  }

  function render() {
    if (state.view === 'intro') renderIntro();
    else if (state.view === 'form' || state.view === 'saving') renderForm();
    else if (state.view === 'success') renderSuccess();
    else if (state.view === 'invite') renderInvite();
  }

  function creditoHTML() {
    return '<footer class="credit"><a href="https://sb2b.vercel.app/" target="_blank" rel="noopener">StudioB2B</a></footer>';
  }

  function shell(inner) {
    app.innerHTML =
      '<header class="top"><div class="logo-wrap"><img class="logo" src="/logo.png" alt=""/></div><p class="eyebrow">' + esc(SCHOOL_NAME) + '</p>' +
      '<h1 class="font-display">Invitaciones de Primera Comunión · 5° Grado B</h1></header>' +
      '<main class="wrap"><div class="col">' + inner + '</div></main>' + creditoHTML();
  }

  function renderIntro() {
    shell(
      '<div class="intro fade-up">' +
      '<div class="badge">' + motifSvg('calix', '#c9a24b', '#9c7a2e', 52) + '</div>' +
      '<h2 class="font-display">Armá tu tarjeta de invitación</h2>' +
      '<p>Completá tus datos y vas a poder descargar tu invitación como imagen ' +
      'y compartirla por WhatsApp con un link que se abre como una tarjetita animada, con música.</p>' +
      '<button class="btn" id="start-btn">Comenzar ✨</button>' +
      '</div>'
    );
    document.getElementById('start-btn').onclick = function () { state.view = 'form'; render(); };
  }

  function canSubmit() {
    return state.form.nombre.trim().length > 1 && !!state.form.genero;
  }

  function renderForm() {
    var f = state.form;

    shell(
      '<div class="fade-up form-grid">' +
      '<form id="invite-form" style="display:flex;flex-direction:column;gap:14px">' +
      '<div><p class="label">¿Sos nene o nena? *</p><div class="gender-grid">' +
      '<button type="button" class="gender-btn' + (f.genero === 'nena' ? ' active' : '') + '" data-genero="nena"><img src="/girl.jpg" alt=""/><span>Nena</span></button>' +
      '<button type="button" class="gender-btn' + (f.genero === 'nene' ? ' active' : '') + '" data-genero="nene"><img src="/boy.jpg" alt=""/><span>Nene</span></button>' +
      '</div></div>' +
      field('Tu nombre y apellido *', '<input required id="f-nombre" placeholder="Ej: Valentina Gómez" value="' + esc(f.nombre) + '"/>') +
      '<p class="note">📅 ' + formatFechaEs(FECHA_EVENTO) + ' · ' + formatHora(HORA_EVENTO) + '<br>⛪ ' + esc(PARROQUIA_EVENTO) + '<br>📍 ' + esc(DIRECCION_EVENTO) + '</p>' +
      field('Padres', '<input id="f-padres" placeholder="Ej: Hijos de Juan y María" value="' + esc(f.padres) + '"/>') +
      field('Mensaje personalizado', '<textarea id="f-mensaje" rows="3" placeholder="' + esc(DEFAULT_MSG) + '">' + esc(f.mensaje) + '</textarea>') +
      '<div id="form-error" style="color:#a33;font-size:0.85rem"></div>' +
      '<button type="submit" class="btn" id="submit-btn"' + (canSubmit() ? '' : ' disabled') + '>' +
      (state.view === 'saving' ? 'Guardando…' : 'Crear mi invitación') + '</button>' +
      '</form>' +
      '<div><p class="label preview-label">Vista previa · tocá la tapa para abrirla</p><div>' + bookHTML('preview-book', f) + '</div></div>' +
      '</div>'
    );
    wireBook('preview-book');

    var ids = ['nombre', 'padres', 'mensaje'];
    ids.forEach(function (id) {
      var el = document.getElementById('f-' + id);
      el.addEventListener('input', function () {
        state.form[id] = el.value;
        document.getElementById('submit-btn').disabled = !canSubmit();
        var wasOpen = !!document.getElementById('preview-book') && document.getElementById('preview-book').classList.contains('open');
        var wrap = document.querySelector('.form-grid > div:last-child');
        wrap.innerHTML = '<p class="label preview-label">Vista previa · tocá la tapa para abrirla</p><div>' + bookHTML('preview-book', state.form) + '</div>';
        if (wasOpen) {
          document.getElementById('preview-book').classList.add('open');
          document.getElementById('preview-book-wrap').classList.add('is-open');
        }
        wireBook('preview-book');
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll('.gender-btn'), function (btn) {
      btn.addEventListener('click', function () {
        state.form.genero = btn.getAttribute('data-genero');
        renderForm();
      });
    });
    document.getElementById('invite-form').addEventListener('submit', function (e) {
      e.preventDefault();
      submitForm();
    });
  }

  function field(label, inputHtml) {
    return '<label class="field"><span class="label">' + label + '</span>' + inputHtml + '</label>';
  }

  // ---------- Registro (Supabase) — para que Guille vea quién usó la app ----------
  var SUPABASE_URL = 'https://sxfnqucwcteiligdtehq.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4Zm5xdWN3Y3RlaWxpZ2R0ZWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODUzNzYsImV4cCI6MjA5NTk2MTM3Nn0.wULpHXuJ0qE1mVcN2FNvEJBVJ4XT8USXtVmNDVeb16s';
  function registrarUso(data) {
    try {
      fetch(SUPABASE_URL + '/rest/v1/invitaciones_comunion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          nombre_nino: data.nombre, fecha: data.fecha || null, hora: data.hora || null,
          parroquia: data.parroquia || null, direccion: data.direccion || null,
          padres: data.padres || null, mensaje: data.mensaje || null, template: data.genero || null,
        }),
      }).catch(function () {});
    } catch (e) {}
  }

  function submitForm() {
    if (!canSubmit()) return;
    var f = state.form;
    var data = {
      nombre: f.nombre.trim(), fecha: f.fecha, hora: f.hora || '', parroquia: f.parroquia.trim(),
      direccion: f.direccion.trim(), padres: f.padres.trim(), mensaje: f.mensaje.trim(),
      genero: f.genero, codigo: f.codigo || nuevoCodigo(),
    };
    f.codigo = data.codigo;
    state.shareUrl = buildShareUrl(data);
    state.view = 'success';
    registrarUso(data);
    render();
  }

  function textoCompartir(nombre, url) {
    return '✨ ¡Te invito a mi Primera Comunión! ✨\n\n' +
      'Soy ' + nombre + ' y voy a recibir a Jesús por primera vez.\n\n' +
      '📅 ' + formatFechaEs(FECHA_EVENTO) + '\n' +
      '🕐 ' + formatHora(HORA_EVENTO) + '\n' +
      '⛪ ' + PARROQUIA_EVENTO + '\n' +
      '📍 ' + DIRECCION_EVENTO + '\n\n' +
      'Abrí tu invitación acá 👉 ' + url;
  }

  function renderSuccess() {
    var f = state.form;
    var waText = encodeURIComponent(textoCompartir(f.nombre.trim(), state.shareUrl));
    shell(
      '<div class="fade-up success-wrap">' +
      '<div><p class="label preview-label">Tu invitación · tocá para abrirla</p>' + bookHTML('success-book', f) + '</div>' +
      '<div style="position:fixed;left:-9999px;top:0;width:640px">' +
      coverHTML(f, { id: 'capture-cover' }) +
      '<div style="margin-top:24px">' + pageHTML(f, { id: 'capture-inside' }) + '</div>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:10px">' +
      '<button class="btn" id="download-btn" data-which="inside">Descargar el interior (imagen)</button>' +
      '<button class="btn ghost" id="download-cover-btn" data-which="cover">Descargar la tapa</button>' +
      '<a class="btn wa" target="_blank" rel="noreferrer" href="https://wa.me/?text=' + waText + '">Compartir por WhatsApp</a>' +
      '<div class="link-row"><input readonly value="' + esc(state.shareUrl) + '" id="share-input" style="flex:1;font-size:0.75rem"/>' +
      '<button class="btn ghost" id="copy-btn" style="width:auto;padding:0 14px">Copiar</button></div>' +
      '<a href="' + esc(state.shareUrl) + '" target="_blank" rel="noreferrer" style="font-size:0.85rem;color:var(--gold-deep)">Ver mi invitación animada →</a>' +
      '</div>' +
      '<button class="linklike" id="again-btn">Crear otra tarjeta</button>' +
      '</div>'
    );
    wireBook('success-book');
    document.getElementById('share-input').addEventListener('focus', function (e) { e.target.select(); });
    document.getElementById('copy-btn').addEventListener('click', function () {
      navigator.clipboard.writeText(state.shareUrl).catch(function () {});
    });
    document.getElementById('again-btn').addEventListener('click', function () {
      state.form = JSON.parse(JSON.stringify(emptyForm));
      state.view = 'form';
      render();
    });
    document.getElementById('download-btn').addEventListener('click', function () { downloadCard('inside', this); });
    document.getElementById('download-cover-btn').addEventListener('click', function () { downloadCard('cover', this); });
  }

  function downloadCard(which, btn) {
    var node = document.getElementById(which === 'cover' ? 'capture-cover' : 'capture-inside');
    if (!node) return;
    var label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Generando…';

    var reset = function () { btn.textContent = label; btn.disabled = false; };

    toPng(node, { pixelRatio: 3, cacheBust: true })
      .then(function (dataUrl) {
        var base = state.form.nombre.trim().replace(/\s+/g, '-').toLowerCase() || 'invitacion';
        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'invitacion-' + base + '-' + which + '.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        reset();
      })
      .catch(function (err) {
        console.error(err);
        reset();
        alert('No se pudo descargar la imagen. Probá de nuevo en unos segundos.');
      });
  }

  function renderInvite() {
    var data = state.inviteData;
    var t = getPalette(data.genero);
    if (data.nombre) document.title = 'Primera Comunión de ' + data.nombre;

    var petals = '';
    for (var i = 0; i < 14; i++) {
      var left = (i * 71) % 100;
      var delay = ((i * 1.7) % 12).toFixed(1);
      var dur = 10 + (i % 5) * 2;
      var size = 8 + (i % 4) * 4;
      petals += '<span class="petal" style="left:' + left + '%;width:' + size + 'px;height:' + size + 'px;background:' + t.accent + ';animation:driftDown ' + dur + 's linear ' + delay + 's infinite"></span>';
    }

    app.innerHTML =
      '<div class="invite-screen' + (state.opened ? ' opened' : '') + '" style="background:linear-gradient(180deg,' + t.bg + ' 0%,' + t.bg2 + ' 100%);color:' + t.ink + '">' +
      '<div style="position:fixed;inset:0;background-image:url(/church.jpg);background-size:cover;background-position:center;opacity:0.05;pointer-events:none;z-index:0"></div>' +
      '<button class="music-toggle" id="music-toggle" style="border:1px solid ' + t.accent + '88;color:' + t.accentDeep + '">' + (state.musicOn ? '♪' : '✕') + '</button>' +
      petals +
      '<div class="invite-book-wrap fade-up">' + bookHTML('invite-book', data) + '</div>' +
      '<div class="invite-extra">' +
      (data.padres ? '<p style="font-size:0.85rem;color:' + t.accentDeep + ';font-style:italic;margin:6px 0 0">' + esc(data.padres) + '</p>' : '') +
      '<div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:10px">' +
      '<img src="/logo.png" alt="" style="width:16px;height:auto"/>' +
      '<p style="margin:0;font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:' + t.accentDeep + ';opacity:0.8">' + esc(SCHOOL_NAME) + ' · 5° Grado B</p>' +
      '</div>' +
      '<div class="song">' +
      '<p class="song-label" style="color:' + t.accentDeep + '">♪ Escuchá la canción</p>' +
      '<iframe id="song-frame" title="Mi Primera Comunión" loading="lazy" allow="autoplay *; encrypted-media *; clipboard-write" frameborder="0" height="175" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="' + APPLE_MUSIC_SRC + '"></iframe>' +
      '</div>' +
      '<button class="btn" id="share-invite-btn" style="margin-top:20px;background:' + t.accentDeep + ';color:' + t.bg + '">Compartir esta invitación</button>' +
      creditoHTML() +
      '</div></div>';

    var book = document.getElementById('invite-book');
    if (state.opened) {
      book.classList.add('open');
      document.getElementById('invite-book-wrap').classList.add('is-open');
    }
    wireBook('invite-book', function () {
      state.opened = true;
      document.querySelector('.invite-screen').classList.add('opened');
      if (state.musicOn) startMusic();
    });

    document.getElementById('music-toggle').addEventListener('click', function (e) {
      if (state.musicOn) { stopMusic(); state.musicOn = false; } else { startMusic(); state.musicOn = true; }
      e.target.textContent = state.musicOn ? '♪' : '✕';
    });
    document.getElementById('share-invite-btn').addEventListener('click', function () {
      var url = location.href;
      if (navigator.share) {
        navigator.share({ title: 'Mi Primera Comunión · ' + data.nombre, text: textoCompartir(data.nombre, url) }).catch(function () {});
      } else {
        navigator.clipboard.writeText(url).then(function () { alert('Link copiado'); }).catch(function () {});
      }
    });
  }

  render();
