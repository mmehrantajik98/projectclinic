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
import Receptions from "./Receptions";


const App = () => {
    return (
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/sign"
                element={<Sign />}
            />

            <Route
                path="*"
                element={
                    <ProtectedLogin>
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

                                                <Route
                                                    path="/consent"
                                                    element={
                                                        <ProtectedRoute allowedroles={["Consent"]}>
                                                            <Consent />
                                                        </ProtectedRoute>
                                                    }
                                                />

                                                <Route
                                                    path="/Receptions"
                                                    element={
                                                        <ProtectedRoute allowedroles={["reception"]}>
                                                            <Receptions />
                                                        </ProtectedRoute>
                                                    }
                                                />

                                                <Route
                                                    path="/Assistant"
                                                    element={
                                                        <ProtectedRoute allowedroles={["Assistant_Manager"]}>
                                                            <Assistant />
                                                        </ProtectedRoute>
                                                    }
                                                />

                                                <Route
                                                    path="/photographer"
                                                    element={
                                                        <ProtectedRoute allowedroles={["photographer"]}>
                                                            <PhotoGraph />
                                                        </ProtectedRoute>
                                                    }
                                                />

                                                <Route
                                                    path="/callcenter"
                                                    element={
                                                        <ProtectedRoute allowedroles={["callcenter"]}>
                                                            <CallCenter />
                                                        </ProtectedRoute>
                                                    }
                                                />

                                                <Route
                                                    path="/callcentertable"
                                                    element={
                                                        <ProtectedRoute allowedroles={["callcenter"]}>
                                                            <CallCenterTable />
                                                        </ProtectedRoute>
                                                    }
                                                />

                                                <Route
                                                    path="/peoples/:id"
                                                    element={<PersonInfo />}
                                                />

                                            </Routes>

                                        </Layout>

                                    </CallCenterContext>

                                </PeopleProvider>

                            </UserProvider>

                        </AuthUser>
                    </ProtectedLogin>
                }
            />

        </Routes>
    );
};

export default App;