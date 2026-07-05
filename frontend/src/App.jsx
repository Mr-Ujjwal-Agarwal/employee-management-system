import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/employees"
                element={<Employees />}
            />

            <Route
                path="/departments"
                element={<Departments />}
            />

            <Route
                path="/settings"
                element={<Settings />}
            />

            <Route

    path="*"

    element={<NotFound />}

/>

        </Routes>

    );

}

export default App;