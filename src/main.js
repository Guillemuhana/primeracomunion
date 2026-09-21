import './style.css';
import { toJpeg, getFontEmbedCSS } from 'html-to-image';

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

  // ---------- State ----------
  // ---------- Musica ----------
  // Suena sola apenas se ve la tapa de la tarjeta, en loop. Casi ningun
  // navegador deja arrancar audio sin un gesto previo del visitante: se
  // intenta igual de entrada y, si lo bloquean, queda armado para largar en
  // el primer toque / scroll / tecla que haya. Si el archivo no esta, no se
  // muestra nada.
  var AUDIO_SRC = '/cancion.mp3';
  var audioEl = null;
  var musicaSlot = '';
  var musicaColor = '';
  var gestosArmados = false;
  var GESTOS = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'click'];

  function botonSilenciarHTML(color) {
    return '<div class="song">' +
      '<button class="song-mute" id="song-mute"' + (color ? ' style="color:' + color + '"' : '') + '>' +
      '\u266a M\u00fasica \u00b7 silenciar</button></div>';
  }

  function huecoMusica() {
    return musicaSlot ? document.getElementById(musicaSlot) : null;
  }

  function sinMusica() {
    var hueco = huecoMusica();
    if (hueco) hueco.innerHTML = '';
  }

  function mostrarControlMusica() {
    var hueco = huecoMusica();
    if (!hueco || hueco.getAttribute('data-listo')) return;
    hueco.setAttribute('data-listo', '1');
    hueco.innerHTML = botonSilenciarHTML(musicaColor);
    var btn = document.getElementById('song-mute');
    btn.addEventListener('click', function () {
      if (audioEl.paused) {
        audioEl.muted = false;
        audioEl.play().catch(function () {});
      } else {
        audioEl.muted = !audioEl.muted;
      }
      btn.textContent = audioEl.muted ? '\u2715 M\u00fasica \u00b7 activar' : '\u266a M\u00fasica \u00b7 silenciar';
    });
  }

  function reproducirMusica() {
    if (!audioEl) return;
    var pr = audioEl.play();
    if (pr && pr.then) pr.then(mostrarControlMusica, armarGestos);
    else mostrarControlMusica();
  }

  // Un solo juego de listeners: el primer gesto que haya larga la cancion y
  // despues se desarman solos. En captura, para que no los tape nadie.
  function armarGestos() {
    if (gestosArmados) return;
    gestosArmados = true;
    var largar = function () {
      gestosArmados = false;
      GESTOS.forEach(function (ev) { document.removeEventListener(ev, largar, true); });
      reproducirMusica();
    };
    GESTOS.forEach(function (ev) { document.addEventListener(ev, largar, true); });
  }

  // Llamar al renderizar la pantalla que muestra la tapa.
  function arrancarMusica(slotId, color) {
    musicaSlot = slotId;
    musicaColor = color || '';
    if (audioEl) { reproducirMusica(); return; }
    try {
      audioEl = new Audio(AUDIO_SRC);
      audioEl.loop = true;
      audioEl.preload = 'auto';
      // Sin archivo de audio no se muestra nada y no se reintenta.
      audioEl.addEventListener('error', function () { audioEl = null; sinMusica(); }, { once: true });
      reproducirMusica();
    } catch (e) {
      audioEl = null;
      sinMusica();
    }
  }

  // Al salir de la tarjeta la cancion se corta: el boton para volver a
  // activarla ya no esta en pantalla.
  function detenerMusica() {
    musicaSlot = '';
    if (!audioEl) return;
    audioEl.pause();
    audioEl.currentTime = 0;
  }

  var DEFAULT_MSG = 'Hoy voy a recibir por primera vez el Cuerpo y la Sangre de Cristo en la Eucaristía. Quiero compartir este momento tan especial con las personas que más quiero, por eso te invito a acompañarme.';
  var FECHA_EVENTO = '2026-09-25';
  var HORA_EVENTO = '19:00';
  var DIRECCION_EVENTO = 'Rufino Varela Ortiz 2600 – B° Matienzo';
  var PARROQUIA_EVENTO = 'Parroquia Nuestra Señora de Fátima y San Pío V';
  // Diez frases para elegir. Ninguna se escribe sola en la tarjeta: al tocar
  // una se carga en el cuadro de texto y desde ahi se edita, se le agrega o se
  // borra. Las que traen [corchetes] son huecos para completar (la casa o el
  // salon del festejo, que cambian en cada familia): al elegirlas queda el
  // hueco seleccionado para escribir encima.
  var FRASES = [
    { t: 'Sugerida', m: DEFAULT_MSG },
    { t: 'Con ilusión', m: 'Con mucha ilusión quiero invitarte a compartir conmigo el día en que Jesús viene por primera vez a mi corazón.' },
    { t: 'Unidos en la fe', m: 'En este día tan hermoso en que Dios me une a Él en la santa comunión, quiero compartir mi alegría con vos y con los que más quiero.' },
    { t: 'Acompañame', m: 'Acompañame a celebrar este día tan especial, en el que recibo por primera vez a nuestro Señor Jesucristo.' },
    { t: 'Y después, en casa', m: 'Te espero en la iglesia para recibir a Jesús por primera vez y, al terminar la misa, en casa: [dirección de tu casa], para seguir festejando juntos.' },
    { t: 'Brindis en casa', m: 'Quiero que estés conmigo en la ceremonia y después en mi casa, en [dirección de tu casa], para brindar y compartir la mesa dulce.' },
    { t: 'Almuerzo en familia', m: 'Terminada la ceremonia seguimos el festejo en [lugar del festejo], donde te espero para compartir un almuerzo en familia.' },
    { t: 'Desde mi bautismo', m: 'Vos, que estuviste conmigo el día de mi bautismo, no podés faltar ahora que recibo a Jesús por primera vez.' },
    { t: 'Gracias por venir', m: 'Hoy Jesús entra en mi corazón y quiero que las personas que más quiero estén conmigo. Gracias por acompañarme en este día.' },
    { t: 'Para recordar', m: 'Hay días que se guardan en el corazón para siempre. Este es uno de ellos y quiero vivirlo con vos.' },
  ];

  // El mensaje viene cargado con el texto sugerido para que se pueda editar,
  // borrar o reemplazar. Vacio a proposito tambien es una opcion valida.
  var emptyForm = { nombre: '', fecha: FECHA_EVENTO, hora: HORA_EVENTO, parroquia: PARROQUIA_EVENTO, direccion: DIRECCION_EVENTO, mensaje: DEFAULT_MSG, genero: '' };
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
    // sm=1 marca 'sin mensaje': borrado a proposito. Si no, solo viaja el
    // texto cuando es distinto del sugerido, para no alargar el link.
    var msg = (data.mensaje == null ? DEFAULT_MSG : data.mensaje).trim();
    if (!msg) q.set('sm', '1');
    else if (msg !== DEFAULT_MSG) q.set('m', msg);
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
        mensaje: qs.get('sm') ? '' : (qs.get('m') || DEFAULT_MSG),
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
  if (params.has('lista')) state.view = 'lista';
  var incoming = leerInvitacion(params);
  if (incoming && incoming.nombre) {
    state.view = 'invite';
    state.inviteData = incoming;
    state.opened = false;
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
      '<span class="sparkles cover-sparkles" aria-hidden="true">' +
      [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) { return '<i class="sp sp' + n + '"></i>'; }).join('') +
      '</span>' +
      '</div>'
    );
  }

  // La tarjeta es una caja de alto fijo: un nombre de dos renglones o un
  // mensaje largo la desbordaban por abajo y el texto terminaba pisando lo que
  // hubiera debajo. En vez de recortar, el texto se achica por tramos segun
  // cuanto ocupa, asi entra entero y la fecha no se sale.
  function escalaMensaje(largo) {
    if (largo <= 210) return 1;
    if (largo <= 280) return 0.8;
    if (largo <= 350) return 0.72;
    return 0.64;
  }
  function escalaNombre(largo) {
    if (largo <= 16) return 1;
    if (largo <= 24) return 0.82;
    return 0.72;
  }

  function pageHTML(data, opts) {
    opts = opts || {};
    var t = getPalette(data.genero);
    // data.mensaje === '' es 'sin mensaje'; undefined/null cae en el sugerido.
    var mensaje = (data.mensaje == null ? DEFAULT_MSG : data.mensaje).trim();
    return (
      '<div class="page' + (opts.cls ? ' ' + opts.cls : '') + '"' + (opts.id ? ' id="' + opts.id + '"' : '') + ' style="background:' + t.bg + ';color:' + t.ink + ';border:1px solid ' + t.accent + '55;">' +
      '<div class="corner tl">' + cornerFlourish(t.accentDeep) + '</div>' +
      '<div class="corner tr">' + cornerFlourish(t.accentDeep) + '</div>' +
      '<div class="corner bl">' + cornerFlourish(t.accentDeep) + '</div>' +
      '<div class="corner br">' + cornerFlourish(t.accentDeep) + '</div>' +
      '<span class="mono-wrap" aria-hidden="true"><img class="mono" src="/mono.webp" alt=""/>' +
      '<span class="mono-shine"><i></i></span></span>' +
      '<div class="school"><img src="/logo.png" alt=""/><span style="color:' + t.accentDeep + '">' + esc(SCHOOL_NAME) + '</span></div>' +
      '<div class="church-banner"><img src="/church.jpg" alt=""/></div>' +
      '<img class="parroquia-logo" src="/parroquia-logo.png" alt=""/>' +
      '<p class="kicker" style="color:' + t.accentDeep + '"><i style="background:' + t.accent + '"></i>En su Primera Comunión<i style="background:' + t.accent + '"></i></p>' +
      '<h2 class="font-display" style="--name-scale:' + escalaNombre((data.nombre || '').trim().length) + '">' +
      (esc(data.nombre) || 'Nombre del niño/a') + '</h2>' +
      '<div class="rule"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="' + t.accent + '"/></svg></div>' +
      '<div class="spacer spacer-top"></div>' +
      (mensaje ? '<p class="msg font-display" style="--msg-scale:' + escalaMensaje(mensaje.length) + '">' +
        esc(mensaje) + '</p>' : '') +
      '<div class="divider-motif">' + motifSvg('cruz', t.accent, t.accentDeep, 30) + '</div>' +
      '<div class="spacer"></div>' +
      '<div class="when"><span>' + (formatFechaEs(data.fecha) || 'Fecha a confirmar') + '</span>' +
      (data.hora ? '<span style="font-weight:600">' + esc(formatHora(data.hora)) + '</span>' : '') + '</div>' +
      (data.parroquia ? '<p class="parroquia">' + esc(data.parroquia) + '</p>' : '') +
      (data.direccion ? '<p class="direccion">' + esc(data.direccion) + '</p>' : '') +
      '<div class="footer-logo"><img src="/logo.png" alt=""/><span style="color:' + t.accentDeep + '">' + esc(SCHOOL_NAME) + '</span></div>' +
      '<span class="shine-box"><span class="shine"></span></span>' +
      '<span class="sparkles" aria-hidden="true">' +
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (n) { return '<i class="sp sp' + n + '" style="color:' + t.accentDeep + '"></i>'; }).join('') +
      '</span>' +
      '</div>'
    );
  }

  function bookHTML(id, data) {
    return (
      '<div class="book-wrap" id="' + id + '-wrap"><div class="book" id="' + id + '">' +
      '<div class="face front">' + coverHTML(data, { hint: 'Toca para abrir' }) + '</div>' +
      '<div class="face back">' + pageHTML(data) + '</div>' +
      '</div></div>'
    );
  }

  // Escribe el mensaje letra por letra al abrir la tarjeta.
  // Las letras ya estan en el DOM desde el arranque, solo en opacity 0: asi
  // no hay reflujo y el texto no empuja al resto mientras aparece. Se agrupa
  // por palabra para que los cortes de linea sigan cayendo donde corresponde.
  function escribirMensaje(bookId) {
    var msg = document.querySelector('#' + bookId + ' .msg');
    if (!msg || msg.getAttribute('data-escrito')) return;
    msg.setAttribute('data-escrito', '1');

    var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quieto) return;

    var texto = msg.textContent;
    msg.textContent = '';
    var letras = [];
    texto.split(' ').forEach(function (palabra, i) {
      if (i) msg.appendChild(document.createTextNode(' '));
      var w = document.createElement('span');
      w.className = 'w';
      palabra.split('').forEach(function (c) {
        var ch = document.createElement('span');
        ch.className = 'ch';
        ch.textContent = c;
        w.appendChild(ch);
        letras.push(ch);
      });
      msg.appendChild(w);
    });

    msg.classList.add('escribiendo');
    var i = 0;
    // Una letra por vez y con mas pausa: se lee mientras se escribe.
    var id = setInterval(function () {
      if (i < letras.length) letras[i++].classList.add('on');
      if (i >= letras.length) {
        clearInterval(id);
        msg.classList.remove('escribiendo');
      }
    }, 34);
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
    // Fuera de la tarjeta no hay boton para volver a activarla: se corta.
    if (state.view !== 'success' && state.view !== 'invite') detenerMusica();
    if (state.view === 'intro') renderIntro();
    else if (state.view === 'form' || state.view === 'saving') renderForm();
    else if (state.view === 'success') renderSuccess();
    else if (state.view === 'invite') renderInvite();
    else if (state.view === 'lista') renderLista();
  }

  // Iconos de los botones. Van inline para que no dependan de ninguna fuente
  // ni de un pedido mas al servidor, y toman el color del boton que los lleva.
  var ICO = {
    compartir:
      '<svg class="ico" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M12 3v13"/><path d="m7.5 7.5 4.5-4.5 4.5 4.5"/></svg>',
    bajar:
      '<svg class="ico" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 3v12"/><path d="m16.5 10.5-4.5 4.5-4.5-4.5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
    ver:
      '<svg class="ico" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>',
  };

  function creditoHTML() {
    return '<footer class="credit"><a href="https://sb2b.vercel.app/" target="_blank" rel="noopener">StudioB2B</a></footer>';
  }

  function shell(inner) {
    app.innerHTML =
      '<header class="top"><div class="logo-wrap"><img class="logo" src="/logo.png" alt=""/></div><p class="eyebrow">' + esc(SCHOOL_NAME) + '</p>' +
      '<h1 class="font-display">Invitaciones de Primera Comunión · 5° Grado B</h1></header>' +
      '<main class="wrap"><div class="col">' + inner + '</div></main>' + creditoHTML();
  }

  // Motas de luz que suben despacio detras del home.
  function motasHTML(cuantas) {
    var out = '';
    for (var i = 0; i < cuantas; i++) {
      out += '<i class="mote" style="left:' + ((i * 37 + 6) % 100) + '%;' +
        'width:' + (4 + (i % 4) * 3) + 'px;height:' + (4 + (i % 4) * 3) + 'px;' +
        'animation-duration:' + (16 + (i % 5) * 4) + 's;' +
        'animation-delay:' + ((i * 2.3) % 15).toFixed(1) + 's"></i>';
    }
    return '<div class="home-fx" aria-hidden="true">' + out + '</div>';
  }

  // El mono de la comunion asomando por el costado del home, igual que se
  // monta sobre el borde de la tarjeta: mitad afuera de la pantalla. Va
  // quieto, sin flotar ni destellar, que en una pantalla grande distraia.
  function monoDecoHTML() {
    return '<div class="mono-deco" aria-hidden="true"><img src="/mono.webp" alt=""/></div>';
  }

  // Lo que se manda al pasarle la app a otra familia del grado. No es una
  // invitacion: es el link para que armen la suya.
  function textoCompartirApp(url) {
    return '✨ Invitaciones de Primera Comunión · 5° Grado B ✨\n\n' +
      'Armá la tarjeta de tu hijo/a en un minuto: elegís nene o nena, ponés el nombre ' +
      'y el mensaje, y te queda lista para compartir por WhatsApp.\n\n' +
      '📅 ' + formatFechaEs(FECHA_EVENTO) + '\n' +
      '🕐 ' + formatHora(HORA_EVENTO) + '\n' +
      '⛪ ' + PARROQUIA_EVENTO + '\n\n' +
      'Entrá acá 👉 ' + url;
  }

  // El home puede abrirse con parametros colgados: se comparte la raiz limpia.
  function urlDeLaApp() {
    return new URL('./', location.href).href;
  }

  function renderIntro() {
    var pasos = [
      'Elegí nene o nena y escribí el nombre',
      'Mirá al instante cómo queda la tarjeta',
      'Descargala o compartila por WhatsApp',
    ];
    shell(
      motasHTML(14) +
      monoDecoHTML() +
      '<div class="intro home-intro">' +
      '<div class="badge">' + motifSvg('calix', '#c9a24b', '#9c7a2e', 52) + '</div>' +
      '<h2 class="font-display">Armá tu tarjeta de invitación</h2>' +
      '<p>Completá tus datos y en un minuto tenés tu invitación lista para ' +
      'descargar como imagen o compartir con un link que se abre como una tarjeta animada.</p>' +
      '<ol class="steps">' +
      pasos.map(function (paso, i) {
        return '<li><span class="step-n">' + (i + 1) + '</span><span>' + paso + '</span></li>';
      }).join('') +
      '</ol>' +
      '<div class="home-cta">' +
      '<button class="btn" id="start-btn">Comenzar ✨</button>' +
      '<button class="btn soft" id="share-app-btn">' + ICO.compartir + 'Compartir la app</button>' +
      '</div>' +
      '<div class="event-chip">' +
      '<span>📅 ' + formatFechaEs(FECHA_EVENTO) + ' · ' + formatHora(HORA_EVENTO) + '</span>' +
      '<span>⛪ ' + esc(PARROQUIA_EVENTO) + '</span>' +
      '</div>' +
      '</div>'
    );
    document.getElementById('start-btn').onclick = function () { state.view = 'form'; render(); };

    document.getElementById('share-app-btn').addEventListener('click', function () {
      var texto = textoCompartirApp(urlDeLaApp());
      if (navigator.share) {
        navigator.share({ title: 'Invitaciones de Primera Comunión · 5° Grado B', text: texto })
          .catch(function () {});
      } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank', 'noreferrer');
      }
    });
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
      mensajeFieldHTML(f) +
      '<div id="form-error" style="color:#a33;font-size:0.85rem"></div>' +
      '<button type="submit" class="btn" id="submit-btn"' + (canSubmit() ? '' : ' disabled') + '>' +
      (state.view === 'saving' ? 'Guardando…' : 'Crear mi invitación') + '</button>' +
      '</form>' +
      '<div><p class="label preview-label">Vista previa · tocá la tapa para abrirla</p><div>' + bookHTML('preview-book', f) + '</div></div>' +
      '</div>'
    );
    wireBook('preview-book');

    // La vista previa se rearma sola con cada tecla y conserva si la tarjeta
    // estaba abierta, para que no se cierre mientras se escribe.
    function refrescarPreview() {
      document.getElementById('submit-btn').disabled = !canSubmit();
      var libro = document.getElementById('preview-book');
      var abierto = !!libro && libro.classList.contains('open');
      var wrap = document.querySelector('.form-grid > div:last-child');
      wrap.innerHTML = '<p class="label preview-label">Vista previa · tocá la tapa para abrirla</p><div>' + bookHTML('preview-book', state.form) + '</div>';
      if (abierto) {
        document.getElementById('preview-book').classList.add('open');
        document.getElementById('preview-book-wrap').classList.add('is-open');
      }
      wireBook('preview-book');
    }

    function pintarContador() {
      var cont = document.getElementById('msg-count');
      if (cont) cont.textContent = (state.form.mensaje || '').length + '/' + MSG_MAX;
    }

    function pintarFrases() {
      var actual = (state.form.mensaje || '').trim();
      Array.prototype.forEach.call(document.querySelectorAll('.frase'), function (b) {
        b.classList.toggle('active', FRASES[Number(b.getAttribute('data-i'))].m === actual);
      });
    }

    document.getElementById('f-nombre').addEventListener('input', function () {
      state.form.nombre = this.value;
      refrescarPreview();
    });

    var ta = document.getElementById('f-mensaje');
    ta.addEventListener('input', function () {
      state.form.mensaje = ta.value;
      pintarContador();
      pintarFrases();
      refrescarPreview();
    });

    // Elegir una frase o vaciar la tarjeta escriben en el mismo textarea: lo
    // que se elige es un punto de partida, nunca un texto cerrado.
    function ponerMensaje(texto) {
      ta.value = texto;
      state.form.mensaje = texto;
      pintarContador();
      pintarFrases();
      refrescarPreview();
      var hueco = texto.indexOf('[');
      if (hueco >= 0) {
        // El hueco a completar queda seleccionado: se escribe encima.
        ta.focus();
        ta.setSelectionRange(hueco, texto.indexOf(']', hueco) + 1);
      } else if (!texto) {
        ta.focus();
      }
    }
    document.getElementById('frases-list').addEventListener('click', function (e) {
      var btn = e.target.closest('.frase');
      if (btn) ponerMensaje(FRASES[Number(btn.getAttribute('data-i'))].m);
    });
    document.getElementById('msg-clear').addEventListener('click', function () { ponerMensaje(''); });

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

  // Mensaje personalizado: viene con el texto sugerido cargado (no como
  // placeholder) para poder editarlo, agregarle o borrarlo. Vaciarlo del todo
  // es valido: la tarjeta sale sin el parrafo.
  var MSG_MAX = 420;

  // Las diez frases, cada una con su titulo corto. La elegida queda marcada
  // comparando el texto: si despues se edita una letra, deja de estar marcada,
  // que es justo lo que pasa (ya no es esa frase, es la suya).
  function frasesHTML(actual) {
    return '<div class="frases">' +
      '<p class="frases-head">Elegí una y editala a tu gusto</p>' +
      '<div class="frases-list" id="frases-list">' +
      FRASES.map(function (fr, i) {
        return '<button type="button" class="frase' + (fr.m === actual ? ' active' : '') + '" data-i="' + i + '">' +
          '<span class="frase-t">' + esc(fr.t) + '</span>' +
          '<span class="frase-m">' + esc(fr.m) + '</span>' +
          '</button>';
      }).join('') +
      '</div></div>';
  }

  function mensajeFieldHTML(f) {
    var val = f.mensaje == null ? DEFAULT_MSG : f.mensaje;
    return '<div class="field msg-field">' +
      '<div class="msg-head">' +
      '<span class="label">Mensaje de la tarjeta</span>' +
      '<span class="msg-count" id="msg-count">' + val.length + '/' + MSG_MAX + '</span>' +
      '</div>' +
      frasesHTML(val.trim()) +
      '<textarea id="f-mensaje" rows="6" maxlength="' + MSG_MAX + '" ' +
      'placeholder="Escribí acá tu mensaje…">' + esc(val) + '</textarea>' +
      '<div class="msg-tools">' +
      '<button type="button" class="chip" id="msg-clear">✕ Vaciar</button>' +
      '</div>' +
      '<p class="hint">Todas las frases son editables: agregá, borrá o escribí la tuya. Si la dejás vacía, la tarjeta sale sin mensaje.</p>' +
      '</div>';
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
          mensaje: data.mensaje || null, template: data.genero || null,
        }),
      }).catch(function () {});
    } catch (e) {}
  }

  // ---------- Quien fue creando tarjetas ----------
  // /?lista=1 lee la misma tabla donde registrarUso() guarda cada invitacion.
  function fechaCorta(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return '';
    var dosDigitos = function (n) { return (n < 10 ? '0' : '') + n; };
    return dosDigitos(d.getDate()) + '/' + dosDigitos(d.getMonth() + 1) + ' · ' +
      dosDigitos(d.getHours()) + ':' + dosDigitos(d.getMinutes());
  }

  function renderLista() {
    shell('<div class="fade-up lista" id="lista"><p class="label">Cargando…</p></div>');
    fetch(SUPABASE_URL + '/rest/v1/invitaciones_comunion?select=nombre_nino,template,created_at&order=created_at.desc', {
      headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY },
    })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(pintarLista)
      .catch(function () {
        document.getElementById('lista').innerHTML =
          '<p class="note">No se pudo leer la lista. Probá recargar en unos segundos.</p>';
      });
  }

  function pintarLista(filas) {
    filas = filas || [];
    var vistos = {};
    filas.forEach(function (f) {
      var n = (f.nombre_nino || '').trim().toLowerCase();
      if (n) vistos[n] = 1;
    });
    var unicos = Object.keys(vistos).length;

    var cuerpo = filas.length
      ? filas.map(function (f) {
          return '<tr><td>' + (esc(f.nombre_nino) || '—') + '</td>' +
            '<td>' + (f.template === 'nene' ? 'Nene' : f.template === 'nena' ? 'Nena' : '—') + '</td>' +
            '<td>' + esc(fechaCorta(f.created_at)) + '</td></tr>';
        }).join('')
      : '<tr><td colspan="3">Todavía no creó una tarjeta nadie.</td></tr>';

    document.getElementById('lista').innerHTML =
      '<h2 class="font-display" style="margin:0 0 4px">Tarjetas creadas</h2>' +
      '<p class="note lista-resumen">' + filas.length + ' tarjeta' + (filas.length === 1 ? '' : 's') +
      ' · ' + unicos + ' chico' + (unicos === 1 ? '' : 's') + ' distinto' + (unicos === 1 ? '' : 's') + '</p>' +
      '<div class="lista-tabla"><table><thead><tr><th>Nombre</th><th>Tipo</th><th>Cuándo</th></tr></thead>' +
      '<tbody>' + cuerpo + '</tbody></table></div>' +
      '<button class="btn ghost" id="csv-btn">Descargar CSV</button>';

    document.getElementById('csv-btn').addEventListener('click', function () {
      var csv = 'nombre,tipo,creada\n' + filas.map(function (f) {
        return '"' + String(f.nombre_nino || '').replace(/"/g, '""') + '","' +
          (f.template || '') + '","' + (f.created_at || '') + '"';
      }).join('\n');
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      a.download = 'tarjetas-comunion.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }

  function submitForm() {
    if (!canSubmit()) return;
    var f = state.form;
    var data = {
      nombre: f.nombre.trim(), fecha: f.fecha, hora: f.hora || '', parroquia: f.parroquia.trim(),
      direccion: f.direccion.trim(), mensaje: f.mensaje.trim(),
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
    var waUrl = 'https://wa.me/?text=' + encodeURIComponent(textoCompartir(f.nombre.trim(), state.shareUrl));
    shell(
      '<div class="fade-up success-wrap">' +
      '<div><p class="label preview-label">Tu invitación · tocá para abrirla</p>' + bookHTML('success-book', f) + '</div>' +
      '<div style="position:fixed;left:-9999px;top:0;width:900px">' +
      '<div style="width:640px">' + coverHTML(f, { id: 'capture-cover' }) + '</div>' +
      '<div id="capture-box" style="width:640px;padding:44px 44px 44px 127px;background:#ffffff;box-sizing:content-box;margin-top:24px">' +
      pageHTML(f, { id: 'capture-inside', cls: 'para-captura' }) + '</div>' +
      '</div>' +
      // Un solo boton principal (compartir, que es a lo que se vino) y abajo
      // las dos acciones secundarias, a la par y del mismo peso.
      '<div class="actions">' +
      '<button class="btn wa" id="share-btn">' + ICO.compartir + 'Compartir invitación</button>' +
      '<div class="actions-row">' +
      '<button class="btn soft" id="jpg-btn" title="Descargar la tarjeta como imagen JPG">' + ICO.bajar + 'Descargar</button>' +
      '<a class="btn soft" id="present-btn" href="' + esc(state.shareUrl) + '" target="_blank" rel="noreferrer" title="Abrir la invitación como la va a ver quien la reciba">' + ICO.ver + 'Ver online</a>' +
      '</div>' +
      '</div>' +
      '<div id="song-slot"></div>' +
      '<button class="linklike" id="again-btn">Crear otra tarjeta</button>' +
      '</div>'
    );
    // La cancion arranca apenas se ve la tapa, sin esperar a que la abran.
    arrancarMusica('song-slot');
    wireBook('success-book', function () {
      escribirMensaje('success-book');
    });

    // Compartir: el menu nativo del celular si existe, si no WhatsApp.
    document.getElementById('share-btn').addEventListener('click', function () {
      if (navigator.share) {
        navigator.share({
          title: 'Mi Primera Comunión · ' + f.nombre.trim(),
          text: textoCompartir(f.nombre.trim(), state.shareUrl),
        }).catch(function () {});
      } else {
        window.open(waUrl, '_blank', 'noreferrer');
      }
    });

    document.getElementById('jpg-btn').addEventListener('click', function () { descargarJpg(this); });
    document.getElementById('again-btn').addEventListener('click', function () {
      state.form = JSON.parse(JSON.stringify(emptyForm));
      state.view = 'form';
      render();
    });
  }

  // ---------- Descargar ----------
  function nombreArchivo(ext) {
    var base = (state.form.nombre || '').trim().replace(/\s+/g, '-').toLowerCase() || 'invitacion';
    return 'invitacion-' + base + '.' + ext;
  }

  // La captura sale del nodo escondido, que se renderiza fuera de .book y por
  // eso no arrastra brillos ni la animacion de apertura.
  // html-to-image clona la tarjeta dentro de un SVG: si las tipografias no
  // viajan embebidas, el clon cae en la fuente por defecto y el texto sale
  // distinto. Se piden una sola vez y se reusan.
  var fuentesCss = null;
  function capturaJpeg() {
    var node = document.getElementById('capture-box');
    if (!node) return Promise.reject(new Error('sin tarjeta'));
    var listas = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    return listas
      .then(function () {
        if (fuentesCss !== null) return fuentesCss;
        return getFontEmbedCSS(node).then(function (css) { fuentesCss = css; return css; },
          function () { fuentesCss = ''; return ''; });
      })
      .then(function (css) {
        return toJpeg(node, {
          pixelRatio: 3, quality: 0.95, backgroundColor: '#ffffff',
          fontEmbedCSS: css || undefined,
        });
      });
  }

  function bajarArchivo(href, nombre) {
    var a = document.createElement('a');
    a.href = href;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // El label se guarda como HTML: los botones llevan el icono adentro.
  function conBoton(btn, tarea) {
    var label = btn.innerHTML;
    btn.disabled = true;
    btn.classList.add('is-busy');
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>Generando…';
    var reset = function () { btn.innerHTML = label; btn.disabled = false; btn.classList.remove('is-busy'); };
    tarea().then(reset, function (err) {
      console.error(err);
      reset();
      alert('No se pudo generar el archivo. Probá de nuevo en unos segundos.');
    });
  }

  function descargarJpg(btn) {
    conBoton(btn, function () {
      return capturaJpeg().then(function (dataUrl) {
        bajarArchivo(dataUrl, nombreArchivo('jpg'));
      });
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
      petals +
      '<div class="invite-book-wrap fade-up">' + bookHTML('invite-book', data) + '</div>' +
      '<div class="invite-extra">' +
      '<div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:10px">' +
      '<img src="/logo.png" alt="" style="width:16px;height:auto"/>' +
      '<p style="margin:0;font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:' + t.accentDeep + ';opacity:0.8">' + esc(SCHOOL_NAME) + ' · 5° Grado B</p>' +
      '</div>' +
      '<div id="song-slot"></div>' +
      '<button class="btn" id="share-invite-btn" style="margin-top:20px;background:' + t.accentDeep + ';color:' + t.bg + '">Compartir esta invitación</button>' +
      creditoHTML() +
      '</div></div>';

    var book = document.getElementById('invite-book');
    if (state.opened) {
      book.classList.add('open');
      document.getElementById('invite-book-wrap').classList.add('is-open');
    }
    // Idem: suena desde que se ve la tapa. Si el navegador frena el
    // autoplay, el toque que abre la tarjeta ya alcanza para largarla.
    arrancarMusica('song-slot', t.accentDeep);
    wireBook('invite-book', function () {
      state.opened = true;
      document.querySelector('.invite-screen').classList.add('opened');
      escribirMensaje('invite-book');
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
