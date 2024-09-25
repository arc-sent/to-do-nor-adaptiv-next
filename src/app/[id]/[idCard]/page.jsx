import './idCard.scss'
export default async function CaseInfo({ params }) {
    const { id, idCard } = params;

    async function getCase(id) {
        return await fetch(`http://localhost:4000/user/${id}`, {
            next: {
                revalidate: 0,
            }
        })
            .then(res => res.json())
            .catch(error => console.error(error));
    }

    const user = await getCase(id);
    const case1 = user.cases.find(item => item.id === idCard);
    console.log(case1);

    return (
        <>
            <div className="wrapperCase">
                <div className='wrapperH1'>
                    <h1>{case1.title}</h1>
                    <p className={case1.priority}>{case1.priority}</p>
                </div>

                <p>{case1.body}</p>
            </div>
        </>
    );
}
