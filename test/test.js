const mylib = require ('../dist/mcbkt-client_compiled_umd')

const chai = require ('chai')
const assert = chai.assert
const expect = chai.expect
const should = chai.should ()
const mcbkt_url = "https://ukde.physicsfront.com/mcbkt"

describe ("My first silly test suite", function () { // <<<
  it ("true should be both true and truthy", function () { // <<<
    var test = true
    assert (test, true)
    expect (test, 'test object').to.be.ok
    test.should.be.ok && test.should.be.true
  }) // >>>
}) // >>>
describe ("UKDE MCBKT API", function () { // <<<
  it ("ajax_as_promise is loadable", function () { // <<<
    var result = mylib
    result.should.be.ok
    result.ajax_as_promise.should.be.ok
  }) // >>>
  it ("get method works", function () { // <<<
    return mylib.ajax_as_promise ("https://ukde.physicsfront.com/")
      .then (function (data) {
        expect (data).to.be.ok
      })
  }) // >>>
  // <<< How to use a Promise object in unit testing.
  // We can do the unit testing with Promise objects, if we allow for a long
  // enough timeout (see karma.config.js).  According to
  // https://stackoverflow.com/questions/26571328/, Mocha handles Promise
  // objects correctly if it is returned by the unit test function.  Indeed,
  // this seems to be the case below.  I also tried "chai-as-promise"
  // package, but it seems to lead to some weird error for phantomjs ("no let
  // in strict mode" or something like it, which appears to be a bug coming
  // from webpack+babel?!).  So, for now, just stick with the below patterns.
  // >>>
  it ("mcbkt ajax post fails without ukde_api_key", function () { // <<<
    return mylib.ajax_as_promise (mcbkt_url, "post",
      {
        scores: [0.0, 0.0, 0.10, 0.92, 0.88, 0.92, 0.94, 0.98, 0.98, 0.70]
      })
      .then (
        function (data) { true.should.not.be.ok },
        function (error) { error.should.be.ok }
      )
  }) // >>>
  it ("mcbkt ajax post fails with (any) ukde_api_key passed in ajax data", // <<<
      function () {
         return mylib.ajax_as_promise (mcbkt_url, "post",
           {
             ukde_api_key: 'blahblah',
             scores: [0.0, 0.0, 0.10, 0.92, 0.88, 0.92, 0.94, 0.98, 0.98, 0.70]
           })
           .then (
             function (data) { true.should.not.be.ok },
             function (error) { error.should.be.ok }
           )
      }) // >>>
  it ("post_scores_for_mcbkt_analysis should succeed with only data",  // <<<
     function () {
        return mylib.post_scores_for_mcbkt_analysis (
         {
           scores: [0.0, 0.0, 0.10, 0.92, 0.88, 0.92, 0.94, 0.98, 0.98, 0.70]
         })
         .then (
           function (data) { data.should.be.ok },
           function (error) { true.should.not.be.ok }
         )
     })
}) // >>>
