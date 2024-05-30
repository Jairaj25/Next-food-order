"use client";
import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { NavMenuOptions } from '../nav_menu_options/index';
import websiteLogo from "../../../assets/website-logo.jpeg";
import searchIcon from "../../../assets/search-icon.svg";
import crossIcon from "../../../assets/cross-icon.svg";
import cartIcon from "../../../assets/shopping-cart-icon.svg";
import usersIcon from "../../../assets/users-icon.svg";
import hamburgerIcon from "../../../assets/hamburger.svg";
import "./index.css";

export default function NavbarComponent() {

    const router = useRouter();
    const location = usePathname();
    const inputRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [query, setQuery] = useState('');
    const { user } = useUser();

    // console.log('====================================');
    // console.log(user);
    // console.log('====================================');

    // Modal.setAppElement('#root');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleToggleNav = () => {
        document.getElementById('root').classList.toggle('modal-open');
        setIsNavOpen(!isNavOpen);
        document.documentElement.classList.toggle('overflow-hidden');
        document.body.classList.toggle('overflow-hidden');
    };

    const handleCloseMenu = () => {
        document.getElementById('root').classList.remove('modal-open');
        setIsNavOpen(false);
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const query = formData.get('s');

        if (query.length === 1) {
            return null;
        }
        if (query.trim() !== '') {
            router.push(`/search?query=${encodeURIComponent(query)}`);
            setQuery('');
            inputRef.current.blur();
        }
    };

    return (
        <>
            <div className="desktop-nav">
                <div className="nav-group">
                    <div className="website-logo">
                        <Image src={websiteLogo} alt="Generic Website Logo" width={70} height={70} />
                    </div>
                    <Link href="/" className={location === '/' ? 'active' : ''}>
                        Home
                    </Link>
                    <Link href="/menu" className={location === '/menu' ? 'active' : ''}>
                        Menu
                    </Link>
                    <Link href="/about" className={location === '/about' ? 'active' : ''}>
                        About Us
                    </Link>
                    <Link href="/privacy" className={location === '/privacy' ? 'active' : ''}>
                        Privacy Policy
                    </Link>
                </div>

                <div className="action-group">
                    <div className="nav-search-container">
                        <form role="search" className="search-form" onSubmit={handleSearchSubmit}>
                            <label>
                                <input
                                    type="search"
                                    className="search-field"
                                    placeholder="Search for Food"
                                    name="s"
                                    title="Search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoComplete='off'
                                    ref={inputRef}
                                />
                            </label>
                            <input type="submit" className="search-submit" value="Search" />
                        </form>
                    </div>
                    <Link href="/cart">
                        <Image src={cartIcon} alt="Cart" width={22} height={22} />
                    </Link>
                    <div className={`menu-icon ${menuOpen ? 'open' : ''} hamburger-menu`} onClick={toggleMenu}>
                        <Image src={usersIcon} alt="users" width={22} height={22} />
                    </div>
                </div>
            </div>
            <div className="mobile-nav">
                <div className="mobile-nav-hamburger" onClick={handleToggleNav}>
                    <Image src={hamburgerIcon} alt="burgir" />
                </div>
                <div className="mobile-nav-search">
                    <Image src={searchIcon} alt="Search" width={22} height={22} className="search-icon" />
                </div>
                <Modal
                    isOpen={isNavOpen}
                    contentLabel="Mobile Overlay"
                    overlayClassName="mobile-nav-overlay"
                    className="mobile-nav-content"
                    ariaHideApp={false}
                >
                <NavMenuOptions user={user} isDesktop={false} handleCloseMenu= {handleCloseMenu} />
                </Modal>
            </div>

            <Modal
                isOpen={menuOpen}
                onRequestClose={toggleMenu}
                className="user-options-modal"
                overlayClassName="user-options-overlay"
                ariaHideApp={false}
            >
                <div className="user-options-close-btn-wrapper">
                    <button className="user-options-close-btn" onClick={toggleMenu}>
                        <Image src={crossIcon} alt='Cross-icon' width={18} height={18} />
                    </button>
                </div>
                <NavMenuOptions user={user} isDesktop={true} />
            </Modal>
        </>
    )
}