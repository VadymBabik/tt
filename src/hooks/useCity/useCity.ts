import { useCallback, useState } from 'react';
import { filter } from 'lodash';
import { Cities, City } from '@/types/types';
import citiesDefault from '../../assets/city.json';

const useCity = () => {
	const [cities, setCities] = useState<Cities>(citiesDefault);

	const selectedCities = useCallback(
		(city: City) =>
			setCities(prevState =>
				filter(prevState, prevCity => prevCity.name !== city.name),
			),
		[setCities],
	);

	const addCity = useCallback(
		(city: City) => setCities(prevState => prevState.concat(city)),
		[setCities],
	);

	return { cities, selectedCities, addCity };
};

export default useCity;
