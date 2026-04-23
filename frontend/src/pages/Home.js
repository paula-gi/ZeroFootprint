import { useState } from "react";
import { createUser, createActivity } from "../api/users";
import Result from "../components/Result";

export default function Home() {
  const [step, setStep] = useState(1);

  const [carKm, setCarKm] = useState(0);
  const [food, setFood] = useState(0);
  const [energy, setEnergy] = useState(0);

  const [userId, setUserId] = useState(null);

  const calculate = async () => {
    try {
      let id = userId;

      // Crear usuario solo si no existe
      if (!id) {
        const userRes = await createUser({
          name: "Usuario",
          email: "test@test.com",
        });

        id = userRes.data.id;
        setUserId(id);
      }

      // Actividades
      await createActivity(id, {
        name: "car",
        amount: carKm,
        co2PerUnit: 0.2,
      });

      await createActivity(id, {
        name: "food",
        amount: food,
        co2PerUnit: 1.5,
      });

      await createActivity(id, {
        name: "energy",
        amount: energy,
        co2PerUnit: 0.5,
      });

      // ir a resultado
      setStep(4);
    } catch (error) {
      console.error(error);
    }
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

        {step === 4 && <Result userId={userId} />}
      </div>
    </div>
  );
}