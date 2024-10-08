let http = require('http'); // Node.js가 가지고 있는 모듈
let url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        /**let pathname = url.parse(request.url).pathname;
        // productId 추가 -> ?로 받아오기
        // 버튼이 클릭될 때 사용
        let queryData = url.parse(request.url, true).query;

        new URL() 방식으로 변경
        **/
        const { pathname, searchParams } = new URL(request.url, `http://${request.headers.host}`);

        // 쿼리 파라미터에서 productId 추출
        const productId = searchParams.get('productId');
       
        // pathname을 route 함수에게 매개변수로 전달
        route(handle, pathname, response, queryData.productId);
    }
    
    http.createServer(onRequest).listen(8888);
    console.log('Server running at http://localhost:8888/');
    // localhost:8888
    // 전원 버튼 누르는 방법 : View > Terminal > node server.js 입력 
}

exports.start = start;