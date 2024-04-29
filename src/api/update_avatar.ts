import axios, { AxiosError } from 'axios';

export const updateAvatarUser = async (token: string, file: File) => {
 try {
   const formData = new FormData();
   formData.append('image', file);
   const response = await axios.post(`http://localhost:8000/avatar/upload?token=${token}`, formData, {
     headers: {
				'accept': 'application/json',
       	'Content-Type': 'multipart/form-data'
     }
   });

   console.log(response);
   alert('Данные обновлены');
 } catch (error) {
   const err = error as AxiosError;

   if (err.response?.status === 409) {
     alert('Данные не коректны');
   } else {
     console.error('Ошибка при изменении данных:', err.message);
   }
 }
};
