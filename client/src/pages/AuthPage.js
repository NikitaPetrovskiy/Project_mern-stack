import React, { useState } from 'react';

import '../index.css';

import { useHttp } from '../hooks/http.hook'

export function AuthPage() {
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const { loading, request } = useHttp();

    const changeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log('Data: ', data);
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s4">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">
                            Авторизация
                        </span>
                        <div>

                            <div className="input-field">
                                <input 
                                    placeholder="Введите email"
                                    className="yellow-input"
                                    id="email" 
                                    type="text" 
                                    name="email"
                                    onChange={changeHandler}
                                    />
                                <label htmlFor="email">
                                    Email
                                </label>
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите пароль" 
                                    className="yellow-input"
                                    id="password" 
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                    />
                                <label htmlFor="password">
                                    Пароль
                                </label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-3"
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button 
                            className="btn green darken-1"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>  
        </div> 
    );
}
