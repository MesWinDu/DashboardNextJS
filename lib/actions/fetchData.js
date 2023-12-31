import axios from 'axios';

export const fetchPowerConsumptionData = async (range = '3h',field = 'Voltage',main='0' ,measurement='PowerMeter1') => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  try {
    const res = await axios.get(`${baseUrl}/api/data?range=${range}&field=${field}&main=${main}&measurement=${measurement}`);

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

export const fetchALlConsumptionData = async (range = '3h',field = 'Voltage',main='1' ,measurement='PowerMeter1') => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  try {
    const res = await axios.get(`${baseUrl}/api/data?range=${range}&field=${field}&main=${main}&measurement=${measurement}`);
    console.log(res.data.Energy.Values[0])
    
    return {
      power : res.data.Power.Values[0],
      voltage: res.data.Voltage.Values[0],
      current : res.data.Current.Values[0],
      energy : res.data.Energy.Values[0],
      frequency : res.data.Frequency.Values[0],
    };

  } catch (err) {
    throw err;
  }
};