interface Constants {
    MS_IN_DAY: number;
    DAYS_OF_WEEK: string[];
    MONTHS: string[];
    LOCAL_STORAGE: string;
}

export const CONSTANTS: Constants = {
    MS_IN_DAY: 24 * 60 * 60 * 1000,
    DAYS_OF_WEEK: [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресение',
    ],
    MONTHS: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    LOCAL_STORAGE: 'calendar-events',
};
