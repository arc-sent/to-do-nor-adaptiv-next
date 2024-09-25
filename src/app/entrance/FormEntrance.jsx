"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Spin } from 'antd';


export default function FormEntrance() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    async function handleClick(e) {
        e.preventDefault();
        setLoading(true)

        const UserEntrance = { email, password };

        const res1 = await fetch('http://localhost:4000/user').then(res => res.json()).catch(error => console.error(error));;

        let user = res1.find(item => item.email === email);

        console.log(user.email)

        if (user.email === email && user.password === password) {
            const UserValid = {entrance: true};
            const res = await fetch(`http://localhost:4000/user/${user.id}`, { // Используем ID пользователя для указания конкретного ресурса
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(UserValid),
            })

            if (res.ok) {
                setLoading(false);
                router.push('/');
                router.refresh();
            }
        }


    }

    return (


        <>
            {loading && <Spin size="large" fullscreen />}
            <form className='Form' onSubmit={handleClick}>
                <label>
                    <span>Почта:</span>
                    <input type='email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    <span>Пароль:</span>
                    <input type='password' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>

                <label>
                    <button type='submit' className='buttonInFrom'>
                        Войти
                    </button>
                </label>

            </form>
        </>
    )
}
