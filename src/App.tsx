import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/Routes/PrivateRoute";
import LoginPage from "./pages/auth/loginPage";
import UsersPage from "./pages/users";
import CityPage from "./pages/city";
import HotelPage from "./pages/hotel";
import AirportPage from "./pages/airport";
import TerminalPage from "./pages/terminal/index";
import GroupsPage from "./pages/groups";
import SettingsPage from "./pages/settings";
import { PermissonsType } from "./models/models";
import RegisterPage from "./pages/auth/registerPage";
import ActivityPage from "./pages/activity";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/activity"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/activity"
            element={
              <PrivateRoute permissions={[PermissonsType.Activity,PermissonsType.Admin]}>
                <ActivityPage/>
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute permissions={[PermissonsType.Users,PermissonsType.Admin]}>
                <UsersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/city"
            element={
              <PrivateRoute permissions={[PermissonsType.City,PermissonsType.Admin]}>
                <CityPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/hotel"
            element={
              <PrivateRoute permissions={[PermissonsType.Hotel,PermissonsType.Admin]}>
                <HotelPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/hotel/:cityName/:cityId"
            element={
              <PrivateRoute permissions={[PermissonsType.Hotel,PermissonsType.Admin]}>
                <HotelPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/airport"
            element={
              <PrivateRoute permissions={[PermissonsType.Airport,PermissonsType.Admin]}>
                <AirportPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/terminal"
            element={
              <PrivateRoute permissions={[PermissonsType.Terminal,PermissonsType.Admin]}>
                <TerminalPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/group"
            element={
              <PrivateRoute permissions={[PermissonsType.Group,PermissonsType.Admin]}>
                <GroupsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
