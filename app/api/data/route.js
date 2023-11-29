// app/api/data/route.js
import { convertUnixTimestampToDateTime } from '@/lib/utils';
import { InfluxDB } from '@influxdata/influxdb-client';

export const GET = async (request) => {
    try {
        const influxDB = new InfluxDB({
            url: process.env.INFLUX_URL,
            token: process.env.INFLUX_TOKEN,
        });

        const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG);
        const query1 = `
            from(bucket: "${process.env.INFLUX_BUCKET}")
            |> range(start: -48h)
            |> filter(fn: (r) => r._measurement == "PowerMeter1")
            |> filter(fn: (r) => r._field == "Voltage" or r._field == "Timestamp")
            |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")`;

        const rows = await queryApi.collectRows(query1);
        const Voltage = [];
        const timeLines = [];

        rows.forEach((row) => {
            const voltage = row.Voltage;
            const timestamp = row.Timestamp;
            const Filtered = convertUnixTimestampToDateTime(timestamp);

            if (voltage <= 400 && voltage >= -1) {
                Voltage.push(voltage);
                timeLines.push(Filtered.split(" "));
            }
        });

        const result = {
            Voltage: Voltage,
            Datetimes: timeLines,
        };

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
  