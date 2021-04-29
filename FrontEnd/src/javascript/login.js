import '../sass/base.scss';
// import { accessToken } from 'mapbox-gl';
// Function to post data


async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


async function getData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('accessToken')
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

var login = document.getElementById('Login');
var signUpbtn = document.getElementById('SignUp')

signUpbtn.onclick = function() {
    signUp()
}


login.onclick = function() {
    loginCall()
};

async function signUp() {
    var email = document.getElementById('email_idSign').value;
    var password = document.getElementById('passwordSign').value;
    await postData('http://localhost:8000/user', {
       email : email,
       password : password,
       
    })
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
}

async function loginCall() {
    var email = document.getElementById('email_id').value;
    var password = document.getElementById('password').value;
    await postData('http://localhost:8000/login', {
       email : email,
       password : password
    })
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
            localStorage.setItem('accessToken', data.access_token)
            window.alert("You're logged in");
        });
}

var logout = document.getElementById('logout');
logout.onclick = function() {
    logoutCall()
}

async function logoutCall() {
    localStorage.clear();
    

}