"use client"
import './styleComponent.scss'
import { Layout } from 'antd';
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from 'react';
const { Header } = Layout;


export default function HeaderComponent({ users }) {
    const [entrance, setEntrance] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        users.map(item => {
            if (item.entrance) {
                setEntrance(true);
                setUser(item)
            }
        })
    }, [users])



    return (
        <Header className='header'>
            <p>ARC</p>
            {
                entrance
                    ?
                    <Link href={`/${user.id}`}>
                        <div className='userCard'>
                            <img src={user.images} />
                            <p>{user.name}</p>
                            <p className='p2'>{user.secondName}</p>
                        </div>
                    </Link>

                    :
                    <nav>
                        <Link href='/' className="Links">Главная</Link>
                        <Link href='/registration' className="Links">Регистрация</Link>
                    </nav>
            }

        </Header>
    )
}