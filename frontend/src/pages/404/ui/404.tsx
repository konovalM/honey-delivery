import { Link } from 'react-router-dom';
import cls from './404.module.scss';

export const Page404 = () => {
    return (
        <div className={cls.wrapper}>
            <Link to="/">Вернуться на главную</Link>
        </div>
    );
};
