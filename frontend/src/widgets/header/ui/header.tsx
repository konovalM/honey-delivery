import { useLogin, useMe, useRegister } from '@entities/user/hooks';
import { LoginDto, RegisterDto } from '@entities/user/model';
import { useUserStore } from '@entities/user/store';
import { LoginModal, RegisterModal } from '@features/modals';
import { useToggle } from '@hooks/use-toogle';
import HeartIcon from '@icons/heart.svg?react';
import ShoppingCartIcon from '@icons/shopping-cart.svg?react';
import SignInIcon from '@icons/sign-in.svg?react';
import UserIcon from '@icons/user.svg?react';
import { ROUTES } from '@shared/const/routes';
import { Button } from 'antd';
import cn from 'classnames';
import { FC, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { headerRoutes } from '../model/header-routes';
import cls from './header.module.scss';
import { useGetCartTotal } from '@entities/cart/hooks';

interface Props {
    isMainPage: boolean;
}


export const Header: FC<Props> = ({ isMainPage }) => {
    const navigate = useNavigate();
    const { value: openLoginModal, setTrue: showLoginModal, setFalse: hideLoginModal } = useToggle();
    const { value: openRegisterModal, setTrue: showRegisterModal, setFalse: hideRegisterModal } = useToggle();
    const { mutateAsync: login } = useLogin()
    const { mutateAsync: register } = useRegister()
    const { data: cartTotal } = useGetCartTotal();
    const { user } = useUserStore();
    useMe();

    const handleLogin = useCallback(async (values: LoginDto) => {
        await login(values);
        hideLoginModal();
    }, [login]);

    const handleRegister = useCallback(async (values: RegisterDto) => {
        await register(values);
        hideRegisterModal();
    }, [register]);


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
                    {
                        !user ? (
                            <>
                                <Button icon={<UserIcon />} type="text" className={cls.headerBtn} onClick={showLoginModal}>
                                    Войти
                                </Button>
                                <Button icon={<SignInIcon />} type="text" className={cls.headerBtn} onClick={showRegisterModal}>
                                    Регистрация
                                </Button></>
                        ) : (
                            <div>
                                {user?.lastName} {user?.firstName}
                            </div>
                        )
                    }

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
                        {cartTotal || 0} ₽
                    </Button>
                </div>
            </div>

            <LoginModal open={openLoginModal} onCancel={hideLoginModal} onLogin={handleLogin} />
            <RegisterModal open={openRegisterModal} onCancel={hideRegisterModal} onRegister={handleRegister} />
        </div>
    );
};
