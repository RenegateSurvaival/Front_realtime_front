import axios from 'axios';

export const loadMessages = async (id: number) => {
  try {
    const response = await axios.post('http://localhost:8000/routers/load', {
				"id_message": id
    });

    if (response.status !== 200) {
      throw new Error('Response not ok');
    }
		console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
};