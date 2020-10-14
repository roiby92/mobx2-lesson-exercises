import { observable, computed, action } from 'mobx'
import { Reservation } from './ReservationStore'


export class RestaurantStore {
    @observable reservations = []
    @observable numTables = 10

    @computed get totalReservations() { //automatically calculates the total reservations
        return this.reservations.length
    }
    @computed get openTables() { //automatically caluclates the number of tables avalible, only when the state is affected
        let counter = 0
        this.reservations.forEach(r => r.seated && !r.completed ? counter++ : null)
        return (this.numTables - counter)
    }
    @computed get restPopulation() {
        let popultaion = 0
        const seatedReservations = this.reservations.filter(r => r.seated  && !r.completed)
        seatedReservations.forEach(sr=>popultaion+=parseInt(sr.numPeople))
        return popultaion
    }
    @computed get completedTables() {
        const completed = this.reservations.filter(r => r.seated  && !r.completed)
        return completed.length 
    }
    @action addRes = (name, numPeople) => {
        this.reservations.push(new Reservation(name, numPeople))
    }
    @action seatRes = (id) => {
        const reservationToSeated = this.reservations.find(r=> r.id === id)
        reservationToSeated.seated = true
    }
    @action completeRes = (id) => {
        const reservationToComplete = this.reservations.find(r=> r.id === id)
        reservationToComplete.completed = true
    }
}