import React, { FC } from 'react';
import cls from './main-layout.module.scss';
import { Header, Promo } from '@widgets/header';
import { useLocation } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
    const { pathname } = useLocation();

    const isMainPage = pathname === '/';
    return (
        <div className={cls.wrapper}>
            <div className="container">
                <Header isMainPage={isMainPage} />
            </div>
            {isMainPage && <Promo />}
            <div className="container">{children}</div>
        </div>
    );
};
