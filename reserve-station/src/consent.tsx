import type React from "react";
import { useEffect, useRef, useState } from "react";
import "./consent.css";
import axios from "axios";

interface afrad {
    name: string;
    age: number;
    phone: number;
    file: string;
    address: string;
    reserve_date: string;
    date: string;
    id: number;
    services: string;
    price: number;
    explain: string;
}

const Consent: React.FC = () => {

    const [addText, setAddText] = useState(false);
    const [service, setService] = useState("");
    const [afrad, setAfrad] = useState<afrad[]>([]);
    const [selectedId, setSelectedId] =
        useState<number | null>(null);

    const web = useRef<WebSocket | null>(null);

    const selectedPerson = afrad.find(
        (person) => person.id === selectedId
    );

    const addService = async (id: number) => {

        if (!service.trim()) return;

        try {

            const req = await axios.post(
                `https://hedro.ir/api/update_service/${id}/`,
                {
                    service: service
                }
            );

            setAfrad((prev) =>
                prev.map((person) =>
                    person.id === id
                        ? {
                            ...person,
                            services: req.data.service
                        }
                        : person
                )
            );

            setService("");
            setAddText(false);

            console.log(req.data);

        } catch (error) {

            console.log(error);

        }

    };

    const del_service = async (
        personID: number,
        service: string
    ) => {

        const cleanService = service.trim();

        setAfrad((prev) =>
            prev.map((person) => {

                if (person.id === personID) {

                    return {
                        ...person,
                        services: person.services
                            .split(",")
                            .filter(
                                (item) =>
                                    item.trim() !== cleanService
                            )
                            .join(",")
                    };

                }

                return person;

            })
        );

        try {

            await axios.delete(
                `https://hedro.ir/api/delete_service/${personID}/`,
                {
                    withCredentials: true,
                    data: {
                        services: cleanService
                    }
                }
            );

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        let reconnected:ReturnType<typeof setTimeout>;

        console.log("USE EFFECT RUN");

        const getSubmitInfo = async () => {

            try {

                const req = await axios.get(
                    "https://hedro.ir/api/get_submit_info/"
                );

                setAfrad(req.data);

                console.log(
                    "SUBMIT DATA:",
                    req.data
                );

            } catch (error) {

                console.log(
                    "GET SUBMIT ERROR:",
                    error
                );

            }

        };

        getSubmitInfo();

        const connectWebSocket = () => {
            web.current = new WebSocket(
                "wss://hedro.ir/ws/services/getdata/"
            );

            web.current.onopen = () => {
                console.log("connected websocket");
            };

            web.current.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === "get_Data_Consent"){
                    setAfrad((prev)=>[...prev, data])
                }
            };

            web.current.onerror = (error) => {
                console.log("websocket error", error);
            };

            web.current.onclose = (event) => {
                console.log("CLOSE CODE:", event.code);
                console.log("CLOSE REASON:", event.reason);

                reconnected = setTimeout(() => {
                    connectWebSocket();
                }, 2000);
            };
           
        };

         connectWebSocket()
         
        return () => {

            console.log(
                "CLEANUP EXECUTED"
            );

            clearTimeout(reconnected)
            web.current?.close();
            web.current = null;

        };

        

    }, []);


    return (

        <div className="consent-container">

            <h1>
                مراجعه کنندگان مشاوره
            </h1>

            <div className="consent-list">

                {afrad.map((person) => (

                    <div
                        key={person.id}
                        className={`person-box ${
                            selectedId === person.id
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setSelectedId(
                                person.id
                            )
                        }
                    >

                        <span>
                            {person.name}
                        </span>

                    </div>

                ))}

            </div>

            {selectedPerson && (

                <div className="person-details">

                    <div className="details-header">

                        <h2>
                            {selectedPerson.name}
                        </h2>

                        <button
                            onClick={() =>
                                setSelectedId(null)
                            }
                        >
                            بستن
                        </button>

                    </div>

                    <div className="details-grid">

                        <div>
                            <span>آیدی</span>
                            <p>
                                {selectedPerson.id}
                            </p>
                        </div>

                        <div>
                            <span>نام</span>
                            <p>
                                {selectedPerson.name}
                            </p>
                        </div>

                        <div>
                            <span>سن</span>
                            <p>
                                {selectedPerson.age}
                            </p>
                        </div>

                        <div>
                            <span>تلفن</span>
                            <p>
                                {selectedPerson.phone}
                            </p>
                        </div>

                        <div>
                            <span>کد پذیرش</span>
                            <p>
                                {selectedPerson.file}
                            </p>
                        </div>

                        <div>
                            <span>تاریخ رزرو</span>
                            <p>
                                {selectedPerson.reserve_date}
                            </p>
                        </div>

                        <div>
                            <span>قیمت</span>
                            <p>
                                {selectedPerson.price.toLocaleString("en-US")}
                            </p>
                        </div>

                        <div className="address">

                            <span>
                                آدرس
                            </span>

                            <p>
                                {selectedPerson.address}
                            </p>

                        </div>

                        {!addText && (

                            <div>

                                <span>
                                    خدمات قابل انجام
                                </span>

                                <button
                                    onClick={() =>
                                        setAddText(true)
                                    }
                                >
                                    اضافه کردن خدمات
                                </button>

                            </div>

                        )}

                        {addText && (

                            <div className="address">

                                <span>
                                    خدمات جدید
                                </span>

                                <input
                                    type="text"
                                    name="text"
                                    id="text"
                                    value={service}
                                    onChange={(e) =>
                                        setService(
                                            e.target.value
                                        )
                                    }
                                />

                                <section className="action_button">

                                    <button
                                        onClick={() =>
                                            addService(
                                                selectedPerson.id
                                            )
                                        }
                                    >
                                        ثبت خدمات
                                    </button>

                                    <button
                                        onClick={() => {
                                            setAddText(false);
                                            setService("");
                                        }}
                                    >
                                        لغو
                                    </button>

                                </section>

                            </div>

                        )}

                        {selectedPerson.services ? (

                            <div className="address services-container">

                                <span>
                                    خدمات انجام شده
                                </span>

                                <div className="services-list">

                                    {selectedPerson.services
                                        .split(",")
                                        .reverse()
                                        .map(
                                            (
                                                item,
                                                index
                                            ) => (

                                                <div
                                                    className="items"
                                                    key={`${item}-${index}`}
                                                >

                                                    <span className="service-index">
                                                        {index + 1} -
                                                    </span>

                                                    <span className="services">
                                                        {item.trim()}
                                                    </span>

                                                    <button
                                                        className="delete-service"
                                                        onClick={() =>
                                                            del_service(
                                                                selectedPerson.id,
                                                                item
                                                            )
                                                        }
                                                    >
                                                        ×
                                                    </button>

                                                </div>

                                            )
                                        )}

                                </div>

                            </div>

                        ) : (

                            <div>

                                <span>
                                    خدماتی انجام نشده
                                </span>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </div>

    );

};

export default Consent;
