import React from 'react';
import cls from './favorites.module.scss';
import { GoodsCard } from '@components/card/goods-card';
import { Checkbox, notification, Radio, Spin } from 'antd';
import { useFavorites, useAddFavorite, useRemoveFavorite } from '@entities/favorites/hooks';
import { useAddToCart } from '@entities/cart/hooks';

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
];

const plainOptions = ['Мед', 'Продукты пчеловодства'];

export const Favorites = () => {
    const { data, isLoading } = useFavorites();
    const { mutate: removeFavorite } = useRemoveFavorite();
    const { mutate: addToCart } = useAddToCart();
    const [api, contextHolder] = notification.useNotification();

    const handleAddToCart = (productId: number) => (quantity: number) => {
        addToCart({ productId, quantity }, {
            onSuccess: (cartItem) => {
                api.success({
                    message: `Товар "${cartItem?.name ?? ''}" добавлен в корзину`,
                    // description: cartItem.product.title,
                    placement: 'bottomRight',
                });
            },
        });
    }

    return (
        <div className={cls.wrapper}>
            {contextHolder}
            <aside className={cls.filters}>
                {/* фильтры и сортировка */}
                <label htmlFor="availability">
                    <span className={cls.label}>Наличие товаров:</span>
                    <Radio.Group options={availabilityOptions} className={cls.optionsGroup} id='availability' />
                </label>
                <label htmlFor="type">
                    <span className={cls.label}>Тип товара:</span>
                    <Checkbox.Group options={plainOptions} className={cls.optionsGroup} defaultValue={['Мед']} />
                </label>
            </aside>
            <section className={cls.favoriteGoods}>
                {/* список товаров */}
                <h2>Избранное</h2>
                {isLoading && <Spin size='large'/>}
                {
                    data && data.length > 0
                        ? <div className={cls.list}>
                            {data.map((item) => (
                                <GoodsCard
                                    key={item.id}
                                    isFavorite
                                    title={item.title}
                                    price={item.price}
                                    details={item.description}
                                    onToggleFavorite={() => removeFavorite(item.id)}
                                    onAddToCart={handleAddToCart(item.id)}
                                />
                            ))}
                        </div>
                        : <p>Нет товаров в избранном</p>
                }
            </section>
        </div>
    );
};
