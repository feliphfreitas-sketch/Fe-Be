function changeBackground(){

    const hour = new Date().getHours();

    let background;

    if(hour >= 6 && hour < 12){

        background = "linear-gradient(160deg,#74b9ff,#dfe6e9)";

    }else if(hour >=12 && hour <18){

        background = "linear-gradient(160deg,#4b79a1,#283e51)";

    }else{

        background = "linear-gradient(160deg,#081226,#10284d)";

    }

    document.body.style.background = background;

}

changeBackground();

// ==========================================
// 🤍 NÓS - Versão 1.0
// Felipe ❤️ Beatriz
// ==========================================

// Datas
const reunionDate = new Date("2026-09-12T17:30:00");
const datingDate = new Date("2026-04-03T00:00:00");

// Frases
const quotes = [
    "Cada segundo de distância é um segundo mais perto do nosso abraço. ❤️",
    "Nosso amor é maior que qualquer distância.",
    "Deus já preparou o dia do nosso reencontro.",
    "Você continua sendo meu lugar favorito, mesmo estando longe.",
    "O amor não diminui com a distância, ele amadurece.",
    "Estamos vivendo pela fé, e não pelo que vemos. 🤍",
    "Cada amanhecer é um dia a menos para estarmos juntos novamente.",
    "Nossa história está apenas começando.",
    "O melhor abraço ainda está por vir.",
    "Até o reencontro, continuo escolhendo você todos os dias."
];

// ==========================================
// Relógio
// ==========================================

function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString("pt-BR");

    document.getElementById("date").innerHTML =
        now.toLocaleDateString("pt-BR", {

            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"

        });

}

// ==========================================
// Contagem Regressiva
// ==========================================

function updateCountdown() {

    const now = new Date();

    const diff = reunionDate - now;

    if (diff <= 0) {

        document.getElementById("countdown").innerHTML =
            "<strong>❤️ Finalmente juntos! ❤️</strong>";

        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (diff % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (diff % (1000 * 60))
        / 1000
    );

    document.getElementById("countdown").innerHTML = `

        <div class="numbers">

            <div>

                <span>${days}</span>

                <small>Dias</small>

            </div>

            <div>

                <span>${hours}</span>

                <small>Horas</small>

            </div>

            <div>

                <span>${minutes}</span>

                <small>Min</small>

            </div>

            <div>

                <span>${seconds}</span>

                <small>Seg</small>

            </div>

        </div>

    `;

}

// ==========================================
// Dias de namoro
// ==========================================

function updateLoveDays() {

    const now = new Date();

    const diff = now - datingDate;

    const days = Math.floor(
        diff / (1000 * 60 * 60 * 24)
    );

    document.getElementById("loveDays").innerHTML = `

        <span class="loveNumber">

            ${days}

        </span>

        <br>

        dias

    `;

}

// ==========================================
// Comentário
// ==========================================

const textarea = document.getElementById("comment");

const saveButton = document.getElementById("saveComment");

const savedText = localStorage.getItem("comentario");

if (savedText) {

    textarea.value = savedText;

}

saveButton.addEventListener("click", () => {

    localStorage.setItem(
        "comentario",
        textarea.value
    );

    saveButton.innerHTML = "✔ Salvo";

    setTimeout(() => {

        saveButton.innerHTML = "❤️ Salvar";

    }, 2000);

});

// ==========================================
// Frase aleatória
// ==========================================

function randomQuote() {

    const quote =
        quotes[Math.floor(Math.random() * quotes.length)];

    document.getElementById("quote").innerHTML = quote;

}

randomQuote();

// ==========================================
// Inicialização
// ==========================================

updateClock();
updateCountdown();
updateLoveDays();

setInterval(() => {

    updateClock();
    updateCountdown();

}, 1000);