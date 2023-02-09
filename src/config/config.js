require('dotenv').config({
  path: '../.env',
});

module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'harisenin_tugas2_nodejs',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }
};

// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "harisenin_tugas2_nodejs",
//     "host": "localhost",
//     "port": 3306,
//     "dialect": "mysql"
//   }
// }
