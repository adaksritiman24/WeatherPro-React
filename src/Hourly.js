import React,{Component} from 'react'
// import {Line} from "../node_modules/react-chartjs-2";
import "./App.css";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

  

export default class Hourly extends Component {
    state = {
      data : null,
    }  



    static getData(data){
      var arr = []
      data.hourly.slice(0,24).forEach(element => {
        var dt = new Date((element.dt+data.timezone_offset)*1000);
        var am_pm;
        if(dt.getUTCHours()>=12){
          am_pm = "PM";
        }else{
          am_pm = "AM";
        }
        var temp = parseInt(element.temp - 273);
        var time = (dt.getUTCHours()%12 || 12)+":"+ dt.getUTCMinutes()+am_pm;
        arr.push(
          {
            hour : time,
            temp : temp,
          }
        );
      });
      return arr;
    }

    static getDerivedStateFromProps(props, state){

      return {
        data : Hourly.getData(props.data),
      }
    }

    render(){
      console.log(this.state.data);
      return (
        <div id = "hourly">
            <h3 style = {{textAlign:"center"}}>Hourly forcast</h3>
            {/* <Line data={this.state.data} options={this.state.options} height={70}/> */}
            <ResponsiveContainer>
            <LineChart data = {this.state.data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
              <CartesianGrid horizontal={false} stroke="rgba(0,0,0,0.35)" width="90%"/>
              <XAxis label={{ value:"Time" , dy: 22, fontStyle:"bold"}} strokeWidth={4} stroke="black" dataKey="hour" interval={2} style={{width:5, fill:"black", fontFamily: 'sans-serif' , fontSize: 13 , fontStyle:"bold"}}/>
              <YAxis label={{ value:"Temperature", angle: -90, dx : -40}} stroke="blue" padding={{ bottom: 20, top:20 }} tickFormatter={value=> value+" °C"} tickSize="12" domain={['dataMin', 'dataMax']} style={{ fill:"black", paddingLeft : 40}}/>
              <Tooltip/>
              
                <Line type="monotone" dataKey="temp" name =  "Temperature" strokeWidth={5} stroke = "blue" activeDot={{r:8}} label = {{position:"top", fill: 'black', fontSize: 20 }} dot={false}/>
            </LineChart>
            </ResponsiveContainer>
        </div>
      )
    }  
    
}
