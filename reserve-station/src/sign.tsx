import { useState } from "react";
import "./sign.css";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface Info {
    username: string;
    password: string;
    role: string;
}

const Sign = () => {

    const schema = Yup.object({
        username: Yup.string()
            .required("نام کاربری الزامی است"),

        password: Yup.string()
            .required("پسورد الزامی است")
            .min(7, "حداقل باید 7 کاراکتر باشد")
            .matches(/[a-z]/, "حداقل باید یک حرف کوچک داشته باشد")
            .matches(/[0-9]/, "حداقل باید یک عدد داشته باشد")
    });

    const [userpass, setUserpass] = useState<Info>({
        username: "",
        password: "",
        role: "",
    });

    const navigate = useNavigate();

    const [isOk, setIsOk] = useState(false);
    const [error, setError] = useState<Yup.ValidationError | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setUserpass({
            ...userpass,
            [e.target.name]: e.target.value
        });

        setError(null);
        setIsOk(false);
    };

    const postInfo = async (e: React.FormEvent) => {

        e.preventDefault();

        setError(null);
        setIsOk(false);

        try {

            await schema.validate(userpass, {
                abortEarly: false
            });

            await axios.post(
                "http://127.0.0.1:8000/api/postUsers/",
                {
                    username: userpass.username,
                    password: userpass.password,
                    role: userpass.role,
                }
            );

            setIsOk(true);
            navigate("/login", { replace: true });

        } catch (e: any) {

            if (e instanceof Yup.ValidationError) {
                setError(e);
                return;
            }

            if (e.response?.data?.already_username) {
                alert("این کاربر قبلا ثبت نام کرده است!");
            } else {
                alert("خطایی رخ داد");
            }
        }
    };

    const getError = (field: string) => {
        return error?.inner.find(
            (item) => item.path === field
        )?.message;
    };

    return (
        <div className="sign-container">

            <div className="sign-box">

                <h1>ثبت نام</h1>

                <form onSubmit={postInfo}>

                    <div className="sign-form">

                        <div className="input-group">

                            <label>نام کاربری</label>

                            <input
                                type="text"
                                name="username"
                                value={userpass.username}
                                onChange={handleChange}
                                placeholder="نام کاربری خود را وارد کنید"
                            />

                            {getError("username") && (
                                <span>{getError("username")}</span>
                            )}

                        </div>

                        <div className="input-group">

                            <label>رمز عبور</label>

                            <input
                                type="password"
                                name="password"
                                value={userpass.password}
                                onChange={handleChange}
                                placeholder="رمز عبور خود را وارد کنید"
                            />

                            {getError("password") && (
                                <span>{getError("password")}</span>
                            )}

                        </div>

                        {isOk && (
                            <p className="sign-success">
                                ثبت نام با موفقیت انجام شد
                            </p>
                        )}

                        <div className="input-group">

                            <label>نقش</label>

                            <select
                                name="role"
                                id="role"
                                value={userpass.role}
                                onChange={handleChange}
                            >
                                <option value="">انتخاب نقش</option>
                                <option value="callcenter">کال سنتر</option>
                                <option value="CEO">مدیر</option>
                                <option value="marketing">مارکتینگ</option>
                                <option value="doctor">دکتر</option>
                                <option value="photographer">عکاس</option>
                                <option value="reception">پذیرش</option>
                            </select>

                        </div>

                        <button
                            type="submit"
                            className="sign-button"
                        >
                            ثبت نام
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Sign;