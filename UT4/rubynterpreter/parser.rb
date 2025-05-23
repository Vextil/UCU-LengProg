#
# DO NOT MODIFY!!!!
# This file is automatically generated by Racc 1.6.0
# from Racc grammar file "".
#

require 'racc/parser.rb'


require 'strscan'
require_relative 'expressions'
require_relative 'statements'
require_relative 'factory'

class Lexer
  NUMBER = /\d+(\.\d+)?/
  BOOL = /true|false/
  KEYWORDS = /if|else|while|print/
  ID = /[a-zA-Z_]\w*/
  OPERS = /[-+*\/(){};]|[!=<>]=?|&&|\|\|/
  IGNORE = /(\/\/.*(\n|$)|\s)+/
  
  def initialize(input)
    @ss = StringScanner.new(input)
  end

  def next_token
    @ss.scan(IGNORE)
    return if @ss.eos?
    case
    when text = @ss.scan(NUMBER) then [:NUM, text.to_f]
    when text = @ss.scan(BOOL) then [:BOOL, text == "true"]
    when text = @ss.scan(KEYWORDS) then [text, text]
    when text = @ss.scan(ID) then [:ID, text]
    when text = @ss.scan(OPERS) then [text, text]
    else
      throw :lexer, "Unexpected character #{@ss.getch}!"
    end
  end
end

class Parser < Racc::Parser

module_eval(<<'...end parser.racc/module_eval...', 'parser.racc', 113)

def initialize(factory)
  @factory = factory
end

def next_token
  @lexer.next_token
end

def tokenize_string(input)
  @lexer = Lexer.new(input)
  tokens = []
  while token = @lexer.next_token
    tokens << token
  end
  tokens
end

def parse_string(input)
  @lexer = Lexer.new(input)
  do_parse
end


...end parser.racc/module_eval...
##### State transition tables begin ###

racc_action_table = [
    41,    40,    34,    35,    36,    37,    38,    39,    32,    33,
    30,    31,    41,    40,    34,    35,    36,    37,    38,    39,
     8,    45,    41,    40,    34,    35,    36,    37,    38,    39,
    32,    33,    30,    31,    41,    40,    34,    35,    36,    37,
    38,    39,     9,    46,    41,    40,    34,    35,    36,    37,
    38,    39,    32,    33,    30,    31,    41,    40,   -29,   -29,
   -29,   -29,   -29,   -29,    13,    47,    41,    40,    34,    35,
    36,    37,    38,    39,    32,    33,    30,    31,    41,    40,
   -29,   -29,   -29,   -29,   -29,   -29,    14,    60,    41,    40,
    34,    35,    36,    37,    38,    39,    32,    33,    30,    31,
    21,    15,    22,    18,    29,    16,    63,    41,    21,    23,
    22,    18,    64,   nil,    19,    20,    21,    23,    22,    18,
   nil,   nil,    19,    20,    21,    23,    22,    18,   nil,   nil,
    19,    20,    21,    23,    22,    18,   nil,   nil,    19,    20,
    21,    23,    22,    18,   nil,   nil,    19,    20,    21,    23,
    22,    18,   nil,   nil,    19,    20,    21,    23,    22,    18,
   nil,   nil,    19,    20,    21,    23,    22,    18,   nil,   nil,
    19,    20,    21,    23,    22,    18,   nil,   nil,    19,    20,
    21,    23,    22,    18,   nil,   nil,    19,    20,    21,    23,
    22,    18,   nil,   nil,    19,    20,    21,    23,    22,    18,
   nil,   nil,    19,    20,    21,    23,    22,    18,   nil,   nil,
    19,    20,    21,    23,    22,    18,   nil,   nil,    19,    20,
    21,    23,    22,    18,   nil,   nil,    19,    20,    21,    23,
    22,    18,   nil,   nil,    19,    20,    21,    23,    22,    18,
   nil,   nil,    19,    20,    21,    23,    22,    18,   nil,   nil,
    19,    20,   nil,    23,   nil,   nil,   nil,   nil,    19,    20,
    41,    40,    34,    35,    36,    37,    38,    39,    32,    33,
    30,    31,    41,    40,    34,    35,    36,    37,    38,    39,
    32,    33,    30,    31,     3,   nil,   nil,     4,   nil,     5,
   nil,   nil,     3,     6,     7,     4,    11,     5,   nil,   nil,
     3,     6,     7,     4,    24,     5,   nil,   nil,     3,     6,
     7,     4,   nil,     5,   nil,   nil,     3,     6,     7,     4,
   nil,     5,   nil,   nil,     3,     6,     7,     4,   nil,     5,
   nil,   nil,   nil,     6,     7,    41,    40,    34,    35,    36,
    37,    38,    39,    32,    33,    41,    40,    34,    35,    36,
    37,    38,    39,    32,    33,    41,    40,   -29,   -29,   -29,
   -29,   -29,   -29,    41,    40,   -29,   -29,   -29,   -29,   -29,
   -29,    41,    40,   -29,   -29,   -29,   -29,   -29,   -29,    41,
    40,   -29,   -29,   -29,   -29,   -29,   -29 ]

racc_action_check = [
    26,    26,    26,    26,    26,    26,    26,    26,    26,    26,
    26,    26,    50,    50,    50,    50,    50,    50,    50,    50,
     1,    26,    27,    27,    27,    27,    27,    27,    27,    27,
    27,    27,    27,    27,    51,    51,    51,    51,    51,    51,
    51,    51,     3,    27,    28,    28,    28,    28,    28,    28,
    28,    28,    28,    28,    28,    28,    52,    52,    52,    52,
    52,    52,    52,    52,     5,    28,    44,    44,    44,    44,
    44,    44,    44,    44,    44,    44,    44,    44,    53,    53,
    53,    53,    53,    53,    53,    53,     6,    44,    17,    17,
    17,    17,    17,    17,    17,    17,    17,    17,    17,    17,
     9,     7,     9,     9,    17,     8,    47,    58,    13,     9,
    13,    13,    61,   nil,     9,     9,    14,    13,    14,    14,
   nil,   nil,    13,    13,    15,    14,    15,    15,   nil,   nil,
    14,    14,    21,    15,    21,    21,   nil,   nil,    15,    15,
    22,    21,    22,    22,   nil,   nil,    21,    21,    23,    22,
    23,    23,   nil,   nil,    22,    22,    30,    23,    30,    30,
   nil,   nil,    23,    23,    31,    30,    31,    31,   nil,   nil,
    30,    30,    32,    31,    32,    32,   nil,   nil,    31,    31,
    33,    32,    33,    33,   nil,   nil,    32,    32,    34,    33,
    34,    34,   nil,   nil,    33,    33,    35,    34,    35,    35,
   nil,   nil,    34,    34,    36,    35,    36,    36,   nil,   nil,
    35,    35,    37,    36,    37,    37,   nil,   nil,    36,    36,
    38,    37,    38,    38,   nil,   nil,    37,    37,    39,    38,
    39,    39,   nil,   nil,    38,    38,    40,    39,    40,    40,
   nil,   nil,    39,    39,    41,    40,    41,    41,   nil,   nil,
    40,    40,   nil,    41,   nil,   nil,   nil,   nil,    41,    41,
    42,    42,    42,    42,    42,    42,    42,    42,    42,    42,
    42,    42,    43,    43,    43,    43,    43,    43,    43,    43,
    43,    43,    43,    43,     0,   nil,   nil,     0,   nil,     0,
   nil,   nil,     4,     0,     0,     4,     4,     4,   nil,   nil,
    10,     4,     4,    10,    10,    10,   nil,   nil,    45,    10,
    10,    45,   nil,    45,   nil,   nil,    46,    45,    45,    46,
   nil,    46,   nil,   nil,    64,    46,    46,    64,   nil,    64,
   nil,   nil,   nil,    64,    64,    48,    48,    48,    48,    48,
    48,    48,    48,    48,    48,    49,    49,    49,    49,    49,
    49,    49,    49,    49,    49,    54,    54,    54,    54,    54,
    54,    54,    54,    55,    55,    55,    55,    55,    55,    55,
    55,    56,    56,    56,    56,    56,    56,    56,    56,    57,
    57,    57,    57,    57,    57,    57,    57 ]

racc_action_pointer = [
   268,    20,   nil,    25,   276,    42,    64,    79,   105,    87,
   284,   nil,   nil,    95,   103,   111,   nil,    86,   nil,   nil,
   nil,   119,   127,   135,   nil,   nil,    -2,    20,    42,   nil,
   143,   151,   159,   167,   175,   183,   191,   199,   207,   215,
   223,   231,   258,   270,    64,   292,   300,    88,   333,   343,
    10,    32,    54,    76,   353,   361,   369,   377,   105,   nil,
   nil,    88,   nil,   nil,   308,   nil ]

racc_action_default = [
   -29,   -29,    -1,   -29,   -29,   -29,   -29,   -29,   -29,   -29,
   -29,    -4,    -9,   -29,   -29,   -29,    66,   -29,   -11,   -12,
   -13,   -29,   -29,   -29,    -3,   -10,   -29,   -29,   -29,    -2,
   -29,   -29,   -29,   -29,   -29,   -29,   -29,   -29,   -29,   -29,
   -29,   -29,   -14,   -15,   -29,   -29,   -29,   -29,   -16,   -17,
   -18,   -19,   -20,   -21,   -22,   -23,   -24,   -25,   -26,   -27,
   -28,    -6,    -7,    -8,   -29,    -5 ]

racc_goto_table = [
     2,    17,     1,    10,    12,    26,    27,    28,   nil,   nil,
    25,   nil,   nil,    42,    43,    44,   nil,   nil,   nil,   nil,
   nil,   nil,    48,    49,    50,    51,    52,    53,    54,    55,
    56,    57,    58,    59,   nil,   nil,   nil,   nil,   nil,   nil,
   nil,   nil,   nil,   nil,   nil,    61,    62,   nil,   nil,   nil,
   nil,   nil,   nil,   nil,   nil,   nil,   nil,   nil,   nil,   nil,
   nil,   nil,   nil,   nil,    65 ]

racc_goto_check = [
     2,     3,     1,     4,     2,     3,     3,     3,   nil,   nil,
     2,   nil,   nil,     3,     3,     3,   nil,   nil,   nil,   nil,
   nil,   nil,     3,     3,     3,     3,     3,     3,     3,     3,
     3,     3,     3,     3,   nil,   nil,   nil,   nil,   nil,   nil,
   nil,   nil,   nil,   nil,   nil,     2,     2,   nil,   nil,   nil,
   nil,   nil,   nil,   nil,   nil,   nil,   nil,   nil,   nil,   nil,
   nil,   nil,   nil,   nil,     2 ]

racc_goto_pointer = [
   nil,     2,     0,    -8,    -1 ]

racc_goto_default = [
   nil,   nil,   nil,   nil,   nil ]

racc_reduce_table = [
  0, 0, :racc_error,
  1, 30, :_reduce_1,
  4, 31, :_reduce_2,
  3, 31, :_reduce_3,
  2, 31, :_reduce_4,
  7, 31, :_reduce_5,
  5, 31, :_reduce_6,
  5, 31, :_reduce_7,
  5, 31, :_reduce_8,
  1, 33, :_reduce_9,
  2, 33, :_reduce_10,
  1, 32, :_reduce_11,
  1, 32, :_reduce_12,
  1, 32, :_reduce_13,
  2, 32, :_reduce_14,
  2, 32, :_reduce_15,
  3, 32, :_reduce_16,
  3, 32, :_reduce_17,
  3, 32, :_reduce_18,
  3, 32, :_reduce_19,
  3, 32, :_reduce_20,
  3, 32, :_reduce_21,
  3, 32, :_reduce_22,
  3, 32, :_reduce_23,
  3, 32, :_reduce_24,
  3, 32, :_reduce_25,
  3, 32, :_reduce_26,
  3, 32, :_reduce_27,
  3, 32, :_reduce_28 ]

racc_reduce_n = 29

racc_shift_n = 66

racc_token_table = {
  false => 0,
  :error => 1,
  "||" => 2,
  "&&" => 3,
  "==" => 4,
  "!=" => 5,
  "<" => 6,
  "<=" => 7,
  ">" => 8,
  ">=" => 9,
  "*" => 10,
  "/" => 11,
  "+" => 12,
  "-" => 13,
  :UMINUS => 14,
  "!" => 15,
  :ID => 16,
  "=" => 17,
  ";" => 18,
  "{" => 19,
  "}" => 20,
  "if" => 21,
  "(" => 22,
  ")" => 23,
  "else" => 24,
  "while" => 25,
  "print" => 26,
  :NUM => 27,
  :BOOL => 28 }

racc_nt_base = 29

racc_use_result_var = false

Racc_arg = [
  racc_action_table,
  racc_action_check,
  racc_action_default,
  racc_action_pointer,
  racc_goto_table,
  racc_goto_check,
  racc_goto_default,
  racc_goto_pointer,
  racc_nt_base,
  racc_reduce_table,
  racc_token_table,
  racc_shift_n,
  racc_reduce_n,
  racc_use_result_var ]

Racc_token_to_s_table = [
  "$end",
  "error",
  "\"||\"",
  "\"&&\"",
  "\"==\"",
  "\"!=\"",
  "\"<\"",
  "\"<=\"",
  "\">\"",
  "\">=\"",
  "\"*\"",
  "\"/\"",
  "\"+\"",
  "\"-\"",
  "UMINUS",
  "\"!\"",
  "ID",
  "\"=\"",
  "\";\"",
  "\"{\"",
  "\"}\"",
  "\"if\"",
  "\"(\"",
  "\")\"",
  "\"else\"",
  "\"while\"",
  "\"print\"",
  "NUM",
  "BOOL",
  "$start",
  "target",
  "stmt",
  "exp",
  "stmts" ]

Racc_debug_parser = false

##### State transition tables end #####

# reduce 0 omitted

module_eval(<<'.,.,', 'parser.racc', 16)
  def _reduce_1(val, _values)
     val[0]
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 20)
  def _reduce_2(val, _values)
    @factory.newAssignment(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 22)
  def _reduce_3(val, _values)
    @factory.newBlock(val[1])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 24)
  def _reduce_4(val, _values)
     @factory.newBlock()
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 26)
  def _reduce_5(val, _values)
    @factory.newIfThenElse(val[2], val[4], val[6])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 28)
  def _reduce_6(val, _values)
    @factory.newIfThenElse(val[2], val[4], nil)
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 30)
  def _reduce_7(val, _values)
    @factory.newWhileDo(val[2], val[4])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 32)
  def _reduce_8(val, _values)
    @factory.newPrintStmt(val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 35)
  def _reduce_9(val, _values)
     [val[0]]
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 37)
  def _reduce_10(val, _values)
     val[0] << val[1]
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 40)
  def _reduce_11(val, _values)
    @factory.newVariableExp(val[0])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 42)
  def _reduce_12(val, _values)
    @factory.newNumeral(val[0])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 44)
  def _reduce_13(val, _values)
    @factory.newTruthValue(val)
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 46)
  def _reduce_14(val, _values)
    @factory.newMinus(val[1])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 48)
  def _reduce_15(val, _values)
    @factory.newNegation(val[1])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 50)
  def _reduce_16(val, _values)
    @factory.newAddition(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 52)
  def _reduce_17(val, _values)
    @factory.newSubtraction(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 54)
  def _reduce_18(val, _values)
    @factory.newMultiplication(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 56)
  def _reduce_19(val, _values)
    @factory.newDivision(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 58)
  def _reduce_20(val, _values)
    @factory.newComparisonEqual(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 60)
  def _reduce_21(val, _values)
    @factory.newComparisonDifferent(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 62)
  def _reduce_22(val, _values)
    @factory.newComparisonLessThan(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 64)
  def _reduce_23(val, _values)
    @factory.newComparisonLessThanOrEqual(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 66)
  def _reduce_24(val, _values)
    @factory.newComparisonGreaterThan(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 68)
  def _reduce_25(val, _values)
    @factory.newComparisonGreaterThanOrEqual(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 70)
  def _reduce_26(val, _values)
     @factory.newLogicalAnd(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 72)
  def _reduce_27(val, _values)
     @factory.newLogicalOr(val[0], val[2])
  end
.,.,

module_eval(<<'.,.,', 'parser.racc', 74)
  def _reduce_28(val, _values)
     val[1]
  end
.,.,

def _reduce_none(val, _values)
  val[0]
end

end   # class Parser


