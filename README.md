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
