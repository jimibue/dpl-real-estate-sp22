import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

/// the data we get back from get api/city_cost
// const apiData = [
//   {
//     city: "Draper",
//     prices: "1161926, 1423343, 783624, 476955, 1450745",
//     price_count: 5,
//     id: null
//   },
//   { city: "SLC", prices: "1158470, 361843, 1129166", price_count: 3, id: null },
//   {
//     city: "Sandy",
//     prices: "512221, 715319, 499264, 904875, 1171001, 1048041, 755925, 1239597",
//     price_count: 8,
//     id: null
//   }
// ];

export default function CityCost() {
    const [chartData, setChartData] = useState(null)

   useEffect(()=>{
       getCityCostData()
   },[]) 

   const getCityCostData = async()=>{
       try{
           // get data
           let res = await axios.get('/api/city_cost')
           // convert data
           let convertedChartData = apiDataToChartData(res.data)
           //    console.log('convertedData:', convertedData)
           setChartData(convertedChartData)
       }catch(err){
           alert(err)
       }
   }

  // this to convertData  
  const apiDataToChartData = (apiDataHere) => {
    const chartDataHere = apiDataHere.map((cityPrice) => {
      // need to find the average price from each cityPrice
      let prices = cityPrice.prices.split(", ");
      let sum = prices.reduce((accum, price) => {
        return accum + parseInt(price);
      }, 0);
      let average = Math.floor(sum / cityPrice.price_count);
      return { city: cityPrice.city, price: average };
    });
    console.log("chartDataHere:", chartDataHere);

    return chartDataHere;
  };
  if(!chartData){
      return <p>no chart data</p>
  }
  return (
    <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="1 12" />
      <XAxis dataKey="city" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="price" fill="#8884d8" />
    </BarChart>
  );
}



