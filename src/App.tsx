import { useMemo } from "react";

import { Wine } from "./models/Wine";
import FlavanoidsAnalyticsTable from "./components/FlavanoidsAnalyticsTable";
import GammaAnalyticsTable from "./components/GammaAnalyticsTable";
import "./App.css";

const wines: Wine[] = require("./Wine-Datas.json");

function App() {
  // Creating map mapping alcoholClasses to Wine
  const alcoholClassesMap = useMemo(() => {
    const map = new Map();
    wines.forEach((wine: Wine) => {
      const { Alcohol, Ash, Hue, Magnesium } = wine;
      if (!map.has(Alcohol)) map.set(Alcohol, []);
      map.set(Alcohol, [...map.get(Alcohol), wine]);
    });
    return map;
  }, []);

  return (
    <div className="tables-container">
      <h1>Flavanoid Analytics</h1>
      <FlavanoidsAnalyticsTable alcoholClassesMap={alcoholClassesMap} />
      <h1>Gamma Analytics</h1>
      <GammaAnalyticsTable alcoholClassesMap={alcoholClassesMap} />
    </div>
  );
}

export default App;
