"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Spin } from 'antd';

export default function CreateForm() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [images, setImages] = useState('');
    const [loading, setLoading] = useState(false);
    function handleFileChange(e) {
        const file = e.target.files[0];
        const render = new FileReader();

        render.readAsDataURL(file);

        render.onload = () => {
            setImages(render.result);
        }

        render.onerror = () => {
            console.log(render.error);
        }
    };

    async function handleClick(e) {
        e.preventDefault();
        setLoading(true)

        const user = { name, secondName, email, password, images, entrance: true , cases:[] };

        const res = await fetch('http://localhost:4000/user', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })

        if (res.status === 201) {
            setLoading(true)
            router.push('/');
            router.refresh();
        }
    }

    return (


        <>
            {loading && <Spin size="large" fullscreen />}
            <form className='Form' onSubmit={handleClick}>
                <label>
                    <span>Имя:</span>
                    <input className='input' value={name} onChange={(e) => setName(e.target.value)} />
                </label>

                <label>
                    <span>Фамилия:</span>
                    <input className='input' value={secondName} onChange={(e) => setSecondName(e.target.value)} />
                </label>

                <label>
                    <span>Почта:</span>
                    <input type='email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    <span>Пароль:</span>
                    <input type='password' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>

                <label>
                    <span>Аватарка:</span>
                    <input
                        type='file'
                        className='FileInput'
                        onChange={(e) => handleFileChange(e)}
                    />
                </label>

                <label>
                    <button type='submit'>
                        Зарегистрироваться
                    </button>
                </label>

            </form>
        </>
    )
}
