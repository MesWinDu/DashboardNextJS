export function convertUnixTimestampToDateTime(unixTimestamp) {
    // Multiply by 1000 to convert seconds to milliseconds
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
  
    // Format the date and time
    const year = dateObject.getFullYear();
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObject.getDate()).slice(-2);
    const hours = ('0' + dateObject.getHours()).slice(-2);
    const minutes = ('0' + dateObject.getMinutes()).slice(-2);
    const seconds = ('0' + dateObject.getSeconds()).slice(-2);
  
    // Construct the formatted date and time string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedDateTime;
  }