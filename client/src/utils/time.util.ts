import { Time } from '@/interfaces/schedule/time';

class TimeUtil {
  getTime(timeStr: string): Time | null {
    if (!timeStr.match(/\d\d:\d\d/)) {
      return null;
    }

    const timeArr = timeStr.split(':').map((numStr) => Number(numStr));

    return {
      hours: timeArr[0],
      minutes: timeArr[1],
    };
  }

  toTimeStr(date: Date): string {
    const formatter = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
    });

    return formatter.format(date);
  }
}

export const timeUtil = new TimeUtil();
