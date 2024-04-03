class DateFormatterUtil {
    getRusDate(date: Date): string {
        let formatter = new Intl.DateTimeFormat("ru", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        return formatter.format(date);
    }
}

export const dateFormatterUtil = new DateFormatterUtil();