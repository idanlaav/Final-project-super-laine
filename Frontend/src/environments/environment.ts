// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl: "http://localhost:3001/api/auth/login/",
  registerUrl: "http://localhost:3001/api/auth/register/",
  usersDetails: "http://localhost:3001/api/users-details/",
  productsUrl: "http://localhost:3001/api/products/",
  productsByCategoryIdUrl: "http://localhost:3001/api/products-by-category/",
  categoriesUrl: "http://localhost:3001/api/categories",
  orderUrl: "http://localhost:3001/api/orders/",
  openShoppingCartUrl: "http://localhost:3001/api/open-shopping-cart-by-user-id/",
  closeShoppingCartUrl: "http://localhost:3001/api/close-shopping-cart-by-user-id/",
  shoppingCartUrl: "http://localhost:3001/api/shopping-cart/",
  trolleyItemUrl: "http://localhost:3001/api/trolley-items/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
