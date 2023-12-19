import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/Routes/PrivateRoute";
import LoginPage from "./pages/auth";
import Layout from "./components/Layout";
import UsersPage from "./pages/users";
import CityPage from "./pages/city";
import HotelPage from "./pages/hotel";
import AirportPage from "./pages/airport";
import TerminalPage from "./pages/terminal/index";
import GroupsPage from "./pages/groups";
import SettingsPage from "./pages/settings";
import { PermissonsType } from "./models/models";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/activity"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/activity"
            element={
              <PrivateRoute permissions={[PermissonsType.Activity]}>
                <Layout>
                  <div>dasdas</div>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute permissions={[PermissonsType.Users]}>
                <Layout>
                  <UsersPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/city"
            element={
              <PrivateRoute permissions={[PermissonsType.City]}>
                <Layout>
                  <CityPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/hotel"
            element={
              <PrivateRoute permissions={[PermissonsType.Hotel]}>
                <Layout>
                  <HotelPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/hotel/:cityName/:cityId"
            element={
              <PrivateRoute permissions={[PermissonsType.Hotel]}>
                <Layout>
                  <HotelPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/airport"
            element={
              <PrivateRoute permissions={[PermissonsType.Airport]}>
                <Layout>
                  <AirportPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/terminal"
            element={
              <PrivateRoute permissions={[PermissonsType.Terminal]}>
                <Layout>
                  <TerminalPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/group"
            element={
              <PrivateRoute permissions={[PermissonsType.Group]}>
                <Layout>
                  <GroupsPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
