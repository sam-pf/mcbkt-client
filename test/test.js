const assert = require ('chai').assert
const expect = require ('chai').expect

describe ("A test", function () {
  it ("is true", function () {
    var test = true;
    assert (test, true)
    expect (test, 'test object').to.be.ok
  })
})
