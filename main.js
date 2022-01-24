
const countriesList = document.querySelector("#countries")


let countries

countriesList.addEventListener("change", event => displayCountryInfo(event.target.value))

fetch("https://restcountries.com/v2/all")
    .then(res => res.json())
    .then(data => initialize(data))
    .catch(err => console.log(`Error ${err}`))

    function initialize(countriesData) {
        countries = countriesData
        let options = ""
        countries.forEach(country => options += `<option value="${country.alpha3Code}">${country.name}</option>`)
        countriesList.innerHTML = options
        countriesList.selectedIndex = Math.floor(Math.random()*250)
        displayCountryInfo(countriesList[countriesList.selectedIndex].value)
        
    }

    function displayCountryInfo(countryByAlpha3Code) {
        const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code)
        console.log(countryData)
        document.querySelector("#flag-container img").src = countryData.flag
        document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`
        document.getElementById("capital").innerHTML = countryData.capital
        document.getElementById("dialing-code").innerHTML = ` +${countryData.callingCodes[0]}`
        document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US")
        document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ")
        document.getElementById("region").innerHTML = countryData.region
        document.getElementById("sub-region").innerHTML = countryData.subregion
       
    }
        
        

   