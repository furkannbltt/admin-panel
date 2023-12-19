import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/Routes/PrivateRoute";
import LoginPage from "./pages/auth";
import Layout from "./components/Layout";
import UsersPage from "./pages/users";
import CityPage from "./pages/city";
import HotelPage from "./pages/hotel";
import AirportPage from "./pages/airport";
import TerminalPage from "./pages/terminal/index";
import GroupsPage from "./pages/groups";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/activity"
            element={
              <PrivateRoute>
                <Layout>
                  <div>dasdas</div>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <Layout>
                  <UsersPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/city"
            element={
              <PrivateRoute>
                <Layout>
                  <CityPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/hotel"
            element={
              <PrivateRoute>
                <Layout>
                  <HotelPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/hotel/:cityName/:cityId"
            element={
              <PrivateRoute>
                <Layout>
                  <HotelPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/airport"
            element={
              <PrivateRoute>
                <Layout>
                  <AirportPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/terminal"
            element={
              <PrivateRoute>
                <Layout>
                  <TerminalPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/group"
            element={
              <PrivateRoute>
                <Layout>
                  <GroupsPage />
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
