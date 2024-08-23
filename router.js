function route(handle, pathname, response, productId) {
    console.log('pathname : ' + pathname);

    if (typeof handle[pathname] == 'function') {
        // productId 아이디를 받아오도록 수정
        handle[pathname](response, productId);
    } else {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write('Not Found');
        response.end();
    }
}

exports.route = route;