import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Weather } from '@/types/types';
import { format } from 'date-fns';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const getGradient = (
	ctx: {
		createLinearGradient: (
			arg0: number,
			arg1: any,
			arg2: number,
			arg3: any,
		) => any;
	},
	chartArea: {
		right: number;
		left: number;
		bottom: number;
		top: number;
	},
	start_color: string,
	stop_color: string,
) => {
	let width, height, gradient;
	const chartWidth = chartArea.right - chartArea.left;
	const chartHeight = chartArea.bottom - chartArea.top;
	if (gradient === null || width !== chartWidth || height !== chartHeight) {
		width = chartWidth;
		height = chartHeight;
		gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
		gradient.addColorStop(0, stop_color);
		gradient.addColorStop(1, start_color);
	}
	return gradient;
};

const calculateTemperature = (min: number[], max: number[]) => {
	const result = [];
	for (let i = 0; i < min?.length; i++) {
		const average = (min[i] + max[i]) / 2;
		result.push(average);
	}

	return result;
};

interface WeatherChartsProps {
	cityWeather: Weather;
}

const WeatherCharts = ({ cityWeather }: WeatherChartsProps) => {
	const options = {
		responsive: true,

		scales: {
			y: {
				grid: { color: '#313131', lineWidth: 2 },
				border: {
					dash: [10],
				},
			},
		},

		plugins: {
			legend: {
				position: 'top' as const,
			},
		},
	};

	const data = {
		labels: cityWeather?.daily.time.map(
			time => time && format(new Date(time), 'EE'),
		),
		datasets: [
			{
				maxBarThickness: 80,
				label: 'Temperature',
				data: calculateTemperature(
					cityWeather?.daily.temperature_2m_min,
					cityWeather?.daily.temperature_2m_max,
				),
				backgroundColor: function (context: { chart: any }) {
					const chart = context.chart;
					const { ctx, chartArea } = chart;
					if (!chartArea) {
						return null;
					}
					return getGradient(ctx, chartArea, '#B3FC4F', '#173102');
				},
				borderRadius: 20,
			},
		],
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl text-white py-6">
				Analytics {cityWeather?.city.name}
			</h2>
			<Bar options={options} data={data} />
		</div>
	);
};
export default WeatherCharts;
