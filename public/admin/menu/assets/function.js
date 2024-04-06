function openMenu(num){
    if (num === 1){
        document.getElementById('usermenu').style.display = 'flex'
        document.getElementById('iconframe').setAttribute('onclick', 'openMenu(2)');
    }
    if (num === 2){
        document.getElementById('usermenu').style.display = 'none'
        document.getElementById('iconframe').setAttribute('onclick', 'openMenu(1)');
    }
}

function followCursor(parentDiv, follower, followerWidth, followerHeight) {
    parentDiv.addEventListener('mousemove', function(e) {
        var parentRect = this.getBoundingClientRect();
        var cursorX = e.clientX - parentRect.left;
        var cursorY = e.clientY - parentRect.top;
        var followerX = cursorX - followerWidth / 2;
        var followerY = cursorY - followerHeight / 2;
        if (cursorX >= 0 && cursorX <= parentRect.width && cursorY >= 0 && cursorY <= parentRect.height) {
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            follower.style.display = 'block';
        } else {
            follower.style.display = 'none';
        }
    });

    parentDiv.addEventListener('mouseout', function() {
        follower.style.display = 'none';
    });
}

var parentDiv = document.getElementById('card');
var follower = document.getElementById('follower');
var followerWidth = 50;
var followerHeight = 50;
followCursor(parentDiv, follower, followerWidth, followerHeight);

var parentDiv2 = document.getElementById('card2');
var follower2 = document.getElementById('follower2');
var followerWidth2 = 50;
var followerHeight2 = 50;
followCursor(parentDiv2, follower2, followerWidth2, followerHeight2);

var parentDiv3 = document.getElementById('card3');
var follower3 = document.getElementById('follower3');
var followerWidth3 = 50;
var followerHeight3 = 50;
followCursor(parentDiv3, follower3, followerWidth3, followerHeight3);
