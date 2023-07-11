export interface City {
	id?: number;
	name: string;
	latitude: number;
	longitude: number;
}

export type Cities = City[];

export interface Geocoding {
	id?: number;
	name: string;
	latitude: number;
	longitude: number;
}
export interface ResponseGeocoding {
	results: Cities;
}

export interface Weather {
	city: City;
	current_weather: CurrentWeather;
	daily: {
		time: string[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
	};
}

export interface CurrentWeather {
	winddirection: number;
}

export interface Temperature {
	min: number;
	max: number;
}

export const enum TemperatureFields {
	MIN = 'min',
	MAX = 'max',
}
