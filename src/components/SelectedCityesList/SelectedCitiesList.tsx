import { Cities, City } from '@/types/types';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { map } from 'lodash';

interface SelectedCitiesListProps {
	cities: Cities;
	selectedCities: (city: City) => void;
}

const SelectedCitiesList = ({
	cities,
	selectedCities,
}: SelectedCitiesListProps) => {
	return (
		<div className="flex flex-wrap gap-2 py-4">
			{map(cities, city => (
				<span
					key={city.name}
					className="text-xs flex items-center justify-center text-white gap-x-2 border border-gray-700 pl-2 py-1 pr-1 rounded-full"
				>
					<span>{city.name}</span>
					<button onClick={() => selectedCities(city)}>
						<XCircleIcon className="w-5 h-5 text-gray-light hover:text-red-500/80" />
					</button>
				</span>
			))}
		</div>
	);
};

export default SelectedCitiesList;
