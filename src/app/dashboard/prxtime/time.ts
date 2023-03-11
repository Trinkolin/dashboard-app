export class Time {

  hours: number;
  minutes: number;

  constructor(hours: number, minutes: number) {
    this.hours = hours;
    this.minutes = minutes;
  }

  static create(minutes: number): Time {
    return {
      hours: Math.floor(minutes / 60),
      minutes: minutes % 60
    };
  }

  static add(value: Time | string, value2: Time | string): Time {
    let wt1 = (typeof value === 'string') ? Time.toTime(value) : value;
    let wt2 = (typeof value2 === 'string') ? Time.toTime(value2) : value2;

    const wt1min = Time.getInMinutes(wt1.hours, wt1.minutes);
    const wt2min = Time.getInMinutes(wt2.hours, wt2.minutes);

    return Time.create(wt1min + wt2min);
  }

  static substractWithDefault(value: Time | string): Time {
    const wt1 = (typeof value === 'string') ? Time.toTime(value) : value;
    const wt2 = Time.toTime("07:36");

    const wt1min = Time.getInMinutes(wt1.hours, wt1.minutes);
    const wt2min = Time.getInMinutes(wt2.hours, wt2.minutes);

    return Time.create(Time.adjustTime(wt1min, wt2min))
  }

  static substract(value: Time | string, value2: Time | string): Time {
    let wt1 = (typeof value === 'string') ? Time.toTime(value) : value;
    let wt2 = (typeof value2 === 'string') ? Time.toTime(value2) : value2;

    const wt1min = Time.getInMinutes(wt1.hours, wt1.minutes);
    const wt2min = Time.getInMinutes(wt2.hours, wt2.minutes);

    return Time.create(Time.adjustTime(wt1min, wt2min))
  }

  static adjustTime(wt1min: number, wt2min: number) {
    let res: number;
    if (wt2min > wt1min) {
      res = wt2min - wt1min;
    } else {
      res = wt1min - wt2min;
    }

    return res;
  }

  static getInMinutes(hours: number, minutes: number) {
    return hours * 60 + minutes
  }

  static toString(mssal: Time): string {
    if (mssal != null && mssal.hours >= 0 && mssal.minutes >= 0) {
      let formattedHours = mssal.hours < 10 ? `0${mssal.hours}` : `${mssal.hours}`
      let formattedMinutes = mssal.minutes < 10 ? `0${mssal.minutes}` : `${mssal.minutes}`
      return `${formattedHours}:${formattedMinutes}`
    }

    return '00:00'
  }

  static toTime(time: any): Time {
    if (time != null && time != '') {
      let parts = time.split(":")
      if (parts.length >= 2) {
        return {
          hours: Number(parts[0]),
          minutes: Number(parts[1])
        }
      }
    }

    return {
      hours: 0,
      minutes: 0
    }
  }

}
