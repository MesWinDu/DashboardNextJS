"use client";
import React, { useState, useEffect } from 'react';
import { fetchPowerConsumptionData } from '@/lib/actions/fetchData';
import "./home.css";
import Link from 'next/link';
import GaugeChart from 'react-gauge-chart';

function Home() {
  const [date, setDate] = useState(new Date());
  const [powerData, setPowerData] = useState({
    alldata: {},
    date: {},
    power: '',
    isloading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      const data = await fetchPowerConsumptionData();
      setPowerData({ ...data, isloading: false, error: null });
    } catch (err) {
      setPowerData(prevState => ({
        ...prevState,
        isloading: false,
        error: err.message || 'Error fetching data'
      }));
    }
  };

  useEffect(() => {
    fetchData();
    // console.log(powerData.power)
    const interval = setInterval(fetchData, 60000); // 600000 milliseconds = 10 minutes
    return () => clearInterval(interval);
  }, []);

  const day = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (powerData.isloading) {
    return <div className='w-screen h-screen text-4xl flex items-center justify-center '>Loading...</div>;
  }

  if (powerData.error) {
    console.log(powerData.error, powerData.power);
  }
  

  return (
    <div className="app">
      <div className="div">
        <div className="text-header">โรงเรียน​บ้านยางเปา​ ห้องเรียนสาขาแม่ระมีดหลวง</div>
        <div className='sub-body'>
          <aside className="sidebar">
            <h5>{day}</h5>
            <h5>{date.toLocaleTimeString()}</h5>
          </aside>
          <div className="overlap-group">
            <div className="overlap">
              <div className="text-detail">ปริมาณไฟฟ้าที่ใช้งานของห้องเรียนทุกห้อง</div>
              <Link className="div-wrapper" href="/dashboard">
              {powerData.power} W
              </Link>
            </div>
            <div className="hide">I am shown when someone hovers over the div above.</div>
            {/* <img alt="map" src={require('../../img/map.png')}/> */}
            <div className='div-graph'>
              <div className='sub-graph'>
                <GaugeChart id="gauge-chart1"
                  nrOfLevels={1} 
                  percent={powerData.power/250} 
                  animate = {false}
                  hideText={true}
                  style={{height: '50px' }}
                />
                <div className='text-box'>
                  <p>ศักย์ไฟฟ้า</p>
                </div>
                <div className='status-box'>
                  <p className='status-text'>{powerData.power} V</p>
                </div>
              </div>
              <div className='sub-graph'>
                <GaugeChart id="gauge-chart1"
                  nrOfLevels={1} 
                  percent={powerData.power/250} 
                  animate = {false}
                  hideText={true}
                  style={{height: '50px' }}
                />
                <div className='text-box'>
                  <p>กระแสไฟฟ้า</p>
                </div>
                <div className='status-box'>
                  <p className='status-text'>{powerData.power} A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;