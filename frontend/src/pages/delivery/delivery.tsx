import { Card, Divider, Image, Space, Tag, Typography } from 'antd';
import cls from './delivery.module.scss';

const { Title, Paragraph, Text } = Typography;

export const Delivery = () => {
    const deliveryMethods = [
        {
            id: 1,
            title: "Курьерская доставка",
            image: 'https://static.vecteezy.com/system/resources/thumbnails/004/379/352/small_2x/delivery-van-driver-with-parcels-flat-character-courier-postman-deliveryman-holding-cardboard-boxes-and-order-receipt-isolated-cartoon-illustration-on-white-background-shipping-service-transport-vector.jpg',
            description: "Быстрая доставка по Санкт-Петербургу и Краснодару",
            features: [
                "Доставка на следующий день при заказе до 18:00",
                "Возможность выбрать удобный временной интервал",
                "Оплата при получении (наличными или картой)"
            ],
            conditions: [
                <Text key="city">Доступно только для <Text strong>СПб и Краснодара</Text></Text>,
                "Бесплатно при заказе от 3000 ₽",
                "Стоимость: 300 ₽ (для заказов до 3000 ₽)"
            ],
            note: "Курьер позвонит за 30-60 минут до доставки"
        },
        {
            id: 2,
            title: "СДЭК",
            image: 'https://www.molnet.ru/mos/image?objectId=825319&trim_x=660',
            description: "Надежная доставка по всей России",
            features: [
                "Более 5000 пунктов выдачи по стране",
                "Возможность доставки до двери",
                "Трекинг заказа в мобильном приложении"
            ],
            conditions: [
                "Бесплатно при заказе от 10 кг или стоимости от 10 999 ₽",
                "Стоимость: от 450 ₽ (рассчитывается индивидуально)",
                "Сроки: 2-7 дней в зависимости от региона"
            ],
            note: "Рекомендуем выбирать для крупных заказов"
        },
        {
            id: 3,
            title: "Почта России",
            image: 'https://vlfin.ru/image/720/0?filename=/upload/iblock/495/4952f9d6366634ccb9d02ddb38cacc4d.jpg',
            description: "Доставка в любую точку страны",
            features: [
                "Доступно даже в отдаленные регионы",
                "Отправка день в день при заказе до 14:00",
                "Получение в ближайшем почтовом отделении"
            ],
            conditions: [
                "Бесплатно при заказе от 10 кг или стоимости от 10 999 ₽",
                "Стоимость: от 350 ₽ (по тарифам Почты России)",
                "Сроки: 5-14 дней в зависимости от региона"
            ],
            note: "Отправляем с объявленной ценностью и трек-номером"
        }
    ];

    return (
        <div className={cls.container}>
            <Title level={1} className={cls.mainTitle}>Условия доставки</Title>
            <Paragraph className={cls.introText}>
                Мы предлагаем несколько удобных способов доставки нашего меда.
                Выберите подходящий вариант при оформлении заказа.
            </Paragraph>

            <div className={cls.highlightBanner}>
                <Text strong className={cls.highlightText}>
                    🚚 Бесплатная доставка по СПб и Краснодару при заказе от 3000 ₽ |
                    По России - при заказе от 10 кг или 10 999 ₽
                </Text>
            </div>

            <Divider orientation="left" className={cls.divider}>
                <Text strong>Доступные способы</Text>
            </Divider>

            <div className={cls.deliveryMethods}>
                {deliveryMethods.map(method => (
                    <Card
                        key={method.id}
                        className={cls.deliveryCard}
                        cover={
                            <div className={cls.imageContainer}>
                                <Image
                                    src={method.image}
                                    alt={method.title}
                                    preview={false}
                                    className={cls.deliveryImage}
                                />
                                {method.id === 1 && (
                                    <Tag color="#1890ff" className={cls.cityTag}>
                                        Только СПб и Краснодар
                                    </Tag>
                                )}
                            </div>
                        }
                    >
                        <Title level={3} className={cls.cardTitle}>{method.title}</Title>
                        <Paragraph>{method.description}</Paragraph>

                        <Divider dashed className={cls.featuresDivider} />

                        <Title level={5} className={cls.sectionTitle}>Особенности:</Title>
                        <Space direction="vertical" size="small" className={cls.featuresList}>
                            {method.features.map((item, index) => (
                                <Text key={index} className={cls.featureItem}>
                                    • {item}
                                </Text>
                            ))}
                        </Space>

                        <Divider dashed className={cls.conditionsDivider} />

                        <Title level={5} className={cls.sectionTitle}>Условия:</Title>
                        <Space direction="vertical" size="small" className={cls.conditionsList}>
                            {method.conditions.map((item, index) => (
                                <Text key={index} className={cls.conditionItem}>
                                    📌 {item}
                                </Text>
                            ))}
                        </Space>

                        <Divider dashed className={cls.noteDivider} />

                        <Text type="secondary" className={cls.noteText}>
                            ℹ️ {method.note}
                        </Text>
                    </Card>
                ))}
            </div>

            <div className={cls.additionalInfo}>
                <Title level={4} className={cls.infoTitle}>Дополнительная информация</Title>
                <Paragraph>
                    <Text strong>Упаковка:</Text> Все заказы тщательно упаковываются в специальную
                    термоупаковку для сохранения качества продукта при транспортировке.
                </Paragraph>
                <Paragraph>
                    <Text strong>Сроки хранения:</Text> После отправки вы получите подробную
                    инструкцию по хранению меда. В среднем срок годности - 2 года.
                </Paragraph>
                <Paragraph>
                    <Text strong>Контакты:</Text> По всем вопросам доставки звоните
                    <Text strong> 8 (800) 123-45-67</Text> или пишите на
                    <Text strong> delivery@honeyfamily.ru</Text>
                </Paragraph>
            </div>
        </div>
    );
};