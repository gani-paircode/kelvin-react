const get = (key, defaultValue, isParsingRequired = true) => {
    try {
        const storedValue = localStorage.getItem(key);
        let parsedValue = defaultValue;
        if (isParsingRequired) {
            parsedValue = JSON.parse(storedValue) || defaultValue;
        }
        return parsedValue;
    } catch (error) {
        return defaultValue;
    }
}

const set = (key, value, isStringifiedRequired = true) => {
    if (isStringifiedRequired) {
        localStorage.setItem(key, JSON.stringify(value));
        return;
    }
    localStorage.setItem(key, value);
}

export const localStorageUtil = Object.freeze({
    get, set
});