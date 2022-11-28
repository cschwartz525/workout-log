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

    return date.toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
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