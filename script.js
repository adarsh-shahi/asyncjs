const countriesContainer = document.querySelector(".countries");

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
	countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
	fetch(`https://restcountries.com/v3.1/name/${country}`)
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function ([data]) {
			console.log(data);
			renderCountry(data);
			return fetch(`https://restcountries.com/v3.1/name/${data.borders[5]}`);
		})
		.then(function (resolve) {
			return resolve.json();
		})
		.then(function ([data]) {
			console.log(data);
			renderCountry(data, "neighbour");
		})
};
getCountryData("bharat");

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
