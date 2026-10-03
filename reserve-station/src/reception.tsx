import {useEffect, useState } from "react"
import axios from "axios";
import "./Reception.css";

interface names {
    name: string,
}

const Reception = () => {

    const [name, setName] = useState<names | null>({
        name: "",
    })

    useEffect(() => {

        const getPeople = async () => {

            try {

                const res = await axios.get(
                    "https://hedro.ir/api/get_submit_info/"
                );

                setName(res.data)

            } catch (error) {

                console.log(error);

            }

        };

        getPeople();

    }, []);


    return (

        <div className="reception">

            <div className="reception-header">
                <div>
                    <h1>پذیرش</h1>
                    <p>مدیریت مراجعه‌کنندگان امروز</p>
                </div>

                <div className="reception-count">
                    <span>تعداد مراجعه‌کنندگان</span>
                    <strong>1</strong>
                </div>
            </div>


            <div className="table-container">

                <table className="reception-table">

                    <thead>
                        <tr>
                            <th>اسم مراجعه‌کننده</th>
                            <th>وضعیت ورود</th>
                            <th>هدایت به اتاق مشاوره</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>

                            <td className="person-name">
                                {name?.name}
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

                                <button className="consultation-btn">
                                    هدایت به اتاق مشاوره
                                    <span>←</span>
                                </button>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default Reception;