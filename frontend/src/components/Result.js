import { useEffect, useState, useCallback } from "react";
import { getUserActivities } from "../api/users";

export default function Result({ userId }) {
  const [activities, setActivities] = useState([]);
  const [total, setTotal] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await getUserActivities(userId);

      setActivities(res.data);

      const sum = res.data.reduce((acc, a) => acc + a.totalCo2, 0);
      setTotal(sum);
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      load();
    }
  }, [load, userId]);

  return (
    <div>
      <h2>Tu huella total</h2>
      <p>{total} kg CO2</p>

      <h3>Detalle:</h3>
      <ul>
        {activities.map((a) => (
          <li key={a.id}>
            {a.name} → {a.totalCo2}
          </li>
        ))}
      </ul>
    </div>
  );
}