import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getUser, logOut } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import avatar from '../assets/avatar.png';
import { toast } from 'react-toastify'

const Navbar = () => {
    const { user } = getUser();
    const createLinkClass = ({ isActive }) => isActive ? "text-light-primary dark:text-dark-primary font-semibold underline underline-offset-4" : "";

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        toast.info("Logged out!")
        navigate("/", { replace: true });
    }

    return (
        <nav className="dark:bg-dark-bg dark:text-dark-text bg-light-bg text-light-text md:h-navHeight ">
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Logo */}
                    <Link to="/">
                        <div className="text-xl font-bold mb-2 md:mb-0 md:mr-4">
                            <span className="text-light-primary dark:text-dark-primary">MERN</span>-AUTH
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-center">
                        <NavLink to="/" className={createLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/about" className={createLinkClass}>
                            About
                        </NavLink>
                        {!user ? (
                            <>
                                <Link to="/login" className="dark:bg-dark-primary dark:text-white px-2 py-2 rounded hover:bg-opacity-80 transition duration-300">
                                    Login
                                </Link>
                                <Link to='/register' className="dark:bg-dark-primary dark:text-white px-4 py-2 rounded hover:bg-opacity-80 transition duration-300">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <button onClick={handleLogout} className="dark:bg-dark-primary dark:text-white px-4 py-2 rounded hover:bg-opacity-80 transition duration-300">
                                    Logout
                                </button>
                                <Link to="/profile">
                                    <div className='p-1 rounded-full'>
                                        <img src={user.picture[0] || avatar} height="35px" width="35px" className='rounded-full border-2 border-teal-300 p-1' alt="User Avatar" />
                                    </div>
                                </Link>
                            </>
                        )}

                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
