const countriesContainer = document.querySelector(".countries");

const getCountryData = function (country) {
	const request = new XMLHttpRequest();
	request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
	request.send();

	request.addEventListener("load", function () {
		const [data] = JSON.parse(this.responseText);
		console.log(data);

		const html = `<article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 cla ss="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${data.population}</p>
    <p class="country__row"><span>🗣️</span>${data.languages}</p>
    <p class="country__row"><span>💰</span>${data.currencies}</p>
  </div>
</article>`;

		countriesContainer.insertAdjacentHTML("afterbegin", html);
		countriesContainer.style.opacity = 1;
	});
};

getCountryData("bharat");
getCountryData("usa");
getCountryData("portugal");
