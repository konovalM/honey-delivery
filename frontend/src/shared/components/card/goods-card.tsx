import React, { memo, useState } from 'react';
import { Button } from 'antd';
import HeartIcon from '@icons/heart.svg?react';
import HoneyImg from '@shared/assets/honey.png';
import cls from './goods-card.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { QuantityControl } from '@components/quantity-control/quantity-control';
import { QuantityControlOld } from '@components/quantity-control/quantity-control-old';

interface ProductDetail {
    label: string;
    value: string;
}

interface Props {
    title?: string;
    price?: number;
    crossedPrice?: string;
    isFavorite?: boolean;
    details?: string;
}



export const GoodsCard = memo<Props>(({
    title = 'Мёд цветочный 1кг',
    price = 1600,
    crossedPrice,
    isFavorite = false,
    details = "Этот мед идеален против простуды!"
}) => {
    const [isFavoriteValue, setIsFavoriteValue] = useState(isFavorite);
    const [isHovered, setIsHovered] = useState(false);


    return (
        <div
            className={cls.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cls.view}>
                <img src={HoneyImg} alt="goods card" />
                <Button
                    icon={<HeartIcon />}
                    type="text"
                    className={isFavoriteValue ? `${cls.favorite} ${cls.likeBtn}` : cls.likeBtn}
                    onClick={() => setIsFavoriteValue(!isFavoriteValue)}
                />
            </div>

            <div className={cls.info}>
                <div className={cls.price}>{price} ₽</div>
                <div className={cls.title}>{title}</div>
            </div>



            <div className={cls.hiddenContent}>

                {details && (
                    <div className={cls.productDetails}>
                        {details}
                    </div>
                )}
                <div className={cls.quantityControl}>
                    <QuantityControlOld />
                </div>

                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    className={cls.addToCartBtn}
                >
                    В корзину
                </Button>
            </div>
        </div>
    );
});