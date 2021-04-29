import '../sass/base.scss';
// import { accessToken } from 'mapbox-gl';
var viewRes = document.getElementById('ViewReservations');



// MAKE RESERVATION

document.getElementById('makeres').addEventListener('click', async function () {
    var no_of_guest = document.getElementById('Guests').value;
    var dateval = document.getElementById('check-in-date').value;
    var tableSelect = document.getElementById('Tables').value;
    var timeval = document.getElementById('cars').value;
    console.log(dateval);
    console.log(timeval);
    console.log(tableSelect);
    var datetime = dateval + "T" + timeval;
    console.log(datetime);
    await postData('http://localhost:8000/reservation', {
        no_of_guests: no_of_guest,
        res_time: datetime,
        table_id: tableSelect
    })
        .then(data => {
            window.alert("Reservation Successful")
            console.log(data); // JSON data parsed by `data.json()` call
        });
    console.log('Webpack Boilerplate');
});


// Function to post data


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

// VIEW RESERVATION

document.getElementById('viewres').addEventListener('click', async function () {
    await getData('http://localhost:8000/reservations', {

    })
        .then(data => {
            console.log(data);
            displayCharacters1(data); // JSON data parsed by `data.json()` call
        });
    console.log('Webpack Boilerplate');

});

// Function to get data 


async function getData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// Function to delete Data

async function deleteData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
}

//DISPLAY DATA


function displayCharacters1(character) {
    let str = '';

    for (var index = 0; index < character.length; index++) {
        str += ` 
        <div class="rescard">
        <span id="guestStyle">Guests: ${character[index].no_of_guests}</span><br>
        <span id="timeStyle">Reservation Time: ${character[index].res_time}</span><br>
        <button class="deleteStyle"value=${character[index]._id} id= btn${index} >Cancel Reservation</button>
        </div>
        `

    }
    viewRes.innerHTML = str;
   
    for (var i = 0; i < character.length; i++) {
        var element = document.getElementById("btn" + i);
       
        element.onclick = function () {
            del(element.value);
            
    
        };
    }

        async function del(id){
             console.log(id);
            await deleteData('http://localhost:8000/reservation/'+ id)
                .then(() => {
                    console.log("deleted");
                });
            console.log('Webpack Boilerplate');
        
        }
}


// DELETE RESERVATION




