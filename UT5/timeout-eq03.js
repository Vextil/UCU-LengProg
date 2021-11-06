console.log('===== DELAY =====')

function delay(milliseconds, resolveValue = null) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!resolveValue) {
                resolveValue = Date.now();
            }
            resolve(resolveValue);
        }, milliseconds);
    });
}

delay(500).then((result) => {
    console.log(result);
});
delay(500, 'hola').then((result) => {
    console.log(result);
});

delay(800, '===== TIMEOUT =====').then((result) => {
    console.log(result);
});

function timeout(milliseconds, promise) {
    var timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject('No.'), milliseconds)
    });
    return Promise.race([promise, timeoutPromise]);
}

timeout(1000, delay(1500)).then(console.log, console.log);
timeout(2000, delay(1500)).then(console.log);
