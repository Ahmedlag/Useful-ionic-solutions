/* The Angular email validator accepts an email tag "rob@example", perhaps because "rob@localhost" could be valid.
 * The pureEmail regex does not accept "ryan@example" as a valid email address, which I think is a good thing.
 * See: EMAIL_REGEXP from
   https://github.com/angular/angular.js/blob/ffb6b2fb56d9ffcb051284965dd538629ea9687a/src/ng/directive/input.js#L16
  */
const PURE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/*
 * A string between 3 and 16 characters, allowing alphanumeric characters and hyphens and underscores
 */
const USERNAME_REGEXP = /^[a-zA-Z0-9_-]{3,16}$/;
/*
 *  Alternatively: '([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\\.(?!\\.))){3,16}(?:[A-Za-z0-9_]))?)'
 *  Alpha Numeric characters, case sensative, 0-9.
 *  Allow underscores, but not dashes.
 *  Between 3 and 16 characters.
 *
 *  This is a bit verbose for my tastes, but do with it what you will.
 *
 */

const PHONE_NUM_REGEXP = '^\\+?[\\d\\s]{3,}$';
const AREA_PHONE_NUM_REGEXP = '  ^\\+?[\\d\\s]+\\(?[\\d\\s]{10,}$';
const PERSONAL_NAME_REGEXP = '^[\\w.\']{2,}(\\s[\\w.\']{2,})+$';

/*
 * Replaces the word "fuck" and it's variations, with "love".
 *
 */
const FUCK_FILTER_REGEXP = '\\b(?:(?:ass+(?:\\s+)?|i+(?:\\s+)?|butt+(?:\\s+)?|mo(?:(?:m|t|d)h?(?:e|a)?r?)(?:\\s+)?)?f(?:(?:\\s+)?u+)?(?:(?:\\s+)?c+)?(?:(?:\\s+)?k+)?(?:(?:e|a)(?:r+)?|i(?:n(?:g)?)?)?(?:s+)?(?:\\s+)?(?:hole|head|(?:yo?)?u?)?)+\\b';

export const regexValidators = {
  email: PURE_EMAIL_REGEXP, USERNAME_REGEXP, PHONE_NUM_REGEXP,
  AREA_PHONE_NUM_REGEXP, PERSONAL_NAME_REGEXP, FUCK_FILTER_REGEXP
};
