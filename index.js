// Write your code here
const baseUrl = 'https://api.openbrewerydb.org/breweries'

const selectStateForm = document.querySelector('#select-state-form')

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
}


function fetchBreweries() {
    return fetch(baseUrl).then(resp => resp.json())
}


function fetchBreweriesByState(state) {
    return fetch(`${baseUrl}?by_state=${state}`).then(resp => resp.json())
}


function render() { }


function listenToSelectStateForm() {
    selectStateForm.addEventListener("submit", function (event) {
        event.preventDefault()
        state.selectedState = selectStateForm['select-state'].value

        fetchBreweriesByState(state.selectedState)
            .then(function (breweries) {
                state.breweries = breweries
            })

    })
}


function init() {
    listenToSelectStateForm()
}

init()