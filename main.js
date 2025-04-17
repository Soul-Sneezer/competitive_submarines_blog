function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function moveSub(sub, link) {
  var move = false;
  var isMiddleButtonDown = false;
  var timeoutId = null;

  sub.addEventListener('click', function(event) {
    window.location.href = "blog" + link + ".html";
  }, true);

  sub.addEventListener('mousedown', function(event) {
    if (event.which === 2) {
      isMiddleButtonDown = true;
      timeoutId = setTimeout(function() {
        if (isMiddleButtonDown) {
          move = true;
        }
      }, 500);
    }
  }, true);

  sub.addEventListener('mousemove', function(event) {
    event.stopPropagation();
    if (move) {
      // Calculate pageX/Y for older IE versions
      let eventDoc = (event.target && event.target.ownerDocument) || document;
      let doc = eventDoc.documentElement;
      let body = eventDoc.body;
      let pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      let pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);

      sub.style.position = 'absolute'; // Ensure element is positioned
      sub.style.left = pageX + 'px';
      sub.style.top = pageY + 'px';
    }
  }, true);

  sub.addEventListener('mouseup', function(event) {
    if (event.which === 2) {
      isMiddleButtonDown = false;
      move = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }
  }, true);
}

window.onload  = function() {

  var sub_container = document.querySelectorAll(".submarine__container");
  var submarines = document.querySelectorAll(".submarine__body");
  var propellers = document.querySelectorAll(".submarine__propeller");
  var bubbles = document.querySelectorAll(".bubbles__container");
  var submarine_links = document.querySelectorAll(".submarine__container a")

  for(var i = 0; i < submarines.length; i++)
  {
    var rand1 = getRandomInt(60);
    var rand2 = getRandomInt(30);
    submarines[i].style.width = 200 + rand1 + "px";
    submarines[i].style.height = 60 + rand2 + "px";
    propellers[i].style.left = 295 + rand1 / 2 + "px";
    bubbles[i].style.left = 250 + rand1 / 2 + "px";
  }

  for(var i = 0; i < submarines.length; i++)
  {
    submarine_links[i].replaceWith(...submarine_links[i].childNodes); 
    moveSub(sub_container[i], i);   
  }


    var code = "";
    window.addEventListener("keydown",function(e) {
        code = (code+String.fromCharCode(e.keyCode || e.which)).substr(-11);
        if( code == "ABCDEFGHIJK" && window.innerWidth > 1280) {
            var login = document.querySelectorAll(".nav-login")[0];
            login.style.display = "block";
        }
    },false);
}

// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.checked = true;
    }

    // Add event listener to theme toggle
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
});
