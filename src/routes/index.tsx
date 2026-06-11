import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Flame,
  MapPin,
  Sparkles,
  CupSoda,
  Beef,
  Menu as MenuIcon,
  X,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
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
import menuShake from "@/assets/menu-shake.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Torpedo — Flavor Explosions Daily" },
      { name: "description", content: "Bold burgers, loaded fries, and special blends. One bite and you know. Torpedo — Sri Lanka's flavor explosion." },
      { property: "og:title", content: "Torpedo — Flavor Explosions Daily" },
      { property: "og:description", content: "Bold burgers, loaded fries, and special blends. One bite and you know." },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Special Blends", href: "#blends" },
  { label: "Fire It Up", href: "#fire" },
  { label: "Locations", href: "#contact" },
  { label: "About Us", href: "#about" },
];

function Landing() {
  return (
    <div id="home" className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <SignatureMenu />
      <FireItUp />
      <SpecialBlends />
      <AboutTimeline />
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass-dark py-3" : "py-5 bg-linear-to-b from-black/80 to-transparent"
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
          {NAV_ITEMS.slice(1).map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-[#ff3b14] transition relative group"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#menu"
            className="hidden sm:inline-flex items-center gap-2 rounded-md border border-[#ff3b14] px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-[#ff3b14] transition-all"
          >
            Order Now <Flame className="w-4 h-4 text-[#ff3b14] group-hover:text-white" />
          </a>
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
          {NAV_ITEMS.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold tracking-[0.18em] uppercase text-white/90 py-2 border-b border-white/5"
            >
              {n.label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Embers({ count = 40 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = Math.random() * 100;
        const size = 1 + Math.random() * 2;
        const dur = 4 + Math.random() * 6;
        const delay = -Math.random() * 10;
        const drift = (Math.random() - 0.5) * 150;
        return (
          <span
            key={i}
            style={{
              left: `${left}%`,
              bottom: -20,
              width: size,
              height: size,
              animation: `ember-rise ${dur}s linear ${delay}s infinite`,
              ["--drift" as string]: `${drift}px`,
              background: `radial-gradient(circle, #ff9a3c, #ff3b14 60%, transparent 70%)`,
              boxShadow: "0 0 4px rgba(255,106,0,0.9)",
            }}
            className="absolute rounded-full"
          />
        );
      })}
    </div>
  );
}

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
        {/* dark overlays for readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,59,20,0.12),transparent_70%)]" />
      </motion.div>

      <Embers />

      {/* content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex-1 flex items-center pt-24 pb-12 px-5 lg:px-10"
      >
        <div className="mx-auto max-w-7xl w-full grid md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <h1 className="font-display text-white leading-[0.78] tracking-tight text-[17vw] sm:text-[15vw] md:text-[8.5rem] lg:text-[10rem] uppercase">
              <span className="text-distressed block">ONE BITE</span>
              <span className="text-distressed block">AND <span className="text-[#ff3b14]">YOU KNOW</span></span>
            </h1>

            <div className="mt-6 flex flex-col items-start gap-5">
              <div className="brush-stroke px-8 py-3 font-display tracking-[0.1em] text-white text-xl sm:text-2xl uppercase italic">
                FLAVOR EXPLOSIONS DAILY
              </div>

              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-white pl-1">
                <span>Burgers</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b14]" />
                <span>Fries</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b14]" />
                <span>Shakes</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b14]" />
                <span>Kaboom</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2.5 bg-[#ff3b14] hover:bg-[#ff5a2a] text-white px-8 py-3.5 rounded-md font-bold tracking-[0.2em] text-[11px] uppercase transition-all shadow-[0_0_20px_rgba(255,59,20,0.3)]"
              >
                <Flame className="w-4 h-4 fill-current" /> VIEW MENU
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 border border-white/30 hover:border-white text-white px-8 py-3.5 rounded-md font-bold tracking-[0.2em] text-[11px] uppercase transition-all"
              >
                <MapPin className="w-4 h-4" /> FIND US
              </a>
            </div>
          </motion.div>
          <div className="hidden md:block" /> {/* space for the background burger */}
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
  { icon: Flame, title: "Fire It Up", desc: "Choose your heat" },
  { icon: Beef, title: "Massive Portions", desc: "Made to satisfy" },
  { icon: Sparkles, title: "Flavor Explosions", desc: "Bold. Smoky. Loaded." },
  { icon: CupSoda, title: "Special Blends", desc: "Shakes that hit different" },
];

function FeatureBar() {
  return (
    <div className="glass-dark border-y border-white/5">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
        {FEATURES.map((f, i) => (
          <div key={i} className="flex items-center gap-4 py-6 px-4 md:px-8">
            <f.icon className="w-8 h-8 text-white/80 shrink-0 stroke-[1.5]" />
            <div className="min-w-0">
              <div className="font-bold uppercase tracking-[0.2em] text-[11px] md:text-xs text-white truncate">
                {f.title}
              </div>
              <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 truncate mt-1">
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
  { name: "Chicken Torpedo", desc: "Crispy chicken, melted cheddar, signature smoky sauce.", price: "LKR 1,490", img: menuChicken, tag: "Bestseller" },
  { name: "Torpedo Royale", desc: "Double stack. Triple cheese. Caramelized onions.", price: "LKR 1,990", img: menuBeef, tag: "New" },
  { name: "Beef Torpedo", desc: "Slow-smoked beef, gooey cheese, toasted brioche.", price: "LKR 1,790", img: menuBeef },
  { name: "Chicken Burger", desc: "Buttermilk fried chicken, slaw, hot honey drizzle.", price: "LKR 1,190", img: menuChicken },
  { name: "Beef Burger", desc: "Smashed Angus patty, American cheese, pickles.", price: "LKR 1,390", img: menuBeef },
  { name: "Burger Royale", desc: "Quad-stack chaos. Built for the brave.", price: "LKR 2,290", img: menuBeef, tag: "Hot" },
];

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center mb-14 md:mb-20">
      <div className="inline-flex items-center gap-2 text-[#ff6a00] tracking-[0.3em] text-xs font-bold uppercase mb-4">
        <span className="h-px w-8 bg-[#ff6a00]" /> {kicker} <span className="h-px w-8 bg-[#ff6a00]" />
      </div>
      <h2 className="font-display text-distressed text-white leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        {title}
      </h2>
    </div>
  );
}

function SignatureMenu() {
  return (
    <section id="menu" className="relative py-24 md:py-32 px-5 lg:px-10 bg-linear-to-b from-black via-[#0d0606] to-black">
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
      <Embers count={active === 2 ? 40 : active === 1 ? 22 : 10} />
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
                className={`relative text-left rounded-2xl p-8 border transition-all glass-dark ${isActive ? "border-[#ff3b14] glow-flame" : "border-white/10 hover:border-white/30"
                  }`}
              >
                <div className="flex items-center gap-1.5 mb-6">
                  {Array.from({ length: 3 }).map((_, fi) => (
                    <Flame
                      key={fi}
                      className="w-6 h-6 transition-all"
                      style={{
                        color: fi < s.flames ? s.color : "rgba(255,255,255,0.15)",
                        filter: fi < s.flames && isActive ? `drop-shadow(0 0 8px ${s.color})` : "none",
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

/* ---------------- SPECIAL BLENDS ---------------- */
const BLENDS = [
  { name: "Iced Milo", desc: "Chocolate-malt classic, blasted with ice.", price: "LKR 590" },
  { name: "Kick Shake", desc: "Espresso meets caramel. Pure energy.", price: "LKR 690" },
  { name: "Jam & Berry", desc: "Mixed berries swirled with vanilla cream.", price: "LKR 690" },
  { name: "Shakaboom", desc: "Brownie chunks, fudge, whipped chaos.", price: "LKR 790" },
];

function SpecialBlends() {
  return (
    <section id="blends" className="relative py-24 md:py-32 px-5 lg:px-10 bg-linear-to-b from-black via-[#0a0506] to-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,106,0,0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle kicker="Drinks That Hit Different" title="SPECIAL BLENDS" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLENDS.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden glass-dark border-white/10 hover:border-[#ff6a00]/50 transition-all hover:-translate-y-2"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-black">
                <img
                  src={menuShake}
                  alt={b.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_50%_30%,rgba(255,106,0,0.35),transparent_60%)]" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl tracking-wide text-white mb-1">{b.name}</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-3">{b.desc}</p>
                <div className="text-[#ff6a00] font-bold text-sm">{b.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT TIMELINE ---------------- */
const STEPS = [
  { n: "01", title: "Fresh Ingredients", desc: "Locally sourced, never frozen. Real flavor starts here." },
  { n: "02", title: "Crafted Daily", desc: "Every patty, sauce, and bun made the same morning you eat it." },
  { n: "03", title: "Fire It Up", desc: "Open flame, real smoke, signature char on every bite." },
  { n: "04", title: "Flavor Explosion", desc: "Bold. Loaded. Engineered to wreck your expectations." },
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
                  className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${right ? "" : ""
                    }`}
                >
                  <div className={`pl-16 md:pl-0 ${right ? "md:order-2 md:pl-16" : "md:text-right md:pr-16"}`}>
                    <div className="font-display text-7xl md:text-8xl text-[#ff3b14]/30 leading-none mb-2">
                      {s.n}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl tracking-wide text-white mb-3">
                      {s.title}
                    </h3>
                    <p className="text-white/65 max-w-md md:inline-block">{s.desc}</p>
                  </div>
                  <div className={`absolute left-6 md:left-1/2 top-4 -translate-x-1/2 w-5 h-5 rounded-full bg-[#ff3b14] glow-flame ring-4 ring-black`} />
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
function SocialWall() {
  const tiles = [
    { img: menuChicken, likes: "12.4K", caption: "Crispy. Loaded. Reloaded." },
    { img: menuBeef, likes: "9.8K", caption: "Double-stack Wednesday." },
    { img: menuShake, likes: "7.1K", caption: "Sweet relief from the heat." },
    { img: menuBeef, likes: "15.2K", caption: "When flavor goes boom." },
    { img: menuChicken, likes: "6.6K", caption: "Hot honey hits different." },
    { img: menuShake, likes: "4.9K", caption: "Shakaboom o'clock." },
  ];
  return (
    <section className="relative py-24 md:py-32 px-5 lg:px-10 bg-linear-to-b from-black via-[#0a0606] to-black">
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle kicker="@torpedo.lk" title="FROM THE FEED" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {tiles.map((t, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden glass-dark"
            >
              <img src={t.img} alt={t.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 text-[#ff6a00] text-xs font-bold mb-1">
                  <Instagram className="w-4 h-4" /> {t.likes}
                </div>
                <div className="text-sm text-white font-semibold">{t.caption}</div>
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
              src="https://www.google.com/maps?q=Colombo,Sri+Lanka&output=embed"
              className="w-full h-full grayscale contrast-125 opacity-85"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(255,59,20,0.15))]" />
          </div>
          <div className="glass-dark rounded-2xl p-8 md:p-10 border-white/10">
            <div className="space-y-6">
              <InfoRow icon={MapPin} label="Address" value="42 Galle Road, Colombo 03, Sri Lanka" />
              <InfoRow icon={Clock} label="Opening Hours" value={"Mon–Thu  11:00 — 23:00\nFri–Sun  11:00 — 01:00"} />
              <InfoRow icon={Phone} label="Contact" value="+94 11 234 5678" />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#" className="inline-flex items-center gap-2 bg-[#ff3b14] hover:bg-[#ff5a2a] text-white px-6 py-3.5 rounded-md font-bold text-xs uppercase tracking-[0.18em] transition hover:glow-flame">
                <Navigation className="w-4 h-4" /> Get Directions
              </a>
              <a href="#menu" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white px-6 py-3.5 rounded-md font-bold text-xs uppercase tracking-[0.18em] transition">
                <Flame className="w-4 h-4" /> Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 grid place-items-center w-11 h-11 rounded-full bg-[#ff3b14]/15 text-[#ff6a00] border border-[#ff3b14]/30">
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/55 mb-1">{label}</div>
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
            <img src={logoImage} alt="Torpedo" className="h-16 w-auto object-contain mb-5" decoding="async" />
            <p className="text-white/60 max-w-md leading-relaxed">
              Flavor explosions daily. Bold burgers, loaded fries, special blends — crafted to wreck your expectations of fast food.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Facebook, Youtube, Twitter].map((I, i) => (
                <a key={i} href="#" className="grid place-items-center w-10 h-10 rounded-full border border-white/15 hover:border-[#ff3b14] hover:bg-[#ff3b14]/10 hover:text-[#ff6a00] text-white transition">
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.22em] uppercase text-white/55 mb-4">Explore</div>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="text-sm text-white/75 hover:text-[#ff6a00] transition">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.22em] uppercase text-white/55 mb-4">Get In Touch</div>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>42 Galle Road, Colombo 03</li>
              <li>+94 11 234 5678</li>
              <li>hello@torpedo.lk</li>
            </ul>
            <div className="mt-5 flex items-center gap-1 text-[#ff6a00] text-xs font-bold tracking-[0.2em] uppercase">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              <span className="ml-2 text-white/60 font-medium tracking-normal normal-case">4.9 on Google</span>
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
