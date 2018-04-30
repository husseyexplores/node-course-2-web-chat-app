const expect = require('expect');

const {generateMessage} = require('./message');

describe('Generate message', () => {
   it('should generate correct message object', () => {
      const msg = generateMessage('MochaTest', 'This test should pass!')
   
      expect(msg.from).toBe('MochaTest');
      expect(msg.text).toBe('This test should pass!');
      expect(msg.createdAt).toBeTruthy();
   });
});