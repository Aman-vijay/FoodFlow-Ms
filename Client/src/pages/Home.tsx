import React from 'react'
import { useState,useEffect } from 'react';

const Home = () => {

    const [resData,setResData] = useState([]);

  const getResData = async()=>{
    try{
    const res = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.9792244&lng=75.7706016&collection=83667',
      {
        headers:{
          "user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1"
        }
      }
     

    )
    const data = await res.json();
    const realData = data.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    console.log(realData);
    setResData(realData);
  }
  catch(Err){
    console.log(Err);
  }
  }
  useEffect(()=>{getResData()},[]);

  return (
    <div>Home</div>
  )
}

export default Home