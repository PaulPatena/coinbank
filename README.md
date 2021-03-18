# coinbank
This project uses Vuex to demonstrate the MVC pattern for modern front-end. Whilst, Vuex might be an overkill for such a small project it is really powerful as your project becomes big. You separate all your business logic into actions/mutations (Controller), your Vue components (View) are simply presentation layer of your store (Model) data.

## Solution Logic
1. When you load the app, you retrieve Preferred Coin from local storage.
2. We have two routes which are basically presentation layer of the same store and actions.
3. When route is activated, data is fetched from the backend for selected Coin, upon completion price and timestamp are stored into to localStorage. Additionally, if a previous entry for a selected Coin exist in localStorage, % change is calculated, commited to store and presented to user.
4. For every change in user selection, we will retrieve corresponding data as in #3.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
