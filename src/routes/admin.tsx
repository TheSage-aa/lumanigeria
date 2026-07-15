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
  publishTitle: string | null;
  publishExcerpt: string | null;
  createdAt: string;
};

type Subscriber = {
  id: number;
  email: string;
  status: string;
  createdAt: string;
};

const STATUSES = ["pending", "reviewed", "accepted", "rejected", "published"];
const STORY_FORM_TYPE = "Voices From Campus — Story Submission";

function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [view, setView] = useState<"submissions" | "newsletter">("submissions");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<Record<number, { title: string; excerpt: string }>>({});
  const [copyLabel, setCopyLabel] = useState("Copy all emails");

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
      setDrafts((prev) => {
        const next = { ...prev };
        for (const s of json.submissions as Submission[]) {
          if (!next[s.id]) {
            next[s.id] = { title: s.publishTitle || "", excerpt: s.publishExcerpt || "" };
          }
        }
        return next;
      });
      setAuthed(true);
    }
    setLoading(false);

    const newsRes = await fetch("/api/admin/newsletter");
    const newsJson = await newsRes.json().catch(() => ({ ok: false }));
    if (newsJson.ok) setSubscribers(newsJson.subscribers);
  };

  useEffect(() => {
    loadSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyAllEmails = async () => {
    const emails = subscribers
      .filter((s) => s.status === "subscribed")
      .map((s) => s.email)
      .join(", ");
    try {
      await navigator.clipboard.writeText(emails);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy all emails"), 1500);
    } catch {
      setCopyLabel("Copy failed — select manually");
    }
  };

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
    const draft = drafts[id];
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status,
              publishTitle: draft?.title || s.publishTitle,
              publishExcerpt: draft?.excerpt || s.publishExcerpt,
            }
          : s,
      ),
    );
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        status,
        publishTitle: draft?.title || undefined,
        publishExcerpt: draft?.excerpt || undefined,
      }),
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
        <h1 style={styles.title}>LUMA Admin</h1>
        <button
          onClick={handleLogout}
          style={{ ...styles.button, background: "transparent", border: "1px solid #F7F3EC" }}
        >
          Log out
        </button>
      </div>
      <div style={styles.body}>
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <button
            onClick={() => setView("submissions")}
            style={{
              ...styles.button,
              background: view === "submissions" ? "#1A3329" : "transparent",
              color: view === "submissions" ? "#F7F3EC" : "#1A3329",
              border: "1px solid #1A3329",
            }}
          >
            Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setView("newsletter")}
            style={{
              ...styles.button,
              background: view === "newsletter" ? "#1A3329" : "transparent",
              color: view === "newsletter" ? "#F7F3EC" : "#1A3329",
              border: "1px solid #1A3329",
            }}
          >
            Newsletter ({subscribers.length})
          </button>
        </div>
        {view === "newsletter" ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <p style={{ margin: 0, fontSize: 14, color: "#555" }}>
                {subscribers.filter((s) => s.status === "subscribed").length} subscribed
              </p>
              {subscribers.length > 0 && (
                <button onClick={copyAllEmails} style={styles.button}>
                  {copyLabel}
                </button>
              )}
            </div>
            {subscribers.length === 0 && <p>No subscribers yet.</p>}
            {subscribers.map((sub) => (
              <div
                key={sub.id}
                style={{
                  ...styles.card,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 20px",
                }}
              >
                <span>{sub.email}</span>
                <span style={{ fontSize: 12, color: "#666" }}>
                  {sub.status} · {sub.createdAt}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <>
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
            {s.formType === STORY_FORM_TYPE && (
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: "1px dashed rgba(26,51,41,0.2)",
                }}
              >
                <p style={{ fontSize: 12, fontWeight: 700, color: "#666", marginBottom: 8 }}>
                  Publish to Campus Truth Series (title/excerpt shown to visitors — set these
                  before switching status to "published")
                </p>
                <input
                  placeholder="Story title"
                  value={drafts[s.id]?.title ?? ""}
                  onChange={(e) =>
                    setDrafts((prev) => ({
                      ...prev,
                      [s.id]: { title: e.target.value, excerpt: prev[s.id]?.excerpt ?? "" },
                    }))
                  }
                  style={{ ...styles.input, width: "100%", marginBottom: 8 }}
                />
                <textarea
                  placeholder="Short excerpt for the story card"
                  value={drafts[s.id]?.excerpt ?? ""}
                  onChange={(e) =>
                    setDrafts((prev) => ({
                      ...prev,
                      [s.id]: { title: prev[s.id]?.title ?? "", excerpt: e.target.value },
                    }))
                  }
                  rows={2}
                  style={{ ...styles.input, width: "100%", resize: "vertical" }}
                />
              </div>
            )}
          </div>
        ))}
        </>
        )}
      </div>
    </div>
  );
}
