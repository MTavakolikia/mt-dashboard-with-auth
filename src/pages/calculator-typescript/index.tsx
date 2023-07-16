import React, { useState, useRef } from "react";

const CalculatorTypescript = () => {
  const numberARef = useRef<HTMLInputElement | null>(null);
  const numberBRef = useRef<HTMLInputElement | null>(null);

  const [result, setResult] = useState<number | null>(null);


  const calculate = (type:string) => {
    const a = parseInt(numberARef.current?.value!);
    const b = parseInt(numberBRef.current?.value!);
    let temp = `${a}${type}${b}`; // => 80+20
    setResult(eval(temp));
  };

  const clearForm = () => {
    numberARef.current!.value = "";
    numberBRef.current!.value = "";
    numberARef.current?.focus();
    setResult(null);
  };

  // const changeNumberA = (event) => {
  //   alert(event.target.value);
  // }
  return (
    <>
      <div>
        <h3>Calculator with Typescript</h3>
        {/* Number A : <input onChange={changeNumberA}/> */}
        {/* Number A : <input onChange={(event) => changeNumberA(event)}/> */}
        Number A : <input ref={numberARef} />
      </div>
      <div>
        Number B : <input ref={numberBRef} />
      </div>
      <div>
        {/* <button className="btn-custom" onClick={() => alert("salam")}>+</button> */}
        {/* <button className="btn-custom" onClick={calculate}>-</button> */}
        {/* <button className="btn-custom" onClick={() => calculate("aleyk")}>-</button> */}
        <button className="btn-custom" onClick={() => calculate("+")}>
          +
        </button>
        <button className="btn-custom" onClick={() => calculate("-")}>
          -
        </button>
        <button className="btn-custom" onClick={() => calculate("*")}>
          *
        </button>
        <button className="btn-custom" onClick={() => calculate("/")}>
          /
        </button>
        <button className="btn-custom" onClick={clearForm}>
          clear
        </button>
      </div>
      <div>
        Result : <b>{result}</b>
      </div>
    </>
  );
};

export default CalculatorTypescript;
