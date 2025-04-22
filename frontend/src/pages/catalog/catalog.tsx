import React from 'react';
import cls from './catalog.module.scss';
import { Checkbox, Radio, Tag } from 'antd';
import { GoodsCard } from '@components/card/goods-card';

interface Props { }

const availabilityOptions = [
    {
        value: 'all',
        label: 'Неважно',
    },
    {
        value: 'available',
        label: 'В наличии',
    },
    {
        value: 'not_available',
        label: 'Нет в наличии',
    }
]

const discountOptions = [
    'Акция',
    '2 по цене 1',
]

const plainOptions = ['Мед', "Продукты пчеловодства"];

const honeyTypes = [
    'Акациевый',
    'Гречишный',
    'Липовый',
    'Цветочный',
    'Майский',
    'Подсолнечный',
    'Донниковый',
    'Каштановый',
    'Клеверный',
    'Луговой',
];
export const Catalog = () => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>(['Movies']);
    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };
    return (
        <div>
            <div className={cls.wrapper}>
                <h1>Каталог продуктов</h1>
                <div className={cls.tags}>
                    {honeyTypes.map<React.ReactNode>((tag) => (
                        <Tag.CheckableTag
                            key={tag}
                            checked={selectedTags.includes(tag)}
                            onChange={(checked) => handleChange(tag, checked)}
                        >
                            {tag}
                        </Tag.CheckableTag>
                    ))}
                </div>
                <div className={cls.content}>
                    <aside className={cls.filters}>
                        {/* фильтры и сортировка */}
                        <label htmlFor="availability">
                            <span className={cls.label}>Выгода:</span>
                            <Checkbox.Group options={discountOptions} className={cls.optionsGroup} />
                        </label>
                        <label htmlFor="availability">
                            <span className={cls.label}>Тип товара:</span>
                            <Checkbox.Group options={plainOptions} className={cls.optionsGroup} defaultValue={['Мед']} />
                        </label>
                    </aside>
                    <section className={cls.favoriteGoods}>
                        {/* список товаров */}

                        <div className={cls.list}>
                            {Array(5).fill(<GoodsCard />)}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
