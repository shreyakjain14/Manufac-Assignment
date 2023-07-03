import { useEffect, useId, useState } from "react";
import TableHead from "./TableHead";
import { Wine } from "../models/Wine";

const GammaAnalyticsTable = ({ alcoholClassesMap }: any) => {
  const [means, setMeans]: [number[], Function] = useState([]);
  const [medians, setMedians]: [number[], Function] = useState([]);
  const [modes, setModes]: [number[], Function] = useState([]);
  // using useId Hook for getting unique id
  const id = useId();

  // Calculating Mean, Median and Mode of Gamma Value for given data set grouped by alcohol class
  useEffect(() => {
    const means: number[] = [],
      medians: number[] = [],
      modes: string[] = [];

    for (const wines of alcoholClassesMap.values()) {
      console.log("for ", wines);
      let mean: number = 0,
        median: number = 0,
        valuesMap = new Map(),
        MAX_COUNT: number = 0,
        mode: string = "";

      const gammas = wines.map(({ Ash, Hue, Magnesium }: Wine) => {
        Ash = Number(Ash);
        Hue = Number(Hue);
        Magnesium = Number(Magnesium);

        const gamma = (Ash * Hue) / Magnesium;

        // checking mode for gamma value while considering only first 3 decimal digits
        const gammaStr = gamma.toFixed(3);
        const count = valuesMap.get(gammaStr) || 0;
        valuesMap.set(gammaStr, count + 1);

        if (count + 1 > MAX_COUNT) {
          MAX_COUNT = count + 1;
          mode = gammaStr;
        } else if (count + 1 === MAX_COUNT) {
          // in case same MAX_COUNT happens to be more than one time than there is more than one mode
          mode += ", " + gammaStr;
        }

        mean += gamma;

        return gamma;
      });

      mean /= gammas.length;

      // sorting to set ascending order
      gammas.sort((a: number, b: number) => a - b);

      // if odd number of entries is present, median is middle element else it's average of two middle elements
      if (gammas.length % 2) {
        median = gammas[Math.floor(gammas.length / 2)];
      } else {
        const midIdx = gammas.length / 2;
        median = (gammas[midIdx - 1] + gammas[midIdx]) / 2;
      }

      if (MAX_COUNT === 1) modes.push(" ");
      else modes.push(mode);

      means.push(mean);
      medians.push(median);
    }

    setMeans(means);
    setMedians(medians);
    setModes(modes);
  }, [alcoholClassesMap]);

  return (
    <table>
      <TableHead alcoholClassesMap={alcoholClassesMap} />
      <tbody>
        <tr>
          <th>Gamma Mean</th>
          {means.map((mean, index) => (
            <td key={id + "-mean-" + index}>{mean.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <th>Gamma Median</th>
          {medians.map((median, index) => (
            <td key={id + "-median-" + index}>{median.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <th>Gamma Mode</th>
          {modes.map((mode, index) => (
            <td key={id + "-mode-" + index}>{mode}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default GammaAnalyticsTable;
