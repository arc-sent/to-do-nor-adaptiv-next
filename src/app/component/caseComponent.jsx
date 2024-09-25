'use client'
import './styleComponent.scss';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function CaseCard({ card, id }) {
    const router = useRouter();

    async function handleDelete(event, taskId) {
        event.preventDefault()
        if (id) {
            fetch(`http://localhost:4000/user/${id}`)
            .then(response => response.json())
            .then(user => {
                user.cases = user.cases.filter(item => item.id !== taskId);
                console.log(user.cases)
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
                console.log('Успешно добавлено:', updatedUser);
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });

        } else {
            const res = await fetch(`http://localhost:4000/case/${taskId}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            });

            if (res.status === 200) {
                router.refresh();
                console.log("Задача успешно удалена");
            } else {
                console.error("Ошибка при удалении задачи");
            }
        }
    }
    return (
        <div className="CaseCard">
            <IoMdCloseCircleOutline className='CloseIcon' onClick={(event) => handleDelete(event, card.id)} />
            <h1>{card.title}</h1>

            <p>{card.body}</p>

            <p><small>{card.user_email}</small></p>

            <div className={card.priority}>{card.priority}</div>
        </div>
    )
}