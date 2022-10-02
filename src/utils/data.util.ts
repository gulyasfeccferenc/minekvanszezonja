enum monthsEnum {
    'Not valid ❌' = 0,
    'January ❄' = 1,
    'February ❄' = 2,
    'March 🍃' = 3,
    'April 🍃' = 4,
    'May 🍃' = 5,
    'June 🌞' = 6,
    'July 🌞' = 7,
    'August 🌞' = 8,
    'September 🍂' = 9,
    'October 🍂' = 10,
    'November 🍂' = 11,
    'December ❄' = 12,
}
export const MonthConverter = (month: number): string => {
    let keys = Object.keys(monthsEnum).filter((x: any) => monthsEnum[x] == ''+month)[0];
    return keys || ''+monthsEnum[0];
}
