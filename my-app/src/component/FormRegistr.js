import React from 'react';
import styles from './style/Reg.module.css';

const FormRegistr = ({
	sendForm,
	changeValue,
	onBlur,
	email,
	password,
	confirmPassword,
	errorMessage,
	btnRef,
	passwordRef,
	confirmPasswordRef,
	resetValues,
}) => {
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
						onChange={changeValue}
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
						onChange={changeValue}
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
						onChange={changeValue}
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

export default FormRegistr;
