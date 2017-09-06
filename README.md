# Javascript library for mcbkt client

The `mcbkt-client` module can be used by clients of the MCBKT engine of UKDE
by Physics Front.  Or, it can be used as a lightweight ajax library.

The javascript module `mcbkt-client` can be found in folder `src`.

This library is written in ES6 (ECMAScript6 or ECMAScript 2015; [see
here](http://es6-features.org)).

However, the distribution module is compiled by babel as UMD and so it should
work in any reasonable environment.

The distribution library for `mcbkt-client` is a standalone library.

The API docs in javascript source files are written within the ES6 framework.
Therefore, some of the ES6 terms/features that are compiled away by babel
will not apply if the library is used in pre-ES6 environment.

# Installation

At the top directory of this repo, run the following two commands.

```
npm install
make
```

In order for the make command to work, bash and GNU make are required.  If
these are not installed in your system, one way could be that you would
want/need to look inside of `GNUmakefile`, extract desired commands, and run
them by hand.
