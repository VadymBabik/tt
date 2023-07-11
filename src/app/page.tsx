'use client';

import { useEffect, useState } from 'react';
import CitiesTable from '@/components/CitiesTable/CitiesTable';
import WeatherCharts from '@/components/WeatherCharts/WeatherCharts';
import SelectedCitiesList from '@/components/SelectedCityesList/SelectedCitiesList';
import SearchCity from '@/components/SearchCity/SearchCity';
import TemperatureFilterForm from '@/components/TemperatureFilterForm/TemperatureFilterForm';
import useCity from '@/hooks/useCity/useCity';
import useWeather from '@/hooks/useWeather/useWeather';
import { Weather } from '@/types/types';

const HomePage = () => {
	const { cities, addCity, selectedCities } = useCity();
	const { temperatureCities, setTemperature } = useWeather(cities);
	const [weather, setWeather] = useState<Weather>(temperatureCities[0]);

	useEffect(() => {
		if (temperatureCities && !weather) {
			setWeather(temperatureCities[0]);
		}
	}, [weather, temperatureCities]);

	return (
		<main className="py-4 container mx-auto">
			<div className="flex items-center space-x-2 pb-4">
				<SearchCity cities={cities} setCity={addCity} />
				<TemperatureFilterForm temperatureFilter={setTemperature} />
			</div>
			<SelectedCitiesList cities={cities} selectedCities={selectedCities} />
			<CitiesTable
				cities={temperatureCities}
				weather={weather}
				setWeather={setWeather}
			/>
			<WeatherCharts cityWeather={weather} />
		</main>
	);
};

export default HomePage;
