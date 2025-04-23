import { BlockWithTitle } from '@components/block-with-title/block-with-title';
import React from 'react';
import cls from './main-page.module.scss';
import { ProductGrid } from '@components/product-grid/product-grid';
import { GoodsCard } from '@components/card/goods-card';
import { useProducts } from '@entities/product/hooks';
import { useAddFavorite, useFavorites, useRemoveFavorite } from '@entities/favorites/hooks';
import { useAddToCart } from '@entities/cart/hooks';
import { notification } from 'antd';

interface Props { }

export const MainPage = () => {
    const { data: products } = useProducts();
    const { data: favorites } = useFavorites();
    const { mutate: addFavorite } = useAddFavorite();
    const { mutate: removeFavorite } = useRemoveFavorite();
    const { mutate: addToCart } = useAddToCart();
    const [api, contextHolder] = notification.useNotification();

    const enhancedProducts = products?.map((product) => {
        return {
            ...product,
            isFavorite: favorites?.some((favorite) => favorite.id === product.id),
        };
    });

    const seasonProducts = enhancedProducts?.slice(0, 3);
    const hitProducts = enhancedProducts?.slice(3, 6);
    const saleProducts = enhancedProducts?.slice(6, 9);

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
            <BlockWithTitle title="Доставка МЕДА в СПБ и Краснодаре">
                🍯 Мед, от которого хочется чаёвничать!
                Натуральные сорта с пасек России – доставка в СПБ и Краснодар.
                Попробуйте – каждая ложка как объятие лета!
            </BlockWithTitle>
            <BlockWithTitle title="Сезонное предложение">
                <ProductGrid items={seasonProducts?.map((product) => <GoodsCard key={product.id} title={product.title} details={product.description} price={product.price} isFavorite={product.isFavorite} onToggleFavorite={() => product.isFavorite ? removeFavorite(product.id) : addFavorite(product.id)} onAddToCart={handleAddToCart(product.id)} />) as React.ReactNode[]} />
            </BlockWithTitle>
            <BlockWithTitle title="Хит продаж">
            <ProductGrid items={hitProducts?.map((product) => <GoodsCard key={product.id} title={product.title} details={product.description} price={product.price} isFavorite={product.isFavorite} onToggleFavorite={() => product.isFavorite ? removeFavorite(product.id) : addFavorite(product.id)} onAddToCart={handleAddToCart(product.id)} />) as React.ReactNode[]} />
            </BlockWithTitle>
            <BlockWithTitle title="Со скидкой">
            <ProductGrid items={saleProducts?.map((product) => <GoodsCard key={product.id} title={product.title} details={product.description} price={product.price} isFavorite={product.isFavorite} onToggleFavorite={() => product.isFavorite ? removeFavorite(product.id) : addFavorite(product.id)} onAddToCart={handleAddToCart(product.id)} />) as React.ReactNode[]} />
            </BlockWithTitle>
            <BlockWithTitle title="Отзывы">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At quae exercitationem, delectus fugit eos,
                doloremque facilis adipisci perferendis iste placeat ducimus pariatur harum ipsum! Repellendus dicta sed
                praesentium libero qui?{' '}
            </BlockWithTitle>
        </div>
    );
};
