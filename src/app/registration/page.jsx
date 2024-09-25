import Link from "next/link";
import CreateForm from "./CreateForm";
import './registration.scss'
export default function RegistrationPage() {
    return (
        <div className="WrapperForm">
            <h1>Регистрация</h1>
            <CreateForm />
            <Link href='/entrance'><button className="buttonInWrapper">Войти</button></Link>
        </div>
    )
}