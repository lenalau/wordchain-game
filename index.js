
let state = {
    imagequiz: false, // the othr option is wordchain (the default)
    startNextWordchain: () => {
        fieldIndex += 1
        picIndex += 1
        wordIndex = 0
        imgIndex = 0
        state.imagequiz = false
        drawWordchain()
        drawWordfieldImg()
    },
    startNextImagequiz: () => {
        wordIndex = 0
        imgIndex = 0
        state.imagequiz = true
        drawImagequiz()
    }
}

let handleInput = (event) => {
    if (event.keyCode === 13) {
        if (state.imagequiz) {
            checkImagequizInput()
        } else {
            checkWordchainInput()
        }
    }
}

let wordfield = [
    ['Lampe', 'Tisch', 'Bett', 'Schrank', 'Sofa', 'Stuhl', 'Regal', 'Pflanze'],
    ['Reis', 'Kartoffeln', 'Nudeln', 'Brot', 'Käse', 'Fleisch', 'Eier', 'Salz'],
    ['Wasser', 'Saft', 'Kaffee', 'Tee', 'Bier', 'Wein', 'Milch', 'Limonade']
]

// console.log(Object.keys(wordfield)[1])
// wordfield['möbel']
// wordfield['supermarkt']

let pics = [
    ['./images/Lampe.jpg', './images/möbel/Tisch.jpeg', './images/möbel/Bett.jpeg', './images/möbel/Schrank.jpeg', './images/möbel/Sofa.jpeg', './images/möbel/Stuhl.jpeg', './images/möbel/Regal.jpeg', './images/themenräume_bilder/pflanzen.jpg'],
    ['./images/supermarkt/Reis.jpeg', './images/supermarkt/Kartoffeln.jpeg', './images/supermarkt/Nudeln.jpeg', './images/supermarkt/Brot.jpeg', './images/supermarkt/Käse.jpeg', './images/supermarkt/Fleisch.jpeg', './images/supermarkt/Eier.jpeg', './images/supermarkt/Salz.jpeg'],
    ['./images/Getränke/Wasser.jpeg', './images/Getränke/Saft.jpeg', './images/Getränke/Kaffee.jpeg', './images/Getränke/Tee.jpeg', './images/Getränke/Bier.jpeg', './images/Getränke/Wein.jpeg', './images/Getränke/Milch.jpeg', './images/Getränke/Limonade.jpeg']
]

let wordfieldWords = ['Möbel', 'Lebensmittel', 'Getränke', 'Glückwunsch']
let wordfieldPics = ['./images/möbel/WF_möbel.jpeg', './images/supermarkt/WF Supermarkt.jpeg', './images/Getränke/Getränke.jpeg', './images/HerzlichenGlückwunsch.jpeg']

let myCanvas;
let ctx;
let smallCanvas;
let smallctx;

let globalInterval;
var fieldIndex = 0
var picIndex = 0
var wordIndex = 0
var imgIndex = 0


var x = 0;
var spdX = 30;
var y = 0;
var spdY = 40;



// for little canvas, showing image of actual wordfield
function drawWordfieldImg() {
    smallctx.clearRect(0, 0, smallCanvas.width, smallCanvas.height)
    let img = new Image(300, 200)
    img.src = wordfieldPics[picIndex]
    img.onload = function () {
        smallctx.drawImage(img, (smallCanvas.width / 2 - img.naturalWidth / 2), (smallCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)
        smallctx.font = "35px Courier"
        smallctx.fillStyle = "black";
        smallctx.fillText(wordfieldWords[fieldIndex], (smallCanvas.width / 2 - 21 * wordfieldWords[fieldIndex].length / 2), (smallCanvas.height / 2));
    }
}

function updateWordPos() {
    x += spdX;
    y += spdY;
    ctx.fillStyle = "black";
    ctx.fillText(wordfield[fieldIndex][wordIndex], x, y);

    if (x > 575) {
        spdX = -30;
    }
    if (x < 0) {
        spdX = 30
    }
    if (y > 400) {
        spdY = -40;
    }
    if (y < 0) {
        spdY = 40;
    }
}

// starts updateWordPos
function startDrawWord() {
    ctx.font = "50px Courier"

    if (!globalInterval) {
        globalInterval = setInterval(updateWordPos, 600)
    }
    // could start left top instead of recent position:
    // x = 0;
    // spdX = 30;
    // y = 0;
    // spdY = 40;
}

function stopDrawWord() {
    clearInterval(globalInterval)
    globalInterval = null
}

function drawWordchain() {
    document.getElementById("wordfield-icon").style.display = "block"
    document.getElementById("example").style.display = "block"
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)

    //ctx.globalAlpha = 0.9;
    let img = new Image(575, 400)
    img.src = pics[picIndex][imgIndex]
    img.onload = function () {
        ctx.drawImage(img, (myCanvas.width / 2 - img.naturalWidth / 2), (myCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)
        startDrawWord()
    }
}

// PictureBackground for Picturequiz
function drawImagequiz() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    stopDrawWord()

    let img = new Image(595, 400)
    img.src = pics[picIndex][imgIndex]
    img.onload = function () {
        ctx.drawImage(img, (myCanvas.width / 2 - img.naturalWidth / 2), (myCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)

    }
}


// this returns a string that is expected as the next input
function currentWordchain() {
    return wordfield[fieldIndex].slice(0, wordIndex + 1).join(" ")
}

// let picSizeX = (myCanvas.width - pics[picIndex][imgIndex].width) / 2
// let picSizeY = (myCanvas.height - pics[picIndex][imgIndex].height) / 2  -> wie kann ich das Bild zentrieren?


function finishGame() { // only for last iteration if player wins all
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)

    let img = new Image(595, 400)
    img.src = wordfieldPics[picIndex]
    img.onload = function () {
        ctx.drawImage(img, (myCanvas.width / 2 - img.naturalWidth / 2), (myCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)
        ctx.font = "50px Courier"
        ctx.fillStyle = "black";
        ctx.fillText(wordfieldWords[fieldIndex], 20, 100);
    }
}
let randImgIndex = [(Math.floor(Math.random() * pics[picIndex].length))]
let randPicIndex = [(Math.floor(Math.random() * pics.length))]

function randomQuiz() { // define a new state and act between
    document.getElementById("wordfield-icon").style.display = "none"
    document.getElementById("example").style.display = "none"
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    stopDrawWord()

    let img = new Image(595, 400)
    img.src = pics[randPicIndex][randImgIndex]
    img.onload = function () {
        ctx.drawImage(img, (myCanvas.width / 2 - img.naturalWidth / 2), (myCanvas.height / 2 - img.naturalHeight / 2), img.naturalWidth, img.naturalHeight)
    }
    drawWordfieldImg()

}
function checkRandomquizInput() {
    state.imagequiz = true
    let userInput = document.getElementsByTagName('input')[0].value

    if (userInput === wordfield[randPicIndex][randImgIndex] || userInput === "") {
        alert('Super! Du hast 5 Punkte gesammelt')
        randomQuiz()
        // ... if not last word of field
    } else { // if input is not correct 
        alert('oops, please try again')
        document.getElementsByTagName('input')[0].value = ""
        imgIndex = 0
        wordIndex = 0
        drawImagequiz()
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

                alert('Super! Jetzt kommt das nächste Wortfeld.')
                state.startNextWordchain()

            } else { // if last word of last wordfield
                document.getElementById("wordfield-icon").style.display = "none"
                document.getElementById("user-input").style.display = "none"
                fieldIndex += 1
                picIndex += 1

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

function goToWordfield(index) {

    fieldIndex = index
    picIndex = index
    console.log(index)

    drawWordchain()
    drawWordfieldImg()
}

window.onload = function () {

    myCanvas = document.getElementById("game")
    ctx = myCanvas.getContext('2d')
    smallCanvas = document.getElementById("img-wordfield")
    smallctx = smallCanvas.getContext('2d')
    document.getElementById("room").style.display = "none"
    document.getElementById("user-input").style.display = "none"
    document.getElementById("game-board").style.display = "none"


    let elems = document.querySelectorAll('*[wordfield]');
    for (let index = 0; index < elems.length; index++) {
        elems[index].onclick = (e) => {
            goToWordfield(index);
        };
    }

    let rand = document.getElementById('random-quiz');
    rand.onclick = randomQuiz



    document.getElementById("start-button").onclick = function () {

        document.getElementsByClassName("game-intro")[0].remove()
        document.getElementById("room").style.display = "block"
        document.getElementById("user-input").style.display = "block"
        document.getElementById("game-board").style.display = "block"

        drawWordchain()
        drawWordfieldImg()
    };

    console.log("pics[picIndex][imgIndex] : " + pics[picIndex][imgIndex])

    document.onkeydown = handleInput
};



