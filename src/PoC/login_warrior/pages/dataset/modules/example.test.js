// File temporaneo per mostrare com utilizzare Jest per fare unit testing con ES6 modules

import { sum, sub } from './example.js';

describe('Try Jest testing', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('subs 2 - 1 to equal 1', () => {
    expect(sub(2, 1)).toBe(1);
  });
});
