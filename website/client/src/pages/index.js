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
import EmployeeProfile from "./Employees/Employee/EmployeeProfile";
import Visitor_Profile from "./Dashboard/components/visitors/Visitor_Profile";

export const pages = [
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
];

export const authPages = [
  // Core Components
  {
    component: Dashboard,
    path: "/dashboard",
  },
  {
    component: Settings,
    path: "/settings",
  },
  // Org Pages
  {
    component: Organization,
    path: "/organization",
  },
  {
    component: CreateOrganization,
    path: "/create-organization",
  },
  // Emp Pages
  {
    component: Employees,
    path: "/employees",
  },
  {
    component: CreateEmployees,
    path: "/create-employees",
  },
  {
    component: EmployeeProfile,
    path: "/employee/:employee_number",
  },
  // Visitor Pages
  {
    component: Visitor_Profile,
    path: "/visitor/:visitor_number",
  },
];
