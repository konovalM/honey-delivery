import { useEffect } from 'react';
import cls from './about.module.scss';
import img from './image.png';

export const About = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = `https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A16355b8d192136e41260cf36741bf62dbc96bfaec16ba45ee6d82ce62623d0ef&width=100%&height=100%&lang=ru_RU&scroll=true`;

    const mapContainer = document.getElementById('yandex-map-container');
    if (mapContainer) {
      mapContainer.appendChild(script);
    }

    return () => {
      if (mapContainer && mapContainer.contains(script)) {
        mapContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={cls.container}>
      <h1 className={cls.title}>О нашей пасеке</h1>

      <div className={cls.columnsWrapper}>
        <div className={cls.textColumn}>
          <h2 className={cls.subtitle}>Семейная пасека из Краснодара</h2>
          <p className={cls.paragraph}>
            Наша семья занимается пчеловодством уже более 16 лет.
            Что началось как небольшое хобби, превратилось в настоящее
            семейное дело, которому мы посвящаем все свое время и силы.
          </p>
          <p className={cls.paragraph}>
            Сегодня наша кочевая пасека насчитывает более 100 пчелиных семей,
            которые мы перевозим по экологически чистым районам Краснодарского края и всей России.
            Это позволяет нашим пчелам собирать нектар с самых разных культур растений.
          </p>
          <img src={img} className={cls.image} alt="beefarm" style={{ maxWidth: '300px' }} />
          <p className={cls.paragraph}>
            Мы гордимся тем, что сохраняем традиции натурального пчеловодства,
            не используем химикаты и антибиотики. Наш мед - это 100% натуральный
            продукт, который мы с любовью собираем для вас.
          </p>
          {/* <div className={cls.highlight}>
            <p>Попробуйте настоящий мед от семьи профессиональных пчеловодов!</p>
          </div> */}
        </div>

        <div className={cls.mapColumn}>
          <div className={cls.mapWrapper}>
            <div id="yandex-map-container" className={cls.map} />
          </div>
          <p className={cls.mapCaption}>
            Наша пасека путешествует по всему Краснодарскому краю
          </p>
        </div>
      </div>
    </div>
  );
};