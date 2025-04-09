import { useCallback, useState } from 'react';

export const useToggle = (defaultValue = false) => {
    const [value, setValue] = useState(defaultValue);

    const toggle = useCallback(() => {
        setValue(!value);
    }, [value]);

    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    return { value, toggle, setTrue, setFalse };
};
