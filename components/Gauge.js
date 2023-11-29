"use client"
import GaugeChart from 'react-gauge-chart'

export function gauge() {
    return <GaugeChart id="gauge-chart2" 
            nrOfLevels={20} 
            percent={0.86} 
        />
}