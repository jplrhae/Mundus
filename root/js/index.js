activateTooltips();
addDropdownItemsListeners();
addSearchFieldListener();

function addSearchFieldListener() {
  const searchTextfield = document.querySelector("#search-input");
  searchTextfield.addEventListener("input", function (evt) {
    const searchTypeDropdown = document.querySelector(".dropdown-item");
    if (searchTypeDropdown.innerHTML != 'Find country by' && this.value != '') {
      const searchBtn = document.querySelector('#search-submit-btn');
      searchBtn.removeAttribute('disabled');
    }


  });
}

function addDropdownItemsListeners() {
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      const searchType = item.innerHTML;
      const searchBtn = document.querySelector("#search-button");
      searchBtn.innerHTML = searchType;
      updateInfoTooltip(searchType);
    });
  });
}

function activateTooltips() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
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
