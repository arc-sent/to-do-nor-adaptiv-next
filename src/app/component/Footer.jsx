"use client"
import './styleComponent.scss'
import { Layout } from 'antd';
const { Footer } = Layout;


export default function FooterComponent({ children }) {
    return (
        <Footer className='footer'>{ children }</Footer>
    )
}