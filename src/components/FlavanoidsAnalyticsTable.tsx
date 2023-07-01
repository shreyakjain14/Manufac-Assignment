import { useEffect, useId, useState } from "react";
import { Wine } from "../models/Wine";
import TableHead from "./TableHead";

const FlavanoidsAnalyticsTable = ({ alcoholClassesMap }: any) => {
  const [means, setMeans]: [number[], Function] = useState([]);
  const [medians, setMedians]: [number[], Function] = useState([]);
  const [modes, setModes]: [number[], Function] = useState([]);
  // using useId Hook for getting unique id
  const id = useId();

  // Calculating Mean, Median and Mode of Flavanoid Content for given data set grouped by alcohol class
  useEffect(() => {
    const means: number[] = [],
      medians: number[] = [],
      modes: string[] = [];

    for (const wines of alcoholClassesMap.values()) {
      let mean: number = 0,
        median: number = 0,
        valuesMap = new Map(),
        MAX_COUNT: number = 0,
        mode: number = 0;

      // sorting to set ascending order
      wines.sort((a: Wine, b: Wine) => a.Flavanoids - b.Flavanoids);

      // if odd number of entries is present, median is middle element else it's average of two middle elements
      if (wines.length % 2) {
        // Converting to number in case string is string as number
        median = Number(wines[Math.floor(wines.length / 2)].Flavanoids);
      } else {
        const midIdx = wines.length / 2;
        // Converting to number in case string is string as number
        median =
          (Number(wines[midIdx].Flavanoids) +
            Number(wines[midIdx - 1].Flavanoids)) /
          2;
      }

      wines.forEach(({ Flavanoids }: Wine) => {
        const count = valuesMap.get(Flavanoids) || 0;
        valuesMap.set(Flavanoids, count + 1);
        // Checking if occured max number of times

        if (count + 1 > MAX_COUNT) {
          MAX_COUNT = count + 1;
          mode = Flavanoids;
        }

        // Converting to number in case string is string as number
        mean += Number(Flavanoids);
      });

      mean /= wines.length;

      if (MAX_COUNT === 1) modes.push("NA");
      else modes.push(mode.toFixed(3));

      means.push(mean);
      medians.push(median);
    }

    setMeans(means);
    setMedians(medians);
    setModes(modes);
  }, [alcoholClassesMap]);

  return (
    <table className="mb-8">
      <TableHead alcoholClassesMap={alcoholClassesMap} />
      <tbody>
        <tr>
          <th>Flavanoids Mean</th>
          {means.map((mean, index) => (
            <td key={id + "-mean-" + index}>{mean.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <th>Flavanoids Median</th>
          {medians.map((median, index) => (
            <td key={id + "-median-" + index}>{median.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <th>Flavanoids Mode</th>
          {modes.map((mode, index) => (
            <td key={id + "-mode-" + index}>{mode}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default FlavanoidsAnalyticsTable;
