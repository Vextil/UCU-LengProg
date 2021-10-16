require_relative 'expressions'
require_relative 'statements'
require_relative 'parser'

## NOTAS
## La salida de este programa muestra el unparse generado por la expresión o la sentencia, y luego
## la evaluación realizada con el método evaluate correspondiente.

val_true = TruthValue.new(true)
val_false = TruthValue.new(false)
numero1 = Numeral.new(1)
numero2 = Numeral.new(2)
numero3 = Numeral.new(3)
numero4 = Numeral.new(4)
numero5 = Numeral.new(5)
str_num1 = "1"

###### EXPRESSIONS #####

# Numeral
str_num = Numeral.new(str_num1)
puts str_num.unparse
puts str_num.evaluate

# Minus
negativo = Minus.new(numero1)
puts negativo.unparse
puts negativo.evaluate

# Suma
sumaNumeros = Addition.new(numero1, numero2)
puts sumaNumeros.unparse
puts sumaNumeros.evaluate

# Resta
resta = Subtraction.new(numero3, numero2)
puts resta.unparse
puts resta.evaluate
resta = Subtraction.new(numero1, numero2)
puts resta.unparse
puts resta.evaluate
resta = Subtraction.new(numero1, numero1)
puts resta.unparse
puts resta.evaluate

# Multiplicación
mult = Multiplication.new(numero1, numero2)
puts mult.unparse
puts mult.evaluate

# Division
division = Division.new(numero4, numero1)
puts division.unparse
puts division.evaluate
division = Division.new(numero4, numero2)
puts division.unparse
puts division.evaluate
division = Division.new(numero2, numero4)
puts division.unparse
puts division.evaluate

# ComparisonEqual
comp = ComparisonEqual.new(numero1, numero1)
puts comp.unparse
puts comp.evaluate
comp = ComparisonEqual.new(numero1, numero2)
puts comp.unparse
puts comp.evaluate

# ComparisonDifferent
comp = ComparisonDifferent.new(numero1, numero1)
puts comp.unparse
puts comp.evaluate
comp = ComparisonDifferent.new(numero1, numero2)
puts comp.unparse
puts comp.evaluate

# ComparisonLessThan
comp = ComparisonLessThan.new(numero1, numero1)
puts comp.unparse
puts comp.evaluate
comp = ComparisonLessThan.new(numero1, numero2)
puts comp.unparse
puts comp.evaluate
comp = ComparisonLessThan.new(numero2, numero1)
puts comp.unparse
puts comp.evaluate

# ComparisonLessThanOrEqual
comp = ComparisonLessThanOrEqual.new(numero1, numero1)
puts comp.unparse
puts comp.evaluate
comp = ComparisonLessThanOrEqual.new(numero1, numero2)
puts comp.unparse
puts comp.evaluate
comp = ComparisonLessThanOrEqual.new(numero2, numero1)
puts comp.unparse
puts comp.evaluate

# ComparisonGreaterThan
comp = ComparisonGreaterThan.new(numero1, numero1)
puts comp.unparse
puts comp.evaluate
comp = ComparisonGreaterThan.new(numero1, numero2)
puts comp.unparse
puts comp.evaluate
comp = ComparisonGreaterThan.new(numero2, numero1)
puts comp.unparse
puts comp.evaluate

# ComparisonGreaterThanOrEqual
comp = ComparisonGreaterThanOrEqual.new(numero1, numero1)
puts comp.unparse
puts comp.evaluate
comp = ComparisonGreaterThanOrEqual.new(numero1, numero2)
puts comp.unparse
puts comp.evaluate
comp = ComparisonGreaterThanOrEqual.new(numero2, numero1)
puts comp.unparse
puts comp.evaluate

# TruthValue
truth = TruthValue.new(true)
puts truth.unparse
puts truth.evaluate
truth = TruthValue.new(false)
puts truth.unparse
puts truth.evaluate 

# Negation
neg = Negation.new(val_true)
puts neg.unparse
puts neg.evaluate
neg = Negation.new(val_false)
puts neg.unparse
puts neg.evaluate

# And
evaluacionAnd = LogicalAnd.new(TruthValue.new(true), TruthValue.new(false))
puts evaluacionAnd.unparse
puts evaluacionAnd.evaluate

evaluacionAnd = LogicalAnd.new(TruthValue.new(true), TruthValue.new(true))
puts evaluacionAnd.unparse
puts evaluacionAnd.evaluate

# Or
evaluacionOr = LogicalOr.new(TruthValue.new(true), TruthValue.new(false))
puts evaluacionOr.unparse
puts evaluacionOr.evaluate

evaluacionOr = LogicalOr.new(TruthValue.new(false), TruthValue.new(false))
puts evaluacionOr.unparse
puts evaluacionOr.evaluate


##### STATEMENTS #####

# Assignment
assign = Assignment.new("assign", numero1)
puts assign.unparse
puts assign.evaluate

# Block
bloque = Block.new([Assignment.new("x", numero1), Assignment.new("y", numero2), Addition.new(VariableExp.new("x"), VariableExp.new("y"))])
puts bloque.unparse
puts bloque.evaluate
# bloque = Block.new("{ x = 1; y = 2; x - y;}")
# puts bloque.unparse
# puts bloque.evaluate
# bloque = Block.new("{ x = 1; y = 2; x * y;}")
# puts bloque.unparse
# puts bloque.evaluate
# bloque = Block.new("{ x = 1; y = 2; x / y;}")
# puts bloque.unparse
# puts bloque.evaluate


# IfThenElse
condicionIf = ComparisonGreaterThanOrEqual.new(numero2, numero3)
bodyIf = TruthValue.new(true)
bodyElseIf = TruthValue.new(false)
sentenciaIf = IfThenElse.new(condicionIf, bodyIf, bodyElseIf)
puts sentenciaIf.unparse
puts sentenciaIf.evaluate

# WhileDo

aux = Assignment.new("aux", numero3)
condicionWhile = ComparisonGreaterThanOrEqual.new(aux, numero5)
bodyWhile = Assignment.new("aux", Addition.new(aux, numero1))
sentenciaWhile = WhileDo.new(condicionWhile, bodyWhile)
puts sentenciaWhile.unparse
puts sentenciaWhile.evaluate

# PrintStmt
hello = PrintStmt.new(Addition.new(numero1, numero2))
puts hello.unparse
puts hello.evaluate