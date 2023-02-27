* pattern:
call service from ui => service calls thunk and updates store (no return: no side effects,
one source of truth: store) => ui uses selector (middlewares work in between)

* done:
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
(couldn't configure from whom it gets loading, but rather from thunk itself). From ui, dispatch directly to global reducer
- global error: service => thunk (reject) => middleware (dispatch global error) => state updated by thunk => ui toast
- rollback transaction (redux-undo) used as example in settings slice to undo store changes when request fails
should be dispatched manually
- singletons that are used to store critical info in memory so it's not persisted (example: current connected user: we cant always
get it from secure/async storage so we get it the first time and populate our singleton. BEWARE: in this case our source of truth
should be always the singleton)
- logger per api (allowed apis for logging + allowed levels) / per user implicit (no need to add it by devs) + axios requests logs
- performance: implicit: inside logger with a reference to message, should write logs "x started ..." and "x ended ..." will
automatically include performance for "x" (exp. included in network elapsed time) 

-----------todo--------------

-catch timeout errors by axios and raise custom error


-new pattern: service dispatches a transaction to store => middleware gets transaction from store and dispatches to thunk
-logger should be implicit (if all gonna be passing by transaction reducer, we add logger there)
-performance should be implicit (inside transaction)


-add cli

-(if still have time) maybe add auth classic vs saml and 2fa and biometric validation (see nicehash) 

----------to learn------------
react router dom v6
oauth2 vs saml
