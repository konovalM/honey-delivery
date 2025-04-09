import { ROUTES } from '@shared/const/routes';
import { Routes } from 'react-router-dom';
import { Rollup } from 'vite';

type HeaderRoute = {
    path: string;
    name: string;
};

export const headerRoutes: HeaderRoute[] = [
    {
        path: ROUTES.CATALOG,
        name: 'Каталог',
    },
    {
        path: ROUTES.ABOUT,
        name: 'О компании',
    },
    {
        path: ROUTES.PAYMENT,
        name: 'Способы оплаты',
    },
    {
        path: ROUTES.DELIVERY,
        name: 'Доставка',
    },
    // {
    //     path: ROUTES.REVIEWS,
    //     name: 'Отзывы',
    // },
    {
        path: ROUTES.CONTACTS,
        name: 'Контакты',
    },
];

export const promoRoutes: HeaderRoute[] = [
    {
        name: 'Мёд',
        path: ROUTES.CATALOG, // + ?category=мед
    },
    {
        name: 'Пыльца',
        path: ROUTES.CATALOG, // + ?category=пыльца
    },
    {
        name: 'Пчёлы',
        path: ROUTES.CATALOG, // + ?category=пчелы
    },
    {
        name: 'Соты',
        path: ROUTES.CATALOG, // + ?category=соты
    },
    {
        name: 'Подарки',
        path: ROUTES.CATALOG, // + ?category=подарки
    },
    {
        name: 'Акции',
        path: ROUTES.CATALOG, // + ?category=акции
    },
];
