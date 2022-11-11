/**
 * Takes a date and returns a mm/dd/yy formatted string
 * 
 * @param {Date} date date object
 * @returns {String} date string formatted as mm/dd/yy
 */
export const formatDate = (date: Date): string => {
    if (!date) {
        return '';
    }

    date = new Date(date);

    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let dayString = `${day}`;
    let monthString = `${month}`;
    let yearString = year.toString().slice(-2);

    if (day < 10) {
        dayString = `0${dayString}`;
    }

    if (month < 10) {
        monthString = `0${monthString}`;
    }

    return `${monthString}/${dayString}/${yearString}`;
};

/**
 * Takes a number of minutes and returns a formatted string (i.e. x hrs y min)
 * 
 * @param {Number} minutes number of minutes
 * @returns {String} time formatted as a string (number of hours and minutes)
 */
export const formatTime = (minutes: number): string => {
    if (typeof minutes !== 'number') {
        return '';
    }

    let val = '';

    if (minutes >= 60) {
        const numHours = Math.floor(minutes / 60);

        if (numHours > 1) {
            val += `${numHours} hrs`;
        } else {
            val += `${numHours} hr`;
        }
        
        minutes = minutes % 60;
    }

    if (minutes > 0 && minutes < 60) {
        if (val) {
            val += ' ';
        }

        val += `${minutes} min`;
    }

    return val;
}