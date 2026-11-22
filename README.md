# ⚡ FitPlan Pro - PT Edition

> **Web App professionale per Personal Trainer**: crea schede di allenamento per i tuoi clienti in palestra ed esporta all'istante PDF ottimizzati e comodamente leggibili su qualunque smartphone.

🔗 **Demo Online (GitHub Pages):** [https://gheb6.github.io/pt-workout-planner/](https://gheb6.github.io/pt-workout-planner/)

---

## 🎯 Perché questa soluzione?

Spesso i personal trainer utilizzano fogli Excel o Google Sheets che:
- Risultano scomodi da leggere sullo schermo di un telefono (font piccoli, tabelle sformate, necessità di zoomare).
- Richiedono tempo per inserire formattazioni e nomi degli esercizi.
- Mancano di link diretti ai tutorial degli esercizi per i clienti.

**FitPlan Pro** è studiata per essere **veloce e a prova di errore ("per dummies")**:
1. **Compila in 2 minuti:** Inserisci il nome del cliente e seleziona gli esercizi con suggerimenti istantanei.
2. **Database di 120+ esercizi in italiano:** Suddivisi per Petto, Dorso, Spalle, Gambe, Glutei, Braccia, Addome e Cardio.
3. **Chip rapidi:** Imposta serie (`3`, `4`), ripetizioni (`8-10`, `10-12`) e recupero (`60"`, `90"`) con un solo tocco.
4. **PDF ottimizzato per smartphone:** Layout verticale ad alto contrasto con font grandi e sezioni pulite per ogni giorno di allenamento.
5. **Link ai Video degli Esercizi:** Nel PDF generato, i clienti possono toccare sul pulsante rosso *"▶ Guarda Video"* per vedere subito la corretta esecuzione su YouTube.
6. **Condivisione WhatsApp in 1 click:** Genera un riassunto formattato con emoji pronto da incollare nella chat WhatsApp o Telegram del cliente.
7. **Personalizzazione Trainer:** Inserisci il tuo nome, il logo/foto, il numero di telefono e il profilo Instagram per rafforzare il tuo brand.
8. **Funziona offline e salva in automatico:** I dati non vengono mai persi grazie al salvataggio automatico nel browser (`localStorage`).

---

## 🚀 Come utilizzarla

### 1. Utilizzo Online Diretto
Puoi accedere alla web app da qualsiasi dispositivo (PC, tablet, smartphone) collegandoti al link GitHub Pages:
👉 **[https://gheb6.github.io/pt-workout-planner/](https://gheb6.github.io/pt-workout-planner/)**

### 2. Utilizzo in Locale (Senza connessione)
Puoi semplicemente fare doppio clic sul file `index.html` per aprirlo in qualsiasi browser (Chrome, Edge, Safari, Firefox). Non richiede server, Node.js o installazioni complesse.

---

## 📁 Struttura del Progetto

```
pt-workout-planner/
├── index.html            # Pagina principale dell'applicazione
├── css/
│   └── style.css         # Stili responsive, tema dark/fitness e regole @media print
├── js/
│   ├── exercises-db.js   # Libreria di 120+ esercizi suddivisi per categoria
│   ├── templates-db.js   # 4 template preimpostati (Push/Pull/Legs, Upper/Lower, Glutei, Full Body)
│   └── app.js            # Logica applicativa, salvataggio e generazione PDF
└── README.md             # Guida completa al progetto
```

---

## 🛠️ Tecnologie Utilizzate

- **HTML5 & CSS3 nativi:** Nessun framework pesante, caricamento istantaneo in meno di 100ms.
- **Vanilla JavaScript (ES6+):** Gestione reattiva dello stato, ricerca e filtraggio in tempo reale.
- **html2pdf.js:** Generazione client-side di PDF vettoriali ad alta definizione per dispositivi mobili.
- **LocalStorage API:** Persistenza locale di bozze, profilo trainer e template personalizzati.

---

## 👤 Licenza & Autore
Progetto sviluppato da [Gabriele Righi](https://github.com/Gheb6). Libero per uso personale e commerciale.
