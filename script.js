import { db } from "./firebase.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


// Datas principais

const inicioContagem = new Date("2026-06-17T00:00:00");
const reencontro = new Date("2026-09-12T17:30:00");



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

//changeBackground();

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

function updateClock(){

    const now = new Date();

    const brazil = now.toLocaleTimeString("pt-BR",{

        timeZone:"America/Sao_Paulo"

    });

    const ireland = now.toLocaleTimeString("pt-BR",{

        timeZone:"Europe/Dublin"

    });

    document.getElementById("clockBrazil").innerHTML = brazil;

    document.getElementById("clockIreland").innerHTML = ireland;

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



function atualizarProgresso(){

    const hoje = new Date();

    const total =
        reencontro.getTime() - inicioContagem.getTime();

    const atual =
        hoje.getTime() - inicioContagem.getTime();

    let porcentagem = (atual / total) * 100;

    if(porcentagem < 0) porcentagem = 0;
    if(porcentagem > 100) porcentagem = 100;

    document.getElementById("progressBar").style.width =
        porcentagem + "%";

    const diasRestantes =
        Math.ceil((reencontro - hoje)/(1000*60*60*24));

    document.getElementById("progressText").innerHTML =
        `${porcentagem.toFixed(0)}% da espera concluída ❤️<br>`;
}

atualizarProgresso();



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

async function carregarComentario() {

    const documento = await getDoc(
        doc(db, "diario", "comentario_atual")
    );

    if (documento.exists()) {

        textarea.value = documento.data().texto;

    }

}

carregarComentario();

saveButton.addEventListener("click", async () => {

    try {

        saveButton.innerHTML = "☁️ Salvando...";

        await setDoc(
            doc(db, "diario", "comentario_atual"),
            {
                texto: textarea.value,
                autor: "Beatriz",
                data: new Date().toLocaleDateString("pt-BR")
            }
        );

        console.log("1 - Gravou");

        saveButton.innerHTML = "✅ Salvo!";

        console.log("2 - Mudou botão");

        setTimeout(() => {

            console.log("3 - Voltou botão");

            saveButton.innerHTML = "❤️ Salvar";

        }, 2000);

    } catch (e) {

        console.error(e);

    }

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



const DATA_INICIO = new Date("2026-06-28");

const modal=document.getElementById("devocionalModal");

document.getElementById("openDevocional").onclick=()=>{

    modal.style.display="block";

    carregarDevocional();

}

window.addEventListener("load", () => {

    carregarDevocional();

});

document.getElementById("closeModal").onclick=()=>{

    modal.style.display="none";

}

async function carregarDevocional(){

    const resposta=await fetch("devocionais.csv");

    const texto=await resposta.text();

    const linhas=texto.split("\n");

    const hoje=new Date();

    const dias=Math.floor(

        (hoje-DATA_INICIO)/(1000*60*60*24)

    );

    const linha=linhas[dias+1];

    const dados=linha.split(";");

    document.getElementById("livro").innerHTML=dados[0];

    document.getElementById("trecho").innerHTML=dados[1];

    document.getElementById("tema").innerHTML=dados[2];

    document.getElementById("reflexao").innerHTML=dados[3];

    document.getElementById("pergunta").innerHTML=dados[4];

    document.getElementById("desafio").innerHTML=dados[5];

    document.getElementById("oracao").innerHTML=dados[6];

document.getElementById("resumoLivro").innerHTML = dados[0];

document.getElementById("resumoTrecho").innerHTML =
    '"' + dados[1] + '"';

}	




// =============================
// MEDICAMENTO
// =============================

const checkManha = document.getElementById("manha");
const checkNoite = document.getElementById("noite");
const statusRemedio = document.getElementById("statusRemedio");

const hoje = new Date().toISOString().split("T")[0];

async function salvarMedicamento() {

    await setDoc(doc(db, "medicamento", "status"), {

        data: hoje,

        manha: checkManha.checked,

        noite: checkNoite.checked

    });

    atualizarStatus();

}

async function carregarMedicamento() {

    const snap = await getDoc(doc(db, "medicamento", "status"));

    if (snap.exists()) {

        const dados = snap.data();

        if (dados.data === hoje) {

            checkManha.checked = dados.manha;

            checkNoite.checked = dados.noite;

        } else {

            checkManha.checked = false;

            checkNoite.checked = false;

        }

    }

    atualizarStatus();

}

function atualizarStatus() {

    let total = 0;

    if (checkManha.checked) total++;

    if (checkNoite.checked) total++;

    statusRemedio.innerHTML =
        `💊 ${total} de 2 doses concluídas`;

}

checkManha.addEventListener("change", salvarMedicamento);

checkNoite.addEventListener("change", salvarMedicamento);

carregarMedicamento();











const intro = document.getElementById("intro");

document
.getElementById("enter")
.onclick=()=>{

intro.style.opacity="0";

setTimeout(()=>{

intro.remove();

},1000);

}


const memories = document.querySelectorAll(".memory");

const photoModal = document.getElementById("photoModal");

const bigPhoto = document.getElementById("bigPhoto");

memories.forEach(photo=>{

    photo.onclick=()=>{

        bigPhoto.src=photo.src;

        photoModal.style.display="flex";

    }

});

document.getElementById("closePhoto").onclick=()=>{

    photoModal.style.display="none";

}




const abrirCarta = document.getElementById("abrirCarta");
const modalCarta = document.getElementById("modalCarta");
const fecharCarta = document.getElementById("fecharCarta");

if (abrirCarta && modalCarta && fecharCarta) {

    abrirCarta.onclick = () => {
        modalCarta.style.display = "flex";
    };

    fecharCarta.onclick = () => {
        modalCarta.style.display = "none";
    };

    window.addEventListener("click", (e) => {
        if (e.target === modalCarta) {
            modalCarta.style.display = "none";
        }
    });

}

























async function carregarClima(){

    // Osasco
    const brasil = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=-23.5329&longitude=-46.7917&current_weather=true"
    );

    const dadosBR = await brasil.json();

    // Dublin
    const irlanda = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=53.3498&longitude=-6.2603&current_weather=true"
    );

    const dadosIE = await irlanda.json();

    document.getElementById("tempBR").innerHTML =
    Math.round(dadosBR.current_weather.temperature)+"°";

    document.getElementById("tempIE").innerHTML =
    Math.round(dadosIE.current_weather.temperature)+"°";

}

carregarClima();