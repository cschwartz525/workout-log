export const normalizeDate = (date: Date | string): Date => {
    let result: Date;

    if (typeof date === 'string') {
        result = new Date(date);
    } else {
        result = date;
    }

    result.setUTCHours(12, 0, 0);

    return result;
};

export const getToday = (): Date => {
    const today = new Date();

    return normalizeDate(today);
}

/**
 * @returns Monday of the current week in UTC
 */
export const getStartOfCurrentWeek = (): Date => {
    const today = getToday();

    const monday = new Date();

    // Set date to Monday of the current week
    monday.setDate(today.getDate() - today.getDay() + 1);

    return normalizeDate(monday);
};

/**
 * @returns Sunday of the current week in UTC
 */
export const getEndOfCurrentWeek = (): Date => {
    const today = getToday();
    
    const monday = new Date();

    // Set date to Sunday of the current week
    monday.setDate(today.getDate() - today.getDay() + 7);

    return normalizeDate(monday);
};

/**
 * @param offset Number of weeks ago
 * @returns Last day of the week (Sunday) given a number of weeks prior
 */
export const getEndOfWeek = (offset: number = 1): Date => {
    const endOfCurrentWeek = getEndOfCurrentWeek();

    return new Date(endOfCurrentWeek.setDate(endOfCurrentWeek.getDate() - 7 * offset));
};

/**
 * @param offset Number of weeks ago
 * @returns First day of the week (Monday) given a number of weeks prior
 */
export const getStartOfWeek = (offset: number = 1): Date => {
    const startOfCurrentWeek = getStartOfCurrentWeek();

    return new Date(startOfCurrentWeek.setDate(startOfCurrentWeek.getDate() - 7 * offset));
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