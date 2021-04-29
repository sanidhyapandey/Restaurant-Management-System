import '../sass/base.scss';
import { accessToken } from 'mapbox-gl';
console.log("Hi");


// MAKE ORDER

var cardbtn = document.getElementsByClassName('makeorder');

for (var i=0; i<cardbtn.length; i++){
    cardbtn[i].addEventListener('click', async function () {
        // var price = document.getElementById('price').innerHTML;
        // console.log(price);
         var price = this.parentNode.parentNode.children[4].innerHTML;
         var name = this.parentNode.parentNode.children[2].innerHTML;
         console.log(price);

        await postData('http://localhost:8000/order', {
            price : price,
            name : name
        })
            .then(data => {
                window.alert(name + " Ordered successfully");
                console.log(data); // JSON data parsed by `data.json()` call
            });
    });
}

// CART Total 

// var cardbtn = document.getElementsByClassName('makeorder');

// for (var i = 0; i < cardbtn.length; i++) {
//     cardbtn[i].addEventListener('click', async function () {
//         // var price = document.getElementById('price').innerHTML;
//         // console.log(price);

//         var price = this.parentNode.parentNode.children[2].innerHTML;
//         var name = this.parentNode.parentNode.children[1].innerHTML;
//         var cart = {
//             price: price,
//             item: name
//         }

//         var jsonStr = JSON.stringify(cart);
//         sessionStorage.setItem("cart", jsonStr);
//         var cartValue = sessionStorage.getItem("cart");
//         var cartObj = JSON.parse(cartValue);
//         console.log(cartObj);
        
//     });
// }





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


// VIEW ORDERS 

document.getElementById('viewOrder').addEventListener('click', async function () {
    await getData('http://localhost:8000/orders', {

    })
        .then(data => {
            console.log(data);
            console.log(data[0].no_of_guests);
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

//DISPLAY DATA


function displayCharacters1(character) {
    let str = '';

    for (let index = 0; index < character.length; index++) {
        str += ` 
        <div class="rescard">
        <i class="fa fa-cutlery" aria-hidden="true"></i><span>Item Name: ${character[index].name}</span><br>
        <i class="fa fa-inr" aria-hidden="true"></i><span>Price: ${character[index].price}</span><br>
        
        </div>
        `
    }
    console.log(str);
    displayOrders.innerHTML = str;

}