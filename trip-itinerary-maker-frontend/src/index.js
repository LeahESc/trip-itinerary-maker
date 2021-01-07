const apiService = new ApiService()
// const BASE_URL = 'http://localhost:3000'
let formDiv = document.getElementById("trip-form")
let  main = document.querySelector("#main")

const init = () => {
    bindEventListeners()
    renderTrips()
}

function bindEventListeners(){
    document.getElementById("new-trip").addEventListener('click', displayTripForm)
    document.getElementById("trips").addEventListener('click', renderTrips)
}

async function renderTrips() { 
    main.innerHTML = ''
    const trips = await apiService.fetchTrips()
    trips.map(t => {
    const trip = new Trip(t)
    trip.renderTrip()
    trip.renderButtons()
    
    attachClicksToButtons()
    })   
}
  
function displayTripForm(){
    let html = `
    <form>
        <label>Name Your Destination:</label>
        <input type="text" id="destination">
        <input type="submit">
    </form>
    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createTrip)
}

function clearForm() {
    formDiv.innerHTML = ""
}

async function createTrip(e){
    e.preventDefault()
    let trip = {
        destination: e.target.querySelector("#destination").value
    }
    const data = await apiService.createNewTrip(trip) 
    const newTrip = new Trip(data)
    main.innerHTML += newTrip.renderNewTrip()
    newTrip.renderButtons()
    attachClicksToButtons()
    clearForm() 
}

function attachClicksToButtons() {
    const viewButtons = document.querySelectorAll("#viewBtn")
    const deleteButtons = document.querySelectorAll("#deleteBtn")
    viewButtons.forEach(button => { 
        button.addEventListener('click', showTrip)
    })
    deleteButtons.forEach(button => { 
        button.addEventListener('click', removeTrip)
    })
}

async function removeTrip(e){
    const id = e.target.dataset.id
    await apiService.deleteTrip(id) 
    renderTrips()
}

async function showTrip(e) { 
    const id = e.target.dataset.id
    main.innerHTML = ""
    const data = await apiService.fetchTrip(id)
    const showTrip = new Trip(data)

    showTrip.displayTrip()
    showTrip.categories.forEach(category => {
        let newCategory = new Category(category)
        newCategory.renderCategory(showTrip.id)
    })
    addEventsToCategoryBtn()
    addEventsToItemBtn()
    addEventsToRemoveItemBtn()
    
}

function addEventsToCategoryBtn(){
    document.querySelector("#categoryBtn").addEventListener('click', displayCategoryForm)
}

function addEventsToItemBtn(){
    const itemButtons = document.querySelectorAll("#itemBtn")
    itemButtons.forEach(button => button.addEventListener('click', displayItemForm))
}

function addEventsToRemoveItemBtn(){
    document.querySelectorAll("#removeItem").forEach(button => button.addEventListener('click', removeItem))
}

async function displayCategoryForm(e){ 
    const categoryButton = document.querySelector("#categoryBtn")
    let categoryDiv = document.querySelector('#category-div')
    const tripId = categoryDiv.dataset.tripid
    categoryDiv.removeChild(categoryButton)
    
    let categoryFormDiv = document.createElement("div")
    categoryFormDiv.setAttribute("id","c-form-div")
    categoryDiv.appendChild(categoryFormDiv) 
    
    const data = await apiService.fetchCategories()
    let categoryCheckboxes = data.map(c => `<label for="${c.id}">${c.name}</label><input type="checkbox" id="${c.id}" value="${c.name}" name="category[name]">`).join('')
    
    categoryFormDiv.innerHTML =  `
    <form id="category-form" data-tripId="${tripId}">
        <label>Select from Existing:</label>
        ${categoryCheckboxes} <br>
        <label>Create a New Category:</label>
        <input type="text" id="name">
        <input type="submit">
    </form>
    `
    document.querySelector("#category-form").addEventListener('submit', createCategory)
}

function clearCategoryForm(){ 
    const categoryDiv = document.querySelector('#category-div')
    let categoryFormDiv = document.querySelector('#c-form-div')
    categoryFormDiv.parentNode.removeChild(categoryFormDiv)
    
    let addCategory = document.createElement("button")
    addCategory.setAttribute("id", "categoryBtn")
    categoryDiv.appendChild(addCategory)
    addCategory.setAttribute("class", "btn btn-secondary")
    addCategory.innerHTML = `Add Category`   
    addEventsToCategoryBtn()
}


async function createCategory(e){
    e.preventDefault()
   const arr= Array.from(document.querySelectorAll("input")).filter(c => c.checked === true)
    if (arr.length === 0){
        const newCategory = {
            name: e.target.querySelector("#name").value,
            trip_ids: [e.target.dataset.tripid]
        }
        const data = await apiService.createCategory(newCategory)
        const createdCategory = new Category(data)
        createdCategory.renderCategory()
        
        addEventsToItemBtn()
        clearCategoryForm()    
    } else { 
        const newTripCategory = {
            trip_id: e.target.dataset.tripid,
            category_id: arr[0].id
        }
        const data = await apiService.createTripCategory(newTripCategory)
        const createdTC = new TripCategory(data)
        createdTC.renderTripCategory()
        
        addEventsToItemBtn()    
        clearCategoryForm()   
    }
}

function displayItemForm(e){ 
    let itemBtn = e.target
    let parent = itemBtn.parentNode
    let categoryId = parent.id
    parent.removeChild(itemBtn)
    let itemForm = document.createElement('div')
    itemForm.setAttribute("id", "item-form")
    parent.appendChild(itemForm)

    itemForm.innerHTML =  `
     <form id="new-item-form" data-categoryId="${categoryId}">
        <label>Add your new activity:</label>
        <input type="text" id="name"> <br>
        <input type="submit">
     </form>
     `
    document.querySelector("#item-form").addEventListener('submit', createNewItem) 
}

async function createNewItem(e){
    const tripId = document.querySelector("#category-div").dataset.tripid
    const item = {
        name: e.target.querySelector("#name").value,
        category_id: e.target.dataset.categoryid,
        trip_id: tripId
    }
    const data = await apiService.createItem(item)
    const newItem = new Item(data)
    newItem.renderItem(e) 
    addEventsToItemBtn()
    addEventsToRemoveItemBtn()
    clearItemForm()
}

async function removeItem(e){
    const id = e.target.dataset.id
    await apiService.deleteItem(id) 
    renderTrips()
}

function clearItemForm() {
    const itemForm = document.querySelector("#item-form")
    itemForm.parentElement.removeChild(itemForm)
}

init()