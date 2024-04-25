"use client"

import  {  useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface transactions {
  amount:number,
  timestamp:Date,
  fromUserId:number,
  toUserId:number,
  currentUser:number
}

const P2PChart = ({transactions}: {transactions: transactions[]}) => {

  const [stockData,setStockData]=useState<any>([]);
  useEffect(()=>{
    const data=transactions.map((t)=>{
      if(t.currentUser===t.fromUserId){
        return ({
          timeStamp:t.timestamp,
          price:-t.amount/100
        })
      }else{
        return ({
          timeStamp:t.timestamp,
          price:t.amount/100
        })
      }
      
    }).reverse();
    console.log(data);
    
    setStockData(data);
  },[]);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <LineChart
        width={900}
        height={400}
        data={stockData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default P2PChart;
