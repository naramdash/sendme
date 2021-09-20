const API_ORIGIN = location.host.includes("localhost")
  ? "http://localhost:7071"
  : location.origin;

const API_BASE = `${API_ORIGIN}/api`;

const COUNTERSIGNS = `${API_BASE}/countersigns`;

export { COUNTERSIGNS };
