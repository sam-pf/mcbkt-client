const assert = require ('chai').assert
const expect = require ('chai').expect
const should = require ('chai').should ()

const lib = require ('../lib/mcbktclient')
// const lib = require ('../src/mcbkt-client')

describe ("A silly demo", function () {
  it ("is true", function () {
    var test = true;
    assert (test, true)
    expect (test, 'test object').to.be.ok
    test.should.be.ok && test.should.be.true
  })
})

describe ("Plain ajax", function () {
  it ("lib is loaded", function () {
    var result = lib;
    result.should.be.ok;
    console.log (result);
    result.ajax_as_promise.should.be.ok;
  });
})
