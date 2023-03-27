function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let joueurOne = "X";
let joueurTwo = "O";
let soloGame = false;
let tour = 1;
let gameOver = false;
let scoreOne = 0;
let scoreTwo = 0;
let tableau = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

function chooseMode() {
    soloGame = true;
    document.querySelector("#soloGame").style.display = "none"
}

function againstCPU() {
    let randomIndex = random(0, 8);
    let container = document.querySelectorAll(".cel");
    while (container[randomIndex].innerHTML != "") {
        randomIndex = random(0, 8);
    }
    container[randomIndex].innerHTML = "O";
    updateGrid()
}

function play(elem) {
    if (gameOver == false && elem.innerHTML == "") {
        if (tour % 2 != 0) {
            elem.innerHTML = joueurOne
        } else if (tour % 2 == 0 && soloGame == false) {
            elem.innerHTML = joueurTwo
        }
        updateGrid()
        if (soloGame == true && tour % 2 == 0 && tour < 10) {
            againstCPU()
        }
    }
}

function updateGrid() {
    let index = 0
    for (let i = 0; i < tableau.length; i++) {
        for (let j = 0; j < tableau[i].length; j++) {
            tableau[i][j] = document.querySelectorAll('.cel')[index].innerHTML
            index++
        }
    }
    tour++
    result(tableau)
    console.log(tableau);
}

function result(tableau) {
    let playerWin = ""
    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i][0] != "" && tableau[i][0] == tableau[i][1] && tableau[i][1] == tableau[i][2]) {
            playerWin = tableau[i][0]
            document.querySelector("#score").innerHTML = tableau[i][0] + " a gagné ! Jeu terminé"
            document.querySelector("#restart").classList.remove("d-none")
            gameOver = true
        }
        if (tableau[0][i] != "" && tableau[0][i] == tableau[1][i] && tableau[1][i] == tableau[2][i]) {
            playerWin = tableau[0][i]
            document.querySelector("#score").innerHTML = tableau[0][i] + " a gagné ! Jeu terminé"
            document.querySelector("#restart").classList.remove("d-none")
            gameOver = true
        }
        if (tableau[0][0] != "" && tableau[0][0] == tableau[1][1] && tableau[1][1] == tableau[2][2]) {
            playerWin = tableau[0][0]
            document.querySelector("#score").innerHTML = tableau[0][0] + " a gagné ! Jeu terminé"
            document.querySelector("#restart").classList.remove("d-none")
            gameOver = true
        }
        if (tableau[0][2] != "" && tableau[0][2] == tableau[1][1] && tableau[1][1] == tableau[2][0]) {
            playerWin = tableau[0][2]
            document.querySelector("#score").innerHTML = tableau[0][2] + " a gagné ! Jeu terminé"
            document.querySelector("#restart").classList.remove("d-none")
            gameOver = true
        }
    }

    if (gameOver) {
        score(playerWin)
    }

    if (tour == 10 && gameOver == false) {
        document.querySelector("#score").innerHTML = "Égalité"
        document.querySelector("#restart").classList.remove("d-none")
        gameOver = true
    }
    score()
}

function restart() {
    gameOver = false;
    tour = 1;
    document.querySelector("#score").innerHTML = "";
    document.querySelector("#restart").classList.add("d-none");
    document.querySelectorAll(".cel").forEach((elem) => {
        elem.innerHTML = ""
    })
}

function score(winner) {
    if (winner == "X") {
        scoreOne++
        document.querySelector("#scoreOne").innerHTML = scoreOne;
    } else if (winner == "O") {
        scoreTwo++
        document.querySelector("#scoreTwo").innerHTML = scoreTwo;
    }
}