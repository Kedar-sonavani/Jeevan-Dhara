"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { translations } from "@/i18n/translations";
import { Language, VolunteerCampaign } from "@/types";
import { INITIAL_VOLUNTEER_CAMPAIGNS } from "@/lib/volunteer-campaigns";
import {
  Users,
  ShieldCheck,
  Sparkles,
  MapPin,
  Target,
  CheckCircle,
  MessageCircle,
  Send,
  Calendar,
  Heart
} from "lucide-react";

export default function VolunteerCampaignDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const [lang, setLang] = useState<Language>("en");
  const isHi = lang === "hi";

  const initialCampaign =
    INITIAL_VOLUNTEER_CAMPAIGNS.find((c) => c.slug === slug || c.id === slug) || null;

  const [campaign, setCampaign] = useState<VolunteerCampaign | null>(initialCampaign);
  const [allCampaigns, setAllCampaigns] = useState<VolunteerCampaign[]>(INITIAL_VOLUNTEER_CAMPAIGNS);
  const [loading, setLoading] = useState(!initialCampaign);

  // Volunteer form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("/api/volunteer-campaigns", { cache: "no-store" });
        const data = await res.json();
        const list = data.campaigns?.length ? data.campaigns : INITIAL_VOLUNTEER_CAMPAIGNS;
        setAllCampaigns(list);

        const found =
          list.find((c: VolunteerCampaign) => c.slug === slug || c.id === slug) ||
          INITIAL_VOLUNTEER_CAMPAIGNS.find((c) => c.slug === slug || c.id === slug);

        if (found) {
          setCampaign(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (!loading && !campaign) {
    notFound();
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-cream/30 flex items-center justify-center font-sans">
        Loading campaign details...
      </div>
    );
  }

  const percent = Math.min(
    100,
    Math.round((campaign.volunteersEnrolled / campaign.volunteersNeeded) * 100)
  );
  const campaignTitle = isHi ? campaign.titleHi : campaign.titleEn;
  const campaignDesc = isHi ? campaign.descriptionHi : campaign.descriptionEn;
  const campaignLocation = isHi ? campaign.locationHi : campaign.locationEn;

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          city,
          interest: `Campaign: ${campaign.titleEn}`,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        // locally increase count
        campaign.volunteersEnrolled += 1;
      } else {
        setIsSuccess(true);
      }
    } catch (err: any) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Join Jeevan Dhara Sansthan as a volunteer for "${campaignTitle}". Apply now: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream/30 text-dark">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* Breadcrumb Header */}
        <div className="bg-dark text-white/80 py-4 px-4 sm:px-6 lg:px-8 text-xs font-sans border-b border-sage-900">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <Link href="/" className="hover:text-amber">
              {isHi ? "मुख्य पृष्ठ" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/volunteer-campaigns" className="hover:text-amber">
              {isHi ? "स्वयंसेवक अभियान" : "Volunteer Campaigns"}
            </Link>
            <span>/</span>
            <span className="text-amber truncate max-w-xs sm:max-w-md">{campaignTitle}</span>
          </div>
        </div>

        {/* Campaign Hero Banner */}
        <section className="bg-linear-to-r from-dark via-dark/95 to-terracotta/90 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider bg-amber/20 text-amber-300 px-3.5 py-1 rounded-full border border-amber-300/30">
                  {campaign.category.toUpperCase()}
                </span>
                <span className="text-xs font-medium text-cream/75 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber" />
                  {campaignLocation}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                {campaignTitle}
              </h1>

              <p className="text-sm sm:text-base text-cream/90 font-sans leading-relaxed">
                {campaignDesc}
              </p>

              {/* WhatsApp Share CTA */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isHi ? "मित्रों को आमंत्रित करें" : "Share on WhatsApp"}</span>
                </button>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-cream">
              <Image
                src={campaign.image}
                alt={campaignTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              <div className="absolute top-3 right-3 bg-dark/80 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                ⭐ {isHi ? "सक्रिय आवश्यकता" : "Active Requirement"}
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Volunteers Needed Progress Bar */}
        <section className="bg-white border-y border-sage-200 py-8 px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="max-w-5xl mx-auto space-y-4">
            {/* Stat Counters */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
                  {isHi ? "स्वयंसेवक स्थिति" : "Volunteer Status"}
                </p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-dark">
                    {campaign.volunteersEnrolled}
                  </span>
                  <span className="text-sm font-semibold text-dark/60 font-sans">
                    / {campaign.volunteersNeeded} {isHi ? "कुल आवश्यकता" : "volunteers needed"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm font-sans font-medium text-dark/80">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber" />
                  <span>
                    <strong>{campaign.volunteersNeeded - campaign.volunteersEnrolled}</strong>{" "}
                    {isHi ? "स्थान शेष" : "Spots Remaining"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-terracotta" />
                  <span>
                    <strong>{percent}%</strong> {isHi ? "पूर्ण" : "Filled"}
                  </span>
                </div>
              </div>
            </div>

            {/* Thick Animated Progress Bar */}
            <div className="relative">
              <div className="h-6 w-full bg-cream-300 rounded-full overflow-hidden shadow-inner p-1">
                <div
                  style={{ width: `${percent}%` }}
                  className="h-full bg-linear-to-r from-terracotta via-amber to-amber-400 rounded-full transition-all duration-700 shadow-sm"
                />
              </div>

              {/* Milestone Markers */}
              <div className="flex justify-between text-[11px] font-semibold text-dark/60 mt-2 px-1">
                <span>0% Drive Start</span>
                <span>25% Onboarding</span>
                <span>50% Mid Cohort</span>
                <span>75% Field Training</span>
                <span>100% Team Complete</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area: Campaign Details + Direct Application Form */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Volunteer Role Details & What to Expect */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-md space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                    {isHi ? "भूमिका एवं अवसर विवरण" : "Volunteer Role & Details"}
                  </span>
                  <span className="text-xs font-semibold text-dark/60 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {campaign.createdAt}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-dark leading-snug">
                  {isHi ? "आप इस अभियान में क्या योगदान देंगे?" : "How You Will Make a Difference in this Drive"}
                </h3>

                <p className="text-sm sm:text-base text-dark/80 font-sans leading-relaxed">
                  {campaignDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-cream/70 rounded-2xl border border-sage-100 space-y-1">
                    <span className="text-xs font-bold uppercase text-terracotta">Location</span>
                    <p className="text-sm font-semibold text-dark">{campaignLocation}</p>
                  </div>
                  <div className="p-4 bg-cream/70 rounded-2xl border border-sage-100 space-y-1">
                    <span className="text-xs font-bold uppercase text-terracotta">Commitment</span>
                    <p className="text-sm font-semibold text-dark">Flexible / Weekend Options</p>
                  </div>
                </div>

                <blockquote className="p-4 bg-cream rounded-2xl border-l-4 border-terracotta italic text-sm font-sans text-dark/90 leading-relaxed">
                  {isHi
                    ? "“स्वयंसेवकों का सहयोग हमारे ग्रामीण भाई-बहनों के जीवन में आत्मनिर्भरता और आशा की नई किरण लाता है।”"
                    : "“The dedication of on-ground volunteers brings transformative real-world impact to our desert and rural communities.”"}
                </blockquote>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-terracotta">
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isHi
                      ? "अभियान समाप्ति पर आधिकारिक स्वयंसेवक प्रमाण पत्र प्रदान किया जाएगा।"
                      : "Official volunteer certificate and field experience letter provided upon completion."}
                  </span>
                </div>
              </div>

              {/* Safety & Guidelines Note */}
              <div className="bg-sage-50 rounded-3xl p-6 sm:p-8 border border-sage-200 space-y-3 font-sans">
                <h4 className="font-serif font-bold text-lg text-dark flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sage-800" />
                  {isHi ? "प्रशिक्षण एवं क्षेत्रीय समन्वय" : "Training & On-Ground Coordination"}
                </h4>
                <p className="text-xs sm:text-sm text-dark/80 leading-relaxed">
                  {isHi
                    ? "सभी चयनित स्वयंसेवकों को हमारे वरिष्ठ क्षेत्रीय समन्वयकों द्वारा आवश्यक दिशानिर्देश व सामग्री उपलब्ध कराई जाएगी। किसी भी पूर्व अनुभव की अनिवार्यता नहीं है।"
                    : "All selected volunteers receive orientation and on-ground logistics support from our local district coordinators. No prior formal NGO experience is required."}
                </p>
              </div>
            </div>

            {/* Right Column: Direct In-Campaign Volunteer Application Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xl sticky top-24">
                {isSuccess ? (
                  <div className="text-center space-y-5 py-4">
                    <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center text-terracotta mx-auto">
                      <CheckCircle className="w-8 h-8 text-sage-800" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-dark">
                      {isHi ? "आवेदन सफलतापूर्वक प्राप्त हुआ!" : "Application Received!"}
                    </h3>
                    <p className="text-xs sm:text-sm text-dark/80 font-sans">
                      {isHi
                        ? `धन्यवाद ${name}! आपका आवेदन "${campaignTitle}" अभियान हेतु प्राप्त हुआ। हमारे जिला समन्वयक शीघ्र आपसे संपर्क करेंगे।`
                        : `Thank you ${name}! Your application for "${campaignTitle}" has been registered. Our field coordinator will reach out shortly.`}
                    </p>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="w-full py-3 bg-terracotta text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      {isHi ? "अन्य आवेदन भरें" : "Submit Another Application"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                        {isHi ? "पंजीकरण" : "Step Forward"}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-dark">
                        {isHi ? "इस अभियान हेतु आवेदन करें" : "Join This Campaign"}
                      </h3>
                      <p className="text-xs text-dark/65 mt-1 font-sans">
                        Fill your details to enlist for <strong>{campaignTitle}</strong>
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 mb-1.5">
                        {isHi ? "पूरा नाम" : "Full Name"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full px-3.5 py-2.5 bg-cream/30 border border-sage-300 rounded-xl text-sm focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 mb-1.5">
                          {isHi ? "ईमेल पता" : "Email"} *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@email.com"
                          className="w-full px-3.5 py-2.5 bg-cream/30 border border-sage-300 rounded-xl text-sm focus:outline-none focus:border-terracotta"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 mb-1.5">
                          {isHi ? "मोबाइल नंबर" : "Phone"} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91..."
                          className="w-full px-3.5 py-2.5 bg-cream/30 border border-sage-300 rounded-xl text-sm focus:outline-none focus:border-terracotta"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 mb-1.5">
                        {isHi ? "शहर / जिला" : "Current City / District"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Bikaner / Jaipur"
                        className="w-full px-3.5 py-2.5 bg-cream/30 border border-sage-300 rounded-xl text-sm focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 mb-1.5">
                        {isHi ? "आप क्या योगदान दे सकते हैं?" : "What specific skills or availability do you bring?"}
                      </label>
                      <textarea
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="e.g. Available on weekends, can conduct computer batches..."
                        className="w-full px-3.5 py-2.5 bg-cream/30 border border-sage-300 rounded-xl text-sm focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isProcessing ? "Submitting..." : isHi ? "आवेदन जमा करें" : "Enlist as Volunteer"}</span>
                    </button>

                    <p className="text-[10px] text-center text-dark/60 font-sans">
                      🔒 Your details are kept confidential and shared only with our coordinator.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Other Active Volunteer Campaigns */}
        <section className="py-14 sm:py-20 bg-white border-t border-sage-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                  {isHi ? "अन्य स्वयंसेवक अभियान" : "Other Volunteer Drives"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-dark mt-1">
                  {isHi ? "अन्य अवसरों में शामिल हों" : "Explore Other Active Opportunities"}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allCampaigns
                .filter((c) => c.slug !== slug && c.id !== slug)
                .slice(0, 3)
                .map((other) => {
                  const otherPercent = Math.min(
                    100,
                    Math.round((other.volunteersEnrolled / other.volunteersNeeded) * 100)
                  );
                  return (
                    <Link
                      key={other.id}
                      href={`/volunteer-campaigns/${other.slug || other.id}`}
                      className="group rounded-3xl overflow-hidden border border-sage-200 hover:border-terracotta hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-white cursor-pointer"
                    >
                      <div className="relative h-44 w-full bg-sage-100">
                        <Image
                          src={other.image}
                          alt={other.titleEn}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-dark/75 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 bg-amber text-dark font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                          {other.category}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h4 className="text-base font-serif font-bold text-dark leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
                            {isHi ? other.titleHi : other.titleEn}
                          </h4>
                          <p className="text-xs text-dark/70 font-sans mt-1.5 line-clamp-2">
                            {isHi ? other.descriptionHi : other.descriptionEn}
                          </p>
                        </div>

                        {/* Progress */}
                        <div className="space-y-1.5 pt-2 border-t border-sage-100">
                          <div className="flex justify-between text-[11px] font-semibold">
                            <span className="text-terracotta font-bold">
                              {other.volunteersEnrolled} {isHi ? "पंजीकृत" : "enrolled"}
                            </span>
                            <span className="text-dark/60">
                              {otherPercent}% of {other.volunteersNeeded}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-cream-300 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${otherPercent}%` }}
                              className="h-full bg-linear-to-r from-terracotta to-amber rounded-full transition-all"
                            />
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="w-full py-3 bg-amber hover:bg-amber-400 text-dark font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition flex items-center justify-center gap-2">
                            <Users className="w-3.5 h-3.5 fill-dark" />
                            <span>{isHi ? "विवरण देखें" : "View Opportunity"}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
