import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import ResInput from './ResInput';
import Reservation from './Reservation';

@inject("GeneralStore", "RestaurantStore")

@observer
class Restaurant extends Component {

    handleAdd = () => {
        const reservation = this.props.GeneralStore
        this.props.RestaurantStore.addRes(reservation.name,reservation.numPeople)
        this.props.GeneralStore.handleInput("name", '')
        this.props.GeneralStore.handleInput("numPeople", 0)
    }

    render() {
        const { RestaurantStore } = this.props
        return (
            <div>
                <span>You have {this.props.RestaurantStore.openTables} open tables</span>
                <div>{RestaurantStore.restPopulation}</div>
                <div>{RestaurantStore.completedTables}</div>
                <ResInput />
                <button id="addRes" onClick={this.handleAdd}>Add Reservation</button>
                {/* Make the Add Reservation button work */}
                <div className="reservations">
                    {RestaurantStore.reservations.map(r => <Reservation key={r.id} res={r} />)}
                </div>
            </div>
        )
    }
}

export default Restaurant