/**
 * FITPLAN PRO - Logica Applicativa
 * Gestione dello stato, editor reattivo, database esercizi, anteprima smartphone e PDF.
 */

// Stato dell'applicazione
const AppState = {
  activeDayIndex: 0,
  workout: null,
  profile: {
    name: 'Coach Marco Rossi',
    title: 'Personal Trainer & Fitness Coach',
    phone: '+39 340 1234567',
    instagram: '@coach_marco',
    logo: ''
  },
  customTemplates: [],
  selectedCategory: 'Tutti'
};

// ==========================================================================
// INIZIALIZZAZIONE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  loadCustomTemplates();
  initWorkoutData();
  initEventListeners();
  renderDaysNav();
  renderDaysPanels();
  renderCatalogFilters();
  renderCatalogList();
  updateLivePreview();
});

// ==========================================================================
// GESTIONE PROFILO PERSONAL TRAINER
// ==========================================================================
function loadProfile() {
  const saved = localStorage.getItem('fitplan_pt_profile');
  if (saved) {
    try {
      AppState.profile = { ...AppState.profile, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Errore nel caricamento del profilo', e);
    }
  }
  updateProfileDisplay();
}

function saveProfile(newProfile) {
  AppState.profile = { ...AppState.profile, ...newProfile };
  localStorage.setItem('fitplan_pt_profile', JSON.stringify(AppState.profile));
  updateProfileDisplay();
  updateLivePreview();
  showToast('Profilo trainer salvato con successo!');
}

function updateProfileDisplay() {
  const nameEl = document.getElementById('displayPtName');
  const titleEl = document.getElementById('displayPtTitle');
  const contactsEl = document.getElementById('displayPtContacts');
  const avatarEl = document.getElementById('ptAvatarPreview');

  if (nameEl) nameEl.textContent = AppState.profile.name || 'Personal Trainer';
  if (titleEl) titleEl.textContent = AppState.profile.title || 'Fitness Coach';
  
  const contacts = [];
  if (AppState.profile.phone) contacts.push(`📱 ${AppState.profile.phone}`);
  if (AppState.profile.instagram) contacts.push(`${AppState.profile.instagram}`);
  if (contactsEl) contactsEl.textContent = contacts.join(' | ');

  if (avatarEl) {
    if (AppState.profile.logo) {
      avatarEl.innerHTML = `<img src="${AppState.profile.logo}" alt="Logo PT">`;
    } else {
      const initials = (AppState.profile.name || 'PT')
        .split(' ')
        .map(w => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
      avatarEl.textContent = initials || 'PT';
    }
  }
}

// ==========================================================================
// GESTIONE DATI SCHEDA (WORKOUT)
// ==========================================================================
function initWorkoutData() {
  // Prova a recuperare la bozza salvata
  const savedWorkout = localStorage.getItem('fitplan_current_workout');
  if (savedWorkout) {
    try {
      AppState.workout = JSON.parse(savedWorkout);
    } catch (e) {
      console.error('Errore ripristino scheda', e);
    }
  }

  // Se non c'è una scheda salvata, carica il template di default PPL
  if (!AppState.workout || !AppState.workout.days || AppState.workout.days.length === 0) {
    const defaultTpl = DEFAULT_TEMPLATES[0];
    AppState.workout = {
      clientName: 'Mario Rossi',
      goal: defaultTpl.goal || 'Ipertrofia / Massa',
      date: new Date().toISOString().split('T')[0],
      duration: defaultTpl.duration || '6 Settimane',
      notes: defaultTpl.notes || '',
      days: JSON.parse(JSON.stringify(defaultTpl.days))
    };
  }

  // Sincronizza i campi input dell'header scheda
  document.getElementById('clientName').value = AppState.workout.clientName || '';
  document.getElementById('workoutGoal').value = AppState.workout.goal || '';
  document.getElementById('workoutDate').value = AppState.workout.date || new Date().toISOString().split('T')[0];
  document.getElementById('workoutDuration').value = AppState.workout.duration || '';
  document.getElementById('workoutNotes').value = AppState.workout.notes || '';
}

function saveCurrentWorkoutToStorage() {
  localStorage.setItem('fitplan_current_workout', JSON.stringify(AppState.workout));
}

// ==========================================================================
// RENDER DEI GIORNI E PANNELLI
// ==========================================================================
function renderDaysNav() {
  const nav = document.getElementById('daysNav');
  if (!nav) return;

  nav.innerHTML = '';
  AppState.workout.days.forEach((day, index) => {
    const btn = document.createElement('button');
    btn.className = `day-tab ${index === AppState.activeDayIndex ? 'active' : ''}`;
    
    // Titolo sintetico per la tab
    const shortTitle = day.title || `Giorno ${index + 1}`;
    btn.innerHTML = `<span>${escapeHtml(shortTitle)}</span>`;
    btn.addEventListener('click', () => {
      AppState.activeDayIndex = index;
      renderDaysNav();
      renderDaysPanels();
    });
    nav.appendChild(btn);
  });
}

function renderDaysPanels() {
  const container = document.getElementById('daysContainer');
  if (!container) return;

  container.innerHTML = '';

  AppState.workout.days.forEach((day, dayIndex) => {
    const panel = document.createElement('div');
    panel.className = `day-panel ${dayIndex === AppState.activeDayIndex ? 'active' : ''}`;
    panel.dataset.dayIndex = dayIndex;

    // Header del giorno (Modifica Titolo, Focus e Azioni)
    const headerEdit = document.createElement('div');
    headerEdit.className = 'day-header-edit';
    headerEdit.innerHTML = `
      <input type="text" class="day-title-input" value="${escapeHtml(day.title || '')}" placeholder="Nome Giorno (es. Giorno A - Spinta)" data-day-index="${dayIndex}">
      <input type="text" class="form-input" style="width: 170px;" value="${escapeHtml(day.focus || '')}" placeholder="Focus (es. Petto & Tricipiti)" data-day-focus-index="${dayIndex}">
      <div style="display: flex; gap: 0.35rem; margin-left: auto;">
        <button class="btn btn-secondary btn-sm btn-duplicate-day" data-day-index="${dayIndex}" title="Duplica questo giorno">📋 Duplica</button>
        <button class="btn btn-danger-outline btn-sm btn-delete-day" data-day-index="${dayIndex}" title="Elimina questo giorno">🗑️ Elimina</button>
      </div>
    `;

    // Lista esercizi
    const exList = document.createElement('div');
    exList.className = 'exercise-list';
    exList.id = `exerciseList_${dayIndex}`;

    if (day.exercises && day.exercises.length > 0) {
      day.exercises.forEach((ex, exIndex) => {
        exList.appendChild(createExerciseCard(ex, dayIndex, exIndex));
      });
    } else {
      exList.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md);">
          Nessun esercizio in questo giorno. Usa i pulsanti sottostanti per aggiungerne uno!
        </div>
      `;
    }

    // Barra rapida per aggiungere esercizi
    const quickAddBar = document.createElement('div');
    quickAddBar.className = 'quick-add-bar';
    quickAddBar.innerHTML = `
      <button class="btn btn-primary btn-sm btn-add-empty-ex" data-day-index="${dayIndex}">
        ➕ Aggiungi Esercizio
      </button>
      <button class="btn btn-accent btn-sm btn-open-library" data-day-index="${dayIndex}">
        📚 Scegli da Libreria Esercizi
      </button>
    `;

    panel.appendChild(headerEdit);
    panel.appendChild(exList);
    panel.appendChild(quickAddBar);
    container.appendChild(panel);
  });

  attachDayEventListeners();
}

// Crea una singola card di esercizio nell'editor
function createExerciseCard(ex, dayIndex, exIndex) {
  const card = document.createElement('div');
  card.className = 'exercise-card';
  card.dataset.dayIndex = dayIndex;
  card.dataset.exIndex = exIndex;

  card.innerHTML = `
    <div class="exercise-top-row">
      <span class="exercise-index">${exIndex + 1}</span>
      <div class="exercise-name-wrapper">
        <input type="text" class="form-input exercise-name-input" value="${escapeHtml(ex.name || '')}" placeholder="Nome esercizio (inizia a digitare per suggerimenti)" autocomplete="off">
        <div class="autocomplete-dropdown"></div>
      </div>
      <span class="muscle-badge">${escapeHtml(ex.category || 'Generale')}</span>
      <div class="exercise-actions">
        <button class="btn btn-secondary btn-sm btn-icon btn-move-up" title="Sposta su" ${exIndex === 0 ? 'disabled' : ''}>▲</button>
        <button class="btn btn-secondary btn-sm btn-icon btn-move-down" title="Sposta giù" ${exIndex === AppState.workout.days[dayIndex].exercises.length - 1 ? 'disabled' : ''}>▼</button>
        <button class="btn btn-secondary btn-sm btn-icon btn-duplicate-ex" title="Duplica esercizio">📋</button>
        <button class="btn btn-danger-outline btn-sm btn-icon btn-delete-ex" title="Elimina esercizio">🗑️</button>
      </div>
    </div>

    <div class="exercise-fields-grid">
      <div class="field-cell">
        <label>Serie</label>
        <input type="text" class="form-input ex-sets" value="${escapeHtml(ex.sets || '3')}" placeholder="Es. 4">
        <div class="quick-chips">
          <button type="button" class="chip-btn" data-field="sets" data-val="3">3</button>
          <button type="button" class="chip-btn" data-field="sets" data-val="4">4</button>
          <button type="button" class="chip-btn" data-field="sets" data-val="5">5</button>
        </div>
      </div>

      <div class="field-cell">
        <label>Ripetizioni</label>
        <input type="text" class="form-input ex-reps" value="${escapeHtml(ex.reps || '10')}" placeholder="Es. 8-10">
        <div class="quick-chips">
          <button type="button" class="chip-btn" data-field="reps" data-val="6-8">6-8</button>
          <button type="button" class="chip-btn" data-field="reps" data-val="8-10">8-10</button>
          <button type="button" class="chip-btn" data-field="reps" data-val="10-12">10-12</button>
          <button type="button" class="chip-btn" data-field="reps" data-val="12-15">12-15</button>
        </div>
      </div>

      <div class="field-cell">
        <label>Recupero</label>
        <input type="text" class="form-input ex-rest" value="${escapeHtml(ex.rest || '90\"')}" placeholder="Es. 90\"">
        <div class="quick-chips">
          <button type="button" class="chip-btn" data-field="rest" data-val="60\"">60"</button>
          <button type="button" class="chip-btn" data-field="rest" data-val="90\"">90"</button>
          <button type="button" class="chip-btn" data-field="rest" data-val="120\"">2'</button>
        </div>
      </div>

      <div class="field-cell exercise-notes-col">
        <label>Note Tecniche / RPE / Carico</label>
        <input type="text" class="form-input ex-notes" value="${escapeHtml(ex.notes || '')}" placeholder="Es. RPE 8, fermo 1 secondo al petto, ecc.">
      </div>
    </div>

    <div class="exercise-extra-row">
      <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">🔗 Link Video:</span>
      <input type="url" class="form-input video-link-input ex-video" value="${escapeHtml(ex.video || '')}" placeholder="https://youtube.com/... (opzionale)">
      ${ex.video ? `<a href="${escapeHtml(ex.video)}" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">▶ Prova</a>` : ''}
    </div>
  `;

  attachExerciseCardEvents(card, dayIndex, exIndex);
  return card;
}

// ==========================================================================
// EVENT LISTENERS DEGLI ESERCIZI & AUTOCOMPLETE
// ==========================================================================
function attachExerciseCardEvents(card, dayIndex, exIndex) {
  const currentEx = AppState.workout.days[dayIndex].exercises[exIndex];
  const nameInput = card.querySelector('.exercise-name-input');
  const dropdown = card.querySelector('.autocomplete-dropdown');

  // Autocomplete intelligente
  nameInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    currentEx.name = e.target.value;
    updateLivePreview();
    saveCurrentWorkoutToStorage();

    if (query.length < 2) {
      dropdown.style.display = 'none';
      return;
    }

    const matches = EXERCISES_DATABASE.filter(ex => 
      ex.name.toLowerCase().includes(query) || ex.category.toLowerCase().includes(query)
    ).slice(0, 6);

    if (matches.length === 0) {
      dropdown.style.display = 'none';
      return;
    }

    dropdown.innerHTML = '';
    matches.forEach(m => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.innerHTML = `
        <strong>${escapeHtml(m.name)}</strong>
        <span class="muscle-badge" style="font-size: 0.6rem;">${escapeHtml(m.category)}</span>
      `;
      item.addEventListener('click', () => {
        currentEx.name = m.name;
        currentEx.category = m.category;
        if (!currentEx.sets || currentEx.sets === '3') currentEx.sets = m.sets;
        if (!currentEx.reps || currentEx.reps === '10') currentEx.reps = m.reps;
        if (!currentEx.rest || currentEx.rest === '90"') currentEx.rest = m.rest;
        if (!currentEx.notes) currentEx.notes = m.notes;
        if (!currentEx.video) currentEx.video = `https://www.youtube.com/results?search_query=${encodeURIComponent(m.name + ' tutorial esecuzione')}`;

        dropdown.style.display = 'none';
        renderDaysPanels();
        updateLivePreview();
        saveCurrentWorkoutToStorage();
      });
      dropdown.appendChild(item);
    });

    dropdown.style.display = 'block';
  });

  // Chiudi dropdown al click fuori
  document.addEventListener('click', (e) => {
    if (!card.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  // Aggiornamento campi con debounce
  const setsInput = card.querySelector('.ex-sets');
  const repsInput = card.querySelector('.ex-reps');
  const restInput = card.querySelector('.ex-rest');
  const notesInput = card.querySelector('.ex-notes');
  const videoInput = card.querySelector('.ex-video');

  const bindInput = (el, field) => {
    el.addEventListener('input', (e) => {
      currentEx[field] = e.target.value;
      updateLivePreview();
      saveCurrentWorkoutToStorage();
    });
  };

  bindInput(setsInput, 'sets');
  bindInput(repsInput, 'reps');
  bindInput(restInput, 'rest');
  bindInput(notesInput, 'notes');
  bindInput(videoInput, 'video');

  // Quick Chips per Serie/Reps/Rest
  card.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      const field = chip.dataset.field;
      const val = chip.dataset.val;
      currentEx[field] = val;
      if (field === 'sets') setsInput.value = val;
      if (field === 'reps') repsInput.value = val;
      if (field === 'rest') restInput.value = val;
      updateLivePreview();
      saveCurrentWorkoutToStorage();
    });
  });

  // Sposta Su
  const btnUp = card.querySelector('.btn-move-up');
  if (btnUp) {
    btnUp.addEventListener('click', () => {
      if (exIndex > 0) {
        const list = AppState.workout.days[dayIndex].exercises;
        const temp = list[exIndex];
        list[exIndex] = list[exIndex - 1];
        list[exIndex - 1] = temp;
        renderDaysPanels();
        updateLivePreview();
        saveCurrentWorkoutToStorage();
      }
    });
  }

  // Sposta Giù
  const btnDown = card.querySelector('.btn-move-down');
  if (btnDown) {
    btnDown.addEventListener('click', () => {
      const list = AppState.workout.days[dayIndex].exercises;
      if (exIndex < list.length - 1) {
        const temp = list[exIndex];
        list[exIndex] = list[exIndex + 1];
        list[exIndex + 1] = temp;
        renderDaysPanels();
        updateLivePreview();
        saveCurrentWorkoutToStorage();
      }
    });
  }

  // Duplica Esercizio
  const btnDup = card.querySelector('.btn-duplicate-ex');
  if (btnDup) {
    btnDup.addEventListener('click', () => {
      const cloned = JSON.parse(JSON.stringify(currentEx));
      AppState.workout.days[dayIndex].exercises.splice(exIndex + 1, 0, cloned);
      renderDaysPanels();
      updateLivePreview();
      saveCurrentWorkoutToStorage();
      showToast('Esercizio duplicato!');
    });
  }

  // Elimina Esercizio
  const btnDel = card.querySelector('.btn-delete-ex');
  if (btnDel) {
    btnDel.addEventListener('click', () => {
      AppState.workout.days[dayIndex].exercises.splice(exIndex, 1);
      renderDaysPanels();
      updateLivePreview();
      saveCurrentWorkoutToStorage();
    });
  }
}

// ==========================================================================
// EVENT LISTENERS DEI GIORNI
// ==========================================================================
function attachDayEventListeners() {
  // Input Titolo Giorno
  document.querySelectorAll('.day-title-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.dayIndex, 10);
      AppState.workout.days[idx].title = e.target.value;
      renderDaysNav();
      updateLivePreview();
      saveCurrentWorkoutToStorage();
    });
  });

  // Input Focus Giorno
  document.querySelectorAll('[data-day-focus-index]').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.dayFocusIndex, 10);
      AppState.workout.days[idx].focus = e.target.value;
      updateLivePreview();
      saveCurrentWorkoutToStorage();
    });
  });

  // Aggiungi Esercizio Vuoto
  document.querySelectorAll('.btn-add-empty-ex').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.dayIndex, 10);
      AppState.workout.days[idx].exercises.push({
        name: '',
        category: 'Generale',
        sets: '3',
        reps: '10',
        rest: '90"',
        notes: '',
        video: ''
      });
      renderDaysPanels();
      updateLivePreview();
      saveCurrentWorkoutToStorage();
    });
  });

  // Apri Libreria Esercizi
  document.querySelectorAll('.btn-open-library').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.dayIndex, 10);
      AppState.activeDayIndex = idx;
      openModal('modalExercises');
    });
  });

  // Duplica Giorno
  document.querySelectorAll('.btn-duplicate-day').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.dayIndex, 10);
      const dayClone = JSON.parse(JSON.stringify(AppState.workout.days[idx]));
      dayClone.title = `${dayClone.title} (Copia)`;
      AppState.workout.days.splice(idx + 1, 0, dayClone);
      AppState.activeDayIndex = idx + 1;
      renderDaysNav();
      renderDaysPanels();
      updateLivePreview();
      saveCurrentWorkoutToStorage();
      showToast('Giorno duplicato con successo!');
    });
  });

  // Elimina Giorno
  document.querySelectorAll('.btn-delete-day').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.dayIndex, 10);
      if (AppState.workout.days.length <= 1) {
        alert('La scheda deve contenere almeno un giorno di allenamento.');
        return;
      }
      if (confirm(`Sei sicuro di voler eliminare "${AppState.workout.days[idx].title || 'questo giorno'}"?`)) {
        AppState.workout.days.splice(idx, 1);
        if (AppState.activeDayIndex >= AppState.workout.days.length) {
          AppState.activeDayIndex = AppState.workout.days.length - 1;
        }
        renderDaysNav();
        renderDaysPanels();
        updateLivePreview();
        saveCurrentWorkoutToStorage();
        showToast('Giorno rimosso.');
      }
    });
  });
}

// ==========================================================================
// RENDER ANTEPRIMA SMARTPHONE (TEMPO REALE)
// ==========================================================================
function updateLivePreview() {
  const container = document.getElementById('printableWorkoutArea');
  if (!container) return;

  const w = AppState.workout;
  const p = AppState.profile;

  let daysHtml = '';
  if (w.days && w.days.length > 0) {
    w.days.forEach((day, dIdx) => {
      let rowsHtml = '';
      if (day.exercises && day.exercises.length > 0) {
        day.exercises.forEach((ex, eIdx) => {
          const videoBtn = ex.video 
            ? `<a href="${escapeHtml(ex.video)}" target="_blank" class="sheet-video-btn">▶ Guarda Video</a>`
            : '';

          rowsHtml += `
            <tr>
              <td>
                <div class="sheet-ex-name">
                  <span>${eIdx + 1}. ${escapeHtml(ex.name || 'Esercizio')}</span>
                  ${ex.category ? `<span class="sheet-ex-tag">${escapeHtml(ex.category)}</span>` : ''}
                </div>
                ${ex.notes ? `<div class="sheet-ex-notes">${escapeHtml(ex.notes)}</div>` : ''}
                ${videoBtn}
              </td>
              <td style="text-align: center; font-weight: 800; font-size: 0.85rem; color: #0f172a; white-space: nowrap;">
                ${escapeHtml(ex.sets || '3')} × ${escapeHtml(ex.reps || '10')}
              </td>
              <td style="text-align: center; font-weight: 700; color: #059669; white-space: nowrap;">
                ${escapeHtml(ex.rest || '90"')}
              </td>
            </tr>
          `;
        });
      } else {
        rowsHtml = `<tr><td colspan="3" style="text-align: center; color: #94a3b8; padding: 1rem;">Nessun esercizio inserito</td></tr>`;
      }

      daysHtml += `
        <div class="sheet-day-block">
          <div class="sheet-day-title">
            <span>${escapeHtml(day.title || `Giorno ${dIdx + 1}`)}</span>
            ${day.focus ? `<span class="sheet-day-badge">${escapeHtml(day.focus)}</span>` : ''}
          </div>
          <table class="sheet-exercise-table">
            <thead>
              <tr>
                <th style="width: 58%;">Esercizio & Note</th>
                <th style="width: 24%; text-align: center;">Serie × Reps</th>
                <th style="width: 18%; text-align: center;">Recupero</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;
    });
  }

  // Costruzione della grafica ad alta definizione per telefono e stampa
  container.innerHTML = `
    <div class="sheet-render">
      <!-- Intestazione Brand Personal Trainer -->
      <div class="sheet-header-top">
        <div class="sheet-pt-brand">
          <div class="sheet-pt-avatar">
            ${p.logo ? `<img src="${p.logo}" alt="Logo">` : (p.name ? p.name.charAt(0) : 'PT')}
          </div>
          <div>
            <div class="sheet-pt-title">${escapeHtml(p.name || 'Personal Trainer')}</div>
            <div class="sheet-pt-sub">${escapeHtml(p.title || 'Fitness & Conditioning')}</div>
          </div>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.65rem; font-weight: 800; background: #0f172a; color: #ffffff; padding: 0.15rem 0.5rem; border-radius: 4px; text-transform: uppercase;">
            Scheda Ufficiale
          </span>
        </div>
      </div>

      <!-- Scheda Dati Atleta -->
      <div class="sheet-client-card">
        <div class="sheet-meta-item">Atleta: <strong>${escapeHtml(w.clientName || 'Mario Rossi')}</strong></div>
        <div class="sheet-meta-item">Obiettivo: <strong>${escapeHtml(w.goal || 'Ipertrofia')}</strong></div>
        <div class="sheet-meta-item">Data Inizio: <strong>${formatDate(w.date)}</strong></div>
        <div class="sheet-meta-item">Durata: <strong>${escapeHtml(w.duration || '6 Settimane')}</strong></div>
      </div>

      <!-- Note del Coach -->
      ${w.notes ? `
        <div class="sheet-notes-box">
          <strong>💡 Indicazioni del Coach:</strong> ${escapeHtml(w.notes)}
        </div>
      ` : ''}

      <!-- Blocchi Giorni -->
      ${daysHtml}

      <!-- Footer Contatti Trainer -->
      <div class="sheet-footer">
        <div>Programma redatto da <strong>${escapeHtml(p.name || 'Il tuo Personal Trainer')}</strong></div>
        <div class="sheet-contact-pills">
          ${p.phone ? `<span class="sheet-contact-pill">WhatsApp: ${escapeHtml(p.phone)}</span>` : ''}
          ${p.instagram ? `<span class="sheet-contact-pill">Instagram: ${escapeHtml(p.instagram)}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// CATALOGO ESERCIZI (MODAL)
// ==========================================================================
function renderCatalogFilters() {
  const container = document.getElementById('catalogFilters');
  if (!container) return;

  container.innerHTML = '';
  EXERCISE_CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `catalog-category-btn ${cat === AppState.selectedCategory ? 'active' : ''}`;
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      AppState.selectedCategory = cat;
      renderCatalogFilters();
      renderCatalogList();
    });
    container.appendChild(btn);
  });
}

function renderCatalogList() {
  const container = document.getElementById('catalogList');
  const searchInput = document.getElementById('exerciseSearchInput');
  if (!container) return;

  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  
  const filtered = EXERCISES_DATABASE.filter(ex => {
    const matchesCat = AppState.selectedCategory === 'Tutti' || ex.category === AppState.selectedCategory;
    const matchesQuery = !query || ex.name.toLowerCase().includes(query) || ex.category.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  container.innerHTML = '';
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 2rem;">
        Nessun esercizio trovato per i criteri selezionati.
      </div>
    `;
    return;
  }

  filtered.forEach(ex => {
    const item = document.createElement('div');
    item.className = 'catalog-item';
    item.innerHTML = `
      <div class="catalog-item-info">
        <h4>${escapeHtml(ex.name)}</h4>
        <p>${escapeHtml(ex.category)} • Consigliato: ${ex.sets} serie × ${ex.reps} (Rec. ${ex.rest})</p>
      </div>
      <button class="btn btn-primary btn-sm">➕ Aggiungi</button>
    `;

    item.addEventListener('click', () => {
      addExerciseToActiveDay(ex);
      showToast(`Aggiunto: ${ex.name}`);
    });

    container.appendChild(item);
  });
}

function addExerciseToActiveDay(templateEx) {
  const targetDay = AppState.workout.days[AppState.activeDayIndex];
  if (!targetDay) return;

  targetDay.exercises.push({
    name: templateEx.name,
    category: templateEx.category,
    sets: templateEx.sets || '3',
    reps: templateEx.reps || '10',
    rest: templateEx.rest || '90"',
    notes: templateEx.notes || '',
    video: `https://www.youtube.com/results?search_query=${encodeURIComponent(templateEx.name + ' tutorial esecuzione')}`
  });

  renderDaysPanels();
  updateLivePreview();
  saveCurrentWorkoutToStorage();
}

// ==========================================================================
// GESTIONE TEMPLATES PREDEFINITI & CUSTOM
// ==========================================================================
function loadCustomTemplates() {
  const saved = localStorage.getItem('fitplan_custom_templates');
  if (saved) {
    try {
      AppState.customTemplates = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
}

function renderTemplatesModal() {
  const container = document.getElementById('templatesList');
  if (!container) return;

  container.innerHTML = '';

  // Template preimpostati
  const defaultHeader = document.createElement('h4');
  defaultHeader.style.color = 'var(--accent-primary)';
  defaultHeader.style.fontSize = '0.85rem';
  defaultHeader.textContent = '⚡ TEMPLATE PROFESSIONALI PREDEFINITI';
  container.appendChild(defaultHeader);

  DEFAULT_TEMPLATES.forEach(tpl => {
    const card = document.createElement('div');
    card.className = 'catalog-item';
    card.innerHTML = `
      <div class="catalog-item-info">
        <h4>${escapeHtml(tpl.title)}</h4>
        <p>${escapeHtml(tpl.description)} (${tpl.days.length} Giorni)</p>
      </div>
      <button class="btn btn-secondary btn-sm">Carica</button>
    `;
    card.querySelector('button').addEventListener('click', () => {
      if (confirm(`Caricare il template "${tpl.title}"? Sostituirà la scheda corrente.`)) {
        loadTemplateIntoWorkout(tpl);
        closeModal('modalTemplates');
        showToast(`Template "${tpl.title}" caricato!`);
      }
    });
    container.appendChild(card);
  });

  // Template salvati dall'utente
  if (AppState.customTemplates.length > 0) {
    const customHeader = document.createElement('h4');
    customHeader.style.color = '#38bdf8';
    customHeader.style.fontSize = '0.85rem';
    customHeader.style.marginTop = '1rem';
    customHeader.textContent = '💾 I TUOI TEMPLATE SALVATI';
    container.appendChild(customHeader);

    AppState.customTemplates.forEach((tpl, idx) => {
      const card = document.createElement('div');
      card.className = 'catalog-item';
      card.innerHTML = `
        <div class="catalog-item-info">
          <h4>${escapeHtml(tpl.title)}</h4>
          <p>${escapeHtml(tpl.goal)} • ${tpl.days.length} Giorni</p>
        </div>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn btn-secondary btn-sm btn-load-custom">Carica</button>
          <button class="btn btn-danger-outline btn-sm btn-del-custom">🗑️</button>
        </div>
      `;

      card.querySelector('.btn-load-custom').addEventListener('click', () => {
        if (confirm(`Caricare il tuo template "${tpl.title}"?`)) {
          loadTemplateIntoWorkout(tpl);
          closeModal('modalTemplates');
          showToast(`Template "${tpl.title}" caricato!`);
        }
      });

      card.querySelector('.btn-del-custom').addEventListener('click', () => {
        if (confirm(`Eliminare definitivamente il template "${tpl.title}"?`)) {
          AppState.customTemplates.splice(idx, 1);
          localStorage.setItem('fitplan_custom_templates', JSON.stringify(AppState.customTemplates));
          renderTemplatesModal();
          showToast('Template eliminato.');
        }
      });

      container.appendChild(card);
    });
  }
}

function loadTemplateIntoWorkout(tpl) {
  AppState.workout = {
    clientName: document.getElementById('clientName').value || 'Mario Rossi',
    goal: tpl.goal || 'Ipertrofia',
    date: new Date().toISOString().split('T')[0],
    duration: tpl.duration || '6 Settimane',
    notes: tpl.notes || '',
    days: JSON.parse(JSON.stringify(tpl.days))
  };

  document.getElementById('workoutGoal').value = AppState.workout.goal;
  document.getElementById('workoutDuration').value = AppState.workout.duration;
  document.getElementById('workoutNotes').value = AppState.workout.notes;

  AppState.activeDayIndex = 0;
  renderDaysNav();
  renderDaysPanels();
  updateLivePreview();
  saveCurrentWorkoutToStorage();
}

function saveCurrentAsTemplate() {
  const name = prompt('Inserisci un nome per questo template:', `${AppState.workout.goal} (${AppState.workout.days.length} Giorni)`);
  if (!name) return;

  const newTpl = {
    id: 'custom-' + Date.now(),
    title: name,
    goal: AppState.workout.goal,
    duration: AppState.workout.duration,
    notes: AppState.workout.notes,
    days: JSON.parse(JSON.stringify(AppState.workout.days))
  };

  AppState.customTemplates.push(newTpl);
  localStorage.setItem('fitplan_custom_templates', JSON.stringify(AppState.customTemplates));
  showToast('Scheda salvata nei tuoi template!');
}

// ==========================================================================
// ESPORTAZIONE PDF OTTIMIZZATO PER SMARTPHONE (TUTTI I GIORNI)
// ==========================================================================
async function exportWorkoutPDF(mode = 'per-day') {
  const original = document.querySelector('.sheet-render');
  if (!original) {
    showToast('Nessuna scheda da esportare!');
    return;
  }

  const clientName = (AppState.workout.clientName || 'Cliente').replace(/\s+/g, '_');
  const dateStr = AppState.workout.date || new Date().toISOString().split('T')[0];
  const filename = mode === 'continuous'
    ? `Scheda_Mobile_${clientName}_${dateStr}.pdf`
    : `Scheda_${clientName}_${dateStr}.pdf`;

  showToast('Generazione PDF in corso (tutti i giorni inclusi)...');

  // Verifica preferenza utente "1 Giorno per Pagina"
  const chkPagePerDay = document.getElementById('chkPagePerDay');
  const pagePerDay = chkPagePerDay ? chkPagePerDay.checked : true;

  // Wrapper di esportazione completamente svincolato da altezze fisse e scrollbar
  const exportWrapper = document.createElement('div');
  exportWrapper.id = 'pdfExportWrapper';
  exportWrapper.style.position = 'fixed';
  exportWrapper.style.left = '-9999px';
  exportWrapper.style.top = '0';
  exportWrapper.style.width = '780px';
  exportWrapper.style.background = '#ffffff';
  exportWrapper.style.color = '#0f172a';
  exportWrapper.style.padding = '16px 20px';
  exportWrapper.style.boxSizing = 'border-box';
  exportWrapper.style.zIndex = '-99999';

  // Clona l'intero contenuto della scheda
  const clone = original.cloneNode(true);

  if (mode !== 'continuous' && pagePerDay) {
    // Inizia ogni giorno su una pagina pulita
    const dayBlocks = clone.querySelectorAll('.sheet-day-block');
    dayBlocks.forEach((block, idx) => {
      if (idx > 0) {
        block.classList.add('html2pdf__page-break');
        block.style.pageBreakBefore = 'always';
        block.style.breakBefore = 'page';
        block.style.marginTop = '24px';

        // Intestazione in cima alla pagina successiva per dare contesto chiaro all'atleta
        const miniHeader = document.createElement('div');
        miniHeader.className = 'sheet-mini-page-header';
        miniHeader.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 6px; margin-bottom: 14px; font-size: 11px; font-weight: 700; color: #475569;">
            <span>🏋️ ${escapeHtml(AppState.profile.name || 'Personal Trainer')} • Scheda per: <strong style="color: #0f172a;">${escapeHtml(AppState.workout.clientName || 'Mario Rossi')}</strong></span>
            <span style="background: #0f172a; color: #ffffff; padding: 2px 6px; border-radius: 4px; font-size: 9px; text-transform: uppercase;">
              ${escapeHtml(AppState.workout.goal || 'Scheda')}
            </span>
          </div>
        `;
        block.insertBefore(miniHeader, block.firstChild);
      }
    });
  }

  exportWrapper.appendChild(clone);
  document.body.appendChild(exportWrapper);

  let opt;
  if (mode === 'continuous') {
    // Modalità striscia continua: calcola l'altezza totale reale del contenuto
    const fullHeightPx = clone.offsetHeight || 1600;
    const heightMm = Math.ceil(fullHeightPx * 0.264583) + 24; // Conversione px -> mm con margine

    opt = {
      margin: [6, 6, 6, 6],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
        windowWidth: 800
      },
      jsPDF: { unit: 'mm', format: [210, Math.max(heightMm, 297)], orientation: 'portrait' }
    };
  } else {
    // Modalità multi-pagina classica A4
    opt = {
      margin: [8, 8, 8, 8],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
        windowWidth: 800
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: {
        mode: ['css', 'legacy'],
        avoid: ['tr', '.sheet-client-card', '.sheet-notes-box', '.sheet-header-top', '.sheet-mini-page-header']
      }
    };
  }

  try {
    if (typeof html2pdf !== 'undefined') {
      await html2pdf().set(opt).from(clone).save();
      showToast('PDF completo scaricato con successo! Tutte le pagine incluse.');
    } else {
      window.print();
    }
  } catch (err) {
    console.error('Errore generazione PDF:', err);
    showToast('Uso della stampa del browser come alternativa...');
    window.print();
  } finally {
    if (exportWrapper && exportWrapper.parentNode) {
      exportWrapper.parentNode.removeChild(exportWrapper);
    }
  }
}

// ==========================================================================
// CONDIVISIONE TESTO WHATSAPP
// ==========================================================================
function copyWorkoutForWhatsApp() {
  const w = AppState.workout;
  const p = AppState.profile;

  let text = `🏋️ *SCHEDA DI ALLENAMENTO*\n`;
  text += `👤 *Atleta:* ${w.clientName || 'Cliente'}\n`;
  text += `🎯 *Obiettivo:* ${w.goal}\n`;
  text += `📅 *Inizio:* ${formatDate(w.date)} | *Durata:* ${w.duration}\n`;
  text += `👨‍🏫 *Coach:* ${p.name} (${p.phone || p.instagram})\n\n`;

  if (w.notes) {
    text += `💡 *Indicazioni:* ${w.notes}\n\n`;
  }

  text += `━━━━━━━━━━━━━━━━━━━━\n`;

  w.days.forEach((day, dIdx) => {
    text += `\n📌 *${day.title || `GIORNO ${dIdx + 1}`}* (${day.focus || ''})\n`;
    day.exercises.forEach((ex, eIdx) => {
      text += `${eIdx + 1}. *${ex.name}* → *${ex.sets}x${ex.reps}* (Rec. ${ex.rest})\n`;
      if (ex.notes) text += `   ↳ _${ex.notes}_\n`;
      if (ex.video) text += `   ↳ 📹 ${ex.video}\n`;
    });
  });

  text += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Buon allenamento! Per qualsiasi dubbio scrivi al Coach! 💪🔥`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('Scheda copiata negli appunti in formato WhatsApp!');
  }).catch(() => {
    showToast('Impossibile copiare automaticamente. Seleziona il testo manualmente.');
  });
}

// ==========================================================================
// GESTIONE MODALI E TOAST
// ==========================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    if (modalId === 'modalTemplates') renderTemplatesModal();
    if (modalId === 'modalExercises') {
      const search = document.getElementById('exerciseSearchInput');
      if (search) {
        search.value = '';
        renderCatalogList();
        setTimeout(() => search.focus(), 100);
      }
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚡</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================================================
// UTILITY HELPERS
// ==========================================================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

// ==========================================================================
// INIZIALIZZAZIONE EVENTI PRINCIPALI
// ==========================================================================
function initEventListeners() {
  // Campi scheda header
  const bindField = (id, prop) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        AppState.workout[prop] = e.target.value;
        updateLivePreview();
        saveCurrentWorkoutToStorage();
      });
    }
  };

  bindField('clientName', 'clientName');
  bindField('workoutGoal', 'goal');
  bindField('workoutDate', 'date');
  bindField('workoutDuration', 'duration');
  bindField('workoutNotes', 'notes');

  // Pulsante Aggiungi Giorno
  const btnAddDay = document.getElementById('btnAddDay');
  if (btnAddDay) {
    btnAddDay.addEventListener('click', () => {
      const nextLetter = String.fromCharCode(65 + AppState.workout.days.length);
      AppState.workout.days.push({
        title: `Giorno ${nextLetter}`,
        focus: 'Focus',
        exercises: []
      });
      AppState.activeDayIndex = AppState.workout.days.length - 1;
      renderDaysNav();
      renderDaysPanels();
      updateLivePreview();
      saveCurrentWorkoutToStorage();
      showToast(`Aggiunto Giorno ${nextLetter}!`);
    });
  }

  // Pulsante Reset Scheda
  const btnReset = document.getElementById('btnResetWorkout');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Vuoi cancellare la scheda attuale e crearne una nuova vuota?')) {
        AppState.workout = {
          clientName: '',
          goal: 'Ipertrofia / Massa',
          date: new Date().toISOString().split('T')[0],
          duration: '6 Settimane',
          notes: 'Riscaldamento: 5 min cardio leggero + mobilità specifica.',
          days: [
            { title: 'Giorno A', focus: 'Spinta', exercises: [] },
            { title: 'Giorno B', focus: 'Trazione', exercises: [] }
          ]
        };
        initWorkoutData();
        AppState.activeDayIndex = 0;
        renderDaysNav();
        renderDaysPanels();
        updateLivePreview();
        saveCurrentWorkoutToStorage();
        showToast('Nuova scheda creata!');
      }
    });
  }

  // Modal Libreria Esercizi
  const btnCloseExModal = document.getElementById('btnCloseExercisesModal');
  const btnCloseExModal2 = document.getElementById('btnCloseExercisesModal2');
  if (btnCloseExModal) btnCloseExModal.addEventListener('click', () => closeModal('modalExercises'));
  if (btnCloseExModal2) btnCloseExModal2.addEventListener('click', () => closeModal('modalExercises'));

  const searchInput = document.getElementById('exerciseSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderCatalogList());
  }

  // Modal Template
  const btnOpenTemplates = document.getElementById('btnOpenTemplates');
  const btnCloseTplModal = document.getElementById('btnCloseTemplatesModal');
  const btnCloseTplModal2 = document.getElementById('btnCloseTemplatesModal2');
  if (btnOpenTemplates) btnOpenTemplates.addEventListener('click', () => openModal('modalTemplates'));
  if (btnCloseTplModal) btnCloseTplModal.addEventListener('click', () => closeModal('modalTemplates'));
  if (btnCloseTplModal2) btnCloseTplModal2.addEventListener('click', () => closeModal('modalTemplates'));

  // Salva come Template
  const btnSaveTemplate = document.getElementById('btnSaveTemplate');
  if (btnSaveTemplate) btnSaveTemplate.addEventListener('click', saveCurrentAsTemplate);

  // Copia WhatsApp
  const btnCopyWhatsApp = document.getElementById('btnCopyWhatsApp');
  if (btnCopyWhatsApp) btnCopyWhatsApp.addEventListener('click', copyWorkoutForWhatsApp);

  // Toggle Anteprima Mobile su schermi larghi
  const btnTogglePreview = document.getElementById('btnTogglePreview');
  const mainContainer = document.getElementById('mainContainer');
  if (btnTogglePreview && mainContainer) {
    btnTogglePreview.addEventListener('click', () => {
      mainContainer.classList.toggle('with-preview');
    });
  }

  // Esporta PDF
  const btnExportPDF = document.getElementById('btnExportPDF');
  const btnExportPDF2 = document.getElementById('btnExportPDF2');
  const btnExportContinuous = document.getElementById('btnExportContinuous');

  if (btnExportPDF) btnExportPDF.addEventListener('click', () => exportWorkoutPDF('per-day'));
  if (btnExportPDF2) btnExportPDF2.addEventListener('click', () => exportWorkoutPDF('per-day'));
  if (btnExportContinuous) btnExportContinuous.addEventListener('click', () => exportWorkoutPDF('continuous'));

  // Stampa A4
  const btnPrintA4 = document.getElementById('btnPrintA4');
  if (btnPrintA4) {
    btnPrintA4.addEventListener('click', () => {
      const chkPagePerDay = document.getElementById('chkPagePerDay');
      if (chkPagePerDay && chkPagePerDay.checked) {
        document.body.classList.add('print-page-per-day');
      } else {
        document.body.classList.remove('print-page-per-day');
      }
      window.print();
    });
  }

  // Modal Profilo Trainer
  const btnEditProfile = document.getElementById('btnEditProfile');
  const btnCloseProfile = document.getElementById('btnCloseProfileModal');
  const btnCloseProfile2 = document.getElementById('btnCloseProfileModal2');
  const btnSaveProfile = document.getElementById('btnSaveProfile');

  if (btnEditProfile) {
    btnEditProfile.addEventListener('click', () => {
      document.getElementById('ptInputName').value = AppState.profile.name || '';
      document.getElementById('ptInputTitle').value = AppState.profile.title || '';
      document.getElementById('ptInputPhone').value = AppState.profile.phone || '';
      document.getElementById('ptInputInstagram').value = AppState.profile.instagram || '';
      openModal('modalProfile');
    });
  }

  if (btnCloseProfile) btnCloseProfile.addEventListener('click', () => closeModal('modalProfile'));
  if (btnCloseProfile2) btnCloseProfile2.addEventListener('click', () => closeModal('modalProfile'));

  if (btnSaveProfile) {
    btnSaveProfile.addEventListener('click', () => {
      const logoInput = document.getElementById('ptInputLogo');
      const updatedProfile = {
        name: document.getElementById('ptInputName').value.trim(),
        title: document.getElementById('ptInputTitle').value.trim(),
        phone: document.getElementById('ptInputPhone').value.trim(),
        instagram: document.getElementById('ptInputInstagram').value.trim()
      };

      if (logoInput && logoInput.files && logoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          updatedProfile.logo = e.target.result;
          saveProfile(updatedProfile);
          closeModal('modalProfile');
        };
        reader.readAsDataURL(logoInput.files[0]);
      } else {
        saveProfile(updatedProfile);
        closeModal('modalProfile');
      }
    });
  }
}
