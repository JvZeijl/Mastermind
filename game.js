//            Made by: Joost van Zeijl          
var basiskleuren = ["red","blue","green","orange","brown","yellow","purple","silver"];
var c = 1;
var r = 1;
var rs = 1;
var choise = [];
var t = 0;
var res = [];
var doublecolors = false;
var dubbel = [];
var randomPos;
var posNums = [];
var prevChoise = [];
var twoPlayers = false;
var p1Chosing = false;

function checkborder(x) {
    if(t >= 5) {
        t = 5;
    }
    if(c == 6) {
       c = 5;
    }
    if(c === 0) {
       c = 1;
    }
    if(choise.length >= 5) {
        $("#check").prop("disabled",false );
    }
    else {
        $("#check").prop("disabled",true);
    }
}

function randomnumber(max) {
    var y = Math.floor( Math.random() * max);
return y;
}

function setcolors() {
    var colors = [];
    if(twoPlayers) {
        p1Chosing = true;
        p1Input(function(c) {
            colors = c;
        });
    } else {
        while (colors.length <5) {
            var color = randomnumber(8);
            if(colors.indexOf(color) == -1) {
                colors.push(color);
            }
       }
   }
   return colors;
}

function checkDouble() {
    var checkChoise = [];
    for(var i = 0; i < choise.length; i++) {
        if(checkChoise.indexOf(choise[i]) <= -1) {
            checkChoise.push(choise[i]); 
        } else if(checkBool === false) {
            alert("Er zitten dubbele kleuren in!");
            return false;
        }
    }
    return true;
}

function getColors(color) {
    switch(c) {
        case 1:
            choise[0] = color;
            break;
        case 2:
            choise[1] = color;
            break;
        case 3:
            choise[2] = color;
            break;
        case 4:
            choise[3] = color;
            break;
        case 5:
            choise[4] = color;
            break;
    }
}

function check() {
    if(checkDouble(false)) {
        getResult();
        nextRound();
        return; 
    }
}
   
var kleuren = setcolors();

function selector(direction) {
    $(".r"+r +c).removeClass("selector");
    c += direction;
    checkborder();
    $(".r"+r +c).addClass("selector");
}

function addColor(x) {
    if(p1Chosing) {
        kleuren.push(basiskleuren.indexOf(x));
        displayCode();
        return;
    }
    getColors(x);
    $(".r"+r +c).removeClass("red blue green orange brown yellow purple silver");
    $(".r"+r +c).addClass(x);
    t++;
    checkborder();
    if(choise.length >= 5) {
        return;
    } else {
        selector(1);
    }
}

function getResult() {
    res = [];
    rs = 1;
    for(var i = 0; i < choise.length; i++) {
        var k = basiskleuren.indexOf(choise[i]);
        var k1 = kleuren.indexOf(k);
        if(k1 > -1) {
            if(k1 == i) {
                res.push("black");
            } else {
                res.push("white");
            }
        }
        res.sort();
    }
    addRes();
}

function addRes() {
    for(var i = 0; i < res.length; i++) {
        if(res[i] === "black") {
            $(".res"+r +rs).removeClass("black white");
            $(".res"+r +rs).addClass("black");
            rs++;
        } else if(res[i] === "white") {
            $(".res"+r +rs).removeClass("black white");
            $(".res"+r +rs).addClass("white");
            rs++;
        }
    }
}

function checkWin() {
      var goodCounter = 0;
    for(var i = 0; i < res.length; i++) {
        if(goodCounter != 5) {
            if(res[i] === "black") {
                goodCounter += 1;
            }
        }
    }
    return goodCounter;
}

function colorToString() {
    var colorString = [];
    for(var i = 0; i < kleuren.length; i++) {
        colorString.push(basiskleuren[kleuren[i]]);
    }
    return colorString; 
}

function nextRound() {
    var win = checkWin();
    if(win == 5) {
        alert("Gefeliciteerd, je hebt gewonnen!");
        displayCode();
    } else if(r >= 8) {
        alert("Helaas, je hebt verloren!");
        displayCode();
        $(".btns").prop("disabled", true);
    } else {
        $(".r"+r +c).removeClass("selector");
        r++;
        c = 0;
        t = 0;
        selector(1);
        posNums = [];
        prevChoise = choise;
        choise = [];
        $("#check").prop("disabled", true);
    }
}

function displayCode() {
    var bcolors = colorToString();
    for(var i = 1; i <= 5; i++) {
        $("#d" + i).addClass(bcolors[i - 1]);
    }
}

function giveUp() {
    var sure = confirm("Weet je zeker dat je wilt opgeven?");
    if(sure) {
        displayCode();
    }
}

var toggleHelp = false;
function help() {
    var h = document.querySelector("#help");
    h.width = window.innerWidth;
    if(toggleHelp) {
        $("#help").prop("hidden", true);
        toggleHelp = false;
        return;
    }
    $("#help").prop("hidden", false);
    toggleHelp = true;
}

var toggleSettings = false;
function settings() {
    var s = document.querySelector("#settings");
    s.width = window.innerWidth;
    if(toggleSettings) {
        $("#settings").prop("hidden", true);
        toggleSettings = false;
        return;
    }
    $("#settings").prop("hidden", false);
    toggleSettings = true;
}

function copy() {
    for(var i = 1; i <= prevChoise.length; i++) {
        var curColor = prevChoise[i - 1];
        addColor(curColor);
    }
    t = 5;
}

function twoPlayer() {
    var btn = document.querySelector("#two");
    if(twoPlayers) {
        $("#two").removeClass("selected");
        $("#two").addClass("deselected");
        twoPlayers = false;
        return;
    }
    $("#two").removeClass("deselected");
    $("#two").addClass("selected");
    twoPlayers = true;
}

function p1Input(callBack) {
    $("#p1-choise").prop("hidden", false);
    $("#p1-choise").click(function() {
        callBack();
        $("#p1-choise").prop("hidden", true);
        p1Chosing = false;
        for(var y = 1; y <= 5; y++) {
            var curRes = y;
            $("#d"+y).removeClass("red blue green orange brown yellow purple silver");
        }
    });
}

function reset() {
    //clear all the colors & the results
    for(var i = 1; i <= 8; i++) {
        var curR = i;
        for(var x = 1; x <= 5; x++) {
            var curC = x;
            $(".r"+curR +curC).removeClass("red blue green orange brown yellow purple silver selector");
        }
        for(var y = 1; y <= 5; y++) {
            var curRes = y;
            $(".res"+curR +curRes).removeClass("black white");
            $("#d"+y).removeClass("red blue green orange brown yellow purple silver");
        }
    }
    //reset all the global variables
    c = 1;
    r = 1;
    rs = 1;
    choise = [];
    t = 0;
    res = [];
    doublecolors = false;
    dubbel = [];
    randomPos;
    posNums = [];
    prevChoise = [];
    kleuren = setcolors();
    //other things
    $(".r"+r +c).addClass("selector");
}