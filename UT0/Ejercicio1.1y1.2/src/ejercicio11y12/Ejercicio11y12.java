package ejercicio11y12;

import java.util.Scanner;

/**
 *
 * @author vogel
 */
public class Ejercicio11y12 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        sumaDeLineas();
    }

    // sumaDeLineas()
    // COM
    //  MIENTRAS (VERDADERO) HACER
    //      entrada <- leerEntrada
    //      Entero sumaDeValores <- 0
    //
    //      PARA CADA (linea EN entrada) HACER
    //          Lista digitos <- linea.separarPorEspacios()
    //          sumaDeValores <- 0
    //          PARA CADA (valor EN digitos) HACER
    //              sumaDeValores <- valor
    //          FIN PARA CADA
    //          imprimir (sumaDeValores)
    //      FIN PARA CADA
    // FIN
    private static void sumaDeLineas() {

        System.out.println("Ingrese los dígitos que desee sumar, separados por un espacio. " + "Por ejemplo: 1 2 3. \n"
                + "Si coloca una letra, la suma resultante dará 0. \n"
                + "Para salir del sistema, escriba exit\n"
                + "==================================================================================");
        Scanner in = new Scanner(System.in);

        int sumaDeValores = 0;
        String entry = in.nextLine();
        String alfabet = "[a-zA-Z]+";

        while (true) {
            if (entry.toLowerCase().contains("exit")) {
                in.close();
                break;
            }

            sumaDeValores = 0;
            String[] valores = entry.replaceAll("\\s+", " ").trim().split("\\s+");
            
            for (String valor : valores) {
                if (valor.matches(alfabet)) {
                    sumaDeValores = 0;
                    break;
                }
                int value = Integer.parseInt(valor);
                sumaDeValores += value;
            }

            System.out.println("La suma de valores es: " + sumaDeValores);
            entry = in.nextLine();
        }
    }
}
