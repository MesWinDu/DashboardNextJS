import axios from 'axios';

export const fetchPowerConsumptionData = async () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  try {
    const res = await axios.get(`${baseUrl}/api/data`);
    // console.log(res.data.Voltage[res.data.Voltage.length - 1])
    return {
      alldata: res.data.Voltage,
      date: res.data.DateTimes,
      power: res.data.Voltage[res.data.Voltage.length - 1],
    };

  } catch (err) {
    throw err;
  }
};
