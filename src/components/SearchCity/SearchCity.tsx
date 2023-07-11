import { Fragment, useEffect, useState } from 'react';
import { size, some } from 'lodash';
import { Combobox } from '@headlessui/react/dist/components/combobox/combobox';
import { Transition } from '@headlessui/react/dist/components/transitions/transition';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import useGeocoding from '@/hooks/useGeocoding/useGeocoding';
import { Cities, City } from '@/types/types';

interface SearchCityProps {
	cities: Cities;
	setCity: (city: City) => void;
}

const SearchCity = ({ cities, setCity }: SearchCityProps) => {
	const [searchCities, setSearchCities] = useState<Cities>(cities);
	const [query, setQuery] = useState<string>('');
	const { data } = useGeocoding(query);

	useEffect(() => {
		if (data?.results && size(data?.results) > 0) {
			setSearchCities(prevState => prevState.concat(data.results));
		}
	}, [data]);

	const filteredCities =
		query === ''
			? searchCities
			: searchCities.filter(person =>
					person.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, '')),
			  );

	return (
		<div className="relative w-[190px]">
			<Combobox value={searchCities[0]} onChange={city => setCity(city)}>
				<div className=" w-full cursor-default overflow-hidden rounded-lg  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
					<Combobox.Input
						placeholder="Country"
						className="basic-input border-gray text-gray"
						onChange={event => setQuery(event.target.value)}
					/>
					<Combobox.Button
						onClick={() => setSearchCities(cities)}
						className="absolute inset-y-0 right-0 flex items-center pr-4"
					>
						<ChevronDownIcon
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</Combobox.Button>
				</div>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					afterLeave={() => {
						setQuery('');
						setSearchCities(cities);
					}}
				>
					<Combobox.Options className="no-scrollbar w-full absolute z-50 mt-1 max-h-60 overflow-auto rounded-md bg-gray-light border border-gray py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredCities.length === 0 && query !== '' ? (
							<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
								Nothing found.
							</div>
						) : (
							filteredCities.map(city => (
								<Combobox.Option
									key={city?.id || city.name}
									disabled={some(cities, ['name', city.name])}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active
												? 'bg-gray-dark text-gray cursor-pointer'
												: 'text-gray'
										}`
									}
									value={city}
								>
									{({ selected, disabled }) => (
										<span>
											{disabled && (
												<CheckIcon
													className="h-5 w-5 absolute inset-y-0 left-1 top-2"
													aria-hidden="true"
												/>
											)}
											<span
												className={`block truncate disabled${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												{city.name}
											</span>
										</span>
									)}
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</Transition>
			</Combobox>
		</div>
	);
};

export default SearchCity;
