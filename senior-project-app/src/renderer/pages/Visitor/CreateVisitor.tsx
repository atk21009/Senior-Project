import Form from '../../components/Form';
import Header from '../../components/Navbar';

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

export default function createvisitor() {
  return (
    <>
      <Header />
      {Form(FIELDS, 'visitor')}
    </>
  );
}
