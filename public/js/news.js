// Load News
function loadNews() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var news = JSON.parse(this.responseText);
            var out = '';
            var count = 1;
            news.forEach(function(newsItem){
                var date = new Date(newsItem.updated);
                var icon;
                if (newsItem.level == 1) {
                    icon = 'exclamation-sign';
                }else if (newsItem.level == 2) {
                    icon = 'info-sign';
                }else{
                    icon = 'question-sign';
                }
                var month = ["January", "February", "March", "April",
                    "May", "June", "July", "August", "September", "October",
                    "November", "December"];
                var hours = date.getHours();
                var ampm = hours > 12 ? 'pm' : 'am';
                hours = hours > 12 ? hours - 12 : hours;
                


                out += '<div class="col-md-12">';
                out += '<div class="media">';
                out += '<div class="media-left">';
                out += '<span class="media-object glyphicon glyphicon-'
                    + icon + '" aria-hidden="true"></span>';
                out += '</div><div class="media-body">';
                out += '<h4 class="media-heading">' + newsItem.title +'<br />';
                out += '<small>';
                out += date.getDate() + ' ' + month[date.getMonth()];
                out += ' at ' + hours + ':' + date.getMinutes() + ampm;
                out += '</small></h4>';
                out += '<p>' + newsItem.content + '</p>';
                out += '<br /> <br />';
                out += '</div></div></div>';
            });

            document.getElementById('loadNews').innerHTML = out;

        }
    };
    xhttp.open("GET", "/api/news", true);
    xhttp.send();
}

loadNews();
