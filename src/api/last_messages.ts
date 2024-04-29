import axios from 'axios';

export const lastMessages = async () => {
  try {
    const response = await axios.get('http://localhost:8000/routers/last_messages', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200) {
      throw new Error('Response not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
};
