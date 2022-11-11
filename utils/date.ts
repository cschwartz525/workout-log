export const getMondayOfCurrentWeek = (): Date => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const monday = new Date(today.setDate(first));
    return monday;
};

export const getMondayOfNextWeek = (): Date => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 8;
    const monday = new Date(today.setDate(first));
    return monday;
};

export const getTenYearsAgo = (): Date => {
    const today = new Date();
    const tenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 10));
    return tenYearsAgo;
};