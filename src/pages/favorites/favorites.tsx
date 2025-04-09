import React from 'react';
import cls from './favorites.module.scss';
import { GoodsCard } from '@components/card/goods-card';
import { Checkbox, Radio } from 'antd';

interface Props { }

const availabilityOptions = [
    {
        value: 'all',
        label: 'Неважно',
    },
    {
        value: 'available',
        label: 'В наличии',
    },
    {
        value: 'not_available',
        label: 'Нет в наличии',
    }
]

const plainOptions = ['Мед', "Продукты пчеловодства"];

export const Favorites = () => {
    return (
        <div className={cls.wrapper}>
            <aside className={cls.filters}>
                {/* фильтры и сортировка */}
                <label htmlFor="availability">
                    <span className={cls.label}>Наличие товаров:</span>
                    <Radio.Group options={availabilityOptions} className={cls.optionsGroup} id='availability' />
                </label>
                <label htmlFor="availability">
                    <span className={cls.label}>Тип товара:</span>
                    <Checkbox.Group options={plainOptions} className={cls.optionsGroup} defaultValue={['Мед']} />
                </label>
            </aside>
            <section className={cls.favoriteGoods}>
                {/* список товаров */}
                <h2>Избранное</h2>
                <div className={cls.list}>
                    {Array(5).fill(<GoodsCard isFavorite />)}
                </div>
            </section>
        </div>
    );
};
