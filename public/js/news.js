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
                out += '<div class="col-md-12">';
                out += '<h4>' + newsItem.title + '<br />';
                out += '<small>' + date.getHours() + ':' + date.getMinutes() + ', ' + date.getDate() + '/' + date.getMonth()+1 + '</small></h3>';
                out += '<p>' + newsItem.content + '</p>';
                out += '<br /> <br />';
                out += '</div>';
            });

            document.getElementById('loadNews').innerHTML = out;

        }
    };
    xhttp.open("GET", "/api/news", true);
    xhttp.send();
}

loadNews();
