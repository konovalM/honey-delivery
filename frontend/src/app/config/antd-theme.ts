import type { ThemeConfig } from 'antd/es/config-provider';
import { colors } from '@shared/const/colors';

export const antdTheme: ThemeConfig = {
    cssVar: true,
    hashed: false,
    token: {
        borderRadius: 8,
        fontSize: 16,
        fontFamily: 'Rubik, sans-serif',
        colorPrimary: colors.brand[500],
    },
    components: {
        Button: {
            // colorPrimary: colors.brand[500],
            // defaultBorderColor: colors.stroke.base,
            // defaultHoverBg: colors.bg.light2,
            // defaultHoverBorderColor: colors.stroke.base,
            // defaultHoverColor: colors.text.base,
            // algorithm: true,
            // primaryShadow: 'none',
            // controlHeight: 40,
            // fontSize: 14,
            // fontWeight: 600,
            // paddingInline: 16,
        },
        Segmented: {
            trackBg: colors.bg.light2,
            itemSelectedColor: colors.text.base,
            itemColor: colors.text.base,
            algorithm: true,
        },
        Radio: {
            // buttonSolidCheckedBg: '#ff0000',
            buttonColor: '#ff0000',
        },
        Typography: {
            colorLink: colors.brand[500],
            colorTextSecondary: colors.text.placeholder,
            colorTextDescription: colors.text.placeholder,
            algorithm: true,
        },
        Input: {
            activeShadow: 'none',
        },
        Skeleton: {
            paragraphLiHeight: 8,
            controlHeightXS: 10,
        },
        Modal: {
            titleFontSize: 24,
            titleLineHeight: '32px',
            titleColor: colors.text.base,
        },
        Tooltip: {
            colorBgSpotlight: colors.black,
            colorText: colors.text.inverse,
            fontSize: 12,
        },
    },
};
