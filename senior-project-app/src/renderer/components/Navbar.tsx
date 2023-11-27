import React from 'react';
import { Link } from 'react-router-dom';

import icon from '../imgs/icon/iconWhite.svg';
import xIcon from '../imgs/x-icons/x-solid.svg';

export default function Navbar() {
  const { set, get } = window.electron.store;

  function lockPrompt() {
    const root = document.getElementById('root');

    const lockPromptCtnr = document.createElement('div');
    lockPromptCtnr.classList.add('error-message');
    lockPromptCtnr.id = 'code-ctnr';

    const h1 = document.createElement('h1');
    h1.innerText = 'Enter Lock Code';

    function closeErr() {
      lockPromptCtnr.remove();
    }
    const img = document.createElement('img');
    img.src = xIcon;
    img.alt = 'X';
    img.onclick = closeErr;

    const inputCtnr = document.createElement('div');
    inputCtnr.classList.add('lock-input-ctnr');

    const inputLabel = document.createElement('div');
    inputLabel.classList.add('lock-input-label');

    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 4;
    input.pattern = '[0-9]{4}';
    input.required = true;

    function setLockCode(e: string) {
      if (e.length !== 4 || !Number.isInteger(Number(e))) {
        inputLabel.innerText = 'Please create a 4 digit passcode';
      } else {
        set('nav-lock', e);
        lockPromptCtnr.remove();
      }
    }

    const submit = document.createElement('button');
    submit.onclick = () => setLockCode(input.value);
    submit.innerText = 'Set Code';
    inputCtnr.appendChild(inputLabel);
    inputCtnr.appendChild(input);
    inputCtnr.appendChild(submit);

    const msg = document.createElement('div');
    msg.innerText =
      'Please enter a 4 digit lock combination. This combination will be used to lock the application to the current screen of the application. Each time you want to unlock of lock the screen you will be asked to input this lock.';

    if (!document.getElementById('code-ctnr') && root) {
      lockPromptCtnr.appendChild(h1);
      lockPromptCtnr.appendChild(img);
      lockPromptCtnr.appendChild(inputCtnr);
      lockPromptCtnr.appendChild(msg);
      root.appendChild(lockPromptCtnr);
    }
  }

  function toggleLock(e: React.MouseEventHandler<HTMLInputElement>) {
    console.log(e);
    if (!get('nav-lock')) {
      lockPrompt();
    }
  }

  return (
    <div className="navbar">
      <div className="nav-logo-ctnr">
        <img src={icon} alt="icon" />
        <div>DBS</div>
      </div>
      <div className="nav-link-ctnr">
        <Link to="/">Home</Link>
        <Link to="/timeclock">TimeClock</Link>
        <Link to="/visitor">Visitor</Link>
        <Link to="/employer">Employer</Link>
        <Link to="/hr">HR</Link>
      </div>
      <div className="nav-lock">
        <input id="lockBtn" type="checkbox" onClick={() => toggleLock} />
        <label htmlFor="lockBtn" />
      </div>
    </div>
  );
}
