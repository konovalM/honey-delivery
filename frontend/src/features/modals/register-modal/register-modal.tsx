import { Modal, Form, Input, Button, Row, Col, Checkbox } from 'antd';
import React, { FC } from 'react';

interface Props {
    open?: boolean;
    onCancel?: () => void;
    onRegister?: (values: {
        firstName: string;
        lastName: string;
        middleName?: string;
        phone: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => void;
}

export const RegisterModal: FC<Props> = ({ open, onCancel, onRegister }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            if (values.password !== values.confirmPassword) {
                form.setFields([
                    {
                        name: 'confirmPassword',
                        errors: ['Пароли не совпадают'],
                    },
                ]);
                return;
            }
            onRegister?.(values);
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title="Регистрация"
            footer={null}
            centered
            width={800} // large modal
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="firstName"
                            label="Имя"
                            rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
                        >
                            <Input size="large" placeholder="Введите имя" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="lastName"
                            label="Фамилия"
                            rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
                        >
                            <Input size="large" placeholder="Введите фамилию" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="middleName" label="Отчество">
                            <Input size="large" placeholder="Введите отчество (необязательно)" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="phone"
                            label="Номер телефона"
                            rules={[{ required: true, message: 'Пожалуйста, введите номер телефона' }]}
                        >
                            <Input size="large" placeholder="+7 (___) ___-__-__" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Пожалуйста, введите email' },
                                { type: 'email', message: 'Введите корректный email' },
                            ]}
                        >
                            <Input size="large" placeholder="example@mail.com" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label="Пароль"
                            rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
                        >
                            <Input.Password size="large" placeholder="Введите пароль" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="confirmPassword"
                            label="Повторите пароль"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Пожалуйста, повторите пароль' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Пароли не совпадают'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size="large" placeholder="Повторите пароль" />
                        </Form.Item>
                    </Col>

                </Row>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error('Необходимо принять соглашение')),
                        },
                    ]}
                >
                    <Checkbox>
                        <span style={{ fontSize: '14px' }}>
                            Я согласен на обработку моих персональных данных в соответствии с{' '}
                            <a href="/privacy-policy" target="_blank" style={{ fontSize: '14px' }}>
                                политикой конфиденциальности
                            </a>
                        </span>
                    </Checkbox>
                </Form.Item>

                <Form.Item style={{ marginTop: '32px' }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                    // block
                    >
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
