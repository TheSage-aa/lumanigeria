// @ts-nocheck
import { useState, useEffect } from "react";
import lumaLogoColor from "@/assets/luma-logo-color.png.asset.json";
import lumaLogoLight from "@/assets/luma-logo-light.png.asset.json";

// ─── STORY DATA ───────────────────────────────────────────────────────────────

export const STORIES = [
  {
    id: "classroom-myth",
    tag: "MYTH vs FACT",
    title: "You cannot get HIV from sharing a classroom. Here is what the research says.",
    excerpt: "A common misconception on Nigerian campuses is that casual contact can transmit HIV. We break down exactly how HIV does and does not spread, using data from Nigerian university studies.",
    date: "June 2026",
    readTime: "5 min read",
    content: [
      { type: "lead", text: "One of the most persistent myths circulating in Nigerian universities is that you can contract HIV through everyday contact with someone who is HIV positive. Sharing a lecture hall, a hostel bathroom, or a plate of food does not put you at risk. Not even close. And yet this myth continues to shape how students treat their peers." },
      { type: "heading", text: "How HIV is actually transmitted" },
      { type: "body", text: "HIV is transmitted through specific bodily fluids: blood, semen, vaginal and rectal fluids, breast milk, and pre-seminal fluid. It is not transmitted through saliva, tears, sweat, air, water, insect bites, or skin contact. You cannot get HIV from a handshake, a hug, sharing food, or sitting beside someone in a class." },
      { type: "body", text: "The 2018 study at Ebonyi State University, the only campus-specific HIV data available from Nigerian universities, found a prevalence rate of just 0.22% among newly admitted students. If casual contact transmitted HIV, we would see a very different picture on campuses where students share everything from hostels to lecture notes." },
      { type: "heading", text: "Where the myth comes from" },
      { type: "body", text: "HIV stigma in Nigeria has deep roots in early public health messaging from the 1980s and 1990s, when the science of transmission was not fully understood. Much of that fear stuck even as the science moved forward. A 2017 review of HIV stigma in Nigeria found that misconceptions about transmission are one of the primary drivers of discriminatory behaviour toward people living with HIV." },
      { type: "body", text: "On Nigerian campuses specifically, these myths spread through informal peer conversations, religious communities, and social media content that has never been fact-checked. By the time a student arrives at university, they may have been carrying incorrect beliefs for years." },
      { type: "heading", text: "What the knowledge-attitude paradox tells us" },
      { type: "body", text: "Research consistently shows what we call a knowledge-attitude paradox: students can score high on HIV knowledge tests and still hold deeply stigmatising attitudes toward their HIV positive peers. A 2024 study of university students found that 96.85% demonstrated high AIDS knowledge, yet only 55.52% had positive attitudes toward people living with HIV. Knowing the facts is not enough to change behaviour. That is why LUMA exists." },
      { type: "callout", text: "HIV is not transmitted through the air, water, food, casual contact, insect bites, or shared facilities. It is transmitted through specific bodily fluids during specific activities. Full stop." },
      { type: "body", text: "If someone at your university is living with HIV, sharing a classroom with them carries no risk whatsoever. What does carry risk is the stigma that makes them feel unsafe, unseen, and unsupported in that classroom. That is the real problem LUMA is here to address." },
    ],
    related: ["prep-explained", "stigma-data", "your-rights"]
  },
  {
    id: "prep-explained",
    tag: "RESEARCH",
    title: "What is PrEP and why does no one at your campus health centre mention it?",
    excerpt: "Pre-Exposure Prophylaxis is one of the most effective HIV prevention tools available. Yet PrEP awareness at Nigerian universities remains critically low. Our KWASU research tells the full story.",
    date: "June 2026",
    readTime: "7 min read",
    content: [
      { type: "lead", text: "Pre-Exposure Prophylaxis, known as PrEP, is a daily medication that reduces the risk of contracting HIV through sex by up to 99% when taken consistently. It has been available in Nigeria since 2017. And yet, if you asked students at your campus health centre about it, the chances are very high that they would not know what you were talking about." },
      { type: "heading", text: "What PrEP actually is" },
      { type: "body", text: "PrEP is not a treatment for HIV. It is a prevention tool for people who do not have HIV but may be at risk. It works by keeping the virus from establishing itself in the body if you are exposed. The most common form is a daily pill called Tenofovir/Emtricitabine (brand name Truvada), though long-acting injectable forms are now also available in some settings." },
      { type: "body", text: "PrEP is recommended for people who are HIV negative but have a partner living with HIV, people who do not consistently use condoms, and anyone who wants an additional layer of protection. It is safe, effective, and increasingly accessible in Nigeria through public health facilities." },
      { type: "heading", text: "What LUMA's research found at KWASU" },
      { type: "body", text: "LUMA's ongoing research on PrEP awareness at Kwara State University is revealing a significant awareness gap. Preliminary findings suggest that the majority of students surveyed had never heard of PrEP, and fewer still knew how to access it through the university's health centre or nearby public facilities. This is not unique to KWASU. It reflects a national pattern." },
      { type: "body", text: "PEPFAR data from before the 2025 funding cuts showed that 742,000 people across 28 African countries were on PEPFAR-funded PrEP. Following the cuts, an estimated 719,000 of those people lost access. Nigeria was one of the five countries most severely affected. This crisis makes campus-level PrEP awareness more critical, not less." },
      { type: "heading", text: "Why campus health centres stay silent" },
      { type: "body", text: "Campus health centres in Nigeria were not designed around sexual health. They were designed around malaria treatment, minor injury care, and routine checkups. HIV prevention, including PrEP, was never part of their original mandate. Without specific training for campus health staff, PrEP remains invisible in campus health conversations." },
      { type: "callout", text: "PrEP reduces the risk of getting HIV from sex by up to 99% when taken consistently. It is available in Nigeria. Your campus health centre probably has not told you this." },
      { type: "body", text: "This is one of LUMA's core advocacy targets: pushing Nigerian universities to train campus health staff on PrEP, integrate it into campus sexual health conversations, and make clear referral pathways available to any student who needs it." },
      { type: "heading", text: "How to access PrEP in Nigeria right now" },
      { type: "body", text: "Visit a public health facility near your university and ask specifically about PrEP. Many facilities receive PrEP through government programmes and it is available at low or no cost. You will need an HIV test first to confirm you are negative. After that, PrEP is prescribed and dispensed with follow-up appointments every three months. You do not need a referral. You can walk in and ask." },
    ],
    related: ["classroom-myth", "stigma-data", "uequals-u"]
  },
  {
    id: "stigma-data",
    tag: "DATA",
    title: "HIV stigma at Nigerian universities: what our data found and why it matters.",
    excerpt: "Our ongoing research across APYIN branches reveals a knowledge-attitude paradox: 96.85% of students know the facts about HIV, yet only 55.5% hold non-stigmatising attitudes toward PLHIV.",
    date: "June 2026",
    readTime: "6 min read",
    content: [
      { type: "lead", text: "The numbers are striking. Nearly every university student surveyed knows that HIV is not transmitted through casual contact. They know you cannot get it from sharing a classroom or a meal. And yet over 40% of those same students would be uncomfortable sitting beside someone they knew was HIV positive. This is the knowledge-attitude paradox, and it is at the heart of everything LUMA is trying to change." },
      { type: "heading", text: "What the research shows" },
      { type: "body", text: "LUMA's ongoing study on HIV stigma and mental health across APYIN branches is building on a growing body of evidence. A 2024 study of university students found that 96.85% demonstrated high AIDS knowledge. Yet only 55.52% had positive attitudes toward people living with HIV. The gap between knowing and acting with dignity is enormous." },
      { type: "body", text: "Specific stigma indicators from university student research include: 59.8% were unwilling to have contact with people living with HIV; 58.9% were uncomfortable eating at the same table; 60% were not willing to buy food from someone living with HIV; and 43.5% were uncomfortable shaking hands. These are not abstract statistics. These are the daily experiences of your classmates." },
      { type: "heading", text: "What stigma does to mental health" },
      { type: "body", text: "HIV-related stigma has direct, measurable consequences for mental health. For a university student already navigating the pressures of academic life, the additional burden of managing a stigmatised identity is significant. Research consistently links HIV stigma to higher rates of depression, anxiety, social withdrawal, and poorer treatment adherence among young people living with HIV." },
      { type: "body", text: "A 2021 Nigerian study found that only half of people living with HIV received sufficient support from family, friends, and significant others. On university campuses, where peer relationships are central to wellbeing, this isolation is particularly damaging." },
      { type: "heading", text: "Why knowledge alone is not enough" },
      { type: "body", text: "The knowledge-attitude paradox tells us something important: HIV education as it is currently delivered in Nigeria is not working. Telling people the facts about transmission does not automatically change how they feel about or treat their HIV positive peers. Stigma is a social phenomenon. It requires social solutions." },
      { type: "callout", text: "Knowing the facts about HIV is not the same as treating HIV positive people with dignity. LUMA exists in that gap." },
      { type: "body", text: "This is why LUMA's approach centres advocacy and community, not just information. The status neutral approach, which removes the separation between HIV positive and negative in how we deliver education and services, is specifically designed to address the social roots of stigma rather than just its informational causes." },
    ],
    related: ["classroom-myth", "your-rights", "first-year-diagnosis"]
  },
  {
    id: "your-rights",
    tag: "RIGHTS",
    title: "As an HIV positive student, you have rights on campus. Here is what they are.",
    excerpt: "From medical confidentiality to anti-discrimination protections, many Nigerian university students living with HIV do not know their legal rights. This post changes that.",
    date: "June 2026",
    readTime: "8 min read",
    content: [
      { type: "lead", text: "If you are a university student living with HIV in Nigeria, you have legal rights. Your HIV status is protected health information. You cannot be expelled, suspended, or discriminated against on the basis of your HIV status. You are entitled to reasonable accommodations if your health requires them. Most students living with HIV in Nigerian universities do not know any of this. That is a problem LUMA is determined to fix." },
      { type: "heading", text: "The HIV and AIDS Anti-Discrimination Act" },
      { type: "body", text: "Nigeria's HIV and AIDS Anti-Discrimination Act of 2014 is clear: no person shall be denied access to education on the grounds of their actual or perceived HIV status. This means a university cannot expel you, refuse your admission, or remove you from a programme because you are living with HIV. Any such action is unlawful." },
      { type: "body", text: "The Act also protects your right to privacy. Your HIV status is protected health information. No one at your university, including lecturers, hall wardens, or health centre staff, has the right to disclose your HIV status to other students, staff, or the public without your explicit consent." },
      { type: "heading", text: "Medical confidentiality on campus" },
      { type: "body", text: "When you access health services at your university health centre, your records are confidential. This includes HIV testing, treatment, and counselling. Staff at the health centre are bound by professional confidentiality obligations. If your status is ever disclosed without your consent, this is a violation of both your legal rights and professional ethics standards." },
      { type: "body", text: "In practice, we know confidentiality is not always maintained. Informal disclosure happens. If you experience a breach of confidentiality at your university, document it. Write down what happened, when, and who was involved. This creates a record you can use to make a formal complaint." },
      { type: "heading", text: "What your university should provide" },
      { type: "body", text: "Under Nigeria's 2026 to 2030 National HIV Prevention Plan, universities are expected to provide HIV testing and counselling services, referral pathways to treatment, and support for students living with HIV. In practice, most Nigerian universities do not yet meet this standard. This is the gap LUMA's advocacy work is targeting." },
      { type: "callout", text: "You cannot be expelled from a Nigerian university because you are living with HIV. Your medical records are confidential. These are not requests. They are rights." },
      { type: "body", text: "If you are experiencing discrimination at your university based on your HIV status, reach out to LUMA through our anonymous contact option. We can help you understand your options and connect you with support." },
    ],
    related: ["stigma-data", "first-year-diagnosis", "prep-explained"]
  },
  {
    id: "first-year-diagnosis",
    tag: "MENTAL HEALTH",
    title: "Navigating a new HIV diagnosis in your first year of university.",
    excerpt: "Receiving a diagnosis during the high-pressure environment of early university life is uniquely challenging. This piece, written with LUMA community members, maps what that journey can look like.",
    date: "June 2026",
    readTime: "9 min read",
    content: [
      { type: "lead", text: "This piece was written with members of the LUMA community who received their HIV diagnosis during university. Their experiences are their own. We share them here with gratitude and with their permission. If you are currently navigating a new diagnosis, this is for you." },
      { type: "heading", text: "The first weeks" },
      { type: "body", text: "The weeks following an HIV diagnosis are often described in similar ways regardless of where or when they happen: shock, fear, isolation, and an overwhelming sense that everything has changed. For a first-year student, this arrives on top of already intense transitions. A new city. A new academic environment. A new social world. A new identity to build." },
      { type: "body", text: "Many students describe a period of complete withdrawal in the immediate aftermath of a diagnosis. Skipping lectures. Avoiding friends. Spending days in the hostel room. This is an understandable response to overwhelming news. It is not permanent. And it does not mean you are not going to be okay." },
      { type: "heading", text: "What actually helps" },
      { type: "body", text: "Getting into treatment quickly matters, not just for your physical health but for your mental health too. Starting antiretroviral therapy (ART) and seeing your viral load begin to drop gives many people a sense of agency that reduces the psychological weight of a diagnosis. Treatment works. And treatment in Nigeria is more accessible than most students realise." },
      { type: "body", text: "Community matters equally. Connecting with even one other person who understands what you are navigating changes the experience significantly. The Peer Circle exists specifically for this. You do not need to process this alone. You were never supposed to." },
      { type: "heading", text: "Managing your academic life" },
      { type: "body", text: "You do not have to disclose your HIV status to access academic support. If your health is affecting your studies, you can speak to your academic adviser or student welfare office about a medical situation without specifying what it is. Universities generally have provisions for students experiencing health challenges. Ask about deferral options, extensions, and welfare support." },
      { type: "callout", text: "A diagnosis is information about your health. It is not a verdict on your future. Students living with HIV graduate. They build careers. They have relationships. They live full lives. This is not the exception. It is the rule." },
      { type: "body", text: "If you received your HIV diagnosis recently and you are a university student in Nigeria, please consider joining The Peer Circle. You do not need to share your name. You do not need to share your story. You just need to know there is a room full of people who understand. There is." },
    ],
    related: ["your-rights", "stigma-data", "uequals-u"]
  },
  {
    id: "uequals-u",
    tag: "PREVENTION",
    title: "U=U: What Undetectable equals Untransmittable means for you and your campus.",
    excerpt: "The U=U science is settled. But awareness among Nigerian students is almost zero. We explain what this means, why it matters, and how it changes the conversation around HIV on campus.",
    date: "June 2026",
    readTime: "6 min read",
    content: [
      { type: "lead", text: "U=U stands for Undetectable equals Untransmittable. It is one of the most important advances in HIV science of the past decade. A person living with HIV who is on effective treatment and has achieved an undetectable viral load cannot transmit HIV to a sexual partner. This is settled science, endorsed by the World Health Organization, the CDC, and every major HIV research body in the world. It is not widely known in Nigerian universities." },
      { type: "heading", text: "What undetectable means" },
      { type: "body", text: "When someone living with HIV takes antiretroviral therapy consistently, the medication suppresses the virus to levels that cannot be detected by standard blood tests. This is called an undetectable viral load. It typically takes between three and six months of consistent treatment to achieve, and it is maintained by continuing medication." },
      { type: "body", text: "Large clinical studies, including the landmark PARTNER and Opposites Attract studies, followed thousands of serodiscordant couples (where one partner is HIV positive and one is HIV negative) over years. Across tens of thousands of sex acts between couples where the HIV positive partner had an undetectable viral load, there were zero transmissions. Zero." },
      { type: "heading", text: "Why this changes everything" },
      { type: "body", text: "U=U fundamentally changes the conversation about HIV and relationships. A student living with HIV who is on treatment and undetectable poses no risk of transmitting HIV to a partner. This knowledge reduces stigma, because much of the fear around HIV positive people is rooted in fear of transmission. When transmission is not possible, that fear loses its basis." },
      { type: "body", text: "U=U also provides enormous mental health benefits for people living with HIV. The fear of accidentally transmitting HIV to someone you love is one of the most significant psychological burdens of living with HIV. U=U removes that fear entirely for people who are on treatment." },
      { type: "callout", text: "A person living with HIV who is on effective treatment and has an undetectable viral load cannot transmit HIV sexually. This is not an opinion. It is settled science endorsed by the WHO." },
      { type: "heading", text: "What needs to change on Nigerian campuses" },
      { type: "body", text: "U=U awareness among Nigerian university students is very close to zero. This means that students living with HIV who are on treatment and undetectable are still being treated as though they pose a transmission risk. This is both scientifically incorrect and deeply unfair. Spreading U=U awareness is one of the most direct ways to reduce HIV stigma on campuses. LUMA is committed to making U=U common knowledge in every Nigerian university." },
    ],
    related: ["classroom-myth", "prep-explained", "first-year-diagnosis"]
  },
];

// ─── THEME SYSTEM ───────────────────────────────────────────────────────────────

const COLOR_THEMES = {
  watcher: { id: "watcher", name: "The Watcher", primary: "#1A3329", accent: "#7A9E8E", accentLight: "#D4E2D8", border: "#C8DDD0" },
  plum:    { id: "plum",    name: "Deep Plum",   primary: "#2D1B3D", accent: "#A89BB5", accentLight: "#EDE8F5", border: "#D8D0E0" },
  terra:   { id: "terra",   name: "Terracotta",  primary: "#7C3A2D", accent: "#C4A882", accentLight: "#F5EBE0", border: "#E0CFC0" },
};

const getTheme = (colorId, isDark) => {
  const c = COLOR_THEMES[colorId];
  return {
    ...c, isDark,
    bg:          isDark ? "#0D0D0D" : "#F7F3EC",
    bgAlt:       isDark ? "#161616" : c.accentLight,
    surface:     isDark ? "#1A1A1A" : "#FFFFFF",
    card:        isDark ? "#1E1E1E" : "#FFFFFF",
    text:        isDark ? "#F7F3EC" : "#1A1A1A",
    textMuted:   isDark ? "#888888" : "#5A6478",
    textLight:   "#F7F3EC",
    borderColor: isDark ? "#2C2C2C" : c.border,
    navBg:       isDark ? "#111111" : c.primary,
    footerBg:    isDark ? "#111111" : c.primary,
    ivory:       "#F7F3EC",
  };
};

// ─── ICONS ───────────────────────────────────────────────────────────────────

const Logo = ({ size = 32, variant = "color" }: { color?: string; size?: number; variant?: "color" | "light" }) => (
  <img
    src={variant === "light" ? lumaLogoLight.url : lumaLogoColor.url}
    alt="LUMA — Luminating Africa"
    height={size}
    style={{ height: size, width: "auto", display: "block" }}
  />
);
const ArrowRight = ({ color, size = 16 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);
const ArrowLeft  = ({ color, size = 16 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>);
const SunIcon    = ({ color }) => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>);
const MoonIcon   = ({ color }) => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>);
const MenuIcon   = ({ color }) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>);
const CloseIcon  = ({ color }) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
const CheckIcon  = ({ color = "#1A3329" }) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>);

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

const Tag = ({ t, children, light }) => (
  <span style={{ display: "inline-block", background: light ? "rgba(247,243,236,0.15)" : t.accentLight, color: light ? t.ivory : t.primary, fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", padding: "5px 12px", borderRadius: 100, textTransform: "uppercase", border: `1px solid ${light ? "rgba(247,243,236,0.2)" : t.borderColor}` }}>{children}</span>
);

const Btn = ({ t, children, onClick, variant = "primary", style: ex = {}, type = "button" }) => {
  const base = { fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.5px", padding: "13px 28px", borderRadius: 100, cursor: "pointer", transition: "all 0.2s", border: "2px solid transparent", ...ex };
  const variants = {
    primary:   { ...base, background: t.primary, color: t.ivory, border: `2px solid ${t.primary}` },
    secondary: { ...base, background: "transparent", color: t.primary, border: `2px solid ${t.primary}` },
    light:     { ...base, background: t.ivory, color: t.primary },
    ghost:     { ...base, background: "transparent", color: t.ivory, border: "2px solid rgba(247,243,236,0.4)" },
  };
  return <button type={type} style={variants[variant]} onClick={onClick}>{children}</button>;
};

const SectionLabel = ({ t, children, light }) => (
  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: light ? t.accent : t.accent, textTransform: "uppercase", marginBottom: 12 }}>{children}</p>
);

const Card = ({ t, children, style: ex = {}, ...rest }) => (
  <div {...rest} style={{ background: t.card, border: `1px solid ${t.borderColor}`, borderRadius: 16, padding: 32, ...ex }}>{children}</div>
);

const Input = ({ t, placeholder, type = "text", value, onChange, style: ex = {} }) => (
  <input type={type} placeholder={placeholder} value={value} onChange={onChange}
    style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: `1.5px solid ${t.borderColor}`, background: t.isDark ? t.surface : "#fff", color: t.text, fontFamily: "'DM Sans',sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box", ...ex }} />
);

const Textarea = ({ t, placeholder, value, onChange, rows = 5 }) => (
  <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows}
    style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: `1.5px solid ${t.borderColor}`, background: t.isDark ? t.surface : "#fff", color: t.text, fontFamily: "'DM Sans',sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box", resize: "vertical" }} />
);

const Select = ({ t, children, value, onChange }) => (
  <select value={value} onChange={onChange}
    style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: `1.5px solid ${t.borderColor}`, background: t.isDark ? t.surface : "#fff", color: t.text, fontFamily: "'DM Sans',sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box", cursor: "pointer" }}>
    {children}
  </select>
);

const FormSuccess = ({ t, message }) => (
  <div style={{ background: t.accentLight, border: `1.5px solid ${t.accent}`, borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
    <CheckIcon color={t.primary} />
    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.primary, fontWeight: 500 }}>{message}</p>
  </div>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────

export const Nav = ({ t, colorId, setColorId, isDark, setIsDark, page, setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [["About", "about"], ["Our Work", "work"], ["Resources", "resources"], ["Get Involved", "involve"], ["Games", "games"]];

  const navLink = (label, id) => ({
    color: page === id ? t.ivory : "rgba(247,243,236,0.72)",
    fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 500,
    cursor: "pointer", transition: "color 0.2s", letterSpacing: "0.3px", userSelect: "none",
  });

  const dot = (id) => ({
    width: 22, height: 22, borderRadius: "50%", background: COLOR_THEMES[id].primary,
    cursor: "pointer", flexShrink: 0, transition: "all 0.2s", padding: 0,
    boxShadow: colorId === id ? `0 0 0 2px ${t.isDark ? "#222" : t.ivory}, 0 0 0 4px ${COLOR_THEMES[id].accent}` : "none",
    border: id === "plum" && colorId !== id ? "1px solid rgba(255,255,255,0.2)" : "none",
  });

  const darkToggle = {
    background: "rgba(255,255,255,0.14)", border: "none", borderRadius: 100,
    width: 38, height: 22, cursor: "pointer", display: "flex",
    alignItems: "center", justifyContent: isDark ? "flex-end" : "flex-start",
    padding: "3px 4px", transition: "all 0.2s", flexShrink: 0,
  };

  return (
    <>
      <nav style={{ background: t.navBg, padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, transition: "background 0.3s", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <button onClick={() => setPage("home")} aria-label="LUMA home" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}><Logo variant="light" size={36} /></button>

        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
          {links.map(([label, id]) => (
            <button key={id} type="button" style={{ ...navLink(label, id), background: "none", border: "none" }} onClick={() => setPage(id)}
              onMouseEnter={e => e.currentTarget.style.color = t.ivory}
              onMouseLeave={e => e.currentTarget.style.color = page === id ? t.ivory : "rgba(247,243,236,0.72)"}>{label}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="desktop-theme-controls" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 14, borderRight: "1px solid rgba(255,255,255,0.12)" }}>
              {Object.keys(COLOR_THEMES).map(id => (
                <button key={id} type="button" style={dot(id)} onClick={() => setColorId(id)} aria-label={`${COLOR_THEMES[id].name} theme`} aria-pressed={colorId === id} title={COLOR_THEMES[id].name} />
              ))}
            </div>
            <button type="button" style={darkToggle} onClick={() => setIsDark(!isDark)} title={isDark ? "Light mode" : "Dark mode"} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              <div style={{ width: 15, height: 15, borderRadius: "50%", background: t.ivory, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                {isDark ? <MoonIcon color={t.primary} /> : <SunIcon color={t.primary} />}
              </div>
            </button>
          </div>
          <button onClick={() => setPage("involve")} style={{ background: t.ivory, color: t.primary, border: "none", padding: "9px 20px", borderRadius: 100, fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", cursor: "pointer", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>Join LUMA</button>
          <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "none" }} className="mobile-menu-btn"><MenuIcon color={t.ivory} /></button>
        </div>

      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: t.navBg, zIndex: 200, display: "flex", flexDirection: "column", padding: 32, overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
            <Logo variant="light" size={40} />
            <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setMenuOpen(false)}><CloseIcon color={t.ivory} /></button>
          </div>
          {links.map(([label, id]) => (
            <button key={id} type="button"
              style={{ background: "none", border: "none", textAlign: "left", color: t.ivory, fontSize: 32, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", cursor: "pointer", padding: "14px 0", borderBottom: "1px solid rgba(247,243,236,0.1)", width: "100%" }}
              onClick={() => { setPage(id); setMenuOpen(false); }}>{label}</button>
          ))}
          <div style={{ marginTop: 40, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            {Object.keys(COLOR_THEMES).map(id => (
              <button key={id} type="button" aria-label={`${COLOR_THEMES[id].name} theme`} aria-pressed={colorId === id} style={{ ...dot(id), width: 36, height: 36 }} onClick={() => setColorId(id)} />
            ))}
            <button type="button" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} style={{ ...darkToggle, marginLeft: 8, width: 52, height: 30 }} onClick={() => setIsDark(!isDark)}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: t.ivory, display: "flex", alignItems: "center", justifyContent: "center" }}>{isDark ? <MoonIcon color={t.primary} /> : <SunIcon color={t.primary} />}</div>
            </button>
          </div>
          <button onClick={() => { setPage("involve"); setMenuOpen(false); }} style={{ marginTop: 32, background: t.ivory, color: t.primary, border: "none", padding: "16px 32px", borderRadius: 100, fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", cursor: "pointer" }}>Join LUMA</button>
        </div>
      )}
    </>
  );
};

// ─── FOOTER ──────────────────────────────────────────────────────────────────

export const Footer = ({ t, setPage }) => {
  const col = (heading, links) => (
    <div>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: t.accent, marginBottom: 16, textTransform: "uppercase" }}>{heading}</p>
      {links.map(([label, action]) => (
        <button key={label} type="button" onClick={action} style={{ background: "none", border: "none", textAlign: "left", color: "rgba(247,243,236,0.65)", fontSize: 14, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", display: "block", marginBottom: 10, transition: "color 0.2s", padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = t.ivory}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(247,243,236,0.65)"}>{label}</button>
      ))}
    </div>
  );
  return (
    <footer style={{ background: t.footerBg, padding: "64px 32px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <Logo variant="light" size={32} />
            <p style={{ color: "rgba(247,243,236,0.6)", fontSize: 14, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6, marginTop: 12, maxWidth: 240 }}>Closing HIV information gaps in Nigerian universities. Built by youth, for youth.</p>
          </div>
          {col("Navigate", [["About LUMA", () => setPage("about")], ["Our Work", () => setPage("work")], ["Campus Truth Series", () => setPage("truth")], ["The Peer Circle", () => setPage("circle")], ["Advocacy", () => setPage("advocacy")], ["Resources", () => setPage("resources")], ["Games", () => setPage("games")]])}
          {col("Get Involved", [["Join The Peer Circle", () => setPage("circle")], ["Become an Ambassador", () => setPage("involve")], ["Volunteer", () => setPage("involve")], ["Partner with LUMA", () => setPage("contact")]])}
          {col("Connect", [["Instagram", () => window.open("https://instagram.com/luma_ng", "_blank")], ["X (Twitter)", () => window.open("https://twitter.com/luma_ng", "_blank")], ["LinkedIn", () => window.open("https://linkedin.com/company/luma_ng", "_blank")], ["hello@luma.org.ng", () => window.location.href = "mailto:hello@luma.org.ng"]])}
        </div>
        <div style={{ borderTop: "1px solid rgba(247,243,236,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(247,243,236,0.4)", fontSize: 12, fontFamily: "'DM Sans',sans-serif" }}>© 2026 LUMA. A youth-led digital organisation registered in Nigeria.</span>
          <span style={{ color: "rgba(247,243,236,0.4)", fontSize: 12, fontFamily: "'DM Sans',sans-serif" }}>Designed by .bare</span>
        </div>
      </div>
    </footer>
  );
};

// ─── STORY DETAIL PAGE ───────────────────────────────────────────────────────

export const StoryPage = ({ t, story, setPage, setStoryId }) => {
  const related = STORIES.filter(s => story.related.includes(s.id));
  const s = {
    hero: { background: t.primary, padding: "100px 32px 60px" },
    inner: { maxWidth: 760, margin: "0 auto" },
    wide: { maxWidth: 1100, margin: "0 auto" },
    h1: { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800, color: t.ivory, lineHeight: 1.15, marginTop: 16 },
    back: { background: "none", border: "none", cursor: "pointer", color: "rgba(247,243,236,0.7)", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, padding: 0, marginBottom: 32 },
    section: { padding: "64px 32px", background: t.bg },
    lead: { fontFamily: "'DM Sans',sans-serif", fontSize: 20, color: t.text, lineHeight: 1.8, fontWeight: 500, marginBottom: 32, borderLeft: `4px solid ${t.accent}`, paddingLeft: 24 },
    heading: { fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: t.text, marginTop: 40, marginBottom: 16 },
    body: { fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: t.textMuted, lineHeight: 1.8, marginBottom: 20 },
    callout: { background: t.isDark ? t.card : t.accentLight, border: `1px solid ${t.borderColor}`, borderLeft: `4px solid ${t.accent}`, borderRadius: "0 12px 12px 0", padding: "24px 28px", margin: "32px 0", fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 600, color: t.primary, lineHeight: 1.6 },
    relatedSection: { padding: "64px 32px", background: t.isDark ? t.surface : t.accentLight },
    relatedGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 32 },
    relatedCard: { background: t.card, border: `1px solid ${t.borderColor}`, borderRadius: 14, padding: 24, cursor: "pointer", transition: "transform 0.2s" },
  };

  return (
    <div>
      <div style={s.hero}>
        <div style={s.inner}>
          <button style={s.back} onClick={() => setPage("truth")}>
            <ArrowLeft color="rgba(247,243,236,0.7)" size={14} /> Back to Campus Truth Series
          </button>
          <Tag t={t} light>{story.tag}</Tag>
          <h1 style={s.h1}>{story.title}</h1>
          <p style={{ color: "rgba(247,243,236,0.55)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, marginTop: 20 }}>{story.date} · {story.readTime}</p>
        </div>
      </div>

      <section style={s.section}>
        <div style={s.inner}>
          {story.content.map((block, i) => {
            if (block.type === "lead") return <p key={i} style={s.lead}>{block.text}</p>;
            if (block.type === "heading") return <h2 key={i} style={s.heading}>{block.text}</h2>;
            if (block.type === "body") return <p key={i} style={s.body}>{block.text}</p>;
            if (block.type === "callout") return <div key={i} style={s.callout}>{block.text}</div>;
            return null;
          })}

          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${t.borderColor}` }}>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: t.accent, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Found this useful?</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn t={t} variant="primary" onClick={() => setPage("circle")}>Join The Peer Circle</Btn>
              <Btn t={t} variant="secondary" onClick={() => { setPage("contact"); }}>Submit a Myth</Btn>
            </div>
          </div>
        </div>
      </section>

      <section style={s.relatedSection}>
        <div style={s.wide}>
          <SectionLabel t={t}>Continue Reading</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, color: t.text, marginBottom: 0 }}>More from the Campus Truth Series</h2>
          <div style={s.relatedGrid}>
            {related.map(rs => (
              <div key={rs.id} style={s.relatedCard} onClick={() => { setStoryId(rs.id); setPage("story"); window.scrollTo(0,0); }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <Tag t={t}>{rs.tag}</Tag>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.4, margin: "12px 0 8px" }}>{rs.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: t.textMuted }}>{rs.readTime}</p>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: t.accent, display: "flex", alignItems: "center", gap: 4, marginTop: 12 }}>Read <ArrowRight color={t.accent} size={12} /></p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Btn t={t} variant="primary" onClick={() => setPage("truth")}>All Campus Truth Posts</Btn>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

export const HomePage = ({ t, setPage, setStoryId }) => {
  const s = {
    hero: { background: t.primary, minHeight: "92vh", display: "flex", alignItems: "center", padding: "80px 32px", position: "relative", overflow: "hidden" },
    h1: { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,76px)", fontWeight: 800, color: t.ivory, lineHeight: 1.06, marginTop: 20, marginBottom: 24, letterSpacing: "-1px" },
    heroSub: { fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "rgba(247,243,236,0.72)", lineHeight: 1.75, marginBottom: 40, maxWidth: 520 },
    section: { padding: "96px 32px", background: t.bg },
    sectionAlt: { padding: "96px 32px", background: t.isDark ? t.surface : t.accentLight },
    sectionDark: { padding: "96px 32px", background: t.primary },
    inner: { maxWidth: 1100, margin: "0 auto" },
    h2: { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: t.text, lineHeight: 1.1, marginBottom: 20 },
    h2Light: { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: t.ivory, lineHeight: 1.1, marginBottom: 20 },
    body: { fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: t.textMuted, lineHeight: 1.75 },
    bodyLight: { fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: "rgba(247,243,236,0.7)", lineHeight: 1.75 },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginTop: 48 },
    pillarNum: { fontFamily: "'Space Grotesk',sans-serif", fontSize: 52, fontWeight: 800, color: t.isDark ? t.card : t.accentLight, lineHeight: 1, marginBottom: 12 },
    linkText: { fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: t.accent, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 },
  };

  const pillars = [
    { num: "01", title: "Inform", body: "Status neutral HIV education built for Nigerian campuses. No separation. Everyone learns together.", page: "truth" },
    { num: "02", title: "Advocate", body: "We push for anti-discrimination policies, campus health reform, and youth voices in Nigeria's national HIV plan.", page: "advocacy" },
    { num: "03", title: "Belong", body: "A safe digital community for university students living with HIV. Peer-led. Anonymous where needed.", page: "circle" },
  ];

  return (
    <div>
      <section style={s.hero}>
        <svg style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", opacity: 0.05, pointerEvents: "none" }} width="700" height="700" viewBox="0 0 700 700"><path d="M100 600 Q350 50 600 600" stroke="white" strokeWidth="130" fill="none" strokeLinecap="round"/></svg>
        <div style={{ maxWidth: 640, position: "relative", zIndex: 2 }}>
          <Tag t={t} light>Luminating Africa</Tag>
          <h1 style={s.h1}>No student should navigate HIV on campus alone.</h1>
          <p style={s.heroSub}>LUMA is a youth-led organisation closing HIV information gaps in Nigerian universities, fighting for campus health policy change, and building community for students who need it most.</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Btn t={t} variant="light" onClick={() => setPage("about")}>Learn About LUMA</Btn>
            <Btn t={t} variant="ghost" onClick={() => setPage("work")}>See Our Work</Btn>
          </div>
        </div>
      </section>

      <div style={{ background: t.bg, padding: "48px 32px", borderBottom: `1px solid ${t.borderColor}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, maxWidth: 900, margin: "0 auto" }}>
          {[["1.4%", "National HIV prevalence in Nigeria", "UNAIDS 2025"], ["0", "Dedicated HIV platforms for Nigerian university students before LUMA", "As of June 2026"], ["55%", "of students hold stigmatising attitudes toward PLHIV", "Despite 96% HIV knowledge"]].map(([num, label, src], i) => (
            <div key={i} style={{ textAlign: "center", padding: "24px 16px", borderRight: i < 2 ? `1px solid ${t.borderColor}` : "none" }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: t.primary, lineHeight: 1, marginBottom: 8 }}>{num}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: t.textMuted, lineHeight: 1.4 }}>{label}</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, color: t.accent, marginTop: 6, fontWeight: 600, letterSpacing: "0.5px" }}>{src}</div>
            </div>
          ))}
        </div>
      </div>

      <section style={s.section}>
        <div style={s.inner}>
          <SectionLabel t={t}>What LUMA Does</SectionLabel>
          <h2 style={s.h2}>Three promises.<br />One organisation.</h2>
          <div style={s.grid3}>
            {pillars.map(p => (
              <Card key={p.num} t={t}>
                <div style={s.pillarNum}>{p.num}</div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 12 }}>{p.title}</h3>
                <p style={{ ...s.body, marginBottom: 20 }}>{p.body}</p>
                <span style={s.linkText} onClick={() => setPage(p.page)}>Explore {p.title} <ArrowRight color={t.accent} size={13} /></span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={s.sectionDark}>
        <div style={{ ...s.inner, textAlign: "center" }}>
          <SectionLabel t={t}>The Status Neutral Promise</SectionLabel>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,3.5vw,44px)", fontWeight: 700, color: t.ivory, lineHeight: 1.3, maxWidth: 780, margin: "24px auto" }}>We do not separate the positive from the negative. We build one community.</p>
          <p style={{ ...s.bodyLight, maxWidth: 640, margin: "0 auto 40px" }}>LUMA operates on the status neutral approach: the same information, the same care, and the same community for every student regardless of HIV status.</p>
          <Btn t={t} variant="ghost" onClick={() => setPage("about")}>Read More About Our Approach</Btn>
        </div>
      </section>

      <section style={s.sectionAlt}>
        <div style={s.inner}>
          <SectionLabel t={t}>From the Campus Truth Series</SectionLabel>
          <h2 style={s.h2}>What students get wrong<br />about HIV</h2>
          <div style={s.grid3}>
            {STORIES.slice(0, 3).map(story => (
              <Card key={story.id} t={t} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Tag t={t}>{story.tag}</Tag>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, color: t.text, lineHeight: 1.4 }}>{story.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: t.textMuted, lineHeight: 1.6 }}>{story.excerpt.slice(0, 100)}...</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: t.textMuted }}>{story.date} · {story.readTime}</p>
                <span style={s.linkText} onClick={() => { setStoryId(story.id); setPage("story"); window.scrollTo(0,0); }}>Read More <ArrowRight color={t.accent} size={12} /></span>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <Btn t={t} variant="primary" onClick={() => setPage("truth")}>See All Campus Truth Posts</Btn>
          </div>
        </div>
      </section>


      <section style={s.section}>
        <div style={s.inner}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", background: t.isDark ? t.card : t.accentLight, borderRadius: 24, padding: "64px 40px", border: `1px solid ${t.borderColor}` }}>
            <SectionLabel t={t}>Play and Learn</SectionLabel>
            <h2 style={{ ...s.h2, maxWidth: 600 }}>Three games that teach you what a lecture never will.</h2>
            <p style={{ ...s.body, maxWidth: 540, marginBottom: 32 }}>Myth Buster, LUMA Challenge Quiz, and Campus Quest. Each game under 10 minutes. Each one changes how you see HIV on your campus.</p>
            <Btn t={t} variant="primary" onClick={() => setPage("games")}>Play Now</Btn>
          </div>
        </div>
      </section>
      <section style={s.section}>
        <div style={s.inner}>
          <div style={{ background: t.isDark ? t.card : "rgba(247,243,236,0.7)", borderRadius: 20, padding: 48, borderLeft: `4px solid ${t.accent}`, maxWidth: 780, margin: "0 auto" }}>
            <SectionLabel t={t}>A Note From Our Founder</SectionLabel>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 20, fontStyle: "italic", color: t.text, lineHeight: 1.75, marginBottom: 24, marginTop: 16 }}>"I grew up with HIV. I went to university with HIV. And I spent those years figuring things out completely alone because no one had built anything for students like me. LUMA is what I needed and did not have. It is for every student sitting where I once sat."</p>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: t.primary }}>Adebare Hammed — Founder, LUMA | Computer Science, Kwara State University</p>
            <div style={{ marginTop: 24 }}><Btn t={t} variant="primary" onClick={() => setPage("about")}>Meet the Founder</Btn></div>
          </div>
        </div>
      </section>

      <section style={{ background: t.primary, padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ ...s.h2Light, textAlign: "center" }}>Ready to be part of something real?</h2>
          <p style={{ ...s.bodyLight, marginBottom: 40 }}>Whether you are a student, researcher, health worker, or someone with lived HIV experience, LUMA has a place for you.</p>
          <Btn t={t} variant="light" onClick={() => setPage("involve")}>Get Involved</Btn>
        </div>
      </section>
    </div>
  );
};

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

export const AboutPage = ({ t }) => {
  const s = {
    hero: { background: t.primary, padding: "120px 32px 80px" },
    inner: { maxWidth: 1100, margin: "0 auto" },
    section: { padding: "80px 32px", background: t.bg },
    sectionAlt: { padding: "80px 32px", background: t.isDark ? t.surface : t.accentLight },
    sectionDark: { padding: "80px 32px", background: t.primary },
    h1: { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: t.ivory, lineHeight: 1.1, marginTop: 16 },
    h2: { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: t.text, lineHeight: 1.2, marginBottom: 20 },
    h2Light: { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: t.ivory, lineHeight: 1.2, marginBottom: 20 },
    body: { fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: t.textMuted, lineHeight: 1.8, marginBottom: 16 },
    bodyLight: { fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: "rgba(247,243,236,0.7)", lineHeight: 1.8, marginBottom: 16 },
  };
  return (
    <div>
      <div style={s.hero}>
        <div style={s.inner}>
          <Tag t={t} light>Our Story</Tag>
          <h1 style={s.h1}>Built from lived experience.<br />Built for every student.</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "rgba(247,243,236,0.72)", lineHeight: 1.7, maxWidth: 620, marginTop: 20 }}>LUMA was founded in 2026 by Adebare Hammed, a young person living with HIV since childhood, a Computer Science undergraduate at Kwara State University, and a youth advocate who spent years navigating HIV in spaces that were not built for him.</p>
        </div>
      </div>

      <section style={s.section}>
        <div style={s.inner}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <SectionLabel t={t}>The Problem Nobody Named</SectionLabel>
              <h2 style={s.h2}>The gap LUMA fills</h2>
              <p style={s.body}>Nigeria has over 1.9 million people living with HIV. Stigma prevalence is at 67%. University campuses have no dedicated HIV resource, no anti-discrimination policy, and no peer community for students navigating a positive status.</p>
              <p style={s.body}>LUMA does not replicate what NEPWHAN or ANAYD do. We go where they have not gone: directly onto the campus, into the student's digital life, before the crisis arrives.</p>
            </div>
            <div style={{ background: t.primary, borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 80, fontWeight: 800, color: t.ivory, lineHeight: 1 }}>0</div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "rgba(247,243,236,0.7)", lineHeight: 1.5, marginTop: 12 }}>Dedicated HIV platforms for Nigerian university students before LUMA</p>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, color: t.accent, marginTop: 16, letterSpacing: "1px" }}>AS OF JUNE 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section style={s.sectionAlt}>
        <div style={s.inner}>
          <SectionLabel t={t}>How We Think About HIV</SectionLabel>
          <h2 style={s.h2}>The status neutral foundation</h2>
          <p style={s.body}>LUMA is built on the status neutral approach, a modern HIV framework that puts the person ahead of their HIV status. It means we do not run separate programs for positive and negative students. We build one space, one curriculum, one community.</p>
          <p style={s.body}>Because the divide between positive and negative is exactly where stigma lives, and LUMA refuses to replicate it.</p>
        </div>
      </section>

      <section style={s.sectionDark}>
        <div style={s.inner}>
          <SectionLabel t={t}>The Founder</SectionLabel>
          <h2 style={s.h2Light}>Adebare Hammed</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {["Youth Advocate", "Peer Mentor", "CS Undergraduate", "HIV Activist", "Researcher"].map(r => (
              <span key={r} style={{ background: "rgba(247,243,236,0.12)", color: t.ivory, fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 100 }}>{r}</span>
            ))}
          </div>
          <p style={s.bodyLight}>Adebare is completing a Computer Science degree at Kwara State University in July 2026. His research spans PrEP awareness at KWASU and HIV stigma and mental health across Nigeria. He has facilitated sessions at the Adolescent Girls Summit 2026 in Yamoussoukro and participated in the African Regional Convening by Sonke Gender Justice in Nairobi.</p>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: t.accent, marginTop: 20 }}>UNESCO Nigeria Youth Network · Kectil Global Leadership Program · Aspire Leadership Program · Leaders of Africa Institute (September 2026)</p>
        </div>
      </section>

      <section style={s.section}>
        <div style={s.inner}>
          <SectionLabel t={t}>Our Evidence Base</SectionLabel>
          <h2 style={s.h2}>Our research</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginTop: 32 }}>
            {[
              { title: "PrEP Awareness at Kwara State University", body: "Examining PrEP knowledge, barriers to access, and the role of campus health services in PrEP education among KWASU students." },
              { title: "HIV Stigma and Mental Health Across APYIN Branches", body: "A multi-site study on the relationship between HIV-related stigma and mental health outcomes among young people living with HIV across Nigeria." }
            ].map((study, i) => (
              <Card key={i} t={t}>
                <Tag t={t}>Ongoing Research</Tag>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 19, fontWeight: 700, color: t.text, lineHeight: 1.4, marginTop: 16, marginBottom: 12 }}>{study.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.textMuted, lineHeight: 1.7 }}>{study.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── CAMPUS TRUTH PAGE ────────────────────────────────────────────────────────

export const TruthPage = ({ t, setPage, setStoryId }) => (
  <div>
    <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Tag t={t} light>From the Inform Pillar</Tag>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, color: t.ivory, lineHeight: 1.1, marginTop: 16 }}>The Campus Truth Series</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "rgba(247,243,236,0.7)", lineHeight: 1.7, maxWidth: 580, marginTop: 16 }}>HIV myths do not belong on university campuses. We are replacing them, one truth at a time, with evidence from real Nigerian research.</p>
      </div>
    </div>
    <section style={{ padding: "80px 32px", background: t.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {STORIES.map(story => (
            <Card key={story.id} t={t} style={{ display: "flex", flexDirection: "column", gap: 12, cursor: "pointer", transition: "transform 0.2s" }}
              onClick={() => { setStoryId(story.id); setPage("story"); window.scrollTo(0,0); }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <Tag t={t}>{story.tag}</Tag>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: t.text, lineHeight: 1.4 }}>{story.title}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: t.textMuted, lineHeight: 1.6 }}>{story.excerpt}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: t.textMuted }}>{story.date} · {story.readTime}</p>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: t.accent, display: "flex", alignItems: "center", gap: 6 }}>Read Full Story <ArrowRight color={t.accent} size={12} /></span>
            </Card>
          ))}
        </div>
      </div>
    </section>
    <section style={{ background: t.primary, padding: "80px 32px", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, color: t.ivory, marginBottom: 16 }}>Heard something about HIV you are not sure about?</h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "rgba(247,243,236,0.7)", marginBottom: 32 }}>Send it to us. If it is a myth circulating on your campus, we will research it and publish the truth.</p>
        <Btn t={t} variant="light" onClick={() => setPage("contact")}>Submit a Myth</Btn>
      </div>
    </section>
  </div>
);

// ─── PEER CIRCLE PAGE ─────────────────────────────────────────────────────────

export const CirclePage = ({ t }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!form.username || !form.email) return;
    try {
      await fetch("https://formspree.io/f/xpwzqkgd", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _subject: "New Peer Circle Application", ...form })
      });
    } catch {}
    setSubmitted(true);
  };

  const s = {
    hero: { background: t.primary, padding: "120px 32px 80px" },
    inner: { maxWidth: 900, margin: "0 auto" },
    section: { padding: "80px 32px", background: t.bg },
    sectionAlt: { padding: "80px 32px", background: t.isDark ? t.surface : t.accentLight },
    h2: { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: t.text, lineHeight: 1.2, marginBottom: 20 },
    body: { fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: t.textMuted, lineHeight: 1.8, marginBottom: 16 },
  };

  return (
    <div>
      <div style={s.hero}>
        <div style={s.inner}>
          <Tag t={t} light>From the Belong Pillar</Tag>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, color: t.ivory, lineHeight: 1.1, marginTop: 16 }}>You do not have to figure this out alone.</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "rgba(247,243,236,0.7)", lineHeight: 1.7, maxWidth: 540, marginTop: 16 }}>The Peer Circle is a closed digital community for university students living with HIV in Nigeria. Peer-led. Confidential. Built by people who understand.</p>
        </div>
      </div>

      <section style={s.section}>
        <div style={s.inner}>
          <SectionLabel t={t}>A Space Built For You</SectionLabel>
          <h2 style={s.h2}>What the Peer Circle is</h2>
          <p style={s.body}>The Peer Circle is not a forum. It is not a helpline. It is a community of Nigerian university students who are navigating HIV together. Some members share openly. Others prefer anonymity. Both are equally welcome and equally safe here.</p>
          <p style={s.body}>Inside The Peer Circle you will find peer support conversations, shared resources for campus life with HIV, and guidance from people who have been in your exact position.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24, marginTop: 40 }}>
            {[["01", "Apply", "Fill out a short confidential form. No real name required."], ["02", "Join", "Once verified, you receive access and choose your own display name."], ["03", "Connect", "Participate as much or as little as you want. No pressure."]].map(([num, title, body]) => (
              <Card key={num} t={t}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 48, fontWeight: 800, color: t.isDark ? t.card : t.accentLight, lineHeight: 1, marginBottom: 12 }}>{num}</div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.textMuted, lineHeight: 1.7 }}>{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={s.sectionAlt}>
        <div style={s.inner}>
          <SectionLabel t={t}>Voices From Campus</SectionLabel>
          <h2 style={s.h2}>What members say</h2>
          {["For the first time since my diagnosis I talked to someone who actually gets it. Not a doctor. Not a counsellor. Someone my age, on a campus, living the same life.", "I did not even know I had rights as an HIV positive student. The Peer Circle changed that."].map((quote, i) => (
            <div key={i} style={{ background: t.card, border: `1px solid ${t.borderColor}`, borderLeft: `4px solid ${t.accent}`, borderRadius: "0 12px 12px 0", padding: 32, marginBottom: 20 }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontStyle: "italic", color: t.text, lineHeight: 1.75, marginBottom: 12 }}>"{quote}"</p>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: "1px", textTransform: "uppercase" }}>LUMA Peer Circle Member · Nigerian University Student · Anonymous</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: t.primary, padding: "80px 32px" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <SectionLabel t={t}>Apply to Join</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: t.ivory, marginBottom: 12 }}>Ready to join The Peer Circle?</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "rgba(247,243,236,0.65)", lineHeight: 1.7, marginBottom: 32 }}>Your identity will not be shared. We only ask for an email for account recovery. You choose your display name.</p>
          {submitted ? (
            <div style={{ background: "rgba(247,243,236,0.12)", border: "1px solid rgba(247,243,236,0.25)", borderRadius: 12, padding: "24px 28px" }}>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, color: t.ivory, fontWeight: 600 }}>Application received.</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "rgba(247,243,236,0.7)", marginTop: 8, lineHeight: 1.6 }}>We will be in touch within 48 hours. Welcome to LUMA.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Input t={{ ...t, surface: "rgba(255,255,255,0.1)", borderColor: "rgba(247,243,236,0.2)" }} placeholder="Choose a display name (not your real name)" value={form.username} onChange={e => setForm({...form, username: e.target.value})} style={{ background: "rgba(255,255,255,0.08)", color: t.ivory, borderColor: "rgba(247,243,236,0.2)" }} />
              <Input t={t} placeholder="Email (for account recovery only, never displayed)" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ background: "rgba(255,255,255,0.08)", color: t.ivory, borderColor: "rgba(247,243,236,0.2)" }} />
              <Input t={t} placeholder="Choose a password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{ background: "rgba(255,255,255,0.08)", color: t.ivory, borderColor: "rgba(247,243,236,0.2)" }} />
              <Btn t={t} variant="light" onClick={handleSubmit} style={{ width: "100%", textAlign: "center" }}>Apply to Join</Btn>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ─── OUR WORK PAGE ────────────────────────────────────────────────────────────

export const WorkPage = ({ t, setPage }) => {
  const pillars = [
    { num: "01", label: "Inform", title: "Because ignorance is not neutral.", body: "HIV myths do not stay in classrooms. They spread in hostels, lecture halls, and WhatsApp groups. LUMA delivers status neutral HIV education built specifically for Nigerian campuses. No separation. Everyone learns together.", programs: ["Campus Truth Series", "The Status Neutral Campus Guide"], page: "truth", dark: false },
    { num: "02", label: "Advocate", title: "Policy does not change by itself.", body: "Nigerian universities have no anti-discrimination policies for students living with HIV. No integration of HIV into campus health services. LUMA is changing that, one campus at a time, grounded in evidence.", programs: ["Campus Policy Push", "National Prevention Plan Engagement", "Research to Advocacy Pipeline"], page: "advocacy", dark: true },
    { num: "03", label: "Belong", title: "You should not have to be alone in this.", body: "The Belong pillar is the heart of LUMA. A peer-led digital community for university students living with HIV in Nigeria. Safe. Affirming. Anonymous where needed.", programs: ["The Peer Circle", "Voices From Campus"], page: "circle", dark: false },
  ];
  const bg0 = { padding: "96px 32px", background: t.bg };
  const bgA = { padding: "96px 32px", background: t.isDark ? t.surface : t.accentLight };
  const bgD = { padding: "96px 32px", background: t.primary };
  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>Our Work</Tag>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: t.ivory, lineHeight: 1.1, marginTop: 16 }}>Three pillars.<br />One direction.</h1>
        </div>
      </div>
      {pillars.map((p, i) => (
        <section key={p.num} style={p.dark ? bgD : i % 2 === 0 ? bg0 : bgA}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 100, fontWeight: 800, color: p.dark ? "rgba(247,243,236,0.06)" : t.isDark ? t.card : t.accentLight, lineHeight: 1, marginBottom: -16, userSelect: "none" }}>{p.num}</div>
            <SectionLabel t={p.dark ? { accent: t.accent } : t}>{p.label}</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: p.dark ? t.ivory : t.text, lineHeight: 1.1, marginBottom: 20 }}>{p.title}</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: p.dark ? "rgba(247,243,236,0.7)" : t.textMuted, lineHeight: 1.8, maxWidth: 640, marginBottom: 24 }}>{p.body}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
              {p.programs.map(prog => <Tag key={prog} t={p.dark ? { ...t, primary: t.accent, accentLight: "rgba(247,243,236,0.12)", borderColor: "transparent" } : t}>{prog}</Tag>)}
            </div>
            <Btn t={t} variant={p.dark ? "ghost" : "primary"} onClick={() => setPage(p.page)}>Explore {p.label}</Btn>
          </div>
        </section>
      ))}
    </div>
  );
};

// ─── ADVOCACY PAGE ───────────────────────────────────────────────────────────

export const AdvocacyPage = ({ t }) => (
  <div>
    <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Tag t={t} light>The Advocate Pillar</Tag>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: t.ivory, lineHeight: 1.1, marginTop: 16 }}>Policy does not change by itself. We push.</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "rgba(247,243,236,0.7)", lineHeight: 1.7, maxWidth: 580, marginTop: 16 }}>LUMA advocates for anti-discrimination policies at Nigerian universities and for youth voices in national HIV prevention frameworks.</p>
      </div>
    </div>
    <section style={{ padding: "80px 32px", background: t.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {[
            { level: "On Campus", body: "Pushing individual universities to adopt formal anti-discrimination policies for HIV positive students and to train campus health staff on status neutral care." },
            { level: "Nationally", body: "Feeding university-specific data and youth voices into Nigeria's 2026 to 2030 National HIV Prevention Plan through submissions, partnerships, and evidence briefs." },
            { level: "Globally", body: "Using platforms including AIDS 2026, One Young World, and the Y+ LEAP Academy to amplify Nigerian campus HIV realities on the world stage." },
          ].map((a, i) => (
            <Card key={i} t={t}><Tag t={t}>{a.level}</Tag><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: t.textMuted, lineHeight: 1.75, marginTop: 16 }}>{a.body}</p></Card>
          ))}
        </div>
        <div style={{ marginTop: 64 }}>
          <SectionLabel t={t}>We Advocate With Data</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: t.text, marginBottom: 20 }}>Our evidence base</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: t.textMuted, lineHeight: 1.8, maxWidth: 680 }}>LUMA's advocacy is grounded in two ongoing research studies. Our research has found a critical knowledge-attitude paradox: 96.85% of university students demonstrate high HIV knowledge, yet only 55.5% hold positive attitudes toward people living with HIV. Knowledge alone is not enough. Policy change is required.</p>
        </div>
        <div style={{ marginTop: 48, background: t.isDark ? t.card : t.accentLight, border: `1px solid ${t.borderColor}`, borderRadius: 16, padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <Tag t={t}>Active Campaign</Tag>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: t.text, marginTop: 12, marginBottom: 8 }}>The Status Neutral Campus Initiative</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.textMuted, lineHeight: 1.7, maxWidth: 560 }}>A push for Nigerian universities to adopt status neutral HIV service frameworks in their campus health centres, beginning with Kwara State University as a pilot institution.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ─── RESOURCES PAGE ───────────────────────────────────────────────────────────

export const ResourcesPage = ({ t }) => (
  <div>
    <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Tag t={t} light>Resources</Tag>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: t.ivory, lineHeight: 1.1, marginTop: 16 }}>Everything you need to know.<br />In one place.</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "rgba(247,243,236,0.7)", lineHeight: 1.7, maxWidth: 540, marginTop: 16 }}>LUMA's resource hub is built specifically for Nigerian university students. No jargon. No gatekeeping.</p>
      </div>
    </div>
    <section style={{ padding: "80px 32px", background: t.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {[
            ["HIV Basics", "What HIV is, how it works, and what it absolutely does not do. Plain language, no jargon.", "Download Guide"],
            ["PrEP and Prevention", "What PrEP is, how to access it in Nigeria, and why every student should know about it.", "Read More"],
            ["Testing and Treatment", "Where to get tested, what treatment looks like, and what undetectable means for your life.", "Read More"],
            ["Your Rights on Campus", "Anti-discrimination law, medical confidentiality, and what your university legally owes you.", "Read More"],
            ["Mental Health and HIV", "Resources for students navigating the emotional weight of an HIV diagnosis on campus.", "Read More"],
            ["For Allies", "How non-positive students can actively support, advocate, and break stigma on their campuses.", "Read More"],
          ].map(([title, body, cta], i) => (
            <Card key={i} t={t} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 19, fontWeight: 700, color: t.text, marginBottom: 12 }}>{title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.textMuted, lineHeight: 1.7, marginBottom: 20 }}>{body}</p>
              </div>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: t.accent, display: "flex", alignItems: "center", gap: 6 }}>{cta} <ArrowRight color={t.accent} size={12} /></span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// ─── GET INVOLVED PAGE ────────────────────────────────────────────────────────

export const InvolvePage = ({ t, setPage }) => {
  const [ambForm, setAmbForm] = useState({ name: "", email: "", university: "", why: "" });
  const [ambSent, setAmbSent] = useState(false);

  const handleAmb = async () => {
    if (!ambForm.name || !ambForm.email) return;
    try {
      await fetch("https://formspree.io/f/xpwzqkgd", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _subject: "Ambassador Application", ...ambForm })
      });
    } catch {}
    setAmbSent(true);
  };

  const ways = [
    { title: "Join The Peer Circle", body: "For Nigerian university students living with HIV who want peer community and support.", cta: "Apply to Join", action: () => setPage("circle") },
    { title: "Campus Ambassador", body: "Be the first LUMA presence on your campus. No prior HIV advocacy experience required.", cta: "Apply as Ambassador", action: null },
    { title: "Volunteer", body: "Content, research, design, translation, social media. Bring a skill to LUMA.", cta: "Get In Touch", action: () => setPage("contact") },
    { title: "Partner With LUMA", body: "Organisations, research institutions, or campus health programmes that share our values.", cta: "Start a Conversation", action: () => setPage("contact") },
  ];

  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>Get Involved</Tag>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: t.ivory, lineHeight: 1.1, marginTop: 16 }}>LUMA works because people like you decide to show up.</h1>
        </div>
      </div>
      <section style={{ padding: "80px 32px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
            {ways.map((w, i) => (
              <Card key={i} t={t} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 12 }}>{w.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.textMuted, lineHeight: 1.7, marginBottom: 24 }}>{w.body}</p>
                </div>
                <Btn t={t} variant="primary" onClick={w.action || (() => document.getElementById("amb-form").scrollIntoView({ behavior: "smooth" }))}>{w.cta}</Btn>
              </Card>
            ))}
          </div>

          <div id="amb-form" style={{ marginTop: 80 }}>
            <SectionLabel t={t}>Ambassador Programme</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: t.text, marginBottom: 16 }}>Be the first LUMA presence on your campus</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: t.textMuted, lineHeight: 1.8, maxWidth: 640, marginBottom: 40 }}>LUMA's Campus Ambassador Programme is looking for undergraduate and postgraduate students across Nigerian universities who want to be the bridge between LUMA and their campus community. No prior HIV advocacy experience required.</p>
            {ambSent ? <FormSuccess t={t} message="Application received. We will be in touch within five working days. Thank you." /> : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, maxWidth: 700 }}>
                <Input t={t} placeholder="Your full name" value={ambForm.name} onChange={e => setAmbForm({...ambForm, name: e.target.value})} />
                <Input t={t} placeholder="Your email" type="email" value={ambForm.email} onChange={e => setAmbForm({...ambForm, email: e.target.value})} />
                <Input t={t} placeholder="Your university" value={ambForm.university} onChange={e => setAmbForm({...ambForm, university: e.target.value})} style={{ gridColumn: "1 / -1" }} />
                <Textarea t={t} placeholder="Why do you want to be a LUMA campus ambassador? (2 to 3 sentences)" value={ambForm.why} onChange={e => setAmbForm({...ambForm, why: e.target.value})} rows={4} />
                <div style={{ gridColumn: "1 / -1" }}><Btn t={t} variant="primary" onClick={handleAmb}>Submit Application</Btn></div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────

export const ContactPage = ({ t, preSubject = "" }) => {
  const [form, setForm] = useState({ name: "", email: "", subject: preSubject || "General Enquiry", message: "" });
  const [anonForm, setAnonForm] = useState({ subject: "General Enquiry", message: "" });
  const [sent, setSent] = useState(false);
  const [anonSent, setAnonSent] = useState(false);

  const handleSend = async () => {
    if (!form.email || !form.message) return;
    try { await fetch("https://formspree.io/f/xpwzqkgd", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _subject: form.subject, ...form }) }); } catch {}
    setSent(true);
  };

  const handleAnon = async () => {
    if (!anonForm.message) return;
    try { await fetch("https://formspree.io/f/xpwzqkgd", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _subject: "[ANONYMOUS] " + anonForm.subject, message: anonForm.message }) }); } catch {}
    setAnonSent(true);
  };

  const subjects = ["General Enquiry", "Partnership Enquiry", "Submit a Myth", "Campus Ambassador Application", "Media and Press", "Research Collaboration", "Other"];

  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>Contact</Tag>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: t.ivory, lineHeight: 1.1, marginTop: 16 }}>We are here. Talk to us.</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "rgba(247,243,236,0.7)", lineHeight: 1.7, maxWidth: 520, marginTop: 16 }}>Whether you have a question, a collaboration idea, a myth to submit, or just need to reach someone who gets it.</p>
        </div>
      </div>
      <section style={{ padding: "80px 32px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 64 }}>
          <div>
            <SectionLabel t={t}>Send a Message</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, color: t.text, marginBottom: 28 }}>General contact</h2>
            {sent ? <FormSuccess t={t} message="Message sent. We read everything and respond within 48 hours." /> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Input t={t} placeholder="Your name (optional)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <Input t={t} placeholder="Your email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <Select t={t} value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>{subjects.map(s => <option key={s}>{s}</option>)}</Select>
                <Textarea t={t} placeholder="Your message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                <Btn t={t} variant="primary" onClick={handleSend}>Send Message</Btn>
              </div>
            )}
          </div>
          <div>
            <SectionLabel t={t}>Stay Anonymous</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, color: t.text, marginBottom: 16 }}>Anonymous message</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.textMuted, lineHeight: 1.7, marginBottom: 24 }}>Your identity will not be recorded. Use this if you need to reach us without identifying yourself.</p>
            {anonSent ? <FormSuccess t={t} message="Anonymous message received. Thank you for reaching out." /> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Select t={t} value={anonForm.subject} onChange={e => setAnonForm({...anonForm, subject: e.target.value})}>{subjects.map(s => <option key={s}>{s}</option>)}</Select>
                <Textarea t={t} placeholder="Your message" value={anonForm.message} onChange={e => setAnonForm({...anonForm, message: e.target.value})} />
                <Btn t={t} variant="secondary" onClick={handleAnon}>Send Anonymously</Btn>
              </div>
            )}
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${t.borderColor}` }}>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>Direct Contact</p>
              <a href="mailto:hello@luma.org.ng" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: t.text, display: "block", marginBottom: 8 }}>hello@luma.org.ng</a>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>We read every message and respond to everything. Give us up to 48 hours.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


// ─── GAME DATA ────────────────────────────────────────────────────────────────

const MYTH_CARDS = [
  { statement: "You can get HIV from sharing a classroom with someone who is HIV positive.", answer: false, explanation: "HIV is not transmitted through the air or casual contact. You cannot get HIV from sitting in the same room, sharing desks, or breathing the same air as someone who is HIV positive." },
  { statement: "A person on HIV treatment with an undetectable viral load cannot transmit HIV sexually.", answer: true, explanation: "This is U=U: Undetectable equals Untransmittable. Settled science endorsed by the WHO. When treatment keeps viral load undetectable, sexual transmission cannot occur." },
  { statement: "HIV can be transmitted through mosquito bites.", answer: false, explanation: "Mosquitoes cannot transmit HIV. The virus does not survive or replicate inside mosquitoes, and they do not inject blood when biting." },
  { statement: "PrEP reduces the risk of getting HIV from sex by up to 99% when taken consistently.", answer: true, explanation: "PrEP is a daily medication that is extremely effective at preventing HIV when taken as prescribed. It is available in Nigeria through public health facilities." },
  { statement: "HIV positive students can be legally expelled from Nigerian universities.", answer: false, explanation: "Nigeria's HIV and AIDS Anti-Discrimination Act 2014 prohibits denial of education based on HIV status. Any such expulsion is unlawful." },
  { statement: "You can get HIV from sharing food, water, or eating utensils.", answer: false, explanation: "HIV is not present in saliva in amounts that can cause infection. Sharing food, drinks, or utensils with someone living with HIV carries absolutely no transmission risk." },
  { statement: "HIV stigma directly damages the mental health of students living with HIV on campus.", answer: true, explanation: "Research consistently links HIV stigma to higher rates of depression, anxiety, social withdrawal, and poorer treatment adherence among young people living with HIV." },
  { statement: "Having a high HIV knowledge score means you will not stigmatise people living with HIV.", answer: false, explanation: "The knowledge-attitude paradox: 96.85% of students may have high HIV knowledge yet only 55.5% hold non-stigmatising attitudes. Knowledge alone is not enough." },
  { statement: "PrEP is available in Nigeria.", answer: true, explanation: "PrEP has been available in Nigeria since 2017 through public health facilities, often at low or no cost. You can walk into a nearby public health facility and ask." },
  { statement: "You can always tell someone is HIV positive from their appearance.", answer: false, explanation: "HIV has no visible symptoms for years in many people, especially those on treatment. You cannot tell anyone's HIV status from how they look." },
];

const QUIZ_QUESTIONS = [
  { question: "What does U=U stand for in HIV science?", options: ["Unique equals Universal", "Undetectable equals Untransmittable", "Untreated equals Unsafe", "Undisclosed equals Unprotected"], correct: 1 },
  { question: "What is Nigeria's national HIV prevalence according to UNAIDS 2025?", options: ["0.5%", "3.2%", "1.4%", "5.1%"], correct: 2 },
  { question: "What is PrEP used for?", options: ["Treating HIV in positive people", "Preventing HIV in HIV negative people at risk", "Curing HIV completely", "Boosting the immune system"], correct: 1 },
  { question: "Which law protects HIV positive students from being expelled in Nigeria?", options: ["National Health Act 2010", "HIV and AIDS Anti-Discrimination Act 2014", "Student Welfare Act 2018", "Public Health Protection Law 2020"], correct: 1 },
  { question: "HIV can be transmitted through which of the following?", options: ["Sharing a classroom", "Mosquito bites", "Blood transfusion", "Sharing food or utensils"], correct: 2 },
  { question: "What percentage of university students hold stigmatising attitudes despite knowing HIV facts?", options: ["About 10%", "About 25%", "About 45%", "About 80%"], correct: 2 },
  { question: "How effective is PrEP at preventing HIV when taken consistently?", options: ["About 50%", "About 70%", "About 85%", "Up to 99%"], correct: 3 },
  { question: "What does the status neutral approach mean?", options: ["Keeping HIV status secret", "Treating everyone the same regardless of HIV status", "Only serving HIV negative people", "Separating positive and negative services"], correct: 1 },
  { question: "How long does it typically take to reach an undetectable viral load on ART?", options: ["1 to 2 weeks", "3 to 6 months", "2 to 3 years", "It is immediate"], correct: 1 },
  { question: "What does LUMA stand for?", options: ["Lifting Up Marginalised Africans", "Learning, Understanding, Movement, Action", "Luminating Africa", "Leading Universal Medical Advocacy"], correct: 2 },
];

const SCENARIOS = [
  { situation: "Your roommate just disclosed that they are living with HIV. They ask if you are okay sharing the hostel room.", choices: ["Tell them you need to move rooms immediately", "Say nothing and start avoiding them", "Reassure them, ask how they are doing, and keep sharing the room", "Tell other floor mates so they know"], correct: 2, explanation: "HIV is not transmitted through casual contact or shared living spaces. Reassuring your roommate and continuing to share is the right response. Your support means everything." },
  { situation: "A classmate is spreading rumours that another student is HIV positive and telling people to avoid them.", choices: ["Join in to avoid being ostracised", "Stay silent, it is not your business", "Confront the classmate privately and tell them this is harmful and potentially illegal", "Laugh along but feel bad later"], correct: 2, explanation: "Disclosing someone's HIV status without consent violates their rights. Confronting the classmate directly is the right thing. Silence makes you complicit." },
  { situation: "You want to get tested for HIV but fear people at the campus health centre will find out your results.", choices: ["Never get tested and hope for the best", "Go ahead. Your health records are confidential by law.", "Ask a friend to get tested for you", "Only get tested if you feel unwell"], correct: 1, explanation: "Your medical records at the health centre are legally protected. Staff cannot disclose your HIV status without your consent. Getting tested is always the right decision." },
  { situation: "A lecturer comments in class that HIV is a disease of immoral people.", choices: ["Agree loudly to fit in", "Stay quiet and move on", "Report the comment to the student union or department head as discriminatory", "Post about it anonymously and leave it"], correct: 2, explanation: "HIV is a public health issue, not a moral failing. Discriminatory comments from authority figures should be formally reported. This is how campus culture changes." },
  { situation: "Your friend just tested positive for HIV and calls you in tears. What do you say first?", choices: ["Tell them it is their own fault", "Hang up because you do not know what to say", "Tell them you are there for them and ask what they need right now", "Immediately list every resource you know"], correct: 2, explanation: "When someone has just received a diagnosis, they need to feel heard first. Ask what they need. Be present. Resources come after. Presence comes first." },
];

// ─── GAME COMPONENTS ──────────────────────────────────────────────────────────

const ProgressBar = ({ t, value, max }) => (
  <div style={{ background: t.borderColor, borderRadius: 100, height: 6, width: "100%", margin: "12px 0 24px" }}>
    <div style={{ background: t.accent, borderRadius: 100, height: 6, width: `${(value/max)*100}%`, transition: "width 0.4s ease" }} />
  </div>
);

const MythBusterGame = ({ t }) => {
  const [cards] = useState([...MYTH_CARDS].sort(() => Math.random() - 0.5));
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const answer = (choice) => {
    const correct = choice === cards[idx].answer;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, correct]);
    setRevealed(true);
  };
  const next = () => { if (idx + 1 >= cards.length) { setDone(true); return; } setIdx(i => i + 1); setRevealed(false); };
  const reset = () => { setIdx(0); setRevealed(false); setScore(0); setAnswers([]); setDone(false); };

  if (done) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 72, fontWeight: 800, color: t.primary }}>{score}/{cards.length}</div>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: t.text, marginTop: 12 }}>{score >= 8 ? "Outstanding. You know your HIV facts." : score >= 6 ? "Great work. A few myths still to bust." : "Keep learning. Every truth matters."}</p>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.textMuted, marginTop: 8, marginBottom: 32 }}>Read the Campus Truth Series to fill any gaps.</p>
      <Btn t={t} variant="primary" onClick={reset}>Play Again</Btn>
    </div>
  );

  const card = cards[idx];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: t.textMuted }}>Card {idx + 1} of {cards.length}</span>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: t.accent }}>Score: {score}</span>
      </div>
      <ProgressBar t={t} value={idx} max={cards.length} />
      <div style={{ background: t.isDark ? t.surface : t.accentLight, borderRadius: 16, padding: "36px 28px", minHeight: 140, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", marginBottom: 24 }}>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 600, color: t.text, lineHeight: 1.5 }}>{card.statement}</p>
      </div>
      {!revealed ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <button onClick={() => answer(true)} style={{ background: t.primary, color: t.ivory, border: "none", borderRadius: 12, padding: "18px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>✓ TRUE</button>
          <button onClick={() => answer(false)} style={{ background: "transparent", color: t.primary, border: `2px solid ${t.primary}`, borderRadius: 12, padding: "18px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>✗ FALSE</button>
        </div>
      ) : (
        <div>
          <div style={{ background: answers[answers.length-1] ? t.accentLight : "#FFE8E8", border: `1.5px solid ${answers[answers.length-1] ? t.accent : "#E88"}`, borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: answers[answers.length-1] ? t.primary : "#C00", marginBottom: 8 }}>{answers[answers.length-1] ? "✓ Correct!" : "✗ Not quite."}</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.text, lineHeight: 1.7 }}>{card.explanation}</p>
          </div>
          <Btn t={t} variant="primary" onClick={next} style={{ width: "100%", textAlign: "center" }}>{idx + 1 >= cards.length ? "See Results" : "Next Card →"}</Btn>
        </div>
      )}
    </div>
  );
};

const QuizGame = ({ t }) => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (done || selected !== null) return;
    if (timeLeft <= 0) { setSelected(-1); return; }
    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, done, selected]);

  const choose = (i) => { if (selected !== null) return; setSelected(i); if (i === QUIZ_QUESTIONS[idx].correct) setScore(s => s + 1); };
  const next = () => { if (idx + 1 >= QUIZ_QUESTIONS.length) { setDone(true); return; } setIdx(i => i + 1); setSelected(null); setTimeLeft(20); };
  const reset = () => { setIdx(0); setSelected(null); setScore(0); setDone(false); setTimeLeft(20); };

  if (done) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 72, fontWeight: 800, color: t.primary }}>{score}/{QUIZ_QUESTIONS.length}</div>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: t.text, marginTop: 12 }}>{score >= 9 ? "LUMA Champion. You know this inside out." : score >= 7 ? "Solid knowledge. Keep reading Campus Truth." : "Great effort. The Campus Truth Series has everything."}</p>
      <div style={{ marginTop: 32 }}><Btn t={t} variant="primary" onClick={reset}>Try Again</Btn></div>
    </div>
  );

  const q = QUIZ_QUESTIONS[idx];
  const timerColor = timeLeft <= 5 ? "#E53" : t.accent;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: t.textMuted }}>Q{idx + 1} of {QUIZ_QUESTIONS.length}</span>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 800, color: timerColor }}>{timeLeft}s</span>
      </div>
      <ProgressBar t={t} value={idx} max={QUIZ_QUESTIONS.length} />
      <div style={{ background: t.isDark ? t.surface : t.accentLight, borderRadius: 16, padding: "28px 24px", marginBottom: 20 }}>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 600, color: t.text, lineHeight: 1.5 }}>{q.question}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, i) => {
          let bg = t.card, border = t.borderColor, color = t.text;
          if (selected !== null) {
            if (i === q.correct) { bg = t.accentLight; border = t.accent; color = t.primary; }
            else if (i === selected && i !== q.correct) { bg = "#FFE8E8"; border = "#E88"; color = "#C00"; }
          }
          return <button key={i} onClick={() => choose(i)} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: "14px 18px", textAlign: "left", fontFamily: "'DM Sans',sans-serif", fontSize: 15, color, cursor: selected !== null ? "default" : "pointer", transition: "all 0.2s" }}><span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, marginRight: 10, color: t.accent }}>{"ABCD"[i]}.</span>{opt}</button>;
        })}
      </div>
      {selected !== null && <div style={{ marginTop: 16 }}><Btn t={t} variant="primary" onClick={next} style={{ width: "100%", textAlign: "center" }}>{idx + 1 >= QUIZ_QUESTIONS.length ? "See Final Score" : "Next Question →"}</Btn></div>}
    </div>
  );
};

const ScenarioGame = ({ t }) => {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (i) => { if (chosen !== null) return; setChosen(i); if (i === SCENARIOS[idx].correct) setScore(s => s + 1); };
  const next = () => { if (idx + 1 >= SCENARIOS.length) { setDone(true); return; } setIdx(i => i + 1); setChosen(null); };
  const reset = () => { setIdx(0); setChosen(null); setScore(0); setDone(false); };

  if (done) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 72, fontWeight: 800, color: t.primary }}>{score}/{SCENARIOS.length}</div>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: t.text, marginTop: 12 }}>{score >= 4 ? "Excellent. You would be a real ally on any campus." : score >= 3 ? "Good instincts. Keep building your empathy." : "Keep learning. Every scenario teaches you something."}</p>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.textMuted, marginTop: 8, marginBottom: 32 }}>Campus allyship starts with decisions exactly like these.</p>
      <Btn t={t} variant="primary" onClick={reset}>Play Again</Btn>
    </div>
  );

  const sc = SCENARIOS[idx];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: t.textMuted }}>Scenario {idx + 1} of {SCENARIOS.length}</span>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: t.accent }}>Score: {score}</span>
      </div>
      <ProgressBar t={t} value={idx} max={SCENARIOS.length} />
      <div style={{ background: t.primary, borderRadius: 14, padding: "28px 24px", marginBottom: 20 }}>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: t.accent, textTransform: "uppercase", marginBottom: 10 }}>The Situation</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: t.ivory, lineHeight: 1.7 }}>{sc.situation}</p>
      </div>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: t.textMuted, marginBottom: 10 }}>What do you do?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sc.choices.map((choice, i) => {
          let bg = t.card, border = t.borderColor, color = t.text;
          if (chosen !== null) {
            if (i === sc.correct) { bg = t.accentLight; border = t.accent; color = t.primary; }
            else if (i === chosen && i !== sc.correct) { bg = "#FFE8E8"; border = "#E88"; color = "#C00"; }
          }
          return <button key={i} onClick={() => choose(i)} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: "14px 18px", textAlign: "left", fontFamily: "'DM Sans',sans-serif", fontSize: 15, color, cursor: chosen !== null ? "default" : "pointer", transition: "all 0.2s", lineHeight: 1.5 }}>{choice}</button>;
        })}
      </div>
      {chosen !== null && (
        <div style={{ marginTop: 16 }}>
          <div style={{ background: chosen === sc.correct ? t.accentLight : "#FFF0F0", border: `1.5px solid ${chosen === sc.correct ? t.accent : "#E88"}`, borderRadius: 10, padding: "18px 20px", marginBottom: 14 }}>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: chosen === sc.correct ? t.primary : "#C00", marginBottom: 8 }}>{chosen === sc.correct ? "✓ Well done." : "✗ Think again."}</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: t.text, lineHeight: 1.7 }}>{sc.explanation}</p>
          </div>
          <Btn t={t} variant="primary" onClick={next} style={{ width: "100%", textAlign: "center" }}>{idx + 1 >= SCENARIOS.length ? "See Your Result" : "Next Scenario →"}</Btn>
        </div>
      )}
    </div>
  );
};

// ─── GAMES PAGE ───────────────────────────────────────────────────────────────

export const GamesPage = ({ t, setPage }) => {
  const [activeGame, setActiveGame] = useState(null);
  const games = [
    { id: "myth", title: "Myth Buster", tag: "HIV EDUCATION", description: "10 cards. Each one is a statement about HIV. You decide: Myth or Fact. The truth might surprise you.", time: "5 min", difficulty: "Beginner friendly", component: <MythBusterGame t={t} /> },
    { id: "quiz", title: "LUMA Challenge", tag: "KNOWLEDGE QUIZ", description: "10 questions. 20 seconds each. How well do you really know HIV, PrEP, campus rights, and the status neutral approach?", time: "4 min", difficulty: "Intermediate", component: <QuizGame t={t} /> },
    { id: "scenario", title: "Campus Quest", tag: "SCENARIO GAME", description: "5 real campus scenarios involving HIV, stigma, and allyship. What would you actually do? Your choices reveal your instincts.", time: "6 min", difficulty: "Reflective", component: <ScenarioGame t={t} /> },
  ];

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    return (
      <div>
        <div style={{ background: t.primary, padding: "100px 32px 60px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <button onClick={() => setActiveGame(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(247,243,236,0.7)", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, padding: 0, marginBottom: 32 }}>
              <ArrowLeft color="rgba(247,243,236,0.7)" size={14} /> Back to Games
            </button>
            <Tag t={t} light>{game.tag}</Tag>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800, color: t.ivory, lineHeight: 1.15, marginTop: 16 }}>{game.title}</h1>
          </div>
        </div>
        <section style={{ padding: "48px 32px", background: t.bg }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>{game.component}</div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>LUMA Games</Tag>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: t.ivory, lineHeight: 1.1, marginTop: 16 }}>Learn through play.</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "rgba(247,243,236,0.72)", lineHeight: 1.7, maxWidth: 580, marginTop: 16 }}>Three games built around HIV education, campus rights, and empathy. Each takes under 10 minutes and teaches you something real.</p>
        </div>
      </div>
      <section style={{ padding: "80px 32px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28, marginBottom: 72 }}>
            {games.map(game => (
              <Card key={game.id} t={t} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => setActiveGame(game.id)}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div>
                  <Tag t={t}>{game.tag}</Tag>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 800, color: t.text, marginTop: 16, marginBottom: 12 }}>{game.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: t.textMuted, lineHeight: 1.7, marginBottom: 24 }}>{game.description}</p>
                  <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: t.textMuted }}>⏱ {game.time}</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: t.textMuted }}>🎯 {game.difficulty}</span>
                  </div>
                </div>
                <div style={{ background: t.primary, color: t.ivory, padding: "14px 24px", borderRadius: 100, fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, textAlign: "center" }}>Play Now →</div>
              </Card>
            ))}
          </div>
          <div style={{ background: t.isDark ? t.card : t.accentLight, border: `1px solid ${t.borderColor}`, borderRadius: 20, padding: "48px 40px" }}>
            <SectionLabel t={t}>Coming Soon</SectionLabel>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 800, color: t.text, marginBottom: 12 }}>More games on the way</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: t.textMuted, lineHeight: 1.7, maxWidth: 560, marginBottom: 28 }}>LUMA is building a full game library covering mental health, PrEP access, campus policy, and peer allyship. New games drop regularly.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Word Scramble: HIV Terms", "Memory Match: Campus Rights", "Stigma Bingo", "PrEP Access Navigator", "Mental Health Check-In"].map(g => (
                <span key={g} style={{ background: t.card, border: `1px solid ${t.borderColor}`, borderRadius: 100, padding: "7px 14px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 600, color: t.textMuted }}>🔒 {g}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


// ─── THEME CONTEXT + SHELL ────────────────────────────────────────────────────

import { createContext, useContext } from "react";
import { Outlet, useRouter, useRouterState } from "@tanstack/react-router";

const ThemeCtx: any = createContext(null);
export const useLumaTheme = (): any => useContext(ThemeCtx);

const PAGE_TO_ROUTE = {
  home: "/", about: "/about", work: "/work", truth: "/truth",
  circle: "/circle", advocacy: "/advocacy", resources: "/resources",
  involve: "/involve", contact: "/contact", games: "/games",
};
const ROUTE_TO_PAGE = Object.fromEntries(Object.entries(PAGE_TO_ROUTE).map(([k, v]) => [v, k]));

export const useNavToPage = () => {
  const router = useRouter();
  return (id) => {
    if (id === "story") return;
    const to = PAGE_TO_ROUTE[id];
    if (!to) return;
    router.navigate({ to });
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
  };
};

export const useNavToStory = () => {
  const router = useRouter();
  return (storyId) => {
    router.navigate({ to: "/truth/$storyId", params: { storyId } });
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
  };
};

export function ThemeProvider({ children }) {
  const [colorId, setColorId] = useState("watcher");
  const [isDark, setIsDark] = useState(false);
  const t = getTheme(colorId, isDark);
  return (
    <ThemeCtx.Provider value={{ t, colorId, setColorId, isDark, setIsDark }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function LumaShell({ children }) {
  const { t, colorId, setColorId, isDark, setIsDark } = useLumaTheme();
  const setPage = useNavToPage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // derive `page` for nav active-state
  let page = ROUTE_TO_PAGE[pathname] || "home";
  if (pathname.startsWith("/truth")) page = "truth";

  return (
    <div style={{ fontFamily: "'Space Grotesk',sans-serif", background: t.bg, minHeight: "100vh", transition: "background 0.3s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{overflow-x:hidden;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:${t.accent};border-radius:3px;}
        button{cursor:pointer;}
        button:hover{opacity:0.9;}
        a{text-decoration:none;}
        input::placeholder,textarea::placeholder{color:${t.textMuted};}
        select option{background:${t.surface};color:${t.text};}
        @media(max-width:768px){
          .desktop-nav{display:none !important;}
          .mobile-menu-btn{display:flex !important;}
          .desktop-theme-controls{display:none !important;}
        }
      `}</style>
      <Nav t={t} colorId={colorId} setColorId={setColorId} isDark={isDark} setIsDark={setIsDark} page={page} setPage={setPage} />
      <main>{children}</main>
      <Footer t={t} setPage={setPage} />
    </div>
  );
}

