"use client"
import "./index.css";
import { LineChart } from "@/components/LineChart";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { fetchPowerConsumptionData } from '@/lib/actions/fetchData';

const Dashboard = () => {
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
    return (
    <div>
        <div className='div-text'>
            <Link  className='btn btn-primary' href="/">หน้าแรก</Link>
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