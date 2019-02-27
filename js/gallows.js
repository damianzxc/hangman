var alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ";
var word = "Co ma wisieć nie utonie".toUpperCase();
var encoded = "";
var attempt = 0;

var yes = new Audio("wav/yes.wav")
var no = new Audio("wav/no.wav")

document.addEventListener("DOMContentLoaded", function(){
    encodeWord();
    displayAlphabet();
})

function encodeWord() {
    for(i=0; i<word.length; i++) {
        if(word.charAt(i) == " ") {
            encoded = encoded + " ";
        } else {
            encoded = encoded + "-";
        }
    }
    displayBoard(encoded);
}

function displayAlphabet() {
    var divBody = "";

    for(i=0; i<=34; i++) {
        var element = "let" + i;
        divBody = divBody + '<div class="letter" onclick="check('+i+')" id="'+element+'">'+alphabet.charAt(i)+'</div>';
        if((i + 1) % 7 == 0) {
            divBody = divBody + '<div style="clear: both"></div>';
        }
    }
    document.getElementById("alphabet").innerHTML = divBody;
}

function hitted(letter) {
    yes.play();
	hideLetter(letter);
    displayBoard(encoded);
}

function mishitted(letter) {
    no.play();
    hideLetter(letter);
   
    var picture = "img/" + attempt + ".jpg";
    document.getElementById("gallows").innerHTML = '<img src="'+picture+'" alt="" />';
}

function hideLetter(letter) {
	document.getElementById("let" + letter).style.cursor = "default";
    document.getElementById("let" + letter).setAttribute("onclick", ";");
    document.getElementById("let" + letter).removeAttribute("class", "letter");
	document.getElementById("let" + letter).setAttribute("class", "hitted");
}

function gameOver(message) {
    document.getElementById("alphabet").innerHTML = message;
}

function check(letter) {

    var hit = false;

    for(i=0; i<word.length; i++) {
        if(word.charAt(i) == alphabet.charAt(letter)) {
            encoded = encoded.setChar(i, alphabet.charAt(letter));
            hit = true;
        }
    }
    if(hit == true) {
        hitted(letter);
    }
    else {
        mishitted(letter);
         attempt++;
    }
    if(encoded == word) {
        gameOver("Success!");
    }
    if(attempt >= 12) {
        gameOver("Przegrana, prawidłowe hasło: "+word);
    }
}

String.prototype.setChar = function (place, char) {
    return this.substr(0, place) + char + this.substr(place +1);
}

function displayBoard(encoded) {
    document.getElementById("board").innerHTML = encoded;
}

