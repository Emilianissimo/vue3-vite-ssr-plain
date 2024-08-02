# Plain project

### SSR mode
To make work client libs, working with cookies, we must check in our main.js next variable and load it only on the client side, not server

To start, also, don't forget to create .env.local for your local work

```javascript
if (!import.meta.env.SSR) {
  router.beforeEach(async (to, from, next) => {
      JwtService.checkTokenAndDeleteItIfItIsExpired()

      return next()
  })

  router.beforeResolve((to, from, next) => {
      if (to.name) {
          NProgress.start()
      }
      next()
  })
  router.afterEach((to, from) => {
    NProgress.done()
  })
}
```
First is cookie checker for authentication part, second one is the NProgress bar, which are client only.