require_relative 'expressions'
require_relative 'statements'
require_relative 'parser'

puts "Welcome to Rubynterpreter."
puts "Finish your code with an empty line to process it."
puts ""
parser = Parser.new
input = []
state = {}
ARGF.each do |line|
  if (line.strip().empty?)
    ast = parser.parse_string(input.join('\n'))
    puts ast
    ast.evaluate(state)
    input = []
  else
    input << line
  end
end
