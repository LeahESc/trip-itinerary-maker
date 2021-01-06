class Trip {
    constructor(data){
        this.destination = data.destination
        this.categories = data.categories
    }

    renderTrip(){
        return `
        <h2>${this.destination}</h2>
        `
    }
}