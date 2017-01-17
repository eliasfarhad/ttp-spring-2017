var index = 0;
var MusicList = [];

MusicList[0] = document.getElementById("Countdown");
MusicList[1] = document.getElementById("Shutdown");
MusicList[2] = document.getElementById("Landed");
MusicList[3] = document.getElementById("Looking");

function JukeBox(List) {
    this.List = List;
}

var jBox = new JukeBox(MusicList);

$(document).ready(function() {
    $('#play').click(function() {
        jBox.List[index].play();
        document.getElementById('current').innerHTML = "Now Playing: " + jBox.List[index].id;
        document.getElementById('upnext').innerHTML = "Next: " + jBox.List[(index+1) % jBox.List.length].id;
    });
});


$(document).ready(function() {
   $('#pause').click(function() {
       jBox.List[index].pause();
   });
});


$(document).ready(function() {
    $('#stop').click(function() {
        jBox.List[index].pause();
        jBox.List[index].currentTime = 0;
    });
});


$(document).ready(function() {
    $('#next').click(function() {
        jBox.List[index].pause();
        jBox.List[index].currentTime = 0;
        
        index = (index + 1) % jBox.List.length;
        jBox.List[index].play();
        document.getElementById('current').innerHTML = "Now Playing: " + jBox.List[index].id;
        document.getElementById('upnext').innerHTML = "Next: " + jBox.List[(index+1) % jBox.List.length].id;
    });
});


$(document).ready(function() {
    $('#prev').click(function() {
        jBox.List[index].pause();
        jBox.List[index].currentTime = 0;
        
        index = (index - 1) % jBox.List.length;
        if (index < 0) {
            index = index + jBox.List.length;
        }
        jBox.List[index].play();
        document.getElementById('current').innerHTML = "Now Playing: " + jBox.List[index].id;
        document.getElementById('upnext').innerHTML = "Next: " + jBox.List[(index+1) % jBox.List.length].id;
    });
});


$(document).ready(function() {
    $('#shuf').click(function() {
        var randNum = Math.floor(Math.random()*jBox.List.length);
        jBox.List[index].pause();
        jBox.List[index].currentTime = 0;
        
        index = randNum;
        jBox.List[index].play();
        document.getElementById('current').innerHTML = "Now Playing: " + jBox.List[index].id;
        document.getElementById('upnext').innerHTML = "Next: " + jBox.List[(index+1) % jBox.List.length].id;
    });
});


$(document).ready(function() {
    $('#submit').click(function() {
        var track = document.querySelector('#userInput').value;
        
        $.ajax({
            url:"https://api.spotify.com/v1/search",
            data:{
                q: track,
                type: "track"
            },
            
            success: function(response) {
                if (isInList(track) == false) {
                    var music = new Audio(response.tracks.items[0].preview_url);
                    music.id = track;
                    $('ol').append("<li>" + track + "</li>");
                    jBox.List.push(music);
                    
                    jBox.List[index].pause();
                    jBox.List[index].currentTime = 0;
                    index = jBox.List.length - 1;
                    jBox.List[index].play();
                    document.getElementById('current').innerHTML = "Now Playing: " + jBox.List[index].id;
                    document.getElementById('upnext').innerHTML = "Next: " + jBox.List[(index+1) % jBox.List.length].id;
                }
                else if (isInList(track)==true) {
                    for (var i=0; i < jBox.List.length; i++) {
                        if (jBox.List[i].id === track) {
                            
                            jBox.List[index].pause();
                            jBox.List[index].currentTime = 0;
                            index = i;
                            jBox.List[index].play();
                            document.getElementById('current').innerHTML = "Now Playing: " + jBox.List[index].id;
                            document.getElementById('upnext').innerHTML = "Next: " + jBox.List[(index+1) % jBox.List.length].id;
                        }
                    }
                }
            }
        })
    });
});

    
function isInList(name) {
    for (var i=0; i < jBox.List.length; i++) {
        if (jBox.List[i].id === name)
            return true;
    }
    return false;
}
