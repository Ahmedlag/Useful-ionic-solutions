import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import distanceInWordsToNow  from 'date-fns/distance_in_words_to_now';

/*
 * There are two different implementation routes.
 * It's up to you which you prefer. "timeAgo" is a custom approach, using momentjs date Objects.
 * "relativeTime" is a date-fns approach, using native Javascript Date objects.
 */

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {

  /*
   * Transforms a moment date object, into a properly formatted time-ago value.
   * e.g: 45 seconds: 45s, 3 days: 3d, 3 weeks: 3w, 1 month: 4w
   */
  transform(date: Moment) {
    return this.timeSince(date);
  }

  public timeSince(date) {
    const second = 1000;
    const minute = 60 * second;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;

    const diff = Math.floor(Date.now() - date);

    if (diff < second) return 'just now';
    if(diff > second && diff < minute) return Math.floor(diff / second) + 's';
    if(diff > minute && diff < hour) return Math.floor(diff / minute) + 'm';
    if (diff > hour && diff < day) return Math.floor(diff / hour) + 'h';
    if (diff > day && diff < week) return Math.floor(diff / day) + 'd';
    if (diff > week) return Math.floor(diff / week) + 'w';
    console.log('Could not find matching date for : ', date);
  }
}

@Pipe({
  name: 'relativeTime',
})
export class RelativeTime implements PipeTransform {
  /**
   * Takes a Javascript Date object, and returns the distance in words to now...
   * For more details see: https://date-fns.org/
   */
  transform(value: string, ...args) {
    return distanceInWordsToNow(new Date(value), { addSuffix: true, includeSeconds: false });
  }
}

