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
    case "Denonym":
      searchEndpoint = `denonym/${searchText}`;
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
        countryCountFlavor.classList.remove('d-none');
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
  countryCountFlavor.classList.remove('d-none');
  countryData.forEach((country) => {
    const countryInfo = {
      name: {
        official: country.name.official,
        common: country.name.common
      },
      codes: {
        cca2: country.cca2,
        ccn3: country.ccn3,
        cca3: country.cca3,
        cioc: country.cioc
      },
      independent: country.independent,
      unMember: country.unMember,
      currencies: country.currencies,
      capital: country.capital,
      region: country.region,
      subregion: country.subregion,
      languages: country.languages,
      latlng: country.latlng,
      denonyms: country.denonyms,
      googleMaps: country.maps.googleMaps,
      population: country.population,
      timezones: country.timezones,
      continents: country.continents,
      pngFlag: country.flags.png,
      pngCoatOfArms: country.coatOfArms.png
    };

    

    console.log(countryName);
  });
}
