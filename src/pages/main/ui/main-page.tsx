import { BlockWithTitle } from '@components/block-with-title/block-with-title';
import React from 'react';
import cls from './main-page.module.scss';
import { ProductGrid } from '@components/product-grid/product-grid';
import { GoodsCard } from '@components/card/goods-card';

interface Props { }

export const MainPage = () => {
    return (
        <div className={cls.wrapper}>
            <BlockWithTitle title="Доставка МЕДА в СПБ и Краснодаре">
                🍯 Мед, от которого хочется чаёвничать!
                Натуральные сорта с пасек России – доставка в СПБ и Краснодар.
                Попробуйте – каждая ложка как объятие лета!
            </BlockWithTitle>
            <BlockWithTitle title="Сезонное предложение">
                <ProductGrid items={Array(6).fill(<GoodsCard />)} />
            </BlockWithTitle>
            <BlockWithTitle title="Хит продаж">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At quae exercitationem, delectus fugit eos,
                doloremque facilis adipisci perferendis iste placeat ducimus pariatur harum ipsum! Repellendus dicta sed
                praesentium libero qui?{' '}
            </BlockWithTitle>
            <BlockWithTitle title="Со скидкой">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At quae exercitationem, delectus fugit eos,
                doloremque facilis adipisci perferendis iste placeat ducimus pariatur harum ipsum! Repellendus dicta sed
                praesentium libero qui?{' '}
            </BlockWithTitle>
            <BlockWithTitle title="Отзывы">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At quae exercitationem, delectus fugit eos,
                doloremque facilis adipisci perferendis iste placeat ducimus pariatur harum ipsum! Repellendus dicta sed
                praesentium libero qui?{' '}
            </BlockWithTitle>
        </div>
    );
};
