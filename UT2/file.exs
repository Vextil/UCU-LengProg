defmodule UT2 do

  def randomStr(n, chars) when n == 0 and chars == '' do
    ""
  end

  def randomStr(n, chars) when n > 0 and chars == '' do
    "error"
  end

  def randomStr(n, chars) do
    for _ <- 1..n, into: "", do: <<Enum.random(chars)>>
  end

end

IO.puts(UT2.randomStr(0, ''))
IO.puts(UT2.randomStr(5, ''))
IO.puts(UT2.randomStr(1, 'abc'))
IO.puts(UT2.randomStr(4, 'abc'))
IO.puts(UT2.randomStr(4, 'abcdef'))
