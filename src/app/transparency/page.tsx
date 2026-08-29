"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  Landmark,
  PieChart,
  ShieldCheck,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { translations } from "@/i18n/translations";

import {
  Language,
  FundAllocationItem,
  TransparencyReport,
} from "@/types";

import { INITIAL_SETTINGS } from "@/lib/settings";


export default function TransparencyPage() {
  const [lang, setLang] = useState<Language>("en");

  const isHi = lang === "hi";

  const t = translations[lang].transparency;

  const [fundAllocation, setFundAllocation] =
    useState<FundAllocationItem[]>(
      INITIAL_SETTINGS.fundAllocation
    );

  const [reports, setReports] =
    useState<TransparencyReport[]>(
      INITIAL_SETTINGS.reports
    );


  /* ============================================================
     LOAD SETTINGS
     ============================================================ */

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");

        if (!res.ok) return;

        const data = await res.json();

        if (data.success && data.settings) {
          if (data.settings.fundAllocation) {
            setFundAllocation(data.settings.fundAllocation);
          }

          if (data.settings.reports) {
            setReports(data.settings.reports);
          }
        }
      } catch (error) {
        console.warn(
          "Could not load transparency settings.",
          error
        );
      }
    }

    loadSettings();
  }, []);


  /* ============================================================
     STATUTORY INFORMATION
     ============================================================ */

  const statutoryItems = t.registrations || [];


  return (
    <div className="min-h-screen bg-[#F6F2E9] text-[#20221F]">

      <Header
        lang={lang}
        onLanguageChange={setLang}
      />


      <main>


        {/* ======================================================
            HERO
        ====================================================== */}

        <section className="border-b border-[#20221F]/10 overflow-hidden relative">

          {/* Decorative subtle background shapes */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-sage-200/30 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative">

            <div className="py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* LEFT COLUMN: Hero Copy */}
              <div className="lg:col-span-7">

                <div className="flex items-center gap-3 mb-7">

                  <span className="w-8 h-px bg-[#A85D43]" />

                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
                    {isHi
                      ? "पारदर्शिता एवं अनुपालन"
                      : "Transparency & Compliance"}
                  </span>

                </div>


                <h1 className="font-serif text-5xl sm:text-6xl lg:text-[68px] leading-[0.98] tracking-tight font-bold">

                  {isHi ? (
                    <>
                      विश्वास को
                      <br />
                      <span className="text-[#A85D43]">
                        सत्यापित करें।
                      </span>
                    </>
                  ) : (
                    <>
                      Trust should be
                      <br />
                      <span className="text-[#A85D43]">
                        verifiable.
                      </span>
                    </>
                  )}

                </h1>


                <p className="mt-8 max-w-xl text-base sm:text-lg leading-8 text-[#20221F]/60">

                  {isHi
                    ? "हम अपनी संस्थागत, वित्तीय और वैधानिक जानकारी को स्पष्ट रूप से साझा करते हैं ताकि दाता, CSR साझेदार और अन्य हितधारक सूचित निर्णय ले सकें।"
                    : "We make our institutional, financial and statutory information accessible so donors, CSR partners and other stakeholders can make informed decisions."}

                </p>


                <div className="mt-9 flex flex-wrap gap-3">

                  <a
                    href="#documents"
                    className="inline-flex items-center gap-2 rounded-full bg-[#20221F] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A85D43]"
                  >
                    {isHi
                      ? "दस्तावेज़ देखें"
                      : "View Documents"}

                    <ArrowRight className="w-4 h-4" />
                  </a>


                  <a
                    href="#financials"
                    className="inline-flex items-center gap-2 rounded-full border border-[#20221F]/15 px-6 py-3.5 text-sm font-semibold transition hover:border-[#A85D43] hover:text-[#A85D43]"
                  >
                    {isHi
                      ? "वित्तीय जानकारी"
                      : "Financial Information"}
                  </a>

                </div>

              </div>


              {/* RIGHT COLUMN: CSR Showcase Image */}
              <div className="lg:col-span-5 relative">

                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-amber-200/50 -z-10" />
                <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-sage-200/60 -z-10" />

                <div className="relative h-[380px] sm:h-[460px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-[#20221F]/10 group">

                  <Image
                    src="/images/transparency.jpeg"
                    alt="Jeevan Dhara Sansthan Transparency and Governance"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />



                  {/* Bottom Caption Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                    <p className="text-white text-lg sm:text-xl font-serif font-semibold leading-snug">
                      {isHi
                        ? "100% पारदर्शी एवं वैधानिक रिकॉर्ड"
                        : "100% Verified Statutory Records"}
                    </p>
                    <p className="mt-1.5 text-xs text-white/80">
                      {isHi
                        ? "ऑडिट रिपोर्ट एवं प्रमाण पत्र सार्वजनिक रूप से उपलब्ध"
                        : "Publicly accessible audit reports, 80G & 12AA filings"}
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ======================================================
            QUICK VERIFICATION
        ====================================================== */}

        <section className="bg-white border-b border-[#20221F]/10">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="grid grid-cols-2 lg:grid-cols-4">

              {[
                {
                  icon: Landmark,
                  title: isHi
                    ? "पंजीकरण"
                    : "Registration",
                  text: isHi
                    ? "संस्थागत विवरण"
                    : "Organisation details",
                  href: "#registrations",
                },

                {
                  icon: PieChart,
                  title: isHi
                    ? "वित्तीय"
                    : "Financials",
                  text: isHi
                    ? "फंड आवंटन"
                    : "Fund allocation",
                  href: "#financials",
                },

                {
                  icon: FileText,
                  title: isHi
                    ? "रिपोर्ट"
                    : "Reports",
                  text: isHi
                    ? "वार्षिक दस्तावेज़"
                    : "Annual documents",
                  href: "#documents",
                },

                {
                  icon: ShieldCheck,
                  title: isHi
                    ? "अनुपालन"
                    : "Compliance",
                  text: isHi
                    ? "वैधानिक जानकारी"
                    : "Statutory information",
                  href: "#compliance",
                },
              ].map((item, index) => {

                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    className={`
                      group p-6 sm:p-8
                      ${index < 3
                        ? "border-r border-[#20221F]/10"
                        : ""}
                      hover:bg-[#F6F2E9]
                      transition
                    `}
                  >

                    <Icon className="w-5 h-5 text-[#A85D43]" />

                    <p className="mt-5 font-serif text-lg font-bold">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-[#20221F]/45">
                      {item.text}
                    </p>

                    <ChevronRight className="mt-5 w-4 h-4 text-[#20221F]/30 group-hover:text-[#A85D43] group-hover:translate-x-1 transition" />

                  </a>
                );
              })}

            </div>

          </div>

        </section>



        {/* ======================================================
            REGISTRATIONS
        ====================================================== */}

        <section
          id="registrations"
          className="py-24 scroll-mt-20"
        >

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="grid lg:grid-cols-12 gap-12">

              <div className="lg:col-span-4">

                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
                  01 / Registration
                </span>

                <h2 className="mt-5 font-serif text-4xl sm:text-5xl font-bold leading-tight">
                  {isHi
                    ? "संस्थागत पहचान"
                    : "Institutional identity"}
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#20221F]/55 max-w-sm">
                  {isHi
                    ? "संगठन से संबंधित उपलब्ध पंजीकरण और वैधानिक पहचान की जानकारी।"
                    : "Available registration and statutory identity information associated with the organisation."}
                </p>

              </div>


              <div className="lg:col-span-8">

                <div className="bg-white rounded-3xl border border-[#20221F]/10 overflow-hidden">

                  {statutoryItems.map((item, index) => (

                    <div
                      key={index}
                      className={`
                        px-6 sm:px-8 py-6
                        ${index !== statutoryItems.length - 1
                          ? "border-b border-[#20221F]/10"
                          : ""}
                      `}
                    >

                      <div className="grid sm:grid-cols-2 gap-3">

                        <p className="text-xs font-bold uppercase tracking-wider text-[#20221F]/40">
                          {item.label}
                        </p>

                        <p className="text-sm font-semibold">
                          {item.value}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ======================================================
            FINANCIALS
        ====================================================== */}

        <section
          id="financials"
          className="py-24 bg-white border-y border-[#20221F]/10 scroll-mt-20"
        >

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="grid lg:grid-cols-12 gap-12">

              <div className="lg:col-span-4">

                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
                  02 / Financials
                </span>

                <h2 className="mt-5 font-serif text-4xl sm:text-5xl font-bold leading-tight">
                  {isHi
                    ? "फंड का उपयोग"
                    : "Where funds go"}
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#20221F]/55 max-w-sm">
                  {isHi
                    ? "उपलब्ध वित्तीय जानकारी को सरल और समझने योग्य रूप में प्रस्तुत किया गया है।"
                    : "Available financial information is presented in a simple, understandable format."}
                </p>


                <div className="mt-8 p-5 rounded-2xl bg-[#F6F2E9] border border-[#20221F]/10">

                  <div className="flex gap-3">

                    <ShieldCheck className="w-5 h-5 text-[#52705D] shrink-0" />

                    <p className="text-xs leading-6 text-[#20221F]/55">
                      {isHi
                        ? "विस्तृत जानकारी के लिए संबंधित वित्तीय और ऑडिट रिपोर्ट देखें।"
                        : "Refer to the relevant financial and audit reports for detailed information."}
                    </p>

                  </div>

                </div>

              </div>


              <div className="lg:col-span-8">

                <div className="bg-[#F6F2E9] rounded-3xl p-6 sm:p-9 border border-[#20221F]/10">

                  {/* BAR */}

                  <div className="h-10 w-full rounded-full overflow-hidden flex bg-[#20221F]/5">

                    {fundAllocation.map((item) => (

                      <div
                        key={item.id}
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                        title={`${isHi
                          ? item.categoryHi
                          : item.categoryEn
                          } ${item.percentage}%`}
                        className="h-full"
                      />

                    ))}

                  </div>


                  {/* LEGEND */}

                  <div className="mt-7 grid sm:grid-cols-2 gap-3">

                    {fundAllocation.map((item) => (

                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-white rounded-xl px-4 py-4 border border-[#20221F]/10"
                      >

                        <div className="flex items-center gap-3">

                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                item.color,
                            }}
                          />

                          <span className="text-xs font-medium">
                            {isHi
                              ? item.categoryHi
                              : item.categoryEn}
                          </span>

                        </div>

                        <span className="font-serif text-lg font-bold">
                          {item.percentage}%
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ======================================================
            DOCUMENTS
        ====================================================== */}

        <section
          id="documents"
          className="py-24 scroll-mt-20"
        >

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">

              <div>

                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
                  03 / Documents
                </span>

                <h2 className="mt-5 font-serif text-4xl sm:text-5xl font-bold">
                  {isHi
                    ? "वार्षिक रिपोर्ट एवं दस्तावेज़"
                    : "Annual reports & documents"}
                </h2>

              </div>


              <p className="max-w-md text-sm leading-7 text-[#20221F]/55">
                {isHi
                  ? "उपलब्ध रिपोर्टों और सार्वजनिक दस्तावेज़ों तक सीधे पहुंच।"
                  : "Direct access to available reports and public documents."}
              </p>

            </div>


            <div className="bg-white rounded-3xl border border-[#20221F]/10 overflow-hidden">

              {/* TABLE HEADER */}

              <div className="hidden md:grid grid-cols-12 px-7 py-4 bg-[#20221F] text-white/50 text-[10px] font-bold uppercase tracking-wider">

                <div className="col-span-7">
                  Document
                </div>

                <div className="col-span-2">
                  Type
                </div>

                <div className="col-span-1">
                  Year
                </div>

                <div className="col-span-2 text-right">
                  Access
                </div>

              </div>


              {/* DOCUMENT ROWS */}

              {reports.map((doc, index) => (

                <div
                  key={doc.id}
                  className={`
                    px-6 sm:px-7 py-6
                    ${index !== reports.length - 1
                      ? "border-b border-[#20221F]/10"
                      : ""}
                    hover:bg-[#F6F2E9]
                    transition
                  `}
                >

                  <div className="grid md:grid-cols-12 gap-5 items-center">

                    {/* NAME */}

                    <div className="md:col-span-7 flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-[#F6F2E9] flex items-center justify-center shrink-0">

                        <FileText className="w-5 h-5 text-[#A85D43]" />

                      </div>


                      <div>

                        <p className="font-serif font-bold text-sm sm:text-base">
                          {isHi
                            ? doc.titleHi
                            : doc.titleEn}
                        </p>

                        {doc.size && (
                          <p className="mt-1 text-[10px] text-[#20221F]/35">
                            {doc.size}
                          </p>
                        )}

                      </div>

                    </div>


                    {/* TYPE */}

                    <div className="md:col-span-2">

                      <span className="text-xs text-[#20221F]/50">
                        {doc.type}
                      </span>

                    </div>


                    {/* YEAR */}

                    <div className="md:col-span-1">

                      <span className="text-xs font-semibold">
                        {doc.year || "—"}
                      </span>

                    </div>


                    {/* ACCESS */}

                    <div className="md:col-span-2 md:text-right">

                      {doc.fileUrl ? (

                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#20221F] text-white px-4 py-2.5 text-xs font-semibold hover:bg-[#A85D43] transition"
                        >

                          <Download className="w-3.5 h-3.5" />

                          {isHi
                            ? "डाउनलोड"
                            : "Download"}

                        </a>

                      ) : (

                        <Link
                          href={`/contact?subject=${encodeURIComponent(
                            `Document Request: ${doc.titleEn}`
                          )}`}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#20221F]/15 px-4 py-2.5 text-xs font-semibold hover:border-[#A85D43] hover:text-[#A85D43] transition"
                        >

                          {isHi
                            ? "अनुरोध करें"
                            : "Request"}

                          <ExternalLink className="w-3.5 h-3.5" />

                        </Link>

                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>



        {/* ======================================================
            COMPLIANCE
        ====================================================== */}

        <section
          id="compliance"
          className="py-24 bg-white border-y border-[#20221F]/10 scroll-mt-20"
        >

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="max-w-3xl">

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85D43]">
                04 / Compliance
              </span>

              <h2 className="mt-5 font-serif text-4xl sm:text-5xl font-bold">
                {isHi
                  ? "अनुपालन और शासन"
                  : "Compliance & governance"}
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#20221F]/55">
                {isHi
                  ? "संगठन की जवाबदेही केवल वित्तीय रिपोर्टिंग तक सीमित नहीं है। शासन, वैधानिक अनुपालन और दस्तावेज़ी रिकॉर्ड भी इसका हिस्सा हैं।"
                  : "Accountability extends beyond financial reporting. Governance, statutory compliance and documented records are equally important."}
              </p>

            </div>


            <div className="mt-12 grid md:grid-cols-3 gap-5">


              {[
                {
                  number: "01",
                  title: isHi
                    ? "वैधानिक रिकॉर्ड"
                    : "Statutory records",
                  text: isHi
                    ? "उपलब्ध पंजीकरण और वैधानिक दस्तावेज़ों की जानकारी।"
                    : "Information on available registrations and statutory documentation.",
                },

                {
                  number: "02",
                  title: isHi
                    ? "वित्तीय रिपोर्टिंग"
                    : "Financial reporting",
                  text: isHi
                    ? "वार्षिक और वित्तीय रिपोर्टों के माध्यम से रिकॉर्ड प्रस्तुत करना।"
                    : "Maintaining records through annual and financial reporting.",
                },

                {
                  number: "03",
                  title: isHi
                    ? "दस्तावेज़ अनुरोध"
                    : "Document access",
                  text: isHi
                    ? "ऑनलाइन उपलब्ध न होने वाले दस्तावेज़ों के लिए अनुरोध का विकल्प।"
                    : "A request option for documents that are not currently available online.",
                },

              ].map((item) => (

                <div
                  key={item.number}
                  className="rounded-3xl border border-[#20221F]/10 p-7"
                >

                  <span className="text-4xl font-serif font-bold text-[#20221F]/10">
                    {item.number}
                  </span>

                  <h3 className="mt-8 font-serif text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#20221F]/55">
                    {item.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>



        {/* ======================================================
            DOCUMENT REQUEST CTA
        ====================================================== */}

        <section className="py-20 bg-[#20221F] text-white">

          <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">

            <FileCheck2 className="w-8 h-8 mx-auto text-[#E4B95E]" />

            <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-bold">
              {isHi
                ? "क्या आपको कोई दस्तावेज़ चाहिए?"
                : "Looking for a specific document?"}
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-sm leading-7 text-white/50">
              {isHi
                ? "यदि कोई आवश्यक दस्तावेज़ यहां उपलब्ध नहीं है, तो हमारी टीम से सीधे संपर्क करें।"
                : "If a document you need is not available here, contact our team directly and we will help with your request."}
            </p>


            <Link
              href="/contact?subject=Transparency%20Document%20Request"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white text-[#20221F] px-7 py-4 text-sm font-bold hover:bg-[#E4B95E] transition"
            >

              {isHi
                ? "दस्तावेज़ का अनुरोध करें"
                : "Request a Document"}

              <ArrowRight className="w-4 h-4" />

            </Link>

          </div>

        </section>


      </main>


      <Footer lang={lang} />

    </div>
  );
}