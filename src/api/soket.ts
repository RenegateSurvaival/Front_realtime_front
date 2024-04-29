// Подключение к серверу по веб-сокету
export const socket = new WebSocket('ws://localhost:8000/ws');

// Функция для обработки входящих сообщений
socket.onmessage = (event) => {
	const receivedMessage = JSON.parse(event.data);
	console.log(receivedMessage);
};

// Открываем соединение с сервером
socket.onopen = () => {
	console.log('Соединение установлено!');
};
// Закрытие соединения с сервером
socket.onclose = () => {
  console.log('Соединение закрыто');
};






