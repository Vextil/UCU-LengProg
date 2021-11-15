(new Promise(
    (resolve) => resolve(Promise.resolve(777))
)).then(a => console.log(a));