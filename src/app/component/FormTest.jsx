"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

function generateId(length = 3) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}
export default function FormTest({ url, en = false, id }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [priority, setPriority] = useState('low')
    const router = useRouter();

    async function handleClick(e) {
        e.preventDefault();
        const CaseTest = { title, body, user_email: "mario@netninja.dev", priority };
        const res = await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(CaseTest)
        })

        if (res.status === 201) {
            router.refresh();
        }
    }

    async function handleClick2(e) {
        e.preventDefault();

        fetch(`http://localhost:4000/user/${id}`)
            .then(response => response.json())
            .then(user => {
                const newId = generateId();
                const newCase = {id: newId, title, body, user_email: user.email, priority };
                user.cases.push(newCase);

                return fetch(`http://localhost:4000/user/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(updatedUser => {
                router.refresh();
                console.log('Успешно добавлено новое дело:', updatedUser);
            })
            .catch(error => {
                console.error('Ошибка при добавлении дела:', error);
            });
    }
    return (
        <div className='TestForm'>
            <form onSubmit={(e) => {
                if (en) {
                    handleClick2(e)
                } else {
                    handleClick(e)
                }
            }}>
                <label>
                    <span>Название дела:</span>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>
                    <span>Описание дела:</span>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} />
                </label>

                <label>
                    <span>Приоритет дела:</span>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                </label>

                <label>
                    <button type='submit'>
                        Создать задачу
                    </button>
                </label>

            </form>
        </div>
    )
}
