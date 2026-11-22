/**
 * Template di schede preimpostate per personal trainer
 * Pronte all'uso, caricabili con un click
 */
const DEFAULT_TEMPLATES = [
  {
    id: 'ppl-3days',
    title: 'Push - Pull - Legs (3 Giorni)',
    description: 'La classica scheda di spinta, trazione e gambe ideale per ipertrofia e sviluppo muscolare.',
    goal: 'Ipertrofia / Massa',
    duration: '6 Settimane',
    notes: 'Riscaldamento: 5 min cardio leggero + mobilità specifica. Rispettare i recuperi e mantenere 1-2 ripetizioni in riserva (RIR 1-2) sulle serie pesanti.',
    days: [
      {
        id: 'day-1',
        title: 'Giorno A - Push (Petto, Spalle, Tricipiti)',
        focus: 'Spinta Superiore',
        exercises: [
          { name: 'Panca Piana con Bilanciere', category: 'Petto', sets: '4', reps: '6-8', rest: '120"', notes: 'Fermo 1" al petto, carico progressivo', video: 'https://www.youtube.com/results?search_query=panca+piana+tutorial+italiano' },
          { name: 'Panca Inclinata con Manubri', category: 'Petto', sets: '3', reps: '8-10', rest: '90"', notes: 'Inclinazione panca 30°', video: 'https://www.youtube.com/results?search_query=panca+inclinata+manubri+tutorial' },
          { name: 'Dip alle Parallele (Focus Petto)', category: 'Petto', sets: '3', reps: '8-10', rest: '90"', notes: 'Busto inclinato in avanti', video: 'https://www.youtube.com/results?search_query=dip+parallele+petto+tutorial' },
          { name: 'Military Press / Lento Avanti Bilanciere', category: 'Spalle', sets: '4', reps: '8', rest: '90"', notes: 'Addome e glutei serrati', video: 'https://www.youtube.com/results?search_query=military+press+bilanciere+tutorial' },
          { name: 'Alzate Laterali con Manubri', category: 'Spalle', sets: '4', reps: '12-15', rest: '60"', notes: 'Gomiti leggermente flessi', video: 'https://www.youtube.com/results?search_query=alzate+laterali+manubri' },
          { name: 'Pushdown al Cavo con Corda', category: 'Braccia', sets: '3', reps: '12', rest: '60"', notes: 'Apri la corda all\'esterno a fine corsa', video: 'https://www.youtube.com/results?search_query=pushdown+corda+tricipiti' }
        ]
      },
      {
        id: 'day-2',
        title: 'Giorno B - Pull (Dorso, Deltoidi Post., Bicipiti)',
        focus: 'Trazione Superiore',
        exercises: [
          { name: 'Trazioni alla Sbarra (Pull-Up)', category: 'Dorso', sets: '4', reps: '6-8', rest: '120"', notes: 'Presa prona, se necessario zavorra o elastico', video: 'https://www.youtube.com/results?search_query=trazioni+sbarra+tecnica' },
          { name: 'Rematore con Bilanciere', category: 'Dorso', sets: '4', reps: '8', rest: '90"', notes: 'Schiena a 45°, gomiti vicini', video: 'https://www.youtube.com/results?search_query=rematore+bilanciere+esecuzione' },
          { name: 'Pulley Basso (Seated Cable Row)', category: 'Dorso', sets: '3', reps: '10-12', rest: '90"', notes: 'Focus squeeze scapolare', video: 'https://www.youtube.com/results?search_query=pulley+basso+esecuzione' },
          { name: 'Face Pull con Corda al Cavo', category: 'Spalle', sets: '4', reps: '15', rest: '60"', notes: 'Tira verso la fronte con extrarotazione', video: 'https://www.youtube.com/results?search_query=face+pull+esecuzione' },
          { name: 'Curl con Bilanciere Sagomato (EZ)', category: 'Braccia', sets: '4', reps: '8-10', rest: '75"', notes: 'Gomiti fermi ai fianchi', video: 'https://www.youtube.com/results?search_query=curl+bilanciere+ez' },
          { name: 'Hammer Curl (Presa a Martello)', category: 'Braccia', sets: '3', reps: '10-12', rest: '60"', notes: 'Focus brachiale', video: 'https://www.youtube.com/results?search_query=hammer+curl+manubri' }
        ]
      },
      {
        id: 'day-3',
        title: 'Giorno C - Legs & Core (Gambe, Glutei, Addome)',
        focus: 'Arti Inferiori & Addome',
        exercises: [
          { name: 'Squat con Bilanciere Dietro (Back Squat)', category: 'Gambe', sets: '4', reps: '6-8', rest: '150"', notes: 'Profondità sotto il parallelo, controllo', video: 'https://www.youtube.com/results?search_query=back+squat+tutorial+italiano' },
          { name: 'Leg Press a 45°', category: 'Gambe', sets: '3', reps: '10-12', rest: '90"', notes: 'Piedi a larghezza spalle', video: 'https://www.youtube.com/results?search_query=leg+press+45+esecuzione' },
          { name: 'Leg Curl Sdraiato (Lying Leg Curl)', category: 'Gambe', sets: '4', reps: '10-12', rest: '60"', notes: 'Bacino incollato alla panca', video: 'https://www.youtube.com/results?search_query=leg+curl+sdraiato' },
          { name: 'Leg Extension', category: 'Gambe', sets: '3', reps: '12-15', rest: '60"', notes: 'Picco isometrico 1"', video: 'https://www.youtube.com/results?search_query=leg+extension+esecuzione' },
          { name: 'Calf Raise in Piedi (Polpacci)', category: 'Gambe', sets: '4', reps: '15', rest: '45"', notes: 'Massimo allungamento e contrazione', video: 'https://www.youtube.com/results?search_query=calf+raise+in+piedi' },
          { name: 'Plank Isometrico sugli Avambracci', category: 'Addome', sets: '3', reps: '50"', rest: '45"', notes: 'Core solido, bacino neutro', video: 'https://www.youtube.com/results?search_query=plank+corretto' }
        ]
      }
    ]
  },
  {
    id: 'upper-lower-4days',
    title: 'Upper / Lower (4 Giorni)',
    description: 'Split in 4 giorni con frequenza 2x sui grandi gruppi muscolari, ottimo per progressioni di forza ed ipertrofia.',
    goal: 'Massa & Forza',
    duration: '8 Settimane',
    notes: 'Programma organizzato in Upper A / Lower A / Riposo / Upper B / Lower B / Riposo. Segnare i carichi ad ogni seduta.',
    days: [
      {
        id: 'day-1',
        title: 'Giorno 1 - Upper A (Focus Forza/Spinta)',
        focus: 'Parte Superiore A',
        exercises: [
          { name: 'Panca Piana con Bilanciere', category: 'Petto', sets: '4', reps: '6', rest: '120"', notes: 'RPE 8, concentrati sulla spinta potente', video: 'https://www.youtube.com/results?search_query=panca+piana+tutorial' },
          { name: 'Rematore con Bilanciere', category: 'Dorso', sets: '4', reps: '6-8', rest: '90"', notes: 'Busto inclinato stabile', video: 'https://www.youtube.com/results?search_query=rematore+bilanciere' },
          { name: 'Military Press / Lento Avanti Bilanciere', category: 'Spalle', sets: '3', reps: '8', rest: '90"', notes: 'Spinta verticale pura', video: 'https://www.youtube.com/results?search_query=military+press' },
          { name: 'Lat Machine Presa Larga Avanti', category: 'Dorso', sets: '3', reps: '10', rest: '75"', notes: 'Squeeze dorsale', video: 'https://www.youtube.com/results?search_query=lat+machine' },
          { name: 'French Press su Panca con Bilanciere EZ', category: 'Braccia', sets: '3', reps: '10', rest: '60"', notes: 'Controllo gomiti', video: 'https://www.youtube.com/results?search_query=french+press+ez' }
        ]
      },
      {
        id: 'day-2',
        title: 'Giorno 2 - Lower A (Focus Quadricipiti)',
        focus: 'Parte Inferiore A',
        exercises: [
          { name: 'Squat con Bilanciere Dietro (Back Squat)', category: 'Gambe', sets: '4', reps: '6', rest: '150"', notes: 'Carico importante ma tecnica impeccabile', video: 'https://www.youtube.com/results?search_query=back+squat' },
          { name: 'Leg Press a 45°', category: 'Gambe', sets: '3', reps: '10', rest: '90"', notes: 'Discesa profonda', video: 'https://www.youtube.com/results?search_query=leg+press' },
          { name: 'Leg Curl Seduto', category: 'Gambe', sets: '4', reps: '10-12', rest: '60"', notes: 'Controllo fase eccentrica', video: 'https://www.youtube.com/results?search_query=leg+curl+seduto' },
          { name: 'Calf Raise in Piedi (Polpacci)', category: 'Gambe', sets: '4', reps: '15', rest: '45"', notes: 'Pausa in basso', video: 'https://www.youtube.com/results?search_query=calf+raise' },
          { name: 'Hanging Leg Raise alla Sbarra', category: 'Addome', sets: '3', reps: '12', rest: '60"', notes: 'Ginocchia o gambe tese', video: 'https://www.youtube.com/results?search_query=hanging+leg+raise' }
        ]
      },
      {
        id: 'day-3',
        title: 'Giorno 3 - Upper B (Focus Ipertrofia)',
        focus: 'Parte Superiore B',
        exercises: [
          { name: 'Panca Inclinata con Manubri', category: 'Petto', sets: '4', reps: '8-10', rest: '90"', notes: 'Ampio allungamento', video: 'https://www.youtube.com/results?search_query=panca+inclinata+manubri' },
          { name: 'Pulley Basso (Seated Cable Row)', category: 'Dorso', sets: '4', reps: '10-12', rest: '90"', notes: 'Maniglia triangolo o barra', video: 'https://www.youtube.com/results?search_query=pulley+basso' },
          { name: 'Croci ai Cavi Alti', category: 'Petto', sets: '3', reps: '12-15', rest: '60"', notes: 'Contrazione di picco', video: 'https://www.youtube.com/results?search_query=croci+cavi+alti' },
          { name: 'Alzate Laterali al Cavo Singolo', category: 'Spalle', sets: '4', reps: '12 per lato', rest: '45"', notes: 'Isolamento deltoide laterale', video: 'https://www.youtube.com/results?search_query=alzate+laterali+cavo' },
          { name: 'Curl su Panca Inclinata a 45°', category: 'Braccia', sets: '3', reps: '10-12', rest: '60"', notes: 'Bicipite in allungamento', video: 'https://www.youtube.com/results?search_query=curl+panca+inclinata' }
        ]
      },
      {
        id: 'day-4',
        title: 'Giorno 4 - Lower B (Focus Femorali & Glutei)',
        focus: 'Parte Inferiore B',
        exercises: [
          { name: 'Stacco da Terra (Deadlift)', category: 'Dorso', sets: '4', reps: '5', rest: '150"', notes: 'Spinta coordinata di gambe e catena posteriore', video: 'https://www.youtube.com/results?search_query=deadlift+tutorial' },
          { name: 'Hip Thrust con Bilanciere', category: 'Glutei', sets: '4', reps: '10', rest: '90"', notes: 'Pausa 2" al picco alto', video: 'https://www.youtube.com/results?search_query=hip+thrust+tutorial' },
          { name: 'Squat Bulgaro con Manubri', category: 'Gambe', sets: '3', reps: '10 per gamba', rest: '75"', notes: 'Torso inclinato in avanti', video: 'https://www.youtube.com/results?search_query=bulgarian+split+squat' },
          { name: 'Leg Extension', category: 'Gambe', sets: '3', reps: '15', rest: '60"', notes: 'Pompaggio finale', video: 'https://www.youtube.com/results?search_query=leg+extension' },
          { name: 'Russian Twist con Peso/Palla Medica', category: 'Addome', sets: '3', reps: '20', rest: '45"', notes: 'Rotazione controllata', video: 'https://www.youtube.com/results?search_query=russian+twist' }
        ]
      }
    ]
  },
  {
    id: 'donna-glutei-focus',
    title: 'Glutei & Lower Focus (3 Giorni)',
    description: 'Programma specifico ad alta efficacia per tonificazione di glutei, gambe snelle e definizione del busto.',
    goal: 'Tonificazione & Glutei',
    duration: '6 Settimane',
    notes: 'Focus speciale sulla connessione mente-muscolo nei glutei. Mantenere contrazioni volontarie di 1-2 secondi al picco.',
    days: [
      {
        id: 'day-1',
        title: 'Giorno 1 - Glutei & Catena Posteriore',
        focus: 'Glutei & Femorali',
        exercises: [
          { name: 'Hip Thrust con Bilanciere', category: 'Glutei', sets: '4', reps: '10-12', rest: '90"', notes: 'Fermo 2" in alto, spingi sui talloni', video: 'https://www.youtube.com/results?search_query=hip+thrust+tutorial' },
          { name: 'Squat Bulgaro con Manubri', category: 'Gambe', sets: '3', reps: '10 per gamba', rest: '75"', notes: 'Focus gluteo gamba anteriore', video: 'https://www.youtube.com/results?search_query=squat+bulgaro' },
          { name: 'Leg Curl Sdraiato (Lying Leg Curl)', category: 'Gambe', sets: '3', reps: '12', rest: '60"', notes: 'Femorali controllati', video: 'https://www.youtube.com/results?search_query=leg+curl' },
          { name: 'Kickback ai Cavi per Glutei', category: 'Glutei', sets: '3', reps: '15 per lato', rest: '45"', notes: 'Isolamento gluteo superiore', video: 'https://www.youtube.com/results?search_query=kickback+cavi+glutei' },
          { name: 'Abductor Machine (Aperture Seduto)', category: 'Glutei', sets: '3', reps: '20', rest: '45"', notes: 'Busto inclinato avanti', video: 'https://www.youtube.com/results?search_query=abductor+machine' }
        ]
      },
      {
        id: 'day-2',
        title: 'Giorno 2 - Upper Body & Vita Sottile',
        focus: 'Tono Superiore & Core',
        exercises: [
          { name: 'Lat Machine Presa Inversa Stretta', category: 'Dorso', sets: '3', reps: '10-12', rest: '75"', notes: 'Petto aperto, postura eretta', video: 'https://www.youtube.com/results?search_query=lat+machine' },
          { name: 'Panca Inclinata con Manubri', category: 'Petto', sets: '3', reps: '12', rest: '60"', notes: 'Tono pettorale e postura', video: 'https://www.youtube.com/results?search_query=panca+inclinata+manubri' },
          { name: 'Alzate Laterali con Manubri', category: 'Spalle', sets: '4', reps: '15', rest: '45"', notes: 'Deltoidi tondi per proporzioni armoniche', video: 'https://www.youtube.com/results?search_query=alzate+laterali' },
          { name: 'Pushdown al Cavo con Corda', category: 'Braccia', sets: '3', reps: '12-15', rest: '45"', notes: 'Tono tricipiti', video: 'https://www.youtube.com/results?search_query=pushdown+corda' },
          { name: 'Side Plank (Plank Laterale)', category: 'Addome', sets: '3', reps: '35" per lato', rest: '30"', notes: 'Focus punto vita e stabilità', video: 'https://www.youtube.com/results?search_query=side+plank' }
        ]
      },
      {
        id: 'day-3',
        title: 'Giorno 3 - Gambe Complete & Pompaggio Glutei',
        focus: 'Gambe & Glutei',
        exercises: [
          { name: 'Leg Press a 45°', category: 'Gambe', sets: '4', reps: '12', rest: '90"', notes: 'Piedi alti sulla pedana per enfasi glutei', video: 'https://www.youtube.com/results?search_query=leg+press+glutei' },
          { name: 'Affondi Camminati con Manubri', category: 'Gambe', sets: '3', reps: '12 passi per lato', rest: '75"', notes: 'Passo medio-lungo', video: 'https://www.youtube.com/results?search_query=affondi+camminati' },
          { name: 'Leg Extension', category: 'Gambe', sets: '3', reps: '15', rest: '60"', notes: 'Movimento fluido', video: 'https://www.youtube.com/results?search_query=leg+extension' },
          { name: 'Plank Isometrico sugli Avambracci', category: 'Addome', sets: '3', reps: '45"', rest: '45"', notes: 'Addome compatto', video: 'https://www.youtube.com/results?search_query=plank' },
          { name: 'Camminata in Pendenza (Tapis Roulant)', category: 'Cardio', sets: '1', reps: '20 min', rest: '-', notes: 'Pendenza 10%, velocità 5 km/h', video: 'https://www.youtube.com/results?search_query=tapis+roulant+pendenza' }
        ]
      }
    ]
  },
  {
    id: 'fullbody-beginner',
    title: 'Full Body Principiante (2 Giorni)',
    description: 'Scheda base ideale per chi inizia o ha solo due giorni a settimana, focalizzata sull\'apprendimento degli schemi motori.',
    goal: 'Ricondizionamento & Base',
    duration: '4-6 Settimane',
    notes: 'Imparare prima di tutto la corretta esecuzione dei movimenti. Non arrivare a cedimento muscolare nelle prime 2 settimane.',
    days: [
      {
        id: 'day-1',
        title: 'Giorno A - Full Body Base',
        focus: 'Tutto il corpo',
        exercises: [
          { name: 'Leg Press a 45°', category: 'Gambe', sets: '3', reps: '10-12', rest: '90"', notes: 'Movimento controllato', video: 'https://www.youtube.com/results?search_query=leg+press' },
          { name: 'Chest Press', category: 'Petto', sets: '3', reps: '10-12', rest: '75"', notes: 'Sedile regolato all\'altezza dei capezzoli', video: 'https://www.youtube.com/results?search_query=chest+press' },
          { name: 'Lat Machine Presa Larga Avanti', category: 'Dorso', sets: '3', reps: '10-12', rest: '75"', notes: 'Non oscillare con la schiena', video: 'https://www.youtube.com/results?search_query=lat+machine' },
          { name: 'Shoulder Press Macchina', category: 'Spalle', sets: '3', reps: '10-12', rest: '60"', notes: 'Spinta verso l\'alto', video: 'https://www.youtube.com/results?search_query=shoulder+press' },
          { name: 'Crunch a Terra', category: 'Addome', sets: '3', reps: '15', rest: '45"', notes: 'Espirare durante la salita', video: 'https://www.youtube.com/results?search_query=crunch' }
        ]
      },
      {
        id: 'day-2',
        title: 'Giorno B - Full Body Variante',
        focus: 'Tutto il corpo',
        exercises: [
          { name: 'Leg Curl Seduto', category: 'Gambe', sets: '3', reps: '12', rest: '75"', notes: 'Enfasi catena posteriore', video: 'https://www.youtube.com/results?search_query=leg+curl' },
          { name: 'Pulley Basso (Seated Cable Row)', category: 'Dorso', sets: '3', reps: '10-12', rest: '75"', notes: 'Schiena dritta, spalle basse', video: 'https://www.youtube.com/results?search_query=pulley+basso' },
          { name: 'Panca Piana con Manubri', category: 'Petto', sets: '3', reps: '10', rest: '75"', notes: 'Controllo del peso', video: 'https://www.youtube.com/results?search_query=panca+piana+manubri' },
          { name: 'Curl con Manubri Alternato', category: 'Braccia', sets: '3', reps: '10 per braccio', rest: '60"', notes: 'Bicipiti', video: 'https://www.youtube.com/results?search_query=curl+manubri' },
          { name: 'Pushdown al Cavo con Barra a V', category: 'Braccia', sets: '3', reps: '12', rest: '60"', notes: 'Tricipiti', video: 'https://www.youtube.com/results?search_query=pushdown+barra' },
          { name: 'Plank Isometrico sugli Avambracci', category: 'Addome', sets: '3', reps: '30"-45"', rest: '45"', notes: 'Core stabile', video: 'https://www.youtube.com/results?search_query=plank' }
        ]
      }
    ]
  }
];
