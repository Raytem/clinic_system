class DateFormatterUtil {
    getEngDate(date: Date): string {
        const formatter = new Intl.DateTimeFormat("eng", {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        return formatter.format(date);
    }

    getEngTime(date: Date) {
        const formatter = new Intl.DateTimeFormat('eng', {
            hour: 'numeric',
            minute: 'numeric',
        })

        return formatter.format(date);
    }
}

export const dateFormatterUtil = new DateFormatterUtil();