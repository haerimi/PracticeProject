let server = require('./server');   // server을 모듈처럼 사용
let router = require('./router')
let requestHandler = require('./requestHandler')

const mariadb = require('./database/connect/mariadb');
mariadb.connect();

server.start(router.route, requestHandler.handle);