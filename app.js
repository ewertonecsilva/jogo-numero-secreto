let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemIncial(){
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número de 1 a 100");
}

exibirMensagemIncial();

function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = (`Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`);
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").disabled = false;
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela("p", `O número secreto é menor que ${chute}.`);
        limparCampo();
    } else {
        exibirTextoNaTela("p", `O número secreto é maior que ${chute}.`);
        limparCampo();
    }
    tentativas++;
    limparCampo;
}

function gerarNumeroSecreto() {
    let NumeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(NumeroEscolhido)) {
        return gerarNumeroSecreto();
    } else {
        listaDeNumerosSorteados.push(NumeroEscolhido);
        return NumeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroSecreto ();
    limparCampo();
    exibirMensagemIncial();
    tentativas = 1;
    document.getElementById("reiniciar").disabled = true;
}