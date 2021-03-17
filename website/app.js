/* Global Variables */
// Setting up the api
const API_KEY = '2b41d723bb70bd83294660a03561c7af';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
// default zipCode (New York)
let zipCode = 10001;
// Selecting DOM elements
const generateBtn = document.getElementById('generate');
const zipElm = document.getElementById('zip');
const unitElm = document.getElementById('units');
let unit = 'standard';
const userFeelings = document.getElementById('feelings');
const dateElm = document.getElementById('date');
const tempElm = document.getElementById('temp');
const contentElm = document.getElementById('content');

// Updating the unit
unitElm.addEventListener('change', () => {
    unit = unitElm.value.split(' ')[0];
});

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// async api call
const getData = async(url = '') => {
    const response = await fetch(url);
    console.log(response.status)
    try {
        const data = response.json();
        console.log(data);
        return data.then((val) => val);
    } catch (e) {
        console.log(e);
        alert('something went wrong maybe you provided wrong zipcode');
    }
};

// async post function
async function postData(url = '', dataObj = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (e) {
        console.log('something went wrong.\n' + error);
    }
};
// async function for updating the UI
async function updateUI() {
    const req = await fetch('/data');
    try {
        console.log(req);
        const data = await req.json();
        dateElm.innerHTML = `<b>Date:</b> ${data.date}`;
        tempElm.innerHTML = `<b>Temperature:</b> ${data.temperature}`;
        contentElm.innerHTML = `<b>Your Feelings:</b> ${data.userResponse}`;
    } catch (e) {
        console.log(`ERROR: \n${e}`)
    }
}

// Event Listener to generate button click
generateBtn.addEventListener('click', () => {
    zipCode = zipElm.value;
    if (zipCode) {
        getData(`${baseUrl + zipCode}&units=${unit}&appid=${API_KEY}`).then((data) => {
            postData('http://localhost:3000/addData', {
                temperature: data.main.temp,
                date: newDate,
                userResponse: userFeelings.value
            }).then(updateUI());
        });
    } else {
        alert('you must enter a zipcode!');
    }
});