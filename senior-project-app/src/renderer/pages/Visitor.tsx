import { useEffect, useState } from 'react';
import Form from '../components/Form';
import Header from '../components/Navbar';
import { viewVisitor, viewVisitors } from '../actions/visitor';

const { get } = window.electron.store;
const FIELDS: Record<string, any>[] = [
  {
    label: 'First Name',
    placeholder: 'Enter your first name',
    name: 'fname',
    type: 'string',
    input_id: 'fname_input',
    required: true,
  },
  {
    label: 'Last Name',
    placeholder: 'Enter your last name',
    name: 'lname',
    type: 'string',
    input_id: 'lname_input',
    required: true,
  },
  {
    label: 'Phone Number*',
    placeholder: 'Enter your phone number',
    name: 'p_num',
    type: 'string',
    input_id: 'p_num',
    required: false,
  },
  {
    label: 'Visiting Location*',
    placeholder: 'Enter the location you wish to visit',
    name: 'loc',
    type: 'string',
    input_id: 'loc_input',
    required: false,
  },
];

export default function Visitor() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const renderVisitors = async () => {
      const visitorsData = await viewVisitors();
      console.log(visitorsData);
      if (visitorsData?.data) {
        setVisitors(visitorsData.data);
      }
    };
    renderVisitors();
  }, []);

  return (
    <>
      <Header />
      <div>Test</div>
    </>
  );
}
