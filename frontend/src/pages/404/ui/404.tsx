import React from 'react';
import cls from './404.module.scss';
import { Link } from 'react-router-dom';

export const Page404 = () => {
    return (
        <div className={cls.wrapper}>
            <Link to="/">Вернуться на главную</Link>
        </div>
    );
};
