import { FormProvider, useForm } from 'react-hook-form';
import Form from '@/helpers/Form/Form';
import { Temperature, TemperatureFields } from '@/types/types';
import InputField from '../../helpers/formField/InputField/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { temperatureValidationSchema } from '@/components/TemperatureFilterForm/temperatureValidationSchema';

interface TemperatureFormProps {
	temperatureFilter: (temperature: Temperature | null) => void;
}

const TemperatureFilterForm = ({ temperatureFilter }: TemperatureFormProps) => {
	const form = useForm<Temperature>({
		resolver: yupResolver(temperatureValidationSchema),
		mode: 'onSubmit',
	});

	return (
		<FormProvider {...form}>
			<Form
				className="flex gap-2 items-center"
				onSubmit={form.handleSubmit(data => temperatureFilter(data))}
			>
				<InputField name={TemperatureFields.MIN} placeholder="Min" />
				<InputField name={TemperatureFields.MAX} placeholder="Max" />

				{form.formState.isDirty && (
					<div className="flex gap-2">
						<button
							className="btn bg-blue-500/50 hover:bg-blue-500/70"
							type="submit"
						>
							Apply
						</button>
						<button
							className="btn bg-red-500/50 hover:bg-red-500/70"
							onClick={() => {
								form.reset(), temperatureFilter(null);
							}}
							type="button"
						>
							Reset
						</button>
					</div>
				)}
			</Form>
		</FormProvider>
	);
};

export default TemperatureFilterForm;
