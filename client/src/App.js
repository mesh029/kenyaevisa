import './App.css';
import VisaSignUpForm from './pages/visaSignUpForm';
import SignUp from './components/auth/signUp';
import React, { useState } from 'react';
import './components/forms/visaForm/styles.css';
import { BrowserRouter as Router, Routes, Route,  Navigate } from 'react-router-dom';
import SignInSignUp from './pages/signInSignUp';
import { ROUTES } from './constants/constants';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

//redux and pp
import ProfilePage from './pages/profile';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import VisaSignUpEditForm from './pages/visaSignUpEdit';
import AdminPage from './pages/admin';
import Home from './pages/home';
import About from './pages/about';
import ReusableAppBar from './components/ui/appBar';
import Footer from './components/ui/footer';
import SignIn from './components/auth/signIn';
import ProtectedRoute from './actions/protectedRoutes';
import FAQ from './pages/faqPage';
import ReportPage from './pages/reportPage';



function App() {

  
// Add a function to check if the user is authenticated
const isAuthenticated = () => {
  // Check if the user is authenticated (e.g., by checking the presence of adminData in localStorage)
  return localStorage.getItem('adminData') !== null;
};

const PrivateRoute = ({ element }) => {
  // If the user is authenticated, render the provided element (AdminPage), otherwise, redirect to the sign-in page
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

  return (

    
    <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>


    <Router>
      <ReusableAppBar/>
    <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.SIGN_UP} element={<SignInSignUp />} />
      <Route path={ROUTES.CREATE_VISA} element={<VisaSignUpForm />} />
      <Route path={ROUTES.ABOUT} element={<About/>} />
      <Route path={ROUTES.FAQ} element={<FAQ/>} />
      <Route path={ROUTES.ADMIN} element={<PrivateRoute element={<AdminPage />} />} />
      <Route path={ROUTES.SIGN_IN} element={<SignIn/>} />
      <Route path={`${ROUTES.REPORT}/:visaId`} element={<ReportPage/>} />

      <Route path={`${ROUTES.VISA_SIGN_UP_EDIT}/edit/:id`}
 element={<VisaSignUpEditForm/>} />



    </Routes>

    <Footer/>
  </Router>

  </PersistGate>

  </Provider>
 
);

  }

export default App;
