// Get tabs working
$('#users a').click(function (e) {
    e.preventDefault();
    $('this').tab('show');
})
$('#messages a').click(function (e) {
    e.preventDefault();
    $('this').tab('show');
})
$('#news a').click(function (e) {
    e.preventDefault();
    $('this').tab('show');
})

// Load users
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var users = JSON.parse(this.responseText);
            var out = '<div class="table-responsive"><table class="table table-hover table-striped"><tbody>';
            var count = 1;
            users.forEach(function(user){
                out += '<tr>';
                out += '<td>'+count++ +'</td>';
                out += '<td>'+user.username+'</td>';
                out += '<td>'+user.game.level+'</td>';
                out += '<td>'+user.game.score+'</td>';
                out += '<td>'+user.status+'</td>';
                if (user.status) {
                    out += '<td>'+user.phone+'</td>';
                    out += '<td>'+user.member[0]+'</td>';
                    out += '<td>'+user.member[1]+'</td>';
                    out += '<td>'+user.member[2]+'</td>';
                    out += '<td>'+user.member[3]+'</td>';
                }
                else
                    out += '<td></td><td></td><td></td><td></td><td></td>';
                out += '<td class="actions">';
                out += '<i class="edit fa fa-pencil-square-o" onclick="userEdit(\''+user.username+'\', 0)"></i> &nbsp; ';
                out += '<i class="check fa fa-check" onclick="userEdit(\''+user.username+'\', 1)"></i> &nbsp; ';
                out += '<i class="ban fa fa-ban" onclick="userEdit(\''+user.username+'\', 2)"></i></td>';
                out += '</tr>';
            });
            out += '</tbody></table></div>';

            document.getElementById('loadUsers').innerHTML = out;

        }
    };
    xhttp.open("GET", "/api/users", true);
    xhttp.send();
}


// Load News
function loadMessages() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var messages = JSON.parse(this.responseText);
            var out = '';
            var count = 1;
            messages.forEach(function(msg){
                var date = new Date(msg.updated);
                var month = ["January", "February", "March", "April",
                    "May", "June", "July", "August", "September", "October",
                    "November", "December"];
                var hours = date.getHours();
                var ampm = hours > 12 ? 'pm' : 'am';
                hours = hours > 12 ? hours - 12 : hours;
                
                out += '<div class="col-md-12">';
                out += '<h4 class="media-heading">' + msg.team +'<br />';
                out += '<small>';
                out += date.getDate() + ' ' + month[date.getMonth()];
                out += ' at ' + hours + ':' + date.getMinutes() + ampm;
                out += '</small></h4>';
                out += '<p>' + msg.content + '</p>';
                out += '<br />';
                out += '</div>';
            });

            document.getElementById('loadMessages').innerHTML = out;

        }
    };
    xhttp.open("GET", "/api/questions", true);
    xhttp.send();
}

loadMessages();


// Edit user account status
function userEdit(username, status) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loadDoc();
            this.responseText;
        }
    };
    xhttp.open("POST", '/api/set/status/'+status+'/'+username, true);
    xhttp.send(); 
}
