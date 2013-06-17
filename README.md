# Angular Adaptive [![Build Status](https://secure.travis-ci.org/janantala/angular-adaptive.png)](https://travis-ci.org/janantala/angular-adaptive)
The adaptive components for AngularJS

## ATTENTION

**Repository is moving into https://github.com/angular-adaptive**

---

I will know:
* youtube
* vimeo
* google maps
* fancybox
* open in app button
* app stores buttons
* and many more...

Under construction, check out develop branch.

## Usage

### Requirements

* **AngularJS v1.0.0+** is currently required.
* **External API** _(depends on directive)._ Check specific directive dependencies for more information

## Installation

The repository comes with the modules pre-built and compressed into the `dist/` directory.

```javascript
angular.module('myApp', ['adaptive']);
```

### Test & Develop

The modules come with unit tests that should be run on any changes and certainly before commiting changes to the project.  The unit tests should also provide further insight into the usage of the modules.

```bash
$ grunt test
```

### Build

```bash
$ grunt build
```

You don't have to build modules, they are pre-built and compressed into the `dist/` directory.


License
======================

The MIT License

Copyright (c) 2013 the Jan Antala, https://github.com/janantala
