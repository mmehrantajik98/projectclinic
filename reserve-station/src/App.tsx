import { Routes, Route } from "react-router-dom";
import Client from "./Client";
import PeopleProvider from "./PeopleContext";
import Peoples from "./peopls";
import Layout from "./layout";
import PersonInfo from "./information";
import CallCenterContext from "./callcenterContexts";
import Consent from "./consent";
import Assistant from "./Assistant";
import CallCenterTable from "./callcentertable";
import CallCenter from "./callcenter";
import PhotoGraph from "./photographer";
import Login from "./login";
import Sign from "./sign";
import Dashboard from "./dashboard";
import ProtectedRoute, { UserProvider } from "./protectedRoute";
import AuthUser from "./authUser";
import ProtectedLogin from "./protectedLogin";


const App = () => {
 return (
        <ProtectedLogin>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="*"
                    element={
                        <AuthUser>

                            <UserProvider>

                                <PeopleProvider>

                                    <CallCenterContext>

                                        <Layout>

                                            <Routes>

                                                <Route
                                                    path="/"
                                                    element={<Dashboard />}
                                                />

                                                <Route
                                                    path="/Client"
                                                    element={<Client />}
                                                />

                                                <Route
                                                    path="/peoples"
                                                    element={<Peoples />}
                                                />

                                            </Routes>

                                        </Layout>

                                    </CallCenterContext>

                                </PeopleProvider>

                            </UserProvider>

                        </AuthUser>
                    }
                />

            </Routes>

        </ProtectedLogin>
    );
};

export default App;