import React from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaPhone } from 'react-icons/fa';

const Header = () => {
    return (
        <header className='header'>
            <div className='header-left'>
                <img src='../public/logo192.png' alt='Logo' className='logo' />
            </div>
            <div className='header-center'>
                <input type='text' placeholder='Search...' className='search-input' />
                <button className='search-button'>
                    <FaSearch />
                </button>
            </div>
            <div className='header-right'>
                <a href='tel:+123456789' className='icon'><FaPhone /></a>
                <a href='/login' className='icon'><FaUser /></a>
                <a href='/cart' className='icon'><FaShoppingCart /></a>
            </div>
        </header>
    );
};

export default Header;