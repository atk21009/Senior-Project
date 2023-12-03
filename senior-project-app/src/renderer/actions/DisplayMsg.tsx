import xIcon from '../imgs/x-icons/x-solid.svg';

export function renderError(error: string, link: string) {
  const root = document.getElementById('root') as HTMLElement;
  (document.getElementById('Email') as HTMLInputElement).value = '';
  (document.getElementById('Password') as HTMLInputElement).value = '';

  const errCtnr = document.createElement('div');
  errCtnr.classList.add('error-message');
  errCtnr.id = 'ErrCtnr';

  const h1 = document.createElement('h1');
  h1.innerText = 'Error';

  function closeErr() {
    errCtnr.remove();
  }
  const img = document.createElement('img');
  img.src = xIcon;
  img.alt = 'X';
  img.onclick = closeErr;

  const errMes = document.createElement('div');
  errMes.innerText = error;

  const a = document.createElement('a');
  a.target = '_blank';
  a.href = `https://www.taylor58.dev/${link}`;
  a.rel = 'noreferrer';
  a.innerText = 'Create An Account';
  if (!document.getElementById('ErrCtnr')) {
    errCtnr.appendChild(h1);
    errCtnr.appendChild(img);
    errCtnr.appendChild(errMes);
    errCtnr.appendChild(a);
    root.appendChild(errCtnr);
  }
}

export function renderErrorMsg(error: string) {
  const root = document.getElementById('root') as HTMLElement;

  const errCtnr = document.createElement('div');
  errCtnr.classList.add('error-message');
  errCtnr.id = 'ErrCtnr';

  const h1 = document.createElement('h1');
  h1.innerText = 'Error';

  function closeErr() {
    errCtnr.remove();
  }
  const img = document.createElement('img');
  img.src = xIcon;
  img.alt = 'X';
  img.onclick = closeErr;

  const errMes = document.createElement('div');
  errMes.innerText = error;

  if (!document.getElementById('ErrCtnr')) {
    errCtnr.appendChild(h1);
    errCtnr.appendChild(img);
    errCtnr.appendChild(errMes);
    root.appendChild(errCtnr);
  }
}

export function renderMsg(msg: string) {
  const root = document.getElementById('root') as HTMLElement;

  const errCtnr = document.createElement('div');
  errCtnr.classList.add('error-message');
  errCtnr.id = 'ErrCtnr';

  const h1 = document.createElement('h2');
  h1.innerText = msg;

  function closeErr() {
    errCtnr.remove();
  }
  const img = document.createElement('img');
  img.src = xIcon;
  img.alt = 'X';
  img.onclick = closeErr;

  if (!document.getElementById('ErrCtnr')) {
    errCtnr.appendChild(h1);
    errCtnr.appendChild(img);
    root.appendChild(errCtnr);
  }

  setTimeout(closeErr, 15 * 1000);
}
