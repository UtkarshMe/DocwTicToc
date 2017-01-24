function loadLeaderboard() {
    var leaderXhttp = new XMLHttpRequest();
    leaderXhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var teams = JSON.parse(this.responseText);

            var out ='<tbody>';
            var count = 1;
            teams.forEach(function(team){
                out += '<tr>';
                out += '<td>#' + count++ + '</td>';
                out += '<td>' + team.username + '</td>';
                out += '<td>' + team.game.score + '</td>';
                out += '</tr>';
            });
            out += '</tbody>';

            document.getElementById('leaderboard').innerHTML = out;
        }
    }
        leaderXhttp.open("GET", "/api/leaderboard", true);
        leaderXhttp.send();
};

loadLeaderboard();
setTimeout(loadLeaderboard, 5000);
