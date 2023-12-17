import axios from 'axios';
import { renderErrorMsg } from './DisplayMsg';

const { store } = window.electron;
const routes = {
  login: `${window.electron.uri}api/login`,
  currUser: `${window.electron.uri}api/currentUser`,
};

export const fetchUser = async (token: { accessToken: any }) => {
  const { accessToken } = token;
  if (accessToken) {
    const res = await axios.get(routes.currUser, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.data.organization && !store.get('OrgToken')) {
      store.set('OrgToken', res.data.organization);
    }
  }
  return store.get('OrgToken');
};

export const loginAuth = async (data: { email: string; password: string }) => {
  try {
    const res = await axios.post(routes.login, data, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });

    return fetchUser(res.data);
  } catch (e: any) {
    renderErrorMsg(e.response.data);
    return null;
  }
};
