import { BadRequestException } from '@nestjs/common';
import { Time } from './types/time';

class TimeUtil {
  getTime(timeStr: string): Time {
    if (!timeStr.match(/\d\d:\d\d:\d\d/)) {
      throw new BadRequestException('invalid time string format');
    }

    const timeArr = timeStr.split(':').map((numStr) => Number(numStr));

    return {
      hours: timeArr[0],
      minutes: timeArr[1],
      seconds: timeArr[2],
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
