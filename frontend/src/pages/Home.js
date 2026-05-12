import { useState, useEffect } from "react";
import { createUser, createActivity } from "../api/users";
import Result from "../components/Result";
import axios from "axios";

export default function Home() {
  const [step, setStep] = useState(1);

  const [carKm, setCarKm] = useState(0);
  const [food, setFood] = useState(0);
  const [energy, setEnergy] = useState(0);

  const [userId, setUserId] = useState(null);

  const total = carKm + food + energy;

  useEffect(() => {
    const savedUser = localStorage.getItem("userId");

    if (savedUser) {
      setUserId(Number(savedUser));
      setStep(4);
    }
  }, []);

  const calculate = async () => {
    try {
      let id = userId;

      // Crear usuario si no existe
      if (!id) {
        const userRes = await createUser({
          name: "Usuario",
          email: "test@test.com",
        });

        id = userRes.data.id;
        setUserId(id);
        localStorage.setItem("userId", id);
      }

      // Guardar actividades
      await Promise.all([
        createActivity(id, {
          name: "car",
          amount: carKm,
          co2PerUnit: 0.2,
        }),
        createActivity(id, {
          name: "food",
          amount: food,
          co2PerUnit: 1.5,
        }),
        createActivity(id, {
          name: "energy",
          amount: energy,
          co2PerUnit: 0.5,
        }),
      ]);

      // Guardar record 
      await axios.post(
        `http://localhost:8080/api/users/${id}/carbon-records`,
        {
          totalCo2: total,
          date: new Date().toISOString().split("T")[0],
        }
      );

      // Ir a resultados
      setStep(4);

    } catch (error) {
      console.error("ERROR CALCULATE:", error.response?.data || error.message);
      alert("Error al calcular la huella. Revisa backend.");
    }
  };

  const handleRestart = () => {
    setStep(1);
    setCarKm(0);
    setFood(0);
    setEnergy(0);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Tu huella</h1>

        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div>
            <p>¿Cuántos km haces en coche al mes?</p>
            <input
              className="input"
              type="number"
              value={carKm}
              onChange={(e) => setCarKm(Number(e.target.value))}
            />
            <button className="btn" onClick={() => setStep(2)}>
              Siguiente
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p>¿Cuánta carne consumes por semana?</p>
            <input
              className="input"
              type="number"
              value={food}
              onChange={(e) => setFood(Number(e.target.value))}
            />
            <button className="btn" onClick={() => setStep(3)}>
              Siguiente
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <p>¿Consumo energético mensual?</p>
            <input
              className="input"
              type="number"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
            />
            <button className="btn" onClick={calculate}>
              Calcular
            </button>
          </div>
        )}

        {step === 4 && (
          <Result userId={userId} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}