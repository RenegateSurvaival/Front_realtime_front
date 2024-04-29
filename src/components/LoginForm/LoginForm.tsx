import { authUser, registerUser } from '../../api/up_in_User';
import { useSessionStorage } from '../../hooks/use_session_storage';
import { validateUsername } from '../../validations/login';
import { validatePassword } from '../../validations/password';
import style from './LoginForm.module.scss';
import { useState } from 'react';

export const LoginForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState(''); 
  const {updateSessionStorage} = useSessionStorage('access_token');
  const [statusForm, setStatusForm] = useState(false);
	const [requestCount, setRequestCount] = useState(0);
	const [isRequesting, setRequesting] = useState(false);
  const checkStatusForm = (status: boolean) => {
    setStatusForm(status);
  };

	const handleRequest = async () => {
		if (requestCount >= 5) {
			alert('Можно отправлять запрос раз в 5 секунд');
			return;
		}  
		setRequesting(true);
		// Ваша логика отправки запроса
		setRequestCount(requestCount + 1);
		
		setTimeout(() => {
			setRequesting(false);
		}, 5000);
	};

  const loginAuthForm = async (name: string, password: string) => {
    if(name.trim() === '' || password.trim() === '') return;
    try {
      if(statusForm) {
				if(!validatePassword(password)) return alert('Пароль должен состоять минимум из 1 цифры, 1 буквы верхнего регистра и 1 спецсимвола');
				if(!validateUsername(name)) return alert('Имя должно быть 3-10 символов! Спецсимволы использовать нельзя');
        await registerUser(name, password);
				
				const response = await authUser(name, password);
				console.log(response)
				updateSessionStorage(response);
				
      } else if(!statusForm) {
        const response = await authUser(name, password);
				if(response !== null && typeof(response) === 'string'){
					updateSessionStorage(response);
				}
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  return (
    <div id={style.wrapper}>
      {!statusForm && <h1>Авторизация</h1>}
      {statusForm && <h1>Регистрация</h1>}
      
      <form id={style.signin} method="POST" action="#">
        <input type="text" id={style.user} onChange={(e)=>setName(e.target.value)} name="user" placeholder="username" value={name}/>
        <input type="password" id={style.pass} onChange={(e)=>setPassword(e.target.value)} name="pass" placeholder="password" value={password}/>
        <button type="button" disabled={isRequesting} onClick={()=>{loginAuthForm(name, password); handleRequest();}}>&#xf0da;</button>
      </form>
      
      <div>
        <button onClick={()=>checkStatusForm(false)} id={style.in_btn}>Войти</button>
        <button onClick={()=>checkStatusForm(true)} id={style.up_btn}>Зарегистрироваться</button>
      </div>
      
      <p>Пожалуйста, не используйте один и тот же пароль на разных сайтах, это небезопасно.</p>
    </div>
  );
};
