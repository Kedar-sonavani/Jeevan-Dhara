"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Language } from "@/types";

import {
  Building2,
  ShieldCheck,
  Award,
  CheckCircle2,
  Users,
  Target,
  ArrowRight,
  Globe2,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  BookOpen,
  Wrench,
  Briefcase,
  HeartHandshake,
  Laptop,
  UserCheck,
  Star,
  BarChart3,
  CheckSquare,
  FileCheck,
  ChevronRight,
  Droplets,
  GraduationCap,
  Sprout,
  HandHeart,
} from "lucide-react";

export default function CsrPartnershipsPage() {
  const [lang, setLang] = useState<Language>("en");
  const isHi = lang === "hi";

  /* ================================================================
     VOLUNTEERING FORMATS
     ================================================================ */

  const volunteeringFormats = [
    {
      number: "01",
      title: isHi
        ? "कक्षा शिक्षण एवं युवा मार्गदर्शन"
        : "Classroom Teaching & Youth Mentoring",
      icon: BookOpen,
      badge: isHi ? "शिक्षा एवं भविष्य" : "Education & Career",
      description: isHi
        ? "कॉर्पोरेट कर्मचारी ग्रामीण स्कूलों में मूलभूत साक्षरता, गणित, डिजिटल कौशल और करियर मार्गदर्शन सत्र आयोजित करते हैं।"
        : "Corporate volunteers deliver structured learning sessions in rural partner schools, from foundational literacy and numeracy to career counselling for high-school students.",
      impact: isHi
        ? "12,000+ छात्र लाभान्वित"
        : "12,000+ Students Mentored",
    },
    {
      number: "02",
      title: isHi
        ? "स्कूल व ग्राम अवसंरचना कायाकल्प"
        : "School & Rural Infrastructure",
      icon: Wrench,
      badge: isHi ? "टीम बिल्डिंग" : "Team Building",
      description: isHi
        ? "कर्मचारी ग्रामीण कक्षाओं का नवीनीकरण, पुस्तकालय स्थापना, सौर प्रकाश व्यवस्था और जल संरक्षण संरचनाओं में योगदान देते हैं।"
        : "Teams renovate rural classrooms, establish libraries, support solar infrastructure and contribute to practical water conservation initiatives.",
      impact: isHi ? "45+ स्कूल अपग्रेड" : "45+ Schools Revitalized",
    },
    {
      number: "03",
      title: isHi
        ? "व्यावसायिक कौशल एवं वित्तीय साक्षरता"
        : "Skills & Financial Literacy",
      icon: Briefcase,
      badge: isHi ? "महिला सशक्तिकरण" : "Women & Livelihoods",
      description: isHi
        ? "कर्मचारी महिला स्वयं सहायता समूहों और युवाओं के साथ वित्तीय साक्षरता, डिजिटल भुगतान और सूक्ष्म व्यवसाय प्रबंधन का ज्ञान साझा करते हैं।"
        : "Employees share practical knowledge in financial literacy, digital payments, business management and professional skills with rural women and youth.",
      impact: isHi
        ? "3,500+ महिला उद्यमी प्रशिक्षित"
        : "3,500+ Women Artisans Trained",
    },
    {
      number: "04",
      title: isHi
        ? "दीर्घकालिक मेंटरशिप कार्यक्रम"
        : "Sustained Mentorship Programmes",
      icon: HeartHandshake,
      badge: isHi ? "दीर्घकालिक प्रभाव" : "Long-Term Impact",
      description: isHi
        ? "कर्मचारियों को 3 से 12 महीनों के लिए ग्रामीण बालिकाओं और छात्रों के साथ जोड़ा जाता है, जिससे शिक्षा और आत्मविश्वास में निरंतर सुधार हो।"
        : "Corporate employees mentor rural girls and student cohorts over 3–12 months, creating sustained educational and personal development outcomes.",
      impact: isHi
        ? "98% छात्र प्रतिधारण"
        : "98% Scholar Retention",
    },
    {
      number: "05",
      title: isHi
        ? "वर्चुअल एवं हाइब्रिड स्वयंसेवा"
        : "Virtual & Hybrid Volunteering",
      icon: Laptop,
      badge: isHi ? "डिजिटल सहभागिता" : "Digital Engagement",
      description: isHi
        ? "ऑनलाइन ट्यूटरिंग, ई-लर्निंग सामग्री, डिजिटल साक्षरता और मॉक इंटरव्यू के माध्यम से पैन-इंडिया टीमों को जोड़ा जाता है।"
        : "Distributed teams can participate through online tutoring, digital literacy sessions, e-learning content and mock interviews.",
      impact: isHi
        ? "भौगोलिक सीमाओं से परे"
        : "Zero Geographical Barriers",
    },
    {
      number: "06",
      title: isHi
        ? "नेतृत्व एवं रणनीतिक सलाह"
        : "Leadership & Strategy Advisory",
      icon: UserCheck,
      badge: isHi ? "संस्थागत सहयोग" : "Executive Engagement",
      description: isHi
        ? "वरिष्ठ अधिकारी और विशेषज्ञ गवर्नेंस, वित्त, मानव संसाधन, प्रभाव मूल्यांकन और रणनीतिक योजना में मार्गदर्शन देते हैं।"
        : "Senior leaders and specialists support governance, finance, HR, impact measurement and strategic planning.",
      impact: isHi
        ? "उच्च प्रभाव संस्थागत सहयोग"
        : "High-Impact Governance",
    },
  ];

  /* ================================================================
     WHY PARTNER
     ================================================================ */

  const rationalCases = [
    {
      id: "01",
      title: isHi
        ? "प्रत्यक्ष जमीनी क्रियान्वयन"
        : "Direct Grassroots Implementation",
      desc: isHi
        ? "बीकानेर, जोधपुर, हनुमानगढ़ और ग्रामीण राजस्थान के 120+ गांवों में प्रत्यक्ष उपस्थिति और स्थानीय टीमों के साथ कार्यान्वयन।"
        : "Direct operational footprint across 120+ villages in Bikaner, Jodhpur and Northwest Rajasthan with local implementation teams.",
      highlight: isHi ? "120+ गांव" : "120+ Villages",
    },
    {
      id: "02",
      title: isHi
        ? "समर्पित स्वयंसेवक नेटवर्क"
        : "Dedicated Grassroots Volunteer Network",
      desc: isHi
        ? "15,000+ प्रशिक्षित स्वयंसेवक और महिला स्वयं सहायता समूह हमारे कार्यक्रमों को स्थानीय शक्ति और निरंतरता प्रदान करते हैं।"
        : "Over 15,000 trained volunteers and grassroots women SHG leaders provide local capacity and continuity.",
      highlight: isHi ? "15,000+ स्वयंसेवक" : "15,000+ Volunteers",
    },
    {
      id: "03",
      title: isHi
        ? "सिद्ध कॉर्पोरेट सहभागिता मॉडल"
        : "Proven Corporate Engagement Model",
      desc: isHi
        ? "14+ वर्षों में विकसित कर्मचारी स्वयंसेवा मॉडल, जिसमें ऑन-ground logistics, safety और meaningful participation शामिल है।"
        : "A corporate engagement model developed over 14+ years, covering logistics, safety and meaningful employee participation.",
      highlight: isHi ? "14+ वर्षों का अनुभव" : "14+ Years Experience",
    },
    {
      id: "04",
      title: isHi
        ? "समग्र ग्रामीण विकास"
        : "Integrated Rural Development",
      desc: isHi
        ? "स्वच्छ पेयजल, महिला आजीविका, डिजिटल शिक्षा और सामुदायिक सशक्तिकरण को एक साथ जोड़कर दीर्घकालिक बदलाव पर ध्यान।"
        : "Our programmes connect clean water, women's livelihoods, digital education and community empowerment for longer-term outcomes.",
      highlight: isHi ? "समग्र दृष्टिकोण" : "Holistic Approach",
    },
    {
      id: "05",
      title: isHi
        ? "पारदर्शी प्रभाव मापन"
        : "Transparent Impact Measurement",
      desc: isHi
        ? "स्पष्ट KPI, प्रगति रिपोर्ट, फोटो दस्तावेज़ीकरण, ऑडिट और वार्षिक प्रभाव रिपोर्ट के माध्यम से पारदर्शिता।"
        : "Clear KPIs, progress reporting, project documentation, audits and annual impact reporting support transparent partnerships.",
      highlight: isHi ? "ऑडिट एवं रिपोर्टिंग" : "Audit & Reporting",
    },
  ];

  /* ================================================================
     PROGRAMMES
     ================================================================ */

  const programmes = [
    {
      icon: GraduationCap,
      title: isHi ? "ग्रामीण शिक्षा" : "Rural Education",
      description: isHi
        ? "ग्रामीण बच्चों और युवाओं को सीखने, डिजिटल कौशल और करियर मार्गदर्शन के अवसर।"
        : "Learning, digital skills and career opportunities for children and young people in rural communities.",
    },
    {
      icon: HandHeart,
      title: isHi ? "महिला सशक्तिकरण" : "Women Empowerment",
      description: isHi
        ? "महिलाओं के लिए कौशल, आजीविका और वित्तीय स्वतंत्रता के अवसर।"
        : "Skills, livelihood and financial independence opportunities for rural women.",
    },
    {
      icon: Droplets,
      title: isHi ? "स्वच्छ जल" : "Clean Water",
      description: isHi
        ? "जल संरक्षण और ग्रामीण परिवारों के लिए सुरक्षित पेयजल समाधान।"
        : "Water conservation and safe drinking-water solutions for rural communities.",
    },
    {
      icon: Laptop,
      title: isHi ? "डिजिटल सशक्तिकरण" : "Digital Empowerment",
      description: isHi
        ? "ग्रामीण युवाओं और समुदायों को डिजिटल दुनिया से जोड़ने की पहल।"
        : "Initiatives that connect rural youth and communities with digital opportunities.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream text-dark">

      {/* ================================================================
          GLOBAL HEADER
          ================================================================ */}

      <Header
        lang={lang}
        onLanguageChange={setLang}
      />

      <main className="flex-1">

        {/* ================================================================
            1. HERO
            ================================================================ */}

        <section className="relative bg-cream overflow-hidden">

          {/* Decorative organic shapes */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-sage-200/40 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:pt-16 lg:pb-28 relative">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* HERO COPY */}

              <div className="lg:col-span-6 relative z-10">

                <div className="flex items-center gap-3 mb-7">
                  <span className="w-10 h-px bg-terracotta" />

                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
                    {isHi
                      ? "सीएसआर एवं सामाजिक साझेदारी"
                      : "CSR & Social Partnerships"}
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-[4.8rem] font-serif font-bold text-dark leading-[0.98] tracking-tight">
                  {isHi ? (
                    <>
                      बदलाव सिर्फ
                      <br />
                      <span className="text-terracotta">
                        निवेश से नहीं,
                      </span>
                      <br />
                      साझेदारी से आता है।
                    </>
                  ) : (
                    <>
                      Real change
                      <br />
                      begins with
                      <br />
                      <span className="text-terracotta">
                        partnership.
                      </span>
                    </>
                  )}
                </h1>

                <p className="mt-8 max-w-xl text-base sm:text-lg text-dark/70 leading-relaxed">
                  {isHi
                    ? "जीवन धारा संस्थान ग्रामीण राजस्थान में महिलाओं, बच्चों और समुदायों के साथ मिलकर शिक्षा, आजीविका, स्वच्छ जल और डिजिटल सशक्तिकरण के माध्यम से स्थायी बदलाव का निर्माण करता है।"
                    : "Jeevan Dhara Sansthan works alongside rural communities across Rajasthan to create lasting change through education, livelihoods, clean water and digital empowerment."}
                </p>

                <div className="flex flex-wrap gap-3 mt-9">

                  <a
                    href="#contact-section"
                    className="inline-flex items-center gap-3 px-7 py-4 bg-dark text-white rounded-full text-sm font-semibold hover:bg-terracotta transition-all duration-300"
                  >
                    {isHi
                      ? "साझेदारी पर बात करें"
                      : "Start a Partnership"}

                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#impact"
                    className="inline-flex items-center gap-3 px-7 py-4 border border-dark/20 text-dark rounded-full text-sm font-semibold hover:border-terracotta hover:text-terracotta transition-all duration-300"
                  >
                    {isHi
                      ? "हमारा प्रभाव देखें"
                      : "Explore Our Impact"}
                  </a>

                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-dark/55">

                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sage-700" />
                    {isHi
                      ? "पारदर्शी एवं ऑडिटेड"
                      : "Transparent & Audited"}
                  </span>

                  <span className="w-1 h-1 rounded-full bg-dark/20" />

                  <span>
                    {isHi
                      ? "14+ वर्षों का जमीनी अनुभव"
                      : "14+ years of grassroots work"}
                  </span>

                </div>

              </div>


              {/* HERO IMAGE */}

              <div className="lg:col-span-6 relative">

                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-amber-200/60" />

                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-sage-200/70" />

                <div className="relative">

                  <div className="relative h-[470px] sm:h-[560px] lg:h-[620px] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.15)]">

                    <Image
                      src="/images/csr.jpeg"
                      alt="Jeevan Dhara community and CSR work"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">

                      <p className="text-white text-xl sm:text-2xl font-serif font-semibold leading-snug max-w-md">
                        {isHi
                          ? "जमीनी स्तर पर शुरू होने वाला बदलाव"
                          : "Change that starts at the grassroots."}
                      </p>

                      <p className="mt-2 text-sm text-white/75">
                        {isHi
                          ? "समुदायों के साथ, समुदायों के लिए।"
                          : "With communities, not just for communities."}
                      </p>

                    </div>

                  </div>


                  {/* IMPACT FLOATING CARD */}

                  <div className="absolute -bottom-7 -left-5 sm:-left-8 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.13)] border border-dark/5 p-5 sm:p-6 w-[235px]">

                    <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-dark/45">
                      {isHi ? "प्रत्यक्ष पहुंच" : "Direct Reach"}
                    </p>

                    <div className="flex items-end gap-2 mt-1">

                      <span className="text-4xl font-serif font-bold text-terracotta">
                        120+
                      </span>

                      <span className="text-xs text-dark/60 mb-1.5">
                        {isHi ? "गांव" : "villages"}
                      </span>

                    </div>

                    <div className="w-full h-px bg-dark/10 my-3" />

                    <p className="text-xs text-dark/60 leading-relaxed">
                      {isHi
                        ? "राजस्थान में प्रत्यक्ष सामुदायिक कार्य"
                        : "Direct community implementation across Rajasthan"}
                    </p>

                  </div>


                  {/* CERTIFICATION */}



                </div>

              </div>

            </div>


            {/* HERO IMPACT STRIP */}

            <div
              id="impact"
              className="grid grid-cols-2 md:grid-cols-4 mt-20 pt-8 border-t border-dark/10"
            >

              {[
                {
                  value: "50,000+",
                  label: isHi
                    ? "जीवन प्रभावित"
                    : "Lives Impacted",
                },
                {
                  value: "120+",
                  label: isHi
                    ? "गांवों तक पहुंच"
                    : "Villages Reached",
                },
                {
                  value: "15,000+",
                  label: isHi
                    ? "स्वयंसेवक जुड़े"
                    : "Volunteers Engaged",
                },
                {
                  value: "14+",
                  label: isHi
                    ? "वर्षों का अनुभव"
                    : "Years of Experience",
                },
              ].map((stat, index) => (

                <div
                  key={index}
                  className="py-5 pr-5 border-r border-dark/10 last:border-r-0 first:pl-0 pl-5"
                >

                  <p className="text-3xl sm:text-4xl font-serif font-bold text-dark">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-dark/50">
                    {stat.label}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ================================================================
            2. FROM INTENTION TO IMPACT
            ================================================================ */}

        <section className="py-24 bg-white border-y border-dark/10">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">

              <div className="lg:col-span-7">

                <div className="flex items-center gap-3 mb-5">

                  <span className="w-8 h-px bg-terracotta" />

                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-terracotta">
                    {isHi
                      ? "हम कैसे काम करते हैं"
                      : "How We Work"}
                  </span>

                </div>

                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-dark leading-tight">
                  {isHi
                    ? "CSR को केवल खर्च नहीं, स्थायी बदलाव में बदलना।"
                    : "Turning CSR intent into lasting community impact."}
                </h2>

              </div>

              <p className="lg:col-span-5 text-dark/65 leading-relaxed">
                {isHi
                  ? "हम कंपनियों के साथ मिलकर ऐसे कार्यक्रम बनाते हैं जो समुदाय की वास्तविक जरूरतों से शुरू होते हैं और स्पष्ट परिणामों तक पहुंचते हैं।"
                  : "We work with companies to design programmes that begin with real community needs and end with measurable, lasting outcomes."}
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 border border-dark/10 rounded-3xl overflow-hidden">

              {[
                {
                  number: "01",
                  title: isHi ? "समझना" : "Understand",
                  text: isHi
                    ? "स्थानीय समुदायों की वास्तविक जरूरतों, चुनौतियों और आकांक्षाओं को समझना।"
                    : "We begin by understanding the needs, challenges and aspirations of local communities.",
                },
                {
                  number: "02",
                  title: isHi ? "साझेदारी करना" : "Partner",
                  text: isHi
                    ? "कॉर्पोरेट टीमों, स्थानीय संस्थाओं और समुदायों को एक साझा उद्देश्य के लिए जोड़ना।"
                    : "We bring corporate teams, local institutions and communities together around a shared purpose.",
                },
                {
                  number: "03",
                  title: isHi ? "प्रभाव मापना" : "Measure",
                  text: isHi
                    ? "कार्यक्रमों के परिणामों को पारदर्शी तरीके से मापना और रिपोर्ट करना।"
                    : "We measure outcomes transparently and report the impact created through every engagement.",
                },
              ].map((item, index) => (

                <div
                  key={index}
                  className="p-8 sm:p-10 border-b md:border-b-0 md:border-r last:border-0 border-dark/10 hover:bg-cream/50 transition-colors"
                >

                  <span className="text-sm font-mono text-terracotta">
                    {item.number}
                  </span>

                  <h3 className="mt-8 text-2xl font-serif font-bold text-dark">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm text-dark/65 leading-relaxed">
                    {item.text}
                  </p>

                  <div className="mt-8 w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-terracotta" />
                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ================================================================
            3. ABOUT JEEVAN DHARA
            ================================================================ */}

        <section className="py-24 bg-cream">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

              {/* IMAGE */}

              <div className="relative">

                <div className="relative h-[500px] rounded-[2rem] overflow-hidden">

                  <Image
                    src="/images/child.jpeg"
                    alt="Jeevan Dhara community work"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />

                </div>

                <div className="absolute -bottom-6 -right-5 sm:-right-8 bg-dark text-white p-6 rounded-2xl max-w-[260px] shadow-xl">

                  <p className="text-3xl font-serif font-bold text-amber-300">
                    14+
                  </p>

                  <p className="text-xs text-white/65 uppercase tracking-wider mt-1">
                    {isHi
                      ? "वर्षों का जमीनी अनुभव"
                      : "Years of grassroots work"}
                  </p>

                </div>

              </div>


              {/* CONTENT */}

              <div>

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-terracotta">
                  {isHi
                    ? "जीवन धारा के बारे में"
                    : "About Jeevan Dhara"}
                </span>

                <h2 className="mt-5 text-4xl sm:text-5xl font-serif font-bold text-dark leading-tight">
                  {isHi
                    ? "समुदायों के साथ बदलाव की शुरुआत।"
                    : "Change begins by working alongside communities."}
                </h2>

                <p className="mt-7 text-base text-dark/70 leading-relaxed">
                  {isHi
                    ? "जीवन धारा संस्थान ग्रामीण राजस्थान में महिलाओं, बच्चों और युवाओं के साथ मिलकर शिक्षा, आजीविका, स्वच्छ जल और डिजिटल सशक्तिकरण के क्षेत्रों में काम करता है।"
                    : "Jeevan Dhara Sansthan works alongside women, children and young people across rural Rajasthan through education, livelihoods, clean water and digital empowerment."}
                </p>

                <p className="mt-5 text-base text-dark/65 leading-relaxed">
                  {isHi
                    ? "हमारा उद्देश्य केवल एक परियोजना पूरी करना नहीं है। हम ऐसे स्थानीय समाधान बनाना चाहते हैं जो समुदायों के साथ लंबे समय तक टिके रहें।"
                    : "Our goal is not simply to complete a project. We build local solutions designed to remain useful long after a project cycle ends."}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">

                  {[
                    isHi ? "शिक्षा" : "Education",
                    isHi ? "महिला सशक्तिकरण" : "Women Empowerment",
                    isHi ? "स्वच्छ जल" : "Clean Water",
                    isHi ? "डिजिटल समावेशन" : "Digital Inclusion",
                  ].map((item) => (

                    <span
                      key={item}
                      className="px-4 py-2 rounded-full border border-dark/15 text-xs font-semibold text-dark/70"
                    >
                      {item}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================================================================
            4. OUR PROGRAMMES
            ================================================================ */}

        <section className="py-24 bg-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-3xl mb-14">

              <div className="flex items-center gap-3 mb-5">

                <span className="w-8 h-px bg-terracotta" />

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-terracotta">
                  {isHi
                    ? "हमारा कार्य"
                    : "Our Areas of Work"}
                </span>

              </div>

              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-dark">
                {isHi
                  ? "जहाँ साझेदारी वास्तविक जीवन बदलती है।"
                  : "Where partnerships create real change."}
              </h2>

              <p className="mt-5 text-dark/65 leading-relaxed">
                {isHi
                  ? "हमारी पहलें ग्रामीण समुदायों की प्राथमिक जरूरतों पर केंद्रित हैं।"
                  : "Our programmes focus on practical needs identified by rural communities."}
              </p>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {programmes.map((program, index) => {

                const Icon = program.icon;

                return (
                  <div
                    key={index}
                    className="group p-7 rounded-3xl border border-dark/10 hover:border-terracotta/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                  >

                    <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="mt-7 text-xl font-serif font-bold text-dark">
                      {program.title}
                    </h3>

                    <p className="mt-3 text-sm text-dark/65 leading-relaxed">
                      {program.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-terracotta">
                      {isHi ? "और जानें" : "Learn more"}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>

                  </div>
                );

              })}

            </div>

          </div>

        </section>


        {/* ================================================================
            5. VOLUNTEERING
            ================================================================ */}

        <section className="py-24 bg-cream border-y border-dark/10">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-3xl mb-14">

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-terracotta">
                {isHi
                  ? "कॉर्पोरेट स्वयंसेवा"
                  : "Employee Volunteering"}
              </span>

              <h2 className="mt-5 text-4xl sm:text-5xl font-serif font-bold text-dark leading-tight">
                {isHi
                  ? "आपकी टीम भी बदलाव का हिस्सा बन सकती है।"
                  : "Give your people a meaningful way to make a difference."}
              </h2>

              <p className="mt-5 text-base text-dark/65 leading-relaxed">
                {isHi
                  ? "हम कॉर्पोरेट कर्मचारियों के लिए ऐसे अनुभव डिजाइन करते हैं जो समुदायों के लिए उपयोगी और कर्मचारियों के लिए वास्तव में यादगार हों।"
                  : "We design employee experiences that are genuinely useful to communities and genuinely meaningful for the people who participate."}
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {volunteeringFormats.map((format) => {

                const Icon = format.icon;

                return (

                  <div
                    key={format.number}
                    className="group bg-white border border-dark/10 rounded-3xl p-7 flex flex-col justify-between min-h-[360px] hover:-translate-y-1 hover:shadow-xl hover:border-terracotta/30 transition-all duration-300"
                  >

                    <div>

                      <div className="flex items-center justify-between">

                        <span className="text-4xl font-serif font-bold text-dark/10 group-hover:text-terracotta/30 transition-colors">
                          {format.number}
                        </span>

                        <span className="text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full bg-cream text-dark/60">
                          {format.badge}
                        </span>

                      </div>


                      <div className="mt-8 w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-colors">

                        <Icon className="w-6 h-6" />

                      </div>


                      <h3 className="mt-6 text-xl font-serif font-bold text-dark">
                        {format.title}
                      </h3>

                      <p className="mt-3 text-sm text-dark/65 leading-relaxed">
                        {format.description}
                      </p>

                    </div>


                    <div className="mt-7 pt-5 border-t border-dark/10">

                      <span className="flex items-center gap-2 text-xs font-semibold text-sage-800">

                        <CheckCircle2 className="w-4 h-4" />

                        {format.impact}

                      </span>

                    </div>

                  </div>

                );

              })}

            </div>


            {/* VOLUNTEERING CTA */}

            <div className="mt-14 bg-dark rounded-[2rem] p-8 sm:p-12 text-white relative overflow-hidden">

              <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-terracotta/20 blur-3xl" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                <div className="max-w-2xl">

                  <p className="text-xs uppercase tracking-[0.15em] text-amber-300 font-bold">
                    {isHi
                      ? "कस्टम कार्यक्रम"
                      : "Custom Engagement"}
                  </p>

                  <h3 className="mt-3 text-3xl sm:text-4xl font-serif font-bold">
                    {isHi
                      ? "आपकी टीम के लिए सही प्रारूप तैयार करें।"
                      : "Build the right experience for your team."}
                  </h3>

                  <p className="mt-4 text-sm text-white/65 leading-relaxed">
                    {isHi
                      ? "हाफ-डे इवेंट्स, फुल-डे रूरल इमर्शन, मेंटरशिप, डिजिटल वॉलंटियरिंग या कस्टम अभियान।"
                      : "Half-day events, full-day rural immersions, mentorship, digital volunteering or custom campaigns."}
                  </p>

                </div>


                <a
                  href="#contact-section"
                  className="shrink-0 inline-flex items-center justify-center gap-3 px-7 py-4 bg-white text-dark rounded-full text-sm font-bold hover:bg-amber-300 transition-colors"
                >
                  {isHi
                    ? "कार्यक्रम पर चर्चा करें"
                    : "Discuss a Programme"}

                  <ArrowRight className="w-4 h-4" />
                </a>

              </div>

            </div>

          </div>

        </section>


        {/* ================================================================
            6. WHY PARTNER
            ================================================================ */}

        <section className="py-24 bg-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-3xl mb-14">

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-terracotta">
                {isHi
                  ? "साझेदारी क्यों"
                  : "Why Partner With Us"}
              </span>

              <h2 className="mt-5 text-4xl sm:text-5xl font-serif font-bold text-dark">
                {isHi
                  ? "सिर्फ फंडिंग नहीं। एक विश्वसनीय साझेदारी।"
                  : "More than funding. A partnership built on trust."}
              </h2>

              <p className="mt-5 text-dark/65 leading-relaxed">
                {isHi
                  ? "CSR साझेदारी में सही कार्यान्वयन, पारदर्शिता और समुदाय के साथ वास्तविक जुड़ाव महत्वपूर्ण हैं।"
                  : "The right CSR partnership requires strong implementation, transparency and genuine connection with communities."}
              </p>

            </div>


            <div className="space-y-4">

              {rationalCases.map((item) => (

                <div
                  key={item.id}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-7 sm:p-8 rounded-3xl border border-dark/10 hover:border-terracotta/30 hover:shadow-lg transition-all duration-300"
                >

                  <div className="lg:col-span-1">

                    <span className="text-3xl font-serif font-bold text-dark/15 group-hover:text-terracotta/40 transition-colors">
                      {item.id}
                    </span>

                  </div>


                  <div className="lg:col-span-8">

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-dark group-hover:text-terracotta transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-dark/65 leading-relaxed">
                      {item.desc}
                    </p>

                  </div>


                  <div className="lg:col-span-3 lg:text-right">

                    <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cream text-dark/70 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-sage-700" />
                      {item.highlight}
                    </span>

                  </div>

                </div>

              ))}

            </div>


            {/* REPORTING */}

            <div className="mt-14 bg-sage-50 border border-sage-200 rounded-[2rem] p-8 sm:p-10">

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                <div className="flex gap-5">

                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-white flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-sage-800" />
                  </div>

                  <div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-dark">
                      {isHi
                        ? "पारदर्शी प्रभाव रिपोर्टिंग"
                        : "Transparent Impact Reporting"}
                    </h3>

                    <p className="mt-2 text-sm text-dark/65 max-w-2xl leading-relaxed">
                      {isHi
                        ? "प्रत्येक साझेदारी के लिए स्पष्ट परिणाम, प्रगति रिपोर्ट, दस्तावेज़ीकरण और वार्षिक प्रभाव रिपोर्ट उपलब्ध कराई जाती है।"
                        : "Every partnership can include clear outcomes, progress updates, project documentation and annual impact reporting."}
                    </p>

                  </div>

                </div>


                <Link
                  href="/transparency"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-dark text-white rounded-full text-xs font-bold hover:bg-terracotta transition-colors"
                >
                  {isHi
                    ? "रिपोर्ट देखें"
                    : "View Reports"}

                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* ================================================================
            7. CONTACT
            ================================================================ */}

        <section
          id="contact-section"
          className="py-24 bg-cream border-t border-dark/10 scroll-mt-20"
        >

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-14">

              <div>

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-terracotta">
                  {isHi
                    ? "संपर्क करें"
                    : "Let's Work Together"}
                </span>

                <h2 className="mt-5 text-4xl sm:text-5xl font-serif font-bold text-dark leading-tight">
                  {isHi
                    ? "आपकी CSR प्राथमिकता क्या है?"
                    : "What would you like your CSR partnership to achieve?"}
                </h2>

              </div>

              <p className="text-dark/65 leading-relaxed">
                {isHi
                  ? "हमारी टीम से सीधे संपर्क करें। हम आपके उद्देश्य, बजट और समयसीमा के अनुसार संभावित कार्यक्रमों पर चर्चा करेंगे।"
                  : "Talk directly with our team about your goals, budget and timeline. We can explore the right programme or volunteering format for your organisation."}
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* EMAIL */}

              <div className="bg-white rounded-3xl p-7 border border-dark/10 flex flex-col justify-between">

                <div className="flex-1">

                  <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-serif font-bold">
                    {isHi
                      ? "CSR साझेदारी डेस्क"
                      : "CSR Partnership Desk"}
                  </h3>

                  <p className="mt-2 text-xs text-dark/50">
                    {isHi
                      ? "प्रस्ताव, बजट एवं साझेदारी"
                      : "Proposals, budgets & partnerships"}
                  </p>

                  <a
                    href="mailto:jeevandhara370@gmail.com"
                    className="block mt-5 text-sm font-semibold text-terracotta hover:underline"
                  >
                    jeevandhara370@gmail.com
                  </a>

                  <a
                    href="tel:+917742221668"
                    className="block mt-2 text-sm font-semibold text-dark/70"
                  >
                    +91 77422 21668
                  </a>

                </div>

                <a
                  href="mailto:jeevandhara370@gmail.com?subject=CSR%20Partnership%20Inquiry"
                  className="mt-7 block text-center py-3 bg-dark text-white rounded-full text-xs font-bold hover:bg-terracotta transition-colors"
                >
                  {isHi ? "ईमेल भेजें" : "Send Email"}
                </a>

              </div>


              {/* WHATSAPP */}

              <div className="bg-white rounded-3xl p-7 border border-dark/10 flex flex-col justify-between">

                <div className="flex-1">

                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-serif font-bold">
                    {isHi
                      ? "व्हाट्सएप पर बात करें"
                      : "Talk on WhatsApp"}
                  </h3>

                  <p className="mt-2 text-xs text-dark/50">
                    {isHi
                      ? "त्वरित परियोजना चर्चा"
                      : "Quick project discussion"}
                  </p>

                  <p className="mt-5 text-sm text-dark/65 leading-relaxed">
                    {isHi
                      ? "अपने CSR लक्ष्य या कर्मचारी स्वयंसेवा योजना के बारे में सीधे हमारी टीम से बात करें।"
                      : "Discuss your CSR goals or employee volunteering plans directly with our team."}
                  </p>

                </div>

                <a
                  href="https://wa.me/917742221668?text=Hello%20Jeevan%20Dhara%20Sansthan,%20We%20are%20exploring%20a%20CSR%20collaboration."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-full text-xs font-bold hover:bg-green-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  {isHi
                    ? "व्हाट्सएप चैट"
                    : "Start WhatsApp Chat"}
                </a>

              </div>


              {/* LOCATION */}

              <div className="bg-white rounded-3xl p-7 border border-dark/10 flex flex-col justify-between">

                <div className="flex-1">

                  <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-serif font-bold">
                    {isHi
                      ? "हमारे कार्यालय"
                      : "Our Offices"}
                  </h3>

                  <p className="mt-2 text-xs text-dark/50">
                    {isHi
                      ? "राजस्थान में जमीनी उपस्थिति"
                      : "Field presence across Rajasthan"}
                  </p>

                  <div className="mt-5 text-xs text-dark/65 leading-relaxed space-y-4">

                    <div>
                      <strong className="block text-dark">
                        Head & Registered Office
                      </strong>

                      Kolasar Mandi, Tehsil Sri Dungargarh,
                      Bikaner, Rajasthan — 334001
                    </div>

                    <div>
                      <strong className="block text-dark">
                        Hanumangarh Branch
                      </strong>

                      Ward No. 12, Rawatsar Road,
                      Hanumangarh Town, Rajasthan — 335513
                    </div>

                  </div>

                </div>

                <Link
                  href="/contact"
                  className="mt-7 block text-center py-3 bg-dark text-white rounded-full text-xs font-bold hover:bg-terracotta transition-colors"
                >
                  {isHi
                    ? "सभी संपर्क विवरण"
                    : "View Contact Details"}
                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* ================================================================
            8. STATUTORY CREDENTIALS
            ================================================================ */}

        <section className="bg-dark text-white py-20">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-7 pb-8 border-b border-white/10">

              <div>

                <div className="flex items-center gap-3">

                  <FileCheck className="w-6 h-6 text-amber-300" />

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                    {isHi
                      ? "वैधानिक एवं संस्थागत जानकारी"
                      : "Statutory & Institutional Credentials"}
                  </h2>

                </div>

                <p className="mt-3 text-sm text-white/55 max-w-2xl">
                  {isHi
                    ? "कॉर्पोरेट due diligence और पारदर्शी साझेदारी के लिए आवश्यक पंजीकरण विवरण।"
                    : "Registration information supporting corporate due diligence and transparent partnerships."}
                </p>

              </div>


              <Link
                href="/transparency"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 rounded-full text-xs font-bold text-amber-300 hover:bg-white/10 transition-colors"
              >
                {isHi
                  ? "ऑडिट रिपोर्ट देखें"
                  : "View Audited Reports"}

                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

              {[
                {
                  label: "MCA CSR Registration",
                  value: "CSR00034821",
                },
                {
                  label: "NGO Registration No.",
                  value: "58/1-8-2012",
                },
                {
                  label: "Income Tax Exemption",
                  value: "12AA & 80G(5)",
                },
                {
                  label: "NITI Aayog Darpan",
                  value: "RJ/2018/0187422",
                },
              ].map((item) => (

                <div
                  key={item.label}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
                >

                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/40">
                    {item.label}
                  </span>

                  <p className="mt-3 text-lg font-mono font-bold text-amber-300">
                    {item.value}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

      </main>


      <Footer
        lang={lang}
      />

    </div>
  );
}