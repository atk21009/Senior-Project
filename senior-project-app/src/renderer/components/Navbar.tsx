import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import icon from '../imgs/icon/iconWhite.svg';
import xIcon from '../imgs/x-icons/x-solid.svg';
import { renderErrorMsg } from '../actions/DisplayMsg';

export default function Navbar() {
  const [lockStatus, setLockStatus] = useState<boolean>(false);
  const { set, get } = window.electron.store;

  async function lockPrompt() {
    const navLock = await get('nav-lock');
    const toggledOff = await get('toggled-off');
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
    input.className = 'lock-input-prompt';

    function setLockCode(e: string) {
      if (e.length !== 4 || !Number.isInteger(Number(e))) {
        inputLabel.innerText = 'Please create a 4 digit passcode';
      } else {
        set('nav-lock', e);
        lockPromptCtnr.remove();
      }
    }

    async function checkLock(e: string) {
      if (e === navLock) {
        if (toggledOff) {
          setLockStatus(true);
          set('toggled-off', false);
        } else {
          setLockStatus(false);
          set('toggled-off', true);
        }

        lockPromptCtnr.remove();
      } else {
        setLockStatus(true);
        lockPromptCtnr.remove();
        renderErrorMsg('Incorrect Lock Code');
      }
    }

    const submit = document.createElement('button');
    const msg = document.createElement('div');
    submit.className = 'lock-input-btn';

    if (lockStatus) {
      submit.onclick = () => checkLock(input.value);
      submit.innerText = 'Submit Code';
    } else if (!lockStatus && toggledOff) {
      submit.onclick = () => checkLock(input.value);
      submit.innerText = 'Submit Code';
    } else {
      submit.onclick = () => setLockCode(input.value);
      submit.innerText = 'Set Code';
      msg.innerText =
        'Please enter a 4 digit lock combination. This combination will be used to lock the application to the current screen of the application. Each time you want to unlock of lock the screen you will be asked to input this lock.';
    }

    inputCtnr.appendChild(inputLabel);
    inputCtnr.appendChild(input);
    inputCtnr.appendChild(submit);

    if (!document.getElementById('code-ctnr') && root) {
      lockPromptCtnr.appendChild(h1);
      lockPromptCtnr.appendChild(img);
      lockPromptCtnr.appendChild(inputCtnr);
      if (!lockStatus) {
        lockPromptCtnr.appendChild(msg);
      }

      root.appendChild(lockPromptCtnr);
    }
  }

  async function toggleLock() {
    lockPrompt();
  }

  useEffect(() => {
    async function getInitState() {
      const toggledOff = await get('toggled-off');
      const navLock = await get('nav-lock');
      if (!toggledOff) {
        set('toggled-off', false);
      }
      if (navLock && !toggledOff) {
        setLockStatus(true);
      } else if (navLock && toggledOff) {
        setLockStatus(false);
      } else {
        setLockStatus(false);
      }
    }
    getInitState();
  }, [get, set]);

  return (
    <div className="navbar">
      <div className="nav-logo-ctnr">
        <img src={icon} alt="icon" />
        <div>DBS</div>
      </div>
      <div className="nav-link-ctnr">
        {lockStatus ? null : (
          <>
            <Link to="/timeclock">TimeClock</Link>
            <Link to="/visitor">Visitor</Link>
          </>
        )}
      </div>
      <div className="nav-lock">
        <input
          id="lockBtn"
          type="checkbox"
          onChange={() => toggleLock()}
          checked={lockStatus}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="lockBtn" />
      </div>
    </div>
  );
}
