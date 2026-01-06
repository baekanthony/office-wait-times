"use client";
import { WaitTime } from "../types/waitTime";

export default function WaitTimesTable(waitTimes: WaitTime[]) {
  return (
    <div>
      <h1>Wait Times</h1>
      <ul>
        {waitTimes.map((item, i) => (
          <li key={i}>
            {item.officeName} ({item.officeId}): {item.date}: {item.waitTimeSeconds} seconds 
          </li>
        ))}
      </ul>
    </div>
  );
}