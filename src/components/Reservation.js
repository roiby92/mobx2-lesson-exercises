import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

@inject("RestaurantStore")
class Reservation extends Component {

    handleSeated = () => {
        this.props.RestaurantStore.seatRes(this.props.res.id)
    }

    handleCompleted = () => {
        this.props.RestaurantStore.completeRes(this.props.res.id)
    }


    render() {
        const reservation = this.props.res
        return (
            <div className={reservation.completed  ? 'conditional' : null}>
                <p>{reservation.name}</p>
                <p>{reservation.numPeople}</p>
                <button onClick={this.handleSeated}>Seated</button>
                <button onClick={this.handleCompleted}>Completed</button>
            </div>
        )
    }
}

export default Reservation