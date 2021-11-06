console.log('===== DISTANCE =====')


// Crear una función que calcule la distancia entre dos puntos en 2D
function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

console.log(distance({ x: 2 }, { x: 3, y: 4 }));
console.log(distance({ x: 2, y: 5 }, { x: 1, y: 5 }));
console.log(distance({ x: 5, y: 6 }, { x: -7, y: 11 }));
console.log(distance({ x: 5, y: 6 }, { x: 5, y: 6 }));
console.log(distance({ x: 5, y: 6, z: 4 }, { x: -7, y: 11, w: 2 }));

console.log('====== RANGE ======')

// ejercicio 1.4 Definir la funcion generator range
function* range(i, end, step = 1) {
    for (; i < end; i += (step || 1)) {
        yield i;
    }
}

console.log([...range(0, 3)]);
console.log([...range(3, 10)]);
console.log([...range(0, 10, 3)]);
console.log([...range(1, 1)]);
console.log([...range(10, 1, -1)]);
console.log([...range(0, 5, 0)]);

console.log('===== FILTER PROPS =====')

function filterProps(obj, filter) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
        if (filter(key, value)) {
            result[key] = value;
        }
    });
    return result;
}

console.log(filterProps({ x: 1, y: false }, () => false));
console.log(filterProps({ x: 1, y: false }, () => 1));
console.log(filterProps({ x: 1, y: false }, (k, v) => v));
console.log(filterProps({ x: 1, y: false }, (k, v) => k !== 'x'));


console.log('===== TUPLE CLASS =====')

function tupleClass(...properties) {
    return class NewClass {
        constructor(...values) {
            properties.forEach((property, index) => {
                Object.defineProperty(this, property, {
                    value: values[index],
                    writable: true
                })
            });
        }
    }
}

var Persona = tupleClass('nombre', 'apellido', 'edad');
var ana = new Persona('Ana', 'Bergallo', '28');
console.log(ana.nombre);
console.log(ana.apellido);
console.log(ana.edad)

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
        setTimeout(() => reject(new Error('No.')), milliseconds)
    });
    return Promise.race([promise, timeoutPromise]);
}

timeout(1000, delay(1500)).then(console.log, console.log);
timeout(2000, delay(1500)).then(console.log);
