var jogador1 = 'X';
var jogador2 = 'O';
var rodada = jogador1;
var fimDeJogo = false;

atualizaRodada();
inicializaTabuleiro();

//funcao para mostrar qual o jogador da vez
function atualizaRodada() {
    if (fimDeJogo){
        return;
    }

    if (rodada == jogador1) {
        var jogador = document.getElementById("jogador").innerHTML="X";
    }

    else {
        var jogador = document.getElementById("jogador").innerHTML="O";
    }
}

// funcao para mapear o tabuleiro e monitorar as jogadas
function inicializaTabuleiro() {

    //pega todos os espacos do tabuleiro
    var espacos = document.getElementsByClassName("espaco");

    for (var i = 0; i < espacos.length; i++) {

        //verifica se teve um click no espaco
        espacos[i].addEventListener("click", function() {
            if (fimDeJogo) {
                return;
            }

            if (this.getElementsByTagName("p").length == 0) {

                //caso tenha um click no espaco e a rodada for do jogador 1 ele marca com X e muda a rodada
                if (rodada == jogador1) {
                    this.innerHTML = "X";
                    this.setAttribute("jogada", jogador1);
                    console.log(this.getAttribute("jogada"));
                    rodada = jogador2;
                }

                else {
                    this.innerHTML = "O";
                    this.setAttribute("jogada", jogador2);
                    console.log(this.getAttribute("jogada"));
                    rodada = jogador1;
                }
                atualizaRodada();
                verificaVencedor();
            }
        }
        );
    }
}

/*
verifica se houve um vencedor, para isso mapeamos os espacos do tabuleiro e verificamos onde cada
jogador fez sua jogada, através do atributo jogada que registra se aquele espaço foi preenchido pelo 
jogador 1 ou jogador 2
*/
async function verificaVencedor() {
    var a1 = document.getElementById("1").getAttribute("jogada");
    var a2 = document.getElementById("2").getAttribute("jogada");
    var a3 = document.getElementById("3").getAttribute("jogada");
    var b1 = document.getElementById("4").getAttribute("jogada");
    var b2 = document.getElementById("5").getAttribute("jogada");
    var b3 = document.getElementById("6").getAttribute("jogada");
    var c1 = document.getElementById("7").getAttribute("jogada");
    var c2 = document.getElementById("8").getAttribute("jogada");
    var c3 = document.getElementById("9").getAttribute("jogada");

    var vencedor = '';

    //faz todas as verificacoes de possiveis jogadas para ganhar com a1
    if ((a1 == b1 && a1 == c1 && a1 != "") || (a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && a1 == c3 && a1 != "")) {
        vencedor = a1;
    }

    //faz todas as verificacoes de possiveis jogas com b2
    else if ((b2 == b1 && b2 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") || (b2 == a3 && b2 == c1 && b2 != "")) {
        vencedor = b2;
    }

    //faz todas as verificacoes de possiveis jogadas com c3
    else if ((c3 == c2 && c3 == c1 && c3 != "") || (c3 == a3 && c3 == b3 && c3 != "")){
        vencedor = c3;
    }
    
    else if (a1 != "" && a2 != "" && a3 != "" && b1 != "" && b2 != "" && b3 != "" && c1 != "" && c2 != "" && c3 != ""){
        vencedor = "velha";
    }

    if (vencedor != "" && vencedor != "velha") {
        fimDeJogo = true;
        await sleep(50);
        alert("O vencedor foi o: " + "'" + vencedor + "'");
    }

    else if (vencedor == "velha") {
        fimDeJogo = true;
        await sleep(50);
        alert("Deu Velha! Reinicie para jogar novamente.")
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}