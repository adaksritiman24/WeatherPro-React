import React, { Component } from 'react'
import "./App.css"

export default class Days extends Component {
    state={
        daily : null,
    }
    static getDerivedStateFromProps(props, state){
        return {
            daily : props.daily,
        }
    }
    render() {
        const all_days = this.state.daily.map((element)=>{
            return (
                <div className="dayItem">
                    <h1>{ parseInt(element.max - 273) } °C</h1>
                    <span>hi</span> 
                    <br/><br/>
                    <h2>{ parseInt(element.min - 273) } °C</h2>   
                    <span>lo</span>
                    <hr/>
                    <h3>{element.date}</h3>
                </div>
            )
        });
        return (
            <div className = "upcomming">
                {all_days}
            </div>
        )
    }
}
