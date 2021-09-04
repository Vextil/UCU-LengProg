// Compile with `gcc stackalc01.c -o stackalc01.exe`
#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>
#define MAX_INPUT 1024
#define MAX_CODE 30
#define MAX_STACK 100
#define MAX_VAR 5

// May be required or imported.
char *strsep(char **stringp, const char *delim) {
    char *rv = *stringp;
    if (rv) {
        *stringp += strcspn(*stringp, delim);
        if (**stringp)
            *(*stringp)++ = '\0';
        else
            *stringp = 0; }
    return rv;
}

void eval(char *code[], int *pos, double stack[], int *top, double var[]) {
  char *instr = code[*pos];
  if (strncmp("UJP+", instr, 4) == 0) {
    int num = instr[4] - '0';
    *pos += num;
  } else if (strncmp("UJP-", instr, 4) == 0) {
    int num = instr[4] - '0';
    *pos -= num;
  } else if (strncmp("CJP+", instr, 4) == 0) {
    if (*top <= 0) {
      *pos += 1;
    } else {
      double value = stack[(*top)];
      (*top)--;
      if (value) {
        int num = instr[4] - '0';
        *pos += num;
      } else {
        *pos += 1;
      }
    }
  } else if (strncmp("CJP-", instr, 4) == 0) {
    if (*top <= 0) {
        *pos += 1;
    } else {
      double value = stack[(*top)];
      (*top)--;
      if (value) {
        int num = instr[4] - '0';
        *pos -= num;
      } else {
        *pos += 1;
      }
    }
  } else {
    if (strcmp("ADD", instr) == 0) {
      stack[(*top) - 1] = stack[(*top) - 1] + stack[*top];
      (*top)--;
    } else if (strcmp("SUB", instr) == 0) {
      stack[(*top) - 1] = stack[(*top) - 1] - stack[*top];
      (*top)--;
    } else if (strcmp("MULT", instr) == 0) {
      stack[(*top) - 1] = stack[(*top) - 1] * stack[*top];
      (*top)--;
    } else if (strcmp("DIV", instr) == 0) {
      stack[(*top) - 1] = stack[(*top) - 1] / stack[*top];
      (*top)--;
    } else if (strcmp("LTE", instr) == 0) {
      stack[(*top) - 1] = stack[(*top) - 1] <= stack[(*top)] ? 1 : 0 ;
      (*top)--;
    } else if (strcmp("GT", instr) == 0) {
      stack[(*top) - 1] = stack[(*top) - 1] > stack[(*top)] ? 1 : 0 ;
      (*top)--;
    } else if (strcmp("GTE", instr) == 0) {
      stack[(*top) - 1] = stack[(*top) - 1] >= stack[(*top)] ? 1 : 0 ;
      (*top)--;
    } else if (strcmp("EQ", instr) == 0){
      stack[(*top) - 1] = stack[(*top) - 1] == stack[*top];
      (*top)--;
    } else if (strcmp("DIFF", instr) == 0){
      stack[(*top) - 1] = stack[(*top) - 1] != stack[*top];
      (*top)--;
    } else if (strcmp("LT", instr) == 0){
      stack[(*top) - 1] = stack[(*top) - 1] < stack[*top];
      (*top)--;
    } else if (strcmp("NOT", instr) == 0) {
      stack[(*top)] = stack[*top] ? 0 : 1;
    } else if (strcmp("AND", instr) == 0) {
      stack[(*top) - 1] = stack[(*top) - 1] && stack[*top] ? 1 : 0;
      (*top)--;
    } else if (strcmp("OR", instr) == 0) {
      stack[(*top) - 1] = stack[(*top) - 1] || stack[*top] ? 1 : 0;
      (*top)--;
    } else if (strcmp("DUP", instr) == 0) {
      (*top)++;
      stack[(*top)] = stack[(*top) - 1];
    } else if (strcmp("POP", instr) == 0) {
      (*top)--;
    } else if (strncmp("GET:", instr, 4) == 0) {
      int num = instr[4] - '0';
      if (num < MAX_VAR) {
        (*top)++;
        stack[(*top)] = var[num];
      }
    } else if (strncmp("SET:", instr, 4) == 0) {
      int num = instr[4] - '0';
      if (num < MAX_VAR) {
        var[num] = stack[(*top)];
        (*top)--;
      }
    } else {
      char numeral[strlen(instr)];
      strcpy(numeral, instr);
      float value;
      sscanf(numeral, "%f", &value);
      if (*top < MAX_STACK) {
        (*top)++;
        stack[*top] = value;
      }
    }
    *pos += 1;
  }
}

void printStack(double stack[], int top, double var[]) {
    for (int i = 0; i <= top; i++) {
        printf("%.1f ", stack[i]);
    }
    printf("| ");
    for (int i = 0; i < MAX_VAR; i++) {
        printf("[%i = %.1f] ", i, var[i]);
    }
    printf("\n");
}

void evalCode(char *code[], int codeLength, double stack[], int *top, double var[]) {
  for (int pos = 0; pos < codeLength && pos >= 0; ) {
    eval(code, &pos, stack, top, var);
  }
  printStack(stack, *top, var);
}

int parseLine(char buffer[], char *code[]) {
  char *string, *found;
  int codeLength = 0;
  string = strdup(buffer);
  while ((found = strsep(&string, " ")) != NULL) {
    code[codeLength] = found;
    codeLength++;
  }
  return codeLength;
}

int main() {
  char *token;
  char buffer[MAX_INPUT];
  char *code[MAX_CODE];
  int codeLength = 0;
  double stack[MAX_STACK];
  double var[MAX_VAR] =  { [0 ... (MAX_VAR - 1)] = NAN };
  int top = (-1);
	while (1) {
    if (fgets(buffer, MAX_INPUT, stdin) == NULL || strcmp(buffer, "\n") == 0) {
      break;
    }
    buffer[strcspn(buffer, "\n")] = 0; // Remove end-of-line
    codeLength = parseLine(buffer, code);
    evalCode(code, codeLength, stack, &top, var);
	}
  return 0; // Fin
}
