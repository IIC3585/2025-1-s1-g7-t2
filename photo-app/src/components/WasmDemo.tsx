import { useEffect, useState } from 'react';
import init, { greet, fibonacci } from '../../wasm-lib/pkg/wasm_lib';

function WasmDemo() {
  const [greeting, setGreeting] = useState<string>('');
  const [fibResult, setFibResult] = useState<number>(0);

  useEffect(() => {
    const loadWasm = async () => {
      await init();
      setGreeting(greet('World'));
      setFibResult(fibonacci(10));
    };
    loadWasm();
  }, []);

  return (
    <div className="wasm-demo">
      <h1>{greeting}</h1>
      <p>Fibonacci(10) = {fibResult}</p>
    </div>
  );
}

export default WasmDemo;