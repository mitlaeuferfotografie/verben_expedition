import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Search, Box, Compass, Map, Award, Star, ArrowRight, RotateCcw, BookOpen, LayoutGrid, PenTool, Trees, Crown, Zap, Edit3, Shield, HelpCircle, Lock, Leaf, Settings, Unlock, RefreshCw, Key, Copy, Check, FileText, ShieldCheck, Binoculars, Gem, ScrollText, Fingerprint, Paintbrush, Wand2, Route } from 'lucide-react';

// ==========================================
// CUSTOM CSS FÜR DSCHUNGEL THEMEN & ANIMATIONEN
// ==========================================
const jungleStyles = `
  /* Schrift wird mit der App ausgeliefert (public/fonts, SIL Open Font License 1.1) – keine Verbindung zu Google. */
  @font-face { font-family: 'Fredoka'; font-style: normal; font-weight: 400; font-display: swap; src: url('fonts/fredoka-latin-400-normal.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
  @font-face { font-family: 'Fredoka'; font-style: normal; font-weight: 500; font-display: swap; src: url('fonts/fredoka-latin-500-normal.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
  @font-face { font-family: 'Fredoka'; font-style: normal; font-weight: 600; font-display: swap; src: url('fonts/fredoka-latin-600-normal.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
  @font-face { font-family: 'Fredoka'; font-style: normal; font-weight: 700; font-display: swap; src: url('fonts/fredoka-latin-700-normal.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  @keyframes shake-short {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px) rotate(-2deg); }
    40%, 80% { transform: translateX(6px) rotate(2deg); }
  }
  @keyframes pop-in {
    0% { transform: scale(0.8) translateY(15px); opacity: 0; }
    70% { transform: scale(1.05) translateY(0); opacity: 1; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes sparkle-twinkle {
    0%, 100% { opacity: 0.4; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2) rotate(15deg); }
  }
  @keyframes hud-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); filter: brightness(1.5); }
    100% { transform: scale(1); }
  }
  @keyframes chest-bounce {
    0%, 100% { transform: scale(1); }
    30% { transform: scale(1.15) translateY(-15px) rotate(2deg); }
    50% { transform: scale(0.95) translateY(5px) rotate(-2deg); }
    70% { transform: scale(1.05) translateY(-5px); }
  }
  @keyframes burst-out {
    0% { transform: translate(0, 0) scale(0); opacity: 1; filter: brightness(1.5); }
    20% { opacity: 1; }
    60% { transform: translate(calc(var(--tx) * 0.8), calc(var(--ty) * 0.8)) scale(1.2) rotate(calc(var(--rot) * 0.6)); opacity: 1; filter: brightness(1.1); }
    100% { transform: translate(var(--tx), var(--ty)) scale(0.5) rotate(var(--rot)); opacity: 0; filter: brightness(1); }
  }
  .anim-burst { animation: burst-out 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

  body { font-family: 'Fredoka', sans-serif; }
  
  .custom-scrollbar::-webkit-scrollbar { width: 8px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: rgba(20, 83, 45, 0.5); border-radius: 4px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(251, 191, 36, 0.5); border-radius: 4px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(251, 191, 36, 0.8); }

  .anim-float { animation: float 4s ease-in-out infinite; }
  .anim-shake { animation: shake-short 0.4s ease-in-out; }
  .anim-pop { animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  .anim-twinkle { animation: sparkle-twinkle 2s ease-in-out infinite; }
  .anim-hud { animation: hud-pulse 0.6s ease-out; }
  .anim-chest-bounce { animation: chest-bounce 0.6s ease-out forwards; }
`;

// ==========================================
// RIESIGE DSCHUNGEL-DATENBANKEN (Geprüft & Fehlerfrei)
// ==========================================

const suchenData = [
  // Runde 1
  { text: "Der Affe klettert schnell auf den Baum.", target: "klettert", exp: "'klettert' ist das Verb, weil der Affe es tut." },
  { text: "Die grüne Schlange zischt leise im Gras.", target: "zischt", exp: "'zischt' ist das Verb. Es zeigt, was die Schlange macht." },
  { text: "Der laute Löwe brüllt den ganzen Tag.", target: "brüllt", exp: "'brüllt' ist das Verb in diesem Satz." },
  { text: "Das Nilpferd taucht tief unter das Wasser.", target: "taucht", exp: "Was tut das Nilpferd? Es 'taucht'." },
  { text: "Der Forscher sucht den versteckten Tempel.", target: "sucht", exp: "'sucht' ist das Verb. Jemand tut etwas." },
  { text: "Der Papagei frisst eine süße Frucht.", target: "frisst", exp: "'frisst' ist das Verb." },
  { text: "Die Spinne webt ein großes Netz.", target: "webt", exp: "'webt' ist das Verb." },
  { text: "Das Boot schwimmt auf dem langen Fluss.", target: "schwimmt", exp: "'schwimmt' ist das Verb." },
  { text: "Der Tiger schläft im kühlen Schatten.", target: "schläft", exp: "'schläft' ist das Verb." },
  { text: "Wir schlagen unser Lager am Feuer auf.", target: "schlagen", exp: "'schlagen' ist das Verb." },
  // Runde 2
  { text: "Der Leopard springt weit über den Bach.", target: "springt", exp: "'springt' ist das Verb. Es zeigt eine Bewegung." },
  { text: "Der Forscher gräbt tief in der weichen Erde.", target: "gräbt", exp: "'gräbt' ist das Verb. Jemand macht hier etwas." },
  { text: "Die bunten Blumen blühen in der warmen Sonne.", target: "blühen", exp: "'blühen' ist das Verb." },
  { text: "Das kleine Krokodil schnappt nach dem Schmetterling.", target: "schnappt", exp: "'schnappt' ist das Verb." },
  { text: "Wir wandern lange durch den dichten Dschungel.", target: "wandern", exp: "'wandern' ist das Verb. Das tun wir gerade." },
  { text: "Der bunte Frosch hüpft schnell ins tiefe Wasser.", target: "hüpft", exp: "'hüpft' ist das Verb." },
  { text: "Das laute Wasser rauscht an den dunklen Felsen.", target: "rauscht", exp: "'rauscht' ist das Verb." },
  { text: "Ein Affe wirft eine große Banane nach unten.", target: "wirft", exp: "'wirft' ist das Verb." },
  { text: "Der dicke Bär brummt gemütlich in seiner Höhle.", target: "brummt", exp: "'brummt' ist das Verb." },
  { text: "Wir trinken frisches Wasser aus dem kühlen Fluss.", target: "trinken", exp: "'trinken' ist das Verb." },
  // Runde 3
  { text: "Die kleine Fledermaus flattert durch die Nacht.", target: "flattert", exp: "'flattert' ist das Verb." },
  { text: "Der große Gorilla trommelt laut auf seine Brust.", target: "trommelt", exp: "'trommelt' ist das Verb." },
  { text: "Das hungrige Krokodil lauert im tiefen Schlamm.", target: "lauert", exp: "'lauert' ist das Verb." },
  { text: "Der bunte Tukan knackt die harten Nüsse.", target: "knackt", exp: "'knackt' ist das Verb." },
  { text: "Die kleinen Ameisen krabbeln über das Blatt.", target: "krabbeln", exp: "'krabbeln' ist das Verb." },
  { text: "Der flinke Affe schwingt an der grünen Liane.", target: "schwingt", exp: "'schwingt' ist das Verb." },
  { text: "Die alte Schildkröte schwimmt langsam im Fluss.", target: "schwimmt", exp: "'schwimmt' ist das Verb." },
  { text: "Wir packen unseren Rucksack für das Abenteuer.", target: "packen", exp: "'packen' ist das Verb." },
  { text: "Das kleine Affenbaby weint laut nach seiner Mutter.", target: "weint", exp: "'weint' ist das Verb." },
  { text: "Die schöne Blume duftet wunderbar im Dschungel.", target: "duftet", exp: "'duftet' ist das Verb." }
];

const sortierenWords = [
  // Runde 1
  { word: "rennen", category: "verb" }, { word: "Affe", category: "nomen" },
  { word: "springen", category: "verb" }, { word: "Baum", category: "nomen" },
  { word: "lachen", category: "verb" }, { word: "Löwe", category: "nomen" },
  { word: "suchen", category: "verb" }, { word: "Fluss", category: "nomen" },
  { word: "tauchen", category: "verb" }, { word: "Blatt", category: "nomen" },
  { word: "klettern", category: "verb" }, { word: "Boot", category: "nomen" },
  { word: "fliegen", category: "verb" }, { word: "Schatz", category: "nomen" },
  { word: "brüllen", category: "verb" }, { word: "Zelt", category: "nomen" },
  { word: "bauen", category: "verb" }, { word: "Spinne", category: "nomen" },
  { word: "schlafen", category: "verb" }, { word: "Tiger", category: "nomen" },
  // Runde 2
  { word: "schleichen", category: "verb" }, { word: "Frosch", category: "nomen" },
  { word: "jagen", category: "verb" }, { word: "Wasser", category: "nomen" },
  { word: "trinken", category: "verb" }, { word: "Höhle", category: "nomen" },
  { word: "weinen", category: "verb" }, { word: "Blume", category: "nomen" },
  { word: "essen", category: "verb" }, { word: "Schlange", category: "nomen" },
  { word: "schwimmen", category: "verb" }, { word: "Jeep", category: "nomen" },
  { word: "kriechen", category: "verb" }, { word: "Tempel", category: "nomen" },
  { word: "lesen", category: "verb" }, { word: "Buch", category: "nomen" },
  { word: "winken", category: "verb" }, { word: "Rucksack", category: "nomen" },
  { word: "rufen", category: "verb" }, { word: "Liane", category: "nomen" },
  // Runde 3
  { word: "flattern", category: "verb" }, { word: "Gorilla", category: "nomen" },
  { word: "trommeln", category: "verb" }, { word: "Nuss", category: "nomen" },
  { word: "krabbeln", category: "verb" }, { word: "Tukan", category: "nomen" },
  { word: "lauern", category: "verb" }, { word: "Brust", category: "nomen" },
  { word: "knacken", category: "verb" }, { word: "Fledermaus", category: "nomen" },
  { word: "schwingen", category: "verb" }, { word: "Schlamm", category: "nomen" },
  { word: "baden", category: "verb" }, { word: "Abenteuer", category: "nomen" },
  { word: "leuchten", category: "verb" }, { word: "Taschenlampe", category: "nomen" },
  { word: "forschen", category: "verb" }, { word: "Karte", category: "nomen" },
  { word: "entdecken", category: "verb" }, { word: "Kompass", category: "nomen" }
];

const textForscherData = [
  // Runde 1
  { text: "Der mutige Affe springt über den Bach. Er sucht eine süße Banane. Plötzlich brüllt der laute Löwe. Die grüne Schlange zischt im hohen Gras. Schnell klettert der Affe auf den Baum.", verbs: ["springt", "sucht", "brüllt", "zischt", "klettert"] },
  { text: "Der schwarze Panther schleicht durch den Wald. Er jagt seine Beute im Dunkeln. Ein kleiner Frosch hüpft schnell ins Wasser. Der Panther trinkt aus dem kühlen Fluss.", verbs: ["schleicht", "jagt", "hüpft", "trinkt"] },
  // Runde 2 (Fehlerbereinigt)
  { text: "Die fleißigen Ameisen bauen einen großen Hügel. Sie tragen schwere Blätter. Eine Ameise klettert auf den Stein. Sofort helfen die anderen Tiere.", verbs: ["bauen", "tragen", "klettert", "helfen"] },
  { text: "Wir wandern tief in den Dschungel. Das dichte Gras raschelt leise. Wir bauen unser Zelt am großen Wasserfall. Das laute Wasser rauscht die ganze Nacht.", verbs: ["wandern", "raschelt", "bauen", "rauscht"] },
  { text: "Der große Bär kratzt sich am Baum. Er brummt sehr zufrieden. Oben im Baum singt ein bunter Vogel. Der Bär sucht süßen Honig.", verbs: ["kratzt", "brummt", "singt", "sucht"] },
  // Runde 3 (Fehlerbereinigt)
  { text: "Ein riesiger Gorilla sitzt auf dem Felsen. Er isst gemütlich grüne Blätter. Die kleinen Gorillas spielen fröhlich. Ein Affenbaby fällt weich ins Moos.", verbs: ["sitzt", "isst", "spielen", "fällt"] },
  { text: "Der listige Fuchs versteckt sich im tiefen Bau. Er schläft am Tag. In der Nacht erwacht der Fuchs. Dann jagt er seine Beute.", verbs: ["versteckt", "schläft", "erwacht", "jagt"] },
  { text: "Die fleißigen Biber bauen einen starken Damm. Sie fällen viele Bäume. Das Wasser staut sich langsam. Ein Biber schwimmt schnell zum Ufer.", verbs: ["bauen", "fällen", "staut", "schwimmt"] },
  { text: "Der bunte Tukan fliegt über die Bäume. Er landet auf einem dicken Ast. Dort knackt er eine harte Nuss. Der Vogel genießt sein Frühstück.", verbs: ["fliegt", "landet", "knackt", "genießt"] },
  { text: "Die alte Eule wacht am späten Abend. Sie blickt durch die Dunkelheit. Plötzlich hört sie ein leises Geräusch. Die Eule startet ihren leisen Flug.", verbs: ["wacht", "blickt", "hört", "startet"] }
];

const paareData = [
  // Runde 1
  { left: "er lacht", right: "lachen" }, { left: "wir springen", right: "springen" },
  { left: "du malst", right: "malen" }, { left: "ich singe", right: "singen" },
  { left: "sie tanzt", right: "tanzen" }, { left: "es schläft", right: "schlafen" },
  { left: "ihr ruft", right: "rufen" }, { left: "ich lese", right: "lesen" },
  { left: "du isst", right: "essen" }, { left: "wir gehen", right: "gehen" },
  // Runde 2
  { left: "sie fliegt", right: "fliegen" }, { left: "er sucht", right: "suchen" },
  { left: "ihr taucht", right: "tauchen" }, { left: "ich weine", right: "weinen" },
  { left: "du baust", right: "bauen" }, { left: "wir klettern", right: "klettern" },
  { left: "es wächst", right: "wachsen" }, { left: "ich jage", right: "jagen" },
  { left: "er trinkt", right: "trinken" }, { left: "du schreibst", right: "schreiben" },
  // Runde 3
  { left: "wir rudern", right: "rudern" }, { left: "sie beißt", right: "beißen" },
  { left: "er frisst", right: "fressen" }, { left: "ich falle", right: "fallen" },
  { left: "ihr zieht", right: "ziehen" }, { left: "du schiebst", right: "schieben" },
  { left: "es blüht", right: "blühen" }, { left: "wir lauern", right: "lauern" },
  { left: "ich knacke", right: "knacken" }, { left: "sie krabbeln", right: "krabbeln" }
];

const highlightData = [
  // Runde 1
  { word: "lachen", stem: "lach", ending: "en" }, { word: "spielst", stem: "spiel", ending: "st" },
  { word: "sucht", stem: "such", ending: "t" }, { word: "rennen", stem: "renn", ending: "en" },
  { word: "springe", stem: "spring", ending: "e" }, { word: "baust", stem: "bau", ending: "st" },
  { word: "malt", stem: "mal", ending: "t" }, { word: "hören", stem: "hör", ending: "en" },
  // Runde 2
  { word: "lache", stem: "lach", ending: "e" }, { word: "singt", stem: "sing", ending: "t" },
  { word: "naschen", stem: "nasch", ending: "en" }, { word: "fängst", stem: "fäng", ending: "st" },
  { word: "schleicht", stem: "schleich", ending: "t" }, { word: "koche", stem: "koch", ending: "e" },
  { word: "weinst", stem: "wein", ending: "st" }, { word: "fliegen", stem: "flieg", ending: "en" },
  { word: "trinkt", stem: "trink", ending: "t" }, { word: "suchst", stem: "such", ending: "st" },
  // Runde 3
  { word: "sitzen", stem: "sitz", ending: "en" }, { word: "brennt", stem: "brenn", ending: "t" },
  { word: "erwachst", stem: "erwach", ending: "st" }, { word: "träumt", stem: "träum", ending: "t" },
  { word: "rutschen", stem: "rutsch", ending: "en" }, { word: "ziehe", stem: "zieh", ending: "e" },
  { word: "winken", stem: "wink", ending: "en" }, { word: "badet", stem: "bad", ending: "et" },
  { word: "jubeln", stem: "jubel", ending: "n" }, { word: "greifst", stem: "greif", ending: "st" }
];

const checklistData = [
  // Verben
  { word: "taucht", isVerb: true }, { word: "sucht", isVerb: true },
  { word: "lacht", isVerb: true }, { word: "rennt", isVerb: true },
  { word: "spielt", isVerb: true }, { word: "singen", isVerb: true },
  { word: "klettern", isVerb: true }, { word: "schleichen", isVerb: true },
  { word: "flüstert", isVerb: true }, { word: "gräbt", isVerb: true },
  { word: "hüpfen", isVerb: true }, { word: "winken", isVerb: true },
  { word: "packt", isVerb: true }, { word: "schwimmen", isVerb: true },
  { word: "forschen", isVerb: true }, { word: "knacken", isVerb: true },
  { word: "weinen", isVerb: true }, { word: "lauern", isVerb: true },
  { word: "blühen", isVerb: true }, { word: "krabbeln", isVerb: true },
  // Nomen
  { word: "Tisch", isVerb: false }, { word: "Baum", isVerb: false },
  { word: "Haus", isVerb: false }, { word: "Hund", isVerb: false },
  { word: "Affe", isVerb: false }, { word: "Forscher", isVerb: false },
  { word: "Rucksack", isVerb: false }, { word: "Zelt", isVerb: false },
  { word: "Liane", isVerb: false }, { word: "Tempel", isVerb: false },
  { word: "Taschenlampe", isVerb: false }, { word: "Karte", isVerb: false },
  { word: "Fluss", isVerb: false }, { word: "Schatz", isVerb: false },
  { word: "Kompass", isVerb: false }, { word: "Jeep", isVerb: false },
  // Adjektive
  { word: "schnell", isVerb: false }, { word: "schön", isVerb: false },
  { word: "groß", isVerb: false }, { word: "klein", isVerb: false },
  { word: "laut", isVerb: false }, { word: "grün", isVerb: false },
  { word: "gefährlich", isVerb: false }, { word: "mutig", isVerb: false },
  { word: "tief", isVerb: false }, { word: "dunkel", isVerb: false },
  { word: "hell", isVerb: false }, { word: "bunt", isVerb: false }
];

const conjugationData = [
  { inf: "suchen", forms: ["suche", "suchst", "sucht", "suchen", "sucht", "suchen"] },
  { inf: "lachen", forms: ["lache", "lachst", "lacht", "lachen", "lacht", "lachen"] },
  { inf: "spielen", forms: ["spiele", "spielst", "spielt", "spielen", "spielt", "spielen"] },
  { inf: "kaufen", forms: ["kaufe", "kaufst", "kauft", "kaufen", "kauft", "kaufen"] },
  { inf: "malen", forms: ["male", "malst", "malt", "malen", "malt", "malen"] },
  { inf: "fragen", forms: ["frage", "fragst", "fragt", "fragen", "fragt", "fragen"] },
  { inf: "lernen", forms: ["lerne", "lernst", "lernt", "lernen", "lernt", "lernen"] },
  { inf: "winken", forms: ["winke", "winkst", "winkt", "winken", "winkt", "winken"] },
  { inf: "hüpfen", forms: ["hüpfe", "hüpfst", "hüpft", "hüpfen", "hüpft", "hüpfen"] },
  { inf: "bauen", forms: ["baue", "baust", "baut", "bauen", "baut", "bauen"] },
  { inf: "weinen", forms: ["weine", "weinst", "weint", "weinen", "weint", "weinen"] },
  { inf: "jubeln", forms: ["jubele", "jubelst", "jubelt", "jubeln", "jubelt", "jubeln"] },
  { inf: "feiern", forms: ["feiere", "feierst", "feiert", "feiern", "feiert", "feiern"] }
];

const specialConjugationData = [
  { inf: "sein", forms: ["bin", "bist", "ist", "sind", "seid", "sind"] },
  { inf: "haben", forms: ["habe", "hast", "hat", "haben", "habt", "haben"] },
  { inf: "werden", forms: ["werde", "wirst", "wird", "werden", "werdet", "werden"] },
  { inf: "wollen", forms: ["will", "willst", "will", "wollen", "wollt", "wollen"] },
  { inf: "können", forms: ["kann", "kannst", "kann", "können", "könnt", "können"] },
  { inf: "dürfen", forms: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"] },
  { inf: "müssen", forms: ["muss", "musst", "muss", "müssen", "müsst", "müssen"] },
  { inf: "sollen", forms: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"] },
  { inf: "wissen", forms: ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"] },
  { inf: "mögen", forms: ["mag", "magst", "mag", "mögen", "mögt", "mögen"] },
  { inf: "sehen", forms: ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"] },
  { inf: "geben", forms: ["gebe", "gibst", "gibt", "geben", "gebt", "geben"] },
  { inf: "nehmen", forms: ["nehme", "nimmst", "nimmt", "nehmen", "nehmt", "nehmen"] },
  { inf: "lesen", forms: ["lese", "liest", "liest", "lesen", "lest", "lesen"] },
  { inf: "essen", forms: ["esse", "isst", "isst", "essen", "esst", "essen"] },
  { inf: "fahren", forms: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"] },
  { inf: "laufen", forms: ["laufe", "läufst", "läuft", "laufen", "lauft", "laufen"] }
];

const lueckenData = [
  // Runde 1
  { sentence: "Der kleine Affe ___ schnell auf den Baum.", base: "klettern", correct: "klettert" },
  { sentence: "Ich ___ eine große, gelbe Banane.", base: "essen", correct: "esse" },
  { sentence: "Wir ___ mutig durch den dunklen Dschungel.", base: "schleichen", correct: "schleichen" },
  { sentence: "Du ___ sehr gut über die Wurzeln.", base: "springen", correct: "springst" },
  { sentence: "Die bunten Papageien ___ über die Palmen.", base: "fliegen", correct: "fliegen" },
  { sentence: "Die grüne Schlange ___ leise im Gras.", base: "zischen", correct: "zischt" },
  { sentence: "Wir ___ ein großes Zelt aus Blättern.", base: "bauen", correct: "bauen" },
  { sentence: "Ihr ___ den versteckten Tempel ganz alleine.", base: "suchen", correct: "sucht" },
  { sentence: "Ich ___ laut, weil der Affe so lustig ist.", base: "lachen", correct: "lache" },
  // Runde 2
  { sentence: "Der Tiger ___ schnell durch den Wald.", base: "rennen", correct: "rennt" },
  { sentence: "Der Papagei ___ ein lautes Lied am Morgen.", base: "singen", correct: "singt" },
  { sentence: "Du ___ mit mir eine alte Schatzkarte.", base: "malen", correct: "malst" },
  { sentence: "Das Nilpferd ___ tief unter das Wasser.", base: "tauchen", correct: "taucht" },
  { sentence: "Wir ___ unsere Rucksäcke für die Reise.", base: "packen", correct: "packen" },
  { sentence: "Der Affe ___ fröhlich über die Wurzel.", base: "hüpfen", correct: "hüpft" },
  { sentence: "Du ___ dem Forscher zum Abschied zu.", base: "winken", correct: "winkst" },
  { sentence: "Ich ___ meiner Freundin den großen Wasserfall.", base: "zeigen", correct: "zeige" },
  { sentence: "Ihr ___ viel über die seltenen Pflanzen.", base: "lernen", correct: "lernt" },
  // Runde 3
  { sentence: "Der Entdecker ___ den Affen nach dem Weg.", base: "fragen", correct: "fragt" },
  { sentence: "Die Spinne ___ ein wunderschönes Netz.", base: "machen", correct: "macht" },
  { sentence: "Du ___ vorsichtig in die kleine Höhle.", base: "kriechen", correct: "kriechst" },
  { sentence: "Die Vögel ___ im warmen Sonnenlicht.", base: "baden", correct: "baden" },
  { sentence: "Das Lagerfeuer ___ gemütlich in der Nacht.", base: "knistern", correct: "knistert" },
  { sentence: "Ich ___ nach den süßen Beeren am Strauch.", base: "greifen", correct: "greife" },
  { sentence: "Ihr ___ vor Freude über den gefundenen Schatz.", base: "jubeln", correct: "jubelt" },
  { sentence: "Du ___ deine helle Taschenlampe sehr fest.", base: "halten", correct: "hältst" },
  { sentence: "Der Affe ___ eine Kokosnuss vom Baum.", base: "holen", correct: "holt" },
  { sentence: "Wir ___ gespannt dem Rauschen des Wasserfalls.", base: "lauschen", correct: "lauschen" },
  { sentence: "Die Forscherin ___ den bunten Vogel.", base: "zeichnen", correct: "zeichnet" }
];

const specialVerbsData = [
  // Runde 1
  { sentence: "Der Löwe ___ heute sehr laut.", base: "sein", correct: "ist" },
  { sentence: "Ich ___ großen Hunger auf eine Kokosnuss.", base: "haben", correct: "habe" },
  { sentence: "Wir ___ auf den hohen Baum klettern.", base: "wollen", correct: "wollen" },
  { sentence: "Du ___ wirklich sehr schnell rennen!", base: "können", correct: "kannst" },
  { sentence: "Ihr ___ eine tolle Schatzkarte gefunden.", base: "haben", correct: "habt" },
  { sentence: "Er ___ genau, wo der goldene Tempel liegt.", base: "wissen", correct: "weiß" },
  { sentence: "Das Krokodil ___ überhaupt keine Bananen.", base: "mögen", correct: "mag" },
  // Runde 2
  { sentence: "Wir ___ jetzt sofort weglaufen!", base: "müssen", correct: "müssen" },
  { sentence: "Du ___ noch viel lauter brüllen als der Löwe.", base: "können", correct: "kannst" },
  { sentence: "Ihr ___ nicht alleine in den dunklen Wald gehen!", base: "dürfen", correct: "dürft" },
  { sentence: "Ich ___ den großen Berg schon von weitem.", base: "sehen", correct: "sehe" },
  { sentence: "Der Forscher ___ unbedingt den Schatz finden.", base: "wollen", correct: "will" },
  { sentence: "Du ___ dir diese gefährliche Spinne nicht ansehen.", base: "sollen", correct: "sollst" },
  { sentence: "Der Gorilla ___ dem Affen eine Banane.", base: "geben", correct: "gibt" },
  // Runde 3
  { sentence: "Du ___ dir den besten Platz am Feuer.", base: "nehmen", correct: "nimmst" },
  { sentence: "Ich ___ ein spannendes Buch über Tiere.", base: "lesen", correct: "lese" },
  { sentence: "Wir ___ heute Abend eine leckere Suppe.", base: "essen", correct: "essen" },
  { sentence: "Ihr ___ mit dem Jeep durch den Sumpf.", base: "fahren", correct: "fahrt" },
  { sentence: "Der Tiger ___ lautlos durch das Gestrüpp.", base: "laufen", correct: "läuft" },
  { sentence: "Das Faultier ___ fast den ganzen Tag.", base: "schlafen", correct: "schläft" },
  { sentence: "Es ___ immer dunkler im Regenwald.", base: "werden", correct: "wird" }
];

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const getRandomErrorFeedback = () => {
  const msgs = ["Fast richtig! Probier es noch mal! 💪", "Nicht ganz! Versuch es gleich nochmal! 🐒", "Knapp daneben! Du schaffst das! 🌴", "Das war es nicht ganz, gleich hast du es! ✨", "Ups! Schau noch mal genau hin! 🔍"];
  return msgs[Math.floor(Math.random() * msgs.length)];
};

const getRandomSuccessFeedback = () => {
  const msgs = ["Super! 🌟", "Richtig! 🎉", "Klasse gemacht! 🚀", "Stark! 💪", "Genau so! ✨", "Perfekt! 🏆"];
  return msgs[Math.floor(Math.random() * msgs.length)];
};

const triggerHaptic = (isError = true) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(isError ? [50, 50, 50] : [50]);
  }
};

// ==========================================
// FEEDBACK HOOK (Sicheres Timer-Management)
// ==========================================
function useFeedback() {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("error");
  const timerRef = useRef(null);

  const showFeedback = (newMsg, newType = "error", duration = 4000) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMsg(newMsg);
    setType(newType);
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        setMsg("");
      }, duration);
    }
  };

  const clearFeedback = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMsg("");
  };

  return { msg, type, showFeedback, clearFeedback };
}

function SuccessSparkles({ size = 1 }) {
  const colors = ['text-lime-400', 'text-emerald-400', 'text-amber-300', 'text-yellow-400'];
  const icons = [Leaf, Gem, Sparkles]; 

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50" style={{ transform: `scale(${size})` }}>
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 + Math.random() * 15) * (Math.PI / 180);
        const dist = 50 + Math.random() * 50; 
        const tx = Math.cos(angle) * dist + 'px';
        const ty = Math.sin(angle) * dist + 'px';
        const rot = (Math.random() * 720 - 360) + 'deg';
        
        const colorClass = colors[i % colors.length];
        const Icon = icons[i % icons.length];
        
        return (
          <Icon 
            key={i} 
            className={`absolute ${colorClass} w-6 h-6 md:w-8 md:h-8 anim-burst drop-shadow-lg ${Icon !== Sparkles ? 'fill-current' : ''}`} 
            style={{ '--tx': tx, '--ty': ty, '--rot': rot }} 
          />
        );
      })}
    </div>
  );
}

function ImmediateFeedback({ msg, type = 'error' }) {
  const isError = type === 'error';
  const bgClass = isError 
    ? "bg-amber-900/95 text-amber-300 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.4)]" 
    : "bg-lime-900/95 text-lime-300 border-lime-500/50 shadow-[0_0_20px_rgba(132,204,22,0.4)]";
    
  return (
    <div className={`min-h-[3.5rem] flex items-center justify-center w-full transition-all duration-300 ${msg ? 'mt-2 mb-4' : ''}`}>
      {msg ? <span key={Math.random()} className={`font-bold px-6 py-3 rounded-full border-2 anim-pop text-lg md:text-xl z-50 flex items-center gap-2 ${bgClass}`}>{msg}</span> : null}
    </div>
  );
}

// ==========================================
// MODALS & HILFEN
// ==========================================
function RulesModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="bg-emerald-950 border-4 border-amber-500 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-[0_0_50px_rgba(251,191,36,0.3)] anim-pop relative flex flex-col max-h-[90vh]">
        <h3 className="text-2xl md:text-4xl font-black text-amber-400 mb-6 text-center flex justify-center items-center gap-3 drop-shadow-md">
          <BookOpen className="w-8 h-8 flex-shrink-0 anim-float" /> Die 3 Beweise
        </h3>
        <div className="flex flex-col gap-4 mb-6">
          <div className="bg-emerald-900/60 p-4 rounded-2xl border-l-8 border-lime-500">
             <h4 className="text-lime-300 font-bold text-xl flex items-center gap-2"><Leaf className="w-5 h-5"/> 1. Beweis</h4>
             <p className="text-emerald-100 mt-1">Ein Verb zeigt, was jemand/etwas tut oder was passiert.</p>
          </div>
          <div className="bg-emerald-900/60 p-4 rounded-2xl border-l-8 border-amber-500">
             <h4 className="text-amber-300 font-bold text-xl flex items-center gap-2"><Leaf className="w-5 h-5"/> 2. Beweis</h4>
             <p className="text-emerald-100 mt-1">Ein Verb hat eine Grundform.</p>
             <p className="text-amber-200 font-mono mt-2 bg-amber-900/40 p-2 rounded block">z.B.: lachen, suchen, rennen</p>
          </div>
          <div className="bg-emerald-900/60 p-4 rounded-2xl border-l-8 border-cyan-500">
             <h4 className="text-cyan-300 font-bold text-xl flex items-center gap-2"><Leaf className="w-5 h-5"/> 3. Beweis</h4>
             <p className="text-emerald-100 mt-1">Ein Verb hat Personalformen.</p>
             <div className="mt-2 bg-cyan-900/40 p-3 rounded-xl border border-cyan-700/50">
               <p className="text-cyan-100 text-xs mb-2 uppercase tracking-wide font-bold">Beispiel: malen</p>
               <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-cyan-200 font-mono text-sm md:text-base">
                 <span>ich mal<b>e</b></span>
                 <span>wir mal<b>en</b></span>
                 <span>du mal<b>st</b></span>
                 <span>ihr mal<b>t</b></span>
                 <span>er/sie/es mal<b>t</b></span>
                 <span>sie mal<b>en</b></span>
               </div>
             </div>
          </div>
        </div>
        <button onClick={onClose} className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-lg py-4 rounded-xl shadow-[0_4px_0_rgba(180,83,9,1)] active:translate-y-1 uppercase tracking-wider">Alles klar!</button>
      </div>
    </div>
  );
}

function ContextTipModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-emerald-950 border-4 border-lime-400 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-[0_0_40px_rgba(132,204,22,0.3)] anim-pop relative text-center">
        <div className="bg-lime-400/20 p-4 rounded-full inline-block mb-4"><Trees className="w-10 h-10 text-lime-400 anim-twinkle" /></div>
        <h3 className="text-2xl md:text-3xl font-black text-lime-400 mb-4">Tipp vom Forscher!</h3>
        <p className="text-emerald-50 text-lg md:text-xl mb-8 leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full bg-lime-500 hover:bg-lime-400 text-lime-950 font-black py-4 rounded-xl shadow-[0_4px_0_rgba(77,124,15,1)] active:translate-y-1 uppercase tracking-wider">Weiter geht's!</button>
      </div>
    </div>
  );
}

function HelpModal({ onClose }) {
  const helpData = [
    { title: "1. Tempel-Truhen", icon: Gem, play: "Sortiere nach Verb oder Nomen (Namenwort)." },
    { title: "2. Dschungel-Detektiv", icon: Binoculars, play: "Klicke im Satz auf das Verb." },
    { title: "3. Text-Expedition", icon: ScrollText, play: "Finde alle Verben im Text." },
    { title: "4. Wortstamm-Maler", icon: Paintbrush, play: "Markiere den Wortstamm gelb und die Endung rot!" },
    { title: "5. Verwandlungs-Tabelle", icon: RefreshCw, play: "Tippe die richtige Endung für regelmäßige Verben ein." },
    { title: "6. Grundform-Lianen", icon: Leaf, play: "Verbinde das veränderte Verb mit seiner Grundform (-en)." },
    { title: "7. Lücken-Brücke", icon: Route, play: "Tippe das Verb in der richtigen Form in die Lücke ein." },
    { title: "8. Forscher-Beweis", icon: Fingerprint, play: "Kreuze die zutreffenden Beweise an. Bei mindestens 2 Häkchen ist es ein Verb!" },
    { title: "9. Besondere Verben untersuchen", icon: Crown, play: "Fülle die Tabelle komplett mit schwierigen Verben aus." },
    { title: "10. Besondere Verben in Texten", icon: Wand2, play: "Tippe die richtige Form der unregelmäßigen Verben ein." }
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="bg-stone-900 border-4 border-emerald-500 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-[0_0_50px_rgba(16,185,129,0.3)] anim-pop relative flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl md:text-4xl font-black text-emerald-400 flex items-center gap-3 drop-shadow-md">
            <HelpCircle className="w-8 h-8 flex-shrink-0 anim-float" /> Dschungel-Hilfe
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-full p-2 transition-colors">✕</button>
        </div>
        <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {helpData.map((game, i) => (
              <div key={i} className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 flex gap-4 items-start">
                <game.icon className="w-8 h-8 text-lime-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-200 mb-1">{game.title}</h4>
                  <p className="text-sm text-stone-400 leading-snug">{game.play}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Schatzkammer
function TreasureModal({ onClose, gameProgress }) {
  const treasures = [
    { id: 'sortieren', name: "Grüner Smaragd", icon: Gem, color: "text-emerald-400", bg: "bg-emerald-900/40", border: "border-emerald-500", level: "1. Tempel-Truhen" },
    { id: 'suchen', name: "Goldener Kompass", icon: Compass, color: "text-amber-400", bg: "bg-amber-900/40", border: "border-amber-500", level: "2. Dschungel-Detektiv" },
    { id: 'textforscher', name: "Geheime Karte", icon: Map, color: "text-amber-200", bg: "bg-amber-800/40", border: "border-amber-300", level: "3. Text-Expedition" },
    { id: 'marker', name: "Magischer Pinsel", icon: Paintbrush, color: "text-fuchsia-400", bg: "bg-fuchsia-900/40", border: "border-fuchsia-500", level: "4. Wortstamm-Maler" },
    { id: 'tabelle', name: "Alter Schlüssel", icon: Key, color: "text-stone-300", bg: "bg-stone-700/40", border: "border-stone-400", level: "5. Verwandlungs-Tabelle" },
    { id: 'paare', name: "Goldenes Blatt", icon: Leaf, color: "text-lime-400", bg: "bg-lime-900/40", border: "border-lime-500", level: "6. Grundform-Lianen" },
    { id: 'luecken', name: "Dschungel-Medaille", icon: Award, color: "text-orange-400", bg: "bg-orange-900/40", border: "border-orange-500", level: "7. Lücken-Brücke" },
    { id: 'beweis', name: "Forscher-Stempel", icon: Fingerprint, color: "text-teal-400", bg: "bg-teal-900/40", border: "border-teal-500", level: "8. Forscher-Beweis" },
    { id: 'spezialtabelle', name: "Affenkrone", icon: Crown, color: "text-yellow-400", bg: "bg-yellow-900/40", border: "border-yellow-500", level: "9. Besondere Verben untersuchen" },
    { id: 'spezial', name: "Riesige Schatztruhe", icon: Box, color: "text-amber-500", bg: "bg-amber-900/60", border: "border-amber-400", level: "10. Besondere Verben in Texten" }
  ];

  const totalUnlocked = treasures.filter(t => (gameProgress[t.id]?.score || 0) >= 10).length;

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[150] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border-4 border-yellow-500 rounded-3xl max-w-5xl w-full p-6 md:p-8 shadow-[0_0_60px_rgba(250,204,21,0.2)] anim-pop relative flex flex-col max-h-[95vh]">
        <div className="flex justify-between items-center mb-6 border-b-2 border-stone-800 pb-4">
          <h3 className="text-3xl md:text-5xl font-black text-yellow-400 flex items-center gap-4 drop-shadow-md">
            <Crown className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 anim-float" /> Die Schatzkammer
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-full p-3 transition-colors">✕</button>
        </div>
        
        <p className="text-stone-300 text-lg md:text-xl mb-6 text-center font-bold">
          Sammle <span className="text-yellow-400">volle 10 Sterne</span> in einer Übung, um den Schatz freizuschalten! <br/>
          <span className="text-sm opacity-70">Gefundene Schätze: {totalUnlocked} / 10</span>
        </p>

        <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {treasures.map((treasure) => {
              const score = gameProgress[treasure.id]?.score || 0;
              const isUnlocked = score >= 10;

              return (
                <div key={treasure.id} className={`relative flex flex-col items-center p-4 rounded-2xl border-4 transition-all duration-500 ${isUnlocked ? `${treasure.bg} ${treasure.border} shadow-[0_0_20px_rgba(0,0,0,0.5)] transform hover:scale-105 hover:z-10` : 'bg-stone-950/80 border-stone-800'}`}>
                  <div className="h-20 w-20 flex items-center justify-center relative mb-3">
                    {isUnlocked ? (
                      <>
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl anim-hud"></div>
                        <treasure.icon className={`w-14 h-14 ${treasure.color} drop-shadow-lg anim-float`} />
                        <SuccessSparkles size={0.5} />
                      </>
                    ) : (
                      <>
                        <treasure.icon className="w-12 h-12 text-stone-800 drop-shadow-none" />
                        <Lock className="w-8 h-8 text-stone-500 absolute drop-shadow-md" />
                      </>
                    )}
                  </div>
                  
                  <h4 className={`font-black text-center text-sm md:text-base leading-tight mb-1 min-h-[2.5rem] flex items-center justify-center ${isUnlocked ? treasure.color : 'text-stone-600'}`}>
                    {isUnlocked ? treasure.name : '???'}
                  </h4>
                  
                  <div className={`w-full text-center text-[10px] md:text-xs font-bold py-1 px-2 rounded-lg mt-auto ${isUnlocked ? 'bg-yellow-500/20 text-yellow-200' : 'bg-stone-800 text-stone-500'}`}>
                    {isUnlocked ? 'Freigeschaltet!' : `Fehlt in: ${treasure.level}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {totalUnlocked === 10 && (
          <div className="mt-6 p-4 bg-yellow-900/40 border-2 border-yellow-500 rounded-xl text-center anim-pop">
            <h4 className="text-yellow-400 font-black text-xl flex items-center justify-center gap-2"><Star className="w-6 h-6 fill-yellow-400" /> Meister des Dschungels! <Star className="w-6 h-6 fill-yellow-400" /></h4>
            <p className="text-yellow-100/80 mt-1">Du hast alle Schätze gefunden. Fantastische Leistung!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// THEMATISCHE MINISPIELE (10 PUNKTE MAX PRO SPIEL)
// ==========================================

// 1. Verben-Safari
function FindWordGame({ onFinish, onShowTip }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0); 
  const [wrongTries, setWrongTries] = useState(0);
  const [consecMistakes, setConsecMistakes] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [clickedWords, setClickedWords] = useState([]); 
  const { msg: feedbackMsg, type: feedbackType, showFeedback, clearFeedback } = useFeedback();

  useEffect(() => { setQuestions(shuffleArray(suchenData).slice(0, 5)); }, []);
  if (questions.length === 0) return null;
  const currentQ = questions[currentIndex];
  const words = currentQ.text.split(' ');

  const handleWordClick = (word, index) => {
    if (showSolution || clickedWords.includes(index)) return;
    const cleanWord = word.replace(/[^a-zA-ZäöüÄÖÜß]/g, '').toLowerCase();
    setClickedWords(prev => [...prev, index]);
    
    if (cleanWord === currentQ.target.toLowerCase()) {
      triggerHaptic(false);
      setConsecMistakes(0); 
      showFeedback(getRandomSuccessFeedback(), "success", 2000);
      if (wrongTries === 0) setScore(s => s + 2); 
      setShowSolution(true);
    } else {
      triggerHaptic(true);
      const newM = consecMistakes + 1;
      if (newM >= 3) {
        onShowTip("Ein Verb ist ein Tuwort. Es sagt dir, was jemand macht oder was passiert.");
        setConsecMistakes(0);
        clearFeedback();
      } else {
        setConsecMistakes(newM);
        showFeedback(getRandomErrorFeedback(), "error", 4000);
      }
      setWrongTries(p => p + 1);
    }
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl text-emerald-300 font-black mb-4 flex items-center justify-center gap-3"><Binoculars className="w-8 h-8 anim-float" /> Dschungel-Detektiv</h2>
      <p className="text-stone-300 text-lg mb-4 italic">Klicke auf das Verb im Satz.</p>
      
      <div className="flex flex-wrap justify-center mb-6 bg-stone-900/60 p-6 md:p-10 rounded-3xl border-4 border-stone-700/50 shadow-inner text-left leading-[3rem] text-2xl md:text-3xl font-serif text-stone-100 select-none">
        {words.map((word, index) => {
          const isClicked = clickedWords.includes(index);
          const isTarget = word.replace(/[^a-zA-ZäöüÄÖÜß]/g, '').toLowerCase() === currentQ.target.toLowerCase();
          let spanClass = "relative px-1 md:px-2 rounded-lg cursor-pointer transition-all duration-300 ";
          
          if (showSolution) {
            if (isTarget) spanClass += "bg-emerald-600 text-white font-black shadow-[0_0_15px_rgba(5,150,105,0.8)] scale-110 z-10 inline-block ";
            else spanClass += "text-stone-500 opacity-50 ";
          } else if (isClicked) {
            spanClass += "text-rose-400 line-through decoration-rose-500 decoration-4 opacity-70 anim-shake inline-block ";
          } else {
            spanClass += "hover:bg-stone-700/50 hover:text-emerald-200 text-stone-200 ";
          }

          return (
            <span key={index} onClick={() => handleWordClick(word, index)} className={spanClass}>
              {word}{' '}
              {showSolution && isTarget && <SuccessSparkles size={1} />}
            </span>
          );
        })}
      </div>

      <ImmediateFeedback msg={feedbackMsg} type={feedbackType} />

      {showSolution && (
        <div className="anim-pop">
          <div className="bg-emerald-950/80 p-4 rounded-xl mb-6 text-left"><p className="text-emerald-300 text-center">{currentQ.exp}</p></div>
          <button onClick={() => { if(currentIndex+1<questions.length) { setCurrentIndex(c=>c+1); setShowSolution(false); setClickedWords([]); setWrongTries(0); clearFeedback(); } else onFinish(score, 10); }} className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl mt-4 shadow-lg transition-all active:scale-95">Weiter</button>
        </div>
      )}
    </div>
  );
}

// 2. Wort-Truhen
function SortingGame({ onFinish, onShowTip }) {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0); 
  const [consecMistakes, setConsecMistakes] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const { msg: feedbackMsg, type: feedbackType, showFeedback, clearFeedback } = useFeedback();

  useEffect(() => { setWords(shuffleArray(sortierenWords).slice(0, 10)); }, []);
  if (words.length === 0) return null;
  const currentQ = words[currentIndex];

  const handleSort = (category) => {
    if (showSolution || wrongGuesses.includes(category)) return;
    if (category === currentQ.category) {
      triggerHaptic(false);
      setConsecMistakes(0); 
      showFeedback(getRandomSuccessFeedback(), "success", 1500);
      if (wrongGuesses.length === 0) setScore(s => s + 1); 
      setShowSolution(true);
      setTimeout(() => { if (currentIndex < words.length - 1) { setCurrentIndex(c=>c+1); setShowSolution(false); setWrongGuesses([]); clearFeedback(); } else onFinish(score + (wrongGuesses.length === 0 ? 1 : 0), 10); }, 1500); 
    } else {
      triggerHaptic(true);
      const newM = consecMistakes + 1;
      if (newM >= 3) {
        onShowTip("Kannst du es tun (Verb) oder ist es ein Name für ein Ding, ein Tier oder einen Menschen (Nomen)?");
        setConsecMistakes(0);
        clearFeedback();
      } else {
        setConsecMistakes(newM);
        showFeedback(getRandomErrorFeedback(), "error", 4000);
      }
      setWrongGuesses(prev => [...prev, category]);
    }
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl text-amber-400 font-black mb-2 flex items-center justify-center gap-3"><Gem className="w-8 h-8 anim-float" /> Tempel-Truhen</h2>
      <p className="text-amber-100/70 text-lg mb-10">Ist das Wort ein Verb oder ein Nomen?</p>
      
      <div className="flex justify-center mb-10 h-32 items-center">
        <div className={`text-5xl font-bold bg-stone-900 border-4 py-6 px-16 rounded-2xl transition-all ${showSolution ? 'border-amber-400 text-amber-300 scale-50 opacity-0 translate-y-16 duration-500' : (wrongGuesses.length > 0 ? 'border-red-800 text-red-500 anim-shake' : 'border-stone-600 text-stone-100')}`}>{currentQ.word}</div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
        <button onClick={() => handleSort('verb')} disabled={showSolution} className={`relative flex-1 flex flex-col justify-center items-center p-6 rounded-2xl border-4 h-[140px] ${showSolution && currentQ.category === 'verb' ? 'anim-chest-bounce border-amber-400 bg-amber-800 z-10 shadow-[0_0_30px_rgba(251,191,36,0.5)]' : wrongGuesses.includes('verb') ? 'border-stone-800 bg-stone-900 text-stone-700 anim-shake' : 'border-amber-700 bg-amber-900/60 hover:bg-amber-800'}`}>
          <span className="text-3xl font-black text-amber-400">Verb</span>
          {showSolution && currentQ.category === 'verb' && <SuccessSparkles size={1.5} />}
        </button>
        <button onClick={() => handleSort('nomen')} disabled={showSolution} className={`relative flex-1 flex flex-col justify-center items-center p-6 rounded-2xl border-4 h-[140px] ${showSolution && currentQ.category === 'nomen' ? 'anim-chest-bounce border-amber-400 bg-amber-800 z-10 shadow-[0_0_30px_rgba(251,191,36,0.5)]' : wrongGuesses.includes('nomen') ? 'border-stone-800 bg-stone-900 text-stone-700 anim-shake' : 'border-amber-700 bg-amber-900/60 hover:bg-amber-800'}`}>
          <span className="text-3xl font-black text-amber-400 mb-1">Nomen</span><span className="text-amber-100/80">(Namenwort)</span>
          {showSolution && currentQ.category === 'nomen' && <SuccessSparkles size={1.5} />}
        </button>
      </div>
      
      <ImmediateFeedback msg={feedbackMsg} type={feedbackType} />
    </div>
  );
}

// 3. Text-Forscher
function TextForscherGame({ onFinish, onShowTip }) {
  const [words, setWords] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [consecMistakes, setConsecMistakes] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [totalVerbs, setTotalVerbs] = useState(0);
  const { msg: feedbackMsg, type: feedbackType, showFeedback, clearFeedback } = useFeedback();

  useEffect(() => {
    const randomTextObj = shuffleArray([...textForscherData])[0];
    setTotalVerbs(randomTextObj.verbs.length);
    
    const wordArray = randomTextObj.text.split(' ').map((w, i) => {
      const clean = w.replace(/[^a-zA-ZäöüÄÖÜß]/g, '').toLowerCase();
      return { id: i, text: w, isVerb: randomTextObj.verbs.includes(clean), selected: false, confirmed: false, wrong: false };
    });
    setWords(wordArray);
  }, []);

  const selectedCount = words.filter(w => w.selected).length;

  const handleWordClick = (index) => {
    if (isFinished || words[index].confirmed || words[index].wrong) return;
    const newWords = [...words];
    newWords[index].selected = !newWords[index].selected;
    setWords(newWords);
  };

  const handleCheck = () => {
    if (isFinished) return;
    
    let errorsFound = false;
    let correctCount = 0;

    const checkedWords = words.map(w => {
       if (w.selected) {
          if (!w.isVerb) {
             errorsFound = true;
             return { ...w, wrong: true };
          } else {
             correctCount++;
             return w;
          }
       }
       return w;
    });

    if (errorsFound) {
       triggerHaptic(true);
       const newM = consecMistakes + 1;
       if (newM >= 3) {
           onShowTip("Ein Verb sagt, was jemand macht. Du kannst Wörter auch wieder abwählen, wenn du dich vertippt hast!");
           setConsecMistakes(0);
           clearFeedback();
       } else {
           setConsecMistakes(newM);
           showFeedback("Oops! Da haben sich falsche Wörter eingeschlichen. 🐒", "error", 4000);
       }
       setMistakes(m => m + 1);
       setWords(checkedWords);
       
       setTimeout(() => {
          setWords(curr => curr.map(w => w.wrong ? { ...w, wrong: false, selected: false } : w));
       }, 4000);

    } else if (correctCount < totalVerbs) {
       triggerHaptic(true);
       showFeedback(`Das sind erst ${correctCount} von ${totalVerbs} Verben! Such noch weiter.`, "error", 4000);
    } else {
       triggerHaptic(false);
       setConsecMistakes(0);
       showFeedback(getRandomSuccessFeedback(), "success", 3000);
       setWords(checkedWords.map(w => w.selected ? { ...w, confirmed: true, selected: false } : w));
       setIsFinished(true);
    }
  };

  const finishGame = () => {
    let finalScore = 10 - mistakes;
    if (finalScore < 2) finalScore = 2;
    onFinish(finalScore, 10);
  };

  if (words.length === 0) return null;

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl text-teal-300 font-black mb-2 flex items-center justify-center gap-3"><ScrollText className="w-8 h-8 anim-float" /> Text-Expedition</h2>
      <p className="text-stone-300 text-lg mb-8">Markiere alle <strong className="text-teal-400">{totalVerbs} Verben</strong> im Text und klicke dann auf Prüfen!</p>
      
      <div className="bg-stone-900/60 p-6 md:p-10 rounded-3xl border-4 border-teal-800/50 mb-6 shadow-inner text-left leading-[3rem] text-2xl md:text-3xl font-serif text-stone-100 select-none">
        {words.map((wordObj) => {
          let btnClass = "relative text-stone-200 hover:text-teal-200 cursor-pointer transition-all duration-200 px-1 rounded";
          
          if (wordObj.confirmed) {
             btnClass = "relative bg-teal-600 text-white font-bold shadow-[0_0_15px_rgba(13,148,136,0.6)] px-2 rounded-lg anim-pop inline-block";
          } else if (wordObj.wrong) {
             btnClass = "relative text-rose-500 font-bold anim-shake inline-block bg-rose-900/30 px-2 border-b-4 border-rose-500 rounded-lg";
          } else if (wordObj.selected) {
             btnClass = "relative bg-teal-500/40 text-teal-100 font-bold border-b-4 border-teal-300 px-2 rounded-lg inline-block transform -translate-y-1";
          }
          
          return (
            <span key={wordObj.id} onClick={() => handleWordClick(wordObj.id)} className={btnClass}>
              {wordObj.text}{' '}
              {wordObj.confirmed && <SuccessSparkles size={1} />}
            </span>
          );
        })}
      </div>

      <div className="flex justify-between items-center max-w-md mx-auto bg-stone-900 p-4 rounded-2xl border-2 border-stone-700 mb-4">
         <span className="text-stone-400 font-bold">Markiert: <span className="text-teal-400 text-2xl">{selectedCount} / {totalVerbs}</span></span>
         <span className="text-stone-400 font-bold">Fehlversuche: <span className="text-rose-400 text-xl">{mistakes}</span></span>
      </div>

      <ImmediateFeedback msg={feedbackMsg} type={feedbackType} />

      {!isFinished ? (
        <button onClick={handleCheck} className="bg-teal-600 hover:bg-teal-500 text-white font-black py-4 px-12 rounded-xl text-xl shadow-lg active:scale-95 transition-all mt-2">Prüfen</button>
      ) : (
        <div className="anim-pop mt-2 flex flex-col items-center">
          <p className="text-teal-400 font-bold text-3xl mb-4 flex items-center gap-2"><Check className="w-8 h-8"/> Alle Verben entdeckt!</p>
          <button onClick={finishGame} className="bg-stone-700 hover:bg-stone-600 text-white font-black py-4 px-12 rounded-xl text-xl transition-all active:scale-95">Super, weiter!</button>
        </div>
      )}
    </div>
  );
}

// 4. Wortstamm-Marker
function HighlightGame({ onFinish, onShowTip }) {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [activeMarker, setActiveMarker] = useState('stem'); 
  const [letterColors, setLetterColors] = useState({});
  const [showSolution, setShowSolution] = useState(false);
  const [mistakesMade, setMistakesMade] = useState(0);
  const [consecMistakes, setConsecMistakes] = useState(0);
  const { msg: feedbackMsg, type: feedbackType, showFeedback, clearFeedback } = useFeedback();

  const resetWord = (wordObj) => {
    if(!wordObj) return; const initialColors = {};
    for(let i=0; i<wordObj.word.length; i++) initialColors[i] = 'none';
    setLetterColors(initialColors); setActiveMarker('stem'); setShowSolution(false); setMistakesMade(0); clearFeedback();
  };

  useEffect(() => { 
    const shuffled = shuffleArray(highlightData).slice(0, 5); 
    setWords(shuffled); 
    resetWord(shuffled[0]); 
  }, []);

  if (words.length === 0) return null;
  const currentQ = words[currentIndex]; const letters = currentQ.word.split('');

  const toggleLetter = (index) => { 
    if (showSolution) return; 
    setLetterColors(prev => {
      const newColors = { ...prev };
      if (activeMarker === 'stem') {
        for (let i = 0; i <= index; i++) newColors[i] = 'stem';
      } else {
        for (let i = index; i < letters.length; i++) newColors[i] = 'ending';
      }
      return newColors;
    }); 
  };

  const checkAnswer = () => {
    let isCorrect = true;
    for (let i=0; i<letters.length; i++) { if (letterColors[i] !== (i < currentQ.stem.length ? 'stem' : 'ending')) isCorrect = false; }
    
    if (isCorrect) { 
      triggerHaptic(false);
      setConsecMistakes(0); 
      showFeedback(getRandomSuccessFeedback(), "success", 3000);
      if (mistakesMade === 0) setScore(s => s + 2); 
      setShowSolution(true); 
    } else { 
      triggerHaptic(true);
      const newM = consecMistakes + 1;
      if (newM >= 3) {
        onShowTip("Der Wortstamm bleibt oft gleich, die Endung (wie -en, -st, -t) hängt hinten dran!");
        setConsecMistakes(0);
        clearFeedback();
      } else {
        setConsecMistakes(newM);
        showFeedback(getRandomErrorFeedback(), "error", 4000);
      }
      setMistakesMade(m => m + 1); 
    }
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl text-yellow-400 font-black mb-2 flex items-center justify-center gap-3"><Paintbrush className="w-8 h-8 anim-float" /> Wortstamm-Maler</h2>
      <p className="text-stone-300 text-lg mb-8">
        Markiere den <strong className="text-yellow-400">Wortstamm gelb</strong> und die <strong className="text-red-500">Endung rot</strong>.<br/>
        <span className="text-sm opacity-70">(Tipp: Ein Klick reicht, und der Marker füllt den Bereich automatisch aus!)</span>
      </p>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-10">
        <button onClick={() => setActiveMarker('stem')} className={`relative flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-black text-xl transition-all duration-300 ${activeMarker === 'stem' ? 'bg-yellow-400 text-yellow-950 shadow-[0_0_30px_rgba(250,204,21,0.6)] scale-110 -translate-y-1' : 'bg-stone-800 text-yellow-400 border-2 border-stone-700 hover:border-yellow-400/50 hover:bg-stone-700'}`}>
           <Paintbrush className={activeMarker === 'stem' ? 'animate-bounce' : ''} /> Stamm-Marker
        </button>
        <button onClick={() => setActiveMarker('ending')} className={`relative flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-black text-xl transition-all duration-300 ${activeMarker === 'ending' ? 'bg-red-500 text-red-950 shadow-[0_0_30px_rgba(239,68,68,0.6)] scale-110 -translate-y-1' : 'bg-stone-800 text-red-500 border-2 border-stone-700 hover:border-red-500/50 hover:bg-stone-700'}`}>
           <Paintbrush className={activeMarker === 'ending' ? 'animate-bounce' : ''} /> Endungs-Marker
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <div className={`inline-flex bg-stone-900/80 p-4 md:p-8 rounded-[2rem] border-4 border-stone-700/50 shadow-inner select-none touch-none relative ${showSolution ? 'anim-pop border-lime-500/50 shadow-[0_0_30px_rgba(132,204,22,0.3)]' : ''}`}>
          {showSolution && <SuccessSparkles size={2.5} />}
          {letters.map((char, index) => {
            let bgClass = "text-stone-300"; // Ungemarkert
            if (letterColors[index] === 'stem') bgClass = "bg-yellow-400 text-yellow-950 font-black";
            if (letterColors[index] === 'ending') bgClass = "bg-red-500 text-red-950 font-black";

            let roundedClass = "";
            if (letterColors[index] !== 'none') {
               if (index === 0 || letterColors[index - 1] !== letterColors[index]) roundedClass += " rounded-l-xl";
               if (index === letters.length - 1 || letterColors[index + 1] !== letterColors[index]) roundedClass += " rounded-r-xl";
            }

            return (
              <span 
                key={index} 
                onPointerDown={() => toggleLetter(index)} 
                onPointerEnter={(e) => { if (e.buttons === 1) toggleLetter(index); }} 
                className={`text-5xl md:text-7xl font-bold py-2 px-1 md:px-2 cursor-pointer transition-all duration-200 ${bgClass} ${roundedClass}`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
      
      <ImmediateFeedback msg={feedbackMsg} type={feedbackType} />

      {!showSolution ? (
        <button onClick={checkAnswer} className="bg-stone-200 hover:bg-white text-stone-900 font-black py-4 px-12 rounded-xl text-xl shadow-lg transition-all active:scale-95">Prüfen</button>
      ) : (
        <button onClick={() => { if(currentIndex+1 < words.length) { setCurrentIndex(c=>c+1); resetWord(words[currentIndex+1]); } else onFinish(score, 10); }} className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-12 rounded-xl text-xl shadow-[0_0_20px_rgba(16,185,129,0.5)] anim-pop active:scale-95">Nächstes Wort</button>
      )}
    </div>
  );
}

// 5. Verben-Tabelle (NUR REGELMÄSSIGE)
function ConjugationTableGame({ onFinish, onShowTip }) {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie (Mehrzahl)'];
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [validation, setValidation] = useState([null, null, null, null, null, null]);
  const [showSolution, setShowSolution] = useState(false);
  const [mistakesMade, setMistakesMade] = useState(0);
  const [consecMistakes, setConsecMistakes] = useState(0);
  const { msg: feedbackMsg, type: feedbackType, showFeedback, clearFeedback } = useFeedback();

  useEffect(() => { setWords(shuffleArray(conjugationData).slice(0, 5)); }, []);
  if (words.length === 0) return null;
  const currentQ = words[currentIndex];

  const checkAnswers = () => {
    let allCorrect = true; const newValidation = [];
    inputs.forEach((input, i) => {
      const isCorrect = input.trim().toLowerCase() === currentQ.forms[i].toLowerCase();
      newValidation.push(isCorrect ? 'correct' : 'error'); if (!isCorrect) allCorrect = false;
    });
    setValidation(newValidation);
    
    if (allCorrect) { 
      triggerHaptic(false);
      setConsecMistakes(0); 
      showFeedback(getRandomSuccessFeedback(), "success", 3000);
      if (mistakesMade === 0) setScore(s => s + 2); 
      setShowSolution(true); 
    } else { 
      triggerHaptic(true);
      const newM = consecMistakes + 1;
      if (newM >= 3) {
        onShowTip("Gehe die Personalformen durch: ich (-e), du (-st), er/sie/es (-t), wir (-en), ihr (-t), sie (-en).");
        setConsecMistakes(0);
        clearFeedback();
      } else {
        setConsecMistakes(newM);
        showFeedback(getRandomErrorFeedback(), "error", 4000);
      }
      setMistakesMade(m => m + 1); 
    }
  };

  const handleKeyDown = (e) => {
      if (e.key === 'Enter' && inputs.every(val => val.trim() !== "")) checkAnswers();
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl text-orange-400 font-black mb-2 flex items-center justify-center gap-3"><LayoutGrid className="w-8 h-8 anim-float" /> Verwandlungs-Tabelle</h2>
      <p className="text-stone-300 text-lg mb-8">Konjugiere das regelmäßige Verb: <strong className="text-orange-400 text-2xl uppercase tracking-widest bg-orange-900/30 px-3 py-1 rounded-lg ml-2 border border-orange-500/30">{currentQ.inf}</strong></p>
      
      <div className={`bg-[#8B5A2B] p-4 md:p-8 rounded-2xl border-8 border-[#5C3A21] max-w-4xl mx-auto mb-6 relative shadow-xl transition-all ${showSolution ? 'border-lime-500 shadow-[0_0_30px_rgba(132,204,22,0.5)] anim-pop' : ''}`}>
        {showSolution && <SuccessSparkles size={2.5} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative z-10">
          
          <div className="flex flex-col gap-3">
            <h3 className="text-orange-200 font-black text-2xl text-center border-b-4 border-[#7A4B24] pb-2 mb-2 uppercase tracking-widest">Einzahl</h3>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between bg-[#A06934] p-3 rounded-lg border-2 border-[#7A4B24]">
                <span className="text-orange-100 font-bold text-lg md:text-xl w-28 md:w-32">{pronouns[i]}</span>
                <input type="text" autoCapitalize="none" autoCorrect="off" spellCheck="false" value={inputs[i]} onKeyDown={handleKeyDown} onChange={(e) => { if(showSolution) return; const n = [...inputs]; n[i] = e.target.value; setInputs(n); }} disabled={showSolution} className={`w-28 md:w-36 text-xl font-bold p-2 rounded outline-none border-2 text-center ${validation[i] === 'correct' ? 'border-lime-400 bg-lime-900/50 text-lime-200' : validation[i] === 'error' ? 'border-rose-500 bg-rose-900/50 text-rose-200 anim-shake' : 'border-[#5C3A21] bg-[#C18A57] text-[#3E2723]'}`} />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-orange-200 font-black text-2xl text-center border-b-4 border-[#7A4B24] pb-2 mb-2 uppercase tracking-widest">Mehrzahl</h3>
            {[3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between bg-[#A06934] p-3 rounded-lg border-2 border-[#7A4B24]">
                <span className="text-orange-100 font-bold text-lg md:text-xl w-36 md:w-40">{pronouns[i]}</span>
                <input type="text" autoCapitalize="none" autoCorrect="off" spellCheck="false" value={inputs[i]} onKeyDown={handleKeyDown} onChange={(e) => { if(showSolution) return; const n = [...inputs]; n[i] = e.target.value; setInputs(n); }} disabled={showSolution} className={`w-28 md:w-36 text-xl font-bold p-2 rounded outline-none border-2 text-center ${validation[i] === 'correct' ? 'border-lime-400 bg-lime-900/50 text-lime-200' : validation[i] === 'error' ? 'border-rose-500 bg-rose-900/50 text-rose-200 anim-shake' : 'border-[#5C3A21] bg-[#C18A57] text-[#3E2723]'}`} />
              </div>
            ))}
          </div>

        </div>
      </div>

      <ImmediateFeedback msg={feedbackMsg} type={feedbackType} />

      {!showSolution ? (
         <button onClick={checkAnswers} className="bg-orange-600 hover:bg-orange-500 text-white font-black py-4 px-12 rounded-xl text-xl shadow-lg transition-all active:scale-95">Prüfen</button> 
      ) : (
         <button onClick={() => { if(currentIndex+1 < words.length) { setCurrentIndex(c=>c+1); setInputs(['','','','','','']); setValidation([null,null,null,null,null,null]); setShowSolution(false); setMistakesMade(0); clearFeedback(); } else onFinish(score, 10); }} className="bg-stone-700 hover:bg-stone-600 text-white font-black py-4 px-12 rounded-xl text-xl transition-all active:scale-95">Nächstes Verb</button>
      )}
    </div>
  );
}

// 6. Lianen-Paare (Grundform finden)
function MatchingGame({ onFinish, onShowTip }) {
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0); 
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

  const [matchedIds, setMatchedIds] = useState([]);
  const [failedPairs, setFailedPairs] = useState([]); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [consecMistakes, setConsecMistakes] = useState(0);
  const { msg: feedbackMsg, type: feedbackType, showFeedback, clearFeedback } = useFeedback();

  // Drag & Drop / Lianen State
  const containerRef = useRef(null);
  const itemRefs = useRef({});
  const [activeDrag, setActiveDrag] = useState(null);
  const [lineCoords, setLineCoords] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [animatingMatch, setAnimatingMatch] = useState(null);
  const [animatingError, setAnimatingError] = useState(null);

  useEffect(() => {
    const availablePairs = shuffleArray([...paareData]);
    const generatedRounds = [];
    for (let r = 0; r < 2; r++) {
      let roundPairs = []; let usedRights = new Set();
      for (let i = 0; i < availablePairs.length; i++) {
        const pair = availablePairs[i];
        if (!usedRights.has(pair.right)) { roundPairs.push(pair); usedRights.add(pair.right); availablePairs.splice(i, 1); i--; }
        if (roundPairs.length === 5) break;
      }
      generatedRounds.push(roundPairs);
    }
    setRounds(generatedRounds); setupRound(generatedRounds[0]);
  }, []);

  const setupRound = (pairs) => {
    const withIds = pairs.map((p, i) => ({ ...p, id: i }));
    setLeftItems(shuffleArray(withIds.map(p => ({ id: p.id, text: p.left }))));
    setRightItems(shuffleArray(withIds.map(p => ({ id: p.id, text: p.right }))));
    setMatchedIds([]);
    setFailedPairs([]); 
    clearFeedback();
    setSelectedLeft(null);
    setSelectedRight(null);
    setActiveDrag(null);
    setAnimatingMatch(null);
    setAnimatingError(null);
    setIsProcessing(false);
  };

  const updateCoords = () => {
    if (!containerRef.current) return;
    const coords = {};
    const containerRect = containerRef.current.getBoundingClientRect();

    matchedIds.forEach(id => {
      const leftEl = itemRefs.current[`left-${id}`];
      const rightEl = itemRefs.current[`right-${id}`];
      if (leftEl && rightEl) {
        const lRect = leftEl.getBoundingClientRect();
        const rRect = rightEl.getBoundingClientRect();
        coords[id] = {
          x1: lRect.left - containerRect.left + lRect.width / 2,
          y1: lRect.top - containerRect.top + lRect.height / 2,
          x2: rRect.left - containerRect.left + rRect.width / 2,
          y2: rRect.top - containerRect.top + rRect.height / 2,
        };
      }
    });
    setLineCoords(coords);
  };

  useEffect(() => {
    updateCoords();
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, [matchedIds, leftItems, rightItems]);

  const getCenter = (el) => {
    const rect = el.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2
    };
  };

  const handleMatchAttempt = (leftId, rightId) => {
    setIsProcessing(true);
    if (leftId === rightId) {
      triggerHaptic(false);
      setConsecMistakes(0); 
      showFeedback(getRandomSuccessFeedback(), "success", 1500);
      
      setAnimatingMatch(leftId);
      setMatchedIds(prev => [...prev, leftId]);
      if (!failedPairs.includes(leftId)) setScore(s => s + 1); 
      
      setTimeout(() => {
         setAnimatingMatch(null);
         setIsProcessing(false);
      }, 1500);
    } else {
      triggerHaptic(true);
      const newM = consecMistakes + 1;
      if (newM >= 3) {
        onShowTip("Tipp: Verbinde immer das rot wackelnde Wort mit seiner Grundform (endet meist auf -en)!");
        setConsecMistakes(0);
        clearFeedback();
      } else {
        setConsecMistakes(newM);
        showFeedback(getRandomErrorFeedback(), "error", 4000);
      }
      setFailedPairs(prev => [...prev, leftId, rightId]);
      setAnimatingError({ leftId, rightId });
      
      setTimeout(() => { 
        setAnimatingError(null); 
        setIsProcessing(false); 
      }, 4000);
    }
  };

  const handlePointerDown = (e, item, side) => {
    if (isProcessing || matchedIds.includes(item.id)) return;
    e.preventDefault();

    if (side === 'right' && selectedLeft) {
        handleMatchAttempt(selectedLeft.id, item.id);
        setSelectedLeft(null);
        return;
    }
    if (side === 'left' && selectedRight) {
        handleMatchAttempt(item.id, selectedRight.id);
        setSelectedRight(null);
        return;
    }

    const center = getCenter(e.currentTarget);
    setActiveDrag({ item, side, startX: center.x, startY: center.y, x: center.x, y: center.y });

    if (side === 'left') { setSelectedLeft(item); setSelectedRight(null); }
    else { setSelectedRight(item); setSelectedLeft(null); }
  };

  const handlePointerMove = (e) => {
    if (!activeDrag) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    setActiveDrag(prev => ({ ...prev, x: e.clientX - containerRect.left, y: e.clientY - containerRect.top }));
  };

  const handlePointerUp = (e) => {
    if (!activeDrag) return;
    const dragInfo = activeDrag;
    setActiveDrag(null);

    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;
    const targetBtn = el.closest('[data-item="true"]');

    if (targetBtn) {
        const targetId = parseInt(targetBtn.getAttribute('data-id'), 10);
        const targetSide = targetBtn.getAttribute('data-side');
        
        if (targetSide !== dragInfo.side && !matchedIds.includes(targetId) && !isProcessing) {
            let leftId = dragInfo.side === 'left' ? dragInfo.item.id : targetId;
            let rightId = dragInfo.side === 'right' ? dragInfo.item.id : targetId;
            setSelectedLeft(null);
            setSelectedRight(null);
            handleMatchAttempt(leftId, rightId);
        }
    }
  };

  useEffect(() => {
    if (matchedIds.length === 5 && rounds.length > 0) { 
      setTimeout(() => {
        if (currentRound < rounds.length - 1) { setCurrentRound(c => c + 1); setupRound(rounds[currentRound + 1]); } 
        else onFinish(score, 10); 
      }, 1500); 
    }
  }, [matchedIds]);

  if (rounds.length === 0) return null;

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl text-lime-400 font-black mb-1 flex items-center justify-center gap-3"><Leaf className="w-8 h-8 anim-float" /> Grundform-Lianen</h2>
      <p className="text-lime-100/80 text-lg mb-8">Ziehe eine Liane vom veränderten Verb zu seiner Grundform!</p>
      
      <div 
        ref={containerRef}
        className="relative flex justify-center gap-8 md:gap-24 mb-6 max-w-4xl mx-auto touch-none select-none py-4"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          {matchedIds.map(id => {
            const c = lineCoords[id];
            if(!c) return null;
            const d = `M ${c.x1} ${c.y1} Q ${(c.x1+c.x2)/2} ${Math.max(c.y1, c.y2) + 40} ${c.x2} ${c.y2}`;
            return (
              <g key={id}>
                <path d={d} stroke="#14532d" strokeWidth="8" fill="none" strokeLinecap="round" className="drop-shadow-md" />
                <path d={d} stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            );
          })}
          {activeDrag && (
            <g>
              <path d={`M ${activeDrag.startX} ${activeDrag.startY} Q ${(activeDrag.startX + activeDrag.x)/2} ${Math.max(activeDrag.startY, activeDrag.y) + 40} ${activeDrag.x} ${activeDrag.y}`} stroke="#14532d" strokeWidth="8" fill="none" strokeLinecap="round" className="drop-shadow-lg opacity-80" />
              <path d={`M ${activeDrag.startX} ${activeDrag.startY} Q ${(activeDrag.startX + activeDrag.x)/2} ${Math.max(activeDrag.startY, activeDrag.y) + 40} ${activeDrag.x} ${activeDrag.y}`} stroke="#bef264" strokeWidth="3" strokeDasharray="6, 6" fill="none" strokeLinecap="round" />
            </g>
          )}
        </svg>

        <div className="flex flex-col gap-4 w-1/2 z-10">
          {leftItems.map(item => {
            const isMatched = matchedIds.includes(item.id); 
            const isSelected = selectedLeft?.id === item.id;
            const isWrong = animatingError && animatingError.leftId === item.id;
            const isJustMatched = animatingMatch === item.id;
            
            let btnClass = isMatched ? "bg-lime-900/30 border-lime-500/50 text-lime-500 opacity-30" : isWrong ? "bg-red-900/80 border-red-500 text-red-200 anim-shake" : isSelected ? "bg-yellow-600 border-yellow-300 text-white shadow-[0_0_15px_rgba(250,204,21,0.6)] scale-105" : "bg-teal-950/90 border-teal-700 text-teal-100 hover:border-lime-400";
            
            return (
              <button 
                key={item.id} 
                ref={(el) => (itemRefs.current[`left-${item.id}`] = el)}
                data-item="true" data-id={item.id} data-side="left"
                onPointerDown={(e) => handlePointerDown(e, item, 'left')} 
                disabled={isMatched || isProcessing} 
                className={`relative py-4 px-2 md:px-4 rounded-xl border-2 font-bold text-lg md:text-xl transition-all shadow-md ${btnClass} ${isJustMatched ? 'anim-pop shadow-[0_0_20px_rgba(132,204,22,0.8)] z-10' : ''}`}
              >
                {item.text}
                {isJustMatched && <SuccessSparkles size={1.2} />}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 w-1/2 z-10">
          {rightItems.map(item => {
            const isMatched = matchedIds.includes(item.id); 
            const isSelected = selectedRight?.id === item.id;
            const isWrong = animatingError && animatingError.rightId === item.id;
            const isJustMatched = animatingMatch === item.id;

            let btnClass = isMatched ? "bg-lime-900/30 border-lime-500/50 text-lime-500 opacity-30" : isWrong ? "bg-red-900/80 border-red-500 text-red-200 anim-shake" : isSelected ? "bg-yellow-600 border-yellow-300 text-white shadow-[0_0_15px_rgba(250,204,21,0.6)] scale-105" : "bg-teal-950/90 border-teal-700 text-teal-100 hover:border-lime-400";
            
            return (
              <button 
                key={item.id} 
                ref={(el) => (itemRefs.current[`right-${item.id}`] = el)}
                data-item="true" data-id={item.id} data-side="right"
                onPointerDown={(e) => handlePointerDown(e, item, 'right')} 
                disabled={isMatched || isProcessing} 
                className={`relative py-4 px-2 md:px-4 rounded-xl border-2 font-bold text-lg md:text-xl transition-all shadow-md ${btnClass} ${isJustMatched ? 'anim-pop shadow-[0_0_20px_rgba(132,204,22,0.8)] z-10' : ''}`}
              >
                {item.text}
                {isJustMatched && <SuccessSparkles size={1.2} />}
              </button>
            );
          })}
        </div>
      </div>

      <ImmediateFeedback msg={feedbackMsg} type={feedbackType} />
    </div>
  );
}

// 7. Affen-Lücken
function LueckenGame({ onFinish, onShowTip }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0); 
  const [textInput, setTextInput] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [mistakesMade, setMistakesMade] = useState(0);
  const [consecMistakes, setConsecMistakes] = useState(0);
  const { msg: feedbackMsg, type: feedbackType, showFeedback, clearFeedback } = useFeedback();

  useEffect(() => { setQuestions(shuffleArray(lueckenData).slice(0, 5)); }, []);
  if (questions.length === 0) return null;
  const currentQ = questions[currentIndex];

  const handleInput = () => {
    if (showSolution || !textInput.trim()) return;
    if (textInput.trim().toLowerCase() === currentQ.correct.toLowerCase()) { 
      triggerHaptic(false);
      setConsecMistakes(0); 
      showFeedback(getRandomSuccessFeedback(), "success", 3000);
      if (mistakesMade === 0) setScore(s => s + 2); 
      setShowSolution(true); 
    } else { 
      triggerHaptic(true);
      const newM = consecMistakes + 1;
      if (newM >= 3) {
        onShowTip("Lies den Satz einmal laut vor. Wie muss die Endung des Verbs klingen, damit es zur Person passt?");
        setConsecMistakes(0);
        clearFeedback();
      } else {
        setConsecMistakes(newM);
        showFeedback(getRandomErrorFeedback(), "error", 4000);
      }
      setMistakesMade(m => m + 1); 
    }
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl text-orange-400 font-black mb-2 flex items-center justify-center gap-3"><Route className="w-8 h-8 anim-float" /> Lücken-Brücke</h2>
      <p className="text-orange-200/70 text-lg mb-8">Tippe die richtige Form in die Lücke. Die Grundform leuchtet über dem Satz!</p>
      
      <div className="bg-stone-900/60 p-6 md:p-10 rounded-3xl border-2 border-orange-500/30 mb-6 flex flex-col items-center">
        
        <div className="mb-10 anim-float">
          <span className="text-sm uppercase tracking-widest text-orange-400 font-bold block mb-2 opacity-80">Grundform</span>
          <span className="inline-block bg-orange-950 border-4 border-orange-400 text-orange-300 font-black text-4xl md:text-5xl px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(251,146,60,0.3)]">
            {currentQ.base}
          </span>
        </div>

        <div className="text-2xl md:text-4xl text-stone-100 w-full text-center leading-relaxed">
          {currentQ.sentence.split('___')[0]}
          {!showSolution ? (
            <input type="text" autoCapitalize="none" autoCorrect="off" spellCheck="false" value={textInput} onChange={e => setTextInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleInput()} autoFocus className="w-32 md:w-40 text-center font-bold outline-none border-b-4 bg-transparent border-orange-500/50 focus:border-orange-300 text-orange-200 mx-2 text-3xl pb-1" />
          ) : (
            <span className="relative inline-block px-3 border-b-4 border-orange-400 text-orange-300 anim-pop mx-2 font-black z-10">
              {currentQ.correct}
              <SuccessSparkles size={1.3} />
            </span>
          )}
          {currentQ.sentence.split('___')[1]}
        </div>
      </div>

      <ImmediateFeedback msg={feedbackMsg} type={feedbackType} />

      {!showSolution ? (
        <button onClick={handleInput} disabled={!textInput.trim()} className="bg-orange-600 hover:bg-orange-500 text-white font-black py-4 px-12 rounded-xl text-xl shadow-lg transition-all active:scale-95">Überprüfen</button> 
      ) : (
        <button onClick={() => { if(currentIndex+1 < questions.length) { setCurrentIndex(c=>c+1); setTextInput(""); setShowSolution(false); setMistakesMade(0); clearFeedback(); } else onFinish(score, 10); }} className="bg-stone-700 hover:bg-stone-600 text-white font-black py-4 px-12 rounded-xl text-xl mt-2 transition-all active:scale-95">Nächster Satz</button>
      )}
    </div>
  );
}

// 8. Forscher-Beweis (Checkliste)
function BeweisGame({ onFinish, onShowTip }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0); 
  const [checks, setChecks] = useState([false, false, false]);
  const [showSolution, setShowSolution] = useState(false);
  const [mistakesMade, setMistakesMade] = useState(0);
  const [consecMistakes, setConsecMistakes] = useState(0);
  const { msg: feedbackMsg, type: feedbackType, showFeedback, clearFeedback } = useFeedback();

  useEffect(() => { 
    setQuestions(shuffleArray(checklistData).slice(0, 5)); 
  }, []);

  if (questions.length === 0) return null;
  const currentQ = questions[currentIndex];
  
  const checkedCount = checks.filter(Boolean).length;
  const isSelectedVerb = checkedCount >= 2;

  const toggleCheck = (i) => {
    if(showSolution) return;
    const newChecks = [...checks];
    newChecks[i] = !newChecks[i];
    setChecks(newChecks);
  };

  const handleCheck = () => {
    if (isSelectedVerb === currentQ.isVerb) {
       triggerHaptic(false);
       setConsecMistakes(0); 
       showFeedback(getRandomSuccessFeedback(), "success", 3000);
       if(mistakesMade === 0) setScore(s => s + 2);
       setShowSolution(true);
    } else { 
       triggerHaptic(true);
       const newM = consecMistakes + 1;
       if (newM >= 3) {
         onShowTip("Nutze die 3 Beweise: Jemand tut etwas? Gibt es eine Grundform? Kannst du 'ich' oder 'du' davorsetzen?");
         setConsecMistakes(0);
         clearFeedback();
       } else {
         setConsecMistakes(newM);
         showFeedback(getRandomErrorFeedback(), "error", 4000);
       }
       setMistakesMade(m => m + 1);
    }
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl text-fuchsia-400 font-black mb-2 flex items-center justify-center gap-3"><Fingerprint className="w-8 h-8 anim-float" /> Forscher-Beweis</h2>
      <p className="text-fuchsia-200/70 text-lg mb-8">Kreuze an, welche Beweise klappen. Bei <b className="text-fuchsia-400">2 oder 3 Häkchen</b> ist es ein Verb!</p>
      
      <div className="bg-stone-900/80 p-6 md:p-8 rounded-[2rem] border-4 border-fuchsia-800/50 mb-6 w-full max-w-2xl mx-auto flex flex-col items-center shadow-xl">
        <span className="text-stone-400 font-bold mb-4 uppercase tracking-widest text-sm">Prüfe dieses Wort:</span>
        <span className="text-5xl font-black text-white bg-fuchsia-900/40 px-8 py-4 rounded-2xl border-2 border-fuchsia-500/50 mb-8 shadow-[0_0_30px_rgba(217,70,239,0.3)]">{currentQ.word}</span>

        <div className="flex flex-col gap-3 w-full max-w-md">
          {["1. Jemand tut etwas / es passiert", "2. Es gibt eine Grundform (Endung -en)", "3. Personalformen (ich..., du...)"].map((text, i) => (
            <button key={i} onClick={() => toggleCheck(i)} disabled={showSolution} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all w-full text-left active:scale-95 ${checks[i] ? 'bg-fuchsia-900/60 border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.4)]' : 'bg-stone-800 border-stone-700 hover:border-stone-500'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 flex-shrink-0 transition-colors ${checks[i] ? 'bg-fuchsia-500 border-fuchsia-300' : 'bg-stone-900 border-stone-600'}`}>
                {checks[i] && <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />}
              </div>
              <span className={`font-bold text-sm md:text-lg ${checks[i] ? 'text-fuchsia-100' : 'text-stone-300'}`}>{text}</span>
            </button>
          ))}
        </div>

        <div className={`mt-6 p-4 md:p-6 rounded-2xl w-full border-4 flex flex-col items-center transition-colors duration-500 ${showSolution ? 'border-lime-500 bg-lime-900/30' : 'border-stone-700 bg-stone-950/50'}`}>
          <span className="text-stone-400 font-bold mb-2 uppercase tracking-widest text-sm">Deine Einschätzung:</span>
          {showSolution ? (
            <span className="relative font-black text-2xl md:text-3xl text-lime-400 anim-pop">
               Richtig! Es ist {currentQ.isVerb ? 'ein' : 'KEIN'} Verb.
               <SuccessSparkles size={1.5} />
            </span>
          ) : (
            <>
              {isSelectedVerb ? <span className="font-black text-3xl md:text-4xl text-fuchsia-400 anim-pop">Verb</span> : <span className="font-black text-3xl md:text-4xl text-stone-500 transition-colors">Kein Verb</span>}
              <span className="text-stone-500 text-xs font-bold mt-2">({checkedCount} von 3 Beweisen)</span>
            </>
          )}
        </div>
      </div>

      <ImmediateFeedback msg={feedbackMsg} type={feedbackType} />

      {!showSolution ? (
         <button onClick={handleCheck} className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black py-4 px-12 rounded-xl text-xl shadow-lg transition-all active:scale-95">Überprüfen</button>
      ) : (
         <button onClick={() => { if(currentIndex+1<questions.length) { setCurrentIndex(c=>c+1); setShowSolution(false); setChecks([false,false,false]); setMistakesMade(0); clearFeedback(); } else onFinish(score, 10); }} className="bg-stone-700 hover:bg-stone-600 text-white font-black py-4 px-12 rounded-xl text-xl transition-all active:scale-95">Nächstes Wort</button>
      )}
    </div>
  );
}

// 9. Spezial-Tabelle (NUR UNREGELMÄSSIGE)
function SpecialTableGame({ onFinish, onShowTip }) {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie (Mehrzahl)'];
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [validation, setValidation] = useState([null, null, null, null, null, null]);
  const [showSolution, setShowSolution] = useState(false);
  const [mistakesMade, setMistakesMade] = useState(0);
  const [consecMistakes, setConsecMistakes] = useState(0);
  const { msg: feedbackMsg, type: feedbackType, showFeedback, clearFeedback } = useFeedback();

  useEffect(() => { setWords(shuffleArray(specialConjugationData).slice(0, 5)); }, []);
  if (words.length === 0) return null;
  const currentQ = words[currentIndex];

  const checkAnswers = () => {
    let allCorrect = true; const newValidation = [];
    inputs.forEach((input, i) => {
      const isCorrect = input.trim().toLowerCase() === currentQ.forms[i].toLowerCase();
      newValidation.push(isCorrect ? 'correct' : 'error'); if (!isCorrect) allCorrect = false;
    });
    setValidation(newValidation);
    
    if (allCorrect) { 
      triggerHaptic(false);
      setConsecMistakes(0); 
      showFeedback(getRandomSuccessFeedback(), "success", 3000);
      if (mistakesMade === 0) setScore(s => s + 2); 
      setShowSolution(true); 
    } else { 
      triggerHaptic(true);
      const newM = consecMistakes + 1;
      if (newM >= 3) {
        onShowTip("Diese Verben sind unregelmäßig! Überlege, wie du das Wort im Alltag benutzt.");
        setConsecMistakes(0);
        clearFeedback();
      } else {
        setConsecMistakes(newM);
        showFeedback(getRandomErrorFeedback(), "error", 4000);
      }
      setMistakesMade(m => m + 1); 
    }
  };

  const handleKeyDown = (e) => {
      if (e.key === 'Enter' && inputs.every(val => val.trim() !== "")) checkAnswers();
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl text-emerald-400 font-black mb-2 flex items-center justify-center gap-3"><Crown className="w-8 h-8 anim-float" /> Besondere Verben untersuchen</h2>
      <p className="text-stone-300 text-lg mb-8">Konjugiere das unregelmäßige Verb: <strong className="text-emerald-400 text-2xl uppercase tracking-widest bg-emerald-900/30 px-3 py-1 rounded-lg ml-2 border border-emerald-500/30">{currentQ.inf}</strong></p>
      
      <div className={`bg-teal-900 p-4 md:p-8 rounded-2xl border-8 border-teal-950 max-w-4xl mx-auto mb-6 relative shadow-xl transition-all ${showSolution ? 'border-lime-500 shadow-[0_0_30px_rgba(132,204,22,0.5)] anim-pop' : ''}`}>
        {showSolution && <SuccessSparkles size={2.5} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative z-10">
          
          <div className="flex flex-col gap-3">
            <h3 className="text-emerald-300 font-black text-2xl text-center border-b-4 border-teal-800 pb-2 mb-2 uppercase tracking-widest">Einzahl</h3>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between bg-teal-800 p-3 rounded-lg border-2 border-teal-700">
                <span className="text-emerald-100 font-bold text-lg md:text-xl w-28 md:w-32">{pronouns[i]}</span>
                <input type="text" autoCapitalize="none" autoCorrect="off" spellCheck="false" value={inputs[i]} onKeyDown={handleKeyDown} onChange={(e) => { if(showSolution) return; const n = [...inputs]; n[i] = e.target.value; setInputs(n); }} disabled={showSolution} className={`w-28 md:w-36 text-xl font-bold p-2 rounded outline-none border-2 text-center ${validation[i] === 'correct' ? 'border-lime-400 bg-lime-900/50 text-lime-200' : validation[i] === 'error' ? 'border-rose-500 bg-rose-900/50 text-rose-200 anim-shake' : 'border-teal-950 bg-teal-700 text-teal-100'}`} />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-emerald-300 font-black text-2xl text-center border-b-4 border-teal-800 pb-2 mb-2 uppercase tracking-widest">Mehrzahl</h3>
            {[3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between bg-teal-800 p-3 rounded-lg border-2 border-teal-700">
                <span className="text-emerald-100 font-bold text-lg md:text-xl w-36 md:w-40">{pronouns[i]}</span>
                <input type="text" autoCapitalize="none" autoCorrect="off" spellCheck="false" value={inputs[i]} onKeyDown={handleKeyDown} onChange={(e) => { if(showSolution) return; const n = [...inputs]; n[i] = e.target.value; setInputs(n); }} disabled={showSolution} className={`w-28 md:w-36 text-xl font-bold p-2 rounded outline-none border-2 text-center ${validation[i] === 'correct' ? 'border-lime-400 bg-lime-900/50 text-lime-200' : validation[i] === 'error' ? 'border-rose-500 bg-rose-900/50 text-rose-200 anim-shake' : 'border-teal-950 bg-teal-700 text-teal-100'}`} />
              </div>
            ))}
          </div>

        </div>
      </div>

      <ImmediateFeedback msg={feedbackMsg} type={feedbackType} />

      {!showSolution ? (
         <button onClick={checkAnswers} className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-12 rounded-xl text-xl shadow-lg transition-all active:scale-95">Prüfen</button> 
      ) : (
         <button onClick={() => { if(currentIndex+1 < words.length) { setCurrentIndex(c=>c+1); setInputs(['','','','','','']); setValidation([null,null,null,null,null,null]); setShowSolution(false); setMistakesMade(0); clearFeedback(); } else onFinish(score, 10); }} className="bg-stone-700 hover:bg-stone-600 text-white font-black py-4 px-12 rounded-xl text-xl transition-all active:scale-95">Nächstes Verb</button>
      )}
    </div>
  );
}

// 10. Spezial-Verben in Texten
function SpecialVerbsGame({ onFinish, onShowTip }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [mistakesMade, setMistakesMade] = useState(0);
  const [consecMistakes, setConsecMistakes] = useState(0);
  const { msg: feedbackMsg, type: feedbackType, showFeedback, clearFeedback } = useFeedback();

  useEffect(() => { setQuestions(shuffleArray(specialVerbsData).slice(0, 5)); }, []);
  if (questions.length === 0) return null;
  const currentQ = questions[currentIndex];

  const handleInput = () => {
    if (showSolution || !textInput.trim()) return;
    if (textInput.trim().toLowerCase() === currentQ.correct.toLowerCase()) { 
      triggerHaptic(false);
      setConsecMistakes(0);
      showFeedback(getRandomSuccessFeedback(), "success", 3000);
      if (mistakesMade === 0) setScore(s => s + 2); 
      setShowSolution(true); 
    } else { 
      triggerHaptic(true);
      const newM = consecMistakes + 1;
      if (newM >= 3) {
        onShowTip("Lies den Satz laut vor. Bei unregelmäßigen Verben verändert sich manchmal sogar der Vokal im Wort!");
        setConsecMistakes(0);
        clearFeedback();
      } else {
        setConsecMistakes(newM);
        showFeedback(getRandomErrorFeedback(), "error", 4000);
      }
      setMistakesMade(m => m + 1); 
    }
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl text-emerald-300 font-black mb-2 flex items-center justify-center gap-3"><Wand2 className="w-8 h-8 anim-float" /> Besondere Verben in Texten</h2>
      <p className="text-stone-300 text-lg mb-8">Tippe die richtige Form in die Lücke. Die Grundform leuchtet über dem Satz!</p>
      
      <div className="bg-stone-900/60 p-6 md:p-10 rounded-3xl border-2 border-emerald-500/30 mb-6 flex flex-col items-center">
        
        <div className="mb-10 anim-float">
          <span className="text-sm uppercase tracking-widest text-emerald-400 font-bold block mb-2 opacity-80">Grundform</span>
          <span className="inline-block bg-emerald-950 border-4 border-emerald-400 text-emerald-300 font-black text-4xl md:text-5xl px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(52,211,153,0.3)]">
            {currentQ.base}
          </span>
        </div>

        <div className="text-2xl md:text-4xl text-stone-100 w-full text-center leading-relaxed">
          {currentQ.sentence.split('___')[0]}
          {!showSolution ? (
            <input type="text" autoCapitalize="none" autoCorrect="off" spellCheck="false" value={textInput} onChange={e => setTextInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleInput()} autoFocus className="w-32 md:w-40 text-center font-bold outline-none border-b-4 bg-transparent border-emerald-500/50 focus:border-emerald-300 text-emerald-200 mx-2 text-3xl pb-1" />
          ) : (
            <span className="relative inline-block px-3 border-b-4 border-emerald-400 text-emerald-300 anim-pop mx-2 font-black z-10">
              {currentQ.correct}
              <SuccessSparkles size={1.3} />
            </span>
          )}
          {currentQ.sentence.split('___')[1]}
        </div>
      </div>

      <ImmediateFeedback msg={feedbackMsg} type={feedbackType} />

      {!showSolution ? (
        <button onClick={handleInput} disabled={!textInput.trim()} className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-12 rounded-xl text-xl shadow-lg transition-all active:scale-95">Überprüfen</button> 
      ) : (
        <button onClick={() => { if(currentIndex+1 < questions.length) { setCurrentIndex(c=>c+1); setTextInput(""); setShowSolution(false); setMistakesMade(0); clearFeedback(); } else onFinish(score, 10); }} className="bg-stone-700 hover:bg-stone-600 text-white font-black py-4 px-12 rounded-xl text-xl mt-2 transition-all active:scale-95">Nächster Satz</button>
      )}
    </div>
  );
}

// ==========================================
// HAUPT-APP (Menü-Steuerung)
// ==========================================
// ==========================================
// IMPRESSUM & DATENSCHUTZ
// ==========================================
// Der gesamte Rechtstext steht in dieser einen Komponente (gleicher Text wie in den Schwester-Apps).
// Erreichbar ohne Passwort über die Fußzeile im Menü und über den Link im Lehrer-Bereich (Zahnrad).
// section = 'datenschutz' springt beim Öffnen direkt zum Abschnitt „Datenschutz“.
const IMPRESSUM_EMAIL = 'p.brandsch@ggs-roesrath.de';
const GITHUB_PRIVACY_URL = 'https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement';

function ImpressumModal({ onClose, section }) {
  const datenschutzRef = useRef(null);
  useEffect(() => {
    if (section === 'datenschutz' && datenschutzRef.current) datenschutzRef.current.scrollIntoView({ block: 'start' });
  }, [section]);

  const Mail = () => <a href={`mailto:${IMPRESSUM_EMAIL}`} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200 break-all">{IMPRESSUM_EMAIL}</a>;
  const H2 = ({ children, innerRef }) => <h4 ref={innerRef} className="text-xl font-bold text-yellow-200 mt-6 mb-2 scroll-mt-2">{children}</h4>;
  const H3 = ({ children }) => <h5 className="font-bold text-slate-100 mt-4 mb-1">{children}</h5>;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[250] flex items-center justify-center p-4">
      <div className="bg-slate-900 border-4 border-slate-500 rounded-3xl max-w-2xl w-full shadow-[0_0_40px_rgba(148,163,184,0.25)] relative flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-start gap-4 p-5 md:p-6 pb-3 border-b-2 border-slate-800">
          <div className="text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Impressum &amp; Datenschutz</h3>
            <p className="text-slate-400 italic">Infos für Erwachsene</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full p-2 transition-colors flex-shrink-0">✕</button>
        </div>

        <div className="overflow-y-auto px-5 md:px-6 pb-6 text-left text-slate-300 leading-relaxed">
          <H2>Impressum</H2>
          <p>Angaben gemäß § 18 Abs. 1 Medienstaatsvertrag (MStV)</p>
          <p className="mt-3">Peter Brandsch<br />Sandweg 13<br />51503 Rösrath</p>
          <p className="mt-3">E-Mail: <Mail /></p>
          <p className="mt-3">Die große Verben-Expedition ist ein kostenloses Lernangebot ohne Werbung.</p>

          <H3>Haftung für Inhalte</H3>
          <p>Die Inhalte dieser App wurden mit großer Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Hinweise auf Fehler nehme ich gern per E-Mail entgegen.</p>

          <H3>Urheberrecht und Lizenzen</H3>
          <p>
            Texte, Aufgaben, Figuren und Gestaltung der App: © 2026 Peter Brandsch.<br />
            Verwendete Bausteine anderer Urheber:<br />
            – Schriftart „Fredoka“: SIL Open Font License 1.1<br />
            – Symbole: Lucide (ISC-Lizenz)<br />
            – React (MIT-Lizenz), Tailwind CSS (MIT-Lizenz)
          </p>

          <H2 innerRef={datenschutzRef}>Datenschutz</H2>

          <H3>1. Verantwortlich</H3>
          <p>Peter Brandsch, Sandweg 13, 51503 Rösrath, E-Mail: <Mail /></p>

          <H3>2. Das Wichtigste in Kürze</H3>
          <p>Die App funktioniert ohne Anmeldung und ohne Namen. Sie setzt keine Cookies, speichert nichts im Browser und verwendet keine Analyse-, Werbe- oder Trackingdienste. Der Spielstand besteht nur, solange die Seite geöffnet ist. Der Dschungel-Code wird ausschließlich auf dem Gerät angezeigt und eingegeben. Er wird nicht an mich oder an Dritte übertragen. Schriften und Gestaltungsdateien werden direkt mit der App ausgeliefert, es werden keine Verbindungen zu Google oder anderen Drittanbietern aufgebaut.</p>

          <H3>3. Bereitstellung über GitHub Pages</H3>
          <p>Die App wird über GitHub Pages bereitgestellt, einen Dienst der GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der App verarbeitet GitHub technisch notwendige Daten, insbesondere die IP-Adresse, Datum und Uhrzeit des Abrufs sowie Angaben zum verwendeten Browser. Dies ist erforderlich, um die Seite auszuliefern und ihre Sicherheit zu gewährleisten. Dabei können Daten in die USA übermittelt werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt in einer sicheren und zuverlässigen Bereitstellung der App. Ich selbst erhalte keine Zugriffsdaten und werte keine aus. Weitere Informationen: Datenschutzerklärung von GitHub (<a href={GITHUB_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200 break-all">{GITHUB_PRIVACY_URL}</a>).</p>

          <H3>4. Deine Rechte</H3>
          <p>Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) und Widerspruch (Art. 21). Wende dich dazu an die oben genannte E-Mail-Adresse. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren, in Nordrhein-Westfalen bei der Landesbeauftragten für Datenschutz und Informationsfreiheit NRW (LDI NRW).</p>

          <p className="mt-6 text-slate-400">Stand: September 2026</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [gameState, setGameState] = useState('menu'); 
  const [activeGame, setActiveGame] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showTreasureModal, setShowTreasureModal] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [showAdminControl, setShowAdminControl] = useState(false);
  const [tipMessage, setTipMessage] = useState(null);
  const [impressum, setImpressum] = useState(null); // null | 'impressum' | 'datenschutz'

  const [globalScore, setGlobalScore] = useState(0);
  const [gameProgress, setGameProgress] = useState({});
  const [hudAnim, setHudAnim] = useState(false);

  const gameOrder = ['sortieren', 'suchen', 'textforscher', 'marker', 'tabelle', 'paare', 'luecken', 'beweis', 'spezialtabelle', 'spezial'];

  const getLockState = (gameMode) => {
    const basics = ['sortieren', 'marker', 'paare', 'beweis', 'spezialtabelle'];
    if (basics.includes(gameMode)) return false; 
    
    const index = gameOrder.indexOf(gameMode);
    const prevGame = gameOrder[index - 1];
    return (gameProgress[prevGame]?.score >= 9) ? false : `Braucht 9 Sterne im vorherigen Level`;
  };

  const startGame = (gameMode) => { 
    if (getLockState(gameMode)) return;
    setActiveGame(gameMode); setGameState('playing'); 
    setGameProgress(prev => ({ ...prev, [gameMode]: { ...prev[gameMode], status: prev[gameMode]?.status === 'completed' ? 'completed' : 'started' } }));
  };

  const handleFinish = (earnedStars, maxPossible) => { 
    const prevStars = gameProgress[activeGame]?.score || 0;
    const newStars = Math.max(prevStars, earnedStars);
    const diff = newStars - prevStars;
    if (diff > 0) { setGlobalScore(prev => prev + diff); setHudAnim(true); }
    setFinalScore(earnedStars); setMaxScore(maxPossible); setGameState('finished'); 
    setGameProgress(prev => ({ ...prev, [activeGame]: { status: 'completed', score: newStars, max: maxPossible } }));
  };

  const totalMaxScore = 100;

  const SaveLoadModalInner = () => {
    const [inputCode, setInputCode] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // NEU: Absolut sichere Generierung des Codes (10 = A, 0-9 = 0-9)
    const generateCode = () => {
      let codeStr = "";
      for (let g of gameOrder) { 
        let score = Math.min(10, Math.max(0, gameProgress[g]?.score || 0)); 
        codeStr += score === 10 ? 'A' : score.toString();
      }
      codeStr += String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Füllbuchstabe
      codeStr += String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Füllbuchstabe
      return `${codeStr.substring(0,4)}-${codeStr.substring(4,8)}-${codeStr.substring(8,12)}`;
    };

    const handleLoad = () => {
      let cleanCode = inputCode.toUpperCase().replace(/[^0-9A-Z]/g, '');
      if (cleanCode.length !== 12) { setError(true); setTimeout(() => setError(false), 1000); return; }
      
      let newProgress = {}; let total = 0;
      try {
        for (let i = 0; i < gameOrder.length; i++) {
          let char = cleanCode[i];
          let val = char === 'A' ? 10 : parseInt(char, 10);
          
          if (!isNaN(val) && val > 0) { 
             val = Math.min(10, val);
             newProgress[gameOrder[i]] = { status: 'completed', score: val, max: 10 }; 
             total += val; 
          }
        }
        setGameProgress(newProgress); setGlobalScore(total); setSuccess(true); setTimeout(() => setShowSaveModal(false), 1500);
      } catch (e) { setError(true); setTimeout(() => setError(false), 1000); }
    };
    
    return (
      <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[200] flex items-center justify-center p-4">
        <div className="bg-stone-900 border-4 border-amber-500 rounded-3xl max-w-md w-full p-6 shadow-2xl relative anim-pop">
          <button onClick={() => setShowSaveModal(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white">✕</button>
          <div className="text-center mb-6"><h3 className="text-2xl font-black text-white">Dschungel-Code</h3></div>
          <div className="bg-stone-950 p-4 rounded-xl border-2 border-amber-500/50 flex justify-center mb-6">
            <div className="font-mono text-2xl font-bold text-amber-300">{generateCode()}</div>
          </div>
          <div className="border-t border-stone-700 pt-6">
            <input type="text" value={inputCode} onChange={(e) => setInputCode(e.target.value.toUpperCase())} placeholder="XXXX-XXXX-XXXX" className={`w-full bg-stone-950 border-2 rounded-xl p-4 text-white text-center font-mono text-xl mb-4 outline-none ${error ? 'border-red-500 anim-shake' : 'border-stone-700'}`} />
            <button onClick={handleLoad} disabled={!inputCode.trim() || success} className={`w-full font-bold py-4 rounded-xl transition-all ${success ? 'bg-lime-600 text-white' : 'bg-amber-700 text-white'}`}>{success ? "Geladen!" : "Code laden"}</button>
          </div>
        </div>
      </div>
    );
  };

  const AdminAuthModalInner = () => {
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState(false);

    const handleLogin = () => {
      if (pwd === "Verben123") {
        setShowAdminAuth(false);
        setShowAdminControl(true);
      } else {
        setError(true);
        setTimeout(() => setError(false), 500);
        setPwd("");
      }
    };

    return (
      <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[200] flex items-center justify-center p-4">
        <div className="bg-stone-900 border-4 border-emerald-500 rounded-3xl p-8 max-w-sm w-full text-center relative anim-pop">
          <button onClick={() => setShowAdminAuth(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white">✕</button>
          <Settings className="w-12 h-12 text-emerald-500 mx-auto mb-4 anim-float" />
          <h3 className="text-2xl font-black text-white mb-6">Lehrer-Bereich</h3>
          <input 
            type="password" 
            autoFocus
            value={pwd} 
            onChange={(e) => setPwd(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Passwort" 
            className={`w-full bg-stone-950 border-2 rounded-xl p-4 text-white text-center text-xl mb-4 outline-none transition-colors ${error ? 'border-red-500 anim-shake' : 'border-stone-700 focus:border-emerald-500'}`} 
          />
          <button onClick={handleLogin} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all">Einloggen</button>
          <button onClick={() => { setShowAdminAuth(false); setImpressum('impressum'); }} className="mt-5 text-xs text-stone-500 hover:text-stone-300 underline underline-offset-2 transition-colors">Impressum &amp; Datenschutz</button>
        </div>
      </div>
    );
  };

  const getBackgroundClass = () => {
    if (gameState !== 'playing') return 'bg-emerald-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900 via-emerald-950 to-stone-900';
    switch(activeGame) {
      case 'suchen': return 'bg-emerald-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900 via-green-950 to-black';
      case 'sortieren': return 'bg-amber-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900 via-stone-950 to-black';
      case 'textforscher': return 'bg-teal-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900 via-stone-950 to-black';
      case 'paare': return 'bg-lime-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime-900 via-green-950 to-black';
      case 'beweis': return 'bg-fuchsia-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900 via-slate-950 to-black';
      case 'marker': return 'bg-yellow-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/40 via-stone-950 to-black';
      case 'tabelle': return 'bg-[#3E2723] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5C3A21] via-[#2D1B15] to-black';
      case 'luecken': return 'bg-orange-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900 via-stone-950 to-black';
      case 'spezialtabelle': return 'bg-emerald-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-800 via-emerald-950 to-black';
      case 'spezial': return 'bg-emerald-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-800/40 via-slate-950 to-black';
      default: return 'bg-stone-950';
    }
  };

  return (
    <>
      <style>{jungleStyles}</style>
      
      {showRulesModal && <RulesModal onClose={() => setShowRulesModal(false)} />}
      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}
      {showSaveModal && <SaveLoadModalInner />}
      {showTreasureModal && <TreasureModal onClose={() => setShowTreasureModal(false)} gameProgress={gameProgress} />}
      {showAdminAuth && <AdminAuthModalInner />}
      {impressum && <ImpressumModal section={impressum} onClose={() => setImpressum(null)} />}
      {showAdminControl && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-stone-900 border-4 border-stone-600 p-8 rounded-3xl max-w-sm w-full text-center anim-pop relative">
            <button onClick={() => setShowAdminControl(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white">✕</button>
            <h3 className="text-2xl font-black text-white mb-6">Admin-Steuerung</h3>
            <button onClick={() => {
              const updates = {}; gameOrder.forEach(g => updates[g] = { status: 'completed', score: 10, max: 10 });
              setGameProgress(updates); setGlobalScore(totalMaxScore); setShowAdminControl(false);
            }} className="bg-amber-600 hover:bg-amber-500 text-white p-4 rounded-xl mb-4 w-full font-bold">Alles freischalten</button>
            
            <button onClick={() => {
              const basics = ['sortieren', 'marker', 'paare', 'beweis', 'spezialtabelle'];
              const updates = { ...gameProgress };
              let newGlobalScore = 0;
              
              gameOrder.forEach(game => {
                 if(basics.includes(game)) {
                     updates[game] = { status: 'completed', score: 10, max: 10 };
                 } else if (!updates[game]) {
                     updates[game] = { status: 'locked', score: 0, max: 10 }; 
                 }
              });
              
              Object.values(updates).forEach(progress => {
                if(progress && progress.score) {
                   newGlobalScore += progress.score;
                }
              });

              setGameProgress(updates); 
              setGlobalScore(newGlobalScore); 
              setShowAdminControl(false);
            }} className="bg-teal-600 hover:bg-teal-500 text-white p-4 rounded-xl mb-4 w-full font-bold">Grundlagen abschließen</button>

            <button onClick={() => { setGameProgress({}); setGlobalScore(0); setShowAdminControl(false); }} className="bg-red-600 hover:bg-red-500 text-white p-4 rounded-xl w-full font-bold">Fortschritt löschen</button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="fixed top-2 md:top-4 left-2 right-2 md:left-4 md:right-4 z-[100] flex justify-between items-start pointer-events-none gap-1 md:gap-2">
        <div className="flex justify-start pointer-events-auto">
          <button onClick={() => setShowRulesModal(true)} className="flex items-center gap-1 md:gap-2 bg-stone-900/90 text-amber-400 font-bold py-2 px-3 md:px-4 rounded-full border-2 border-amber-600/50 shadow-md whitespace-nowrap"><BookOpen className="w-5 h-5" /><span className="hidden lg:inline uppercase text-sm md:text-base">Die 3 Beweise</span></button>
        </div>
        <div className="flex-1 flex justify-center gap-1 md:gap-2 pointer-events-auto items-center flex-nowrap">
          <button onClick={() => setShowTreasureModal(true)} className="flex items-center gap-1 md:gap-2 bg-stone-900/90 text-yellow-400 font-bold py-2 px-3 md:px-4 rounded-full border-2 border-yellow-500/50 shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:scale-105 transition-transform whitespace-nowrap"><Crown className="w-5 h-5" /><span className="hidden lg:inline uppercase text-sm md:text-base">Schatzkammer</span></button>
          <button onClick={() => setShowHelpModal(true)} className="flex items-center gap-1 md:gap-2 bg-stone-900/90 text-emerald-400 font-bold py-2 px-3 md:px-4 rounded-full border-2 border-emerald-600/50 shadow-md whitespace-nowrap"><HelpCircle className="w-5 h-5" /><span className="hidden md:inline uppercase text-sm md:text-base">Hilfe</span></button>
          <button onClick={() => setShowSaveModal(true)} className="flex items-center gap-1 md:gap-2 bg-stone-900/90 text-amber-300 font-bold py-2 px-3 md:px-4 rounded-full border-2 border-amber-500/50 shadow-md whitespace-nowrap"><Key className="w-5 h-5" /><span className="hidden md:inline uppercase text-sm md:text-base">Code</span></button>
          <button onClick={() => setShowAdminAuth(true)} className="opacity-30 hover:opacity-100 p-2 md:ml-1 transition-opacity"><Settings className="w-5 h-5 text-stone-400" /></button>
        </div>
        <div className="flex justify-end pointer-events-auto">
          <div onAnimationEnd={() => setHudAnim(false)} className={`bg-stone-900/90 border-2 border-yellow-400 py-2 px-3 md:px-4 rounded-full flex items-center gap-1 md:gap-2 shadow-md whitespace-nowrap ${hudAnim ? 'anim-hud' : ''}`}>
            <span className="text-white font-black text-lg md:text-xl">{globalScore} <span className="text-yellow-400/70 text-xs md:text-sm">/ {totalMaxScore}</span></span>
          </div>
        </div>
      </div>

      {/* MENU */}
      {gameState === 'menu' && (
        <div className={`min-h-screen ${getBackgroundClass()} p-4 flex flex-col items-center pt-24 pb-12`}>
          <div className="bg-stone-900/40 backdrop-blur-md rounded-[3rem] p-8 text-center border-4 border-emerald-600/40 mb-10 max-w-4xl w-full">
            <h1 className="text-4xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-teal-300">Die große Verben-Expedition</h1>
            <p className="text-stone-300 font-bold text-lg">Bestehe 10 Prüfungen und werde zum Verben-Profi!</p>
          </div>
          
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-stone-800/40 border-2 border-stone-600/30 rounded-3xl p-5 lg:col-span-2">
              <h2 className="text-emerald-400 font-black text-lg uppercase mb-3 text-center">1. Erkennen & Sortieren</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <MenuButton progress={gameProgress['sortieren']} lockState={getLockState('sortieren')} icon={Gem} color="amber" title="1. Tempel-Truhen" onClick={() => startGame('sortieren')} />
                <MenuButton progress={gameProgress['suchen']} lockState={getLockState('suchen')} icon={Binoculars} color="emerald" title="2. Dschungel-Detektiv" onClick={() => startGame('suchen')} />
                <MenuButton progress={gameProgress['textforscher']} lockState={getLockState('textforscher')} icon={ScrollText} color="teal" title="3. Text-Expedition" onClick={() => startGame('textforscher')} />
              </div>
            </div>

            <div className="bg-stone-800/40 border-2 border-stone-600/30 rounded-3xl p-5">
              <h2 className="text-yellow-400 font-black text-lg uppercase mb-3 text-center">2. Bausteine & Verwandlung</h2>
              <div className="grid grid-cols-2 gap-3">
                <MenuButton progress={gameProgress['marker']} lockState={getLockState('marker')} icon={Paintbrush} color="yellow" title="4. Wortstamm-Maler" onClick={() => startGame('marker')} />
                <MenuButton progress={gameProgress['tabelle']} lockState={getLockState('tabelle')} icon={RefreshCw} color="orange" title="5. Verwandlungs-Tabelle" onClick={() => startGame('tabelle')} />
              </div>
            </div>

            <div className="bg-stone-800/40 border-2 border-stone-600/30 rounded-3xl p-5">
              <h2 className="text-lime-400 font-black text-lg uppercase mb-3 text-center">3. Grundform & Lücken</h2>
              <div className="grid grid-cols-2 gap-3">
                <MenuButton progress={gameProgress['paare']} lockState={getLockState('paare')} icon={Leaf} color="lime" title="6. Grundform-Lianen" onClick={() => startGame('paare')} />
                <MenuButton progress={gameProgress['luecken']} lockState={getLockState('luecken')} icon={Route} color="red" title="7. Lücken-Brücke" onClick={() => startGame('luecken')} />
              </div>
            </div>

            <div className="bg-stone-800/40 border-2 border-stone-600/30 rounded-3xl p-5">
              <h2 className="text-fuchsia-400 font-black text-lg uppercase mb-3 text-center">4. Beweise nutzen</h2>
              <div className="grid grid-cols-1 gap-3 h-full pb-8">
                <MenuButton progress={gameProgress['beweis']} lockState={getLockState('beweis')} icon={Fingerprint} color="fuchsia" title="8. Forscher-Beweis" onClick={() => startGame('beweis')} />
              </div>
            </div>

            <div className="bg-stone-800/40 border-2 border-stone-600/30 rounded-3xl p-5">
              <h2 className="text-emerald-400 font-black text-lg uppercase mb-3 text-center">5. Unregelmäßige Verben</h2>
              <div className="grid grid-cols-2 gap-3 h-full pb-8">
                <MenuButton progress={gameProgress['spezialtabelle']} lockState={getLockState('spezialtabelle')} icon={Crown} color="teal" title="9. Besondere Verben untersuchen" onClick={() => startGame('spezialtabelle')} />
                <MenuButton progress={gameProgress['spezial']} lockState={getLockState('spezial')} icon={Wand2} color="emerald" title="10. Besondere Verben in Texten" onClick={() => startGame('spezial')} />
              </div>
            </div>
          </div>

          {/* Fußzeile: Impressum & Datenschutz (ohne Passwort erreichbar) */}
          <footer className="mt-10 text-center text-xs sm:text-sm text-stone-500">
            <button onClick={() => setImpressum('impressum')} className="hover:text-stone-300 hover:underline underline-offset-2 transition-colors">Impressum</button>
            <span className="mx-2" aria-hidden="true">·</span>
            <button onClick={() => setImpressum('datenschutz')} className="hover:text-stone-300 hover:underline underline-offset-2 transition-colors">Datenschutz</button>
          </footer>
        </div>
      )}

      {/* FINISHED */}
      {gameState === 'finished' && (
        <div className={`min-h-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-900 via-stone-900 to-emerald-950 flex items-center justify-center p-4 pt-24 text-emerald-50`}>
          <div className="bg-stone-900/80 backdrop-blur-md max-w-lg w-full rounded-[3rem] shadow-2xl border-4 border-emerald-500/50 p-8 text-center anim-pop">
            <Award className="w-28 h-28 mx-auto mb-6 text-yellow-400 anim-float" />
            <h2 className="text-4xl font-black text-lime-400 mb-4">Level geschafft!</h2>
            <p className="text-2xl text-stone-300 mb-8 font-bold">Du hast <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-xl mx-1">{finalScore} von {maxScore}</span> Sternen!</p>
            <div className="flex flex-col gap-4">
              <button onClick={() => setGameState('playing')} className="bg-emerald-600 text-white font-black text-xl py-4 rounded-2xl">Nochmal spielen</button>
              <button onClick={() => setGameState('menu')} className="bg-stone-800 text-stone-200 font-bold text-lg py-4 rounded-2xl">Zurück zur Übersicht</button>
            </div>
          </div>
        </div>
      )}

      {/* PLAYING */}
      {gameState === 'playing' && (
        <div className={`min-h-screen transition-colors duration-1000 ${getBackgroundClass()} pt-24 pb-8 px-4 flex flex-col items-center relative w-full`}>
          {tipMessage && <ContextTipModal message={tipMessage} onClose={() => setTipMessage(null)} />}
          <div className="max-w-5xl w-full">
            <div className="flex justify-between items-center mb-6 bg-black/40 p-4 rounded-[2rem] text-white">
              <button onClick={() => setGameState('menu')} className="font-bold flex items-center gap-2 bg-stone-800/50 px-4 py-2 rounded-xl"><ArrowRight className="w-4 h-4 rotate-180" /> Zurück</button>
            </div>
            <div className="bg-black/20 backdrop-blur-sm w-full rounded-[3rem] shadow-2xl border-2 border-white/10 p-6 md:p-10 min-h-[400px]">
              {activeGame === 'suchen' && <FindWordGame onFinish={handleFinish} onShowTip={setTipMessage} />}
              {activeGame === 'sortieren' && <SortingGame onFinish={handleFinish} onShowTip={setTipMessage} />}
              {activeGame === 'textforscher' && <TextForscherGame onFinish={handleFinish} onShowTip={setTipMessage} />}
              {activeGame === 'marker' && <HighlightGame onFinish={handleFinish} onShowTip={setTipMessage} />}
              {activeGame === 'tabelle' && <ConjugationTableGame onFinish={handleFinish} onShowTip={setTipMessage} />}
              {activeGame === 'paare' && <MatchingGame onFinish={handleFinish} onShowTip={setTipMessage} />}
              {activeGame === 'luecken' && <LueckenGame onFinish={handleFinish} onShowTip={setTipMessage} />}
              {activeGame === 'beweis' && <BeweisGame onFinish={handleFinish} onShowTip={setTipMessage} />}
              {activeGame === 'spezialtabelle' && <SpecialTableGame onFinish={handleFinish} onShowTip={setTipMessage} />}
              {activeGame === 'spezial' && <SpecialVerbsGame onFinish={handleFinish} onShowTip={setTipMessage} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MenuButton({ icon: Icon, color, title, progress, lockState, onClick }) {
  const colorMap = { emerald: 'text-emerald-400 border-emerald-500/30', yellow: 'text-yellow-400 border-yellow-500/30', lime: 'text-lime-400 border-lime-500/30', cyan: 'text-cyan-400 border-cyan-500/30', amber: 'text-amber-400 border-amber-500/30', orange: 'text-orange-400 border-orange-500/30', red: 'text-red-400 border-red-500/30', teal: 'text-teal-400 border-teal-500/30', fuchsia: 'text-fuchsia-400 border-fuchsia-500/30' };
  const isCompleted = progress?.status === 'completed';
  const isStarted = progress?.status === 'started';
  const isLocked = !!lockState;
  
  let cardStyle = "bg-stone-900/80 hover:bg-stone-800 border-4";
  if (isLocked) cardStyle = "bg-stone-900/60 border-4 border-stone-800 cursor-not-allowed opacity-60";
  else if (isCompleted) cardStyle = "bg-green-900/40 border-4 border-lime-500 shadow-[0_0_20px_rgba(132,204,22,0.3)]";
  else if (isStarted) cardStyle = "bg-amber-900/40 border-4 border-yellow-500";
  
  return (
    <button onClick={onClick} disabled={isLocked} className={`relative flex flex-col items-center justify-center p-4 rounded-3xl transition-all group ${cardStyle} ${!isLocked ? colorMap[color] : ''} active:scale-95`}>
      {isLocked && <div className="absolute top-2 right-2"><Lock className="w-4 h-4 text-stone-500" /></div>}
      {isCompleted && !isLocked && <div className="absolute -top-2 -right-2 bg-lime-400 text-green-950 text-xs font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-md"><Star className="w-3 h-3" />{progress.score}</div>}
      <Icon className={`w-8 h-8 mb-2 ${isLocked ? 'text-stone-600' : ''}`} />
      <h3 className={`text-sm md:text-base text-center font-black leading-tight ${isCompleted ? 'text-lime-100' : 'text-stone-100'} ${isLocked ? 'text-stone-600' : ''}`}>{title}</h3>
    </button>
  );
}