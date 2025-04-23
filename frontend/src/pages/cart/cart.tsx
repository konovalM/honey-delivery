import { CloseOutlined } from '@ant-design/icons';
import { ProductTile } from '@components/product-tile/product-tile';
import { Button, Card, Col, Divider, notification, Row, Typography } from 'antd';
import { useMemo, useState } from 'react';
import cls from './cart.module.scss';
import honeyImg from '@shared/assets/honey.png';
import { useCart, useClearCart, useRemoveFromCart, useUpdateCartQuantity } from '@entities/cart/hooks';

const { Title, Text } = Typography;

interface Product {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export const Cart = () => {
    const { data: cart } = useCart();
    const { mutateAsync: removeFromCart } = useRemoveFromCart();
    const { mutateAsync: clearCart } = useClearCart();
    const { mutateAsync: updateQuantity } = useUpdateCartQuantity();
    const [toast, contextHolder] = notification.useNotification();

    const items = cart?.items || [];

    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const handleQuantityChange = (productId: number, value: number) => {
        updateQuantity({ productId, quantity: value });
      };

    const handleToggleSelect = (id: number, selected: boolean) => {
        setSelectedProducts(selected
            ? [...selectedProducts, id]
            : selectedProducts.filter(pId => pId !== id)
        );
    };

    const handleRemoveProduct = (id: string) => {
        // setProducts(products.filter(p => p.id !== id));
        // setSelectedProducts(selectedProducts.filter(pId => pId !== id));
    };

    const handleClearCart = () => {
        clearCart().then(() => {
            toast.success({
                message: 'Корзина очищена',
                placement: 'bottomRight',
            })
        });
        setSelectedProducts([]);
    };

    // Расчет общей стоимости
    const selectedItems = items.filter(cartItem => selectedProducts.includes(cartItem.id));
    const subtotal = selectedItems.reduce((sum, p) => sum + (p.product.price * p.quantity), 0);
    const deliveryCost = cart?.total && cart.total > 3000 ? 0 : 300;
    const total = cart?.total || 0 + deliveryCost;

    return (
        <div className={cls.container}>
            {contextHolder}
            <Title level={1} className={cls.mainTitle}>Корзина</Title>

            <div className={cls.actions}>
                <Button
                    danger
                    onClick={handleClearCart}
                    disabled={items.length === 0}
                >
                    Очистить корзину
                </Button>
            </div>

            <Row className={cls.wrapper} gutter={32}>
                <Col span={18}>
                    <div className={cls.productsList}>
                        {items.length === 0 ? <div style={{fontSize: '20px'}}>Корзина пуста</div> : items.map(cartItem => (
                            <ProductTile
                                key={cartItem.id}
                                cartItem={cartItem}
                                onQuantityChange={handleQuantityChange}
                                onToggleSelect={handleToggleSelect}
                                onRemove={() => removeFromCart(cartItem.product.id)}
                                selected={selectedProducts.includes(cartItem.id)}
                            />
                        ))}
                    </div>
                </Col>

                <Col span={6}>
                    <Card className={cls.summaryCard}>
                        <Title level={4} className={cls.summaryTitle}>Ваш заказ</Title>

                        <div className={cls.summaryRow}>
                            <Text>Товары ({selectedItems.length})</Text>
                            <Text>{subtotal.toLocaleString('ru-RU')} ₽</Text>
                        </div>

                        <div className={cls.summaryRow}>
                            <Text>Доставка</Text>
                            <Text>
                                {deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString('ru-RU')} ₽`}
                            </Text>
                        </div>

                        <Divider className={cls.divider} />

                        <div className={cls.summaryRow}>
                            <Text strong>Итого</Text>
                            <Text strong>{total.toLocaleString('ru-RU')} ₽</Text>
                        </div>

                        <Button
                            type="primary"
                            size="large"
                            block
                            className={cls.checkoutButton}
                            disabled={selectedItems.length === 0}
                        >
                            Оформить заказ
                        </Button>

                        <Text type="secondary" className={cls.deliveryNote}>
                            Бесплатная доставка при заказе от 3 000 ₽
                        </Text>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};