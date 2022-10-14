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
			const neighbour = data.borders[5];
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

// const promise = new Promise(function (resolve, reject) {
// 	// resolve(`hurray`);
// 	reject(`sike`);
// });

// promise
// 	.then((response) => {
// 		console.log(response);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

// Promisfying setTimeout()

// wait(2)
// 	.then(() => {
// 		console.log(`I waited for 2 seconds`);
// 		return wait(3);
// 	})
// 	.then(() => {
// 		console.log(`I waited for 3 seconds`);
// 	});

// Get current position of user

const getPosition = function () {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => resolve(position),
			(err) => reject(err)
		);
	});
};

// let lat = "";
// let lan = "";

// getPosition()
// 	.then((response) => {
// 		lat = response.coords.latitude;
// 		lan = response.coords.longitude;
// 		console.log(response);
// 		return fetch(`https://geocode.xyz/${lat},${lan}?geoit=json`);
// 	})
// 	.then((response) => {
// 		if (!response.ok)
// 			throw new Error(`Problem with geocoding ${response.status}`);
// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log(`You are in ${data.city}, ${data.state}, ${data.country}`);
// 		getCountryData(data.country);
// 		console.log(data);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 		renderError(`Something went wrong ${err.message}`);
// 	});

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉
PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image 
(use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it
 to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case
  there is an error loading the image ('error' event), reject the promise.
If this part is too tricky for you, just watch the first part of the solution.
PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element 
	returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.
TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev
 tools Network tab, otherwise images load too fast.
GOOD LUCK 😀
*/
const imageContainer = document.querySelector(".images");
let img = "";

const createImage = function (imgPath) {
	return new Promise((resolve, reject) => {
		img = document.createElement("img");
		img.src = imgPath;
		img.addEventListener("load", () => {
			imageContainer.insertAdjacentElement("beforeend", img);
			resolve(img);
		});
		img.addEventListener("error", () => {
			reject(new Error(`image not found`));
		});
	});
};

let currentImg = "";

// getPosition()
// 	.then((response) => {
// 		lat = response.coords.latitude;
// 		lan = response.coords.longitude;
// 		console.log(response);
// 		return fetch(`https://geocode.xyz/${lat},${lan}?geoit=json`);
// 	})
// 	.then((response) => {
// 		if (!response.ok)
// 			throw new Error(`Problem with geocoding ${response.status}`);
// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log(`You are in ${data.city}, ${data.state}, ${data.country}`);
// 		getCountryData(data.country);
// 		console.log(data);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 		renderError(`Something went wrong ${err.message}`);
// 	});

// async function always returns promise
const whereAmI = async function () {
	try {
		const pos = await getPosition();
		const { latitude: lat, longitude: lan } = pos.coords;
		const response = await fetch(
			`https://geocode.xyz/${lat},${lan}?geoit=json`
		);
		console.log(response.ok);
		if (!response.ok) throw new Error(`Cannot find country`);

		const data = await response.json();
		console.log("came here");
		getCountryData(data.country);
		return `You are in ${data.city}, ${data.state}, ${data.country}`;
	} catch (err) {
		console.log(err.message);
		renderError(`Something went wrong ${err.message}`);
		// reject promise returned from async function
		throw err;
	}
};

// whereAmI()
// 	.then((response) => {
// 		console.log(`Noice you are in ${response}`);
// 	})
// 	.catch((err) => {
// 		console.error(`Return catch ${err}`);
// 	})
// 	.finally(() => {
// 		console.log(`Finally finished`);
// 	});

// (async () => {
// 	try {
// 		const data = await whereAmI();
// 		console.log(`Noice you are in ${data}`);
// 	} catch (err) {
// 		console.error(`Return catch ${err}`);
// 	}
// })();

// Running promises in parallel

const get3Countries = async (c1, c2, c3) => {
	// const data1 = await getJSON(`https://restcountries.com/v3.1/name/${c1}`, "Country not found");
	// const data2 = await getJSON(`https://restcountries.com/v3.1/name/${c2}`, "Country not found");
	// const data3 = await getJSON(`https://restcountries.com/v3.1/name/${c3}`, "Country not found");
	// console.log([data1[0].capital[0], data2[0].capital[0], data3[0].capital[0]]);

	// Promise.all() is like short circuiting if one promise fails then every promise fails
	const data = await Promise.all([
		getJSON(`https://restcountries.com/v3.1/name/${c1}`),
		getJSON(`https://restcountries.com/v3.1/name/${c2}`),
		getJSON(`https://restcountries.com/v3.1/name/${c3}`),
	]);
	const capitalCities = data.map((d) => {
		return d[0].capital[0];
	});
	console.log(capitalCities);
};

get3Countries("india", "portugal", "usa");
const wait = function (seconds) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, seconds * 1000);
	});
};
/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await
 (only the part where the promise is consumed). Compare the two versions, think about the big
  differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools
 Network tab.
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function 
(call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).
TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' 
function.
GOOD LUCK 😀
*/

const loadNPause = async function () {
	try {
		let currentImage = await createImage("./img-1.jpg");
		await wait(2);
		currentImage.style.display = "none";
		currentImage = await createImage("./img-2.jpg");
		await wait(2);
		currentImage.style.display = "none";
	} catch (err) {
		console.log(err);
	}
};

loadNPause();
 
console.log(`*************`);
const loadAll = async function (imgArr) {
	try {
		const imgs = imgArr.map(async (img) => {
			return await createImage(img);  // returns a promise
		});
		console.log(imgs);
		const imgsEL = await Promise.all(imgs);  // get setteled value from static method
		console.log(imgsEL);
		imgsEL.forEach(img => {
			img.classList.add('parallel')
		})
	} catch (err) {
		console.log(err);
	}
};

loadAll(["img-1.jpg", "img-2.jpg", "img-3.jpg"]);

const jsonStr = `{"name": "adarsh", "age": 20, "male": true}`
const data = JSON.parse(jsonStr);
data.name = 'adarsh shahi'
console.log(JSON.stringify(data));
