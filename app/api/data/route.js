// app/api/data/route.js
import { convertUnixTimestampToDateTime } from '@/lib/utils';
import { InfluxDB } from '@influxdata/influxdb-client';

export const GET = async (request) => {
    try {
        const searchParams = Object.fromEntries(request.nextUrl.searchParams)
        const range = searchParams.range || '48h'; // Use optional chaining to handle undefined query object
        const field = searchParams.field || "Voltage"
        const main = searchParams.main || 0
        const measurement = searchParams.measurement || "PowerMeter1"
        const influxDB = new InfluxDB({
            url: process.env.INFLUX_URL,
            token: process.env.INFLUX_TOKEN,
        });
        const fieldsToProcess = ['Voltage', 'Current', 'Energy', 'Frequency', 'Power'];
        const dataByField = {};
        const timeLinesByField = {};
        if(main == 0){
        const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG);
        const query1 = `
            from(bucket: "${process.env.INFLUX_BUCKET}")
            |> range(start: -${range})
            |> filter(fn: (r) => r._measurement == "${measurement}")
            |> filter(fn: (r) => r._field == "${field}" or r._field == "Timestamp")
            |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")`;

            const rows = await queryApi.collectRows(query1);
            
            fieldsToProcess.forEach((field) => {
                dataByField[field] = [];
                timeLinesByField[field] = [];
            });
    
            rows.forEach((row) => {
                fieldsToProcess.forEach((field) => {
                    if (row.hasOwnProperty(field)) {
                        const value = row[field];
                        const timestamp = row.Timestamp;
                        const filtered = convertUnixTimestampToDateTime(timestamp);
                        dataByField[field].push(value);
                        timeLinesByField[field].push(filtered.split(" "));
                        
                    }
                });
            });
        }else{
            const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG);
            const query2 =`from(bucket: "${process.env.INFLUX_BUCKET}")
            |> range(start: -${range})
            |> filter(fn: (r) => r._measurement == "${measurement}")
            |> last()
            |> group(columns: ["_field"])
            |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
              `;
            const rows = await queryApi.collectRows(query2);
            // console.log(rows)
            fieldsToProcess.forEach((field) => {
                dataByField[field] = [];
                timeLinesByField[field] = [];
            });

            rows.forEach((row) => {
                
                fieldsToProcess.forEach((field) => {
                    if (row.hasOwnProperty(field)) {
                        const value = row[field];
                        
                        const timestamp = row.Timestamp;
                        const filtered = convertUnixTimestampToDateTime(timestamp);
                            dataByField[field].push(value);
                            timeLinesByField[field].push(filtered.split(" "));
                        
                    }
                    
                });
            })

        }
            const result = {};

            fieldsToProcess.forEach((field) => {
                result[field] = {
                    Values: dataByField[field],
                    Datetimes: timeLinesByField[field],
                };
            });

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", {
            status: 500
        });
    }
};
  