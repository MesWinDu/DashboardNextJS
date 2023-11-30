import axios from 'axios';

export const fetchPowerConsumptionData = async (range = '3h',field = 'Voltage') => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  try {
    const res = await axios.get(`${baseUrl}/api/data?range=${range}&field=${field}`);

    // Find the field with a non-empty 'Values' array
    const chosenField = Object.keys(res.data).find((field) => res.data[field].Values.length > 0);

    if (chosenField) {
      return {
        alldata: res.data[chosenField].Values,
        date: res.data[chosenField].Datetimes,
        power: res.data[chosenField].Values[res.data[chosenField].Values.length - 1],
      };
    } else {
      // Handle the case where none of the fields have non-empty 'Values' arrays
      return {
        alldata: [],
        date: [],
        power: null,
      };
    }

  } catch (err) {
    throw err;
  }
};