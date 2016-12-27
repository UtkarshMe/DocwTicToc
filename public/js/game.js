function loadQuestion() {
    var leaderXhttp = new XMLHttpRequest();
    leaderXhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var question = JSON.parse(this.responseText);
            var out = question;
            document.getElementById('question').innerHTML = out;
        }
    }
        leaderXhttp.open("GET", "/api/question", true);
        leaderXhttp.send();
};

loadQuestion();
