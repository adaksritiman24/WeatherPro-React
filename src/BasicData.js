import React, { Component } from 'react'
import "./App.css"

export default class BasicData extends Component {

    state = {
        data : null,
    }
    static getDerivedStateFromProps(props, state){
        console.log(props);
        return props;
    }
    render() {
        return (
            <div className = "header">
                <div className = "info-left">
                    <h1>{this.state.data.name}</h1>
                    <p><b>{this.state.data.country}</b><br/>{this.state.data.date_time}</p>
                    <br/>
                    <p>Sunrise: {this.state.data.sunrise} | Sunset: {this.state.data.sunset}</p>
                </div>
                <div className = "info-right">
                    <h2>{ parseInt(this.state.data.temp - 273) } °C</h2>
                    <p>Feels like : {parseInt(this.state.data.feels_like - 273)} °C</p>
                    <hr/>
                    <p>{this.state.data.type}</p>
                    <p>Wind: {this.state.data.wind} m/sec | Gusts: {this.state.data.gusts} m/sec</p>
                </div>
            </div>
        )
    }
}
