/*
    *
    * Wijmo Library 5.20143.27
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    * 
    * Licensed under the Wijmo Commercial License. 
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
/*
* Wijmo culture file: ko (Korean)
*/
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            numberFormat: {
                '.': '.',
                ',': ',',
                percent: { pattern: ['-n %', 'n %'] },
                currency: { decimals: 0, symbol: '₩', pattern: ['-$n', '$n'] }
            },
            calendar: {
                '/': '-',
                ':': ':',
                firstDay: 0,
                days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
                daysAbbr: ['일', '월', '화', '수', '목', '금', '토'],
                months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                monthsAbbr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                am: ['오전', '오'],
                pm: ['오후', '오'],
                eras: ['서기'],
                patterns: {
                    d: 'yyyy-MM-dd', D: 'yyyy"년" M"월" d"일" dddd',
                    f: 'yyyy"년" M"월" d"일" dddd tt h:mm', F: 'yyyy"년" M"월" d"일" dddd tt h:mm:ss',
                    t: 'tt h:mm', T: 'tt h:mm:ss',
                    m: 'M"월" d"일"', M: 'M"월" d"일"',
                    y: 'yyyy"년" M"월"', Y: 'yyyy"년" M"월"',
                    g: 'yyyy-MM-dd tt h:mm', G: 'yyyy-MM-dd tt h:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                }
            }
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value} </b>({count} 항목)'
        }
    };
})(wijmo || (wijmo = {}));
;
//# sourceMappingURL=wijmo.culture.ko.js.map

