import { useEffect, useState } from "react";
import { getActivities } from "../api/activities";

export default function ActivityList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getActivities();
      setData(res.data.content);
    } catch (error) {
      console.error("Error loading activities", error);
    }
  };

  return (
    <div>
      <h1>Activities</h1>

      <ul>
        {data.map((a) => (
          <li key={a.id}>
            {a.name} - CO2: {a.totalCo2}
          </li>
        ))}
      </ul>
    </div>
  );
}