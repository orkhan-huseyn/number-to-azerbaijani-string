const translations = require('../utils/translations');

const { digits, decimals } = translations;

// create cache to store previously
// spelled numbers, so that we don't spell them again
const cache = {};

/**
 * Converts number into string in Azerbaijani
 * @param {number} number natural number
 * @param {boolean} spellZeroAtTheEnd
 * @returns {string} spelling of number in Azerbaijani
 */
function spellIntegerMemoized(number, spellZeroAtTheEnd = true) {
  // if we have it in the cache
  // then don't bother to calculate it
  if (cache[number]) {
    return cache[number];
  }

  // define spelling
  let spelling = '';
  // we get the sign of number first
  const sign = number < 0 ? translations.NEGATIVE + ' ' : '';
  // then we make our number positive to evaluate it
  number = Math.abs(number);

  // optional parameter `spellZeroAtTheEnd`
  // so that we can optionally show and hide zero at the end
  // for example we don't want strings like `min sıfır`
  if (number === 0 && spellZeroAtTheEnd) {
    cache[number] = digits[0];
    return digits[0];
  }

  if (number >= 0 && number < 10) {
    // if number is between 1 (inclusive) and 10
    // then dimply get it from the map
    const spellingOfDigit = number > 0 ? digits[number] : '';
    // cache the number
    cache[number] = spellingOfDigit;
    // and add it to our final spelling
    spelling += spellingOfDigit;
  } else if (number >= 10 && number < 100) {
    // if number is between 10 (inclusive) and 100
    // then we again need map since there is custom cases
    // between 10 and 100 like `qırx`, `doxsan` etc.
    const numberOfTens = parseInt(number / 10);
    // find digit after tens point and spell it
    let digitPoint = number % 10 > 0 ? digits[number % 10] : '';
    digitPoint = digitPoint ? ' ' + digitPoint : digitPoint;
    // find the spelling of tens value from the map
    const finalSpelling = decimals[numberOfTens * 10] + digitPoint;
    // cache the spelling
    cache[number] = finalSpelling;
    // add spelling to our final string
    spelling += finalSpelling;
  } else if (number >= 100 && number < 1000) {
    // if is between 100 and 1000 we don't have custom cases
    // we continue with normal flow after this point
    // fint number of hundreds in the number
    const numberOfHundreds = parseInt(number / 100);
    // spell number of hundreds in the number if it is more than 1
    // so we don't want to say: `bir yüz doxsan iki`
    const numOfHundredsSpelling =
      numberOfHundreds > 1 ? spellIntegerMemoized(numberOfHundreds) : '';
    // to spell hundred, we get it from our predefined translations
    // so we say the word hundred in azerbaijani
    const hundredsSpelling = numOfHundredsSpelling
      ? numOfHundredsSpelling + ' ' + translations.HUNDRED
      : translations.HUNDRED;
    // we get the final spelling
    const finalSpelling =
      hundredsSpelling + ' ' + spellIntegerMemoized(number % 100);
    // add it to the cache
    cache[number] = finalSpelling;
    // and do what we're doing before
    spelling += finalSpelling;
  } else if (number >= 1000 && number < 1000000) {
    // numbers between 1000 and 1000000
    // we do the same procedure
    // find number of thousands
    const numberOfThousands = parseInt(number / 1000);
    // we spell number of thousands
    // just like we did before with hundreds
    const numOfThousandsSpelling =
      numberOfThousands > 1 ? spellIntegerMemoized(numberOfThousands) : '';
    // we say the word thousand in Azerbaijani
    const thousandsSpelling = numOfThousandsSpelling
      ? numOfThousandsSpelling + ' ' + translations.THOUSAND
      : translations.THOUSAND;
    // we get our final spelling
    const finalSpelling =
      thousandsSpelling + ' ' + spellIntegerMemoized(number % 1000);
    // cache the result
    cache[number] = finalSpelling;
    // and do the same
    spelling += finalSpelling;
  }
  // use the sign and eplling finally
  return sign + spelling;
}

module.exports = spellIntegerMemoized;
