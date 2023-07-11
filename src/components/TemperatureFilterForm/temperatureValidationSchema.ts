import * as yup from 'yup';

export const temperatureValidationSchema = yup.object({
	min: yup
		.number()
		.transform(value =>
			isNaN(value) || value === null || value === undefined ? 0 : value,
		)
		.integer('Value must be an integer')
		.min(-80, 'Min value -80')
		.max(80, 'Max value 80')
		.lessThan(yup.ref('max'), 'Min cannot be greater than Max'),

	max: yup
		.number()
		.transform(value =>
			isNaN(value) || value === null || value === undefined ? 0 : value,
		)
		.nullable()
		.integer('Value must be an integer')
		.min(-80, 'Min value -80')
		.max(80, 'Max value 80')
		.moreThan(yup.ref('min'), 'Max cannot be greater than min'),
});
