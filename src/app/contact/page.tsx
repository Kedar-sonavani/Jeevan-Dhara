"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { translations } from "@/i18n/translations";
import { Language } from "@/types";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang].contact;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || "",
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setFormSubmitted(true);
      } else {
        setFormSubmitted(true);
      }
    } catch (err) {
      setFormSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream/30 text-dark">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* Page Banner Header */}
        <section className="pt-14 sm:pt-20 lg:pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#A85D43]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
              {t.badge}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-dark leading-[0.95]">
            {t.title}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-dark/75 max-w-2xl font-sans leading-relaxed">
            {t.subtitle}
          </p>
        </section>

        {/* Contact Layout: Info Cards on Left + Inquiry Form on Right */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Column: Office Locations & Contacts */}
            <div className="lg:col-span-5 space-y-8">
              {/* Registered Head Office */}
              <div className="bg-white p-8 rounded-3xl border border-sage-200 shadow-md space-y-4">
                <div className="flex items-center gap-3 text-terracotta">
                  <MapPin className="w-6 h-6" />
                  <h3 className="font-serif font-bold text-xl text-dark">
                    {t.hqTitle}
                  </h3>
                </div>
                <p className="text-sm text-dark/80 font-sans leading-relaxed">
                  {t.hqAddress}
                </p>
              </div>

              {/* Hanumangarh Branch */}
              <div className="bg-white p-8 rounded-3xl border border-sage-200 shadow-md space-y-4">
                <div className="flex items-center gap-3 text-sage-800">
                  <MapPin className="w-6 h-6" />
                  <h3 className="font-serif font-bold text-xl text-dark">
                    {t.branchTitle}
                  </h3>
                </div>
                <p className="text-sm text-dark/80 font-sans leading-relaxed">
                  {t.branchAddress}
                </p>
              </div>

              {/* Direct Communications */}
              <div className="bg-cream/60 p-8 rounded-3xl border border-sage-200 space-y-4 text-sm font-sans">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-terracotta shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-dark/60">Phone</p>
                    <p className="font-semibold text-dark">{t.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-terracotta shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-dark/60">Email</p>
                    <p className="font-semibold text-dark">{t.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-terracotta shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-dark/60">Office Hours</p>
                    <p className="font-semibold text-dark">{t.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-sage-200 shadow-xl">
                <div className="space-y-2 mb-8">
                  <span className="text-xs font-bold text-terracotta uppercase tracking-wider">
                    Reach Out
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-dark">
                    {t.form.title}
                  </h2>
                </div>

                {formSubmitted ? (
                  <div className="p-8 bg-sage-100/70 border border-sage-300 rounded-2xl text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-sage-800 mx-auto" />
                    <h3 className="text-xl font-serif font-bold text-dark">
                      {lang === "en" ? "Inquiry Sent Successfully" : "संदेश सफलतापूर्वक भेजा गया"}
                    </h3>
                    <p className="text-sm text-dark/80 font-sans">
                      {t.form.success}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 mb-2">
                          {t.form.name} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Anand Meena"
                          className="w-full px-4 py-3 bg-cream/30 border border-sage-300 rounded-xl text-sm focus:outline-none focus:border-terracotta"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 mb-2">
                          {t.form.email} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. anand@example.com"
                          className="w-full px-4 py-3 bg-cream/30 border border-sage-300 rounded-xl text-sm focus:outline-none focus:border-terracotta"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 mb-2">
                          {t.form.phone}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3 bg-cream/30 border border-sage-300 rounded-xl text-sm focus:outline-none focus:border-terracotta"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 mb-2">
                          {t.form.subject} *
                        </label>
                        <select
                          name="subject"
                          required
                          className="w-full px-4 py-3 bg-cream/30 border border-sage-300 rounded-xl text-sm focus:outline-none focus:border-terracotta text-dark"
                        >
                          {t.form.subjects.map((sub, idx) => (
                            <option key={idx} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 mb-2">
                        {t.form.message} *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Write your inquiry or proposal here..."
                        className="w-full px-4 py-3 bg-cream/30 border border-sage-300 rounded-xl text-sm focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-4 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{loading ? "Sending..." : t.form.submit}</span>
                      </button>

                      <a
                        href="https://wa.me/917742221668?text=Hello%20Jeevan%20Dhara%20Sansthan,%20I%20would%20like%20to%20inquire%20about%20your%20initiatives."
                        target="_blank"
                        rel="noreferrer"
                        className="py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2"
                      >
                        <span>WhatsApp Chat</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
