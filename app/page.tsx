"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [page, setPage] = useState("budget");

  return (
    <div style={styles.app}>
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {page === "home" && <Home />}
        {page === "budget" && <Budget />}
        {page === "transactions" && <Transactions />}
        {page === "income" && <Income />}
      </motion.div>

      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}

/* ---------------- HOME ---------------- */
function Home() {
  return (
    <div style={styles.screen}>
      <h2 style={styles.title}>🏠 מסך הבית</h2>
    </div>
  );
}

/* ---------------- BUDGET ---------------- */
function Budget() {
  const [data, setData] = useState<any>({
    food: 0,
    transport: 0,
    shopping: 0,
    health: 0,
  });

  const [selected, setSelected] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("data");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const total = Object.values(data).reduce((a: any, b: any) => a + b, 0);

  const add = () => {
    const num = Number(amount);
    if (!selected || !num) return;

    setData(prev => ({
      ...prev,
      [selected]: prev[selected] + num
    }));

    setAmount("");
  };

  const Card = ({ label, value, type }: any) => (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => setSelected(type)}
      style={{
        ...styles.card,
        border: selected === type ? "2px solid #ff7a00" : "1px solid #2a2a2a",
      }}
    >
      <div style={{ color: "#888" }}>{label}</div>
      <div style={{ fontSize: 18 }}>{value} ₪</div>
    </motion.div>
  );

  return (
    <div style={styles.screen}>
      <h2 style={styles.title}>💰 תקציב</h2>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        style={styles.totalBox}
      >
        <div style={{ color: "#888" }}>סה״כ</div>
        <div style={styles.total}>{total} ₪</div>
      </motion.div>

      <div style={styles.grid}>
        <Card label="אוכל" value={data.food} type="food" />
        <Card label="תחבורה" value={data.transport} type="transport" />
        <Card label="קניות" value={data.shopping} type="shopping" />
        <Card label="בריאות" value={data.health} type="health" />
      </div>

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="הכנס סכום"
        style={styles.input}
      />

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={add}
        style={styles.mainBtn}
      >
        ➕ הוסף הוצאה
      </motion.button>
    </div>
  );
}

/* ---------------- TRANSACTIONS ---------------- */
function Transactions() {
  return (
    <div style={styles.screen}>
      <h2 style={styles.title}>📊 הוצאות</h2>
    </div>
  );
}

/* ---------------- INCOME ---------------- */
function Income() {
  return (
    <div style={styles.screen}>
      <h2 style={styles.title}>💵 הכנסות</h2>
    </div>
  );
}

/* ---------------- NAV ---------------- */
function BottomNav({ page, setPage }: any) {
  const Item = ({ icon, label, value }: any) => (
    <motion.div
      whileTap={{ scale: 0.85 }}
      onClick={() => setPage(value)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: page === value ? "#ff7a00" : "#777",
        fontSize: 12,
      }}
    >
      <div style={{ fontSize: 20 }}>{icon}</div>
      <div>{label}</div>
    </motion.div>
  );

  return (
    <div style={styles.nav}>
      <Item icon="🏠" label="בית" value="home" />
      <Item icon="💰" label="תקציב" value="budget" />
      <Item icon="📊" label="הוצאות" value="transactions" />
      <Item icon="💵" label="הכנסות" value="income" />
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles: any = {
  app: {
    minHeight: "100vh",
    background: "#0f0f0f",
    color: "white",
  },
  screen: {
    maxWidth: 420,
    margin: "auto",
    padding: 20,
    paddingBottom: 90,
  },
  title: {
    color: "#ff7a00",
    marginBottom: 15,
  },
  totalBox: {
    background: "#1a1a1a",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  total: {
    fontSize: 26,
    color: "#ff7a00",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  card: {
    background: "#1a1a1a",
    padding: 15,
    borderRadius: 12,
  },
  input: {
    width: "100%",
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #333",
    background: "#111",
    color: "white",
  },
  mainBtn: {
    width: "100%",
    marginTop: 10,
    padding: 14,
    borderRadius: 10,
    border: "none",
    background: "#ff7a00",
    color: "white",
  },
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#111",
    display: "flex",
    justifyContent: "space-around",
    padding: 10,
    borderTop: "1px solid #222",
  },
};