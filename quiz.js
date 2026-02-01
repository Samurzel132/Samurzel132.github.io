const fragen = [{
    frage: "Welches ist das Meistverkaufteste Spiel der Welt?", antworten: [
        { antwort: "Minecraft", state: true },
        { antwort: "Pokemon Schwert", state: false },
        { antwort: "AstroBot", state: false },
        { antwort: "Mario Kart World", state: false }]
},
{
    frage: "Seit wann gibt es ein Open World Mario Kart?", antworten: [
        { antwort: "2022", state: false },
        { antwort: "2025", state: true },
        { antwort: "1999", state: false },
        { antwort: "Gibt es nicht", state: false }]
},
{
    frage: "Wieviele Pokemon Gibt es?", antworten: [
        { antwort: "200", state: false },
        { antwort: "1250", state: false },
        { antwort: "900", state: false },
        { antwort: "1015", state: true }]
},
{
    frage: "Wieviele Zelda Hauptteile gibt es?", antworten: [
        { antwort: "5", state: false }
        , { antwort: "30", state: false },
        { antwort: "21", state: true },
        { antwort: "2", state: false }]
}, {
    frage: "Welches Genre hat die meisten Teile?", antworten: [
        { antwort: "Minecraft", state: false },
        { antwort: "Pokemon", state: true },
        { antwort: "AstroBot", state: false },
        { antwort: "Mario Kart", state: false }]
},
{
    frage: "Welches Spiel hast du schon gesspielt?", antworten: [
        { antwort: "Minecraft", state: true },
        { antwort: "Mario Kart 8", state: true },
        { antwort: "AstroBot", state: true },
        { antwort: "Keines davon", state: true }]
},
{
    frage: "Wann erschien AstroBot?", antworten: [
        { antwort: "6. September 2024", state: true },
        { antwort: "8. Mai 2020", state: false },
        { antwort: "19. Dezember 2023", state: false },
        { antwort: "5. September 2024", state: false }]
},
{
    frage: "Wann erschien Minecraft?", antworten: [
        { antwort: "2000", state: false },
        { antwort: "2015", state: false },
        { antwort: "2009", state: false },
        { antwort: "2011", state: true }]
},
{
    frage: "Seit wann gibt es The Legend of Zelda?", antworten: [
        { antwort: "1989", state: false },
         { antwort: "1986", state: true }, 
         { antwort: "2011", state: false },
          { antwort: "1970", state: false }]
}, { frage: "Profifrage: Wie heißt das auf dem Hauptbildschirm abgebildete Pokemon?", antworten: [
    { antwort: "Yveltal", state: true }, 
    { antwort: "Solgaleo", state: false }, 
    { antwort: "Arceus", state: false }, 
    { antwort: "Pikachu", state: false }] 
},
];

const frageElem = document.getElementById("Frage");
const antwortbtn = document.getElementById("antwortbtn");
const nextbtn = document.getElementById("nextbtn");
const highscoreElem = document.getElementById("highscore");

let currentFrageIndex = 0;
let punkte = 0;


let highscore = localStorage.getItem("highscore") || 0;
highscoreElem.innerText = `Highscore: ${highscore}`;


function startQuiz() {
    currentFrageIndex = 0;
    punkte = 0;
    nextbtn.style.display = "none";
    showFrage();
}


function showFrage() {
    resetState();
    const currentFrage = fragen[currentFrageIndex];
    frageElem.innerText = currentFrage.frage;

    currentFrage.antworten.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.antwort;
        button.classList.add("answerbtn");
        button.dataset.correct = answer.state;
        button.addEventListener("click", selectAntwort);
        antwortbtn.appendChild(button);
    });
}


function resetState() {
    nextbtn.style.display = "none";
    while (antwortbtn.firstChild) {
        antwortbtn.removeChild(antwortbtn.firstChild);
    }
}


function selectAntwort(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";

    if (correct) {
        selectedBtn.style.backgroundColor = "green";
        punkte++;
    } else {
        selectedBtn.style.backgroundColor = "red";
    }

    Array.from(antwortbtn.children).forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") btn.style.backgroundColor = "green";
    });

    nextbtn.style.display = "block";
}


nextbtn.addEventListener("click", () => {
    currentFrageIndex++;
    if (currentFrageIndex < fragen.length) {
        showFrage();
    } else {
        frageElem.innerText = `Quiz beendet! Du hast ${punkte} von ${fragen.length} Punkten.`;
        antwortbtn.innerHTML = "";
        nextbtn.style.display = "none";

        
        if (punkte > highscore) {
            highscore = punkte;
            localStorage.setItem("highscore", highscore);
            highscoreElem.innerText = `Highscore: ${highscore}`;
        }
    }
});


startQuiz();
