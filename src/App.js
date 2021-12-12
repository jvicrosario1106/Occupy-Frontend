import React from "react";
import Inquiry from "./pages/Inquiry";
import Balance from "./pages/customer/Balance";
import PaymentDetails from "./pages/customer/PaymentDetails";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import Reservation from "./pages/Reservation";
import Resident from "./pages/Resident";
import ActivateAccount from "./pages/ActivateAccount";
import StaffDashboard from "./pages/StaffDashboard";
import ViewCustomerReservation from "./pages/ViewCustomerReservation";
import ViewCustomerResident from "./pages/ViewCustomerResident";
import AdminReport from "./pages/AdminReport";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerHomePage from "./pages/CustomerHomePage";
import { createTheme, ThemeProvider } from "@material-ui/core";
import CheckEmail from "./pages/CheckEmail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routes.js/PrivateRoute";
import Users from "./pages/Users";
import { useSelector } from "react-redux";
import Accounting from "./pages/Accounting";
import ViewAccounting from "./pages/ViewAccounting";
import PaymentHistory from "./pages/customer/PaymentHistory";
import MyProfile from "./pages/MyProfile";
import Task from "./pages/document/Task";
import TaskHistory from "./pages/document/TaskHistory";
import Documents from "./pages/document/Documents";
import ViewDocuments from "./pages/document/ViewDocuments";
import ViewEmployee from "./pages/ViewEmployee";
import Application from "./pages/Application";
import Applicants from "./pages/Applicants";
import InquiryTable from "./pages/InquiryTable";
import ForgotPassword from "./pages/ForgotPassword";
import Property from "./pages/Property";
import Notifications from "./pages/Notifications";
import Chat from "./pages/chat/Chat";
import Assigned from "./pages/agent/Assigned";
import ResetPasswordInput from "./pages/ResetPasswordInput";
import Results from "./pages/Results";
import Requirements from "./pages/agent/Requirements";
import MyProperty from "./pages/customer/MyProperty";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7440FF",
    },
    secondary: {
      main: "rgba(46, 204, 113,0.9)",
    },
  },
});

const App = () => {
  const roleType = useSelector((state) => state.authReducer.user);
  const roleTypes = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated =
    useSelector((state) => state.authReducer.isAuthenticated) ||
    localStorage.getItem("user");

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact component={Login} path="/" />

            <Route
              exact
              component={ActivateAccount}
              path="/activate/:uid/:token"
            />
            <Route exact component={CheckEmail} path="/check-email" />
            <Route exact component={Inquiry} path="/inquiry" />
            <Route exact component={Application} path="/application" />
            <Route exact component={ForgotPassword} path="/forgot-password" />
            <Route
              exact
              component={ResetPasswordInput}
              path="/password/reset/confirm/:uid/:token"
            />

            <Layout ids={roleTypes}>
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={
                  roleTypes && roleTypes.role === "Admin"
                    ? AdminDashboard
                    : roleTypes && roleTypes.role === "Client"
                    ? CustomerHomePage
                    : (roleTypes && roleTypes.role === "Staff") ||
                      (roleTypes && roleTypes.role === "Manager")
                    ? StaffDashboard
                    : Assigned
                }
                path="/home"
              />

              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Reservation}
                path="/customer-reservation"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Resident}
                path="/customer-resident"
              />

              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={AdminReport}
                path="/reports"
              />

              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={ViewCustomerReservation}
                path="/view-customer-reservation/:id"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={ViewCustomerResident}
                path="/view-customer-resident/:id"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Users}
                path="/occupy-users"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Applicants}
                path="/applicants"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={ViewEmployee}
                path="/view-employee/:id"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Accounting}
                path="/accounting"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={ViewAccounting}
                path="/view-accounting/:id"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Documents}
                path="/document"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={InquiryTable}
                path="/inquiries"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={ViewDocuments}
                path="/view-documents/:id"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Property}
                path="/properties"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Task}
                path="/tasks"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={TaskHistory}
                path="/tasks-history"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Notifications}
                path="/notifications"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Chat}
                path="/chat"
              />

              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Results}
                path="/results"
              />

              {/* Agent */}

              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Requirements}
                path="/list-requirements"
              />

              {/* Profile for the Users Staff, Manager,Agent,Admin and Customers */}
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={MyProfile}
                path="/profile"
              />
              {/* For Customers only below */}

              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={Balance}
                path="/balance"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={PaymentDetails}
                path="/payment-details"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={PaymentHistory}
                path="/payment-history"
              />
              <PrivateRoute
                isAuth={isAuthenticated}
                exact
                component={MyProperty}
                path="/my-property"
              />
            </Layout>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
