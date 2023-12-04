import axios from 'axios';
import { renderErrorMsg } from './DisplayMsg';

const routes = {
  getVisitors: `${window.electron.uri}api/view-visitors`,
  deleteVisitor: `${window.electron.uri}api/delete-visitor`,
  createVisitor: `${window.electron.uri}api/create-visitor`,
};

const { get } = window.electron.store;

// View Visitors
export const viewVisitors = async () => {
  const orgToken = await get('OrgToken');
  console.log(orgToken);
  try {
    const visitors = await axios
      .get(routes.getVisitors, {
        headers: { 'Access-Control-Allow-Origin': '*' },
        params: { orgToken },
      })
      .then((res) => {
        return res;
      });
    return visitors;
  } catch (e: any) {
    renderErrorMsg(e.response.data);
    return null;
  }
};
// View Visitor
export const viewVisitor = async () => {};
// Delete Visitor
export const deleteVisitor = async () => {};
// Create Visitor
export const createVisitor = async (data: {
  _id: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  location: string;
}) => {
  console.log(routes.createVisitor);
  console.log(data);
};
