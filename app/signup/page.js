"use client";
import Link from 'next/link';
import { redirect } from 'next/navigation'
import React, { useState } from 'react';
import "./index.css";

export default function SignupPage() {
    const [allFormError, setAllFormError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const handleSignup = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex = /^\d{10}$/;
        const nameRegex = /^[a-zA-Z]+$/;

        const errors = {
            emailError: '',
            passwordError: '',
            nameError: '',
            phoneNumberError: '',
            allFormError: '',
        };

        if (!email || !password || !name || !phoneNumber) {
            errors.allFormError = 'Please fill in all fields.';
        } else {
            if (!emailRegex.test(email)) {
                errors.emailError = 'Please enter a valid email address.';
            }

            if (!phoneNumberRegex.test(phoneNumber)) {
                errors.phoneNumberError = 'Please enter a valid phone number with 10 digits.';
            }

            if (!nameRegex.test(name)) {
                errors.nameError = 'Please enter a valid name with only alphabets.';
            }

            if (password.length < 8) {
                errors.passwordError = 'Password should be at least 8 characters.';
            } else if (password.length > 16) {
                errors.passwordError = 'Password should not exceed 16 characters.';
            } else {
                if (!/(?=.*[@$!%*?&])/.test(password)) {
                    errors.passwordError = 'Password should contain at least 1 special symbol.';
                }

                if (!/(?=.*[A-Z])/.test(password)) {
                    errors.passwordError = 'Password should contain at least 1 upper case character.';
                }

                if (!/(?=.*[a-z])/.test(password)) {
                    errors.passwordError = 'Password should contain at least 1 lower case character.';
                }
            }
        }

        setEmailError(errors.emailError);
        setPasswordError(errors.passwordError);
        setNameError(errors.nameError);
        setPhoneNumberError(errors.phoneNumberError);
        setAllFormError(errors.allFormError);

        if (Object.values(errors).every((error) => !error)) {
            redirect('/');
        }
    };


    return (
        <div className="login-main-container">
            <div className="signup-form-container">
                <div className="login-title-container">
                    <h2>Sign Up Form</h2>
                </div>
                <div className="login-email-input-container">
                    <label htmlFor="signup-email">Email</label>
                    <input
                        type="email"
                        id="signup-email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        autoComplete="email"
                    />
                    {emailError && <div className="login-error-message">{emailError}</div>}
                </div>
                <div className="login-password-input-container">
                    <label htmlFor="signup-password">Password</label>
                    <input
                        type="password"
                        id="signup-password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        autoComplete="off"
                    />
                    {passwordError && <div className="login-error-message">{passwordError}</div>}
                </div>
                <div className="login-password-input-container">
                    <label htmlFor="signup-name">Name</label>
                    <input
                        type="text"
                        id="signup-name"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        autoComplete="on"
                    />
                    {nameError && <div className="login-error-message">{nameError}</div>}
                </div>
                <div className="login-password-input-container">
                    <label htmlFor="signup-phone-number">Phone Number</label>
                    <input
                        type="tel"
                        id="signup-phone-number"
                        placeholder='598-381-7493'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        name="phoneNumber"
                        autoComplete="on"
                    />
                    {phoneNumberError && <div className="login-error-message">{phoneNumberError}</div>}
                </div>
                <div className="login-all-form-error-container">
                    {allFormError && <div className="login-error-message">{allFormError}</div>}
                </div>
                <div className="login-submit-button-container">
                    <div className="login-submit-button-wrapper">
                        <button type="submit" onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>

                <div className="login-switchform-container">
                    <p>Already have an account? </p>
                    <Link className="login-link-text" href="/login">Log in here.</Link>
                </div>
            </div>
        </div>
    );
};