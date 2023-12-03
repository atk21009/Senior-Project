import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';

const FIELDS: Record<string, any>[] = [
  {
    label: 'Email',
    placeholder: 'Enter email',
    name: 'email',
    type: 'email',
    input_id: 'authEmail',
    required: true,
  },
  {
    label: 'Password',
    placeholder: 'Enter password',
    name: 'password',
    type: 'password',
    input_id: 'authPassword',
    required: true,
  },
];

export default function Landing() {
  const navigate = useNavigate();

  // Test if Organization Token is saved
  useEffect(() => {
    if (window.electron.store.get('OrgToken')) {
      navigate('/timeclock');
    }
  }, [navigate]);

  // Return Login Form
  return Form(FIELDS, 'auth');
}
