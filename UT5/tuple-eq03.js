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