import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { headerRoutes } from '../model/header-routes';
import cls from './header.module.scss';
import UserIcon from '@icons/user.svg?react';
import SignInIcon from '@icons/sign-in.svg?react';
import ShoppingCartIcon from '@icons/shopping-cart.svg?react';
import HeartIcon from '@icons/heart.svg?react';
import { Button } from 'antd';
import { ROUTES } from '@shared/const/routes';
import cn from 'classnames';
import { LoginModal, RegisterModal } from '@features/modals';
import { useToggle } from '@hooks/use-toogle';

interface Props {
    isMainPage: boolean;
}


export const Header: FC<Props> = ({ isMainPage }) => {
    const navigate = useNavigate();
    const { value: openLoginModal, setTrue: showLoginModal, setFalse: hideLoginModal } = useToggle();
    const { value: openRegisterModal, setTrue: showRegisterModal, setFalse: hideRegisterModal } = useToggle();

    return (
        <div className={cls.header}>
            <nav>
                <div className={cls.links}>
                    {headerRoutes.map((route) => (
                        <Link key={route.path} to={route.path}>
                            {route.name}
                        </Link>
                    ))}
                </div>
                <div className={cls.buttons}>
                    <Button icon={<UserIcon />} type="text" className={cls.headerBtn} onClick={showLoginModal}>
                        Войти
                    </Button>
                    <Button icon={<SignInIcon />} type="text" className={cls.headerBtn} onClick={showRegisterModal}>
                        Регистрация
                    </Button>
                </div>
            </nav>
            <div className={cn(cls.main, !isMainPage && cls.mainDivider)}>
                <Link to={ROUTES.HOME} className="logo">
                    Honey Delivery
                </Link>
                <div className={cls.mainButtons}>
                    <Button icon={<HeartIcon />} type="text" className={cls.headerBtn} onClick={() => navigate(ROUTES.FAVORITES)}>
                        Избранное
                    </Button>
                    <Button icon={<ShoppingCartIcon />} type="text" className={cls.headerBtn} onClick={() => navigate(ROUTES.CART)}>
                        0 ₽
                    </Button>
                </div>
            </div>

            <LoginModal open={openLoginModal} onCancel={hideLoginModal} />
            <RegisterModal open={openRegisterModal} onCancel={hideRegisterModal} />
        </div>
    );
};
