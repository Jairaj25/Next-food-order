import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import orderIcon from "../../../assets/order-icon.svg";
import walletIcon from "../../../assets/wallet-icon.svg";
import locationIcon from "../../../assets/location-icon.svg";
import profileIcon from "../../../assets/profile-icon.svg";
import powerIcon from "../../../assets/power-icon.svg";
import leftArrow from "../../../assets/chevron-left3.svg";
import loginArrow from "../../../assets/login-arrow.svg";
import signUpIcon from "../../../assets/signup-icon.svg";
import cartIcon from "../../../assets/shopping-cart-icon.svg";
import settingsIcon from "../../../assets/setting-cog.svg";
import FAQIcon from "../../../assets/faq-icon.svg";

export function NavMenuOptions({ user, isDesktop, handleCloseMenu }) {

    const location = usePathname();

    if (isDesktop) {
        if (typeof user == "object") {
            return (
                <>
                    <div className="menu-options">
                        <div className="desktop-options">
                            <Image src={orderIcon} alt="orders" width={22} height={22} />
                            <div>My Orders</div>
                        </div>
                        <Link className="desktop-options" href="/profile">
                            <Image src={profileIcon} alt="profile" width={22} height={22} />
                            <div>Profile</div>
                        </Link>
                        <div className="desktop-options">
                            <Image src={locationIcon} alt="address" width={22} height={22} />
                            <div>Manage Address</div>
                        </div>
                        <div className="desktop-options">
                            <Image src={walletIcon} alt="payment" width={22} height={22} />
                            <div>Payment Methods</div>
                        </div>
                        <div className="desktop-options">
                            <Image src={profileIcon} alt="contact" width={22} height={22} />
                            <div>Contact Us</div>
                        </div>
                        <div className="desktop-options settings-option">
                            <Image src={settingsIcon} alt="Setting Icon" width={22} height={22} />
                            <div>Settings</div>
                        </div>
                        <div className="desktop-options">
                            <Image src={FAQIcon} alt="Setting Icon" width={22} height={22} />
                            <div>Help & FAQs</div>
                        </div>
                    </div>

                    <div className="menu-options">
                        <Link className="desktop-logout-btn desktop-options" href="/api/auth/logout">
                            <Image src={powerIcon} alt="logout" width={22} height={22} />
                            <p>logout</p>
                        </Link>
                    </div>
                </>
            );
        } else {
            return (
                <div className="menu-options">
                    <Link className="desktop-options" href="/api/auth/login">
                        <Image src={loginArrow} alt="login" width={22} height={22} />
                        <p>Login</p>
                    </Link>
                    <Link className="desktop-options" href="/api/auth/signup">
                        <Image src={signUpIcon} alt="signUp" width={22} height={22} />
                        <p>Sign up</p>
                    </Link>
                </div>
            );
        }

    } else {
        return (
            <>
                <div className="mobile-nav-overlay-close-icon" onClick={handleCloseMenu}>
                    <Image src={leftArrow} alt="close" />
                </div>
                <div className="nav-content">
                    <div className={`mobile-nav-home-link ${location === '/' ? 'active' : ''}`} onClick={handleCloseMenu}>
                        <Link href="/">
                            Home
                        </Link>
                    </div>
                    <div className={`mobile-nav-about-link ${location === '/about' ? 'active' : ''}`} onClick={handleCloseMenu}>
                        <Link href="/about">
                            About Us
                        </Link>
                    </div>
                    <div className={`mobile-nav-privacy-link ${location === '/privacy' ? 'active' : ''}`} onClick={handleCloseMenu}>
                        <Link href="/privacy">
                            Privacy Policy
                        </Link>
                    </div>
                    <div className={`mobile-nav-cart-link ${location === '/cart' ? 'active' : ''}`} onClick={handleCloseMenu}>
                        <Link href="/cart">
                            <Image src={cartIcon} alt="Cart" width={22} height={22} />
                            <p>Cart</p>
                        </Link>
                    </div>
                    <div className={`mobile-nav-login-link ${location === '/login' ? 'active' : ''}`} onClick={handleCloseMenu}>
                        <Link href="/login">
                            <Image src={loginArrow} alt="login" width={22} height={22} />
                            <p>Login</p>
                        </Link>
                    </div>
                    <div className={`mobile-nav-signup-link ${location === '/signup' ? 'active' : ''}`} onClick={handleCloseMenu}>
                        <Link href="/signup">
                            <Image src={signUpIcon} alt="signUp" width={22} height={22} />
                            <p>Sign up</p>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}

