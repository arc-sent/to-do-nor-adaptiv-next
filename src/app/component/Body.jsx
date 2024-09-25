"use client"
import './styleComponent.scss'
import { Layout } from 'antd';
const { Content } = Layout;


const contentStyle = {

};

export default function BodyComponent({ children }) {
    return (
        <Content className='content'>{children}</Content>
    )
}