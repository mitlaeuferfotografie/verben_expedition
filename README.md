# verben_expedition

## Hosting & Datenschutz

- **Live-Version:** https://mitlaeuferfotografie.github.io/verben_expedition/ – jede Änderung auf `main` wird automatisch gebaut und veröffentlicht (`.github/workflows/pages.yml`).
- **Keine externen Dienste:** Schriften (Fredoka – SIL Open Font License 1.1, Dateien und Lizenz in `public/fonts/`) und Tailwind CSS (v3, erzeugt aus `src/tailwind-input.css`) werden beim Bauen eingebunden und mit der App ausgeliefert. Es gibt keine Verbindungen zu Google Fonts oder dem Tailwind-CDN.
- **Impressum & Datenschutz:** Komponente `ImpressumModal` in `src/App.jsx` (gesamter Rechtstext in einer Komponente, gleicher Text wie in den Schwester-Apps). Erreichbar ohne Passwort über: Fußzeile im Menü („Impressum · Datenschutz“) und Link im Lehrer-Bereich (Zahnrad).

## Das kann ich schon

Über den Knopf **„Das kann ich schon:“** (🎯) sieht jedes Kind, welche Regeln es schon sicher beherrscht – oben in der Leiste alle Bausteine mit den passenden Übungen, in einer Übung und auf dem Ergebnis-Bildschirm nur die Bausteine dieser Übung. Gleiches Schema wie bei den Redezeichen-Helden.

- 6 Bausteine (`SKILLS` in `src/App.jsx`): Verben erkennen (Tempel-Truhen, Dschungel-Detektiv, Text-Expedition) · Die 3 Beweise anwenden (Forscher-Beweis) · Wortstamm und Endung (Wortstamm-Maler) · Grundform finden (Grundform-Lianen) · Personalformen bilden (Verwandlungs-Tabelle, Lücken-Brücke) · Besondere Verben (Besondere Verben untersuchen / in Texten)
- Es zählt nur der **erste Versuch** pro Aufgabe (eine Tabelle = eine Aufgabe; Text-Expedition: beim ersten Prüfen jedes markierte Wort; Grundform-Lianen: erster Versuch je Wort links).
- Einstufung aus den letzten 10 Ergebnissen je Baustein: 💪 Kann ich! (ab 90 %) · 🙂 Fast! (ab 70 %) · 🎯 Übe ich noch · 🔍 Noch zu wenig Aufgaben (unter 4).

## Dschungel-Code

- **Neues Format, 11 Zeichen** (`XXXX-XXXX-XXX`): Sterne der 10 Übungen + Stufen der 6 Bausteine + 1 Prüfzeichen gegen Tippfehler (`generateSkillCode` / `parseSkillCode`). O/I/L werden beim Eintippen als 0/1/1 gelesen.
- **Alte 12-stellige Codes** werden weiter gelesen (nur Sterne, „Das kann ich schon“ beginnt dann neu).
- Die Reihenfolge von `GAME_ORDER` und `SKILLS` ist Teil des Formats – nie umsortieren.
