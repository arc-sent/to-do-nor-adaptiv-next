import Image from "next/image";
import './UserAccount.scss'
import FormTest from "../component/FormTest";
import CaseCard from "../component/caseComponent";
import Link from "next/link";
export default async function PageInfo({ params }) {

    async function GetUser(id) {
        try {
            let response = await fetch(`http://localhost:4000/user/${id}`, {
                next: {
                    revalidate: 0
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json()

            return data
        } catch (error) {
            console.error('Error fetching user:', error)
        }
    }

    const user = await GetUser(params.id)
    return (
        <>
            <div className="UserAccount">
                <div className="Left">
                    <Image src={user.images} width={200} height={200} alt='avatarka' />
                </div>
                <div className="rigth">
                    <div className="wrapperH2">
                        <h2>{user.name}</h2>
                        <h2>{user.secondName}</h2>
                    </div>
                    <p>{user.email}</p>
                </div>
            </div>

            <FormTest url={`http://localhost:4000/user/${params.id}`} en={true} id={params.id} />
            {
                user.cases.map(item => (
                    <Link href={`${params.id}/${item.id}`}><CaseCard card={item} key={item.id} regBool={true} id={params.id} /></Link>
                ))
            }
        </>

    )
}