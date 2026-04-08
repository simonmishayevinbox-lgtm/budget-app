"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* -------- הוצאות -------- */
const expenseCategories = [
  { key: "food", label: "אוכל", icon: "🍔", color: "#f59e0b" },
  { key: "transport", label: "תחבורה", icon: "🚌", color: "#3b82f6" },
  { key: "home", label: "בית", icon: "🏠", color: "#f97316" },
  { key: "self", label: "עצמי", icon: "🧴", color: "#a855f7" },
  { key: "shopping", label: "קניות", icon: "🛍", color: "#ef4444" },
  { key: "health", label: "בריאות", icon: "🏥", color: "#10b981" },
];

/* -------- הכנסות -------- */
const incomeCategories = [
  { key: "salary", label: "משכורת", icon: "💵", color: "#22c55e" },
  { key: "freelance", label: "עצמאי", icon: "🧑‍💻", color: "#0ea5e9" },
  { key: "invest", label: "השקעות", icon: "📈", color: "#84cc16" },
];

export default function Page() {
  const [data, setData] = useState<any>({});
  const [active, setActive] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("data");
    const theme = localStorage.getItem("dark");

    if (saved) setData(JSON.parse(saved));
    if (theme) setDark(JSON.parse(theme));
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [data, dark]);

  const totalExpense = expenseCategories.reduce(
    (sum, c) => sum + (data[c.key] || 0),
    0
  );

  const totalIncome = incomeCategories.reduce(
    (sum, c) => sum + (data[c.key] || 0),
    0
  );

  const addAmount = () => {
    const num = Number(amount);
    if (!num || !active) return;

    setData((prev: any) => ({
      ...prev,
      [active.key]: (prev[active.key] || 0) + num,
    }));

    setAmount("");
    setActive(null);
  };

  const removeLast = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const bg = dark
    ? "radial-gradient(circle at top, #1a1a1a, #0a0a0a)"
    : "linear-gradient(180deg, #ffffff 0%, #eef2f7 50%, #e5eaf1 100%)";

  const textColor = dark ? "#fff" : "#111";

  return (
    <div style={{ ...styles.app, background: bg, color: textColor }}>
      {!active ? (
        <div style={styles.container}>
          <div style={styles.topBar}>
            <button onClick={() => setDark(!dark)} style={styles.darkBtn}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          <div style={styles.sectionTitle}>סה״כ הוצאות</div>
          <div style={styles.total}>{totalExpense} ₪</div>

          <div style={styles.grid}>
            {expenseCategories.map((c) => (
              <Card key={c.key} c={c} data={data} setActive={setActive} />
            ))}
          </div>

          <div style={{ ...styles.sectionTitle, marginTop: 18 }}>
            הכנסות
          </div>
          <div style={styles.total}>{totalIncome} ₪</div>

          <div style={styles.incomeRow}>
            {incomeCategories.map((c) => (
              <Card key={c.key} c={c} data={data} setActive={setActive} />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ ...styles.modal, background: dark ? "#111" : "#fff" }}>
          <div style={styles.modalBox}>
            <div style={styles.modalTitle}>{active.label}</div>

            <div style={styles.bigAmount}>₪ {amount || 0}</div>

            <div style={styles.keypad}>
              {[1,2,3,4,5,6,7,8,9].map((n) => (
                <button key={n} onClick={() => setAmount(amount + n)}>
                  {n}
                </button>
              ))}
              <button onClick={() => setAmount(amount + "0")}>0</button>
              <button onClick={removeLast}>⌫</button>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={addAmount}
              style={styles.confirmBtn}
            >
              ✔ אישור
            </motion.button>

            <div onClick={() => setActive(null)} style={styles.cancel}>
              ביטול
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------- CARD -------- */
function Card({ c, data, setActive }: any) {
  const hexToRGBA = (hex: string, opacity: number) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => setActive(c)}
      style={{
        ...styles.card,
        background: hexToRGBA(c.color, 0.25),
        boxShadow: `0 6px 14px ${hexToRGBA(c.color, 0.18)}`,
      }}
    >
      <div style={styles.label}>{c.label}</div>

      <div style={{ ...styles.iconCircle, background: c.color }}>
        <span style={styles.icon}>{c.icon}</span>
      </div>

      <div style={styles.amount}>{data[c.key] || 0} ₪</div>
    </motion.div>
  );
}

/* -------- STYLES -------- */
const styles: any = {
  app: { minHeight: "100vh", fontFamily: "system-ui" },

  container: { maxWidth: 420, margin: "auto", padding: 16 },

  topBar: { display: "flex", justifyContent: "flex-end" },

  darkBtn: {
    border: "none",
    padding: "6px 10px",
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
  },

  total: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },

  incomeRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12,
  },

  card: {
    padding: "10px 8px", // 🔥 פחות רווח
    borderRadius: 16,
    textAlign: "center",
    cursor: "pointer",

    minHeight: 90, // 🔥 גובה קטן ומדויק

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    gap: 4,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    color: "white",
    fontSize: 18,
  },

  label: {
    fontSize: 13,
  },

  amount: {
    fontWeight: "bold",
    fontSize: 13,
  },

  modal: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "90%",
    maxWidth: 300,
    textAlign: "center",
  },

  modalTitle: { marginBottom: 10 },

  bigAmount: {
    fontSize: 30,
    marginBottom: 20,
  },

  keypad: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 10,
    marginBottom: 15,
  },

  confirmBtn: {
    width: "100%",
    padding: 12,
    background: "#ffd54f",
    border: "none",
    borderRadius: 15,
  },

  cancel: {
    marginTop: 10,
    color: "#888",
  },
};