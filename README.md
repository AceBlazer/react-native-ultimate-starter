pattern:
call service from ui => service calls thunk and updates store (no return: no sideeffects,
one source of truth: store) => ui uses selector (middlewares work in between)

done:
-testable components / screens + clean architecture (ts, baseview, combine providers)
-fonts
-icomoon
-redux toolkit, redux persist, thunks, custom subscribe package for a specific slice all typed
-offline notice
-full screen
-RTL support
-sentry (couldn't add sourcemaps and multiple environments, only multiple releases)
-i18n
-theming with color schemes
-network service DI, provider configurable with token&refresh interceptors and error handling
-env vars (couldn't add inline custom var so added react_app_environment env var)
-global loader: slice global, selector in app.js, middleware to detect loading then add it to global
(couldn't configure from whom it gets loading, but rather from thunk itself). From ui, dispatch directly to global reducer
-global error: service => thunk (reject) => middleware (dispatch global error) => state updated by thunk => ui toast

-----------todo--------------

fix <UNDEFINED> actions in redux debugger

logger per api / per user implicit

performance network + overall (make it implicit: no need to add it by devs instead inside logger,
logging network in interceptor and inside services)

rollback transaction (redux-undo)

----------to learn------------
react router dom v6
oauth2 vs saml
