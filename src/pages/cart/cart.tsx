import { CloseOutlined } from '@ant-design/icons';
import { ProductTile } from '@components/product-tile/product-tile';
import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import { useState } from 'react';
import cls from './cart.module.scss';
import honeyImg from '@shared/assets/honey.png';

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
    // Моковые данные товаров
    const [products, setProducts] = useState<Product[]>([
        {
            id: '1',
            image: honeyImg,
            name: 'Мед гречишный',
            description: 'Натуральный мед с цветущих полей Краснодарского края',
            price: 1500,
            quantity: 1
        },
        {
            id: '2',
            image: honeyImg,
            name: 'Мед липовый',
            description: 'Ароматный мед с липовых рощ, собран в экологически чистом районе',
            price: 1800,
            quantity: 2
        },
        {
            id: '3',
            image: honeyImg,
            name: 'Мед акациевый',
            description: 'Нежный мед с тонким ароматом акации',
            price: 2000,
            quantity: 1
        }
    ]);

    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const handleQuantityChange = (id: string, value: number) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, quantity: value } : p
        ));
    };

    const handleToggleSelect = (id: string, selected: boolean) => {
        setSelectedProducts(selected
            ? [...selectedProducts, id]
            : selectedProducts.filter(pId => pId !== id)
        );
    };

    const handleRemoveProduct = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
        setSelectedProducts(selectedProducts.filter(pId => pId !== id));
    };

    const handleClearCart = () => {
        setProducts([]);
        setSelectedProducts([]);
    };

    // Расчет общей стоимости
    const selectedItems = products.filter(p => selectedProducts.includes(p.id));
    const subtotal = selectedItems.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const deliveryCost = subtotal > 3000 ? 0 : 300;
    const total = subtotal + deliveryCost;

    return (
        <div className={cls.container}>
            <Title level={1} className={cls.mainTitle}>Корзина</Title>

            <div className={cls.actions}>
                <Button
                    danger
                    onClick={handleClearCart}
                    disabled={products.length === 0}
                >
                    Очистить корзину
                </Button>
            </div>

            <Row className={cls.wrapper} gutter={32}>
                <Col span={18}>
                    <div className={cls.productsList}>
                        {products.map(product => (
                            <ProductTile
                                key={product.id}
                                product={product}
                                onQuantityChange={handleQuantityChange}
                                onToggleSelect={handleToggleSelect}
                                onRemove={handleRemoveProduct}
                                selected={selectedProducts.includes(product.id)}
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