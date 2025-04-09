import { CloseOutlined } from '@ant-design/icons';
import { Checkbox, Image, Typography } from 'antd';
import cls from './product-tile.module.scss';
import { QuantityControl } from '@components/quantity-control/quantity-control';

const { Text, Paragraph } = Typography;

interface Product {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

interface Props {
    product: Product;
    onQuantityChange: (id: string, value: number) => void;
    onToggleSelect: (id: string, selected: boolean) => void;
    onRemove: (id: string) => void;
    selected: boolean;
}

export const ProductTile: React.FC<Props> = ({
    product,
    onQuantityChange,
    onToggleSelect,
    onRemove,
    selected
}) => {
    return (
        <div className={cls.productTile}>
            <div className={cls.tileContent}>
                <Checkbox
                    checked={selected}
                    onChange={(e) => onToggleSelect(product.id, e.target.checked)}
                    className={cls.checkbox}
                />

                <Image
                    src={product.image}
                    alt={product.name}
                    width={120}
                    height={120}
                    className={cls.productImage}
                    preview={false}
                />

                <div className={cls.productInfo}>
                    <Text strong className={cls.productName}>{product.name}</Text>
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
                    className={cls.removeButton}
                    onClick={() => onRemove(product.id)}
                >
                    <CloseOutlined />
                </button>
            </div>
        </div>
    );
};