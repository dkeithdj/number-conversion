import React, { useEffect, useState } from "react";

const ToAnyBase = () => {
  const [digits, setDigits] = useState({
    "0b": "",
    "0o": "",
    "0": "",
    "0x": "",
  });
  const [isInvalid, setIsInvalid] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [base, setBase] = useState("0");

  const [value, setValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.value.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
    e.currentTarget.value.match("^[0-9a-fA-F]+$") === null
      ? setIsInvalid(true)
      : setIsInvalid(false);
    if (base === "0b" && e.currentTarget.value.match("[^0-1]+$") !== null) {
      setIsInvalid(true);
    } else if (
      base === "0o" &&
      e.currentTarget.value.match("[^0-7]+$") !== null
    ) {
      setIsInvalid(true);
    } else if (
      base === "0" &&
      e.currentTarget.value.match("[^0-9]+$") !== null
    ) {
      setIsInvalid(true);
    } else if (
      base === "0x" &&
      e.currentTarget.value.match("[^0-9a-fA-F]+$") !== null
    ) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }

    setValue(e.currentTarget.value);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setValue("");
    setIsEmpty(true);
    setBase(e.currentTarget.value);
  };

  useEffect(() => {
    setDigits({
      "0b": Number(base + value).toString(2),
      "0o": Number(base + value).toString(8),
      "0": Number(base + value).toString(10),
      "0x": Number(base + value).toString(16),
    });
  }, [base, value]);

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label>
          <p>Select Numbering System</p>
          <select value={base} onChange={handleSelectChange}>
            <option value="0b">Binary</option>
            <option value="0o">Octal</option>
            <option value="0">Decimal</option>
            <option value="0x">Hexadecimal</option>
          </select>
        </label>
        <input
          type="text"
          pattern="^[0-9a-fA-F]+$"
          name="digit"
          value={value}
          title="numbers or hexadecimal characters"
          onChange={handleInputChange}
        />
      </form>
      <div className="card">
        <p>
          Digits are{" "}
          {isEmpty ? (
            "empty"
          ) : !isInvalid ? (
            <div>
              <p hidden={base === "0b"}>Binary: {digits["0b"]}</p>
              <p hidden={base === "0o"}>Octal: {digits["0o"]}</p>
              <p hidden={base === "0"}>Decimal: {digits[0]}</p>
              <p hidden={base === "0x"}>Hexadecimal: {digits["0x"]} </p>
            </div>
          ) : (
            "invalid"
          )}
        </p>
      </div>
    </div>
  );
};

export default ToAnyBase;
