function loadQuestion() {
    var Xhttp = new XMLHttpRequest();
    Xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var question = JSON.parse(this.responseText);
            var out = question;
            document.getElementById('question').innerHTML = out;
        }
    }
        Xhttp.open("GET", "/api/question", true);
        Xhttp.send();
};


var time;
var zone = new Date().getTimezoneOffset() * 60000;
var timeout = 0;
function getTime() {
    var Xhttp = new XMLHttpRequest();
    Xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            time = JSON.parse(this.responseText);
            document.getElementById('answer-input').removeAttribute("disabled");
            return time;
        }
    }
        Xhttp.open("GET", "/api/time", true);
        Xhttp.send();
};

function loadTime() {
    if (time.left >= 1000) {
        time.left -= (1000);
    } else {
        // Timeout

        timeout = 1;
        document.getElementById('answer-input').setAttribute("placeholder", "Timeout! Use skip to continue");
        document.getElementById('answer-input').setAttribute("disabled", "true");
        document.getElementById('game-submit').setAttribute("disabled", "true");
        time.left = 0;
    }

    document.getElementById('time-left').innerHTML = new Date(time.left + zone).getHours() + ":" +
        new Date(time.left + zone).getMinutes() + ":" +
        new Date(time.left + zone).getSeconds();
}

time = getTime();
if(!timeout)
    setInterval(loadTime, 1000);

loadQuestion();
