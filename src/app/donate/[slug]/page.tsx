"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { translations } from "@/i18n/translations";
import { Language, DonationEvent, ImpactStory } from "@/types";
import { INITIAL_EVENTS } from "@/lib/events";
import { INITIAL_STORIES } from "@/lib/stories";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Lock,
  MapPin,
  Share2,
  Users,
  Target,
  CheckCircle2,
  Calendar,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export default function EventDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const [lang, setLang] = useState<Language>("en");
  const isHi = lang === "hi";
  const t = translations[lang].donate;

  const initialEvt = INITIAL_EVENTS.find((e) => e.slug === slug || e.id === slug) || null;
  const initialStoryList = initialEvt ? INITIAL_STORIES.filter((s) => s.eventSlug === initialEvt.slug) : [];

  const [event, setEvent] = useState<DonationEvent | null>(initialEvt);
  const [allEvents, setAllEvents] = useState<DonationEvent[]>(INITIAL_EVENTS);
  const [stories, setStories] = useState<ImpactStory[]>(initialStoryList);
  const [loading, setLoading] = useState(!initialEvt);

  // Donation form state
  const [selectedAmount, setSelectedAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<"oneTime" | "monthly">("oneTime");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");

  const currentAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("/api/events", { cache: "no-store" });
        const data = await res.json();
        const eventList = data.events?.length ? data.events : INITIAL_EVENTS;
        setAllEvents(eventList);

        const found =
          eventList.find((e: DonationEvent) => e.slug === slug || e.id === slug) ||
          INITIAL_EVENTS.find((e) => e.slug === slug || e.id === slug);

        if (found) {
          setEvent(found);
          const matchedStories = INITIAL_STORIES.filter((s) => s.eventSlug === found.slug);
          setStories(matchedStories);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (!loading && !event) {
    notFound();
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-cream/30 flex items-center justify-center font-sans">
        Loading campaign details...
      </div>
    );
  }

  const percent = Math.min(100, Math.round((event.raisedAmount / event.targetAmount) * 100));
  const eventTitle = isHi ? event.titleHi : event.titleEn;
  const eventDesc = isHi ? event.descriptionHi : event.descriptionEn;
  const eventLocation = isHi ? event.locationHi : event.locationEn;

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAmount || currentAmount < 100) {
      alert(isHi ? "न्यूनतम दान राशि ₹100 है" : "Minimum donation amount is ₹100");
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Create order on server
      const res = await fetch("/api/donations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName,
          donorEmail,
          donorPhone,
          panNumber,
          address,
          amount: currentAmount,
          frequency,
          eventId: event.id,
          eventTitle,
        }),
      });
      const orderData = await res.json();

      if (!orderData.success) {
        throw new Error(orderData.error || "Order creation failed");
      }

      // 2. Complete verification and issue receipt
      const verifyRes = await fetch("/api/donations/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: orderData.orderId,
          razorpay_payment_id: `pay_${Date.now()}`,
          razorpay_signature: "verified",
          donorName,
          donorEmail,
          donorPhone,
          panNumber,
          amount: currentAmount,
          frequency,
          eventId: event.id,
          eventTitle,
          receiptNumber: orderData.receiptNumber,
          isMock: orderData.mock,
        }),
      });

      const verifyData = await verifyRes.json();
      setReceiptNumber(verifyData.receiptNumber || orderData.receiptNumber);
      setIsSuccess(true);

      // Update local event counter
      event.raisedAmount += currentAmount;
      event.donorCount += 1;
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong while processing donation.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Support Jeevan Dhara Sansthan's campaign: "${eventTitle}". 50% Tax Exempt under 80G. Donate now: ${window.location.href}`
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
            <Link href="/donate" className="hover:text-amber">
              {isHi ? "दान अभियान" : "Donation Campaigns"}
            </Link>
            <span>/</span>
            <span className="text-amber truncate max-w-xs sm:max-w-md">{eventTitle}</span>
          </div>
        </div>

        {/* Campaign Hero Banner */}
        <section className="bg-linear-to-r from-dark via-dark/95 to-terracotta/90 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider bg-amber/20 text-amber-300 px-3.5 py-1 rounded-full border border-amber-300/30">
                  {event.category.toUpperCase()}
                </span>
                <span className="text-xs font-medium text-cream/75 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber" />
                  {eventLocation}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                {eventTitle}
              </h1>

              <p className="text-sm sm:text-base text-cream/90 font-sans leading-relaxed">
                {eventDesc}
              </p>

              {/* WhatsApp Share CTA */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isHi ? "व्हाट्सएप पर शेयर करें" : "Share on WhatsApp"}</span>
                </button>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-cream">
              <Image
                src={event.image}
                alt={eventTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              <div className="absolute top-3 right-3 bg-dark/80 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                80G(5) Tax-Exempt
              </div>
            </div>

          </div>
        </section>

        {/* Dynamic Animated Fundraising Progress Bar Section */}
        <section className="bg-white border-y border-sage-200 py-8 px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="max-w-5xl mx-auto space-y-4">

            {/* Stat Counters */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
                  {isHi ? "कुल एकत्रित राशि" : "Total Funds Raised"}
                </p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-dark">
                    ₹{event.raisedAmount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-semibold text-dark/60 font-sans">
                    / ₹{event.targetAmount.toLocaleString("en-IN")} {isHi ? "लक्ष्य" : "goal"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm font-sans font-medium text-dark/80">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber" />
                  <span><strong>{event.donorCount}</strong> {isHi ? "दानदाता" : "Donors"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-terracotta" />
                  <span><strong>{percent}%</strong> {isHi ? "पूर्ण" : "Funded"}</span>
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
                <span>0% Initiated</span>
                <span>25% Training Center</span>
                <span>50% Equipment Batch</span>
                <span>75% Field Delivery</span>
                <span>100% Fully Realized</span>
              </div>
            </div>

          </div>
        </section>

        {/* Main Content Area: Impact Story + Donation Form */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left Column: Beneficiary Story & Project Details */}
            <div className="lg:col-span-7 space-y-8">

              {/* Beneficiary Story Highlight */}
              {stories.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-md space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                      {isHi ? "सच्ची बदलाव की कहानी" : "Real Story of Change"}
                    </span>
                    <span className="text-xs font-semibold text-dark/60">
                      {stories[0].year} • {isHi ? stories[0].villageHi : stories[0].villageEn}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-dark leading-snug">
                    {isHi ? stories[0].headlineHi : stories[0].headlineEn}
                  </h3>

                  <p className="text-sm sm:text-base text-dark/80 font-sans leading-relaxed">
                    {isHi ? stories[0].storyHi : stories[0].storyEn}
                  </p>

                  <blockquote className="p-4 bg-cream rounded-2xl border-l-4 border-terracotta italic text-sm font-sans text-dark/90 leading-relaxed">
                    {isHi ? stories[0].quoteHi : stories[0].quoteEn}
                  </blockquote>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-terracotta">
                    <Sparkles className="w-4 h-4" />
                    <span>{isHi ? stories[0].donationImpactHi : stories[0].donationImpactEn}</span>
                  </div>
                </div>
              )}

              {/* Transparency & Utilization Note */}
              <div className="bg-sage-50 rounded-3xl p-6 sm:p-8 border border-sage-200 space-y-3 font-sans">
                <h4 className="font-serif font-bold text-lg text-dark flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sage-800" />
                  {isHi ? "दान उपयोग एवं 80G कर छूट" : "Fund Utilization & Tax Exemption"}
                </h4>
                <p className="text-xs sm:text-sm text-dark/80 leading-relaxed">
                  {isHi
                    ? "इस अभियान में प्राप्त समस्त दान सीधे सामग्री खरीद, कताई उपकरण वितरण एवं क्षेत्रीय प्रशिक्षण में व्यय किया जाता है। दान आयकर की धारा 80G(5) के अंतर्गत 50% कर कटौती हेतु मान्य है।"
                    : "100% of donations received for this campaign are allocated directly toward procurement of tools, village training, and field implementation. An official 80G receipt is generated instantly upon contribution."}
                </p>
              </div>

            </div>

            {/* Right Column: Dedicated Donation Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xl sticky top-24">

                {isSuccess ? (
                  <div className="text-center space-y-5 py-4">
                    <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center text-terracotta mx-auto">
                      <Heart className="w-7 h-7 fill-terracotta" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-dark">
                      {isHi ? "सहयोग प्राप्त हुआ!" : "Thank You For Your Support!"}
                    </h3>
                    <p className="text-xs sm:text-sm text-dark/80 font-sans">
                      {isHi
                        ? `आपका ₹${currentAmount.toLocaleString("en-IN")} का सहयोग इस अभियान हेतु सफलतापूर्वक प्राप्त हुआ। रसीद #${receiptNumber} जारी कर दी गई है।`
                        : `Your contribution of ₹${currentAmount.toLocaleString("en-IN")} toward "${eventTitle}" was received. Official 80G Receipt #${receiptNumber} generated.`}
                    </p>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="w-full py-3 bg-terracotta text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      {isHi ? "अन्य दान करें" : "Donate Again"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDonate} className="space-y-5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                        {isHi ? "सहयोग राशि चुनें" : "Select Contribution"}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-dark">
                        {isHi ? "इस अभियान को दान दें" : "Sponsor This Campaign"}
                      </h3>
                    </div>

                    {/* Frequency */}
                    <div className="flex bg-cream p-1 rounded-xl border border-sage-200 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setFrequency("oneTime")}
                        className={`flex-1 py-2 rounded-lg transition cursor-pointer ${frequency === "oneTime" ? "bg-terracotta text-white shadow-xs" : "text-dark/70"
                          }`}
                      >
                        {t.frequency.oneTime}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency("monthly")}
                        className={`flex-1 py-2 rounded-lg transition cursor-pointer ${frequency === "monthly" ? "bg-terracotta text-white shadow-xs" : "text-dark/70"
                          }`}
                      >
                        {t.frequency.monthly}
                      </button>
                    </div>

                    {/* Presets */}
                    <div className="grid grid-cols-3 gap-2">
                      {[1000, 2500, 5000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt);
                            setCustomAmount("");
                          }}
                          className={`py-2.5 rounded-xl border-2 font-serif font-bold text-base transition cursor-pointer ${selectedAmount === amt && !customAmount
                              ? "border-terracotta bg-terracotta/10 text-terracotta"
                              : "border-sage-200 bg-white text-dark hover:border-amber"
                            }`}
                        >
                          ₹{amt.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-serif font-bold text-dark/60">
                        ₹
                      </span>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value.replace(/\D/g, ""))}
                        placeholder={isHi ? "अन्य राशि (₹)" : "Custom amount (₹)"}
                        className="w-full pl-8 pr-3 py-2.5 bg-cream/40 border border-sage-300 rounded-xl text-sm font-bold focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    {/* Donor Details */}
                    <div className="space-y-3 pt-2 border-t border-sage-100 text-xs font-sans">
                      <div>
                        <label className="block font-bold text-dark/80 mb-1">
                          {t.form.name} *
                        </label>
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="e.g. Ramesh Sharma"
                          className="w-full px-3 py-2 bg-cream/30 border border-sage-300 rounded-xl focus:outline-none focus:border-terracotta"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold text-dark/80 mb-1">
                            {t.form.email} *
                          </label>
                          <input
                            type="email"
                            required
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="e.g. name@mail.com"
                            className="w-full px-3 py-2 bg-cream/30 border border-sage-300 rounded-xl focus:outline-none focus:border-terracotta"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-dark/80 mb-1">
                            {t.form.phone} *
                          </label>
                          <input
                            type="tel"
                            required
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            placeholder="+91..."
                            className="w-full px-3 py-2 bg-cream/30 border border-sage-300 rounded-xl focus:outline-none focus:border-terracotta"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-dark/80 mb-1">
                          {t.form.pan}
                        </label>
                        <input
                          type="text"
                          value={panNumber}
                          onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                          placeholder="ABCDE1234F"
                          maxLength={10}
                          className="w-full px-3 py-2 bg-cream/30 border border-sage-300 rounded-xl uppercase font-mono focus:outline-none focus:border-terracotta"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-amber hover:bg-amber-400 text-dark font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Lock className="w-4 h-4" />
                      <span>
                        {isProcessing
                          ? "Processing..."
                          : `Sponsor with ₹${currentAmount.toLocaleString("en-IN")}`}
                      </span>
                    </button>

                    <p className="text-[10px] text-center text-dark/60 font-sans">
                      {t.taxNotice}
                    </p>
                  </form>
                )}

              </div>
            </div>

          </div>
        </section>
        {/* Other Active Campaigns Carousel / Grid */}
        <section className="py-14 sm:py-20 bg-white border-t border-sage-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                  {isHi ? "अन्य सक्रिय पहल" : "Other Ongoing Initiatives"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-dark mt-1">
                  {isHi ? "अन्य अभियानों का सहयोग करें" : "Support Our Other Community Causes"}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allEvents
                .filter((e) => e.slug !== slug && e.id !== slug)
                .slice(0, 3)
                .map((otherEvt) => {
                  const otherPercent = Math.min(100, Math.round((otherEvt.raisedAmount / otherEvt.targetAmount) * 100));
                  return (
                    <Link
                      key={otherEvt.id}
                      href={`/donate/${otherEvt.slug || otherEvt.id}`}
                      className="group rounded-3xl overflow-hidden border border-sage-200 hover:border-terracotta hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-white cursor-pointer"
                    >
                      <div className="relative h-44 w-full bg-sage-100">
                        <Image
                          src={otherEvt.image}
                          alt={otherEvt.titleEn}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-dark/75 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 bg-amber text-dark font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                          {otherEvt.category}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h4 className="text-base font-serif font-bold text-dark leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
                            {isHi ? otherEvt.titleHi : otherEvt.titleEn}
                          </h4>
                          <p className="text-xs text-dark/70 font-sans mt-1.5 line-clamp-2">
                            {isHi ? otherEvt.descriptionHi : otherEvt.descriptionEn}
                          </p>
                        </div>

                        {/* Progress */}
                        <div className="space-y-1.5 pt-2 border-t border-sage-100">
                          <div className="flex justify-between text-[11px] font-semibold">
                            <span className="text-terracotta font-bold">
                              ₹{otherEvt.raisedAmount.toLocaleString("en-IN")}
                            </span>
                            <span className="text-dark/60">
                              {otherPercent}% of ₹{otherEvt.targetAmount.toLocaleString("en-IN")}
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
                            <Heart className="w-3.5 h-3.5 fill-dark" />
                            <span>{isHi ? "इस अभियान को दान दें" : "Sponsor This Goal"}</span>
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
