export class ApiConfig1 {
  static loginURL: string = '/api/login'; // POST
  static signupURL: string = '/api/signup'; // POST
  static storeListURL: string = '/api/store'; // GET
  static storeListByCategoryURL: string = '/api/category'; // GET
  static storeProductsURL: string = '/api/items-list'; // GET
  static userDetailsURL: string = '/api/user'; // GET, POST
  static cartURL: string = '/api/cart'; // GET, POST
  static orderURL: string = '/api/order'; // GET, POST
  static ordersListURL: string = '/api/orders'; // GET
  static favoriteStoreURL: string = '/api/store/favorite'; // POST, GET
}

export class ApiConfig {
  static apiHostUrl: string = "http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com"
  static loginURL: string = `${ApiConfig.apiHostUrl}/api/login`; // POST
  static signupURL: string = `${ApiConfig.apiHostUrl}/api/signup`; // POST
  static storeListURL: string = `${ApiConfig.apiHostUrl}/stores/findStoresByPincode`; // GET
  static storeListByCategoryURL: string = `${ApiConfig.apiHostUrl}/stores/findStoresByPincode`; // GET
  static storeProductsURL: string = `${ApiConfig.apiHostUrl}/stores/findProductsByStoreId`; // GET
  static userDetailsURL: string = `${ApiConfig.apiHostUrl}/api/user`; // GET, POST
  static cartURL: string = `${ApiConfig.apiHostUrl}/api/cart`; // GET
  static cartUpdateURL: string = `${ApiConfig.apiHostUrl}/orderProducts/upsert`; // PUT
  static orderURL: string = `${ApiConfig.apiHostUrl}/api/order`; // GET, POST
  static ordersListURL: string = `${ApiConfig.apiHostUrl}/api/orders`; // GET
  static favoriteStoreURL: string = `${ApiConfig.apiHostUrl}/api/store/favorite`; // POST, GET
}

