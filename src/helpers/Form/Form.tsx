import { FormEventHandler, ReactNode } from 'react';

interface FormProps {
	children: ReactNode;
	className?: string;
	method?: 'POST';
	onSubmit?: FormEventHandler<HTMLFormElement>;
	id?: string;
}

function Form({
	children,
	className,
	id,
	method = 'POST',
	onSubmit,
}: FormProps) {
	return (
		<form className={className} id={id} method={method} onSubmit={onSubmit}>
			{children}
		</form>
	);
}

export default Form;
