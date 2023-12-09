"use client"
import "./index.css";
import { LineChart } from "@/components/LineChart";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { fetchPowerConsumptionData } from '@/lib/actions/fetchData';

const Dashboard = () => {
    const [selectedRange, setSelectedRange] = useState('3h');

    const handleRangeChange = (e) => {
      setSelectedRange(e.target.value);
      // Call the function to fetch data based on the selected range
      // fetchPowerConsumptionData(e.target.value);
    };
    const [powerData, setPowerData] = useState({
        alldata: {},
        date: {},
        power: '',
        isloading: true,
        error: null,
      });
    
      const fetchData = async () => {
        try {
          const data = await fetchPowerConsumptionData(selectedRange, 'Power', '0', 'PowerMeter2');
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
      }, [selectedRange]);
    return (
    <div className="w-screen h-screen flex flex-col">
        <div className='div-text'>
            <Link  className='btn btn-primary' href="/">หน้าแรก</Link>
        </div>
        <div className='w-full flex justify-center items-center mb-4'>
          <h1 className="text-3xl">กำลังไฟฟ้าภายในห้องคอมพิวเตอร์</h1>
        </div>
        <div className='dropdown w-full flex justify-center mb-4'>
          <label htmlFor="range">Select Range:</label>
          <select id="range" value={selectedRange} onChange={handleRangeChange}>
            <option value="3h">3h</option>
            <option value="24h">24h</option>
            <option value="48h">48h</option>
          </select>
        </div>
        <div className='graph'>
            <LineChart
            alldata={powerData.alldata} 
            date= {powerData.date} 
            />
        </div>
        
    </div>
    )
}

export default Dashboard;