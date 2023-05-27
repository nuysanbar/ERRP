import { useLoaderData } from "react-router-dom";
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

    console.log(totalAmount,date)
    return {response,totalAmount,date};
}
export default function Dashboard(){
    const {response, totalAmount,date}=useLoaderData()
    return (
        <>
         <Graph totalAmount={totalAmount} date={date}/>
        </>
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
    <div id="chart">
    <ReactApexChart options={graphData.options} series={graphData.series} type="area" height={350} />
    </div>)
}