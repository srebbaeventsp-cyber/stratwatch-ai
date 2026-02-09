import { STRATWATCH_MODULES } from "../../lib/constants";

export default function Dashboard() {
  const categories = ["CORE", "CONTEXTUAL", "SENSITIVE"];

  return (
    <main style={{ color: "#0ff", padding: 20 }}>
      <h1>STRATWATCH  MODULES</h1>

      {categories.map(cat => (
        <section key={cat}>
          <h2>{cat}</h2>
          <ul>
            {STRATWATCH_MODULES
              .filter(m => m.cat === cat)
              .map(m => (
                <li key={m.id}>
                  <strong>{m.id}</strong>  {m.name} [{m.status}]
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

