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

% Este hack no está permitido.
% propEval(Z(X,Y),A,R) :- propEval(X,A,R1), propEval(Y,A,R2), truthTable(Z(R1,R2),R). 

propEval(and(X,Y),A,R) :- propEval(X,A,R1), propEval(Y,A,R2), truthTable(and(R1,R2),R). 

propEval(or(X,Y),A,R) :- propEval(X,A,R1), propEval(Y,A,R2), truthTable(or(R1,R2),R). 

propEval(cond(X,Y),A,R) :- propEval(X,A,R1), propEval(Y,A,R2), truthTable(cond(R1,R2),R).

propEval(iff(X,Y),A,R) :- propEval(X,A,R1), propEval(Y,A,R2), truthTable(iff(R1,R2),R). 

propEval(const(true),_,true).
propEval(const(false),_,false).

propEval(var(X), A, V) :- get_assoc(X, A, V).

% ==========================================================================================
% EJERCICIO 3 - VARIABLES LIBRES

:- use_module(library(lists)).

free_vars(const(true), []).
free_vars(const(false), []).

free_vars(var(X), [X]).
free_vars(not(P), Vs) :- free_vars(P, Vs).

free_vars(and(X,Y), Vs) :- free_vars(X, V1), free_vars(Y, V2), union(V1,V2,Vs).
free_vars(or(X,Y), Vs) :- free_vars(X, V1), free_vars(Y, V2), union(V1,V2,Vs).
free_vars(cond(X,Y), Vs) :- free_vars(X, V1), free_vars(Y, V2), union(V1,V2,Vs).
free_vars(iff(X,Y), Vs) :- free_vars(X, V1), free_vars(Y, V2), union(V1,V2,Vs).

% ==========================================================================================
% EJERCICIO 4 - ASIGNACIÓN DE VARIABLES

possible_assign([],X) :- empty_assoc(X).
possible_assign([H | T],Y) :- possible_assign(T, A1), member(V, [true, false]), put_assoc(H, A1, V, Y).

% put assoc (Var,A1,Value,A) : comprueba que A1 forma parte de A, y que Var tiene el valor Value en A.

% ==========================================================================================
% EJERCICIO 5 - UNIFICACIÓN DE PROPOSICIONES
% unifica una proposicion con una de sus posibles evaluaciones
% possible_eval/2

possible_eval(P, E) :- free_vars(P,A),  possible_assign(A, A2), propEval(P, A2, E).

% ==========================================================================================
% EJERCICIO 6 - CLASES DE PROPOSICIONES

is_tautology(Prop) :- propEval(Prop, A, R), findall(A, possible_assign(["p"], A), R), member(R, [true]).
% is_tautology(Prop) :- propEval(Prop, A, R), member(R, [true]).

% is_contradiction() :- .
% is_contingency(Prop) :- .