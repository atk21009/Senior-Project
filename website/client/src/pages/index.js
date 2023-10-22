import Landing from "./Landing";
import SignUp from "./SignUp";
import Login from "./Login";
import Features from "./Features";
import Pricing from "./Pricing";
import Download from "./Download";
import Support from "./Support";
import Dashboard from "./Dashboard";
import CreateEmployees from "./Employees/CreateEmployees";
import CreateOrganization from "./Organization/CreateOrganization";
import Organization from "./Organization";
import Employees from "./Employees";
import Settings from "./Settings";

const pages = [
  {
    component: Landing,
    path: "/",
  },
  {
    component: SignUp,
    path: "/signup",
  },
  {
    component: Login,
    path: "/login",
  },
  {
    component: Features,
    path: "/features",
  },
  {
    component: Pricing,
    path: "/pricing",
  },
  {
    component: Download,
    path: "/download",
  },
  {
    component: Support,
    path: "/support",
  },
  {
    component: Dashboard,
    path: "/dashboard",
  },
  {
    component: Organization,
    path: "/organization",
  },
  {
    component: Employees,
    path: "/employees",
  },
  {
    component: CreateEmployees,
    path: "/create-employees",
  },
  {
    component: CreateOrganization,
    path: "/create-organization",
  },
  {
    component: Settings,
    path: "/settings",
  },
];

export default pages;
