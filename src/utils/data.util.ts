export enum monthsEnum {
    'Not valid ❌' = 0,
    'Early January ❄' = 1,
    'Late January ❄' = 2,
    'Early February ❄' = 3,
    'Late February ❄' = 4,
    'Early March 🍃' = 5,
    'Late March 🍃' = 6,
    'Early April 🍃' = 7,
    'Late April 🍃' = 8,
    'Early May 🍃' = 9,
    'Late May 🍃' = 10,
    'Early June 🌞' = 11,
    'Late June 🌞' = 12,
    'Early July 🌞' = 13,
    'Late July 🌞' = 14,
    'Early August 🌞' = 15,
    'Late August 🌞' = 16,
    'Early September 🍂' = 17,
    'Late September 🍂' = 18,
    'Early October 🍂' = 19,
    'Late October 🍂' = 20,
    'Early November 🍂' = 21,
    'Late November 🍂' = 22,
    'Early December ❄' = 23,
    'Late December ❄' = 24,
}
export const MonthConverter = (month: number): string => {
    let keys = Object.keys(monthsEnum).filter((x: any) => monthsEnum[x] == ''+month)[0];
    return keys || ''+monthsEnum[0];
}

export const monthEnumList = () => {
    return Object.keys(monthsEnum).filter(key => isNaN(Number(key)));
}
