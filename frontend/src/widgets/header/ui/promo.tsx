import cls from './header.module.scss';
import { promoRoutes } from '../model/header-routes';
import { Link } from 'react-router-dom';
import Banner from '@shared/assets/banner.png';

export const Promo = () => {
    return (
        <div className={cls.promo}>
            <div className={cls.promoTop}>
                <div className="container">
                    <ul className={cls.promoNav}>
                        {promoRoutes.map(({ path, name }) => (
                            <li>
                                <Link to={path}>{name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={cls.banner}>
                <img src={Banner} alt="banner" />
            </div>
        </div>
    );
};
