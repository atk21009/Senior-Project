import axios from 'axios';
import { renderErrorMsg } from './DisplayMsg';

const routes = {
  getVisitors: `${window.electron.uri}api/view-visitors`,
  getVisitor: `${window.electron.uri}api/view-visitor`,
  deleteVisitor: `${window.electron.uri}api/delete-visitor`,
  createVisitor: `${window.electron.uri}api/create-visitor`,
};

const { get } = window.electron.store;

// View Visitors
export const viewVisitors = async () => {
  const orgToken = await get('OrgToken');

  try {
    const visitors = await axios.get(routes.getVisitors, {
      headers: { 'Access-Control-Allow-Origin': '*' },
      params: { orgToken },
    });
    return visitors.data;
  } catch (e: any) {
    renderErrorMsg(e.response.data);
    return null;
  }
};
// View Visitor
export const viewVisitor = async (_id: string | undefined) => {
  try {
    const visitor = await axios.get(routes.getVisitor, {
      headers: { 'Access-Control-Allow-Origin': '*' },
      params: { _id },
    });
    return visitor.data;
  } catch (e: any) {
    renderErrorMsg(e.response.data);
    return null;
  }
};
// Delete Visitor
export const deleteVisitor = async (_id: any) => {
  try {
    await axios.post(routes.deleteVisitor, { _id });
    return null;
  } catch (e: any) {
    renderErrorMsg(e.response.data);
    return null;
  }
};
// Create Visitor
export const createVisitor = async (data: {
  _id: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  location: string;
}) => {
  try {
    await axios.post(routes.createVisitor, data);
  } catch (e: any) {
    renderErrorMsg(e.response.data);
  }
};
