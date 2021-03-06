// @flow strict

import { getLocaleDashed } from './GetDeviceLocale';
import DateUtils from './DateUtils';

import 'intl'; // Polyfill because of Android
import 'intl/locale-data/complete';

// language prop passed from native code is not accessible at this point
const DEVICE_LOCALE = getLocaleDashed();

function date(date: Date) {
  return Intl.DateTimeFormat(DEVICE_LOCALE, {
    timeZone: 'UTC', // this is very important!
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  }).format(date);
}

function shortDate(date: Date) {
  return Intl.DateTimeFormat(DEVICE_LOCALE, {
    timeZone: 'UTC', // this is very important!
    month: 'numeric',
    day: 'numeric',
  }).format(date);
}

function time(date: Date) {
  return Intl.DateTimeFormat(DEVICE_LOCALE, {
    timeZone: 'UTC', // this is very important!
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

function birthday(date: Date) {
  return Intl.DateTimeFormat(DEVICE_LOCALE, {
    timeZone: 'UTC', // this is very important!
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date);
}

function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

/**
 * Purpose of this wrapper is to make very opinionated and restrictive
 * formatter. Every function is localized and you should never call formatting
 * on the raw Date object.
 */
function DateFormatter(rawDate: Date = DateUtils.getUTCNow()) {
  return {
    formatToDate: () => date(rawDate),
    formatToTime: () => time(rawDate),
    formatToShortDate: () => shortDate(rawDate),

    // note: I am not sure about the naming - improve when needed
    formatToBirthday: () => birthday(rawDate),

    /**
     * Always returns YYYY-MM-DD at this moment.
     */
    formatForMachine: () => {
      return (
        rawDate.getUTCFullYear() +
        '-' +
        pad(rawDate.getUTCMonth() + 1) +
        '-' +
        pad(rawDate.getUTCDate())
      );
    },
  };
}

export default DateFormatter;
