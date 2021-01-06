class ApiService{
    constructor(){
        this.baseUrl = 'http://localhost:3000'
    }

    async fetchTrips(){
        let resp = await fetch(this.baseUrl + '/trips')
        let data = await resp.json()
        return data 
    }
}