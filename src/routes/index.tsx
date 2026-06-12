import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Flame,
  MapPin,
  Menu as MenuIcon,
  X,
  Instagram,
  Facebook,
  Phone,
  Clock,
  Navigation,
  ArrowRight,
  Star,
} from "lucide-react";
import heroImage from "@/assets/hero.png";
import logoImage from "@/assets/logo.png";
import menuChicken from "@/assets/menu-chicken.jpg";
import menuBeef from "@/assets/menu-beef.jpg";

import special1 from "@/assets/special1.png";
import special2 from "@/assets/special2.png";
import special3 from "@/assets/special3.png";
import g1 from "@/assets/photos/g1.png";
import g2 from "@/assets/photos/g2.png";
import g3 from "@/assets/photos/g3.png";
import g4 from "@/assets/photos/g4.png";
import g5 from "@/assets/photos/g5.webp";
import g6 from "@/assets/photos/g6.webp";
import g7 from "@/assets/photos/g7.webp";
import g8 from "@/assets/photos/g8.webp";
import flavorExplosionsImg from "@/assets/flavor-explosions.png";
import burgerIcon from "@/assets/burger.png";
import fireIcon from "@/assets/fire.png";
import starIcon from "@/assets/star.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Torpedo — Flavor Explosions Daily" },
      {
        name: "description",
        content:
          "Bold burgers, loaded fries, and special blends. One bite and you know. Torpedo — Sri Lanka's flavor explosion.",
      },
      { property: "og:title", content: "Torpedo — Flavor Explosions Daily" },
      {
        property: "og:description",
        content: "Bold burgers, loaded fries, and special blends. One bite and you know.",
      },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const NAV_ITEMS = [
  { label: "Home", href: "#home", to: undefined },
  { label: "Menu", href: undefined, to: "/menu" as const },
  { label: "Special Offers", href: "#blends", to: undefined },
  { label: "Gallery", href: "#gallery", to: undefined },
  { label: "Locations", href: "#contact", to: undefined },
];

function Landing() {
  return (
    <div id="home" className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      {/* <SignatureMenu /> */}
      {/* <FireItUp /> */}
      <SpecialBlends />
      {/* <AboutTimeline /> */}
      <SocialWall />
      <LocationSection />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark py-3" : "py-5 bg-linear-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10 flex items-center justify-between gap-6">
        <a href="#home" className="shrink-0">
          <img
            src={logoImage}
            alt="Torpedo"
            className="h-10 md:h-12 w-auto object-contain"
            decoding="async"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_ITEMS.slice(1).map((n) => {
            if (n.to) {
              return (
                <Link
                  key={n.label}
                  to={n.to}
                  className="text-sm font-bold tracking-widest uppercase text-white hover:text-[#ff3b14] transition relative group"
                >
                  {n.label}
                </Link>
              );
            }
            return (
              <a
                key={n.label}
                href={n.href!}
                className="text-sm font-bold tracking-widest uppercase text-white hover:text-[#ff3b14] transition relative group"
              >
                {n.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            className="hidden sm:inline-flex items-center gap-2 rounded-md border border-[#ff3b14] px-6 py-2.5 text-sm font-bold tracking-[0.05em] uppercase text-white hover:bg-[#ff3b14] transition-all"
          >
            Order Now <Flame className="w-4 h-4 text-[#ff3b14]" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-full glass-dark"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mt-3 mx-5 rounded-2xl glass-dark p-5 flex flex-col gap-3"
        >
          {NAV_ITEMS.map((n) => {
            if (n.to) {
              return (
                <Link
                  key={n.label}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold tracking-[0.18em] uppercase text-white/90 py-2 border-b border-white/5"
                >
                  {n.label}
                </Link>
              );
            }
            return (
              <a
                key={n.label}
                href={n.href!}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold tracking-[0.18em] uppercase text-white/90 py-2 border-b border-white/5"
              >
                {n.label}
              </a>
            );
          })}
        </motion.div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[88%_center] sm:object-[84%_center] md:object-[76%_center] lg:object-[82%_center]"
          decoding="async"
        />
      </motion.div>

      {/* content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex-1 flex items-center pt-24 pb-12 px-5 lg:px-10"
      >
        <div className="mx-auto max-w-7xl w-full grid lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <h1 className="font-display text-white leading-[0.88] tracking-normal uppercase">
              <span className="block whitespace-nowrap text-[clamp(3rem,16vw,10rem)]">
                ONE BITE
              </span>
              <span className="block whitespace-nowrap text-[clamp(2rem,10vw,6rem)]">
                AND <span className="text-[#ff3b14]">YOU KNOW</span>
              </span>
            </h1>

            <div className="mt-6 flex flex-col items-start gap-5">
              <img
                src={flavorExplosionsImg}
                alt="Flavor Explosions Daily"
                className="h-14 sm:h-18 lg:h-25 w-auto object-contain"
              />

              <div className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base font-semibold tracking-normal uppercase text-white">
                <span>Burgers</span>
                <span className="w-[5px] h-[5px] rounded-full bg-[#ff3b14] shrink-0" />
                <span>Fries</span>
                <span className="w-[5px] h-[5px] rounded-full bg-[#ff3b14] shrink-0" />
                <span>Shakes</span>
                <span className="w-[5px] h-[5px] rounded-full bg-[#ff3b14] shrink-0" />
                <span>Kaboom</span>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 sm:gap-2.5 bg-[#ff3b14] hover:bg-[#ff5a2a] text-white px-5 py-2 sm:px-8 sm:py-3.5 rounded-md font-semibold tracking-wider text-xs sm:text-sm uppercase transition-all shadow-[0_0_20px_rgba(255,59,20,0.3)]"
              >
                <Flame className="w-3 h-3 sm:w-4 sm:h-4 fill-current" /> VIEW MENU
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 sm:gap-2.5 bg-black border border-white/30 hover:border-white text-white px-5 py-2 sm:px-8 sm:py-3.5 rounded-md font-semibold tracking-widest text-xs sm:text-sm uppercase transition-all"
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> FIND US
              </a>
            </div>
          </motion.div>
          <div className="hidden lg:block" /> {/* space for the background burger */}
        </div>
      </motion.div>

      {/* feature strip overlay */}
      <div className="relative z-10 w-full">
        <FeatureBar />
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: fireIcon, title: "Fire It Up", desc: "Choose your heat" },
  { icon: burgerIcon, title: "Massive Portions", desc: "Made to satisfy" },
  { icon: starIcon, title: "Flavor Explosions", desc: "Bold. Smoky. Loaded." },
  { icon: burgerIcon, title: "Special Blends", desc: "Shakes that hit different" },
];

function FeatureBar() {
  return (
    <div className="glass-dark border-y border-white/5">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 grid grid-cols-2 sm:grid-cols-4 [&>*]:border-r [&>*]:border-white/5 [&>*:nth-child(2)]:border-r-0 sm:[&>*:nth-child(2)]:border-r [&>*:nth-child(3)]:border-t sm:[&>*:nth-child(3)]:border-t-0 [&>*:nth-child(4)]:border-t [&>*:nth-child(4)]:border-r-0 sm:[&>*:nth-child(4)]:border-t-0 sm:[&>*:nth-child(4)]:border-r-0 [&>*:last-child]:border-r-0">
        {FEATURES.map((f, i) => (
          <div key={i} className="flex items-center gap-3 py-5 px-4 sm:px-5 md:px-8">
            <img
              src={f.icon}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain shrink-0"
            />
            <div>
              <div className="uppercase tracking-[0.08em] text-[11px] sm:text-xs md:text-[13px] text-white leading-tight">
                {f.title}
              </div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/40 mt-0.5 hidden sm:block">
                {f.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureStrip() {
  return <div className="h-4 bg-black" />;
}

/* ---------------- SIGNATURE MENU ---------------- */
const MENU = [
  {
    name: "Chicken Torpedo",
    desc: "Crispy chicken, melted cheddar, signature smoky sauce.",
    price: "LKR 1,490",
    img: menuChicken,
    tag: "Bestseller",
  },
  {
    name: "Torpedo Royale",
    desc: "Double stack. Triple cheese. Caramelized onions.",
    price: "LKR 1,990",
    img: menuBeef,
    tag: "New",
  },
  {
    name: "Beef Torpedo",
    desc: "Slow-smoked beef, gooey cheese, toasted brioche.",
    price: "LKR 1,790",
    img: menuBeef,
  },
  {
    name: "Chicken Burger",
    desc: "Buttermilk fried chicken, slaw, hot honey drizzle.",
    price: "LKR 1,190",
    img: menuChicken,
  },
  {
    name: "Beef Burger",
    desc: "Smashed Angus patty, American cheese, pickles.",
    price: "LKR 1,390",
    img: menuBeef,
  },
  {
    name: "Burger Royale",
    desc: "Quad-stack chaos. Built for the brave.",
    price: "LKR 2,290",
    img: menuBeef,
    tag: "Hot",
  },
];

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center mb-14 md:mb-20">
      <div className="inline-flex items-center gap-2 text-[#ff6a00] tracking-[0.3em] text-xs font-bold uppercase mb-4">
        <span className="h-px w-8 bg-[#ff6a00]" /> {kicker}{" "}
        <span className="h-px w-8 bg-[#ff6a00]" />
      </div>
      <h2 className="font-display text-distressed text-white leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        {title}
      </h2>
    </div>
  );
}

function SignatureMenu() {
  return (
    <section
      id="menu"
      className="relative py-24 md:py-32 px-5 lg:px-10 bg-linear-to-b from-black via-[#0d0606] to-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,59,20,0.15),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle kicker="The Lineup" title="SIGNATURE TORPEDOS" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MENU.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative rounded-2xl overflow-hidden glass-dark hover:border-[#ff3b14]/50 transition-all hover:-translate-y-1 hover:glow-flame"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
                {item.tag && (
                  <span className="absolute top-4 left-4 bg-[#ff3b14] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-display text-2xl md:text-3xl tracking-wide text-white">
                    {item.name}
                  </h3>
                  <span className="text-[#ff6a00] font-bold whitespace-nowrap text-sm md:text-base mt-1">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">{item.desc}</p>
                <button className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-white/80 hover:text-[#ff3b14] transition">
                  Add to Order <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FIRE IT UP ---------------- */
const SPICE = [
  { level: "Mild", desc: "Smooth heat, full flavor.", flames: 1, color: "#ffb547" },
  { level: "Spicy", desc: "A serious kick that lingers.", flames: 2, color: "#ff6a00" },
  { level: "Extra Spicy", desc: "Inferno-grade. You've been warned.", flames: 3, color: "#ff3b14" },
];

function FireItUp() {
  const [active, setActive] = useState(1);
  return (
    <section id="fire" className="relative py-24 md:py-32 px-5 lg:px-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${SPICE[active].color}30, transparent 60%), #060000`,
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle kicker="Choose Your Heat" title="FIRE IT UP" />
        <div className="grid md:grid-cols-3 gap-5 md:gap-7">
          {SPICE.map((s, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={s.level}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                whileHover={{ y: -6 }}
                className={`relative text-left rounded-2xl p-8 border transition-all glass-dark ${
                  isActive ? "border-[#ff3b14] glow-flame" : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-6">
                  {Array.from({ length: 3 }).map((_, fi) => (
                    <Flame
                      key={fi}
                      className="w-6 h-6 transition-all"
                      style={{
                        color: fi < s.flames ? s.color : "rgba(255,255,255,0.15)",
                        filter:
                          fi < s.flames && isActive ? `drop-shadow(0 0 8px ${s.color})` : "none",
                      }}
                    />
                  ))}
                </div>
                <div className="font-display text-4xl md:text-5xl tracking-wide text-white mb-2">
                  {s.level}
                </div>
                <p className="text-white/65 text-sm">{s.desc}</p>
                <div className="mt-6 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${(s.flames / 3) * 100}%`,
                      background: `linear-gradient(90deg, #ffb547, ${s.color})`,
                      boxShadow: isActive ? `0 0 14px ${s.color}` : "none",
                    }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SPECIAL OFFERS ---------------- */
const OFFERS = [
  { img: special1, alt: "Special Offer 1" },
  { img: special2, alt: "Special Offer 2" },
  { img: special3, alt: "Special Offer 3" },
];

function SpecialBlends() {
  return (
    <section
      id="blends"
      className="relative py-24 md:py-32 px-5 lg:px-10 bg-linear-to-b from-black via-[#0a0506] to-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,106,0,0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle kicker="Limited Time" title="SPECIAL OFFERS" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden border border-[#ff3b14]/40 hover:border-[#ff3b14] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(255,59,20,0.3),0_8px_32px_rgba(255,59,20,0.3)]"
            >
              <img
                src={offer.img}
                alt={offer.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT TIMELINE ---------------- */
const STEPS = [
  {
    n: "01",
    title: "Fresh Ingredients",
    desc: "Locally sourced, never frozen. Real flavor starts here.",
  },
  {
    n: "02",
    title: "Crafted Daily",
    desc: "Every patty, sauce, and bun made the same morning you eat it.",
  },
  { n: "03", title: "Fire It Up", desc: "Open flame, real smoke, signature char on every bite." },
  {
    n: "04",
    title: "Flavor Explosion",
    desc: "Bold. Loaded. Engineered to wreck your expectations.",
  },
];

function AboutTimeline() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-5 lg:px-10 bg-black">
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle kicker="The Story" title="WHAT HAPPENS WHEN FLAVOR GOES BOOM?" />
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#ff3b14]/40 to-transparent" />
          <div className="space-y-12 md:space-y-20">
            {STEPS.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                    right ? "" : ""
                  }`}
                >
                  <div
                    className={`pl-16 md:pl-0 ${right ? "md:order-2 md:pl-16" : "md:text-right md:pr-16"}`}
                  >
                    <div className="font-display text-7xl md:text-8xl text-[#ff3b14]/30 leading-none mb-2">
                      {s.n}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl tracking-wide text-white mb-3">
                      {s.title}
                    </h3>
                    <p className="text-white/65 max-w-md md:inline-block">{s.desc}</p>
                  </div>
                  <div
                    className={`absolute left-6 md:left-1/2 top-4 -translate-x-1/2 w-5 h-5 rounded-full bg-[#ff3b14] glow-flame ring-4 ring-black`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SOCIAL WALL ---------------- */
const GALLERY = [g1, g2, g3, g4, g5, g6, g7, g8];

function SocialWall() {
  return (
    <section
      id="gallery"
      className="relative pt-8 pb-24 md:pb-32 px-5 lg:px-10 bg-linear-to-b from-black via-[#0a0606] to-black"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle kicker="@torpedohq" title="FROM THE FEED" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY.map((img, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/torpedohq?igsh=MWdocWRvMWx1NjVxcg=="
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden glass-dark"
            >
              <img
                src={img}
                alt={`Torpedo feed ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 text-[#ff6a00] text-xs font-bold">
                  <Instagram className="w-4 h-4" /> @torpedohq
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- LOCATION ---------------- */
function LocationSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-5 lg:px-10 bg-black">
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="Visit The Drop Zone" title="FIND A TORPEDO" />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="relative aspect-4/3 lg:aspect-auto rounded-2xl overflow-hidden glass-dark border-white/10">
            <iframe
              title="Torpedo location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7285764430126!2d79.85144317598706!3d6.923014518389752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259954f751df3%3A0x2df4975fc7d10d86!2sTorpedo!5e0!3m2!1sen!2slk!4v1781243690475!5m2!1sen!2slk"
              className="w-full h-full grayscale contrast-125 opacity-85"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(255,59,20,0.15))]" />
          </div>
          <div className="glass-dark rounded-2xl p-8 md:p-10 border-white/10">
            <div className="space-y-6">
              <InfoRow
                icon={MapPin}
                label="Address"
                value="Torpedo, 66, Vauxhall Street, Colombo 2, Colombo 00200"
              />
              <InfoRow
                icon={Clock}
                label="Opening Hours"
                value={"Mon–Thu  11:00 — 23:00\nFri–Sun  11:00 — 01:00"}
              />
              <InfoRow icon={Phone} label="Contact" value="0777 121 575" />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://maps.app.goo.gl/torpedo-colombo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ff3b14] hover:bg-[#ff5a2a] text-white px-6 py-3.5 rounded-md font-bold text-xs uppercase tracking-[0.18em] transition hover:glow-flame"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </a>
              <a
                href="menu"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white px-6 py-3.5 rounded-md font-bold text-xs uppercase tracking-[0.18em] transition"
              >
                <Flame className="w-4 h-4" /> Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 grid place-items-center w-11 h-11 rounded-full bg-[#ff3b14]/15 text-[#ff6a00] border border-[#ff3b14]/30">
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/55 mb-1">
          {label}
        </div>
        <div className="text-white font-medium whitespace-pre-line">{value}</div>
      </div>
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-5 lg:px-10 bg-linear-to-b from-black to-[#1a0606] border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <img
              src={logoImage}
              alt="Torpedo"
              className="h-16 w-auto object-contain mb-5"
              decoding="async"
            />
            <p className="text-white/60 max-w-md leading-relaxed">
              Flavor explosions daily. Bold burgers, loaded fries, special blends — crafted to wreck
              your expectations of fast food.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/torpedohq?igsh=MWdocWRvMWx1NjVxcg==",
                },
                {
                  Icon: Facebook,
                  href: "https://www.facebook.com/p/Torpedo-HQ-61580067237198/",
                },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid place-items-center w-10 h-10 rounded-full border border-white/15 hover:border-[#ff3b14] hover:bg-[#ff3b14]/10 hover:text-[#ff6a00] text-white transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.22em] uppercase text-white/55 mb-4">
              Explore
            </div>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((n) => (
                <li key={n.label}>
                  {n.to ? (
                    <Link
                      to={n.to}
                      className="text-sm text-white/75 hover:text-[#ff6a00] transition"
                    >
                      {n.label}
                    </Link>
                  ) : (
                    <a
                      href={n.href!}
                      className="text-sm text-white/75 hover:text-[#ff6a00] transition"
                    >
                      {n.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.22em] uppercase text-white/55 mb-4">
              Get In Touch
            </div>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>66, Vauxhall Street, Colombo 2, Colombo 00200</li>
              <li>0777 121 575</li>
              <li>
                <a href="mailto:torpedohq@gmail.com" className="hover:text-[#ff6a00] transition">
                  torpedohq@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.ubereats.com/lk/store/torpedo-colombo-02/TyW_YSSYWYC8CElCqSwXyw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff6a00] transition"
                >
                  Order on Uber Eats
                </a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-1 text-[#ff6a00] text-xs font-bold tracking-[0.2em] uppercase">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
              <span className="ml-2 text-white/60 font-medium tracking-normal normal-case">
                4.9 on Google
              </span>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/45">
          <div>© {new Date().getFullYear()} Torpedo Sri Lanka. All rights reserved.</div>
          <div className="tracking-[0.2em] uppercase">Flavor Explosions Daily 🔥</div>
        </div>
      </div>
    </footer>
  );
}
