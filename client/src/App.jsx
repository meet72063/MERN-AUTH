import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/RegisterPage'
import EmailConfirmationPage from './pages/EmailConformationPage'
import ResetPasswordRequestPage from './pages/ResetPasswordRequestPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ProfilePage from './pages/protected/ProfilePage'
import AboutPage from './pages/AboutPage'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'

const App = () => {
    return (
        <div className='min-h-screen '>
            <Navbar />
            <div >
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/register'
                        element={
                            <AuthRoute>
                                <Register />
                            </AuthRoute>
                        }
                    />
                    <Route path='/login'
                        element={
                            <AuthRoute>
                                <Login />
                            </AuthRoute>
                        }
                    />
                    <Route path='/email/conformation/:token'
                        element={
                            <EmailConfirmationPage />
                        }
                    />
                    <Route path="/password/forgot"
                        element={
                            <AuthRoute>
                                <ResetPasswordRequestPage />
                            </AuthRoute>
                        }
                    />
                    <Route path='/password/reset/:token' element={
                        <ResetPasswordPage />
                    }
                    />
                    <Route path='/profile' element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                    />
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>


                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition:Bounce
                />
            </div>
        </div>
    )
}

export default App
