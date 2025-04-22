import React from 'react';
import { Card, Divider, Image, Space, Typography } from 'antd';
// import paymentCash from './images/payment-cash.jpg'; // Замените на свои изображения
// import paymentCard from './images/payment-card.jpg';
// import paymentOnline from './images/payment-online.jpg';
import cls from './payment.module.scss';

const { Title, Paragraph, Text } = Typography;

export const Payment = () => {
    const paymentMethods = [
        {
            id: 1,
            title: "Онлайн-оплата",
            image: 'https://img.freepik.com/premium-vector/online-payment-concept_118813-2685.jpg',
            description: "Безопасная оплата банковской картой через платежный шлюз Сбербанка",
            advantages: [
                "Мгновенное подтверждение оплаты",
                "Защита данных по стандарту PCI DSS",
                "Возможность оплаты картами Visa, Mastercard, МИР"
            ],
            note: "После подтверждения заказа вы будете перенаправлены на страницу оплаты"
        },
        {
            id: 2,
            title: "Оплата курьеру",
            image: 'https://img.freepik.com/premium-vector/cash-payment-concepts-style-illustration-eps-10-file_357500-4162.jpg',
            description: "Наличными или картой при получении заказа",
            advantages: [
                "Бесплатная доставка при заказе от 3000 ₽",
                "Возможность проверить товар перед оплатой",
                "Курьер имеет POS-терминал для оплаты картой"
            ],
            note: "Принимаем наличные и бесконтактные платежи по терминалу"
        },
        {
            id: 3,
            title: "Оплата в пункте выдачи",
            image: 'https://static.vecteezy.com/system/resources/previews/000/684/243/non_2x/online-payment.jpg',
            description: "В наших фирменных пунктах выдачи заказов",
            advantages: [
                "Более 10 ПВЗ в Краснодаре и СПБ",
                "Возможность примерки и проверки",
                "Оплата картой или наличными"
            ],
            note: "Адреса и график работы можно уточнить при оформлении заказа"
        }
    ];

    return (
        <div className={cls.container}>
            <Title level={1} className={cls.mainTitle}>Способы оплаты</Title>
            <Paragraph className={cls.introText}>
                Мы предлагаем удобные и безопасные способы оплаты для наших клиентов.
                Выберите наиболее подходящий вариант при оформлении заказа.
            </Paragraph>

            <Divider orientation="left" className={cls.divider}>
                <Text strong>Доступные методы</Text>
            </Divider>

            <div className={cls.paymentMethods}>
                {paymentMethods.map(method => (
                    <Card
                        key={method.id}
                        className={cls.paymentCard}
                        cover={
                            <div className={cls.imageContainer}>
                                <Image
                                    src={method.image}
                                    alt={method.title}
                                    preview={false}
                                    className={cls.paymentImage}
                                />
                            </div>
                        }
                    >
                        <Title level={3} className={cls.cardTitle}>{method.title}</Title>
                        <Paragraph>{method.description}</Paragraph>

                        <Divider dashed className={cls.advantagesDivider} />

                        <Space direction="vertical" size="small" className={cls.advantagesList}>
                            {method.advantages.map((item, index) => (
                                <Text key={index} className={cls.advantageItem}>
                                    ✓ {item}
                                </Text>
                            ))}
                        </Space>

                        <Divider dashed className={cls.noteDivider} />

                        <Text type="secondary" className={cls.noteText}>
                            {method.note}
                        </Text>
                    </Card>
                ))}
            </div>

            <div className={cls.securityInfo}>
                <Title level={4} className={cls.securityTitle}>Безопасность платежей</Title>
                <Paragraph>
                    Все платежи защищены современными технологиями шифрования.
                    Мы не храним данные вашей банковской карты на своих серверах.
                </Paragraph>
            </div>
        </div>
    );
};