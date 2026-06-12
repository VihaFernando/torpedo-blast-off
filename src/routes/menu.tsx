import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Flame,
  Menu as MenuIcon,
  X,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Star,
  ShoppingBag,
  UtensilsCrossed,
  GlassWater,
  ChevronRight,
} from "lucide-react";
import logoImage from "@/assets/logo.png";
import menuChicken from "@/assets/menu-chicken.jpg";
import menuBeef from "@/assets/menu-beef.jpg";
import ourMenuImage from "@/assets/our-menu.png";
import torpedosImage from "@/assets/torpedos.png";
import friesImage from "@/assets/fries.png";
import riceImage from "@/assets/rice.png";
import drinksImage from "@/assets/menu-shake.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Torpedo" },
      {
        name: "description",
        content: "Signature Torpedos. Bold recipes. Premium ingredients. 100% Torpedo.",
      },
    ],
  }),
  component: MenuPage,
});

/* ─── NAV ─── */
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Special Blends", href: "/#blends" },
  { label: "Fire It Up", href: "/#fire" },
  { label: "Locations", href: "/#contact" },
  { label: "About Us", href: "/#about" },
];

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
        scrolled ? "glass-dark py-3" : "py-5 bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10 flex items-center justify-between gap-6">
        <Link to="/" className="shrink-0">
          <img
            src={logoImage}
            alt="Torpedo"
            className="h-10 md:h-12 w-auto object-contain"
            decoding="async"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_ITEMS.slice(1).map((n) =>
            n.href.startsWith("/") && !n.href.includes("#") ? (
              <Link
                key={n.label}
                to={n.href as "/menu"}
                className="text-sm font-bold tracking-widest uppercase text-white hover:text-[#ff3b14] transition"
              >
                {n.label}
              </Link>
            ) : (
              <a
                key={n.label}
                href={n.href}
                className="text-sm font-bold tracking-widest uppercase text-white hover:text-[#ff3b14] transition"
              >
                {n.label}
              </a>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#menu-grid"
            className="hidden sm:inline-flex items-center gap-2 rounded-md border border-[#ff3b14] px-6 py-2.5 text-sm font-bold tracking-[0.05em] uppercase text-white hover:bg-[#ff3b14] transition-all"
          >
            Order Now <Flame className="w-4 h-4 text-[#ff3b14]" />
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
          {NAV_ITEMS.map((n) =>
            n.href.startsWith("/") && !n.href.includes("#") ? (
              <Link
                key={n.label}
                to={n.href as "/menu"}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold tracking-[0.18em] uppercase text-white/90 py-2 border-b border-white/5"
              >
                {n.label}
              </Link>
            ) : (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold tracking-[0.18em] uppercase text-white/90 py-2 border-b border-white/5"
              >
                {n.label}
              </a>
            ),
          )}
        </motion.div>
      )}
    </header>
  );
}

/* ─── MENU DATA ─── */
type Category = "all" | "torpedos" | "burgers" | "rice" | "fries" | "drinks";

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Items", icon: <ShoppingBag className="w-4 h-4" /> },
  { id: "torpedos", label: "Torpedos", icon: <Flame className="w-4 h-4" /> },
  { id: "burgers", label: "Burgers", icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: "rice", label: "Rice", icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: "fries", label: "Fries", icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: "drinks", label: "Drinks", icon: <GlassWater className="w-4 h-4" /> },
];

const MENU_ITEMS = [
  /* ── TORPEDOS ── */
  {
    name: "Chicken Torpedo",
    desc: "Grilled BBQ flavored chicken in our Torpedo Sandwich, topped with melted cheese and irresistible sauces for a flavorful bite.",
    price: "LKR 890",
    img: torpedosImage,
    tag: "Best Seller",
    categories: ["all", "torpedos"] as Category[],
  },
  {
    name: "Platoon Torpedo",
    desc: "Crispy, golden fried oyster mushrooms in our signature Torpedo, topped with bold sauces — crunchy, juicy, and irresistible.",
    price: "LKR 890",
    img: torpedosImage,
    tag: null,
    categories: ["all", "torpedos"] as Category[],
  },
  {
    name: "Tuna Torpedo",
    desc: "Fresh, chunky tuna in our signature Torpedo, topped with creamy sauces and melted cheese. A perfect catch for your craving.",
    price: "LKR 990",
    img: torpedosImage,
    tag: null,
    categories: ["all", "torpedos"] as Category[],
  },
  {
    name: "Torpedo Royale",
    desc: "Torpedo with our special Golden-crisp chicken, creamy sauces, and melty cheese. Each bite is crunchy and juicy.",
    price: "LKR 1090",
    img: torpedosImage,
    tag: null,
    categories: ["all", "torpedos"] as Category[],
  },
  {
    name: "Beef Torpedo",
    desc: "Juicy, tender beef grilled, topped with rich sauces and gooey cheese. Bold, meaty — sure to hit the right spot.",
    price: "LKR 1190",
    img: torpedosImage,
    tag: null,
    categories: ["all", "torpedos"] as Category[],
  },
  /* ── BURGERS ── */
  {
    name: "Chicken Burger",
    desc: "Juicy, tender grilled chicken patty topped with fresh ingredients, creamy sauces, and melted cheese, all in a soft, fluffy bun.",
    price: "LKR 1190",
    img: menuChicken,
    tag: null,
    categories: ["all", "burgers"] as Category[],
  },
  {
    name: "Burger Royale",
    desc: "A crispy chicken patty topped with melted cheese and creamy sauces, all in a soft bun. Crunchy, juicy, and fit for royalty.",
    price: "LKR 1190",
    img: menuChicken,
    tag: null,
    categories: ["all", "burgers"] as Category[],
  },
  {
    name: "Beef Burger",
    desc: "Succulent beef grilled perfectly, topped with rich sauces and melted cheese. A bold, flavorful dish that satisfies with every bite.",
    price: "LKR 1290",
    img: menuBeef,
    tag: null,
    categories: ["all", "burgers"] as Category[],
  },
  /* ── RICE ── */
  {
    name: "Fried Rice Royale",
    desc: "Fragrant rice wok-tossed to perfection with crispy chicken, fresh veggies, and a medley of flavorful sauces. Every bite delivers the perfect balance of crunch, aroma, and indulgence.",
    price: "REGULAR LKR 890  \n•  SMOKED LKR 990",
    img: riceImage,
    tag: null,
    categories: ["all", "rice"] as Category[],
  },
  /* ── FRIES ── */
  {
    name: "Fries",
    desc: "French? Maybe. Delicious? Absolutely. Order them. Pretend you'll share. We both know you won't.",
    price: "LKR 690",
    img: friesImage,
    tag: null,
    categories: ["all", "fries"] as Category[],
  },
  /* ── DRINKS ── */
  {
    name: "Iced Milo",
    desc: "Our take on the local classic. Simply can't go wrong with this one! Rich, creamy and absolutely delicious combination of Milo and our in-house mix of flavor!",
    price: "LKR 590",
    img: drinksImage,
    tag: null,
    categories: ["all", "drinks"] as Category[],
  },
  {
    name: "Kick Shake",
    desc: "For all you caffeine addicts out there. This special blend is for you. Rich, Creamy and absolutely fuelled with that edge to kick your day into high gear.",
    price: "LKR 590",
    img: drinksImage,
    tag: null,
    categories: ["all", "drinks"] as Category[],
  },
  {
    name: "Jam & Berry",
    desc: "Creamy Strawberry goodness in a glass! This berrylicious blend of ours is berry sweet, berry thick and berry good!",
    price: "LKR 890",
    img: drinksImage,
    tag: null,
    categories: ["all", "drinks"] as Category[],
  },
  {
    name: "Shakaboom",
    desc: "A chocolatey, crunchy, creamy explosion in a cup! Blended with rich ice cream, crushed cookies, and velvety milk. The perfect balance of crunch and cream in every sip.",
    price: "LKR 890",
    img: drinksImage,
    tag: null,
    categories: ["all", "drinks"] as Category[],
  },
];

const ADD_ONS = [
  { icon: "🧀", label: "Extra Cheese", price: "LKR 100" },
  { icon: "🥓", label: "Extra Chicken Bacon", price: "LKR 150" },
  { icon: "🥩", label: "Extra Patty", price: "LKR 150" },
  { icon: "🌶️", label: "Spicy", price: "LKR 50" },
  { icon: "🔥", label: "Extra Spicy", price: "LKR 100" },
];

/* ─── PAGE ─── */
function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = MENU_ITEMS.filter((item) => item.categories.includes(activeCategory));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-16 px-5 lg:px-10 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,59,20,0.18),transparent_60%)]" />
        {/* ember sparks */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#ff6a00] opacity-60"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animation: `ember-rise ${2 + i * 0.4}s ease-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        <div className="relative mx-auto max-w-3xl">
          <img
            src={ourMenuImage}
            alt="Our Menu"
            className="h-12 w-auto object-contain mx-auto mb-5"
          />
          <h1 className="font-display text-white leading-[0.9] uppercase text-[clamp(3rem,12vw,7rem)]">
            SIGNATURE <span className="text-[#ff3b14]">TORPEDOS</span>
          </h1>
          <p className="mt-4 text-white/60 tracking-[0.2em] uppercase text-sm font-semibold">
            Bold Recipes. Premium Ingredients. 100% Torpedo.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-[60px] z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/5 px-5 lg:px-10 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#ff3b14] text-white shadow-[0_0_16px_rgba(255,59,20,0.4)]"
                    : "glass-dark text-white/70"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <section id="menu-grid" className="px-5 lg:px-10 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="relative rounded-lg overflow-hidden border border-[#ff3b14] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(255,59,20,0.4),0_8px_32px_rgba(255,59,20,0.35)]"
              >
                {/* image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {/* dark overlay fire gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {item.tag && (
                    <span className="absolute top-4 left-4 bg-[#ff3b14] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm leading-none">
                      BEST
                      <br />
                      SELLER
                    </span>
                  )}
                </div>

                {/* content */}
                <div className="p-6">
                  <h3 className="font-display text-2xl md:text-3xl tracking-wide text-white uppercase leading-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-5">{item.desc}</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-block border border-[#ff3b14] text-[#ff3b14] text-lg font-bold px-5 py-2 rounded-lg tracking-wider shadow-[0_0_10px_rgba(255,59,20,0.5),inset_0_0_10px_rgba(255,59,20,0.08)]">
                      {item.price}
                    </span>
                    {/* <button className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase text-white/60">
                      Add to Order <ChevronRight className="w-3.5 h-3.5" />
                    </button> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom row: Kaboom Meal + Add-ons */}
          <div className="mt-6 grid lg:grid-cols-2 gap-5 md:gap-6">
            {/* Kaboom Meal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden glass-dark border border-white/8 min-h-[220px] flex items-center"
            >
              {/* fire bg */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(255,59,20,0.25),transparent_60%)]" />
              <div className="relative z-10 flex-1 p-8 md:p-10">
                <p className="text-white font-display text-4xl md:text-5xl uppercase leading-tight tracking-wide mb-3">
                  Make It A
                </p>
                <p className="font-display text-[clamp(3rem,8vw,5rem)] uppercase leading-[0.85] text-[#ff3b14] tracking-wide">
                  KABOOM
                </p>
                <p className="font-display text-4xl md:text-5xl uppercase leading-tight tracking-wide text-white mb-4">
                  MEAL!
                </p>
                <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
                  Add fries and a drink to make your meal absolutely explosive.
                </p>
                <div className="inline-block border border-white/30 rounded-sm px-5 py-3">
                  <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/50 mb-1">
                    Starting From
                  </div>
                  <div className="text-white font-display text-2xl tracking-wide">LKR 490</div>
                </div>
              </div>
              {/* fries/drink graphic placeholder using existing images */}
              <div className="hidden md:block relative z-10 w-48 shrink-0 pr-6">
                <img
                  src={menuChicken}
                  alt="Kaboom Meal"
                  className="w-full rounded-xl object-cover aspect-square opacity-90"
                />
              </div>
            </motion.div>

            {/* Add-ons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl glass-dark border border-white/8 p-8"
            >
              <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-white mb-1">
                Make it <span className="text-[#ff3b14]">YOURS!</span>
              </h3>
              <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-3">
                With Power Ups
              </p>
              <div className="h-px bg-white/10 mb-6" />
              <ul className="space-y-4">
                {ADD_ONS.map((addon) => (
                  <li key={addon.label} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{addon.icon}</span>
                      <span className="text-sm font-bold tracking-[0.12em] uppercase text-white/80">
                        {addon.label}
                      </span>
                    </div>
                    <div className="flex-1 border-b border-dotted border-white/15 mx-2" />
                    <span className="text-[#ff3b14] font-bold text-sm tracking-wider shrink-0">
                      {addon.price}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <MenuFooter />
    </div>
  );
}

/* ─── FOOTER ─── */
function MenuFooter() {
  return (
    <footer className="relative pt-20 pb-10 px-5 lg:px-10 bg-gradient-to-b from-black to-[#1a0606] border-t border-white/5">
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
              {[Instagram, Facebook, Youtube, Twitter].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid place-items-center w-10 h-10 rounded-full border border-white/15 hover:border-[#ff3b14] hover:bg-[#ff3b14]/10 hover:text-[#ff6a00] text-white transition"
                >
                  <I className="w-4 h-4" />
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
                  {n.href.startsWith("/") && !n.href.includes("#") ? (
                    <Link
                      to={n.href as "/menu"}
                      className="text-sm text-white/75 hover:text-[#ff6a00] transition"
                    >
                      {n.label}
                    </Link>
                  ) : (
                    <a
                      href={n.href}
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
              <li>42 Galle Road, Colombo 03</li>
              <li>+94 11 234 5678</li>
              <li>hello@torpedo.lk</li>
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
