import type React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./consent.css";
import { useParams } from "react-router-dom";

interface Personal {
    id: number;
    name: string;
    age: number;
    phone: number;
    file: string;
    address: string;
    reserve_date: string;
    date: string;
    services: string;
    price: number;
    explain: string;
}

interface WhoIsAssistant {
    id: number;
    assistant: {
        username: string;
    } | null;
    patient: Personal | null;
}

const PersonalAsistant: React.FC = () => {
    const [afrad, setAfrad] = useState<Personal[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const { name } = useParams();

    const selectedPerson = afrad.find(
        (person) => person.id === selectedId
    );

    useEffect(() => {
        const getPersonalForAssistant = async () => {
            try {
                const req = await axios.get<WhoIsAssistant[]>(
                    "https://hedro.ir/api/get_personal_for_assistant/",
                    {
                        withCredentials: true,
                    }
                );

                const patients = req.data
                    .filter(
                        (item) =>
                            item.assistant?.username === name
                    )
                    .map((item) => item.patient)
                    .filter(
                        (patient): patient is Personal =>
                            patient !== null
                    );

                setAfrad(patients);

                console.log(
                    "PERSONAL FOR ASSISTANT:",
                    req.data
                );
            } catch (error) {
                console.log(
                    "GET PERSONAL FOR ASSISTANT ERROR:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        getPersonalForAssistant();
    }, [name]);

    return (
        <div className="consent-container">
            <h1>مراجعه کنندگان دستیار شخصی</h1>

            {loading ? (
                <p>در حال دریافت اطلاعات...</p>
            ) : (
                <div className="consent-list">
                    {afrad.map((person) => (
                        <div
                            key={person.id}
                            className={`person-box ${
                                selectedId === person.id
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setSelectedId(person.id)}
                        >
                            <span>{person.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {!loading && afrad.length === 0 && (
                <p>مراجعه‌کننده‌ای ثبت نشده است.</p>
            )}

            {selectedPerson && (
                <div className="person-details">
                    <div className="details-header">
                        <h2>{selectedPerson.name}</h2>

                        <button
                            onClick={() => setSelectedId(null)}
                        >
                            بستن
                        </button>
                    </div>

                    <div className="details-grid">
                        <div>
                            <span>آیدی</span>
                            <p>{selectedPerson.id}</p>
                        </div>

                        <div>
                            <span>نام</span>
                            <p>{selectedPerson.name}</p>
                        </div>

                        <div>
                            <span>سن</span>
                            <p>{selectedPerson.age}</p>
                        </div>

                        <div>
                            <span>تلفن</span>
                            <p>{selectedPerson.phone}</p>
                        </div>

                        <div>
                            <span>کد پذیرش</span>
                            <p>{selectedPerson.file}</p>
                        </div>

                        <div>
                            <span>تاریخ رزرو</span>
                            <p>{selectedPerson.reserve_date}</p>
                        </div>

                        <div>
                            <span>تاریخ ثبت</span>
                            <p>{selectedPerson.date}</p>
                        </div>

                        <div>
                            <span>قیمت</span>
                            <p>
                                {selectedPerson.price?.toLocaleString(
                                    "en-US"
                                )}
                            </p>
                        </div>

                        <div className="address">
                            <span>آدرس</span>
                            <p>{selectedPerson.address}</p>
                        </div>

                        <div className="address">
                            <span>توضیحات</span>
                            <p>
                                {selectedPerson.explain ||
                                    "توضیحاتی ثبت نشده است"}
                            </p>
                        </div>

                        {selectedPerson.services ? (
                            <div className="address services-container">
                                <span>خدمات انجام شده</span>

                                <div className="services-list">
                                    {selectedPerson.services
                                        .split(",")
                                        .reverse()
                                        .map((item, index) => (
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
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <span>خدماتی ثبت نشده است</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalAsistant;
