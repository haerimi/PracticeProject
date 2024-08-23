const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log('main');

    // sql query를 던질 수 있음 + 함수
    mariadb.query("SELECT * FROM product", function(err, rows) {
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Main Page');
    response.end();
}

function login(response) {
    console.log('login');

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Login Page');
    response.end();
}

function name(response) {
    console.log('login');

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Hark Hae Rim');
    response.end();
}

let handle = {};    // key:value 쌍으로 이루어진 상자
handle['/'] = main;
handle['/login'] = login;
handle['/name'] = name;

exports.handle = handle;