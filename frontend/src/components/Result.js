import { useEffect, useState, useCallback } from "react";
import { getUserActivities } from "../api/users";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axios from "axios"; 

export default function Result({ userId, onRestart }) {
  const [activities, setActivities] = useState([]);
  const [total, setTotal] = useState(0);
  
  const [history, setHistory] = useState([]);

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

  
  const loadHistory = useCallback(async () => {
  const res = await axios.get(
    `http://localhost:8080/api/users/${userId}/carbon-records`
  );
  setHistory(res.data);
}, [userId]);

  useEffect(() => {
  if (userId) {
    load();
    loadHistory(); 
  }
}, [load, loadHistory, userId]);

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

  const getScore = () => {
    if (total < 50) return "BAJA 🟢";
    if (total < 150) return "MEDIA 🟡";
    return "ALTA 🔴";
  };

  const chartData = activities.map((a) => ({
    name: a.name,
    value: a.totalCo2,
  }));

  
  return (
    <div className="dashboard">
    <div className="card">
      <h2>Tu huella total</h2>
      <p>{total} kg CO2</p>
    </div>

    <div className="card">
      <h3>Tu nivel:</h3>
      <p>{getScore()}</p>
    </div>
  

    <div className="card full">
      <h3>Distribución</h3>

      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
        >
          {chartData.map((entry, index) => (
          <Cell key={index} />
        ))}
      </Pie>
      <Tooltip />
      </PieChart>
    </div>

    <div className="card">
      <h3>Detalle:</h3>
      <ul>
        {activities.map((a) => (
          <li key={a.id}>
            {a.name} → {a.totalCo2}
          </li>
        ))}
      </ul>
    </div>

    <div className="card">
      <h3>Recomendaciones:</h3>
      <ul>
        {getRecommendations().map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>

    <div className="card full">
      <h3>Evolución</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            {h.date} → {h.totalCo2} kg CO₂
          </li>
        ))}
      </ul>
    </div>

    <button className="btn" onClick={onRestart}>
  Nuevo cálculo
</button>
    </div>
  );
}



