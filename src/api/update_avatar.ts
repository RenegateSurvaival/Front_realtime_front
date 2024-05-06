import axios, { AxiosError } from 'axios';
import { backendURL } from './api_config';

export const updateAvatarUser = async (token: string, file: File) => {
 try {
   const formData = new FormData();
   formData.append('image', file);
   const response = await axios.post(`${backendURL}/avatar/upload?token=${token}`, formData, {
     headers: {
				'accept': 'application/json',
       	'Content-Type': 'multipart/form-data'
     }
   });

   console.log(response);
   alert('Аватар обновлён, чтобы увидеть обновлённую версию аватара пожалуйста обновите страницу.');
 } catch (error) {
   const err = error as AxiosError;

   if (err.response?.status === 409) {
     alert('Данные не коректны');
   } else {
     console.error('Ошибка при изменении данных:', err.message);
   }
 }
};
