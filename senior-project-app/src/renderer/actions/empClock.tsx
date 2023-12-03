import axios from 'axios';
import { renderErrorMsg, renderMsg } from './DisplayMsg';

const routes = {
  empClock: `${window.electron.uri}api/clock-in-out`,
};

const empClock = async (data: {
  employeeNumber: string;
  password: string;
  OrgToken: string;
}) => {
  try {
    const res = await axios.post(routes.empClock, data, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    renderMsg(res.data);
  } catch (e: any) {
    renderErrorMsg(e.response.data);
  }
};

export default empClock;
