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

loadQuestion();

var time;
var zone = new Date().getTimezoneOffset() * 60000;
function getTime() {
    var Xhttp = new XMLHttpRequest();
    Xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            time = JSON.parse(this.responseText);
            time.left += zone;
            return time;
        }
    }
        Xhttp.open("GET", "/api/time", true);
        Xhttp.send();
};

function loadTime() {
    if (time.left > zone) {
        time.left -= (1000);
    } else {
        time.left = zone;
    }

    document.getElementById('time-left').innerHTML = new Date(time.left).getHours() + ":" +
        new Date(time.left).getMinutes() + ":" +
        new Date(time.left).getSeconds();
}

time = getTime();
setInterval(loadTime, 1000);
