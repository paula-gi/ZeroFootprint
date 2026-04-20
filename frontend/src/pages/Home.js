import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [carKm, setCarKm] = useState(0);

  const next = () => setStep(step + 1);

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
          <button onClick={next}>Siguiente</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p>Resultado provisional:</p>
          <p>CO2: {carKm * 0.2}</p>
        </div>
      )}
    </div>
  );
}