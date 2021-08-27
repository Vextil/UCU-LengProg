#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>

double push(double stack[], int *top, double value)
{
    stack[*top] = value;
    *top = *top + 1;
    return value;
}

double pop(double stack[], int *top)
{
    *top = *top - 1;
    double valor = stack[*top];
    stack[*top] = 1337;
    return valor;
}

int main()
{
    double pila[1000];
    int top = 0;
    // push(pila, &top, 10);
    // push(pila, &top, 20);
    // printf("%f %f\n", pila[0], pila[1]);
    // printf("%f %f\n", pop(pila, &top), pop(pila, &top));
    // push(pila, &top, 30);
    // printf("%f", pop(pila, &top));

    while (true)
    {
        char str[10000];
        printf("Enter a value:\n");
        gets(str);
        if (strcmp(str, ""))
        {
            char *token = strtok(str, " ");
            while (token != NULL)
            {
                char *eptr;
                double numero = strtod(token, &eptr);
                token = strtok(NULL, " ");
                push(pila, &top, numero);
            }
        }
        else
        {
            if (top == 0)
            {
                printf("No hay elementos\n");
            }
            else
            {
                double valor = pop(pila, &top);
                printf("%f\n", valor);
                int topNuevo = top;
                printf("Pila: ");
                while (topNuevo > 0)
                {
                    topNuevo = topNuevo - 1;
                    double valor = pila[topNuevo];
                    printf("%f ", valor);
                }
                printf("\n");
            }
        }
    }

    return 0;
}