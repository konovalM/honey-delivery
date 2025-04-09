import { FC, useState } from "react";
import cls from './quantity-control-old.module.scss';

interface Props {
    defaultValue?: number;
}

export const QuantityControlOld: FC<Props> = ({ defaultValue = 1 }) => {
    const [quantity, setQuantity] = useState(defaultValue);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

    return (
        <div className={cls.quantityControl}>
            <button
                className={cls.quantityControlButton}
                onClick={handleDecrement}
                disabled={quantity <= 1}
            >
                -
            </button>

            <span className={cls.quantityControlValue}>
                {quantity}
            </span>

            <button
                className={cls.quantityControlButton}
                onClick={handleIncrement}
            >
                +
            </button>
        </div>
    )
};