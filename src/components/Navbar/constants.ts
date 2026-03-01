import {privateRoutes} from '@routes/routes';

export const navbarRoutes = [
    {id: 1, label: 'Home', route: '/', iconClassName: 'fa-solid fa-house'},
    {id: 2, label: 'My Books', route: privateRoutes.myBooks, iconClassName: 'fa-solid fa-book'},
    {id: 3, label: 'Browse', route: '/browse', iconClassName: 'fa-solid fa-compass'},
];

export const subMenuRoutes = [
    {label: 'Profile', route: '/', iconClassName: 'fa-regular fa-user'},
    {label: 'Setting', route: '/', iconClassName: 'fa-solid fa-gear'},
];

export const SUB_MENU = {
    LOGOUT: 'Logout',
    WELCOME_BACK: 'Welcome back!',
};

export const NAVBAR = {
    SEARCH_ALL_RESULTS: 'Search all results for',
    BY: 'by',
};
