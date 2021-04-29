import '../sass/base.scss';
import { accessToken } from 'mapbox-gl';


var addtablebtn = document.getElementById('addTablebtn');

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
}

addtablebtn.onclick = function() {
    addTable()
}

async function addTable() {
    var capacity = document.getElementById('capacity').value;
    await postData('http://localhost:8000/diner', {
        capacity: capacity
    })
        .then(data => { 
            console.log(capacity);
            console.log(data); // JSON data parsed by `data.json()` call
        });
    console.log('Webpack Boilerplate');
}


