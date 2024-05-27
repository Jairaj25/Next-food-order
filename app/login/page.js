"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import "../signup/index.css";

export default function LoginPage() {
  const [allFormError, setAllFormError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset previous error messages
    const errors = {
      emailError: '',
      passwordError: '',
      allFormError: '',
    };

    setEmailError('');
    setPasswordError('');
    setAllFormError('');

    if (!email || !password) {
      errors.allFormError = 'Please enter both email and password.';
    } else {
      if (!emailRegex.test(email)) {
        errors.emailError = 'Please enter a valid email address.';
      }
    }

    // setAllFormError(errors.allFormError);
    // setEmailError(errors.emailError);

    if (Object.values(errors).every((error) => !error)) {
      redirect('/');
    }
  };

  return (
      <div className="login-main-container">
        <div className="login-form-container">
          <div className="login-title-container">
            <h2>Login</h2>
          </div>
          <div className="login-email-input-container">
            <label htmlFor="login-email" style={{ color: emailError ? '#C94A4A' : 'inherit' }}>Email</label>
            <input
              type="email"
              id="login-email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder='JohnDoe@Example.com'
              autoComplete="email"
            />
            {emailError && <div className="login-error-message">{emailError}</div>}
          </div>
          <div className="login-password-input-container">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='********'
              autoComplete="current-password"
            />
            {passwordError && <div className="login-error-message">{passwordError}</div>}
          </div>
          <div className="login-all-form-error-container">
            {allFormError && <div className="login-error-message">{allFormError}</div>}
          </div>
          <div className="login-submit-button-container">
            <div className="login-submit-button-wrapper">
              <button type="submit" onClick={handleLogin}>Login</button>
            </div>
          </div>
          <div className="login-switchform-container">
            <p>Dont have an account? </p>
            <Link className="login-link-text" href="/signup">Sign up here.</Link>
          </div>
        </div>
      </div>
  );
};