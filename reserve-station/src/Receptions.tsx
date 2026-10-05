import { useEffect, useState } from "react"
import axios from "axios"
import "./Receptions.css"

interface Names {
    id: number;
    name: string;
    age: number;
    phone: string;
    file: number | null;
    address: string | null;
    reserve_date: string;
    date: string | null;
    services: string | null;
    price: number | null;
    explain: string;
}

const Receptions = () => {

    const [name, setName] = useState<Names[]>([])

    const [isConsent, setIsConsent] = useState<boolean | null>(false)

    useEffect(() => {

        console.log("RECEPTIONS COMPONENT RUNNING")

        const getPeople = async () => {

            try {

                const res = await axios.get(
                    "https://hedro.ir/api/get_name/"
                )

                console.log("API:", res.data)

                setName(res.data)

            } catch (error) {

                console.log("ERROR:", error)

            }

        }

        getPeople()

    }, [])

        const PostConsent = async (personID: number) => {

            const person = name.find((found)=>(
                found.id === personID
            ))

            if(!person){return}

            try {

                const res = await axios.post(
                    "https://hedro.ir/api/Post_to_Consent/",
                        {
                        name : person.name,
                        age : person.age,
                        phone : person.phone,
                        file : person.file,
                        address : person.address,
                        reserve_date : person.reserve_date,
                        date : person.date,
                        services : person.services,
                        price : person.price,
                        explain : person.explain,
                        }
                )

            } catch (error) {

                console.log("ERROR:", error)

            }

        }

    return (

        <div className="receptions">

            <div className="receptions-header">

                <div>
                    <h1>پذیرش</h1>
                    <p>مدیریت مراجعه‌کنندگان امروز</p>
                </div>

                <div className="receptions-count">
                    <span>تعداد مراجعه‌کنندگان</span>
                    <strong>{name.length}</strong>
                </div>

            </div>

            <div className="table-container">

                <table className="receptions-table">

                    <thead>
                        <tr>
                            <th>اسم مراجعه‌کننده</th>
                            <th>وضعیت ورود</th>
                            <th>هدایت به اتاق مشاوره</th>
                        </tr>
                    </thead>

                    <tbody>

                        {name.map((person) => (

                            <tr key={person.id}>

                                <td className="person-name">
                                    {person.name}
                                </td>

                                <td>

                                    <div className="status-buttons">

                                        <button className="arrived">
                                            امروز اومده
                                        </button>

                                        <button className="not-arrived">
                                            امروز نیومده
                                        </button>

                                    </div>

                                </td>

                                <td>

                                    <button disabled={isConsent === true} className="consultation-btn" onClick={()=>PostConsent(person.id)}>
                                       {
                                            isConsent ? "!هدایت شد" : " هدایت به اتاق مشاوره"
                                       }
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default Receptions;