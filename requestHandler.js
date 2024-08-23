const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log('main');

    // sql query를 던질 수 있음 + 함수
    mariadb.query("SELECT * FROM product", function(err, rows) {
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

/*
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
*/

function redRacket(response) {
    fs.readFile('./img/redRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

/* productId를 새로 매개변수로 받음
실시간 시간 받아오기 -> new Date().toLocaleDateString 
실행하면 결과값이 undefined가 나오기 때문에 임의로 수정 */
function order(response, productId) {
    response.writeHead(200, {'Content-Type': 'text/html'});

    // SQL 인젝션 방지를 위해 Prepared Statement 사용
    // 현재 날짜를 ISO 형식으로 얻기 -> 날짜만 추출
    const currentDate = new Date().toISOString().split('T')[0];

    // productId가 유효한지 확인
    if (!productId) {
        response.write('Invalid Product ID');
        response.end();
        return;
    }

    // mariadb 연결 및 prepared statement 사용
    mariadb.query(
        "INSERT INTO orderlist (product_id, order_date) VALUES (?, ?)", 
        [productId, currentDate], 
        function(err, rows) {
            // 에러 처리
            if (err) {     
                console.error("Error executing query:", err);
                response.write('Error processing order');
            } else {
                console.log("Order inserted successfully:", rows);
                response.write('Order Page');
            }
            response.end();
        }
    );
}  

function orderlist(response) {
    console.log('orederlist');
    response.writeHead(200, {'Content-Type' : 'text/html'});
    mariadb.query("SELECT * FROM orderlist", function(err, rows) {
        response.write(orderlist_view);
        
        // 밑에 추가로 작성. for-Each 반복문은 배열로 값이 넘어옴
        rows.forEach(element => {
            // Date 객체이기 때문에 toISOString().split('T')[0]; 사용하여 날짜만 표시
            let dates = element.order_date.toISOString().split('T')[0];
            response.write("<tr>" 
                + "<td>" + element.product_id + "</td>"
                + "<td>" + dates + "</td>"
                + "</tr>" );
        });

        response.write("</table>");
        response.end();
    })
}

let handle = {};    // key:value 쌍으로 이루어진 상자
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

/*
handle['/login'] = login;
handle['/name'] = name;
*/

exports.handle = handle;