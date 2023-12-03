import Header from '../components/Navbar';

import Form from '../components/Form';

const FIELDS: Record<string, any>[] = [
  {
    label: 'Employee Number',
    placeholder: 'Enter employee number',
    name: 'employeeNumber',
    type: 'text',
    input_id: 'empNum',
    required: true,
  },
  {
    label: 'Password',
    placeholder: 'Enter password',
    name: 'password',
    type: 'password',
    input_id: 'pass',
    required: true,
  },
];

export default function TimeClock() {
  return (
    <>
      <Header />
      {Form(FIELDS, 'clock')}
    </>
  );
}
