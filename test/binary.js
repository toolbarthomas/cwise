var cwise = require("../index.js")
  , ndarray = require("ndarray")
  , test = require("tap").test

test("binary", function(t) {

  var binary = cwise(function(a,b,t) {
    t.equals(a, 0)
    a = b + 1001
  }, { scalars: [2] })
  
  function testBinary1D(P, Q) {
    t.equals(P.shape[0], Q.shape[0])
    for(var i=0; i<P.shape[0]; ++i) {
      Q.set(i, i)
      P.set(i, 0)
    }
    binary(P, Q, t)
    for(var i=0; i<P.shape[0]; ++i) {
      t.equals(P.get(i), i+1001)
    }
  }
  
  var A = ndarray.zeros([128], 'int32')
  var B = ndarray.zeros([128], 'int32')
  
  /*
  testBinary1D(ndarray.zeros([0], 'int32'), ndarray.zeros([0], 'int32'))
  testBinary1D(ndarray.zeros([1], 'int32'), ndarray.zeros([1], 'int32'))
  testBinary1D(A, B)
  testBinary1D(A.lo(32), B.hi(128-32))
  testBinary1D(A.step(-1), B)
  testBinary1D(A, B.step(-1))
  */
  
  function testBinary2D(P, Q) {
    console.log(P.shape, Q.shape)
    t.equals(P.shape[0], Q.shape[0])
    t.equals(P.shape[1], Q.shape[1])
    for(var i=0; i<P.shape[0]; ++i) {
      for(var j=0; j<P.shape[1]; ++j) {
        Q.set(i,j, i*1000 + j)
        P.set(i,j, 0)
      }
    }
    binary(P, Q, t)
    for(var i=0; i<P.shape[0]; ++i) {
      for(var j=0; j<P.shape[1]; ++j) {
        t.equals(P.get(i,j), i*1000+j+1001)
      }
    }
  }
  
  var X = ndarray.zeros([64,64], 'int32')
  var Y = ndarray.zeros([64,64], 'int32')
  
  testBinary2D(X, Y)
  testBinary2D(X.transpose(1,0), Y.transpose(1,0))
  testBinary2D(X.transpose(1,0), Y)
  testBinary2D(X, Y.transpose(1,0))
  testBinary2D(X.hi(32,32), Y.hi(32,32))
  testBinary2D(X.hi(31,31), Y.hi(31,31))
  testBinary2D(X.hi(0,32), Y.hi(0,32))
  testBinary2D(X.transpose(1,0).hi(0,32), Y.hi(0,32))
  testBinary2D(X.transpose(1,0).hi(33,33), Y.hi(33,33))
  testBinary2D(X.transpose(1,0).hi(31,31), Y.hi(31,31))
  
  t.end()
})
