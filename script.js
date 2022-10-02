const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, classname = '') {
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

const getCountryAndNeighbour = function (country) {
	const request = new XMLHttpRequest();
	request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
	request.send();

	request.addEventListener("load", function () {
		const [data] = JSON.parse(this.responseText);
		console.log(data);
		renderCountry(data);

		const [neighbour] = data.borders;
		if (!neighbour) return;
		console.log(neighbour);

		const request2 = new XMLHttpRequest();
		request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
		request2.send();

		request2.addEventListener("load", function () {
			const data2 = JSON.parse(this.responseText);
			console.log(data2);
			renderCountry(data2, 'neighbour');
		}); 
	});
};
 
getCountryAndNeighbour("bharat");
// getCountryAndNeighbour("usa");
// getCountryAndNeighbour("portugal");


setTimeout(() => {
	console.log(`1 sec passed`);
	setTimeout(() => {
		console.log(`2 sec passed`);
		setTimeout(() => {
			console.log(`3 sec passed`);
			setTimeout(() => {
				console.log(`4 sec passed`);
				setTimeout(() => {
					console.log(`5 sec passed`);
					setTimeout(() => {
						console.log(`6 sec passed`);
						setTimeout(() => {
							console.log(`7 sec passed`);
						}, 1000)
					}, 1000)
				}, 1000)
			}, 1000)
		}, 1000)
	}, 1000)
}, 1000)