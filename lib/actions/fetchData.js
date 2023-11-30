import axios from 'axios';

export const fetchPowerConsumptionData = async () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  try {
    const res = await axios.get(`${baseUrl}/api/data`);
    console.log(res.data)
    return {
      alldata: res.data.Voltage.Values,
      date: res.data.Datetimes,
      power: res.data.Voltage.Values[res.data.Voltage.length - 1],
    };

  } catch (err) {
    throw err;
  }
};
