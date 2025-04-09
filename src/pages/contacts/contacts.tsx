import React from 'react';
import { Typography, Divider } from 'antd';
import {
    InstagramFilled,
    PhoneFilled,
    MessageFilled,
    MailFilled,
    WhatsAppOutlined,
    TeamOutlined
} from '@ant-design/icons';
import TelegramIcon from '@icons/telegram.svg?react';
import cls from './contacts.module.scss';

const { Title, Paragraph, Text } = Typography;

export const Contacts = () => {
    const contactMethods = [
        {
            id: 1,
            title: "Социальные сети",
            items: [
                {
                    icon: <InstagramFilled className={cls.instaIcon} />,
                    label: "Instagram",
                    value: "@konovalenko_med_p4ela",
                    link: "https://instagram.com/medovaya_semya",
                    color: "#E1306C"
                },
                {
                    icon: <TelegramIcon className={cls.tgIcon} />,
                    label: "Telegram",
                    value: "@konovalenko_med_p4ela",
                    link: "https://t.me/medovaya_semya",
                    color: "#2AABEE"
                }
            ]
        },
        {
            id: 2,
            title: "Мессенджеры",
            items: [
                {
                    icon: <WhatsAppOutlined className={cls.waIcon} />,
                    label: "WhatsApp",
                    value: "+7 (999) 999-99-99",
                    link: "https://wa.me/79999999999",
                    color: "#25D366"
                },
                {
                    icon: <MessageFilled className={cls.smsIcon} />,
                    label: "SMS/Звонки",
                    value: "+7 (999) 999-99-99",
                    link: "tel:+79999999999",
                    color: "#1890FF"
                }
            ]
        },
        {
            id: 3,
            title: "Другие контакты",
            items: [
                {
                    icon: <MailFilled className={cls.mailIcon} />,
                    label: "Email",
                    value: "med-p4ela@mail.ru",
                    link: "mailto:med@semya.ru",
                    color: "#FF4D4F"
                },
                {
                    icon: <PhoneFilled className={cls.phoneIcon} />,
                    label: "Телефон",
                    value: "+7 (999) 999-99-99",
                    link: "tel:+79999999999",
                    color: "#722ED1"
                }
            ]
        }
    ];

    return (
        <div className={cls.container}>
            <div className={cls.header}>
                <Title level={1} className={cls.mainTitle}>Свяжитесь с нами</Title>
                <Paragraph className={cls.subtitle}>
                    Мы всегда на связи и готовы ответить на ваши вопросы
                </Paragraph>
            </div>

            <div className={cls.contactGrid}>
                {contactMethods.map(group => (
                    <div key={group.id} className={cls.contactGroup}>
                        <Text strong className={cls.groupTitle}>{group.title}</Text>
                        <div className={cls.groupItems}>
                            {group.items.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cls.contactCard}
                                    style={{ '--accent-color': item.color } as React.CSSProperties}
                                >
                                    <div className={cls.cardIcon}>{item.icon}</div>
                                    <div className={cls.cardContent}>
                                        <Text className={cls.cardLabel}>{item.label}</Text>
                                        <Text strong className={cls.cardValue}>{item.value}</Text>
                                    </div>
                                    <div className={cls.cardHoverEffect} />
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Divider className={cls.divider} />

            <div className={cls.infoBlock}>
                <Title level={4} className={cls.infoTitle}>График работы</Title>
                <div className={cls.schedule}>
                    <div className={cls.scheduleItem}>
                        <Text strong>Суббота - Воскресенье:</Text> 7:00 - 15:30
                    </div>
                </div>
                <Paragraph className={cls.location}>
                    <Text strong>Адрес:</Text> Краснодар, Цветочный рынок
                </Paragraph>
            </div>
        </div>
    );
};