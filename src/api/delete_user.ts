import axios from 'axios';

export const userDelete = async (token: string) => {
  try {
    const response = await axios.delete('http://localhost:8000/user/delete', {
      data: {
        token: token // Передача токена в теле запроса
      }
    });

    if (response.status !== 204) {
      throw new Error('Response not ok');
    }

    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    console.error('Ошибка:', error);
    return null; // Возвращаем null в случае ошибки
  }
};
