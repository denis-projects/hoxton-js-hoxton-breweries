// Write your code here
const baseUrl = 'https://api.openbrewerydb.org/breweries'

const selectStateForm = document.querySelector('#select-state-form')

const filterSectionEl = document.querySelector('.filters-section')
console.log(filterSectionEl)

const state = {
    breweries: [],
    selectedState: null,
    breweryTypes: ['micro', 'regional', 'brewpub']
}

function getBreweriesToDisplay() {
    let breweriesToDisplay = state.breweries

    breweriesToDisplay = breweriesToDisplay.filter(brewery =>
        state.breweryTypes.includes(brewery.brewery_type)
    )

    breweriesToDisplay = breweriesToDisplay.slice(0, 10)
    return breweriesToDisplay
}


function fetchBreweries() {
    return fetch(baseUrl).then(resp => resp.json())
}


function fetchBreweriesByState(state) {
    return fetch(`${baseUrl}?by_state=${state}`).then(resp => resp.json())
}


function renderFilterSection() {
    if (state.breweries.length !== 0) {
        filterSectionEl.style.display = "block"
    } else {
        filterSectionEl.style.display = "none"
    }
}

function renderBreweryList() {

}

function render() {
    renderFilterSection()
    renderBreweryList()
}


function listenToSelectStateForm() {
    selectStateForm.addEventListener("submit", function (event) {
        event.preventDefault()
        state.selectedState = selectStateForm['select-state'].value

        fetchBreweriesByState(state.selectedState)
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