const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('Generate message', () => {
   it('should generate correct message object', () => {
      const msg = generateMessage('MochaTest', 'This test should pass!')
   
      expect(msg.from).toBe('MochaTest');
      expect(msg.text).toBe('This test should pass!');
      expect(msg.createdAt).toBeTruthy();
   });
});

describe('Generate locationmessage', () => {
   it('should generate correct location object', () => {
      const from = 'Test'
      const lat = 1;
      const long = 2;
      const url = `https://www.google.com/maps?q=${lat},${long}`;
      const msg = generateLocationMessage(from, lat, long)
   
      expect(msg.from).toBe('Test');
      expect(msg.url).toBe(url);
      expect(msg.createdAt).toBeTruthy();
      expect(typeof msg.createdAt).toBe('number');
      expect(msg).toMatchObject({from, url})
   });
});