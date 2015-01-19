"use strict";

var convar         = require('convar')
  , firebaseConfig = convar('firebase') || {}
  , Firebase       = require('firebase')
  , TokenGenerator = require("firebase-token-generator")
;



function builder(config, cb) {
  config          = config || {}
  var firebaseRef = new Firebase(config.url)

  function finish(error, fbRef) {
    if (config.root) {
      fbRef = fbRef.child(config.root)
    }
    cb(error, fbRef)
  }

  if (config.token) {
    var tokenGenerator = new TokenGenerator(config.token)
      , authToken      = tokenGenerator.createToken(config.tokenData || {})
    ;

    firebaseRef.authWithCustomToken(authToken, function(error, authData) {
      finish(error, firebaseRef)
    })
  } else {
    finish(null, firebaseRef)
  }
}



function FirebaseInit(option, cb) {
  if ('function' == typeof option) {
    cb       = option
    option   = {}
  }
  option     = option       || {}
  var name   = option.name  || firebaseConfig.name      || convar('firebase.name') || undefined
  var url    = option.url   || firebaseConfig.url       || convar('firebase.url')  || name && 'https:' + name + '.firebaseio.com' || undefined
  var config = {
    url:   url                                          || convar('firebase.url', 'Firebase name or url config required.'),
    root:  option.root      || firebaseConfig.root      || convar('firebase.root'),
    token: option.token     || firebaseConfig.token     || convar('firebase.token'),
    data:  option.tokenData || firebaseConfig.tokenData || convar('firebase.tokenData')
  }

  var firebase = builder(config, function(err, client) {
    if (cb) {
      cb(err, client)
    } else if (err) {
      throw err
    }
  });
}

module.exports = FirebaseInit
