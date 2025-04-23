import { FC, useState } from "react";
import cls from './quantity-control-old.module.scss';

interface Props {
    defaultValue?: number;
    value: number;
    onChange?: (value: number) => void
}

export const QuantityControlOld: FC<Props> = ({ defaultValue = 1, value = defaultValue, onChange }) => {


    return (
        <div className={cls.quantityControl}>
            <button
                className={cls.quantityControlButton}
                onClick={() => onChange?.(value - 1)}
                disabled={value <= 1}
            >
                -
            </button>

            <span className={cls.quantityControlValue}>
                {value}
            </span>

            <button
                className={cls.quantityControlButton}
                onClick={() => onChange?.(value + 1)}
            >
                +
            </button>
        </div>
    )
};