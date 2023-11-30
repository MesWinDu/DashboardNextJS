"use client";
import React, { useState, useEffect } from 'react';
import { fetchPowerConsumptionData } from '@/lib/actions/fetchData';
import "./home.css";
import Link from 'next/link';
import GaugeChart from 'react-gauge-chart';

function Home() {
  const [date, setDate] = useState(new Date());
  const [powerData1, setpowerData1] = useState({
    alldata: {},
    date: {},
    power: '',
    voltage: '',
    current: '',
    energy: '',
    frequency: '',
    isloading: true,
    error: null,
  });
  const [powerData2, setpowerData2] = useState({
    alldata: {},
    date: {},
    power: '',
    voltage: '',
    current: '',
    energy: '',
    frequency: '',
    isloading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      const data1 = await fetchPowerConsumptionData(selectedRange, 'Watt', '1', 'PowerMeter1');
      setpowerData1({ ...data1, isloading: false, error: null });
      const data2 = await fetchPowerConsumptionData(selectedRange, 'Watt', '1', 'PowerMeter2');
      setpowerData2({ ...data2, isloading: false, error: null });
    } catch (err) {
      setpowerData1(prevState => ({
        ...prevState,
        isloading: false,
        error: err.message || 'Error fetching data'
      }));
      setpowerData2(prevState => ({
        ...prevState,
        isloading: false,
        error: err.message || 'Error fetching data'
      }));
    }
  };

  useEffect(() => {
    fetchData();
    // console.log(powerData1.power)
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

  if (powerData1.isloading) {
    return <div className='w-screen h-screen text-4xl flex items-center justify-center '>Loading...</div>;
  }

  if (powerData1.error) {
    console.log(powerData1.error, powerData1.power);
  }
  

  return (
    <div className="app">
      <div className="div">
        <div className="time">
          <h5>{day}</h5>
          <h5>{date.toLocaleTimeString()}</h5>
        </div>
        <div className="text-header">โรงเรียน​บ้านยางเปา​ ห้องเรียนสาขาแม่ระมีดหลวง</div>
        <div className='sub-body'>
          <div className="overlap-group">
            <div className="overlap">
              <div className="text-detail">ปริมาณกำลังไฟฟ้าที่ผลิตจากโซลาร์เซลล์</div>
              <Link className="div-wrapper" href="/dashboard/watt1">
              {powerData1.power === '' ? '-' : `${powerData1.power} W`}
              </Link>
            </div>
            <div className="hide">I am shown when someone hovers over the div above.</div>
            {/* <img alt="map" src={require('../../img/map.png')}/> */}
            <div className='div-graph'>
              <div className='sub-graph'>
                <GaugeChart id="gauge-chart1"
                  nrOfLevels={1} 
                  percent={powerData1.voltage/250} 
                  animate = {false}
                  hideText={true}
                  style={{height: '50px' }}
                />
                <div className='text-box'>
                  <p>แรงดันไฟฟ้า</p>
                </div>
                <Link className='status-box' href="/dashboard/voltage1">
                  <p className='status-text'>{powerData1.voltage === '' ? '-' : `${powerData1.voltage} V`}</p>
                </Link>
              </div>
              <div className='sub-graph'>
                <GaugeChart id="gauge-chart1"
                  nrOfLevels={1} 
                  percent={powerData1.current/30} 
                  animate = {false}
                  hideText={true}
                  style={{height: '50px' }}
                />
                <div className='text-box'>
                  <p>กระแสไฟฟ้า</p>
                </div>
                <Link className='status-box' href="/dashboard/current1">
                  <p className='status-text'>{powerData1.current === '' ? '-' : `${powerData1.current} A`}</p>
                </Link>
              </div>
              <div className='sub-graph'>
                {/* <GaugeChart id="gauge-chart1"
                  nrOfLevels={1} 
                  percent={powerData1.power/250} 
                  animate = {false}
                  hideText={true}
                  style={{height: '50px' }}
                /> */}
                <div className='title'>
                  <div>
                    <p>พลังงาน</p>
                  </div>
                  <Link className='status-box' style={{marginLeft:'20px'}} href="/dashboard/energy1">
                    <p className='status-text'>{powerData1.energy === '' ? '-' : `${powerData1.energy} kWh`}</p>
                  </Link>
                </div>
                <div className='title'>
                  <div>
                    <p>ความถี่</p>
                  </div>
                  <div className='status-box' style={{marginLeft:'20px'}}>
                    <p className='status-text'>{powerData1.frequency === '' ? '-' : `${powerData1.frequency} Hz`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='sub-body'>
          <div className="overlap-group">
            <div className="overlap">
              <div className="text-detail">ปริมาณกำลังไฟฟ้าภายในห้องคอมพิวเตอร์</div>
              <Link className="div-wrapper" href="/dashboard/watt2">
              {powerData2.power === '' ? '-' : `${powerData2.power} W`}
              </Link>
            </div>
            <div className="hide">I am shown when someone hovers over the div above.</div>
            {/* <img alt="map" src={require('../../img/map.png')}/> */}
            <div className='div-graph'>
              <div className='sub-graph'>
                <GaugeChart id="gauge-chart1"
                  nrOfLevels={1} 
                  percent={powerData2.voltage/250} 
                  animate = {false}
                  hideText={true}
                  style={{height: '50px' }}
                />
                <div className='text-box'>
                  <p>แรงดันไฟฟ้า</p>
                </div>
                <Link className='status-box' href="/dashboard/voltage2">
                  <p className='status-text'>{powerData2.voltage === '' ? '-' : `${powerData2.voltage} V`}</p>
                </Link>
              </div>
              <div className='sub-graph'>
                <GaugeChart id="gauge-chart1"
                  nrOfLevels={1} 
                  percent={powerData2.current/30} 
                  animate = {false}
                  hideText={true}
                  style={{height: '50px' }}
                />
                <div className='text-box'>
                  <p>กระแสไฟฟ้า</p>
                </div>
                <Link className='status-box' href="/dashboard/current2">
                  <p className='status-text'>{powerData2.current === '' ? '-' : `${powerData2.current} A`}</p>
                </Link>
              </div>
              <div className='sub-graph'>
                {/* <GaugeChart id="gauge-chart1"
                  nrOfLevels={1} 
                  percent={powerData1.power/250} 
                  animate = {false}
                  hideText={true}
                  style={{height: '50px' }}
                /> */}
                <div className='title'>
                  <div>
                    <p>พลังงาน</p>
                  </div>
                  <Link className='status-box' style={{marginLeft:'20px'}} href="/dashboard/energy2">
                    <p className='status-text'>{powerData2.energy === '' ? '-' : `${powerData2.energy} kWh`}</p>
                  </Link>
                </div>
                <div className='title'>
                  <div>
                    <p>ความถี่</p>
                  </div>
                  <div className='status-box' style={{marginLeft:'20px'}}>
                    <p className='status-text'>{powerData2.frequency === '' ? '-' : `${powerData2.frequency} Hz`}</p>
                  </div>
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