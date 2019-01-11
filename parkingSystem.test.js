const {entry, exit} = require("./parkingSystem");

describe('Test for parking entry', () => {
  test('should return error if input vehicle type is invalid', () => {
    function error(){
      entry("unknow");
    }
    expect(error).toThrowError(Error);
  })
  
})
