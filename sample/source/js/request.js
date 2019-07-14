function request(query, then) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", 'maltaV("endpoint")');
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        const data = xhr.response;
        then(data)
    }
    xhr.send(JSON.stringify(query));
}


