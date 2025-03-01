// const crypto = require('crypto');
 /*
function encrypt(text) {
    var cipher = crypto.createCipheriv('aes256', 'ivebeenworkingattheairportbaritslikeChristmasinasubmarine','yesidonotsleep');

    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}

function decrypt(text)
{
    var decipher = crypto.createDecipheriv('aes256', 'ivebeenworkingattheairportbaritslikeChristmasinasubmarine','yesidonotsleep');

    var decrypted = cipher.update(text, 'utf8', 'hex');
    decrypted += decipher.final('hex');

    return decrypted;
}



/*
function login() {
    if (document.querySelector('.login-box')) {
        document.querySelector('.login-box').remove();
    }
    else {
        let loginBox = document.createElement('div');
        loginBox.className = 'login-box';
        document.querySelector('body').appendChild(loginBox);
        loginBox.classList.add('login-box');

        let registerTitle = document.createElement('h2');
        registerTitle.textContent = 'Register';

        let registerForm = document.createElement('form');
        registerForm.id = 'register-form';

        let registerUsername = document.createElement('input');
        registerUsername.type = 'text';
        registerUsername.id = 'register-username';
        registerUsername.placeholder = 'Username';
        registerUsername.required = true;

        let registerPassword = document.createElement('input');
        registerPassword.type = 'password';
        registerPassword.id = 'register-password';
        registerPassword.placeholder = 'Password';
        registerPassword.required = true;

        let registerButton = document.createElement('button');
        registerButton.type = 'submit';
        registerButton.textContent = 'Register';

        registerForm.appendChild(registerUsername);
        registerForm.appendChild(registerPassword);
        registerForm.appendChild(registerButton);

        let loginTitle = document.createElement('h2');
        loginTitle.textContent = 'Login';

        let loginForm = document.createElement('form');
        loginForm.id = 'login-form';

        let loginUsername = document.createElement('input');
        loginUsername.type = 'text';
        loginUsername.id = 'login-username';
        loginUsername.placeholder = 'Username';
        loginUsername.required = true;

        let loginPassword = document.createElement('input');
        loginPassword.type = 'password';
        loginPassword.id = 'login-password';
        loginPassword.placeholder = 'Password';
        loginPassword.required = true;

        let loginButton = document.createElement('button');
        loginButton.type = 'submit';
        loginButton.textContent = 'Login';

        loginForm.appendChild(loginUsername);
        loginForm.appendChild(loginPassword);
        loginForm.appendChild(loginButton);

        loginBox.appendChild(registerTitle);
        loginBox.appendChild(registerForm);
        loginBox.appendChild(loginTitle);
        loginBox.appendChild(loginForm);

        document.getElementById('register-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, encrypt(password) })
            })
                .then(response => response.json())
                .then(data => alert(data.message));
        });

        document.getElementById('login-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, encrypt(password) })
            })
                .then(response => response.json())
                .then(data => alert(data.message));
        });
    }

}
    */
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
