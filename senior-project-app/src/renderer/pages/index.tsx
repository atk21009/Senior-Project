import Visitor from './Visitor';
import Employer from './Employer';
import HR from './HR';
import TimeClock from './TimeClock';
import Landing from './Landing';
import createVisitor from './Visitor/CreateVisitor';
import VisitorProfile from './Visitor/VisitorProfile';

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
  {
    Component: createVisitor,
    route: '/create-visitor',
  },
  {
    Component: VisitorProfile,
    route: '/visitor/:visitor_id',
  },
];

export default pages;
