import React from 'react';
import cls from './catalog.module.scss';
import { Checkbox, notification, Radio, Tag } from 'antd';
import { GoodsCard } from '@components/card/goods-card';
import { useProducts } from '@entities/product/hooks';
import { useAddFavorite, useFavorites, useRemoveFavorite } from '@entities/favorites/hooks';
import { useAddToCart } from '@entities/cart/hooks';
import { c } from 'node_modules/vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P';

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

const discountOptions = [
    'Акция',
    '2 по цене 1',
]

const plainOptions = ['Мед', "Продукты пчеловодства"];

const honeyTypes = [
    'Акациевый',
    'Гречишный',
    'Липовый',
    'Цветочный',
    'Майский',
    'Подсолнечный',
    'Донниковый',
    'Каштановый',
    'Клеверный',
    'Луговой',
];
export const Catalog = () => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>(['Movies']);
    const { data: products } = useProducts();
    const { mutate: addFavorite } = useAddFavorite();
    const { mutate: removeFavorite } = useRemoveFavorite();
    const { mutate: addToCart } = useAddToCart();
    const { data: favorites } = useFavorites();
    const [api, contextHolder] = notification.useNotification();


    const favoriteIds = new Set(favorites?.map(f => f.id));

    const enhancedProducts = products?.map(product => ({
        ...product,
        isFavorite: favoriteIds.has(product.id)
    }));

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

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };


    return (
        <div>
            {contextHolder}
            <div className={cls.wrapper}>
                <h1>Каталог продуктов</h1>
                <div className={cls.tags}>
                    {honeyTypes.map<React.ReactNode>((tag) => (
                        <Tag.CheckableTag
                            key={tag}
                            checked={selectedTags.includes(tag)}
                            onChange={(checked) => handleChange(tag, checked)}
                        >
                            {tag}
                        </Tag.CheckableTag>
                    ))}
                </div>
                <div className={cls.content}>
                    <aside className={cls.filters}>
                        {/* фильтры и сортировка */}
                        <label htmlFor="availability">
                            <span className={cls.label}>Выгода:</span>
                            <Checkbox.Group options={discountOptions} className={cls.optionsGroup} />
                        </label>
                        <label htmlFor="availability">
                            <span className={cls.label}>Тип товара:</span>
                            <Checkbox.Group options={plainOptions} className={cls.optionsGroup} defaultValue={['Мед']} />
                        </label>
                    </aside>
                    <section className={cls.favoriteGoods}>
                        {/* список товаров */}

                        <div className={cls.list}>
                            <button onClick={() => {console.log('clicked');api.success({ message: 'success' })}}>click me</button>
                            {
                                enhancedProducts && enhancedProducts.length > 0 ? enhancedProducts.map((item) => (
                                    <GoodsCard key={item.id} title={item.title} price={item.price} onAddToCart={handleAddToCart(item.id)} onToggleFavorite={() => item.isFavorite ? removeFavorite(item.id) : addFavorite(item.id)} isFavorite={item.isFavorite} />
                                )) : <div>Нет товаров</div>
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
