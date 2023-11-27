
import { useEffect, useState } from 'react';
import ApexChart from 'react-apexcharts';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Statistics = () => {
    const axiosSecure = useAxiosSecure();
    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: 'bookings-by-date',
            },
            xaxis: {
                categories: [],
            },
        },
        series: [
            {
                name: 'Bookings',
                data: [],
            },
        ],
    });
    useEffect(() => {
        // Fetch data for the bar chart
        axiosSecure.get('/bookingsByDate')
            .then(response => {
                const data = response.data;
                // console.log(data);
                // Extract data for X and Y axes
                const dates = data.map(entry => {
                    // Assuming the date format is 'YYYY-MM-DD', adjust this according to your actual format
                    return entry._id.day + '-' + entry._id.month + '-' + entry._id.year;
                }); const bookings = data.map(entry => entry.bookings);
                //console.log(dates);
                // Set chart data
                setChartData({
                    options: {
                        chart: {
                            id: 'bookings-by-date',
                        },
                        xaxis: {
                            categories: dates,
                        },
                    },
                    series: [
                        {
                            name: 'Bookings',
                            data: bookings,
                        },
                    ],
                });
            })
            .catch(error => {
                console.error('Error fetching bookings by date:', error);
            });
    }, [axiosSecure]);

    return (
        <div className=''>
            <h1 className='text-4xl text-red-400 font-bold'>Bookings by Date</h1>
            <ApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={400}
            />
        </div>
    );
};

export default Statistics;
