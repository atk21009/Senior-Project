import Landing from "./Landing";
import SignUp from "./SignUp";
import Login from "./Login";
import Features from "./Features";
import Pricing from "./Pricing";
import Download from "./Download";
import Support from "./Support";
import Dashboard from "./Dashboard";

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
];

export default pages;
