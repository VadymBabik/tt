import classnames from 'classnames';
import { last, map } from 'lodash';
import { Weather } from '@/types/types';
import HeaderItem from '@/components/CitiesTable/components/HeaderItem';

interface CitiTableProps {
	cities: Weather[];
	weather: Weather;
	setWeather: (weather: Weather) => void;
}

const CitiesTable = ({ cities, setWeather, weather }: CitiTableProps) => {
	return (
		<div className="z-10  overflow-x-auto rounded-[12px]">
			<table className="overflow-hidden w-full text-sm text-left text-white border border-gray-light">
				<thead className="bg-black">
					<tr>
						<HeaderItem title="City" />
						<HeaderItem title="Temperature max" />
						<HeaderItem title="Temperature min" />
						<HeaderItem title="Wind direction" />
					</tr>
				</thead>
				<tbody>
					{map(cities, city => (
						<tr
							key={city?.city.name}
							className={classnames(
								city === weather
									? 'text-blue-500 hover:text-blue-700'
									: 'hover:text-gray-500 ',
								'bg-gray-light odd:bg-gray-dark hover:cursor-pointer',
							)}
							onClick={() => setWeather(city)}
						>
							<td className="p-4">{city?.city.name}</td>
							<td className="p-4">{last(city?.daily.temperature_2m_max)}</td>
							<td className="p-4">{last(city?.daily.temperature_2m_min)}</td>
							<td className="p-4">{city?.current_weather.winddirection}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CitiesTable;
