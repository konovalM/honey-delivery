import { CloseOutlined } from '@ant-design/icons';
import { QuantityControl } from '@components/quantity-control/quantity-control';
import { CartItem } from '@entities/cart/model';
import honeyImg from '@shared/assets/honey.png';
import { Checkbox, Image, Typography } from 'antd';
import cls from './product-tile.module.scss';

const { Text, Paragraph } = Typography;



interface Props {
    cartItem: CartItem;
    onQuantityChange: (id: number, value: number) => void;
    onToggleSelect: (id: number, selected: boolean) => void;
    onRemove: (id: number) => void;
    selected: boolean;
}

export const ProductTile: React.FC<Props> = ({
    cartItem,
    onQuantityChange,
    onToggleSelect,
    onRemove,
    selected
}) => {

    const product = {...cartItem.product, quantity: cartItem.quantity};
    return (
        <div className={cls.productTile}>
            <div className={cls.tileContent}>
                <Checkbox
                    checked={selected}
                    onChange={(e) => onToggleSelect(cartItem.id, e.target.checked)}
                    className={cls.checkbox}
                />

                <Image
                    src={honeyImg}
                    alt={product.title}
                    width={120}
                    height={120}
                    className={cls.productImage}
                    preview={false}
                />

                <div className={cls.productInfo}>
                    <Text strong className={cls.productName}>{product.title}</Text>
                    <Paragraph type="secondary" className={cls.productDescription}>
                        {product.description}
                    </Paragraph>
                    <Text strong className={cls.productPrice}>
                        {product.price.toLocaleString('ru-RU')} ₽
                    </Text>
                </div>

                <div className={cls.quantityControl}>
                    <QuantityControl
                        value={product.quantity}
                        onChange={(value) => onQuantityChange(product.id, value)}
                    />
                </div>

                <button
                    data-testid="delete-button"
                    className={cls.removeButton}
                    onClick={() => onRemove(product.id)}
                >
                    <CloseOutlined />
                </button>
            </div>
        </div>
    );
};