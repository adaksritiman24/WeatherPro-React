
import Search from './Search';
import Hourly from './Hourly'
import BasicData from './BasicData';
import React, { Component } from 'react'
import "./App.css";
import Days from './Days';

export default class App extends Component {
  state = {
    data : null,
    head : null,
    daily : null,
  }
  getTime=(unix, timezone)=>{
    var date = new Date((unix+timezone)*1000);
    const hr = date.getUTCHours() %12 || 12;
    var am_pm;
    if(date.getUTCHours() >=12){
      am_pm = "PM";
    }else{
      am_pm = "AM";
    }
    const min = date.getUTCMinutes();
    return hr+":"+min+" "+am_pm;
  }
  
  getDate=(unix)=>{
    const mon = ['Jan', 'Feb','Mar','Apr','May','Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec'];
    var date = new Date((unix)*1000);
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    return day+" "+mon[month];
  }


  getSearchDetails=(city)=>{
    console.log(city);
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=c357e28e8217f3817b3972e1efb50268")
    .then(
        (response) =>(response.json())
    )
    .then(
        (data)=>{

            var longitude = data.coord.lon;
            var latitude = data.coord.lat;

            var date = new Date((data.dt + data.timezone)*1000);

            const day = date.getUTCDay();
            const month = date.getUTCMonth();
            const year = date.getUTCFullYear();

            const hr = date.getUTCHours() %12 || 12;
            var am_pm;
            if(date.getUTCHours() >=12){
              am_pm = "PM";
            }else{
              am_pm = "AM";
            }
            const min = date.getUTCMinutes();

            const dateTime = hr+":"+min+" "+am_pm+", "+ day+"/"+(month+1)+"/"+year;
            this.setState(
              {
                'head' : {
                  'name' : data.name,
                  'country' : data.sys.country,
                  'temp' : data.main.temp,
                  'feels_like' : data.main.feels_like,
                  'date_time' : dateTime,
                  'type' : data.weather[0].main,
                  'wind' : data.wind.speed,
                  'gusts': data.wind.gust,
                  'sunrise' : this.getTime(data.sys.sunrise, data.timezone),
                  'sunset' : this.getTime(data.sys.sunset, data.timezone),
                }
              }
            )
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid=c357e28e8217f3817b3972e1efb50268")
            
            .then(
                data =>(data.json())
            )
            .then(
                data=>{

                    this.setState({
                      'data': data,
                      'daily' : data.daily.map((day)=>{
                        return {
                          min : day.temp.min,
                          max : day.temp.max,
                          date : this.getDate(day.dt),
                        }
                      })
                    });
                    console.log(this.state.daily);
                }
            )

        }
    )
    .catch(
        (err)=>{
            alert("Not Found!");
        }
    )
  }
  render() {
    return (
      <>
        <div className = "banner">
          <img className="logo" src = {process.env.PUBLIC_URL+ "/imgs/sun.png"} alt="not found :("/>
          <h1 id = "title">WeatherPro.org</h1>
          
        </div>  
        <Search getSearchDetails = {this.getSearchDetails}/>
        {
          (()=>{
            if(this.state.data){

              return (
                <>
                <div className="chart-holder">
                <BasicData data = {this.state.head}/>
                </div>
                
                <div className = "chart-holder">
                  <Hourly data = {this.state.data}/>
                </div>
                <div className="chart-holder">
                <h3 className="df"> 8 days Forcast </h3>
                </div>
                
                <div className = "chart-holder">
                  <Days daily = {this.state.daily}/>
                </div>
                </>
              )
            }
          })()
        }
        <footer className="footer">
          <p>Made with openweathermap.org by adakSritiman24</p>
        </footer>
      </>
    )
  }
}
