import { useState } from "react";
import { createUser, createActivity } from "../api/users";

export default function Home() {
  const [step, setStep] = useState(1);
  const [carKm, setCarKm] = useState(0);
  const [userId, setUserId] = useState(null);
  const [co2, setCo2] = useState(null);
  const [food, setFood] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [totalCo2, setTotalCo2] = useState(0);

  const calculate = async () => {
  try {
    let id = userId;

    if (!id) {
      const userRes = await createUser({
        name: "Usuario",
        email: "test@test.com",
      });

      id = userRes.data.id;
      setUserId(id);
    }

    // 🚗 coche
    const car = await createActivity(id, {
      name: "car",
      amount: carKm,
      co2PerUnit: 0.2,
    });

    // 🍔 comida
    const foodRes = await createActivity(id, {
      name: "food",
      amount: food,
      co2PerUnit: 1.5,
    });

    // 💡 energía
    const energyRes = await createActivity(id, {
      name: "energy",
      amount: energy,
      co2PerUnit: 0.5,
    });

    const total =
      car.data.totalCo2 +
      foodRes.data.totalCo2 +
      energyRes.data.totalCo2;

    setTotalCo2(total);
    setStep(4);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="container">
      <div className="card">
        <h1>🌍 Tu huella</h1>

      <div className="progress">
        <div 
          className="progress-bar"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>

        {step === 1 && (
            <div>
                <p>¿Cuántos km haces en coche al mes?</p>
                <input
                    className="input"
                    type="number"
                    placeholder="Ej: 100"
                    value={carKm}
                    onChange={(e) => setCarKm(e.target.value)}
                />
                <button className="btn" onClick={() => setStep(2)}>Siguiente</button>
            </div>
        )}

        {step === 2 && (
            <div>
                <p>¿Cuánta carne consumes por semana?</p>
                <input
                    className="input"
                    type="number"
                    placeholder="Ej: 2"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                />
                <button className="btn" onClick={() => setStep(3)}>Siguiente</button>
            </div>
        )}

        {step === 3 && (
            <div>
                <p>¿Consumo energético mensual?</p>
                <input
                    className="input"
                    type="number"
                    placeholder="Ej: 150"
                    value={energy}
                    onChange={(e) => setEnergy(e.target.value)}
                />
                <button className="btn" onClick={calculate}>Calcular</button>
            </div>
        )}

        {step === 4 && (
            <div>
                <h2>Tu huella total 🌍</h2>
                <p>{totalCo2} kg CO2</p>
            </div>
        )}
        </div>
      </div>
  );
}