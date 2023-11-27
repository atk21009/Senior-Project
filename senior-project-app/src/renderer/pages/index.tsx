import Visitor from './Visitor';
import Employer from './Employer';
import HR from './HR';
import TimeClock from './TimeClock';
import Landing from './Landing';

const pages = [
  {
    Component: Landing,
    route: '/',
  },
  {
    Component: Visitor,
    route: '/visitor',
  },
  {
    Component: Employer,
    route: '/employer',
  },
  {
    Component: HR,
    route: '/hr',
  },
  {
    Component: TimeClock,
    route: '/timeclock',
  },
];

export default pages;
