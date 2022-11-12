activateTooltips();
addDropdownItemsListeners();
addSearchFieldListener();

function activateTooltips() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}

function addDropdownItemsListeners() {
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      const searchTextfield = document.querySelector("#search-input");
      const searchType = item.innerHTML;
      const searchBtn = document.querySelector("#search-button");
      searchBtn.innerHTML = searchType;
      updateInfoTooltip(searchType);
      setSearchSubmitBtnEnable(searchTextfield, searchBtn);
    });
  });
}

function addSearchFieldListener() {
  const searchTextfield = document.querySelector("#search-input");
  searchTextfield.addEventListener("input", function (evt) {
    const searchBtn = document.querySelector("#search-button");

    setSearchSubmitBtnEnable(this, searchBtn);
  });
}

function setSearchSubmitBtnEnable(searchTextField, searchBtn) {
  const searchBtnText = searchBtn.innerHTML.trim();
  const searchSubmitBtn = document.querySelector("#search-submit-btn");

  if (searchTextField.value == "") {
    searchSubmitBtn.setAttribute("disabled", "");
  } else if (searchBtnText != "Find country by") {
    searchSubmitBtn.removeAttribute("disabled");
  }
}

function updateInfoTooltip(searchType) {
  let tooltipText;

  switch (searchType) {
    case "Code":
      tooltipText =
        "Searching by country code.\nType the cca2, ccn3, cca3 or cioc code of the country you wish to visit.\nExamples: 'pe' (Peru), 'in' (India).";
      break;
    case "Currency":
      tooltipText =
        "Searching by country currency.\nType the currency name or code of the country you wish to visit.\nExamples: 'dollar', 'euro'.";
      break;
    case "Language":
      tooltipText =
        "Searching by country official language.\nType the language name or iso639_2 code of the country you wish to visit.\nExamples: 'German', 'Portuguese'.";
      break;
    case "Capital city":
      tooltipText =
        "Searching by country capital city.\nType the name of the capital city of the country you wish to visit.\nExamples: 'Berlin', 'Brasilia'.";
      break;
    case "Region":
      tooltipText =
        "Searching by country region.\nType the region name of the country you wish to visit.\nRegions: 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'.";
      break;
    case "Subregion":
      tooltipText =
        "Searching by country subregion.\nType the subregion name of the country you wish to visit.\nExamples: 'South America', 'Southern Europe', 'Central America', 'Eastern Asia'.";
      break;
    case "Denonym":
      tooltipText =
        "Searching by country denonym.\nType the denonym of the country you wish to visit.\nExamples: 'Brazillian', 'Peruvian', 'British'.";
      break;
    default:
      tooltipText =
        "Searching by country name.\nType the name of the country you wish to visit and use the search button.\nExamples: 'Peru', 'Brazil'.";
      break;
  }

  const tooltipBtn = document.querySelector("#tooltip-button");
  tooltipBtn.setAttribute("data-bs-original-title", tooltipText);
}

function submitSearch() {
  const searchHost = "https://restcountries.com/v3.1/";
  const searchBtn = document.querySelector("#search-button");
  const searchType = searchBtn.innerHTML;
  const searchText = document
    .querySelector("#search-input")
    .value.replace(/ /g, "%20");
  let searchEndpoint;
  switch (searchType) {
    case "Code":
      searchEndpoint = `alpha/${searchText}`;
      break;
    case "Currency":
      searchEndpoint = `currency/${searchText}`;
      break;
    case "Language":
      searchEndpoint = `lang/${searchText}`;
      break;
    case "Capital city":
      searchEndpoint = `capital/${searchText}`;
      break;
    case "Region":
      searchEndpoint = `region/${searchText}`;
      break;
    case "Subregion":
      searchEndpoint = `subregion/${searchText}`;
      break;
    case "Demonym":
      searchEndpoint = `demonym/${searchText}`;
      break;
    default:
      searchEndpoint = `name/${searchText}`;
      break;
  }
  const searchUri = searchHost + searchEndpoint;
  fetch(searchUri)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.status == 404) {
        let countryCountFlavor = document.querySelector(
          "#country-count-flavor"
        );
        countryCountFlavor.innerText =
          "Mundus didn't find any countries matching your search.";
        countryCountFlavor.classList.remove("d-none");
      } else {
        generateCountryCarousel(data);
      }
    });
}

function generateCountryCarousel(countryData) {
  let countryCountFlavor = document.querySelector("#country-count-flavor");
  let countryCount = countryData.length;
  if (countryCount > 1) {
    countryCountFlavor.innerText = `Mundus found ${countryCount} countries.`;
  } else {
    countryCountFlavor.innerText = `Mundus found ${countryCount} country.`;
  }
  countryCountFlavor.classList.remove("d-none");
  let countryIndex = 0;
  countryData.forEach((country) => {
    const countryInfo = {
      name: {
        official: country.name.official,
        common: country.name.common,
      },
      pngFlag: country.flags.png,
      pngCoatOfArms: country.coatOfArms.png,
      codes: {
        cca2: country.cca2,
        ccn3: country.ccn3,
        cca3: country.cca3,
        cioc: country.cioc,
      },
      independent: country.independent,
      unMember: country.unMember,
      demonyms: country.demonyms.eng.m,
      currencies: country.currencies,
      capital: country.capital[0],
      region: country.region,
      googleMaps: country.maps.googleMaps,
      subregion: country.subregion,
      languages: country.languages,
      latlng: country.latlng,
      population: country.population,
      timezones: country.timezones[0],
      continents: country.continents[0],
    };
    let dependency = countryInfo.independent
      ? "Independent"
      : "Not independent";
    let dependencyImageUrl = `img/${
      countryInfo.independent ? "independent" : "dependent"
    }.png`;
    let unMembership = countryInfo.unMember ? "UN member" : "Not a UN member";
    let unMembershipImageUrl = `img/${
      countryInfo.unMember ? "un" : "not-un"
    }.png`;
    let currencyName = Object.values(countryInfo.currencies)[0].name;
    let currencySymbol = Object.values(countryInfo.currencies)[0].symbol;
    let languageName = Object.values(countryInfo.languages)[0];

    let carouselItem = document.createElement("div");
    if (countryIndex == 0) {
      carouselItem.className = "carousel-item active";
    } else {
      carouselItem.className = "carousel-item";
    }
    carouselItem.innerHTML = `<div class="container-fluid">
      <div class="row">
        <div class="col-4 text-end">
          <img
            src="${countryInfo.pngCoatOfArms}"
            alt="country_coat_of_arms"
            height="100"
          />
        </div>
        <div class="col-4" style="font-size: 70px">${countryInfo.name.official}</div>
        <div class="col-4 text-start">
          <img
            src="${countryInfo.pngCoatOfArms}"
            alt="country_coat_of_arms"
            height="100"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4 text-end" style="font-size: 25px">
          <div class="container">
            <div class="row">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <span class="border-bottom">${countryInfo.codes.cca2}</span>
                  </div>
                </div>
                <div class="row" style="font-size: 20px;">
                  <div class="col-12">
                    cca2
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <span class="border-bottom">${countryInfo.codes.ccn3}</span>
                  </div>
                </div>
                <div class="row" style="font-size: 20px;">
                  <div class="col-12">
                    ccn3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <img
            src="${countryInfo.pngFlag}"
            height="100"
            alt="country_flag"
          />
        </div>
        <div class="col-4 text-start" style="font-size: 25px">
          <div class="container">
            <div class="row">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <span class="border-bottom">${countryInfo.codes.cca3}</span>
                  </div>
                </div>
                <div class="row" style="font-size: 20px;">
                  <div class="col-12">
                    cca3
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <span class="border-bottom">${countryInfo.codes.cioc}</span>
                  </div>
                </div>
                <div class="row" style="font-size: 20px;">
                  <div class="col-12">
                    cioc
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" >
        <div class="col-12 text-center">
          [${countryInfo.latlng[0]}, ${countryInfo.latlng[1]}]
        </div>
      </div>
      <div class="row mt-3" style="font-size:20px;">
        <div class="col-4">
          <img src="${dependencyImageUrl}" alt="dependency-icon" height="50">
          <span class='ms-3'>${dependency}</span>
        </div>
        <div class="col-4 mt-2">
          ${countryInfo.name.common} demonym: <strong>${countryInfo.demonyms}</strong>.
        </div>
        <div class="col-4">
          <span class='me-3'>${unMembership}</span>
          <img src="${unMembershipImageUrl}" alt="un-icon" height="50">
        </div>
      </div>
      <div class="row mt-4" style="font-size:20px;">
        <div class="col-4">
          <img src="img/currency.png" alt="currency-icon" height="50">
          <span class='ms-3'>${currencyName} (${currencySymbol})</span>
        </div>
        <div class="col-4 ">
          <img src="img/capital.png" alt="capital-icon" height="50">
          <span class="ms-2">${countryInfo.name.common}'s capital is <strong>${countryInfo.capital}</strong>.</span>
          
        </div>
        <div class="col-4">
          <span class='me-3'>${languageName}</span>
          <img src="img/language.png" alt="language-icon" height="50">
        </div>
      </div>
      <div class="row mt-5" style="font-size:20px;">
        <div class="col-4 align-self-center">
          <img src="img/region.png" alt="region-icon" height="50">
          <span class='ms-3'>${countryInfo.region}</span>
        </div>
        <div class="col-4 ">
          <iframe width="500" height="500" style="border:1px solid white; border-radius: 50px;" loading="lazy" allowfullscreen
          src="https://www.google.com/maps/embed/v1/place?q=${encodeURI(countryInfo.name.common)}&key=AIzaSyB-DIyUKOSzWMrf_a_tizF3Za-U3B945bg"></iframe>
        </div>
        <div class="col-4 align-self-center">
          <span class='me-3'>${countryInfo.subregion}</span>
          <img src="img/subregion.png" alt="subregion-icon" height="50">
        </div>
      </div>
      <div class="row mt-4" style="font-size:20px;" >
        <div class="col-4">
          <img src="img/population.png" alt="population-icon" height="50">
          <span class='ms-3'>${countryInfo.population} people</span>
        </div>
        <div class="col-4 ">
          <img src="img/continent.png" alt="continent-icon" height="50">
          <span class="ms-2">${countryInfo.continents}</span>
        </div>
        <div class="col-4">
          <span class='me-3'>${countryInfo.timezones}</span>
          <img src="img/timezone.png" alt="timezone-icon" height="50">
        </div>
      </div>
    </div>`;
    const carouselContainer = document.querySelector("#carousel-container");
    carouselContainer.appendChild(carouselItem);
    countryIndex++;
  });
}
