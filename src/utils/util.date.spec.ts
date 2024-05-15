import DateUtil from 'src/utils/util.date';

describe('DateUtil', () => {
    describe('isDefaultFormat', () => {
        it('should return true for valid default format', () => {
            const validDateTimeStr = '05/15/2024 12:30:45';
            expect(DateUtil.isDefaultFormat(validDateTimeStr)).toBe(true);
        });

        it('should return false for invalid default format', () => {
            const invalidDateTimeStr = '2024-05-15T12:30:45Z';
            expect(DateUtil.isDefaultFormat(invalidDateTimeStr)).toBe(false);
        });
    });

    describe('ISOtoDefaultFormat', () => {
        it('should convert ISO string to default format', () => {
            const isoStr = '2024-05-15T12:30:45Z';
            const expectedDefaultFormat = '05/15/2024 12:30:45';
            expect(DateUtil.ISOtoDefaultFormat(isoStr)).toBe(expectedDefaultFormat);
        });
    });

    describe('defaultFormatToISO', () => {
        it('should convert default format to ISO date', () => {
            const defaultFormat = '05/15/2024 12:30:45';
            const expectedIsoDate = new Date('2024-05-15T12:30:45Z');
            expect(DateUtil.defaultFormatToISO(defaultFormat)).toEqual(expectedIsoDate);
        });
    });


    describe('isSameOrAfter', () => {
        it('should return true if dateA is same as dateB', () => {
            const dateA = new Date('2024-05-15T12:30:45Z');
            const dateB = new Date('2024-05-15T12:30:45Z');
            expect(DateUtil.isSameOrAfter(dateA, dateB)).toBe(true);
        });

        it('should return true if dateA is after dateB', () => {
            const dateA = new Date('2024-05-16T12:30:45Z');
            const dateB = new Date('2024-05-15T12:30:45Z');
            expect(DateUtil.isSameOrAfter(dateA, dateB)).toBe(true);
        });

        it('should return false if dateA is before dateB', () => {
            const dateA = new Date('2024-05-14T12:30:45Z');
            const dateB = new Date('2024-05-15T12:30:45Z');
            expect(DateUtil.isSameOrAfter(dateA, dateB)).toBe(false);
        });


        it('should return false if dateA is null and dateB is not null', () => {
            const dateB = new Date('2024-05-15T12:30:45Z');
            expect(DateUtil.isSameOrAfter(null, dateB)).toBe(false);
        });

       
    });

    describe('timeDifferenceInMs', () => {
        it('should return positive difference if dateA is after dateB', () => {
            const dateA = new Date('2024-05-16T12:30:45Z');
            const dateB = new Date('2024-05-15T12:30:45Z');
            expect(DateUtil.timeDifferenceInMs(dateA, dateB)).toBeGreaterThan(0);
        });

        it('should return negative difference if dateA is before dateB', () => {
            const dateA = new Date('2024-05-14T12:30:45Z');
            const dateB = new Date('2024-05-15T12:30:45Z');
            expect(DateUtil.timeDifferenceInMs(dateA, dateB)).toBeLessThan(0);
        });

        it('should return zero difference if dateA is equal to dateB', () => {
            const dateA = new Date('2024-05-15T12:30:45Z');
            const dateB = new Date('2024-05-15T12:30:45Z');
            expect(DateUtil.timeDifferenceInMs(dateA, dateB)).toBe(0);
        });
    });

    describe('futureDateByHours', () => {
        it('should return a future date', () => {
            const hours = 1;
            const futureDate = DateUtil.futureDateByHours(hours);
            const expectedDate = new Date();
            expectedDate.setHours(expectedDate.getHours() + hours);
            const futureDateEpoch = futureDate.getTime();
            const expectedDateEpoch = expectedDate.getTime();
            const differenceInMs = Math.abs(futureDateEpoch - expectedDateEpoch);
            expect(differenceInMs).toBeLessThanOrEqual(5);
        });
    });
    

    describe('getFefaultFormatRegex', () => {
        it('should return the default format regex', () => {
            const defaultFormatRegex = DateUtil.getFefaultFormatRegex();
            const expectedRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4} (?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/;
            expect(defaultFormatRegex).toEqual(expectedRegex);
        });
    });
});



