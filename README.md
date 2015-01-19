# firebase-init
Firebase Initializer with configuration variable via config file, environment variable, package, npm or cli


## Install

```js
npm install firebase-init --save
```

## Supported ```firebase``` config variables

- ```url```: full firebase url, ex: ```https://example.firebaseio.com```
- ```name```: firebase name, ex: ```example```
- ```token```: custom authentication token
- ```custom```: custom authentication data, optional with ```token```
- ```root```: child path within firebase url

Or as individual variables

- ```firebase.url```: full firebase url, ex: ```https://example.firebaseio.com```
- ```firebase.name```: firebase name, ex: ```example```
- ```firebase.token```: custom authentication token
- ```firebase.custom```: custom authentication data, optional with ```token```
- ```firebase.root```: child path within firebase url

## Use


### Config via passed in values

```js
var Firebase = require('firebase-init')
var config = {
  "firebase": {
    "url":  "https://example.firebaseio.com"
  }
}
Firebase(config, function(error, initializedFirebaseReference) {
  if (error) throw error
  // start using initializedFirebaseReference
})
```


### Config via cli parameter:

```sh
node app.js --firebase.url https://example.firebaseio.com
```

Example NodeJS:

```js
var Firebase = require('firebase-init')
Firebase(function(error, initializedFirebaseReference) {
  if (error) throw error
  // start using initializedFirebaseReference
})
```


### Config via environment variable

```sh
firebase.url=https://example.firebaseio.com
firebase.token=dda8c65b-b0ea-423d-9a44-e17c4f6f09a9

node app.js
```

### Ignore case

This will also work

```sh
FIREBASE.URL=https://example.firebaseio.com
FIREBASE.TOKEN=dda8c65b-b0ea-423d-9a44-e17c4f6f09a9
```

### Value via JSON config value

```sh
config='{ "firebase": {"name":"example", "token":"dda8c65b-b0ea-423d-9a44-e17c4f6f09a9" }}'
```

### Config via JSON config file

```sh
config='pathTo/myConfig.json'
```

```myConfig.json``` :

```js
{
  "firebase": {
    "name":  "example-store",
    "token": "dda8c65b-b0ea-423d-9a44-e17c4f6f09a9",
    "custom": {
      uid:      "eastcoast-manager",
      isAdmin : true
    },
    "root": "east-coast/inventory"
  }
}
```

### Config via [JSONIC](http://github.com/rjrodger/jsonic) simplified JSON

```sh
firebase=name:example,token:e27d9f2a29b7

node app.js
```

or

```sh
node app.js --firebase=name:example,token:e27d9f2a29b7
```

## License: MIT
