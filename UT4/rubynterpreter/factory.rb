require_relative 'expressions'
require_relative 'statements'

class Factory 

    def initialize
        @numerales = [
            Numeral.new(0),
            Numeral.new(1),
            Numeral.new(2),
            Numeral.new(3),
            Numeral.new(4),
            Numeral.new(5),
            Numeral.new(6),
            Numeral.new(7),
            Numeral.new(8),
            Numeral.new(9),
            Numeral.new(10)
        ]
    end

    def newVariableExp(identifier)
        VariableExp.new(identifier)
    end

    def newNumeral(value)
        if value >= 0 && value <= 10
            @numerales[value]
        else
            Numeral.new(value)
        end
    end

    def newMinus(right)
        Minus.new(right)
    end

    def newAddition(left, right)
        Addition.new(left, right)
    end

    def newSubstraction(left, right)
        Substraction.new(left, right)
    end

    def newMultiplication(left, right)
        Multiplicaction.new(left, right)
    end

    def newDivision(left, right)
        Division.new(left, right)
    end

    def newComparisonEqual(left, right)
        ComparisonEqual.new(left, right)
    end
    
    def newComparisonLessThan(left, right)
        ComparisonLessThan.new(left, right)
    end

    def newComparisonLessThanOrEqual(left, right)
        ComparisonLessThanOrEqual.new(left, right)
    end

    def newComparisonGreaterThan(left, right)
        ComparisonGreaterThan.new(left, right)
    end

    def newComparisonGreaterThanOrEqual(left, right)
        ComparisonGreaterThanOrEqual.new(left, right)
    end

    def newTruthValue(value)
        if value
            TruthValue.true
        else
            TruthValue.false
        end
    end

    def newNegation(value)
        if value
            TruthValue.false
        else
            TruthValue.true
        end
    end

    def newLogicalAnd(left, right)
        LogicalAnd.new(left, right)
    end

    def newLogicalOr(left, right)
        LogicalOr.new(left, right)
    end
            
        
    #statements
    def newAssignment(identifier, expression)
        Assignment.new(identifier, expression)
    end
    
    def newBlock(array)
        Block.new(array)
    end
    
    def newIfThenElse(condicionIf, bodyIf, bodyElseIf=nil)
        IfThenElse.new(condicionIf, bodyIf, bodyElseIf)
    end

    def newWhileDo(condition, body)
        WhileDo.new(condition, body)
    end
    
    def newPrintStmt(expression)
        PrintStmt.new(expression)
    end
    
end