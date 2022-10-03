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
      if(!neighbour) throw new Error(`No Neighbour Found`)
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

btn.addEventListener("click", function () {
	getCountryData("bharat");
});

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
