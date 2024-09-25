import './globals.css'
import React from 'react';
import CaseCard from './component/caseComponent';
import './HomePage.scss';
import Link from 'next/link';
import FormTest from './component/FormTest';
async function getCase() {
  try {
    const response = await fetch('http://localhost:4000/case', {
      next: {
        revalidate: 0,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching case:', error);
  }
}

export default async function Home() {

  const cases = await getCase();

  return (
    <div>
      <div className='ImageWrapper'>
        <h1>Создайте порядок в своем дне с Arc!</h1>
        <p>
          В нашем быстром мире бывает сложно все успеть и помнить о важных делах. Список задач поможет вам организовать свои мысли и сделать каждый день продуктивным. Не позволяйте забывчивости контролировать вашу жизнь — ведите свой to-do list с Arc и обретите ясность и уверенность.

          После регистрации вы сможете перейти в свой аккаунт и создавать там дела. Начните управлять своим временем эффективно!
        </p>
        <div className='ButtonWrapper'>
          <Link href='/registration' className="Links"><button>Нажмите здесь, чтобы начать!</button></Link>
        </div>

      </div>

      <div className='TestTask'>
        <h1>Исследуйте наш тестовый To-Do List!</h1>

        <p>Здесь вы можете не только создавать новые дела, но и удалять их, играя с функционалом. Начните прямо сейчас и дайте жизнь своим планам!</p>

        <FormTest url='http://localhost:4000/case' />
        {
          cases.map(Item => (
            <CaseCard card={Item} key={Item.id} />
          ))
        }
      </div>
    </div>

  );
}
