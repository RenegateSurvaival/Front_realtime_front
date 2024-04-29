import React, { useState, useEffect, useRef } from 'react';
import style from './ProfileHeaderModal.module.scss';
import { updateDataUser } from '../../../api/update_data_user';
import { useSessionStorage } from '../../../hooks/use_session_storage';
import { getUserInfo } from '../../../api/get_user_info';
import { validatePassword } from '../../../validations/password';
import { validateUsername } from '../../../validations/login';
import UseLocalStorage from '../../../hooks/use_local_storage';
import { updateAvatarUser } from '../../../api/update_avatar';

import { ImageUp } from 'lucide-react';
import { userDelete } from '../../../api/delete_user';

export const ProfileHeaderModal = ({ isOpenProfile }: any) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { value } = useSessionStorage('access_token');
	const [loginText, setloginText] = useState('');
	const [passText, setPassText] = useState('');
	const [role, setRole] = useState();
	const [imgAvatarUrl, setImgAvatarUrl] = useState('');

	const [, setUSserId] = UseLocalStorage('user_id', '');

	let status = '';

	const changeloginText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setloginText(event.target.value);
	};

	const changePassText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassText(event.target.value);
	};

	const dataUpdate = () => {
		if (loginText.trim() === '' || passText.trim() === '') return;
		if (!validatePassword(passText)) return alert('Пароль должен состоять минимум из 1 цифры, 1 буквы верхнего регистра и 1 спецсимвола');
		if (!validateUsername(loginText)) return alert('Имя должно быть 3-10 символов! Спецсимволы использовать нельзя');
		updateDataUser(loginText, passText, value);
	};

	const avatarUpdate = () => {
		if (fileInputRef.current && fileInputRef.current.files) {
			const file = fileInputRef.current.files[0];
			updateAvatarUser(value, file);
		}
	};

	const exitProfile = () => {
		sessionStorage.removeItem('access_token');
		window.location.reload();
	}

	const userDel = ()=> {
		userDelete(value);
		exitProfile();
	}

	useEffect(() => {
		if (value) {
			getUserInfo(value)
				.then(data => {
					setImgAvatarUrl(`http://127.0.0.1:8000${data.user_avatar}`);
					setloginText(data.name);
					setUSserId(data.user_id)
					setRole(data.role)
				})
				.catch(error => {
					console.error('Произошла ошибка:', error);
				});
		}
	}, [value]);

	if(role == 1){
		status = 'Пользователь';
	}else if(role == 2){
		status = 'Модератор';
	}else if(role == 3){
		status = 'Администратор ';
	}

	return (
		<>
			{isOpenProfile && (
				<div className={style.modal}>	
					<button onClick={()=>userDel} className={style.delete_btn}>Удалить акаунт</button>
					
					<div className={style.profileWrapper}>

						<div className={style.avatarBlock}>
							<img src={imgAvatarUrl} alt="avatarka" />
							<label htmlFor="real-input" className={style.custom_file_upload}>
								<ImageUp />
								<input
									id="real-input"
									type="file"
									ref={fileInputRef}
								/>
							</label>
						</div>
						<div>
							<h3>{loginText}</h3>
							<span>{status}</span>
						</div>
					</div>

					<h4>Обновить данные</h4>
					<div className={style.form}>
						<input onChange={changeloginText} type="text" name="login" id="login" placeholder='login' autoComplete="off" />
						<input onChange={changePassText} type="password" name="password" id="pass" placeholder='password' value={passText} />
					</div>
					<button className={style.save} onClick={dataUpdate}>Обновить логин и пароль</button>
					<button className={style.save} onClick={avatarUpdate}>Обновить аватар</button>
					<button className={style.exit} onClick={exitProfile}>Выход</button>
				</div>
			)}
		</>
	);
};
