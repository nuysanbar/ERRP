import { useLoaderData,NavLink } from "react-router-dom";
import React, {useState} from "react";
import ReactApexChart from "react-apexcharts"
import axios from "axios";
export async function loader(){
  var totalAmount=[], date=[];
    const access_token=window.localStorage.getItem('access_token');
    const apiUrl=`http://localhost:3500/home/dashboard`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    const response=res.data
    response.map((item)=>{
      totalAmount.push(item.TotalAmount);
      date.push(item.date)
    })
    console.log(response)
    return {response,totalAmount,date};
}
export default function Dashboard(){
    const {response, totalAmount,date}=useLoaderData()
    return (
        <div className="dashboard">
         <Graph totalAmount={totalAmount} date={date}/>
        <div className="orders">
          <h3>Recent orders </h3>
          <ul>
            {
              response.map((item)=>{
                return(
                  <li key={item.date}>
                    <NavLink to={`/home/products/${item.barcode}`}>{item.ItemName} with {item.TotalAmount} on {item.date}</NavLink>
                  </li>
                )
              })
            }
          </ul>
        </div>
        </div>
    )
}
const Graph=({totalAmount,date})=>{

  const [graphData, setGraphData]=useState({
    series: [{
      name: 'series1',
      data: totalAmount
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: date
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  })
  return (
    <div id="chart" className="chart">
      <div>
           <ReactApexChart options={graphData.options} series={graphData.series} type="area" height={350} />
           <div className="chartInfo">
           <p>x-axis : date || y-axis : change of value</p>
           </div>
      </div>
      <div>
      <ReactApexChart options={graphData.options} series={graphData.series} type="bar" height={350} />
        <div className="chartInfo">
            <p>x-axis : date || y-axis : value of the sold product</p>
        </div>
      </div>
    </div>)
}