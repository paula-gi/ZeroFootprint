import { useState } from "react";
import { createUser, createActivity } from "../api/users";

export default function Home() {
  const [step, setStep] = useState(1);
  const [carKm, setCarKm] = useState(0);
  const [userId, setUserId] = useState(null);
  const [co2, setCo2] = useState(null);

  const next = async () => {
    try {
      // 🔹 1. crear usuario si no existe
      let id = userId;

      if (!id) {
        const userRes = await createUser({
          name: "Usuario",
          email: "test@test.com",
        });

        id = userRes.data.id;
        setUserId(id);
      }

      // 🔹 2. crear actividad
      const activityRes = await createActivity(id, {
        name: "car",
        amount: carKm,
        co2PerUnit: 0.2,
      });

      // 🔹 3. guardar resultado
      setCo2(activityRes.data.totalCo2);

      setStep(2);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Calcula tu huella 🌍</h1>

      {step === 1 && (
        <div>
          <p>¿Cuántos km haces en coche al mes?</p>
          <input
            type="number"
            value={carKm}
            onChange={(e) => setCarKm(e.target.value)}
          />
          <button onClick={next}>Calcular</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Resultado</h2>
          <p>Tu huella de CO2 es: {co2}</p>
        </div>
      )}
    </div>
  );
}