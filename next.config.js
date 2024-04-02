const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  serverRuntimeConfig: {
    dbConfig: {
        host: process.env.DB_HOST,
        port: process.env.DB_HOST_PORT            ,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, // @@@
        database: process.env.DB_NAME
    },
    secret: process.env.SECRET_KEY
  },
  publicRuntimeConfig: {
    apiUrl: process.env.MODE === 'development'
        ? 'http://localhost:3000/api' // development api
        : 'http://localhost:3000/api' // production api
  },
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: '**.*.com.es',
          port: '',
          pathname: '*',
      }
  ],
},
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  pathUrl: {
    admin: {
      users: '/users/',
      usersid: '/users/[id]/',
      customers: '/customers/',
      customersid: '/customers/[id]/',
      products: '/products/',
      productsid: '/products/[id]/',
      orders: '/orders/',
      ordersid: '/orders/[id]/',
      orderdetails: '/orderdetails/',
      orderdetailsid: '/orderdetails/[id]/',
      dashboard: '/admin/',
    },
    public: {
      login: '/pages/login/',
      register: '/pages/register/',
      forgotpassword: '/public/forgotpassword/',
    }
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
