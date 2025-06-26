import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../Redux/counterSlice";

export function Counter(){
  
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <>
    <h1>Count:{count}</h1>
    <button onClick={()=> dispatch(increment())}>+</button>
    <button onClick={()=> dispatch(decrement())}>-</button>
    <button onClick={()=> dispatch(reset())}>Reset</button>
    </>
  );


}