import React, { CSSProperties, FC } from 'react';
import cls from './block-with-title.module.scss';

interface Props {
    title: string;
    fontSize?: string;
    marginBottom?: string;
    children?: React.ReactNode;
    textAlign?: CSSProperties['textAlign'];
}

export const BlockWithTitle: FC<Props> = ({
    title,
    children,
    fontSize = '36px',
    marginBottom = '20px',
    textAlign = 'center',
}) => {
    return (
        <section>
            {title && <h3 style={{ fontSize, marginBottom, textAlign }}>{title}</h3>}
            {children}
        </section>
    );
};
