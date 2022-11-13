const getToday = (): Date => {
    const today = new Date();
    today.setUTCHours(0, 0, 0);

    return today;
}

export const getStartOfCurrentWeek = (): Date => {
    const today = getToday();

    const monday = new Date();

    // Set date to Monday of the current week
    monday.setDate(today.getDate() - today.getDay() + 1)
    // Set time to beginning of day
    monday.setUTCHours(0, 0, 0);

    return monday;
};

export const getEndOfCurrentWeek = (): Date => {
    const today = getToday();
    
    const monday = new Date();

    // Set date to Monday of the following week
    monday.setDate(today.getDate() - today.getDay() + 7)
    // Set time to beginning of day
    monday.setUTCHours(0, 0, 0);

    return monday;
};

export const getEndOfPreviousWeek = (): Date => {
    const mondayOfCurrentWeek = getStartOfCurrentWeek();

    return new Date(mondayOfCurrentWeek.setDate(mondayOfCurrentWeek.getDate() - 1));
};

export const getTenYearsAgo = (): Date => {
    const today = getToday();

    // Set year to 10 years ago
    const tenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 10));
    // Set time to beginning of day
    tenYearsAgo.setUTCHours(0, 0, 0);

    return tenYearsAgo;
};

/**
 * Checks if a given date falls in a given date range exclsuive of time of day
 *
 * @param date The input date
 * @param startDate The start of the date range
 * @param endDate The end of the date range
 * @returns True if the input date falls between the start date and the end date inclusive
 */
export const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
    if (
        date.getFullYear() < startDate.getFullYear() ||
        date.getFullYear() > endDate.getFullYear() ||
        (date.getFullYear() === startDate.getFullYear() && date.getMonth() < startDate.getMonth()) ||
        (date.getFullYear() === endDate.getFullYear() && date.getMonth() > endDate.getMonth()) ||
        (date.getFullYear() === startDate.getFullYear() && date.getMonth() === startDate.getMonth() && date.getDate() < startDate.getDate()) ||
        (date.getFullYear() === endDate.getFullYear() && date.getMonth() === endDate.getMonth() && date.getDate() > endDate.getDate())
    ) {
        return false;
    }

    return true;
}