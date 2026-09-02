'use client'

import { ArrowUpRight, Camera, BriefcaseBusiness, Mail, MapPin } from 'lucide-react'
import { event } from '@/data/event'

const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Netaji+Subhas+University+of+Technology,+Dwarka,+New+Delhi'

export default function ContactPage() {
  return (
    <main className="contact-page">
      <nav className="contact-nav"><a href="/" className="logo"><span className="logo-text">INNOVISION<span className="logo-year">/27</span></span></a><a href="/" className="text-link">Back home <ArrowUpRight size={15} /></a></nav>
      <section className="contact-hero" aria-labelledby="contact-heading">
        <p className="eyebrow">04 / Contact facilities</p>
        <h1 id="contact-heading">Let&apos;s keep<br /><em>the conversation going.</em></h1>
        <p className="contact-lede">Questions about registration, partnerships, accessibility, or getting to campus? Reach the Innovision team through any channel below.</p>
      </section>
      <section className="contact-grid" aria-label="Contact options">
        <a className="contact-card contact-card-featured" href={`mailto:${event.email}`}><Mail size={24} /><span>Direct email</span><strong>{event.email}</strong><small>For general questions and support <ArrowUpRight size={15} /></small></a>
        <a className="contact-card" href={event.socials.instagram} target="_blank" rel="noopener noreferrer"><Camera size={21} /><span>Instagram</span><strong>@innovision.nsut</strong><small>Follow the build-up <ArrowUpRight size={15} /></small></a>
        <a className="contact-card" href={event.socials.facebook} target="_blank" rel="noopener noreferrer"><span className="facebook-icon contact-facebook-icon">f</span><span>Facebook</span><strong>Innovision NSUT</strong><small>News and announcements <ArrowUpRight size={15} /></small></a>
        <a className="contact-card" href={event.socials.linkedin} target="_blank" rel="noopener noreferrer"><BriefcaseBusiness size={21} /><span>LinkedIn</span><strong>Innovision NSUT</strong><small>Partnerships and updates <ArrowUpRight size={15} /></small></a>
        <a className="contact-card location-card" href={mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={21} /><span>Find us at NSUT</span><strong>{event.venue}</strong><small>{event.address} · Open directions <ArrowUpRight size={15} /></small></a>
      </section>
      <footer className="contact-footer"><span>© 2027 Innovision, NSUT</span><a href="/">Return to homepage <ArrowUpRight size={14} /></a></footer>
    </main>
  )
}
