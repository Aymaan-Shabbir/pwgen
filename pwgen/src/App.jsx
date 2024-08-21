import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numsY, setNumsY] = useState(false);
  const [charY, setCharY] = useState(false);
  const [password, setPassword] = useState("");
  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numsY) str += "0123456789";
    if (charY) str += "!@#$%^&*+-=_{}[]~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numsY, charY, setPassword]);

  const copyPasswordToClipbpard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numsY, charY, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-20 text-orange-500 bg-gray-800 text-2xl sm:text-xl sm:px-2 sm:my-10 sm:flex sm:justify-center sm:flex-col md:px-6 md:my-12 sm:overflow-hidden">
        <h1 className="m-3 text-4xl text-center text-white font-mono">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipbpard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-lg p-2">Length:{length}</label>
          </div>
          <div className="flex items-centergap-x-1">
            <input
              type="checkbox"
              defaultChecked={numsY}
              id="numberInput"
              className="outline-none w-full py-1 px-3"
              onChange={() => {
                setNumsY((prev) => !prev);
              }}
            />
            <label className="text-lg p-2">Numbers</label>
          </div>
          <div className="flex items-centergap-x-1">
            <input
              type="checkbox"
              defaultChecked={charY}
              id="characterInput"
              className="outline-none w-full py-1 px-3"
              onChange={() => {
                setCharY((prev) => !prev);
              }}
            />
            <label className="text-lg p-2">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
