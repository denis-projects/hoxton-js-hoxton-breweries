// Write your code here
const baseUrl = 'https://api.openbrewerydb.org/breweries'

const selectStateForm = document.querySelector('#select-state-form')

const state = {
    breweries: [],
    selectedState: null
}


function getBreweries() {
    return fetch(baseUrl).then(resp => resp.json())
}


function getBreweriesByState(state) {
    return fetch(`${baseUrl}?by_state=${state}`).then(resp => resp.json())
}


function render() { }


function listenToSelectStateForm() {
    selectStateForm.addEventListener("submit", function (event) {
        event.preventDefault()
        state.selectedState = selectStateForm['select-state'].value

        getBreweriesByState(state.selectedState)
            .then(function (breweries) {
                state.breweries = breweries
            })

    })
}


function init() {
    listenToSelectStateForm()
}

init()