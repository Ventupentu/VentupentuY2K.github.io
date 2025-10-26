const docEl = document.documentElement;
const body = document.body;
const calmToggle = document.getElementById('calm-toggle');
const muteToggle = document.getElementById('mute-toggle');
const bgAudio = document.getElementById('bg-audio');
const cursorTrailContainer = document.getElementById('cursor-trail-container');
const monitorReadout = document.getElementById('monitor-readout');
const guestbookForm = document.getElementById('guestbook-form');
const guestbookList = document.getElementById('guestbook-entries');
const purgeButton = document.getElementById('purge-button');
const hitCounterEl = document.getElementById('hit-counter');
const projectsGrid = document.getElementById('projects-grid');
const nameEl = document.getElementById('name');
const roleEl = document.getElementById('role');
const taglineEl = document.getElementById('tagline');
const programmingList = document.getElementById('programming-languages');
const skillsList = document.getElementById('skills');
const languagesList = document.getElementById('idiomas');
const educationList = document.getElementById('education');
const achievementsList = document.getElementById('achievements');
const emailEl = document.getElementById('email');
const phoneEl = document.getElementById('phone');
const locationEl = document.getElementById('location');
const githubEl = document.getElementById('github');

const content = {
  name: 'Ventura Ruibal Cancio',
  role: 'Estudiante de 4º de Intelixencia Artificial — Universidade de Vigo',
  tagline: 'Apasionado por la tecnología, con especial interés en aprendizaje automático, visión por computador y análisis de datos. Miembro de la asociación estudiantil Auria Technologies (Formula Student).',
  contact: {
    email: 'venturacancio@gmail.com',
    phone: '604 034 010',
    location: 'Bergondo, A Coruña',
    github: 'https://github.com/Ventupentu'
  },
  programmingLanguages: ['Python', 'Java', 'Julia', 'Prolog'],
  skills: ['Machine Learning', 'Ciencia de Datos'],
  education: [
    {
      year: '2022 – Actualidad',
      title: 'Grado en Intelixencia Artificial — ESEI, Universidade de Vigo',
      note: 'Actualmente en 4º curso'
    },
    {
      year: '2023',
      title: 'Curso de iniciación en Julia · Curso especializado en lenguaje Julia',
      place: 'Universidade de Vigo'
    }
  ],
  achievements: [
    {
      year: '2025',
      title: 'AdaByron — Competición de programación',
      detail: 'Miembro del primer equipo clasificado en la fase regional.'
    },
    {
      year: '2025 – Actualidad',
      title: 'Auria Technologies — Asociación estudiantil',
      detail: 'Participación en Formula Student y otros proyectos tecnológicos a nivel internacional.'
    }
  ],
  languages: [
    'Español (Nativo)',
    'Gallego (Nativo)',
    'Inglés (Preparación C1, sin título oficial)'
  ],
  projects: [
    {
      name: 'Autonomic_Car',
      description: 'Simulación de conducción autónoma con sensores virtuales y algoritmos de control.',
      tech: 'Python, ROS, control autónomo',
      url: 'https://github.com/Ventupentu/Autonomic_Car'
    },
    {
      name: 'GRIA-TestCreator',
      description: 'Generador de cuestionarios para la materia de Gestión de Redes e Infraestructuras Avanzadas.',
      tech: 'Java, Swing, IO',
      url: 'https://github.com/Ventupentu/GRIA-TestCreator'
    },
    {
      name: 'Face-Drawer',
      description: 'Aplicación creativa que construye rostros a partir de referencias e inputs personalizados.',
      tech: 'Processing, visión por computador',
      url: 'https://github.com/Ventupentu/Face-Drawer'
    },
    {
      name: 'Car-Finder',
      description: 'Herramienta que ayuda a localizar vehículos aplicando algoritmos de búsqueda y filtros personalizados.',
      tech: 'Python, APIs públicas, scraping',
      url: 'https://github.com/Ventupentu/Car-Finder'
    }
  ]
};

const STORAGE_KEYS = {
  calm: 'ventura_calm_mode',
  mute: 'ventura_mute_state',
  guestbook: 'guestbook_entries',
  hitCount: 'hit_count'
};

const state = {
  calm: false,
  muted: false,
  audioReady: false,
  audioContext: null,
  monitorTimer: null
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function init() {
  bootstrapState();
  initProfileContent();
  initLists();
  initEducation();
  initAchievements();
  initContact();
  initAudio();
  initCalmMode();
  initMute();
  initCursorTrail();
  initGuestbook();
  initHitCounter();
  initMonitor();
  initProjects();
  initContactSounds();
  initPrefersReducedMotionWatcher();
}

function initProfileContent() {
  if (nameEl) {
    nameEl.textContent = content.name;
    nameEl.dataset.text = content.name;
  }

  if (roleEl) {
    roleEl.textContent = content.role;
  }

  if (taglineEl) {
    taglineEl.textContent = content.tagline;
  }
}

function initLists() {
  renderList(programmingList, content.programmingLanguages);
  renderList(skillsList, content.skills);
  renderList(languagesList, content.languages);
}

function renderList(element, items) {
  if (!element || !Array.isArray(items)) return;
  element.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
}

function initEducation() {
  if (!educationList) return;
  educationList.innerHTML = content.education.map((entry) => `
      <li>
        <strong>${entry.year}</strong> — ${entry.title}${entry.note ? ` · <em>${entry.note}</em>` : ''}${entry.place ? ` · <span>${entry.place}</span>` : ''}
      </li>
    `).join('');
}

function initAchievements() {
  if (!achievementsList) return;
  achievementsList.innerHTML = content.achievements.map((achievement) => `
      <li>
        <strong>${achievement.year}</strong> — ${achievement.title} · <span>${achievement.detail}</span>
      </li>
    `).join('');
}

function initContact() {
  if (emailEl) {
    emailEl.textContent = `Email: ${content.contact.email}`;
    if (emailEl.tagName === 'A') {
      emailEl.href = `mailto:${content.contact.email}`;
    }
  }

  if (phoneEl) {
    phoneEl.textContent = `Teléfono: ${content.contact.phone}`;
    if (phoneEl.tagName === 'A') {
      const phoneNumber = content.contact.phone.replace(/\s+/g, '');
      phoneEl.href = `tel:${phoneNumber}`;
    }
  }

  if (locationEl) {
    locationEl.textContent = `Ubicación: ${content.contact.location}`;
  }

  if (githubEl) {
    githubEl.textContent = `GitHub: ${content.contact.github}`;
    if (githubEl.tagName === 'A') {
      githubEl.href = content.contact.github;
      githubEl.target = '_blank';
      githubEl.rel = 'noopener';
    }
  }
}

function initProjects() {
  if (!projectsGrid) return;

  const projects = Array.isArray(content.projects) ? content.projects : [];

  if (projects.length === 0) {
    projectsGrid.innerHTML = '<p class="project-placeholder">Pronto añadiré proyectos destacados.</p>';
    return;
  }

  projectsGrid.innerHTML = '';

  projects.forEach((item, index) => {
    projectsGrid.appendChild(createProjectCard(item, index));
  });
}

function createProjectCard(project, index) {
  const card = document.createElement('article');
  card.className = `project-card bevel tilt-${(index % 3) + 1}`;

  const title = document.createElement('h3');
  title.className = 'project-title chromatic';
  title.dataset.text = project.name;
  title.textContent = project.name;

  const description = document.createElement('p');
  description.textContent = project.description || 'Proyecto personal sin descripción proporcionada.';

  const meta = document.createElement('div');
  meta.className = 'project-meta';
  const language = document.createElement('span');
  language.className = 'project-language';
  language.textContent = project.tech ? `Tecnologías: ${project.tech}` : '';
  if (language.textContent) {
    meta.append(language);
  }

  const actions = document.createElement('div');
  actions.className = 'project-actions';
  const link = document.createElement('a');
  link.className = 'hero-btn bevel skeuo';
  link.href = project.url || content.contact.github;
  link.target = '_blank';
  link.rel = 'noopener';
  link.dataset.sound = 'zap';
  link.textContent = 'Visitar proyecto';
  link.addEventListener('pointerenter', () => {
    playZapSound('zap');
  });
  actions.appendChild(link);

  card.append(title, description);
  if (meta.children.length) {
    card.append(meta);
  }
  card.append(actions);
  return card;
}

function bootstrapState() {
  try {
    state.calm = localStorage.getItem(STORAGE_KEYS.calm) === 'true';
    state.muted = localStorage.getItem(STORAGE_KEYS.mute) === 'true';
  } catch {
    state.calm = false;
    state.muted = false;
  }
  applyCalmMode(state.calm, { silent: true });
  applyMute(state.muted, { silent: true });
}

function initAudio() {
  if (!bgAudio) return;
  bgAudio.volume = 0.18;
  bgAudio.loop = true;

  const attemptPlay = () => {
    if (state.calm || state.muted) return;
    bgAudio.play().then(() => {
      state.audioReady = true;
    }).catch(() => {
      state.audioReady = false;
    });
  };

  attemptPlay();
  document.addEventListener('pointerdown', () => {
    attemptPlay();
    if (state.audioContext && state.audioContext.state === 'suspended') {
      state.audioContext.resume();
    }
  }, { once: true });
}

function applyCalmMode(enabled, options = {}) {
  state.calm = Boolean(enabled);
  docEl.classList.toggle('calm', state.calm);
  calmToggle?.setAttribute('aria-pressed', String(state.calm));
  calmToggle && (calmToggle.textContent = state.calm ? 'CALM MODE ON' : 'CALM MODE');

  if (!options.silent) {
    try {
      localStorage.setItem(STORAGE_KEYS.calm, String(state.calm));
    } catch {
      // ignore storage errors
    }
  }

  if (state.calm) {
    bgAudio?.pause();
  } else if (!state.muted) {
    bgAudio?.play().catch(() => {});
  }
}

function initCalmMode() {
  calmToggle?.addEventListener('click', () => {
    applyCalmMode(!state.calm);
  });
}

function applyMute(enabled, options = {}) {
  state.muted = Boolean(enabled);
  muteToggle?.setAttribute('aria-pressed', String(state.muted));
  muteToggle && (muteToggle.textContent = state.muted ? 'MUTED' : 'MUTE');

  if (!options.silent) {
    try {
      localStorage.setItem(STORAGE_KEYS.mute, String(state.muted));
    } catch {
      // ignore storage failures
    }
  }

  if (!bgAudio) return;

  bgAudio.muted = state.muted || state.calm;

  if (state.muted || state.calm) {
    bgAudio.pause();
  } else {
    bgAudio.play().catch(() => {});
  }
}

function initMute() {
  muteToggle?.addEventListener('click', () => {
    applyMute(!state.muted);
  });
}

function initCursorTrail() {
  if (!cursorTrailContainer) return;

  document.addEventListener('pointermove', (event) => {
    if (state.calm) return;
    const particle = document.createElement('img');
    particle.src = 'assets/cursor-trail.gif';
    particle.alt = '';
    particle.setAttribute('aria-hidden', 'true');
    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;
    cursorTrailContainer.appendChild(particle);

    if (cursorTrailContainer.childElementCount > 32) {
      cursorTrailContainer.firstElementChild?.remove();
    }

    setTimeout(() => particle.remove(), 620);
  }, { passive: true });
}

function initGuestbook() {
  if (!guestbookForm || !guestbookList) return;

  const entries = loadGuestbookEntries();
  renderGuestbook(entries);

  guestbookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nickname = guestbookForm.nickname.value.trim() || 'Anónimo';
    const message = guestbookForm.message.value.trim();
    if (!message) return;

    const entry = {
      nickname,
      message,
      timestamp: new Date().toISOString()
    };
    entries.push(entry);
    saveGuestbookEntries(entries);
    renderGuestbook(entries);
    guestbookForm.reset();
  });

  purgeButton?.addEventListener('click', () => {
    const confirmation = confirm('⚠️ ¿Desatas la PURGA TOTAL del guestbook? ¡No hay marcha atrás!');
    if (!confirmation) return;
    entries.length = 0;
    saveGuestbookEntries(entries);
    renderGuestbook(entries);
  });
}

function loadGuestbookEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.guestbook);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveGuestbookEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEYS.guestbook, JSON.stringify(entries));
  } catch {
    // ignore
  }
}

function renderGuestbook(entries) {
  guestbookList.innerHTML = '';
  if (!entries.length) {
    const li = document.createElement('li');
    li.textContent = 'Sé la primera entidad en dejar huella luminosa.';
    guestbookList.appendChild(li);
    return;
  }

  const formatter = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  });

  entries.forEach((entry) => {
    const li = document.createElement('li');

    const header = document.createElement('div');
    header.className = 'entry-header';
    header.textContent = `${entry.nickname} // ${formatter.format(new Date(entry.timestamp))}`;

    const message = document.createElement('p');
    message.textContent = entry.message;

    li.appendChild(header);
    li.appendChild(message);
    guestbookList.appendChild(li);
  });

  guestbookList.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function initHitCounter() {
  if (!hitCounterEl) return;
  let count = Number.parseInt(localStorage.getItem(STORAGE_KEYS.hitCount) || '', 10);
  if (Number.isNaN(count)) {
    count = Math.floor(Math.random() * 40000) + 13333;
  } else {
    count += Math.floor(Math.random() * 999) + 42;
  }
  try {
    localStorage.setItem(STORAGE_KEYS.hitCount, String(count));
  } catch {
    // ignore
  }
  renderHitCounter(count);
}

function renderHitCounter(value) {
  const digits = String(value).padStart(7, '0').split('');
  hitCounterEl.innerHTML = '';
  digits.forEach((digit) => {
    const span = document.createElement('span');
    span.textContent = digit;
    span.className = 'counter-digit';
    hitCounterEl.appendChild(span);
  });
}

function initMonitor() {
  if (!monitorReadout) return;
  const metrics = [
    { label: 'CPU', suffix: '%', min: 340, max: 999 },
    { label: 'GPU', suffix: '°K', min: 420, max: 888 },
    { label: 'LATENCIA', suffix: 'ms', min: 1, max: 66 },
    { label: 'FLUX', suffix: 'Φ', min: 3, max: 9999 }
  ];

  const render = () => {
    monitorReadout.innerHTML = '';
    metrics.forEach((metric) => {
      const row = document.createElement('div');
      row.className = 'monitor-line';
      const label = document.createElement('span');
      label.textContent = metric.label;
      const value = document.createElement('strong');
      value.textContent = `${randomInt(metric.min, metric.max)}${metric.suffix}`;
      row.append(label, value);
      monitorReadout.append(row);
    });
  };

  render();
  state.monitorTimer = window.setInterval(() => {
    if (state.calm) return;
    render();
  }, 900);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function initContactSounds() {
  const sonicTargets = document.querySelectorAll('[data-sound]');
  if (!sonicTargets.length) return;

  sonicTargets.forEach((element) => {
    element.addEventListener('pointerenter', () => {
      playZapSound(element.dataset.sound);
    });
  });
}

function playZapSound(type = 'ping') {
  if (state.calm || state.muted) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  if (!state.audioContext) {
    state.audioContext = new AudioContext();
  }
  if (state.audioContext.state === 'suspended') {
    state.audioContext.resume().catch(() => {});
  }

  const ctx = state.audioContext;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  if (type === 'zap') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18);
  } else {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(990, ctx.currentTime + 0.12);
  }

  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);

  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}

function initPrefersReducedMotionWatcher() {
  if (prefersReducedMotion.matches) {
    applyCalmMode(true);
  }
  prefersReducedMotion.addEventListener('change', (event) => {
    if (event.matches) {
      applyCalmMode(true);
    }
  });
}

init();
