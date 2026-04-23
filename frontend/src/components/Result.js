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

  const getRecommendations = () => {
  const tips = [];

  activities.forEach((a) => {
    if (a.name === "car" && a.totalCo2 > 50) {
      tips.push("🚗 Reduce el uso del coche o usa transporte público");
    }

    if (a.name === "food" && a.totalCo2 > 30) {
      tips.push("🍔 Reduce el consumo de carne");
    }

    if (a.name === "energy" && a.totalCo2 > 40) {
      tips.push("💡 Reduce el consumo eléctrico en casa");
    }
  });

  return tips;
};

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

      <h3>Recomendaciones:</h3>

      <ul>
        {getRecommendations().map((tip, i) => (
            <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}