# RNUS

> This project can be generated by [ACE-RN CLI](https://www.npmjs.com/package/ace-rn)

  

## Pattern
**Old pattern:** call service from UI => service calls thunk and updates store (no return: no side effects, one source of truth: store) => UI uses selector (middlewares work in between) [deprecated]

**New pattern:** UI calls service => service dispatches a transaction to store =>
middleware gets transaction from store and dispatches to thunk => thunk sends request
and updates store => middleware removes transaction from store => UI uses selector
logger implicit (if all gonna be passing by transaction reducer, we add logger there)
performance implicit also (inside transaction)

![new pattern figure](https://i.postimg.cc/PqYZxXLj/download.png)

Why using thunk when we can use the middleware?
- Our middleware will only do a simple thing which is listening and dispatching.
- Our thunk will do the most of work including sending HTTP request.
- This is useful if we want to make all transactions centred and handled by only one pipe (adding transaction to store with it's payload) and middleware listens and sends it.
- Useful also in offline transactions, if we want to preserve transactions until network comes back (so we already have the listener, we add there the logic) 

Benefits of this pattern:
- The listener mentionned above.
- The possibility to rollback changes and/or send another transaction when transaction fails.
- We can monitor the current transaction being handled as it's available in the transaction slice.
- One centralised place in the code to add logic for all transactions (exp: logger)

## Features

- testable components / screens + clean architecture (ts, BaseView, combine providers)
- fonts
- icomoon
- redux toolkit, redux persist, thunks, custom subscribe package for a specific slice all typed
- offline notice
- full screen
- RTL support
- sentry (couldn't add sourcemaps and multiple environments, only multiple releases)
- i18n
- theming with color schemes
- network service DI, provider configurable with token&refresh, cancel token, cache, interceptors and error handling
- env vars (couldn't add inline custom var so added react_app_environment env var)
- global loader: slice global, selector in app.js, middleware to detect loading then add it to global
(couldn't configure from whom it gets loading, but rather from thunk itself). From UI, dispatch directly to global reducer
- global error: service => thunk (reject) => middleware (dispatch global error) => state updated by thunk => UI toast
- rollback transaction (redux-undo) used as example in settings slice to undo store changes when request fails
should be dispatched manually
- singletons that are used to store critical info in memory so it's not persisted (example: current connected user: we cant always
get it from secure/async storage so we get it the first time and populate our singleton. BEWARE: in this case our source of truth
should be always the singleton)
- logger per api (allowed apis for logging + allowed levels) / per user implicit (no need to add it by devs) + axios requests logs
- performance: implicit: inside logger with a reference to message, should write logs "x started ..." and "x ended ..." will
automatically include performance for "x" (exp. included in network elapsed time)

## Project architecture

- **android/**
	- **sentry.properties** *(sentry credentials file based on sentry.properties.template)*
	- **sentry.properties.template**
- **ios/**
	- **sentry.properties** *(sentry credentials file based on sentry.properties.template)*
	- **sentry.properties.template**
- **app/** *(project source directory)*
	- **@types/** *(hardcoded .d.ts types for npm packages)*
	- **assets/** *(static files directory)*
	- **components/**
	- **config/**
		- **colors/** *(schemes)*
		- **fonts/** *(fonts definition objects)*
		- **i18n/** *(translations and i18n config object)*
		- **logger/** *(config logger levels and allowed apis to log...)*
		- **sentry/** *(sentry config object)*
		- **index.ts** *(main config file of the project - it's so important)*
	- **constants/** *(api endpoints...)*
	- **helpers/** *(helper functions)*
	- **hooks/** *(custom hooks)*
	- **icon/** *(icomoon folder to be added here when updating svg icons)*
	- **screens/**
		- **...**
		- **Test/** *(test screen that will be active when setting testMode: true in config)*
	- **services/** *(callable from UI)*
		- **http/**
			- **exceptions/** *(networking exceptions definitions)*
			- **providers/** *(http providers: axios, apisauce,... to be set from config)*
			- **httpService.ts** *(defining httpService constructor and implementing it"s interface)*
			- **index.ts** *(injecting httpProvider dependency in httpService)*
		- **logger/**
		- **performance/** *(used in logger to get elapsedTime)*
		- **settings/**
		- **index.ts** *(important: used in logger config dynamically by getting object keys, should add service custom here to be able to see it in logger apis)*
	- **singletons/** *(shared static objects across components - not persistent)*
	- **store/**
		- **constants/** *(persist migrations and blacklist and undoable slices)*
		- **middlewares/** *(configured in createStore dynamically by getting files names, no need for further config when adding new middleware, just import it in index.ts)*
		- **selectors/**
		- **slices/** 
			- **actions/** *(action creators to simplify dispatch: type of action is gotten dynamically, no hardcoding unless it's undo action)*
			- **reducers/**
				- **...**
				- **extraReducers/** *(thunks reducers to update store)*
		- **thunks/** *(any async work should be here not in middlewares)*
		- **index.ts** (store config)
	- **types/** *(types go here unless its store or component type)*
	- **utilities/** *(device utilities like screen dimentions)*
- **.env** *(environment variables file based on .env.template)*
- **.env.template**