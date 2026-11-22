/**
 * Database completo di esercizi da palestra in italiano
 * Suddivisi per gruppo muscolare con parametri di default consigliati
 */
const EXERCISES_DATABASE = [
  // --- PETTO ---
  { id: 'panca-piana-bil', name: 'Panca Piana con Bilanciere', category: 'Petto', sets: '4', reps: '8', rest: '90"', notes: 'Fermo al petto 1", scapole addotte' },
  { id: 'panca-inclinata-man', name: 'Panca Inclinata con Manubri', category: 'Petto', sets: '3', reps: '10', rest: '90"', notes: 'Inclinazione 30°, massima estensione' },
  { id: 'panca-piana-man', name: 'Panca Piana con Manubri', category: 'Petto', sets: '3', reps: '10', rest: '90"', notes: 'Focus contrazione al picco' },
  { id: 'croci-cavi-alti', name: 'Croci ai Cavi Alti', category: 'Petto', sets: '3', reps: '12-15', rest: '60"', notes: 'Focalizzati sullo squeeze pettorale' },
  { id: 'croci-cavi-bassi', name: 'Croci ai Cavi Bassi', category: 'Petto', sets: '3', reps: '12-15', rest: '60"', notes: 'Focus fascio clavicolare' },
  { id: 'croci-manubri-panca', name: 'Croci con Manubri su Panca', category: 'Petto', sets: '3', reps: '12', rest: '60"', notes: 'Gomiti leggermente flessi, stretching controllato' },
  { id: 'chest-press-macchina', name: 'Chest Press', category: 'Petto', sets: '3', reps: '10-12', rest: '60"', notes: 'Spinta esplosiva, ritorno lento in 3"' },
  { id: 'dip-parallele-petto', name: 'Dip alle Parallele (Focus Petto)', category: 'Petto', sets: '3', reps: 'Max / 8-10', rest: '90"', notes: 'Tronco leggermente inclinato in avanti' },
  { id: 'push-up-terra', name: 'Push-Up (Piegamenti a terra)', category: 'Petto', sets: '3', reps: 'Max / 12-15', rest: '60"', notes: 'Core compatto, discesa controllata' },
  { id: 'pectoral-machine', name: 'Pectoral Machine / Pec Deck', category: 'Petto', sets: '3', reps: '12-15', rest: '60"', notes: 'Isolamento totale con 1" di picco' },

  // --- DORSO ---
  { id: 'lat-machine-avanti', name: 'Lat Machine Presa Larga Avanti', category: 'Dorso', sets: '4', reps: '8-10', rest: '90"', notes: 'Tira con i dorsali, petto in fuori' },
  { id: 'lat-machine-inversa', name: 'Lat Machine Presa Inversa Stretta', category: 'Dorso', sets: '3', reps: '10', rest: '90"', notes: 'Focus gran dorsale inferiore e bicipite' },
  { id: 'trazioni-sbarra', name: 'Trazioni alla Sbarra (Pull-Up)', category: 'Dorso', sets: '4', reps: '6-8', rest: '120"', notes: 'ROM completo, mento sopra la sbarra' },
  { id: 'rematore-bilanciere', name: 'Rematore con Bilanciere', category: 'Dorso', sets: '4', reps: '8', rest: '90"', notes: 'Schiena a 45°, gomiti vicini al corpo' },
  { id: 'rematore-manubrio', name: 'Rematore con Singolo Manubrio', category: 'Dorso', sets: '3', reps: '10 per lato', rest: '60"', notes: 'Trazione verso il fianco, evita rotazioni del busto' },
  { id: 'pulley-basso', name: 'Pulley Basso (Seated Cable Row)', category: 'Dorso', sets: '4', reps: '10-12', rest: '90"', notes: 'Adduzione scapolare in chiusura' },
  { id: 'pulldown-braccia-tese', name: 'Pulldown a Braccia Tese al Cavo', category: 'Dorso', sets: '3', reps: '12-15', rest: '60"', notes: 'Isolamento gran dorsale, gomiti semiflessi' },
  { id: 'stacco-terra', name: 'Stacco da Terra (Deadlift)', category: 'Dorso', sets: '4', reps: '5-6', rest: '150"', notes: 'Spinta dai talloni, schiena neutra' },
  { id: 't-bar-row', name: 'T-Bar Row', category: 'Dorso', sets: '3', reps: '8-10', rest: '90"', notes: 'Grande enfasi su spessore dorsale e romboidi' },
  { id: 'iperestensioni-lombari', name: 'Hyper-extension (Lombari)', category: 'Dorso', sets: '3', reps: '12-15', rest: '60"', notes: 'Non iperestendere oltre la linea neutra' },

  // --- SPALLE ---
  { id: 'military-press', name: 'Military Press / Lento Avanti Bilanciere', category: 'Spalle', sets: '4', reps: '6-8', rest: '120"', notes: 'In piedi, glutei e addome contratti' },
  { id: 'lento-manubri-seduto', name: 'Lento Avanti con Manubri Seduto', category: 'Spalle', sets: '4', reps: '8-10', rest: '90"', notes: 'Schienale a 75-80°, movimento controllato' },
  { id: 'alzate-laterali-man', name: 'Alzate Laterali con Manubri', category: 'Spalle', sets: '4', reps: '12-15', rest: '60"', notes: 'Gomiti guida, non superare la linea spalle' },
  { id: 'alzate-laterali-cavo', name: 'Alzate Laterali al Cavo Singolo', category: 'Spalle', sets: '3', reps: '12 per lato', rest: '45"', notes: 'Tensione continua su tutto il ROM' },
  { id: 'alzate-posteriori-90', name: 'Alzate Posteriori a 90° con Manubri', category: 'Spalle', sets: '4', reps: '12-15', rest: '60"', notes: 'Focus deltoide posteriore e cuffia dei rotatori' },
  { id: 'face-pull-corda', name: 'Face Pull con Corda al Cavo', category: 'Spalle', sets: '4', reps: '15', rest: '60"', notes: 'Tira verso gli occhi/fronte con extrarotazione' },
  { id: 'shoulder-press-macchina', name: 'Shoulder Press Macchina', category: 'Spalle', sets: '3', reps: '10', rest: '60"', notes: 'Carico costante e traiettoria guidata sicura' },
  { id: 'tirate-al-mento', name: 'Tirate al Mento ai Cavi / Bilanciere', category: 'Spalle', sets: '3', reps: '10-12', rest: '60"', notes: 'Presa media, gomiti alti' },

  // --- GAMBE & GLUTEI ---
  { id: 'squat-bilanciere', name: 'Squat con Bilanciere Dietro (Back Squat)', category: 'Gambe', sets: '4', reps: '6-8', rest: '120"', notes: 'Discesa sotto il parallelo, ginocchia in linea' },
  { id: 'front-squat', name: 'Front Squat con Bilanciere', category: 'Gambe', sets: '3', reps: '8', rest: '90"', notes: 'Enfasi su quadricipiti e core verticale' },
  { id: 'leg-press-45', name: 'Leg Press a 45°', category: 'Gambe', sets: '4', reps: '10-12', rest: '90"', notes: 'Non bloccare mai le ginocchia a fine spinta' },
  { id: 'hack-squat', name: 'Hack Squat', category: 'Gambe', sets: '3', reps: '10', rest: '90"', notes: 'Profondità massima con supporto lombare' },
  { id: 'leg-extension', name: 'Leg Extension', category: 'Gambe', sets: '3', reps: '12-15', rest: '60"', notes: '1" di contrazione isometrica in alto' },
  { id: 'leg-curl-sdraiato', name: 'Leg Curl Sdraiato (Lying Leg Curl)', category: 'Gambe', sets: '4', reps: '10-12', rest: '60"', notes: 'Focus femorali, bacino aderente alla panca' },
  { id: 'leg-curl-seduto', name: 'Leg Curl Seduto', category: 'Gambe', sets: '3', reps: '12', rest: '60"', notes: 'Ottimo allungamento del bicipite femorale' },
  { id: 'affondi-camminati', name: 'Affondi Camminati con Manubri', category: 'Gambe', sets: '3', reps: '10 passi per lato', rest: '90"', notes: 'Passo ampio, peso sul tallone avanti' },
  { id: 'bulgarian-split-squat', name: 'Squat Bulgaro con Manubri', category: 'Gambe', sets: '3', reps: '8-10 per gamba', rest: '90"', notes: 'Focus gluteo e quadricipite, stabilità' },
  { id: 'hip-thrust-bilanciere', name: 'Hip Thrust con Bilanciere', category: 'Glutei', sets: '4', reps: '8-10', rest: '90"', notes: 'Pausa di 2" in massima contrazione glutea' },
  { id: 'abductor-machine', name: 'Abductor Machine (Aperture Seduto)', category: 'Glutei', sets: '3', reps: '15-20', rest: '45"', notes: 'Busto inclinato in avanti per maggior gluteo' },
  { id: 'adductor-machine', name: 'Adductor Machine (Chiusure Seduto)', category: 'Gambe', sets: '3', reps: '15', rest: '45"', notes: 'Controllo del ritorno eccentrico' },
  { id: 'slanci-cavo-glutei', name: 'Kickback ai Cavi per Glutei', category: 'Glutei', sets: '3', reps: '12-15 per lato', rest: '45"', notes: 'Spinta di tallone, schiena ferma' },
  { id: 'calf-in-piedi', name: 'Calf Raise in Piedi (Polpacci)', category: 'Gambe', sets: '4', reps: '15-20', rest: '45"', notes: '2" di stretching sul fondo, 1" di picco in alto' },
  { id: 'calf-seduto', name: 'Calf Seduto al Macchinario', category: 'Gambe', sets: '3', reps: '15', rest: '45"', notes: 'Isolamento del muscolo soleo' },

  // --- BRACCIA: BICIPITI ---
  { id: 'curl-bilanciere-in-piedi', name: 'Curl con Bilanciere Sagomato (EZ)', category: 'Braccia', sets: '4', reps: '8-10', rest: '75"', notes: 'Gomiti bloccati ai fianchi, nessun dondolio' },
  { id: 'curl-manubri-alternato', name: 'Curl con Manubri Alternato', category: 'Braccia', sets: '3', reps: '10 per braccio', rest: '60"', notes: 'Supinazione del polso in risalita' },
  { id: 'curl-panca-inclinata', name: 'Curl su Panca Inclinata a 45°', category: 'Braccia', sets: '3', reps: '10-12', rest: '60"', notes: 'Massimo allungamento del capo lungo bicipite' },
  { id: 'hammer-curl-manubri', name: 'Hammer Curl (Presa a Martello)', category: 'Braccia', sets: '3', reps: '10-12', rest: '60"', notes: 'Focus brachiale e avambracci' },
  { id: 'curl-scott-panca', name: 'Curl alla Panca Scott (Preacher Curl)', category: 'Braccia', sets: '3', reps: '10', rest: '60"', notes: 'Isolamento totale, non staccare i gomiti' },
  { id: 'curl-cavi-bassi', name: 'Curl al Cavo Basso con Barra/Corda', category: 'Braccia', sets: '3', reps: '12-15', rest: '45"', notes: 'Tensione costante anche in chiusura' },

  // --- BRACCIA: TRICIPITI ---
  { id: 'pushdown-cavo-corda', name: 'Pushdown al Cavo con Corda', category: 'Braccia', sets: '4', reps: '12', rest: '60"', notes: 'Apri la corda verso l\'esterno in fondo' },
  { id: 'pushdown-cavo-barra', name: 'Pushdown al Cavo con Barra a V', category: 'Braccia', sets: '3', reps: '10-12', rest: '60"', notes: 'Gomiti fissi, estensione completa' },
  { id: 'french-press-panca', name: 'French Press su Panca con Bilanciere EZ', category: 'Braccia', sets: '4', reps: '8-10', rest: '75"', notes: 'Discesa controllata verso la fronte/vertice' },
  { id: 'french-press-manubrio', name: 'Estensioni Tricipiti con Manubrio dietro la Testa', category: 'Braccia', sets: '3', reps: '10-12', rest: '60"', notes: 'Focus capo lungo tricipite' },
  { id: 'dip-tra-panche', name: 'Dip tra due Panche (Bench Dips)', category: 'Braccia', sets: '3', reps: '12-15', rest: '60"', notes: 'Busto vicino alla panca' },
  { id: 'estensioni-cavo-alto', name: 'Triceps Overhead Extension ai Cavi', category: 'Braccia', sets: '3', reps: '12-15', rest: '60"', notes: 'Grande allungamento e contrazione fluida' },

  // --- ADDOME & CORE ---
  { id: 'plank-avambracci', name: 'Plank Isometrico sugli Avambracci', category: 'Addome', sets: '3', reps: '45"-60"', rest: '45"', notes: 'Retroversione del bacino, glutei stretti' },
  { id: 'side-plank', name: 'Side Plank (Plank Laterale)', category: 'Addome', sets: '3', reps: '30"-40" per lato', rest: '30"', notes: 'Focus obliqui e stabilità del bacino' },
  { id: 'crunch-terra', name: 'Crunch a Terra', category: 'Addome', sets: '3', reps: '15-20', rest: '45"', notes: 'Sguardo al soffitto, stacca solo le scapole' },
  { id: 'reverse-crunch', name: 'Reverse Crunch (Sollevamento Bacino)', category: 'Addome', sets: '3', reps: '12-15', rest: '45"', notes: 'Porta le ginocchia verso il petto sollevando il bacino' },
  { id: 'leg-raise-sbarra', name: 'Hanging Leg Raise alla Sbarra', category: 'Addome', sets: '3', reps: '10-12', rest: '60"', notes: 'Evita di oscillare, controlla la discesa' },
  { id: 'russian-twist', name: 'Russian Twist con Peso/Palla Medica', category: 'Addome', sets: '3', reps: '20 totali', rest: '45"', notes: 'Rotazione guidata del busto' },
  { id: 'ab-wheel-rollout', name: 'Ab Wheel Rollout (Ruota per Addominali)', category: 'Addome', sets: '3', reps: '8-10', rest: '60"', notes: 'Non inarcare la zona lombare' },
  { id: 'cable-woodchopper', name: 'Woodchopper al Cavo per Obliqui', category: 'Addome', sets: '3', reps: '12 per lato', rest: '45"', notes: 'Movimento diagonale esplosivo e ritorno lento' },

  // --- CARDIO & MOBILITÀ ---
  { id: 'tapis-roulant-camminata', name: 'Camminata in Pendenza (Tapis Roulant)', category: 'Cardio', sets: '1', reps: '15-20 min', rest: '-', notes: 'Pendenza 8-12%, velocità 4.5-5.5 km/h' },
  { id: 'cyclette-cardio', name: 'Cyclette / Stationary Bike', category: 'Cardio', sets: '1', reps: '15-20 min', rest: '-', notes: 'Cadenza costante 70-80 RPM' },
  { id: 'ellittica', name: 'Ellittica (Cross Trainer)', category: 'Cardio', sets: '1', reps: '15 min', rest: '-', notes: 'Basso impatto articolare' },
  { id: 'vogatore-rower', name: 'Vogatore (Rowing Machine)', category: 'Cardio', sets: '3-4', reps: '500m intervallati', rest: '60"', notes: 'Coordinazione gambe-schiena-braccia' },
  { id: 'mobilita-anche-spalle', name: 'Mobilità Articolare Globale (Riscaldamento)', category: 'Cardio', sets: '1', reps: '8-10 min', rest: '-', notes: 'Rotazioni scapole, mobilità anca, cat-cow' }
];

// Helper per ottenere lista categorie uniche
const EXERCISE_CATEGORIES = ['Tutti', 'Petto', 'Dorso', 'Spalle', 'Gambe', 'Glutei', 'Braccia', 'Addome', 'Cardio'];
