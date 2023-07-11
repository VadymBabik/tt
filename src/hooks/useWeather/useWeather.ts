import { useMemo, useState } from 'react';
import { useQueries } from 'react-query';
import { filter, map } from 'lodash';
import { api } from '@/service/apiService';
import { City, Temperature, Weather } from '@/types/types';

const useWeather = (city: City[]) => {
	const [temperature, setTemperature] = useState<Temperature | null>(null);

	const data = useQueries(
		city.map(city => {
			return {
				queryKey: [`weather-${city.name}`],
				queryFn: () => api.weather.weatherCity(city),
			};
		}),
	);

	const cityWeather = useMemo<Weather[]>(
		() => map(data, data => data.data),
		[data],
	);

	const temperatureCities = useMemo<Weather[]>(
		() =>
			cityWeather.length > 0 && temperature !== null
				? filter(
						cityWeather,
						city =>
							city?.daily.temperature_2m_max[6] <= temperature?.max &&
							city.daily.temperature_2m_min[6] >= temperature?.min,
				  )
				: cityWeather,

		[cityWeather, temperature],
	);

	return { temperatureCities, setTemperature };
};

export default useWeather;
