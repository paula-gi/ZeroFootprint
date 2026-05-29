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

      
      const latestActivities = {};

      res.data.forEach((activity) => {
        latestActivities[activity.name] = activity;
      });

      const filteredActivities = Object.values(latestActivities);

      setActivities(filteredActivities);

      const sum = filteredActivities.reduce(
        (acc, a) => acc + a.totalCo2,
        0
      );

      setTotal(sum);

    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  const loadHistory = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/users/${userId}/carbon-records`
      );

      setHistory(res.data);

    } catch (err) {
      console.error(err);
    }
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
      if (a.name === "car" && a.totalCo2 > 10) {
        tips.push("Reduce el uso del coche o usa transporte público");
      }

      if (a.name === "food" && a.totalCo2 > 10) {
        tips.push("Reduce el consumo de carne");
      }

      if (a.name === "energy" && a.totalCo2 > 10) {
        tips.push("Reduce el consumo eléctrico en casa");
      }
    });

    if (tips.length === 0) {
      tips.push("¡Buen trabajo! Tus hábitos son bastante sostenibles");
    }

    return tips;
  };

  const getScore = () => {
    if (total < 50) return "BAJO 🟢";
    if (total < 150) return "MEDIO 🟡";
    return "ALTO 🔴";
  };

  const getLevelClass = () => {
  if (total < 50) return "level-low";
  if (total < 150) return "level-medium";
  return "level-high";
  };

  const getComparisonClass = () => {
  const data = getComparison();

  if (!data) return "";

  if (data.diff < 0) return "comparison-good";

  if (data.diff > 0) return "comparison-bad";

  return "comparison-neutral";
  };

  const COLORS = {
  car: "#3B82F6",
  food: "#f51616",
  energy: "#e7f82c",
  }; 

  const LABELS = {
  car: "Coche",
  food: "Alimentación",
  energy: "Energía",
  };

  const chartData = activities.map((a) => ({
  name: a.name,
  label: LABELS[a.name] || a.name,
  value: a.totalCo2,
  }));
  
  const getComparison = () => {
  if (history.length < 2) return null;

  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const latest = sortedHistory[sortedHistory.length - 1];
  const previous = sortedHistory[sortedHistory.length - 2];

  const latestValue = Number(latest.totalCo2);
  const previousValue = Number(previous.totalCo2);

  const diff = latestValue - previousValue;

  let percent = 0;

  if (previousValue > 0) {
    percent = ((diff / previousValue) * 100).toFixed(1);
  }

  return {
    diff,
    percent,
  };
};

  const renderComparison = () => {
    const data = getComparison();

    if (!data) 
      return <p className= "comparison-text">No hay datos anteriores</p>;

    if (data.diff < 0) {
      return (
        <p className="comparison-text">
          📉 Has reducido tu huella un {Math.abs(data.percent)}%
        </p>
      );
    }

    if (data.diff > 0) {
      return (
        <p className="comparison-text">
          📈 Tu huella ha aumentado un {data.percent}%
        </p>
      );
    }

    return (
      <p className="comparison-text">
        ➖ Tu huella se mantiene igual
      </p>
    );
  };

  return (
    <div className="dashboard">

      <div className="card huella-card">
        <h2>Tu huella total</h2>
        <p>{total} kg CO2</p>
      </div>

      <div className={`card ${getComparisonClass()}`}>
        <h3>Comparación</h3>
        {renderComparison()}
      </div>

      <div className={`card ${getLevelClass()}`}>
        <h3>Tu nivel</h3>
        <p>{getScore()}</p>
        
      </div>

      <div className="card recomendaciones-card">
        <h3>Recomendaciones</h3>

        <ul>
          {getRecommendations().map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="card full">
        <h3>Distribución</h3>

        <PieChart width={380} height={380}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            outerRadius={130}
          >
            {chartData.map((entry, index) => (
              <Cell key={index}
              fill={COLORS[entry.name] || "#94A3B8"}
               />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </div>

      <div className="card detalle-card">
        <h3>Detalle</h3>

        <ul>
          {activities.map((a) => (
            <li key={a.id}>
              {LABELS[a.name] || a.name} → {a.totalCo2} kg CO₂
            </li>
          ))}
        </ul>
      </div>

      <div className="card evolucion-card">
        <h3>Evolución</h3>

        <ul>
          {[...history]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3)
            .map((h, i) => (
              
            <li key={i}>
              {h.date} → {h.totalCo2} kg CO₂
            </li>
          ))}
        </ul>
      </div>

      <div className="restart-container full">
        <button className="btn restart-btn" onClick={onRestart}>
          Nuevo cálculo
        </button>
      </div>

    </div>
  );
}



