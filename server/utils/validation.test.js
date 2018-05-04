const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
   it('should reject non-string values', () => {
      const str = isRealString(123);
   
      expect(str).toBeFalsy();
   });

   it('should reject string with only spaces', () => {
      const str = isRealString('    ');
   
      expect(str).toBeFalsy();
   });

   it('should allow string with a non space character', () => {
      const str = isRealString('      Valid String');

      expect(str).toBeTruthy();
   });

});