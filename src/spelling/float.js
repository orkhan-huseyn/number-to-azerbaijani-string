/**
 * MIT License

Copyright (c) 2018 Orkhan Huseynli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
import spellInteger from './integer';
import {
  HUNDREDS_PREFIX,
  HUNDREDS_AS_WORDS,
  POINT_AS_WORD
} from '../utils/translations';
import {
  THOUSAND,
  MILLION,
  BILLION,
  TRILLION,
  QUADRILLION
} from '../utils/helpers';

const spellFloat = number => {
  const numberChunks = number.toString().split('.');
  const integerPart = parseInt(numberChunks[0], 10);
  const floatingPartLength = numberChunks[1].length;
  const floatingPart = parseInt(numberChunks[1], 10);

  let numOfFr = '';
  let exponent = 1;

  if (floatingPartLength === 2) {
    exponent = 2;
  } else if (floatingPartLength >= 3 && floatingPartLength < 6) {
    exponent = 3;
    let numOfThousands = parseInt(floatingPart / THOUSAND, 10);
    if (numOfThousands > 1 && numOfThousands < 10) {
      numOfThousands = 10;
    } else if (numOfThousands > 10 && numOfThousands < 100) {
      numOfThousands = 100;
    }
    numOfFr =
      numOfThousands > 1 ? `${spellInteger(numOfThousands, false)} ` : '';
  } else if (floatingPartLength >= 6 && floatingPartLength < 9) {
    exponent = 6;
    let numOfMillions = parseInt(floatingPart / MILLION, 10);
    if (numOfMillions > 1 && numOfMillions < 10) {
      numOfMillions = 10;
    } else if (numOfMillions > 10 && numOfMillions < 100) {
      numOfMillions = 100;
    }
    numOfFr = numOfMillions > 1 ? `${spellInteger(numOfMillions, false)} ` : '';
  } else if (floatingPartLength >= 9 && floatingPartLength < 12) {
    exponent = 9;
    let numOfBillions = parseInt(floatingPart / BILLION, 10);
    if (numOfBillions > 1 && numOfBillions < 10) {
      numOfBillions = 10;
    } else if (numOfBillions > 10 && numOfBillions < 100) {
      numOfBillions = 100;
    }
    numOfFr = numOfBillions > 1 ? `${spellInteger(numOfBillions, false)} ` : '';
  } else if (floatingPartLength >= 12 && floatingPartLength < 15) {
    exponent = 12;
    let numOfTrillions = parseInt(floatingPart / TRILLION, 10);
    if (numOfTrillions > 1 && numOfTrillions < 10) {
      numOfTrillions = 10;
    } else if (numOfTrillions > 10 && numOfTrillions < 100) {
      numOfTrillions = 100;
    }
    numOfFr =
      numOfTrillions > 1 ? `${spellInteger(numOfTrillions, false)} ` : '';
  } else if (floatingPartLength >= 15 && floatingPartLength <= 16) {
    exponent = 15;
    let numOfQuadrillions = parseInt(floatingPart / QUADRILLION, 10);
    if (numOfQuadrillions > 1 && numOfQuadrillions < 10) {
      numOfQuadrillions = 10;
    } else if (numOfQuadrillions > 10 && numOfQuadrillions < 100) {
      numOfQuadrillions = 100;
    }
    numOfFr =
      numOfQuadrillions > 1 ? `${spellInteger(numOfQuadrillions, false)} ` : '';
  }

  const integerPartSpelling = spellInteger(integerPart);
  const floatingPartSpelling = spellInteger(floatingPart);
  const hundredPoint = HUNDREDS_AS_WORDS[10 ** exponent];
  const prefix = HUNDREDS_PREFIX[10 ** exponent];

  return `${integerPartSpelling} ${POINT_AS_WORD} ${numOfFr}${hundredPoint}${prefix} ${floatingPartSpelling}`;
};

export default spellFloat;
