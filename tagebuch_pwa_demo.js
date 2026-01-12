// ---------------------------
// Mini-Tagebuch Backend Demo für Render
// ---------------------------

// server.js
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const FILE = 'entries.json';

// POST-Endpunkt zum Speichern eines Eintrags
app.post('/api/entries', (req, res) => {
  const entry = req.body;
  let entries = [];
  if (fs.existsSync(FILE)) {
    entries = JSON.parse(fs.readFileSync(FILE));
  }
  entries.push(entry);
  fs.writeFileSync(FILE, JSON.stringify(entries, null, 2));
  res.json({ success: true });
});

// GET-Endpunkt zum Abrufen aller Einträge
app.get('/api/entries', (req, res) => {
  if (!fs.existsSync(FILE)) return res.json([]);
  const entries = JSON.parse(fs.readFileSync(FILE));
  res.json(entries);
});

app.listen(process.env.PORT || 3000, () => console.log('API läuft...'));

/*
Schritt-für-Schritt Anleitung für Render Deployment:

1. Gehe zu https://render.com und erstelle einen kostenlosen Account.
2. Erstelle ein neues GitHub-Repo (z. B. 'tagebuch-backend') und lade diese Datei hoch.
   - Die Datei muss server.js heißen
3. Optional: Lege eine leere Datei namens entries.json im Repo an.
4. Auf Render: 'New Web Service' → Node.js auswählen → GitHub-Repo verbinden
5. Render baut das Projekt automatisch und stellt dir eine URL bereit, z. B. https://mein-tagebuch-api.onrender.com
6. Im Frontend (HTML/JS) die fetch-URL auf diese API-URL ändern, z. B.:

fetch('https://mein-tagebuch-api.onrender.com/api/entries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text, platform, timestamp })
})
.then(res => res.json()).then(...)

Jetzt kannst du die Web-App auf iPhone/Android öffnen und Einträge zentral speichern!
*/
