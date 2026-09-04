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

export const NAVBAR_ARIA_LABELS = {
    SEARCH_BOOKS: 'Search books',
    SWITCH_TO_LIGHT_MODE: 'Switch to light mode',
    SWITCH_TO_DARK_MODE: 'Switch to dark mode',
    OPEN_ACCOUNT_MENU: 'Open account menu',
    OPEN_NAVIGATION_MENU: 'Open navigation menu',
    CLOSE_NAVIGATION_MENU: 'Close navigation menu',
};
