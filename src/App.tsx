import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [digit, setDigit] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [base, setBase] = useState(10);

  const [value, setValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.value.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
    e.currentTarget.value.match("^[0-9a-fA-F]+$") === null
      ? setIsInvalid(true)
      : setIsInvalid(false);
    setValue(e.currentTarget.value);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setBase(Number(e.currentTarget.value));
  };

  useEffect(() => {
    setDigit(Number(value).toString(base));
  }, [digit, value, base]);

  return (
    <div>
      <h1>DigiConvert</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label>
          <p>Choose an option</p>
          <select value={base} onChange={handleSelectChange}>
            <option value="2">Binary</option>
            <option value="8">Octal</option>
            <option value="10">Decimal</option>
            <option value="16">Hexadecimal</option>
          </select>
        </label>
        <input
          type="text"
          pattern="^[0-9a-fA-F]+$"
          name="digit"
          title="numbers or hexadecimal characters"
          onChange={handleInputChange}
        />
      </form>
      <div className="card">
        <p>digit is {isEmpty ? "empty" : !isInvalid ? digit : "invalid"}</p>
      </div>
      <small>
        by <a href="https://github.com/dkeithdj">@denrei</a>
      </small>
    </div>
  );
}

export default App;
