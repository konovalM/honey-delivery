import { LoginDto } from '@entities/user/model';
import { Modal, Form, Input, Button, Space } from 'antd';
import React, { FC, useState } from 'react';

interface Props {
    open?: boolean;
    onCancel?: () => void;
    onLogin?: (values: LoginDto) => void;
    onResetPassword?: (email: string) => void;
}

export const LoginModal: FC<Props> = ({ open, onCancel, onLogin, onResetPassword }) => {
    const [form] = Form.useForm();
    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleSubmit = () => {
        if (isLoginMode) {
            form.validateFields(['email', 'password'])
                .then(values => {
                    onLogin?.(values);
                });
        } else {
            form.validateFields(['email'])
                .then(values => {
                    onResetPassword?.(values.email);
                });
        }
    };

    const switchMode = () => {
        form.resetFields();
        setIsLoginMode(!isLoginMode);
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={isLoginMode ? 'Авторизация' : 'Забыли пароль'}
            footer={null}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="email"
                    label="Электронная почта"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите email' },
                        { type: 'email', message: 'Введите корректный email' }
                    ]}
                >
                    <Input size="large" placeholder="example@mail.com" />
                </Form.Item>

                {isLoginMode && (
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
                    >
                        <Input.Password size="large" placeholder="Введите пароль" />
                    </Form.Item>
                )}

                <Form.Item style={{ marginTop: '32px' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                        >
                            {isLoginMode ? 'Войти' : 'Отправить'}
                        </Button>

                        {isLoginMode ? (
                            <Button
                                type="link"
                                onClick={switchMode}
                                style={{ padding: 0 }}
                            >
                                Забыли пароль?
                            </Button>
                        ) : (
                            <Button
                                type="link"
                                onClick={switchMode}
                                style={{ padding: 0 }}
                            >
                                Вернуться к авторизации
                            </Button>
                        )}
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};