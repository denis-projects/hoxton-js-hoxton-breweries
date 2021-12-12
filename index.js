// Write your code here
const baseUrl = 'https://api.openbrewerydb.org/breweries'

const selectStateForm = document.querySelector('#select-state-form')
const filterSectionEl = document.querySelector('.filters-section')
const filterByCityForm = document.querySelector('#filter-by-city-form')

const state = {
    breweries: [],
    selectedState: null,
    breweryTypes: ['micro', 'regional', 'brewpub'],
    selectedBreweryType: '',
    selectedCities: []
}


function getBreweriesToDisplay() {
    let breweriesToDisplay = state.breweries

    breweriesToDisplay = breweriesToDisplay.filter(brewery =>
        state.breweryTypes.includes(brewery.brewery_type)
    )

    breweriesToDisplay = breweriesToDisplay.slice(0, 10)

    return breweriesToDisplay
}

// HELPER FUNCTIONS
function getCitiesFromBreweries(breweries) {
    let cities = []

    for (const brewery of breweries) {
        if (!cities.includes(brewery.city)) {
            cities.push(brewery.city)
        }
    }

    return cities
}

// SERVER FUNCTIONS
function fetchBreweries() {
    return fetch(baseUrl).then(resp => resp.json())
}

function fetchBreweriesByState(state) {
    return fetch(`${baseUrl}?by_state=${state}&per_page=50`).then(resp =>
        resp.json()
    )
}

// RENDER FUNCTIONS
function renderFilterSection() {
    if (state.breweries.length !== 0) {
        filterSectionEl.style.display = 'block'
    } else {
        filterSectionEl.style.display = 'none'
    }

    // destroy all the checkboxes
    filterByCityForm.innerHTML = ''

    // render all the checkboxes again
    const cities = getCitiesFromBreweries(state.breweries)

    for (const city of cities) {
        const inputEl = document.createElement('input')
        inputEl.setAttribute('type', 'checkbox')
        inputEl.setAttribute('class', 'city-checkbox')
        inputEl.setAttribute('name', city)
        inputEl.setAttribute('value', city)
        inputEl.setAttribute('id', city)

        const labelEl = document.createElement('label')
        labelEl.setAttribute('for', city)
        labelEl.textContent = city

        filterByCityForm.append(inputEl, labelEl)
    }
}

function renderBreweryList() { }

function render() {
    renderFilterSection()
    renderBreweryList()
}

function listenToSelectStateForm() {
    selectStateForm.addEventListener('submit', function (event) {
        event.preventDefault()
        state.selectedState = selectStateForm['select-state'].value

        fetchBreweriesByState(state.selectedState) // Promise<breweries>
            .then(function (breweries) {
                state.breweries = breweries
                render()
            })
    })
}

function init() {
    render()
    listenToSelectStateForm()
}

init()
