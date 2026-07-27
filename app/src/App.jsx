import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile, stats, caseStudies, experience, skills } from "./data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "auto");
  useEffect(() => {
    if (theme === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, setTheme];
}

function ThemeToggle({ theme, setTheme }) {
  const next = { auto: "light", light: "dark", dark: "auto" };
  const icon = { auto: "◑", light: "☀", dark: "☽" };
  return (
    <button
      className="theme-toggle"
      aria-label={`Theme: ${theme}. Click to change.`}
      onClick={() => setTheme(next[theme])}
      title={`Theme: ${theme}`}
    >
      {icon[theme]}
    </button>
  );
}

function Nav({ theme, setTheme }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(10px)", background: "color-mix(in srgb, var(--bg) 82%, transparent)", borderBottom: "1px solid var(--border)" }}>
      <div className="wrap" style={{ display: "flex", flexWrap: "wrap", rowGap: "0.4rem", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 1.5rem" }}>
        <a href="#top" style={{ fontWeight: 700, textDecoration: "none", color: "var(--text)", flexShrink: 0 }}>FC</a>
        <nav className="site-nav">
          <a href="#work" className="muted">Work</a>
          <a href="#experience" className="muted">Experience</a>
          <a href="#skills" className="muted">Skills</a>
          <a href="#contact" className="muted">Contact</a>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" style={{ paddingTop: "5rem" }}>
      <div className="wrap">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <p className="eyebrow">{profile.location} &middot; Open to on-site/hybrid UAE + US/EU remote</p>
          <h1 className="display" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", marginTop: "0.6rem" }}>{profile.title}</h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "62ch", marginTop: "1rem" }}>{profile.tagline}</p>
          <p className="muted" style={{ maxWidth: "60ch", marginTop: "0.8rem" }}>{profile.bio}</p>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginTop: "1.6rem" }}>
            <a className="btn primary" href={profile.resumeUniversal} download>Download resume</a>
            <a className="btn" href={profile.resumeUAE} download>UAE variant</a>
            <a className="btn" href={`mailto:${profile.email}`}>Email</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
      <div className="wrap stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            transition={{ delay: i * 0.08 }}
            style={{ padding: "1.2rem 1rem", textAlign: "center" }}
          >
            <div className="display" style={{ fontSize: "1.8rem", color: "var(--accent-2)" }}>{s.value}</div>
            <div className="muted" style={{ fontSize: "0.78rem", marginTop: "0.3rem" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Positioning() {
  return (
    <section>
      <div className="wrap">
        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="display"
          style={{
            fontSize: "clamp(1.4rem, 3.2vw, 2.1rem)",
            margin: 0,
            padding: "0 0 0 1.4rem",
            borderLeft: "4px solid var(--accent-2)",
            fontStyle: "normal",
          }}
        >
          "{profile.positioning}"
        </motion.blockquote>
      </div>
    </section>
  );
}

function ArchRow({ steps }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", margin: "1rem 0" }}>
      {steps.map((s, i) => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div className="card" style={{ padding: "0.6rem 0.9rem", fontSize: "0.82rem" }}>
            <div style={{ fontWeight: 700 }}>{s.label}</div>
            <div className="muted" style={{ fontSize: "0.76rem" }}>{s.detail}</div>
          </div>
          {i < steps.length - 1 && <span className="muted" aria-hidden="true">&rarr;</span>}
        </div>
      ))}
    </div>
  );
}

function CaseStudy({ cs, index }) {
  const [open, setOpen] = useState(false);
  const pending = cs.problem === "PENDING_RETROFIT_REPORT";
  return (
    <motion.article
      className="card"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ delay: Math.min(index * 0.05, 0.2) }}
      style={{ padding: "1.6rem 1.8rem", marginBottom: "1.2rem" }}
    >
      <span className="tag-pill">{cs.tag}</span>
      <h3 style={{ fontSize: "1.35rem", marginTop: "0.6rem" }}>{cs.title}</h3>
      {pending ? (
        <p className="muted" style={{ marginTop: "0.6rem" }}>
          Retrofit in progress this session - results will be added once verified. No fabricated outcome shown here.
        </p>
      ) : (
        <>
          <p style={{ marginTop: "0.6rem" }}>{cs.context}</p>
          <button
            className="btn"
            style={{ marginTop: "0.8rem" }}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            {open ? "Collapse" : "Problem, architecture & outcome"} {open ? "−" : "+"}
          </button>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
              <p style={{ marginTop: "1rem" }}><strong>Problem: </strong>{cs.problem}</p>
              {cs.constraints && (
                <>
                  <p style={{ marginTop: "0.8rem", fontWeight: 700 }}>Constraints</p>
                  <ul>{cs.constraints.map((c) => <li key={c}>{c}</li>)}</ul>
                </>
              )}
              <p style={{ marginTop: "0.8rem", fontWeight: 700 }}>Architecture</p>
              <ArchRow steps={cs.architecture} />
              <p style={{ fontWeight: 700 }}>Key decisions</p>
              <ul>{cs.decisions.map((d) => <li key={d}>{d}</li>)}</ul>
              <p style={{ marginTop: "0.8rem" }}><strong>Outcome: </strong>{cs.outcome}</p>
              <p className="muted" style={{ marginTop: "0.6rem", fontStyle: "italic" }}>{cs.lesson}</p>
            </motion.div>
          )}
        </>
      )}
    </motion.article>
  );
}

function CaseStudies() {
  return (
    <section id="work">
      <div className="wrap">
        <p className="eyebrow">Selected systems</p>
        <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginTop: "0.5rem", marginBottom: "0.6rem" }}>What I've built</h2>
        <p className="muted" style={{ maxWidth: "68ch", marginBottom: "2rem" }}>
          Business context is deliberately abstracted below - these are personal, self-directed builds, not company case studies with NDAs to protect. The engineering judgment, architecture, and debugging is real and unembellished.
        </p>
        {caseStudies.map((cs, i) => <CaseStudy cs={cs} index={i} key={cs.id} />)}
      </div>
    </section>
  );
}

function SkillsGrid() {
  return (
    <section id="skills">
      <div className="wrap">
        <p className="eyebrow">Stack</p>
        <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginTop: "0.5rem", marginBottom: "1.6rem" }}>Skills & tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.4rem" }}>
          {skills.map((group, i) => (
            <motion.div key={group.group} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ delay: i * 0.06 }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.6rem" }}>{group.group}</h3>
              <div>{group.items.map((it) => <span className="skill-chip" key={it}>{it}</span>)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <p className="eyebrow">Track record</p>
        <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginTop: "0.5rem", marginBottom: "1.8rem" }}>9 years, one throughline</h2>
        <div style={{ borderLeft: "2px solid var(--border)", paddingLeft: "1.6rem", display: "flex", flexDirection: "column", gap: "1.8rem" }}>
          {experience.map((e, i) => (
            <motion.div key={e.role + e.company} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ delay: Math.min(i * 0.05, 0.25) }} style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "-1.86rem", top: "0.35rem", width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent-2)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem" }}>
                <strong>{e.role} &middot; {e.company}</strong>
                <span className="muted" style={{ fontSize: "0.85rem" }}>{e.dates}</span>
              </div>
              {e.note && <p className="muted" style={{ fontStyle: "italic", fontSize: "0.9rem", marginTop: "0.3rem" }}>{e.note}</p>}
              <ul style={{ marginTop: "0.4rem" }}>{e.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fadeUp} className="card" style={{ padding: "2.4rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>Let's talk</h2>
          <p className="muted" style={{ marginTop: "0.6rem" }}>{profile.location} &middot; open to UAE on-site/hybrid, or US/Europe remote from Dubai.</p>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.4rem" }}>
            <a className="btn primary" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </motion.div>
        <p className="muted" style={{ textAlign: "center", fontSize: "0.8rem", marginTop: "2.4rem" }}>&copy; {new Date().getFullYear()} {profile.name}</p>
      </div>
    </section>
  );
}

export default function App() {
  const [theme, setTheme] = useTheme();
  return (
    <>
      <Nav theme={theme} setTheme={setTheme} />
      <Hero />
      <Stats />
      <Positioning />
      <CaseStudies />
      <SkillsGrid />
      <Experience />
      <Contact />
    </>
  );
}
