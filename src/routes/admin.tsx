import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Admin — LUMA" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPage,
});

type Submission = {
  id: number;
  formType: string;
  data: Record<string, string>;
  status: string;
  createdAt: string;
};

const STATUSES = ["pending", "reviewed", "accepted", "rejected", "published"];

function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const loadSubmissions = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/submissions");
    if (res.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    const json = await res.json();
    if (json.ok) {
      setSubmissions(json.submissions);
      setAuthed(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      loadSubmissions();
    } else {
      const json = await res.json().catch(() => ({}));
      setLoginError(json.error || "Login failed");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setSubmissions([]);
  };

  const updateStatus = async (id: number, status: string) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  };

  const styles = {
    page: { minHeight: "100vh", background: "#F7F3EC", fontFamily: "'DM Sans',sans-serif" },
    header: { background: "#1A3329", padding: "32px", color: "#F7F3EC" },
    title: { fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, margin: 0 },
    body: { maxWidth: 1100, margin: "0 auto", padding: "32px" },
    card: {
      background: "#fff",
      border: "1px solid rgba(26,51,41,0.12)",
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
    },
    input: {
      padding: "10px 14px",
      borderRadius: 8,
      border: "1px solid rgba(26,51,41,0.3)",
      fontSize: 14,
      fontFamily: "'DM Sans',sans-serif",
    },
    button: {
      background: "#1A3329",
      color: "#F7F3EC",
      border: "none",
      borderRadius: 8,
      padding: "10px 18px",
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Space Grotesk',sans-serif",
    },
    select: {
      padding: "6px 10px",
      borderRadius: 6,
      border: "1px solid rgba(26,51,41,0.3)",
      fontFamily: "'DM Sans',sans-serif",
    },
  };

  if (authed === null || loading) {
    return (
      <div style={styles.page}>
        <div style={styles.body}>Loading…</div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <h1 style={styles.title}>LUMA Admin</h1>
        </div>
        <div style={styles.body}>
          <form onSubmit={handleLogin} style={{ ...styles.card, maxWidth: 360 }}>
            <p style={{ marginTop: 0 }}>Enter the admin password to view submissions.</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ ...styles.input, width: "100%", marginBottom: 12 }}
            />
            {loginError && <p style={{ color: "#B3261E", fontSize: 13 }}>{loginError}</p>}
            <button type="submit" style={styles.button}>
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filtered =
    filter === "all" ? submissions : submissions.filter((s) => s.formType === filter);
  const formTypes = Array.from(new Set(submissions.map((s) => s.formType)));

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.header,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={styles.title}>LUMA Admin — {submissions.length} submissions</h1>
        <button
          onClick={handleLogout}
          style={{ ...styles.button, background: "transparent", border: "1px solid #F7F3EC" }}
        >
          Log out
        </button>
      </div>
      <div style={styles.body}>
        <div style={{ marginBottom: 20 }}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.select}>
            <option value="all">All types ({submissions.length})</option>
            {formTypes.map((ft) => (
              <option key={ft} value={ft}>
                {ft} ({submissions.filter((s) => s.formType === ft).length})
              </option>
            ))}
          </select>
        </div>
        {filtered.length === 0 && <p>No submissions yet.</p>}
        {filtered.map((s) => (
          <div key={s.id} style={styles.card}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <div>
                <strong style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{s.formType}</strong>
                <div style={{ fontSize: 12, color: "#666" }}>{s.createdAt}</div>
              </div>
              <select
                value={s.status}
                onChange={(e) => updateStatus(s.id, e.target.value)}
                style={styles.select}
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <table
              style={{ width: "100%", marginTop: 12, fontSize: 14, borderCollapse: "collapse" }}
            >
              <tbody>
                {Object.entries(s.data).map(([k, v]) => (
                  <tr key={k} style={{ borderTop: "1px solid rgba(26,51,41,0.08)" }}>
                    <td
                      style={{
                        padding: "6px 8px",
                        fontWeight: 700,
                        verticalAlign: "top",
                        width: 180,
                      }}
                    >
                      {k}
                    </td>
                    <td style={{ padding: "6px 8px", whiteSpace: "pre-wrap" }}>{String(v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
