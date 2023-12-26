import { useRef, useState } from 'react';
import styles from './App.module.css';

const initialValue = {
	email: '',
	password: '',
	confirmPassword: '',
};

const useStore = () => {
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

	const submitValue = ({ target }) => {
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
		<div className={styles.App}>
			<form onSubmit={sendForm} className={styles.formRegister}>
				<div>
					<h2>Форма регистрации</h2>
				</div>
				{errorMessage && (
					<div className={styles.errorMessage}>{errorMessage} </div>
				)}
				<div className={styles.fieldsForm}>
					<label htmlFor="email">Введите ваш Email:</label>
					<input
						value={email}
						type="email"
						name="email"
						id="email"
						placeholder="123@mail.ru"
						onChange={submitValue}
						onBlur={onBlur}
					/>
				</div>
				<div className={styles.fieldsForm}>
					<label htmlFor="password">Введите ваш пароль:</label>
					<input
						value={password}
						ref={passwordRef}
						type="password"
						name="password"
						id="password"
						placeholder="пароль"
						onChange={submitValue}
						onBlur={onBlur}
					/>
				</div>
				<div className={styles.fieldsForm}>
					<label htmlFor="confirmPassword">Введите пароль еще раз:</label>
					<input
						value={confirmPassword}
						ref={confirmPasswordRef}
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						placeholder="введите пароль еще раз"
						onChange={submitValue}
						onBlur={onBlur}
					/>
				</div>
				<div className={styles.fieldsForm}>
					<button
						type="submit"
						ref={btnRef}
						disabled={
							!!errorMessage ||
							email === '' ||
							password === '' ||
							confirmPassword === ''
						}
					>
						Отправить
					</button>
					<button type="button" onClick={resetValues}>
						Сброс
					</button>
				</div>
			</form>
		</div>
	);
};
