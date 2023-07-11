import classNames from 'classnames';

import { useFormContext } from 'react-hook-form';
import { InputType } from './types';

interface InputFieldProps {
	id?: string;
	name: string;
	type?: InputType;
	disabled?: boolean;
	placeholder?: string;
}

const InputField = ({
	id,
	name,
	type = InputType.NUMBER,
	disabled,
	placeholder,
}: InputFieldProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const error = errors[name]?.message;

	return (
		<div className="relative">
			<input
				disabled={disabled}
				id={id || name}
				type={type}
				{...register(name)}
				className={classNames(
					error ? 'border-red-500 text-red-500' : 'border-gray text-gray',
					'basic-input ',
				)}
				placeholder={placeholder}
			/>

			{error && (
				<p className="absolute text-red-500 mt-2 text-sm text-left">
					{error as string}
				</p>
			)}
		</div>
	);
};

export default InputField;
