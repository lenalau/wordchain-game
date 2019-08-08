
let state = {
    wordchainquiz: true,
    // the othr option is wordchain (the default)
    startNextWordchain: () => {
        state.wordchainquiz = true
        state.imagequiz = false
        state.randomquizz = false
        state.solution = false
        fieldIndex += 1
        wordIndex = 0
        imgIndex = 0

        drawWordchain()
        drawWordfieldImg()
    },
    startNextImagequiz: () => {
        state.imagequiz = true
        state.wordchainquiz = false
        state.randomquizz = false
        state.solution = false
        wordIndex = 0
        imgIndex = 0
        drawImagequiz()
    },
    startRandomQuiz: () => {

        state.randomquizz = true
        state.wordchainquiz = false
        state.imagequiz = false
        state.solution = false
        drawRandomQuiz()
    },
    startSolution: () => {
        state.solution = true
        state.randomquizz = false
        state.wordchainquiz = false
        state.imagequiz = false
        drawSolution()
    }
}

let handleInput = (event) => {
    if (event.keyCode === 13) {
        if (state.wordchainquiz) {
            checkWordchainInput()
        } else if
            (state.imagequiz) {
            checkImagequizInput()
        } else {
            checkRandomquizInput()
        }

    }
}

let wordfield = [
    ['Lampe', 'Tisch', 'Bett', 'Schrank', 'Sofa', 'Stuhl', 'Regal', 'Pflanze'],
    ['Reis', 'Kartoffeln', 'Nudeln', 'Brot', 'Kaese', 'Fleisch', 'Eier', 'Salz'],
    ['Wasser', 'Saft', 'Kaffee', 'Tee', 'Bier', 'Wein', 'Milch', 'Limonade'],
    ['Apfel', 'Banane', 'Birne', 'Erdbeeren', 'Kirschen', 'Weintrauben', 'Zitrone'],
    ['Fußball', 'Basketball', 'Eishockey', 'Tennis', 'Volleyball', 'Handball', 'Golf']
]



let pics = [
    ['./images/moebel/Lampe.jpeg', './images/moebel/Tisch.jpeg', './images/moebel/Bett.jpeg', './images/moebel/Schrank.jpeg', './images/moebel/Sofa.jpeg', './images/moebel/Stuhl.jpeg', './images/moebel/Regal.jpeg', './images/moebel/Pflanze.jpeg', './images/moebel/Sol_Wordfield_Moebel.jpeg'],
    ['./images/supermarkt/Reis.jpeg', './images/supermarkt/Kartoffeln.jpeg', './images/supermarkt/Nudeln.jpeg', './images/supermarkt/Brot.jpeg', './images/supermarkt/Kaese.jpeg', './images/supermarkt/Fleisch.jpeg', './images/supermarkt/Eier.jpeg', './images/supermarkt/Salz.jpeg', './images/supermarkt/Sol_Wordfield_Lebensmittel.jpg'],
    ['./images/Getraenke/Wasser.jpeg', './images/Getraenke/Saft.jpeg', './images/Getraenke/Kaffee.jpeg', './images/Getraenke/Tee.jpeg', './images/Getraenke/Bier.jpeg', './images/Getraenke/Wein.jpeg', './images/Getraenke/Milch.jpeg', './images/Getraenke/Limonade.jpeg', './images/Getraenke/Sol_Wordfield_Getraenke.jpg'],
    ['./images/obst/Apfel.jpeg', './images/obst/Banane.jpeg', './images/obst/Birne.jpeg', './images/obst/Erdbeeren.png', './images/obst/Kirschen.jpeg', './images/obst/Weintrauben.jpeg', './images/obst/Zitrone.jpeg', './images/obst/Sol_Wordfield_Obst.jpg'],
    ['./images/Ballsport/fussball.jpeg', './images/Ballsport/Basketball.jpeg', './images/Ballsport/Eishockey.jpeg', './images/Ballsport/Tennis.jpeg', './images/Ballsport/Volleyball.jpeg', './images/Ballsport/Handball.jpeg', './images/Ballsport/Golf.jpeg', './images/Ballsport/Sol_Wordfield_Ballsport.jpg']
]

let wordfieldWords = ['Möbel', 'Lebensmittel', 'Getränke', 'Obst', 'Ballsport', 'Glückwunsch!']
let wordfieldPics = ['./images/moebel/wortfeld_moebel.jpeg', './images/supermarkt/WF Supermarkt.jpeg', './images/Getraenke/Getraenke.jpeg', './images/obst/Obst.jpg', './images/Ballsport/Ballsport.jpeg', './images/Eule.jpg']

let myCanvas;
let ctx;
let smallCanvas;
let smallctx;
let countCanvas;
let countctx;

let globalInterval;
var fieldIndex = 0
var wordIndex = 0
var imgIndex = 0


var x = 0;
var spdX = 30;
var y = 41;
var spdY = 40;
var pxOfWord


// ------> DRAW AND CHECK WORDCHAIN <-------------------------------------------------

function updateWordPos() {

    ctx.fillStyle = "black";
    ctx.fillText(wordfield[fieldIndex][wordIndex], x, y);
    x += spdX;
    y += spdY;

    if (x > pxOfWord) {
        spdX = -30;
    }
    if (x < 10) {
        spdX = 30
    }
    if (y > 392) {
        spdY = -40;
    }
    if (y < 63) {
        spdY = 40;
    }
}
// starts updateWordPos
function startDrawWord() {
    document.getElementById("btn-solution").style.display = "none"
    ctx.font = "50px 'Concert One'"

    if (!globalInterval) {
        globalInterval = setInterval(updateWordPos, 600)
    }
}

function stopDrawWord() {
    clearInterval(globalInterval)
    globalInterval = null
}

function drawWordchain() {
    document.getElementById("wordfield-icon").style.display = "block"
    document.getElementById("example").style.display = "block"
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 595, 416);
    let img = new Image(575, 400)
    img.src = pics[fieldIndex][imgIndex]
    img.onload = function () {
        ctx.drawImage(img, (myCanvas.width / 2 - img.naturalWidth / 2), (myCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)
        pxOfWord = (595 - (wordfield[fieldIndex][wordIndex].length * 25))
        startDrawWord()
    }
}

// CHECK WORDCHAIN 

// this returns a string that is expected as the next input for checkWordchainINput
function currentWordchain() {
    return wordfield[fieldIndex].slice(0, wordIndex + 1).join(" ")
}


function checkWordchainInput() {
    let userInput = document.getElementsByTagName('input')[0].value


    // if input is correct ...
    if (userInput === currentWordchain() || userInput === "") {

        // resets input field 
        document.getElementsByTagName('input')[0].value = ""
        wordIndex += 1
        imgIndex += 1

        // ... still in this word field
        if (wordIndex < wordfield[fieldIndex].length) {
            drawWordchain()
        } else { // .. if won the word field
            alert('Super! Teste jetzt dein Wissen in diesem Wortfeld.')
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)

            state.startNextImagequiz()
        }
    }

    else {
        // ... or input is incorrect
        alert('oops, please try again')
        document.getElementsByTagName('input')[0].value = ""
        imgIndex = 0
        wordIndex = 0
        drawWordchain()
    }
}


//------> DRAW AND CHECK IMAGEQUIZ <--------------------------------------------

// PictureBackground for Imagequiz
function drawImagequiz() {
    document.getElementById("example").style.display = "none"
    document.getElementById("user-input").style.display = "block"
    document.getElementById("btn-back").style.display = "none"
    document.getElementById("btn-solution").style.display = "block"
    document.getElementsByClassName("input-inst")[0].innerHTML = "Nur ein Wort eingeben:"
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 595, 416);
    stopDrawWord()

    let img = new Image(595, 400)
    img.src = pics[fieldIndex][imgIndex]
    img.onload = function () {
        ctx.drawImage(img, (myCanvas.width / 2 - img.naturalWidth / 2), (myCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)

    }
}

// CHECK IMAGEQUIZ

function finishGame() { // only for last iteration if player wins all
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 595, 416);
    let img = new Image(595, 400)
    img.src = wordfieldPics[fieldIndex]
    img.onload = function () {
        ctx.drawImage(img, (myCanvas.width / 2 - img.naturalWidth / 2), (myCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)
        ctx.font = "50px 'Concert One' "
        ctx.fillStyle = "black";
        ctx.fillText(wordfieldWords[fieldIndex], (myCanvas.width / 2 - 25 * wordfieldWords[fieldIndex].length / 2), (myCanvas.height / 2));
    }
}

function checkImagequizInput() {
    let userInput = document.getElementsByTagName('input')[0].value
    if (userInput === wordfield[fieldIndex][wordIndex] || userInput === "") {
        // resets input field 
        document.getElementsByTagName('input')[0].value = ""
        wordIndex += 1
        imgIndex += 1
        // ... if not last word of field
        if (wordIndex < wordfield[fieldIndex].length) {
            drawImagequiz()
        } else {
            // if last word but not last wordfield
            if (fieldIndex < (wordfield.length - 1)) {

                alert('Super! Jetzt kommt das naechste Wortfeld.')
                document.getElementsByClassName("input-inst")[0].innerHTML = "Hier die Wortkette eingeben:"
                state.startNextWordchain()

            } else { // if last word of last wordfield
                document.getElementById("wordfield-icon").style.display = "none"
                document.getElementById("user-input").style.display = "none"
                fieldIndex += 1
                finishGame()
                alert('Glückwunsch! Du hast einfach alles geschafft')
            }
        }
    } else { // if input is not correct 
        alert('oops, please try again')
        document.getElementsByTagName('input')[0].value = ""
        imgIndex = 0
        wordIndex = 0
        drawImagequiz()
    }
}


// ------> DRAW AND CHECK RANDOMQUIZ <--------------------------------------------


let count = 0
function drawCounter() {
    countctx.clearRect(0, 0, countCanvas.width, countCanvas.height)
    countctx.fillStyle = "white";
    countctx.fillRect(0, 0, 595, 416);

    countctx.font = "25px 'Concert One' "
    countctx.fillStyle = "black";
    countctx.fillText('Richtige Woerter:', 30, 80);
    countctx.fillText([count], 30, 120);

}

function sampleRandomIndices() {
    randFieldIndex = [(Math.floor(Math.random() * (pics.length - 1)))]
    randImgIndex = [(Math.floor(Math.random() * (pics[randFieldIndex].length - 1)))]
}
sampleRandomIndices()

function drawRandomQuiz() { // define a new state and act between
    state.randomquizz = true
    document.getElementById("example").style.display = "none"
    document.getElementById("wordfield-icon").style.display = "none"
    document.getElementById("user-input").style.display = "block"
    document.getElementById("time-counter").style.display = "block"
    document.getElementsByClassName("input-inst")[0].innerHTML = "Nur ein Wort eingeben:"

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 595, 416);
    stopDrawWord()


    let img = new Image(595, 400)
    img.src = pics[randFieldIndex][randImgIndex]
    img.onload = function () {
        ctx.drawImage(img, (myCanvas.width / 2 - img.naturalWidth / 2), (myCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)
    }
    console.log(randFieldIndex)
    console.log(randImgIndex)
    drawCounter()
}

function checkRandomquizInput() {

    state.randomquizz = true
    let userInput = document.getElementsByTagName('input')[0].value
    console.log(wordfield[randFieldIndex][randImgIndex])
    if (userInput === wordfield[randFieldIndex][randImgIndex] || userInput === "") {
        document.getElementsByTagName('input')[0].value = ""
        sampleRandomIndices()
        count += 1
        drawRandomQuiz()
        drawCounter()

        if (count === 100) {
            drawCounter()
            alert('100 Wörter! Du weißt sie alle!')


        }
    } else { // if input is not correct 
        alert('oops, please try again')
        document.getElementsByTagName('input')[0].value = ""
        sampleRandomIndices()
        drawRandomQuiz()
        count -= 1
        drawCounter()
        if (count < 0) {
            alert('Game over')
            drawRandomQuiz()
            count = 0
            drawCounter()
        }
    }
}

// ------------------------> DRAW LITTLE CANVAS, showing image of current wordfield <------
function drawWordfieldImg() {
    smallctx.clearRect(0, 0, smallCanvas.width, smallCanvas.height)
    smallctx.fillStyle = "white";
    smallctx.fillRect(0, 0, 300, 200);
    let img = new Image(300, 200)
    img.src = wordfieldPics[fieldIndex]
    img.onload = function () {
        smallctx.drawImage(img, (smallCanvas.width / 2 - img.naturalWidth / 2), (smallCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)
        smallctx.font = "35px 'Concert One'"
        smallctx.fillStyle = "black";
        smallctx.fillText(wordfieldWords[fieldIndex], (smallCanvas.width / 2 - 17 * wordfieldWords[fieldIndex].length / 2), (smallCanvas.height / 2));
    }
}

// ----------------------> GIVE SOLUTION SHEET <---------------------------
function drawSolution() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 595, 416);
    stopDrawWord()

    let img = new Image(595, 400)
    img.src = pics[fieldIndex][imgIndex]
    img.onload = function () {
        ctx.drawImage(img, (myCanvas.width / 2 - img.naturalWidth / 2), (myCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)
    }
    endSolution()
}
function endSolution() {

    document.getElementById("btn-solution").style.display = "none"
    document.getElementById("btn-back").style.display = "block"

}

// --------------------------------------------------------------------------

window.onload = function () {

    myCanvas = document.getElementById("game")
    ctx = myCanvas.getContext('2d')
    smallCanvas = document.getElementById("img-wordfield")
    smallctx = smallCanvas.getContext('2d')
    countCanvas = document.getElementById("time-point-counter")
    countctx = countCanvas.getContext('2d')
    document.getElementById("room").style.display = "none"
    document.getElementById("user-input").style.display = "none"
    document.getElementById("game-board").style.display = "none"


    let elems = document.querySelectorAll('*[wordfield]');
    for (let index = 0; index < elems.length; index++) {
        elems[index].onclick = (e) => {
            document.getElementById("wordfield-icon").style.display = "block"
            document.getElementById("user-input").style.display = "block"
            document.getElementById("example").style.display = "block"
            document.getElementById("time-counter").style.display = "none"
            document.getElementsByClassName("input-inst")[0].innerHTML = "Hier die Wortkette eingeben:"

            fieldIndex = index - 1
            imgIndex = 0
            wordIndex = 0

            state.startNextWordchain()
        };
    }

    let rand = document.getElementById('random-quiz');
    rand.onclick = state.startRandomQuiz

    let sol = document.getElementById('btn-solution');
    sol.onclick = (e) => {
        imgIndex = 0
        imgIndex += pics[fieldIndex].length - 1
        console.log(fieldIndex)
        console.log(imgIndex)
        console.log(state)

        document.getElementById("user-input").style.display = "none"
        state.startSolution()
    };
    let endsol = document.getElementById('btn-back');
    endsol.onclick = (e) => {
        console.log(fieldIndex)
        console.log(imgIndex)
        console.log(state)
        state.startNextImagequiz()
    }

    document.getElementById("start-button").onclick = function () {

        document.getElementsByClassName("game-intro")[0].remove()
        document.getElementById("room").style.display = "block"
        document.getElementById("user-input").style.display = "block"
        document.getElementById("game-board").style.display = "block"
        document.getElementById("time-counter").style.display = "none"
        document.getElementById("btn-solution").style.display = "none"
        document.getElementById("btn-back").style.display = "none"

        drawWordchain()
        drawWordfieldImg()
    };

    document.onkeydown = handleInput
};



