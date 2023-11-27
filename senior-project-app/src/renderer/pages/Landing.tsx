import React, { SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import iconWhite from '../imgs/icon/iconWhite.svg';

import { loginAuth } from '../actions/auth';
import renderError from '../actions/DisplayError';

const FIELDS = [
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Password', name: 'password', type: 'password' },
];

function Landing() {
  const navigate = useNavigate();

  // Handle Submit Process
  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;
    try {
      await loginAuth({ email, password });
      if (window.electron.store.get('OrgToken')) {
        navigate('/timeclock');
      }
    } catch (error) {
      const message =
        'Invalid email or password. If you do not have an account please create one using the link below.';
      renderError(message, 'signup');
    }
  }

  // Render Login Inputs
  function renderInputs() {
    return FIELDS.map(({ label, name, type }) => {
      return (
        <div className="login-field-ctnr" key={label}>
          <label htmlFor={label} className="login-field-label">
            {label}
          </label>
          <input
            type={type}
            id={label}
            placeholder={label}
            name={name}
            className="login-field"
            required
          />
        </div>
      );
    });
  }

  // Test if Organization Token is saved
  useEffect(() => {
    if (window.electron.store.get('OrgToken')) {
      navigate('/timeclock');
    }
  }, [navigate]);

  // Return Login Form
  return (
    <div className="login-form-ctnr">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={iconWhite} alt="icon" className="login-form-icon" />
        <h2 className="login-form-title">Login</h2>
        {renderInputs()}
        <input type="submit" value="Login" className="login-form-submit" />
      </form>
    </div>
  );
}

export default Landing;
