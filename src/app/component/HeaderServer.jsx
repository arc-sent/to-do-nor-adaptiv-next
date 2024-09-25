import HeaderComponent from "./Header";

export default async function HeaderServer(){
    async function getUser() {
        try {
            const response = await fetch("http://localhost:4000/user", {
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

    const users = await getUser();
    return (
        <HeaderComponent users = {users}/>
    )
}   