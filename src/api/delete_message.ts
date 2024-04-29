import axios, { AxiosError } from "axios";

interface MessageData {
  token: string;
  id_message: number;
}

export const deleteMessage = async (token: string, id: number) => {
  const data: MessageData = {
    token: token,
    id_message: id,
  };

  try {
    await axios.delete("http://localhost:8000/routers/delete-message", {
      data: data,
    });

  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 409) {
      alert("Нет прав");
    } else {
      console.error("Ошибка", err.message);
    }
  }
};
