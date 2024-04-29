import axios from 'axios';

export const getUserInfo = async (token: string) => {
  try {
    const response = await axios.post('http://localhost:8000/user/me', {
      token: token
    });

    if (response.status !== 200) {
      throw new Error('Response not ok');
    }

    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    console.error('Ошибка:', error);
    return null; // Возвращаем null в случае ошибки
  }
};
