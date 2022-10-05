const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderError = function (msg) {
	countriesContainer.insertAdjacentText("beforeend", msg);
	// countriesContainer.style.opacity = 1
};

const renderCountry = function (data, classname = "") {
	const html = `<article class="country ${classname}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 cla ss="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${data.population}</p>
    <p class="country__row"><span>🗣️</span>${data.languages}</p>
    <p class="country__row"><span>💰</span>${data.currencies}</p>
  </div>
</article>`;

	countriesContainer.insertAdjacentHTML("beforeend", html);
	// countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = "Something went wrong") {
	return fetch(url).then((response) => {
		if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
		return response.json();
	});
};
const getCountryData = function (country) {
	getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
		.then(function ([data]) {
			console.log(data);
			renderCountry(data);
			const neighbour = data.borders[0];
			console.log(neighbour);
			if (!neighbour) throw new Error(`No Neighbour Found`);
			return getJSON(
				`https://restcountries.com/v3.1/name/${neighbour}`,
				"Country not found"
			);
		})
		.then(function ([data]) {
			console.log(data);
			renderCountry(data, "neighbour");
		})
		.catch((err) => {
			renderError(`Something went wrong: ${err.message}`);
		})
		.finally(() => {
			countriesContainer.style.opacity = 1;
		});
};

// const getCountryData = function (country) {
// 	fetch(`https://restcountries.com/v3.1/name/${country}`)
// 		.then(function (response) {
// 			console.log(response);
//       if(!response.ok) throw new Error(`cannot found country ${response.status}`)
// 			return response.json();
// 		})
// 		.then(function ([data]) {
// 			console.log(data);
// 			renderCountry(data);
//       const neighbour = 'adafdst' //data.borders[5];
// 			return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
// 		})
// 		.then(function (resolve) {
//       if(!resolve.ok) throw new Error(`cannot found country ${resolve.status}`)
// 			return resolve.json();
// 		})
// 		.then(function ([data]) {
// 			console.log(data);
// 			renderCountry(data, "neighbour");
// 		})
//     .catch(err => {
//       renderError( `Something went wrong: ${err.message}`)
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     })
// };

// btn.addEventListener("click", function () {
// 	getCountryData("bharat");
// });

// // const callInSetOut = function(){
// // 	console.log(`sike`);
// // }

// // setTimeout(callInSetOut, 4000);

// // const goodDay = function(hey){
// // 	console.log(`came in hey`);
// // 	hey()
// // }

// // goodDay(function() {
// // 	console.log(`SIghhhhhhhhhhhh`);
// // })

// // console.log(`last last`);

// // Promises

// const promiseMe = new Promise(function(resolve, reject){
//   resolve('okay')
//   // reject('no')
// })

// console.log(promiseMe);

// const ans = promiseMe.then(
//   (result, error) => {
//     console.log(result);
//     return result;
//   }
// ).then((resolve, reject) => {
//   console.log(resolve);
//   return resolve;
// }).catch(error => {
//   console.log(error);
// })
// console.log(ans);

// function job() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//            resolve('hello world')
//       }, 2000)
//   })
// }

// job().then(result => {
//   console.log(result);
// })

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
GOOD LUCK 😀
*/

const API_KEY = `b71818fe43d18460911d1f62755a34ff`;
const ipAddress = `153.65.8.20`;

const URL = `http://api.ipstack.com/${ipAddress}?access_key=${API_KEY}`;

const whereAmI = function () {
	fetch(`${URL}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.success === false) throw new Error(`${data.error.info}`);

			console.log(`You are in ${data.city}, ${data.country_name}`);
			getCountryData(data.country_name);
			console.log(data);
		})
		.catch((err) => {
			renderError(`Something went wrong ${err.message}`);
		});
};

whereAmI(40.7831, -73.9712);

const promise = new Promise(function (resolve, reject) {
	// resolve(`hurray`);
	reject(`sike`);
});

promise
	.then((response) => {
		console.log(response);
	})
	.catch((err) => {
		console.log(err);
	});

// Promisfying setTimeout()

const wait = function (seconds) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, seconds * 1000);
	});
};

wait(2)
	.then(() => {
		console.log(`I waited for 2 seconds`);
		return wait(3);
	})
	.then(() => {
		console.log(`I waited for 3 seconds`);
	});

	// Get current position of user
	

	const getPosition = function() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				position => resolve(position),
				err => reject(err)
			)
		})
	}

	getPosition().then(response => {
		console.log(response);
	})
	.catch(err => {
		console.log(err);
	})