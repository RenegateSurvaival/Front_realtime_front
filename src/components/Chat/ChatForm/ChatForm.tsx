import { useState, ChangeEvent, useEffect } from 'react';
import style from './ChatForm.module.scss';
import { Send } from 'lucide-react';
import { socket } from '../../../api/soket';
import { useSessionStorage } from '../../../hooks/use_session_storage';
import { EmojiPicker } from './Emoji/Emoji';
import { sendMessage } from '../../../api/send_message';
import UseLocalStorage from '../../../hooks/use_local_storage';


export function ChatForm() {
    const [piker, setPiker] = useState(false);
    const { value } = useSessionStorage('access_token');
    const [text, setText] = useState('');
    const [timer, setTimer] = useState(0);
		const [, setBackground] = UseLocalStorage(
			'backgroundValue',
			'https://kalix.club/uploads/posts/2022-12/1671533085_kalix-club-p-oboi-dlya-chata-vkontakte-10.jpg'
		);

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const length = text.length;
        if (length < 1000) setText(event.target.value);
    };

    const addNewMessage = () => {
				if(text == '/272') {
					setBackground('https://img2.joyreactor.cc/pics/comment/Pepe-%D0%9C%D0%B5%D0%BC%D1%8B-art-RaptorVZ-4405220.gif')
					setText('');
					return;
				}
        if (text.trim() === '') return;
        sendMessage(text, value);
        setText('');
        resetTimer();
    };

    const handleSendMessage = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addNewMessage();
        }
    };

    const disconnectSocket = () => {
        socket.close();
        alert('Вы были отключены от чата за бездействие. Пожалуйста, обновите страницу для повторного подключения.');
    };

    const resetTimer = () => {
        setTimer(0);
    };

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((prevTime) => prevTime + 1);
            if (timer >= 300) { // 300 seconds = 5 minutes
                disconnectSocket();
                resetTimer();
            }
        }, 1000);
        
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className={style.chat_form}>
            {piker && <EmojiPicker setData={setText} data={text} />}
            <div className={style.input_text_message}>
                <div className={style.text_input}>
                    <a href='#' onClick={() => setPiker(!piker)} className={style.smile} role='button'>😉</a>
                    <textarea
                        placeholder='Message'
                        value={text}
                        onChange={handleTextChange}
                        onKeyDown={handleSendMessage}
                    />
                    <button
                        className={style.send_btn}
                        onClick={addNewMessage}>
                        <Send className={style.send} />
                    </button>
                </div>
            </div>
        </div>
    );
}
