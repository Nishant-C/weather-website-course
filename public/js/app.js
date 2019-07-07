console.log("client side js code")

const weatherForm = document.querySelector('form');
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const addressValue = document.getElementById("weatherAddress").value;
        const location = document.getElementById("location");
        const weather = document.getElementById("weather");
        const url = '/weather?address='+addressValue;

        location.innerText = "Loading...";
        weather.innerText = "";
        fetch(url).then( (response) => {
            response.json().then((data) => {
            if(data.error){
               location.innerText = data.error;
               return;
            }
                location.innerText = data.location;
                weather.innerText = data.weather;
            })
        })
    })