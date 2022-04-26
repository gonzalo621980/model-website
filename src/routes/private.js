import {
    HomeView,
    AdminUserView,
    UnauthorizedView
} from '../views';

export const PrivateRoutes = [
  {
    path: "/",
    component: HomeView,
    title: "Home",
    exact: true,
    showMenu: true
  },
  {
    path: "/usuarios",
    component: AdminUserView,
    title: "Usuarios",
    exact: true,
    showMenu: true
  },
  {
    path: "/unauthorized",
    component: UnauthorizedView,
    title: "Unauthorized",
    exact: true,
    showMenu: false
  }
];
