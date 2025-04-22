import { FC } from "react";
import { Button } from 'antd';
import cls from './quantity-control.module.scss';

interface Props {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    className?: string;
}

export const QuantityControl: FC<Props> = ({
    value,
    onChange,
    min = 1,
    max = 100,
    className = ''
}) => {
    const handleIncrement = () => {
        const newValue = Math.min(max, value + 1);
        onChange(newValue);
    };

    const handleDecrement = () => {
        const newValue = Math.max(min, value - 1);
        onChange(newValue);
    };

    return (
        <div className={`${cls.quantityControl} ${className}`}>
            <Button
                className={cls.quantityControlButton}
                onClick={handleDecrement}
                disabled={value <= min}
            >
                -
            </Button>

            <span className={cls.quantityControlValue}>
                {value}
            </span>

            <Button
                className={cls.quantityControlButton}
                onClick={handleIncrement}
                disabled={value >= max}
            >
                +
            </Button>
        </div>
    );
};