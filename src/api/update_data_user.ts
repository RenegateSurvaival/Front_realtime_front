import axios, { AxiosError } from 'axios';
import { backendURL } from './api_config';

export const updateDataUser = async (name: string, password: string, token: string) => {
 

 try {
   const response = await axios.patch(`${backendURL}/user/update`, {
		jwt_token: {
			token: token
	 },
	 data_update: {
			name: name,
			password: password
	 }
   });

   console.log(response);
   alert('Данные обновлены');
 } catch (error) {
   const err = error as AxiosError;

   if (err.response?.status === 409) {
     alert('Пользователь с таким именем уже существует');
   } else {
     console.error('Ошибка при изменении данных:', err.message);
   }
 }
};
