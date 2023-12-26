import { useRef, useState } from 'react';
import FormRegistr from './component/FormRegistr';

const initialValue = {
	email: '',
	password: '',
	confirmPassword: '',
};

export const useStore = () => {
	const [formDataValues, setFormDataValues] = useState(initialValue);

	return {
		getValues: () => formDataValues,
		setValues: (targetName, targetValues) => {
			setFormDataValues({ ...formDataValues, [targetName]: targetValues });
		},
		resetValues: () => setFormDataValues(initialValue),
	};
};

export const App = () => {
	const btnRef = useRef(null);
	const passwordRef = useRef('');
	const confirmPasswordRef = useRef('');

	const [errorMessage, setErrorMessage] = useState(null);

	const { getValues, setValues, resetValues } = useStore();
	const { email, password, confirmPassword } = getValues();

	const changeValue = ({ target }) => {
		if (!/^[\w_@.]*$/.test(target.value)) {
			setErrorMessage(
				'Вы можете использовать только буквы, цыфры, нижнее подчеркивание и знак @',
			);
		} else if (target.value.length > 20) {
			setErrorMessage('значение поля не может превышать 20 симовлов');
		} else {
			setValues(target.name, target.value);
			setErrorMessage(null);
		}
		if (
			email.length > 0 &&
			confirmPassword.length > 0 &&
			passwordRef.current.value === confirmPasswordRef.current.value
		) {
			btnRef.current.focus();
		}
	};

	const onBlur = ({ target }) => {
		if (target.value.length < 3) {
			setErrorMessage('значение поля не может быть менее 3 симовлов');
		}
	};
	const sendForm = (event) => {
		event.preventDefault();
		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			setErrorMessage('Пароли не равны');
		} else {
			console.log(getValues());
			resetValues();
		}
	};

	return (
		<FormRegistr
			sendForm={sendForm}
			onBlur={onBlur}
			changeValue={changeValue}
			resetValues={resetValues}
			errorMessage={errorMessage}
			email={email}
			password={password}
			confirmPassword={confirmPassword}
			passwordRef={passwordRef}
			confirmPasswordRef={confirmPasswordRef}
			btnRef={btnRef}
		/>
	);
};
