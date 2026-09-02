import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Clock3, MapPin } from 'lucide-react'
import { notFound } from 'next/navigation'
import { schedule } from '@/data/schedule'

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Netaji+Subhas+University+of+Technology,+Dwarka,+New+Delhi'

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = schedule.find((event) => event.id === id)
  if (!item) notFound()

  return <main className="event-detail-page">
    <div className="event-detail-nav"><Link className="logo" href="/"><span className="event-back-mark"><ArrowLeft size={16} /></span><span className="logo-text">INNOVISION<span className="logo-year">/27</span></span></Link><Link className="button button-primary" href="/#register">Register now <ArrowUpRight size={16} /></Link></div>
    <section className="event-detail-hero">
      <div className="event-detail-copy"><p className="eyebrow">Day {item.day} <span>—</span> {item.track}</p><h1>{item.title}</h1><p className="event-detail-lede">{item.description} Come curious, bring your point of view, and leave with something you can carry forward.</p><div className="event-detail-meta"><span><Clock3 size={16} /> {item.time} IST</span><a href={mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} /> {item.venue}</a></div></div>
      <div className="event-detail-image"><img src={item.image} alt={item.title} /><span>{item.track} / Innovision 2027</span></div>
    </section>
    <section className="event-detail-bottom"><p className="eyebrow">A little more context</p><h2>Make room for a<br /><em>new perspective.</em></h2><div><p>This experience is designed to put you close to the ideas, people, and questions shaping campus right now. Whether you are here to compete, collaborate, or simply explore, there is a place for you in the room.</p><Link className="text-link" href="/#register">Reserve your place <ArrowUpRight size={16} /></Link></div></section>
  </main>
}
