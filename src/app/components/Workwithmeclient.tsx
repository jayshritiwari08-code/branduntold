'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import { MapPin, CheckCircle, X, Loader2, Plus, Minus, Sparkles, BookOpen, Compass, PenTool, Layers, ArrowUpRight } from 'lucide-react';
import type { ContactUsHeading, ServicesData, FooterData, FAQItem } from '../work-with-me/page';

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
    contactUsHeading: ContactUsHeading | null;
    contactFormHeading: ContactUsHeading | null;
    servicesData: ServicesData | null;
    footerData: FooterData | null;
    faqData: FAQItem[] | null;
}

// ─── Thank You Modal ──────────────────────────────────────────────────────────
function ThankYouModal({ onClose }: { onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md rounded-3xl p-10 text-center"
                style={{
                    background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    boxShadow:
                        '0 40px 100px rgba(0,0,0,0.9), 0 0 60px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
                    animation: 'modalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gold hover:bg-gold/10 transition-all duration-200"
                    aria-label="Close"
                >
                    <X size={16} />
                </button>

                <div className="flex justify-center mb-7">
                    <div
                        className="relative w-20 h-20 rounded-full flex items-center justify-center"
                        style={{
                            background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
                            border: '1px solid rgba(212,175,55,0.3)',
                            boxShadow: '0 0 30px rgba(212,175,55,0.15)',
                        }}
                    >
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                border: '1px solid rgba(212,175,55,0.5)',
                                animation: 'ringPulse 2s ease-out infinite',
                            }}
                        />
                        <CheckCircle size={36} className="text-gold" strokeWidth={1.5} />
                    </div>
                </div>

                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
                <p className="font-sans tracking-[4px] text-gold text-xs mb-3 uppercase" style={{ letterSpacing: '0.25em' }}>
                    Message Received
                </p>
                <h2 className="font-serif text-3xl text-white mb-4 leading-snug" style={{ fontWeight: 600 }}>
                    Thank You for<br />Reaching Out
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                    I've received your message and will get back to you within{' '}
                    <span className="text-gold">1–2 business days</span>. Looking forward to crafting your story together.
                </p>
                <button
                    onClick={onClose}
                    className="px-8 py-3 rounded-xl font-bold text-sm tracking-wider text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(212,175,55,0.45)]"
                    style={{ background: 'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #8f6d1d 100%)' }}
                >
                    Close
                </button>
                <div
                    className="absolute top-4 left-4 w-6 h-6 opacity-20"
                    style={{ borderTop: '1px solid #d4af37', borderLeft: '1px solid #d4af37', borderTopLeftRadius: '6px' }}
                />
                <div
                    className="absolute bottom-4 right-4 w-6 h-6 opacity-20"
                    style={{ borderBottom: '1px solid #d4af37', borderRight: '1px solid #d4af37', borderBottomRightRadius: '6px' }}
                />
            </div>

            <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes ringPulse {
          0%   { transform: scale(1);    opacity: 0.7; }
          70%  { transform: scale(1.35); opacity: 0;   }
          100% { transform: scale(1.35); opacity: 0;   }
        }
      `}</style>
        </div>
    );
}

// ─── Default fallback data ────────────────────────────────────────────────────
const DEFAULT_SERVICES = [
    { title: 'Brand Story Writing', desc: "Uncover and craft your brand's authentic narrative to create emotional resonance." },
    { title: 'Website Content', desc: 'High-converting, story-driven website copy that reflects your brand ethos.' },
    { title: 'Founder Narratives', desc: 'Transform your personal journey into a compelling, authority-building story.' },
];

function parseArrayField(field: unknown): string[] {
    if (!field) return [];
    if (Array.isArray(field)) return field.map(String).map((s) => s.trim()).filter(Boolean);
    if (typeof field === 'string') {
        const trimmed = field.trim();
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) return parsed.map(String).map((s) => s.trim()).filter(Boolean);
            } catch {
                // Ignore parse errors
            }
        }
        if (trimmed.includes('\n')) {
            return trimmed.split('\n').map((s) => s.trim()).filter(Boolean);
        }
        if (trimmed.includes(',')) {
            return trimmed.split(',').map((s) => s.trim()).filter(Boolean);
        }
        if (trimmed) return [trimmed];
    }
    return [];
}

function getServiceIcon(title: string, index: number) {
    const t = title.toLowerCase();
    if (t.includes('story') || t.includes('narrative')) return <Sparkles className="w-6 h-6" />;
    if (t.includes('website') || t.includes('content') || t.includes('copy')) return <BookOpen className="w-6 h-6" />;
    if (t.includes('founder') || t.includes('personal') || t.includes('leader')) return <Compass className="w-6 h-6" />;
    if (index === 0) return <Sparkles className="w-6 h-6" />;
    if (index === 1) return <PenTool className="w-6 h-6" />;
    return <Layers className="w-6 h-6" />;
}

// ─── Client Component ─────────────────────────────────────────────────────────
export default function WorkWithMeClient({ contactUsHeading, servicesData, footerData, faqData }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const payload = Object.fromEntries(new FormData(form).entries());

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                form.reset();
                setShowModal(true);
            } else {
                alert('Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Resolve service cards safely — handles arrays, strings, JSON, or falls back to defaults
    const headings = parseArrayField(servicesData?.card_heading);
    const descriptions = parseArrayField(servicesData?.cards_description);

    const serviceCards =
        headings.length > 0
            ? headings.map((title, i) => ({
                title,
                desc: descriptions[i] || 'Service description',
            }))
            : DEFAULT_SERVICES;

    return (
        <div
            className="min-h-screen bg-black relative overflow-hidden"
            style={{
                backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="152" height="152" viewBox="0 0 152 152"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="temple" fill="%23d4af37" fill-opacity="0.06"%3E%3Cpath d="M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
                backgroundSize: 'auto',
                backgroundRepeat: 'repeat',
            }}
        >
            <div className="absolute inset-0 bg-black/75" />

            {showModal && <ThankYouModal onClose={() => setShowModal(false)} />}

            <div className="relative">
                {/* Banner Section */}
                <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-5 animate-slow-drift" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <nav className="mb-8" data-aos="fade-down">
                            <ol className="flex items-center space-x-2 text-xs sm:text-sm">
                                <li><Link href="/" className="text-gray-400 hover:text-gold transition-colors font-sans">Home</Link></li>
                                <li className="text-gold/60">/</li>
                                <li className="text-gold font-medium font-sans">Work With Us</li>
                            </ol>
                        </nav>

                        <div className="text-center" data-aos="fade-up">
                            <p className="font-sans tracking-[4px] text-gold text-xs sm:text-sm font-semibold uppercase mb-4">
                                {contactUsHeading?.tagline ?? "LET'S CREATE SOMETHING MEANINGFUL"}
                            </p>
                            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-gold leading-tight mb-5 tracking-tight">
                                Work With <span className="text-white">Us</span>
                            </h1>
                            <p className="font-sans text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                {contactUsHeading?.subheading ??
                                    "Let's craft your brand's story together and connect with your audience on a human level."}
                            </p>
                            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
                        </div>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    {/* Description Intro */}
                    <section className="mb-20 max-w-3xl mx-auto text-center" data-aos="fade-up" data-aos-delay="100">
                        <div className="font-sans text-base sm:text-lg text-gray-300 leading-relaxed bg-[#0e0e0e]/80 border border-gold/15 p-6 sm:p-8 rounded-2xl shadow-xl">
                            {servicesData?.description ? (
                                <div dangerouslySetInnerHTML={{ __html: servicesData.description }} className="[&>p]:mb-4 last:[&>p]:mb-0" />
                            ) : (
                                'I help founders and visionary brands tell stories that matter. Through deep narrative work, authentic content, and strategic storytelling, I help you connect with your audience on a human level.'
                            )}
                        </div>
                    </section>

                    {/* Services Section */}
                    <section className="mb-24" data-aos="fade-up" data-aos-delay="200">
                        <div className="text-center mb-12">
                            <span className="font-sans text-xs uppercase tracking-[3px] text-gold font-semibold mb-2 block">
                                OUR EXPERTISE
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gold tracking-tight">
                                {servicesData?.heading ?? 'Crafted Services'}
                            </h2>
                            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto mt-4" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {serviceCards.map((service, index) => (
                                <div
                                    key={index}
                                    className="group relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
                                    data-aos="fade-up"
                                    data-aos-delay={250 + index * 100}
                                    style={{
                                        background: 'linear-gradient(165deg, #161616 0%, #0d0d0d 100%)',
                                        border: '1px solid rgba(212,175,55,0.16)',
                                        boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 4px 20px rgba(212,175,55,0.03)',
                                    }}
                                >
                                    {/* Top glow hover accent */}
                                    <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Ambient radial highlight */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all duration-500 pointer-events-none" />

                                    <div>
                                        {/* Icon & Index Header */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black group-hover:scale-105 transition-all duration-500 shadow-md">
                                                {getServiceIcon(service.title, index)}
                                            </div>
                                            <span className="font-serif text-xs tracking-widest text-gold/40 group-hover:text-gold/80 font-bold px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-gold/20 transition-all">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-gold transition-colors duration-300 mb-3 leading-snug">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 group-hover:text-gray-300 text-sm sm:text-[15px] leading-relaxed font-sans transition-colors duration-300">
                                            {service.desc}
                                        </p>
                                    </div>

                                    {/* Bottom Indicator */}
                                    <div className="pt-6 mt-6 border-t border-white/5 group-hover:border-gold/20 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-gold/70 group-hover:text-gold transition-colors">
                                        <span>Tailored Offering</span>
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact Form Section */}
                    <section
                        className="rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden max-w-4xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="400"
                        style={{
                            background: 'linear-gradient(160deg, #151515 0%, #0c0c0c 100%)',
                            border: '1px solid rgba(212,175,55,0.18)',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.85), 0 4px 30px rgba(212,175,55,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
                        }}
                    >
                        <div className="text-center mb-10">
                            <span className="font-sans text-xs uppercase tracking-[3px] text-gold font-semibold mb-2 block">
                                GET IN TOUCH
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">Let's Tell Your Story</h2>
                            <p className="text-gray-400 text-sm sm:text-base font-sans">
                                Fill out the form below or email me directly at{' '}
                                <a href={`mailto:${footerData?.email ?? 'branduntold@gmail.com'}`} className="text-gold font-medium hover:underline transition-colors">
                                    {footerData?.email ?? 'branduntold@gmail.com'}
                                </a>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">Your Name</label>
                                    <input type="text" id="name" name="name" required disabled={isSubmitting}
                                        className="w-full px-5 py-4 bg-black/80 border border-gray-800 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                        placeholder="Alex Rivera" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                                    <input type="email" id="email" name="email" required disabled={isSubmitting}
                                        className="w-full px-5 py-4 bg-black/80 border border-gray-800 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                        placeholder="you@yourbrand.com" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-200 mb-2">Interested Service</label>
                                <select id="service" name="service" required disabled={isSubmitting}
                                    className="w-full px-5 py-4 bg-black/80 border border-gray-800 rounded-2xl text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                                    <option value="">Select a service</option>
                                    <option value="brand-story">Brand Story Writing</option>
                                    <option value="website-content">Website Content Writing</option>
                                    <option value="founder-narrative">Founder Narrative</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">Tell me about your project</label>
                                <textarea id="message" rows={5} name="message" required disabled={isSubmitting}
                                    className="w-full px-5 py-4 bg-black/80 border border-gray-800 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors resize-y disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    placeholder="What are your goals? What stage is your brand in? Any specific challenges you're facing?" />
                            </div>

                            <div className="flex justify-center pt-2">
                                <button type="submit" disabled={isSubmitting}
                                    className="px-8 w-full sm:w-auto min-w-[220px] py-3.5 bg-gradient-to-r from-gold via-yellow-200 to-[#8f6d1d] text-black font-bold transition-all duration-300 text-center rounded-xl relative overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer">
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 size={18} className="animate-spin" />
                                            Sending…
                                        </span>
                                    ) : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* FAQ Section */}
                    {faqData && faqData.length > 0 && (
                        <section className="my-24 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="300">
                            <div className="text-center mb-10">
                                <span className="font-sans text-xs uppercase tracking-[3px] text-gold font-semibold mb-2 block">
                                    NEED CLARITY?
                                </span>
                                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gold tracking-tight">
                                    Frequently Asked Questions
                                </h2>
                                <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto mt-4" />
                            </div>

                            <div className="space-y-4">
                                {faqData.map((item, index) => {
                                    const isOpen = openFaqIndex === index;
                                    return (
                                        <div 
                                            key={item.id} 
                                            className="bg-[#0e0e0e] border border-gold/15 hover:border-gold/35 rounded-2xl transition-all duration-300 overflow-hidden shadow-lg shadow-black/40"
                                        >
                                            <button
                                                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                                                className="w-full text-left px-6 py-5 flex justify-between items-center cursor-pointer font-medium text-white hover:text-gold transition-colors focus:outline-none"
                                                aria-expanded={isOpen}
                                            >
                                                <span className="text-base sm:text-lg font-serif tracking-wide pr-6">{item.question}</span>
                                                <span className="text-gold shrink-0 p-1.5 rounded-full bg-gold/10 border border-gold/20 transition-transform duration-300">
                                                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                                </span>
                                            </button>
                                            <div
                                                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                                    isOpen 
                                                        ? 'max-h-[500px] opacity-100 border-t border-gold/10 bg-black/30' 
                                                        : 'max-h-0 opacity-0 pointer-events-none'
                                                }`}
                                            >
                                                <div className="px-6 py-5 text-gray-300 leading-relaxed text-sm sm:text-base font-sans">
                                                    {item.ans}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Map / Location Section */}
                    {(footerData?.map || footerData?.address) && (
                        <section
                            className="mt-24 rounded-3xl overflow-hidden group max-w-4xl mx-auto"
                            data-aos="fade-up"
                            style={{
                                background: 'linear-gradient(160deg, #151515 0%, #0c0c0c 100%)',
                                border: '1px solid rgba(212,175,55,0.18)',
                                boxShadow: '0 25px 70px rgba(0,0,0,0.8), 0 4px 24px rgba(212,175,55,0.04)',
                            }}
                        >
                            <div className="p-6 sm:p-10 border-b border-gold/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0">
                                        <MapPin size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-2xl text-gold mb-1 font-bold">Locate Us</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-sans">
                                            {footerData.address ?? 'Visit us at our creative studio to discuss your brand narrative.'}
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={footerData.map ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footerData.address ?? '')}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="px-6 py-3 bg-gold/10 border border-gold/30 text-gold rounded-full hover:bg-gold hover:text-black transition-all duration-300 text-xs sm:text-sm font-bold tracking-widest uppercase"
                                >
                                    View on Google Maps
                                </a>
                            </div>
                            <div className="h-[360px] sm:h-[400px] w-full bg-[#0a0a0a] relative overflow-hidden">
                                <iframe
                                    src={footerData.address
                                        ? `https://maps.google.com/maps?q=${encodeURIComponent(footerData.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`
                                        : footerData.map}
                                    className="w-full h-full grayscale opacity-75 invert-[0.9] contrast-[1.2] brightness-[0.9]"
                                    style={{ border: 0 }}
                                    allowFullScreen loading="lazy" title="Studio Location"
                                />
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}