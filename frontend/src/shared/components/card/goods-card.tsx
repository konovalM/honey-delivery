import { ShoppingCartOutlined } from '@ant-design/icons';
import { QuantityControlOld } from '@components/quantity-control/quantity-control-old';
import HeartIcon from '@icons/heart.svg?react';
import HeartFillIcon from '@icons/heart-fill.svg?react';
import HoneyImg from '@shared/assets/honey.png';
import { Button } from 'antd';
import { memo, useState } from 'react';
import cls from './goods-card.module.scss';

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
  onToggleFavorite?: () => void;
  onAddToCart?: (quantity: number) => void;
}

export const GoodsCard = memo<Props>(({
  title = 'Мёд цветочный 1кг',
  price = 1600,
  crossedPrice,
  isFavorite = false,
  details = 'Этот мед идеален против простуды!',
  onToggleFavorite,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);


  return (
    <div
      className={cls.card}
    >
      <div className={cls.view}>
        <img src={HoneyImg} alt="goods card" />
        <Button
          icon={isFavorite ? <HeartFillIcon /> : <HeartIcon />}
          type="text"
          className={isFavorite ? `${cls.favorite} ${cls.likeBtn}` : cls.likeBtn}
          onClick={onToggleFavorite}
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
          <QuantityControlOld value={quantity} onChange={setQuantity}/>
        </div>

        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          className={cls.addToCartBtn}
          onClick={() => {onAddToCart?.(quantity);console.log;}}
        >
          В корзину
        </Button>
      </div>
    </div>
  );
});
