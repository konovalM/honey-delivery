import { memo, ReactNode } from 'react';
import cls from './product-grid.module.scss';

interface Props {
    items: ReactNode[];
}

export const ProductGrid = memo<Props>(({ items }) => {
    return <div className={cls.grid}>{items}</div>;
});
