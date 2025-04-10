'use client';

import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeatherDataPoint {
    date: string;
    minTemp: number;
    maxTemp: number;
    temp: number;
    description: string;
    icon: string;
}

interface WeatherChartProps {
    result?: {
        list?: Array<{
            dt: number;
            main: {
                temp: number;
                temp_min: number;
                temp_max: number;
            };
            weather: Array<{
                description: string;
                icon: string;
            }>;
        }>;
    };
}

const WeatherChart: React.FC<WeatherChartProps> = React.memo(({ result }) => {
    const { chartData, minTemp, maxTemp } = useMemo(() => {
        if (!result?.list?.length) {
            return { chartData: [], minTemp: 0, maxTemp: 0 };
        }

        const weatherData: WeatherDataPoint[] = result.list.map((item) => ({
            date: new Date(item.dt * 1000).toLocaleDateString(),
            minTemp: Number((item.main.temp_min - 273.15).toFixed(1)),
            maxTemp: Number((item.main.temp_max - 273.15).toFixed(1)),
            temp: Number((item.main.temp - 273.15).toFixed(1)),
            description: item.weather[0]?.description || '',
            icon: item.weather[0]?.icon || ''
        }));

        const allTemps = weatherData.flatMap(data => [data.minTemp, data.maxTemp, data.temp]);
        const minTempValue = Math.min(...allTemps);
        const maxTempValue = Math.max(...allTemps);

        return {
            chartData: weatherData,
            minTemp: Math.floor(minTempValue),
            maxTemp: Math.ceil(maxTempValue)
        };
    }, [result]);

    if (!result?.list?.length) {
        return <div className="text-center p-4">No weather data available</div>;
    }

    return (
        <div className="w-full h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[minTemp - 1, maxTemp + 1]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temp" stroke="#8884d8" name="Temperature" />
                    <Line type="monotone" dataKey="minTemp" stroke="#82ca9d" name="Min Temperature" />
                    <Line type="monotone" dataKey="maxTemp" stroke="#ff7300" name="Max Temperature" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
});

WeatherChart.displayName = 'WeatherChart';

export default WeatherChart; 