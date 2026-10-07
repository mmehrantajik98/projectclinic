import { useEffect, useState } from "react";
import axios from "axios";
import "./Receptions.css";

interface Person {
    id: number;
    name: string;
    age: number;
    phone: string;
    file: number | null;
    address: string | null;
    reserve_date: string;
    date: string;
    services: string | null;
    price: number | null;
    explain: string;
}

const Receptions = () => {

    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [sendingId, setSendingId] = useState<number | null>(null);
    const [presentIds, setPresentIds] = useState<number[]>([]);

    useEffect(() => {
        getPeople();
    }, []);

    const getPeople = async () => {
        try {
            const response = await axios.get(
                "https://hedro.ir/api/get_name/",
                {
                    withCredentials: true,
                }
            );

            setPeople(response.data);

        } catch (error) {
            console.error("GET PEOPLE ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePresent = async (id: number) => {

        const person = people.find((item) => item.id === id);

        if (!person) {
            return;
        }

        setSendingId(id);

        try {

            await axios.post(
                "https://hedro.ir/api/Post_to_Consent/",
                {
                    name: person.name,
                    age: person.age,
                    phone: person.phone,
                    file: person.file,
                    address: person.address,
                    reserve_date: person.reserve_date,
                    date: person.date,
                    services: person.services,
                    price: person.price,
                    explain: person.explain,
                },
                {
                    withCredentials: true,
                }
            );

            console.log("PERSON SENT TO CONSENT:", person);

            setPresentIds((prev) => [...prev, id]);

        } catch (error) {
            console.error("POST TO CONSENT ERROR:", error);
        } finally {
            setSendingId(null);
        }
    };

    const handleAbsent = async (id: number) => {

        const person = people.find((item) => item.id === id);

        if (!person) {
            return;
        }

        try {

            await axios.post(
                "https://hedro.ir/api/Post_to_Abcent/",
                {
                    name: person.name,
                    age: person.age,
                    phone: person.phone,
                    file: person.file,
                    address: person.address,
                    reserve_date: person.reserve_date,
                    services: person.services,
                    price: person.price,
                    explain: person.explain,
                },
                {
                    withCredentials: true,
                }
            );

            console.log("PERSON SENT TO ABSENT:", person);

        } catch (error) {
            console.error("POST TO ABSENT ERROR:", error);
        }
    };

    if (loading) {
        return (
            <div className="receptions-loading">
                در حال دریافت اطلاعات...
            </div>
        );
    }

    return (
        <div className="receptions">

            <div className="receptions-header">
                <h1>مراجعه‌کنندگان</h1>
            </div>

            <div className="receptions-table-wrapper">

                <table className="receptions-table">

                    <thead>
                        <tr>
                            <th>نام مراجعه‌کننده</th>
                            <th>حضور</th>
                            <th>عدم حضور</th>
                        </tr>
                    </thead>

                    <tbody>

                        {people.length === 0 ? (

                            <tr>
                                <td colSpan={4} className="empty-row">
                                    مراجعه‌کننده‌ای وجود ندارد
                                </td>
                            </tr>

                        ) : (

                            people.map((person) => (

                                <tr key={person.id}>

                                    <td className="person-name">
                                        {person.name}
                                    </td>

                                    <td>
                                        <button
                                            className="present-btn"
                                            onClick={() => handlePresent(person.id)}
                                            disabled={
                                                sendingId === person.id ||
                                                presentIds.includes(person.id)
                                            }
                                        >
                                            {sendingId === person.id
                                                ? "در حال ارسال..."
                                                : presentIds.includes(person.id)
                                                    ? "ثبت شد"
                                                    : "حضور دارد"}
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="absent-btn"
                                            onClick={() => handleAbsent(person.id)}
                                        >
                                            عدم حضور
                                        </button>
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Receptions;
