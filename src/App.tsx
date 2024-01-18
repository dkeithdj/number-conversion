import { useState } from "react";
import "./App.css";
import ToAnyBase from "./ToAnyBase";
import { ToBase } from "./ToBase";

function App() {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <h1>DigiConvert</h1>
      <button onClick={() => setTab(0)} className={tab === 0 ? "active" : ""}>
        v1
      </button>
      <button onClick={() => setTab(1)} className={tab === 1 ? "active" : ""}>
        v2
      </button>
      {tab === 0 ? <ToBase /> : <ToAnyBase />}
      <small>
        by <a href="https://github.com/dkeithdj">@denrei</a>
      </small>
    </div>
  );
}

export default App;
