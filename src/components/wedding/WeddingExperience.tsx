"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Heart, MapPin, Menu, Music2, Pause, Play, Sparkles, X } from "lucide-react";
import { weddingConfig, type WeddingEvent } from "@/config/wedding.config";
import Navbar from "../Navbar";
import WeddingMusic from "./WeddingMusic";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

function Countdown() {
  const target = new Date(weddingConfig.weddingDate).getTime();
  const [now, setNow] = useState(0);
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const diff = Math.max(0, target - now);
  const units = [
    { label: "Days", value: Math.floor(diff / 86400000) },
    { label: "Hours", value: Math.floor((diff % 86400000) / 3600000) },
    { label: "Minutes", value: Math.floor((diff % 3600000) / 60000) },
    { label: "Seconds", value: Math.floor((diff % 60000) / 1000) }
  ];
  if (!now) return <div className="countdown-placeholder" aria-label="Countdown loading" />;
  if (diff === 0) return <p className="celebration-live">The celebration has begun <Heart size={17} fill="currentColor" /></p>;
  return <div className="countdown">{units.map(unit => <div className="countdown-unit" key={unit.label}><strong>{String(unit.value).padStart(2, "0")}</strong><span>{unit.label}</span></div>)}</div>;
}

function FloralMark({ small = false }: { small?: boolean }) {
  return <div className={`floral-mark ${small ? "small" : ""}`} aria-hidden="true"><span>✳</span><i /><b>✧</b><i /><span>✳</span></div>;
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  return (
    <motion.article className={`event-card ${index % 2 ? "event-card-reverse" : ""}`} variants={reveal}>
      <div className="event-image-wrap"><img src={event.image} alt={`${event.title} celebration`} className="event-image" loading="lazy" /><span className="event-number">0{index + 1}</span></div>
      <div className="event-copy">
        <span className="eyebrow">{event.category}</span>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div className="event-meta"><span><CalendarDays size={15} />{event.date}</span><span><Clock3 size={15} />{event.time}</span><span><MapPin size={15} />{event.venue}</span></div>
        {event.dressCode && <p className="dress-code">Attire · {event.dressCode}</p>}
        {event.mapsUrl && <a className="text-link" href={event.mapsUrl} target="_blank" rel="noreferrer">View location <ArrowRight size={15} /></a>}
      </div>
    </motion.article>
  );
}

function RSVPForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [guests, setGuests] = useState("2");
  const [attendance, setAttendance] = useState("accept");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    if (!name.trim()) { setStatus({ type: "error", text: "Please enter your name." }); return; }
    if (Number(guests) < 1 || Number(guests) > 20) { setStatus({ type: "error", text: "Please enter between 1 and 20 guests." }); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), contact, guests: Number(guests), attendance, message }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to submit your RSVP.");
      setStatus({ type: "success", text: "Thank you. Your RSVP has been received." });
    } catch (error) {
      setStatus({ type: "error", text: error instanceof Error ? error.message : "Something went wrong." });
    } finally { setLoading(false); }
  }

  return <form className="rsvp-form" onSubmit={submit}>
    <div className="form-row"><label>YOUR NAME<input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" required /></label><label>EMAIL OR PHONE <span className="optional">(optional)</span><input value={contact} onChange={e => setContact(e.target.value)} placeholder="How can we reach you?" /></label></div>
    <div className="form-row"><label>NUMBER OF GUESTS<select value={guests} onChange={e => setGuests(e.target.value)}>{Array.from({ length: 20 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? "guest" : "guests"}</option>)}</select></label><label>WILL YOU JOIN US?<select value={attendance} onChange={e => setAttendance(e.target.value)}><option value="accept">Accepts with pleasure</option><option value="decline">Regretfully declines</option></select></label></div>
    <label>A NOTE FOR THE COUPLE <span className="optional">(optional)</span><textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Send your wishes..." rows={3} /></label>
    <button className="button button-dark submit-button" type="submit" disabled={loading}>{loading ? "Sending..." : "Send your response"} <ArrowRight size={16} /></button>
    {status && <p className={`form-status ${status.type}`} role="status">{status.type === "success" ? <Check size={16} /> : <Sparkles size={16} />}{status.text}</p>}
    <p className="form-note">RSVP storage must be connected before this invitation is used with real guests.</p>
  </form>;
}

export default function WeddingExperience() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const events = useMemo(() => [...weddingConfig.events].sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime()), []);
  const closeGallery = () => setGalleryIndex(null);
  const nextPhoto = (direction: number) => setGalleryIndex(index => index === null ? null : (index + direction + weddingConfig.gallery.length) % weddingConfig.gallery.length);

  useEffect(() => {
    if (galleryIndex === null) return;
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") nextPhoto(1);
      if (e.key === "ArrowLeft") nextPhoto(-1);
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [galleryIndex]);

  const navItems = [["The Story", "#story"], ["Celebrations", "#events"], ["Gallery", "#gallery"], ["RSVP", "#rsvp"]];

  return <main>
    <AnimatePresence>
      {!opened && <motion.section className="cover" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.03, transition: { duration: reducedMotion ? 0 : 0.8 } }}>
        <div className="cover-photo" />
        <div className="cover-shade" />
        <div className="cover-frame">
          <div className="cover-topline"><span>TOGETHER WITH THEIR FAMILIES</span><FloralMark small /></div>
          <motion.div className="cover-center" initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
            <span className="cover-kicker">A CELEBRATION OF LOVE</span>
            <div className="cover-monogram">{weddingConfig.monogram}</div>
            <h1>{weddingConfig.bride}<em>&</em>{weddingConfig.groom}</h1>
            <div className="cover-rule"><span /><i>✧</i><span /></div>
            <p className="cover-date">{weddingConfig.dateLabel}</p>
            <p className="cover-location">{weddingConfig.location}</p>
            <button className="button button-light open-button" onClick={() => setOpened(true)}>Open your invitation <ArrowRight size={16} /></button>
          </motion.div>
          <div className="cover-bottom"><span>WITH LOVE, ALWAYS</span><span>SCROLL TO DISCOVER <ArrowDown size={12} /></span></div>
        </div>
        <div className="cover-side-note">A NEW CHAPTER BEGINS · 2027</div>
      </motion.section>}
    </AnimatePresence>

    {opened && <>
      {/* <header className="site-header">
    
      </header> */}

      <Navbar />

      <section className="hero" id="home">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="hero-inner">
          <motion.div className="hero-copy" initial="hidden" animate="visible" variants={reveal}>
            <span className="eyebrow"><span className="eyebrow-line" /> SAVE THE DATE <span className="eyebrow-line" /></span>
            <p className="script-note">A little more magic, a lot more love</p>
            <h1>{weddingConfig.bride}<br /><span>&</span> {weddingConfig.groom}</h1>
            <p className="hero-message">{weddingConfig.invitation}</p>
            <div className="hero-details"><span><CalendarDays size={16} />{weddingConfig.dateLabel}</span><span><MapPin size={16} />{weddingConfig.location}</span></div>
            <a className="button button-dark" href="#events">Explore the celebrations <ArrowDown size={15} /></a>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <div className="hero-photo-frame"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=90" alt="Romantic wedding table and floral setting" /><div className="photo-caption"><span>OUR FOREVER</span><Heart size={17} /></div></div>
            <div className="hero-stamp"><span>EST.</span><strong>2027</strong><span>WITH LOVE</span></div>
            <div className="hero-flower">✳</div>
          </motion.div>
        </div>
        <div className="hero-bottomline"><span>AN INVITATION TO CELEBRATE</span><span>01 — 04</span></div>
      </section>

      <section className="intro-section section-pad" id="story">
        <motion.div className="intro-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
          <span className="eyebrow">A NOTE FROM US</span>
          <FloralMark />
          <h2>Two hearts.<br /><em>One beautiful</em> beginning.</h2>
          <p>{weddingConfig.story}</p>
          <p className="script-note">We cannot wait to celebrate with you.</p>
          <a className="text-link" href="#events">Join our celebration <ArrowRight size={15} /></a>
        </motion.div>
        <motion.div className="story-image" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
          <img src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85" alt="Romantic wedding floral arrangement" loading="lazy" />
          <div className="story-image-note">a day to remember <span>♡</span></div>
        </motion.div>
      </section>

      <section className="countdown-section">
        <div className="countdown-flower left">✳</div><div className="countdown-flower right">✳</div>
        <span className="eyebrow">UNTIL WE SAY “I DO”</span>
        <h2>Our day is almost here</h2>
        <Countdown />
        <p>Every moment brings us closer to forever.</p>
      </section>

      <section className="events-section section-pad" id="events">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
          <span className="eyebrow">THE WEDDING FESTIVITIES</span>
          <h2>Many moments,<br /><em>one forever.</em></h2>
          <p>From cherished traditions to a sacred promise, we would love for you to be part of every chapter.</p>
          <FloralMark />
        </motion.div>
        <motion.div className="events-list" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
          {events.map((event, index) => <EventCard key={event.id} event={event} index={index} />)}
        </motion.div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="gallery-heading"><div><span className="eyebrow">LITTLE MOMENTS, BIG MEMORIES</span><h2>Love, in <em>frames.</em></h2></div><p>A few beautiful details to set the scene for our celebration.</p></div>
        <div className="gallery-grid">{weddingConfig.gallery.map((photo, index) => <button key={photo.src} className={`gallery-item gallery-item-${index + 1}`} onClick={() => setGalleryIndex(index)} aria-label={`Open photograph ${index + 1}`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span className="gallery-zoom">+</span></button>)}</div>
      </section>

      <section className="venue-section">
        <div className="venue-image"><img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85" alt="Warmly lit wedding reception venue" loading="lazy" /></div>
        <div className="venue-copy"><span className="eyebrow">WHERE WE MEET</span><h2>Meet us<br /><em>under the stars.</em></h2><FloralMark /><h3>{weddingConfig.venue}</h3><p>{weddingConfig.address}</p><p className="venue-date"><CalendarDays size={16} />{weddingConfig.dateLabel}</p><a className="button button-dark" href={weddingConfig.mapUrl} target="_blank" rel="noreferrer">Get directions <ArrowRight size={16} /></a></div>
      </section>

      <section className="rsvp-section section-pad" id="rsvp">
        <div className="rsvp-intro"><span className="eyebrow">KINDLY REPLY</span><h2>Will you join<br /><em>our forever?</em></h2><p>Your presence is the most meaningful gift. Let us know if we can save you a seat.</p><FloralMark /><span className="script-note">With love, {weddingConfig.bride} & {weddingConfig.groom}</span></div>
        <div className="rsvp-panel"><RSVPForm /></div>
      </section>

      <footer className="footer">
        <FloralMark />
        <div className="footer-monogram">{weddingConfig.monogram}</div>
        <p>Made with love, for the people we love.</p>
        <span className="footer-date">{weddingConfig.dateLabel.toUpperCase()}</span>
        <div className="footer-bottom"><span>AYESHA & RAYYAN · WEDDING INVITATION</span><a href="#home">BACK TO TOP ↑</a></div>
      </footer>

      {/* <button className={`music-toggle ${musicOn ? "music-active" : ""}`} onClick={() => setMusicOn(!musicOn)} aria-label={musicOn ? "Turn music off" : "Turn music on"} title="Optional music control">{musicOn ? <Pause size={17} /> : <Music2 size={17} />}{musicOn && <span>Music on</span>}</button>
      {musicOn && <div className="music-notice" role="status">Add your audio file in <code>src/config/wedding.config.ts</code> to enable music playback.</div>} */}

      <WeddingMusic />

      <AnimatePresence>{galleryIndex !== null && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeGallery} role="dialog" aria-modal="true" aria-label="Photo gallery viewer"><button className="lightbox-close" onClick={closeGallery} aria-label="Close gallery"><X /></button><button className="lightbox-prev" onClick={e => { e.stopPropagation(); nextPhoto(-1); }} aria-label="Previous photo"><ChevronLeft /></button><motion.img key={galleryIndex} src={weddingConfig.gallery[galleryIndex].src} alt={weddingConfig.gallery[galleryIndex].alt} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} /><button className="lightbox-next" onClick={e => { e.stopPropagation(); nextPhoto(1); }} aria-label="Next photo"><ChevronRight /></button><p>{String(galleryIndex + 1).padStart(2, "0")} / {String(weddingConfig.gallery.length).padStart(2, "0")}</p></motion.div>}</AnimatePresence>
    </>}
  </main>;
}