% ==========================================================================================
% EJERCICIO 1 - TABLAS DE VERDAD

% NOT
truthTable(not(true), false). 
truthTable(not(false), true).

% AND
truthTable(and(false,false), false). 
truthTable(and(true,false), false). 
truthTable(and(false,true), false). 
truthTable(and(true,true), true). 

% OR
truthTable(or(false,false), false).
truthTable(or(true,false), true).
truthTable(or(false,true), true).
truthTable(or(true,true), true).

% COND
truthTable(cond(true, false), false).
truthTable(cond(true, true), true).
truthTable(cond(false, false), true).
truthTable(cond(false, true), true).

% IFF
truthTable(iff(true, true), true).
truthTable(iff(false, false), true).
truthTable(iff(true, false), false).
truthTable(iff(false, true), false).


% ==========================================================================================
% EJERCICIO 2 - CÁLCULO PROPOSICIONAL

:- use_module(library(assoc)).

assign(A) :- list_to_assoc(["t" - true, "f" - false], A).

propEval(not(X),A,R) :- propEval(X,A,R1), truthTable(not(R1),R). 

propEval(and(X,Y),A,R) :- propEval(X,A,R1), propEval(Y,A,R2), truthTable(and(R1,R2),R). 

propEval(or(X,Y),A,R) :- propEval(X,A,R1), propEval(Y,A,R2), truthTable(or(R1,R2),R). 

propEval(cond(X,Y),A,R) :- propEval(X,A,R1), propEval(Y,A,R2), truthTable(cond(R1,R2),R).

propEval(iff(X,Y),A,R) :- propEval(X,A,R1), propEval(Y,A,R2), truthTable(iff(R1,R2),R). 

propEval(const(true),_,true).
propEval(const(false),_,false).

propEval(var(X), A, V) :- get_assoc(X, A, V).
