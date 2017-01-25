function loadLeaderboard() {
    var leaderXhttp = new XMLHttpRequest();
    leaderXhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var teams = JSON.parse(this.responseText);

            var out ='<tbody>';
            var count = 1;
            teams.forEach(function(team){
                out += '<tr>';
                out += '<td class="text-center">#' + count++ + '</td>';
                out += '<td class="text-left text-wrap" style="overflow:hidden;text-overflow:ellipses">' + team.username + '</td>';
                out += '<td class="text-right">' + team.game.score + '</td>';
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
