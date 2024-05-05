import axios, { AxiosError } from 'axios';
import UseLocalStorage from '../hooks/use_local_storage';

export const registerUser = async (name: string, password: string) => {
	try {
			await axios.post('http://localhost:8000/auth/register-user', {
			name: name,
			password: password
		});

		alert('Пользователь с успешно зарегистрирован');
	} catch (error) {
		const err = error as AxiosError;

		if (err.response?.status === 409) {
			alert('Пользователь с таким именем уже существует');
		} else {
			console.error('Ошибка при регистрации пользователя:', err.message);
		}
	}
};


export const authUser = async (name: string, password: string) => {
	const [, setUSserId] = UseLocalStorage('user_id', '');
	try {
		const response = await axios.post('http://localhost:8000/user/login', {
			name: name,
			password: password
		});

		console.log('Пользователь успешно авторизирован:', response.data.token);
		
		// Перезагрузить страницу
		window.location.reload();
		setUSserId(response.data.token)
		return response.data.token;
	} catch (error) {
		const err = error as AxiosError;

		if (err.response?.status === 409) {
			alert('Неправильное имя или пароль, проверьте правильность написания и повторите попытку.');
		} else {
			console.error('Ошибка при авторизации пользователя:', err.message);
		}
		return null; // Добавляем возврат значения в случае ошибки
	}
};
