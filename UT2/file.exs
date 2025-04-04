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
      {:object, val} -> "{" <> Enum.join(Enum.map(val, fn {x, y} -> x <> ": " <> JSON.stringify(y) end), ", ") <> "}"
    end
  end

  def randomGeneratorHeightOne(randomN,width) do
    case randomN do
      0 -> {:null}
      1 -> {:bool, Enum.random([true, false])} #BOOL
      2 -> {:number, Enum.random(1..100)} # NUMBER
      3 -> {:string, UT2.randomStr(Enum.random(1..9), 'abcdefghijklmnñopqrstuvwxyz')} # STRING
      4 -> {:array, 1..width |> Enum.map(fn _ -> randomGeneratorHeightOne(Enum.random(0..3),0) end)}
    end
  end

  def randomGeneratorHeightN(altura,ancho) do
    n = Enum.random([0,1])
    case n do
      0 -> {:array, 1..ancho |> Enum.map(fn _ -> random(altura-1,ancho) end)}
      1 -> {:object, 1..ancho |> Enum.map(fn _ -> {UT2.randomStr(Enum.random(1..9), 'abcdefghijklmnñopqrstuvwxyz'), random(altura-1, ancho)} end)}
    end
  end


  def random(altura,ancho) do
      case altura do
        0 -> randomGeneratorHeightOne(0,0)
        1 -> randomGeneratorHeightOne(Enum.random(0..4),ancho)
        _ -> randomGeneratorHeightN(altura,ancho)
      end
  end


end

defmodule CalcProp do
  def eval(prop, asignacion) do
    asig = %{"p" => true, "q" => false}

    case prop do
      {:const, val} -> val
      {:var, val} -> asig[val]
      {:neg, val} -> !eval(val, asignacion)
      {:and, a, b} -> eval(a, asignacion) and eval(b, asignacion)
      {:or, a, b} -> eval(a, asignacion) or eval(b, asignacion)
      {:cond, a, b} -> !eval(a, asignacion) or eval(b, asignacion)
      {:iff, a, b} -> eval(a, asignacion) == eval(b, asignacion)
      end
  end

end

# asig = %{"p" => true, "q" => false}
# IO.puts(CalcProp.eval({:const, true}, asig))
# IO.puts(CalcProp.eval({:var, "q"}, asig))
# IO.puts(CalcProp.eval({:neg, {:var, "q"}}, asig))
# IO.puts(CalcProp.eval({:and, {:var, "q"}, {:const, true}}, asig))
# IO.puts(CalcProp.eval({:or, {:var, "p"}, {:const, false}}, asig))
# IO.puts(CalcProp.eval({:iff, {:var, "p"}, {:const, true}}, asig))

# nums = Enum.map([1,2,3], &({:number, &1}))
# fields = Enum.zip(["x", "y"], [bool: true, bool: false])

# IO.puts(JSON.stringify({:null}))
# IO.puts(JSON.stringify({:bool, false}))
# IO.puts(JSON.stringify({:number, -12.34}))
# IO.puts(JSON.stringify({:string, "This string."}))
# IO.puts(JSON.stringify({:array, [{:null}, {:bool, false}]})) # [null, false]
# IO.puts(JSON.stringify({:array, nums}))
# IO.puts(JSON.stringify({:object, fields}))
# IO.puts(JSON.stringify({:object, [
#                         {"x", {:number, 1}},
#                         {"y", {:array, []}},
#                         {"z", {:object, [
#                           {"x", {:number, 1}},
#                           {"y", {:array, [{:null}, {:bool, false}]}}
#                         ]}}
#                       ]}))



# (IO.inspect(JSON.random(0,0)))
# (IO.inspect(JSON.random(1,3)))
# (IO.inspect(JSON.random(1,3)))
# (IO.inspect(JSON.random(1,3)))
# (IO.inspect(JSON.random(2,1)))
# (IO.inspect(JSON.random(3,2)))
# (IO.inspect(JSON.random(3,2)))
# (IO.inspect(JSON.random(2,4)))
