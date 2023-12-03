import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import icon from '../imgs/icon/icon.svg';
import empClock from '../actions/empClock';
import { loginAuth } from '../actions/auth';
import { renderError } from '../actions/DisplayMsg';
import { createVisitor } from '../actions/visitor';

const { get } = window.electron.store;

export default function Form(FIELDS: Record<string, any>[], type_: string) {
  const [label, setLabel] = useState('');
  const navigate = useNavigate();

  async function handleSubmitAuth(e: SyntheticEvent) {
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

  async function handleSubmitClock(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      employeeNumber: { value: string };
      password: { value: string };
    };

    const OrgToken = await get('OrgToken');

    const employeeNumber = target.employeeNumber.value;
    const password = target.password.value;

    await empClock({ employeeNumber, password, OrgToken });

    (document.getElementById('empNum') as HTMLInputElement).value = '';
    (document.getElementById('pass') as HTMLInputElement).value = '';
  }

  async function handleSubmitVisitor(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      fname: { value: string };
      lname: { value: string };
      p_num: { value: string };
      loc: { value: string };
    };

    const OrgToken = await get('OrgToken');

    const data = {
      _id: OrgToken,
      firstname: target.fname.value,
      lastname: target.lname.value,
      phonenumber: target.p_num.value,
      location: target.loc.value,
    };

    createVisitor(data);
  }

  function renderSubmit() {
    switch (type_) {
      case 'visitor':
        return <input type="submit" value="Sign In" className="submit-btn" />;
      case 'clock':
        return <input type="submit" value="Login" className="submit-btn" />;
      case 'auth':
        return <input type="submit" value="Login" className="submit-btn" />;
      default:
        return null;
    }
  }

  function handleSubmit(e: SyntheticEvent) {
    switch (type_) {
      case 'visitor':
        handleSubmitVisitor(e);
        break;
      case 'clock':
        handleSubmitClock(e);
        break;
      case 'auth':
        handleSubmitAuth(e);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    switch (type_) {
      case 'visitor':
        setLabel('Visitor Registration');
        break;
      case 'clock':
        setLabel('Time Clock');
        break;
      case 'auth':
        setLabel('Login');
        break;
      default:
        break;
    }
  }, [type_]);

  return (
    <div className="form-content-ctnr">
      <div className="form-content">
        <div className="form-icon">
          <img src={icon} alt="icon" />
        </div>
        <h2 className="form-title">{label}</h2>
        <div className="form-ctnr">
          <form className="form" onSubmit={handleSubmit}>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {FIELDS.map((e) => {
              return (
                <div key={e.name} className="input-ctnr">
                  <input
                    className="input"
                    placeholder={e.placeholder}
                    id={e.input_id}
                    name={e.name}
                    required={e.required}
                    type={e.type}
                  />
                  <label className="label" htmlFor={e.input_id}>
                    {e.label}
                  </label>
                </div>
              );
            })}
            {renderSubmit()}
          </form>
        </div>
      </div>
    </div>
  );
}
