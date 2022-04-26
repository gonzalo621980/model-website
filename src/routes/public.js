import {
    LoginView,
    UnauthorizedView
} from '../views';

export const PublicRoutes = [
  {
    path: "/login",
    component: LoginView,
    title: "Login",
    exact: true,
    showMenu: false
  }
];
