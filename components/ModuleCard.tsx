type Module = {
  id: string;
  name: string;
  cat: "CORE" | "CONTEXTUAL" | "SENSITIVE";
  status: "ACTIVE" | "READY" | "LOCKED";
};

export default function ModuleCard({ module }: { module: Module }) {
  const color =
    module.status === "ACTIVE"
      ? "#00ff88"
      : module.status === "READY"
      ? "#00cfff"
      : "#ff5555";

  return (
    <div style={{
      border: `1px solid ${color}`,
      padding: "10px",
      margin: "6px",
      borderRadius: "6px"
    }}>
      <strong>{module.id}</strong><br />
      {module.name}<br />
      <span style={{ color }}>{module.status}</span>
    </div>
  );
}
