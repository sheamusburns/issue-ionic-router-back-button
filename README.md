# issue-ionic-router-back-button

### Overview
The back button behavior works for most straightforward cases, but it sometimes replaces the current route than going back to the next route. 

#### Steps To Reproduce
run `ionic serve`

1. visit root at `localhost:8100`
  - You should be redirected to /A
  - The back button at the top of the page is set to be disabled if the `current_path === history.back`.

2. Use the Page buttons to navigate through the following sequence (not limited to this sequence)
  - Page B, Page C, Page B, Page A, Page B, Page C
  
3. Press Back Button
4. Route Should be /B and back button should be enabled
5. Press Back Button

#### Expected
-  Route should be /A and back button should be enabled
(`history.state.back !== $route.fullPath`)

#### Actual
- Route is /A and back button is disabled
(`history.state.back === $route.fullPath`)


### Cause
In some instances `router.replace` gets called when `router.back` should be called.
```typescript
// @ionic/vue-router#index.js:221-226
if (routeInfo.lastPathname === routeInfo.pushedByRoute) {
                    router.back();
                }
                else {
                    router.replace({ path: prevInfo.pathname, query: parseQuery(prevInfo.search) });
                }
```

### Solution
```typescript
// @ionic/vue-router#index.js:221-226
if (routeInfo.lastPathname === routeInfo.pushedByRoute || prevInfo.pathname === routeInfo.pushedByRoute) {
                    router.back();
                }
                else {
                    router.replace({ path: prevInfo.pathname, query: parseQuery(prevInfo.search) });
                }
```

  
