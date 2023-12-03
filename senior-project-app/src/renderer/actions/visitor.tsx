import axios from 'axios';
import { renderErrorMsg } from './DisplayMsg';

const routes = {
  getVisitors: `${window.electron.uri}api/view-visitors`,
  deleteVisitor: `${window.electron.uri}api/delete-visitor`,
  createVisitor: `${window.electron.uri}api/create-visitor`,
};

// View Visitors
export const viewVisitors = async (orgToken: any) => {
  console.log(orgToken);
  try {
    const visitors = await axios.get(routes.getVisitors, {
      headers: { 'Access-Control-Allow-Origin': '*' },
      params: { orgToken },
    });
    console.log(visitors);
  } catch (e: any) {
    renderErrorMsg(e.response.data);
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
