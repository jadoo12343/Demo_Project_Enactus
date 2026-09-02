'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Check, ChevronDown, Clock3, Mail, MapPin, Menu, MoveUpRight, Camera, Sparkles, X } from 'lucide-react';
import { event } from '@/data/event';
import { schedule, tracks, type Track } from '@/data/schedule';
import { gallery } from '@/data/gallery';
import { useCountdown } from '@/hooks/useCountdown';
import { isValidRoll } from '@/lib/roll';
import { getRegistrations, saveRegistration } from '@/lib/storage';
import { Reveal } from '@/components/Reveal';

function Logo() {
  return <a className="logo" href="#top" aria-label="Innovision home"><svg className="logo-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 3L34 11V29L20 37L6 29V11L20 3Z" stroke="url(#logo-grad)" strokeWidth="1.5" /><path d="M14 27V13L20 20L26 13V27" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="20" cy="20" r="1.5" fill="var(--amber)" /><defs><linearGradient id="logo-grad" x1="6" y1="3" x2="34" y2="37"><stop stopColor="#f2f2ee" /><stop offset="1" stopColor="#ff6a3d" /></linearGradient></defs></svg><span className="logo-text">INNOVISION<span className="logo-year">/27</span></span></a>;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); menuRef.current?.focus(); } };
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { window.removeEventListener('keydown', closeOnEscape); window.removeEventListener('scroll', onScroll); document.body.style.overflow = ''; };
  }, [open]);
  const links: [string, string][] = [['About', '#about'], ['Schedule', '#schedule'], ['Moments', '#moments']];
  return <header className={scrolled ? 'site-header scrolled' : 'site-header'}><ScrollProgress /><div className="nav-inner"><Logo /><nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">{links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="#register" onClick={() => setOpen(false)}>Register now <ArrowUpRight size={15} /></a></nav><button className="menu-button" ref={menuRef} onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button></div></header>;
}

function Countdown() {
  const countdown = useCountdown(event.startsAt);
  const units: [string, number][] = [['DAYS', countdown.days], ['HOURS', countdown.hours], ['MINS', countdown.minutes], ['SECS', countdown.seconds]];
  return <section className="countdown-zone" id="countdown" aria-labelledby="countdown-heading"><Reveal className="section-kicker"><span className="live-dot" /> Live countdown</Reveal><Reveal className="countdown-copy" delay={100}><h2 id="countdown-heading">The next idea is<br /><em>almost here.</em></h2><p aria-live="polite">{countdown.ended ? 'Innovision 2027 is underway.' : 'Until doors open at NSUT.'}</p></Reveal><div className="countdown" aria-label="Countdown to Innovision 2027">{units.map(([label, value], i) => <Reveal as="div" className="count-unit" key={label} delay={200 + i * 80}><strong suppressHydrationWarning>{String(value).padStart(2, '0')}</strong><span>{label}</span></Reveal>)}</div></section>;
}

function Hero() {
  return <><div className="prototype-ribbon">Student prototype · Enactus R2 tech task <span>Not the official NSUT website</span></div><section className="hero" id="about"><div className="hero-bg" aria-hidden="true"><img src="https://images.pexels.com/photos/8566536/pexels-photo-8566536.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="hero-bg-img" /><div className="hero-bg-overlay" /><div className="hero-particles" aria-hidden="true"><span className="particle p1" /><span className="particle p2" /><span className="particle p3" /><span className="particle p4" /><span className="particle p5" /></div></div><div className="hero-grid"><div className="hero-content"><p className="eyebrow hero-eyebrow">NSUT PRESENTS <span>—</span> 12—13 MAR 2027</p><h1 className="hero-headline"><span className="word">Build</span> <span className="word">what</span><br /><span className="word">matters.</span></h1><p className="hero-description">{event.description}</p><div className="hero-actions"><a className="button button-primary magnetic" href="#register">Register now <ArrowUpRight size={17} /></a><a className="text-link" href="#schedule">Explore the programme <ArrowDown size={17} /></a></div></div><div className="hero-side"><div className="hero-card-stack"><div className="hero-card hero-card-1"><img src="https://images.pexels.com/photos/8438956/pexels-photo-8438956.jpeg?auto=compress&cs=tinysrgb&h=400&w=300" alt="Robotics competition" loading="lazy" /><span className="card-label">Robo-Wars</span></div><div className="hero-card hero-card-2"><img src="https://images.pexels.com/photos/38556557/pexels-photo-38556557.jpeg?auto=compress&cs=tinysrgb&h=400&w=300" alt="Night concert" loading="lazy" /><span className="card-label">Felicity</span></div><div className="hero-card hero-card-3"><img src="https://images.pexels.com/photos/7413913/pexels-photo-7413913.jpeg?auto=compress&cs=tinysrgb&h=400&w=300" alt="Business pitch" loading="lazy" /><span className="card-label">B-Plan</span></div></div></div></div><div className="hero-meta"><span><MapPin size={16} /> {event.venue}</span><span><Clock3 size={16} /> 09:00 — 22:00 IST</span><span className="hero-note">Est. 2002 · 50+ events · 4,000 attendees</span></div><a href="#countdown" className="scroll-indicator" aria-label="Scroll to countdown"><span className="scroll-mouse" /></a></section><Countdown /></>;
}

function Schedule() {
  const [day, setDay] = useState<1 | 2>(1);
  const [filter, setFilter] = useState<Track | 'All'>('All');
  const filtered = useMemo(() => schedule.filter((item) => item.day === day && (filter === 'All' || item.track === filter)), [day, filter]);
  return <section className="schedule-section" id="schedule"><div className="section-intro"><Reveal><p className="eyebrow">02 / The programme</p><h2>Make time<br /><em>for the unexpected.</em></h2></Reveal><Reveal delay={150}><p>Every hour is an invitation to get closer to the work, the people, and the possibility.</p></Reveal></div><div className="schedule-controls"><div className="day-tabs" role="tablist" aria-label="Schedule days"><button className={day === 1 ? 'active' : ''} onClick={() => setDay(1)} role="tab" aria-selected={day === 1}>Day 01 <span>12 Mar</span></button><button className={day === 2 ? 'active' : ''} onClick={() => setDay(2)} role="tab" aria-selected={day === 2}>Day 02 <span>13 Mar</span></button></div><div className="track-filter" aria-label="Filter by track">{(['All', ...tracks] as const).map((track) => <button key={track} className={filter === track ? 'selected' : ''} onClick={() => setFilter(track)}>{track}</button>)}</div></div><div className="schedule-list">{filtered.length ? filtered.map((item, index) => <Reveal as="article" className="schedule-item" key={item.id} delay={index * 60}><div className="schedule-image"><img src={item.image} alt={item.title} loading="lazy" /><span className={'track-tag track-' + item.track.toLowerCase()}>{item.track}</span></div><div className="schedule-body"><div className="schedule-time">{item.time}<span>IST</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="schedule-venue"><MapPin size={13} /> {item.venue}</span></div><MoveUpRight className="schedule-arrow" size={20} /></Reveal>) : <div className="empty-state"><p>No events in this track today.</p><button onClick={() => setFilter('All')}>View all events</button></div>}</div></section>;
}

function Gallery() {
  const duplicated = [...gallery, ...gallery];
  return <section className="gallery-section" id="moments"><div className="section-intro"><Reveal><p className="eyebrow">Moments</p><h2>What it<br /><em>feels like.</em></h2></Reveal><Reveal delay={150}><p>A glimpse of the energy, the people, and the ideas that fill two days at NSUT.</p></Reveal></div><div className="marquee" aria-label="Photo gallery"><div className="marquee-track">{duplicated.map((photo, i) => <div className="marquee-item" key={i}><img src={photo.url} alt={photo.caption} loading="lazy" /><div className="marquee-overlay"><span className="marquee-tag">{photo.tag}</span><span className="marquee-caption">{photo.caption}</span></div></div>)}</div></div></section>;
}

function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', roll: '', eventId: schedule[0].id });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<{ eventTitle: string; email: string; storageFailed: boolean } | null>(null);
  const [saving, setSaving] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const firstErrorRef = useRef<HTMLInputElement>(null);
  const selectedEvent = schedule.find((item) => item.id === form.eventId) ?? schedule[0];
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email.';
    if (!isValidRoll(form.roll)) next.roll = 'Use your NSUT roll number, e.g. 2022UIC3457.';
    setErrors(next);
    if (Object.keys(next).length) { window.setTimeout(() => firstErrorRef.current?.focus(), 0); return; }
    if (getRegistrations().some((item) => item.email.toLowerCase() === form.email.toLowerCase() && item.eventId === form.eventId)) { setErrors({ email: 'You are already registered for this event on this device.' }); return; }
    setSaving(true);
    window.setTimeout(() => {
      const saved = saveRegistration({ ...form, roll: form.roll.toUpperCase(), id: crypto.randomUUID(), createdAt: new Date().toISOString() });
      setSuccess({ eventTitle: selectedEvent.title, email: form.email, storageFailed: !saved });
      setSaving(false);
    }, 400);
  };
  if (success) return <div className="success-card"><div className="success-burst" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div><div className="success-icon"><Check /></div><p className="eyebrow">You're on the list</p><h3>{success.eventTitle}<br /><em>is waiting for you.</em></h3><p>A confirmation has been sent to <strong>{success.email}</strong>. This is a prototype preview — no email was actually sent.</p>{success.storageFailed && <p className="storage-warning">Saved on this device failed. Please take a screenshot of this confirmation.</p>}<button className="button button-secondary" onClick={() => { setSuccess(null); setForm({ name: '', email: '', roll: '', eventId: schedule[0].id }); }}>Register another <ArrowUpRight size={16} /></button></div>;
  return <form className="register-form" onSubmit={submit} noValidate><div className="form-preview"><div className="preview-badge"><Sparkles size={14} /> Live preview</div><div className="preview-card"><span className="preview-label">YOUR PASS</span><strong>{form.name || 'Your name'}</strong><span className="preview-event">{selectedEvent.title}</span><span className="preview-roll">{form.roll || 'Roll number'}</span></div></div><div className="form-row"><label className="floating-label"><input ref={firstErrorRef} value={form.name} onChange={(e) => update('name', e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} placeholder=" " autoComplete="name" /><span>Name</span>{errors.name && <small id="name-error">{errors.name}</small>}</label><label className="floating-label"><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder=" " autoComplete="email" /><span>Email</span>{errors.email && <small id="email-error">{errors.email}</small>}</label></div><div className="form-row"><label className="floating-label"><input value={form.roll} onChange={(e) => update('roll', e.target.value.toUpperCase())} aria-invalid={Boolean(errors.roll)} aria-describedby={errors.roll ? 'roll-error' : undefined} placeholder=" " /><span>NSUT roll number</span>{errors.roll && <small id="roll-error">{errors.roll}</small>}</label><label className="floating-label"><div className={`select-wrap ${eventOpen ? 'select-open' : ''}`}><button type="button" className="event-select-trigger" aria-haspopup="listbox" aria-expanded={eventOpen} onClick={() => setEventOpen((open) => !open)}><span>{selectedEvent.title} <small>Day {selectedEvent.day}</small></span><ChevronDown size={17} /></button><span>Choose your event</span>{eventOpen && <div className="event-menu" role="listbox" aria-label="Choose your event">{schedule.map((item) => <button type="button" role="option" aria-selected={form.eventId === item.id} className={form.eventId === item.id ? 'event-option selected' : 'event-option'} key={item.id} onClick={() => { update('eventId', item.id); setEventOpen(false); }}><span><strong>{item.title}</strong><small>{item.track}</small></span><b>Day {item.day}</b></button>)}</div>}</div></label></div><button className="button button-primary submit-button" type="submit" disabled={saving}>{saving ? 'Saving your spot…' : 'Secure my spot'} <ArrowUpRight size={17} /></button><p className="form-note">No spam. Just the details you need before the gates open.</p></form>;
}

function Register() {
  return <section className="register-section" id="register"><div className="register-heading"><Reveal><p className="eyebrow">03 / Your turn</p><h2>Bring a question.<br /><em>Leave with a direction.</em></h2></Reveal><Reveal delay={120}><p>Tell us how to reach you and choose the experience you want to start with.</p><div className="register-stamp">OPEN<br /><span>FOR</span><br />IDEAS</div></Reveal></div><Reveal className="register-form-wrap" delay={200}><RegisterForm /></Reveal></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-cta"><Reveal><h2 className="footer-headline">See you at <em>Innovision.</em></h2><a className="button button-primary" href="#register">Register now <ArrowUpRight size={17} /></a></Reveal></div><div className="footer-top"><Logo /><p>Two days. One campus.<br /><span>Infinite ways forward.</span></p><a className="footer-mail" href={`mailto:${event.email}`}>{event.email} <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© 2027 Innovision, NSUT</span><div className="socials"><a href={event.socials.instagram} aria-label="Instagram" rel="noopener noreferrer"><Camera size={17} /></a><a href={event.socials.linkedin} aria-label="LinkedIn" rel="noopener noreferrer"><BriefcaseBusiness size={17} /></a><a href={event.socials.facebook} aria-label="Facebook" rel="noopener noreferrer"><span className="facebook-icon">f</span></a></div><span>Built as an Enactus R2 Tech Task prototype.</span></div></footer>;
}

function App() {
  return <div id="top" className="app-shell"><a className="skip-link" href="#main-content">Skip to content</a><Nav /><main id="main-content"><Hero /><Gallery /><Schedule /><Register /></main><Footer /></div>;
}

export default App;
