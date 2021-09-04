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

# IO.puts(UT2.randomStr(0, ''))
# IO.puts(UT2.randomStr(5, ''))
# IO.puts(UT2.randomStr(1, 'abc'))
# IO.puts(UT2.randomStr(4, 'abc'))
# IO.puts(UT2.randomStr(4, 'abcdef'))


defmodule JSON do

  def stringify(n) do
    case n do
      {:null} -> "null"
      {:bool, val} -> inspect(val)
      {:number, val} -> inspect(val)
      {:string, val} -> inspect(val)
      {:array, val} -> "[" <> Enum.join(Enum.map(val, fn x -> JSON.stringify(x) end), ", ") <> "]"
      {:object, val} -> "{" <> Enum.join(Enum.map(val, fn x -> JSON.stringify(x) end), ", ") <> "}"
      {var, val} -> var <> ": " <> JSON.stringify(val)
      _ -> "otro"
    end
  end

end

nums = Enum.map([1,2,3], &({:number, &1}))
fields = Enum.zip(["x", "y"], [bool: true, bool: false])

IO.puts(JSON.stringify({:null}))
IO.puts(JSON.stringify({:bool, false}))
IO.puts(JSON.stringify({:number, -12.34}))
IO.puts(JSON.stringify({:string, "This string."}))
IO.puts(JSON.stringify({:array, [{:null}, {:bool, false}]})) # [null, false]
IO.puts(JSON.stringify(nums))
IO.puts(JSON.stringify({:object, fields}))
IO.puts(JSON.stringify({:object, [
                        {"x", {:number, 1}},
                        {"y", {:array, []}},
                        {"z", {:object, [
                          {"x", {:number, 1}},
                          {"y", {:array, [{:null}, {:bool, false}]}}
                        ]}}
                      ]}))
