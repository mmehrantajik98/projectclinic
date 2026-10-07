import { useEffect, useState } from "react";
import axios from "axios";
import "./Asistant.css";

interface Patient {
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
    explain: string | null;
}

interface Assistant {
    id: number;
    username: string;
    role: string;
}

const Asistant = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [assistants, setAssistants] = useState<Assistant[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [selectedAssistant, setSelectedAssistant] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const getPatients = async () => {
        try {
            const response = await axios.get(
                "https://hedro.ir/api/get_Asistants_personal/",
                {
                    withCredentials: true,
                }
            );

            setPatients(response.data);
        } catch (error) {
            console.error("Error getting patients:", error);
        }
    };

    const getAssistants = async () => {
        try {
            const response = await axios.get(
                "https://hedro.ir/api/get_Asistant/",
                {
                    withCredentials: true,
                }
            );

            setAssistants(response.data);
        } catch (error) {
            console.error("Error getting assistants:", error);
        }
    };

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            await Promise.all([
                getPatients(),
                getAssistants(),
            ]);

            setLoading(false);
        };

        getData();
    }, []);

    const handleAssistantChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const username = event.target.value;

        setSelectedAssistant(username);

        if (!username || !selectedPatient) {
            return;
        }

        try {
            setSaving(true);

            await axios.post(
                "https://hedro.ir/api/post_asistant_with_Personal/",
                {
                    assistant: Number(username),
                    patient: selectedPatient.id,
                },
                {
                    withCredentials: true,
                }
            );

            alert(
                `دستیار ${username} برای ${selectedPatient.name} ثبت شد`
            );
        } catch (error) {
            console.error("Error saving assistant:", error);
            alert("ثبت دستیار انجام نشد");
        } finally {
            setSaving(false);
        }
    };

    const closePatientBox = () => {
        setSelectedPatient(null);
        setSelectedAssistant("");
    };

    if (loading) {
        return (
            <div className="assistant-loading">
                در حال دریافت اطلاعات...
            </div>
        );
    }

    return (
        <div className="assistant-page">

            <div className="assistant-header">
                <h1>مراجعه‌کنندگان</h1>
                <span>{patients.length} مراجعه‌کننده</span>
            </div>

            <div className="assistant-patients">

                {patients.length === 0 ? (
                    <div className="assistant-empty">
                        مراجعه‌کننده‌ای ثبت نشده است.
                    </div>
                ) : (
                    patients.map((patient) => (
                        <div
                            key={patient.id}
                            className="patient-box"
                            onClick={() => {
                                setSelectedPatient(patient);
                                setSelectedAssistant("");
                            }}
                        >
                            <span>{patient.name}</span>
                        </div>
                    ))
                )}

            </div>

            {selectedPatient && (
                <div className="patient-modal-overlay">
                    <div className="patient-modal">

                        <button
                            className="patient-modal-close"
                            onClick={closePatientBox}
                        >
                            ×
                        </button>

                        <div className="patient-modal-header">
                            <h2>{selectedPatient.name}</h2>
                            <p>اطلاعات مراجعه‌کننده</p>
                        </div>

                        <div className="patient-info">

                            <div className="info-item">
                                <span>نام</span>
                                <strong>
                                    {selectedPatient.name}
                                </strong>
                            </div>

                            <div className="info-item">
                                <span>سن</span>
                                <strong>
                                    {selectedPatient.age}
                                </strong>
                            </div>

                            <div className="info-item">
                                <span>شماره تماس</span>
                                <strong>
                                    {selectedPatient.phone}
                                </strong>
                            </div>

                            <div className="info-item">
                                <span>شماره پرونده</span>
                                <strong>
                                    {selectedPatient.file ?? "-"}
                                </strong>
                            </div>

                            <div className="info-item">
                                <span>تاریخ رزرو</span>
                                <strong>
                                    {selectedPatient.reserve_date}
                                </strong>
                            </div>

                            <div className="info-item">
                                <span>تاریخ ثبت</span>
                                <strong>
                                    {selectedPatient.date}
                                </strong>
                            </div>

                            <div className="info-item">
                                <span>خدمات</span>
                                <strong>
                                    {selectedPatient.services ?? "-"}
                                </strong>
                            </div>

                            <div className="info-item">
                                <span>قیمت</span>
                                <strong>
                                    {selectedPatient.price
                                        ? `${selectedPatient.price.toLocaleString()} تومان`
                                        : "-"}
                                </strong>
                            </div>

                            <div className="info-item info-full">
                                <span>آدرس</span>
                                <strong>
                                    {selectedPatient.address ?? "-"}
                                </strong>
                            </div>

                            <div className="info-item info-full">
                                <span>توضیحات</span>
                                <strong>
                                    {selectedPatient.explain ?? "-"}
                                </strong>
                            </div>

                        </div>

                        <div className="assistant-select-section">

                            <label htmlFor="assistant">
                                انتخاب دستیار
                            </label>

                            <select
                                id="assistant"
                                value={selectedAssistant}
                                onChange={handleAssistantChange}
                                disabled={saving}
                            >
                                <option value="">
                                    انتخاب دستیار
                                </option>

                                {assistants.map((assistant) => (
                                    <option
                                        key={assistant.id}
                                        value={assistant.id}
                                    >
                                        {assistant.username}
                                    </option>
                                ))}
                            </select>

                            {saving && (
                                <p className="saving-text">
                                    در حال ثبت دستیار...
                                </p>
                            )}

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Asistant;