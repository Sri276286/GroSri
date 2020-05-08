// export class ApiConfig {
//   static loginURL: string = 'http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com/auth/login';
//   static signupURL: string = 'http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com/auth/signup';
//   static storeListURL: string = 'http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com/allow/stores/findByPincode';
//   // static storeProductsURL: string = 'http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com/allow/products/findByStoreId';
//   static storeProductsURL: string = '/api/items-list';
//   static userDetailsURL: string = '/api/user';
//   static cartURL: string = '/api/cart';
// }

export class ApiConfig {
  static loginURL: string = '/api/login'; // POST
  static signupURL: string = '/api/signup'; // POST
  static storeListURL: string = '/api/store'; // GET
  static storeProductsURL: string = '/api/items-list'; // GET
  static userDetailsURL: string = '/api/user'; // GET, POST
  static cartURL: string = '/api/cart'; // GET, POST
  static orderURL: string = '/api/order'; // GET, POST
  static ordersListURL: string = '/api/orders'; // GET
}

