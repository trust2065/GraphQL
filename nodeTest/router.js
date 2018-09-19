function route(pathName, handler) {
    console.log(`About to route a request for ${pathName}`);
    if (typeof handler[pathName] === 'function') {
        return handler[pathName]();
    } else {
        console.log(`No request handler found for ${pathName}`);
        return `404 not found`
    }
}

exports.route = route;