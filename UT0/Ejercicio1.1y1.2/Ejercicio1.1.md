sumaDeLineas()
COM
    MIENTRAS (VERDADERO) HACER
        entrada <- leerEntrada
        Entero sumaDeValores <- 0

        PARA CADA (linea EN entrada) HACER
            Lista digitos <- linea.separarPorEspacios()
            sumaDeValores <- 0
            PARA CADA (valor EN digitos) HACER
                sumaDeValores <- valor
            FIN PARA CADA
            imprimir (sumaDeValores)
        FIN PARA CADA
FIN