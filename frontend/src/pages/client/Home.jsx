import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, Shield, RefreshCw, Phone, Heart, Sparkles } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { getProducts, getCategories, getSettings } from '../../utils/api';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@300;400;500;600;700&display=swap');

  /* ── CSS VARIABLES ── */
  :root {
    --pink:        #e91e8c;
    --pink-light:  #ff6bb5;
    --pink-pale:   #fff0f7;
    --pink-soft:   #fce4f3;
    --gold:        #c9922a;
    --gold-light:  #e8b84b;
    --gold-pale:   #fdf8ee;
    --cream:       #fffaf6;
    --deep:        #2d0a1e;
    --text:        #3a1a2e;
    --text-muted:  #8a6070;
    --border:      #f0d6e8;
  }

  .wc-home {
    background: var(--cream);
    font-family: 'Poppins', sans-serif;
  }

  /* ── FLORAL DIVIDER ── */
  .wc-floral-divider {
    text-align: center;
    color: var(--pink);
    font-size: 1.2rem;
    letter-spacing: 8px;
    padding: 8px 0;
    opacity: 0.5;
  }

  /* ════════════════════════════════
     HERO
  ════════════════════════════════ */
  .wc-hero { position: relative; overflow: hidden; }

  .wc-slider-track {
    position: relative; width: 100%; height: 520px;
  }

  .wc-slide {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    opacity: 0; transition: opacity 1s ease;
  }
  .wc-slide.active { opacity: 1; z-index: 1; }

  .wc-slide-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(115deg,
      rgba(45,10,30,0.82) 0%,
      rgba(45,10,30,0.45) 50%,
      rgba(45,10,30,0.1) 100%
    );
  }

  .wc-slide-content {
    position: relative; z-index: 2; height: 100%;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 64px; max-width: 640px;
  }

  .wc-slide-eyebrow {
    font-family: 'Poppins', sans-serif;
    font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase;
    color: var(--gold-light); margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .wc-slide-eyebrow::before,
  .wc-slide-eyebrow::after {
    content: '✿'; font-size: 0.8rem;
  }

  .wc-slide-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 600; color: white;
    line-height: 1.15; margin-bottom: 20px;
    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
  }

  .wc-slide-title em {
    font-style: italic; color: var(--pink-light);
  }

  .wc-slide-sub {
    font-size: 0.88rem; color: rgba(255,255,255,0.72);
    margin-bottom: 32px; line-height: 1.7; max-width: 420px;
  }

  .wc-slide-cta {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg, var(--pink), #c4006e);
    color: white; padding: 13px 32px; border-radius: 50px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif; font-size: 0.75rem;
    font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
    width: fit-content;
    box-shadow: 0 8px 24px rgba(233,30,140,0.4);
    transition: transform 0.2s, box-shadow 0.2s, gap 0.2s;
  }
  .wc-slide-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(233,30,140,0.5);
    gap: 14px;
  }

  .wc-slider-arrow {
    position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
    background: rgba(255,255,255,0.12);
    border: 1.5px solid rgba(255,255,255,0.3);
    color: white; width: 44px; height: 44px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; backdrop-filter: blur(6px);
  }
  .wc-slider-arrow:hover { background: var(--pink); border-color: var(--pink); }
  .wc-slider-arrow.left { left: 24px; }
  .wc-slider-arrow.right { right: 24px; }

  .wc-slider-dots {
    position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
    z-index: 10; display: flex; gap: 8px; align-items: center;
  }
  .wc-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.4); border: none;
    cursor: pointer; padding: 0; transition: all 0.3s;
  }
  .wc-dot.active { background: var(--pink-light); width: 22px; border-radius: 3px; }

  /* ── FALLBACK HERO ── */
  .wc-hero-fallback {
    background: linear-gradient(135deg, var(--deep) 0%, #5c1040 50%, #2d0a1e 100%);
    min-height: 420px; display: flex; align-items: center; padding: 64px 64px;
    position: relative; overflow: hidden;
  }

  .wc-hero-fallback::before {
    content: '❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀';
    position: absolute; top: 20px; left: 0; right: 0;
    text-align: center; color: rgba(233,30,140,0.2);
    font-size: 1.2rem; letter-spacing: 8px;
  }
  .wc-hero-fallback::after {
    content: '❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀';
    position: absolute; bottom: 20px; left: 0; right: 0;
    text-align: center; color: rgba(233,30,140,0.2);
    font-size: 1.2rem; letter-spacing: 8px;
  }

  .wc-hero-fallback-inner { position: relative; z-index: 1; }

  .wc-hero-ghost-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: rgba(255,255,255,0.8);
    padding: 11px 26px; border-radius: 50px; text-decoration: none;
    font-family: 'Poppins', sans-serif; font-size: 0.72rem;
    font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase;
    border: 1.5px solid rgba(255,255,255,0.3);
    transition: all 0.2s;
  }
  .wc-hero-ghost-btn:hover {
    border-color: var(--pink-light); color: var(--pink-light);
    background: rgba(233,30,140,0.08);
  }

  /* ════════════════════════════════
     MARQUEE STRIP
  ════════════════════════════════ */
  .wc-marquee-strip {
    background: linear-gradient(90deg, var(--pink), #c4006e, var(--pink));
    padding: 10px 0; overflow: hidden; white-space: nowrap;
  }

  .wc-marquee-inner {
    display: inline-flex; gap: 0;
    animation: wc-marquee 22s linear infinite;
  }

  @keyframes wc-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .wc-marquee-item {
    font-family: 'Poppins', sans-serif;
    font-size: 0.65rem; font-weight: 600;
    letter-spacing: 3px; text-transform: uppercase;
    color: white; padding: 0 28px;
    display: inline-flex; align-items: center; gap: 10px;
  }

  .wc-marquee-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: rgba(255,255,255,0.5); flex-shrink: 0;
  }

  /* ════════════════════════════════
     TAGLINE / CTA BLOCK
  ════════════════════════════════ */
  .wc-tagline-block {
    background: var(--pink-pale);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    text-align: center;
    padding: 44px 24px 40px;
    position: relative;
  }

  .wc-tagline-block::before {
    content: '🌸';
    position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
    font-size: 1.6rem; background: var(--pink-pale);
    padding: 0 8px; line-height: 1;
  }

  .wc-tagline-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.1rem, 2.5vw, 1.55rem);
    font-style: italic; font-weight: 400;
    color: var(--deep); margin-bottom: 22px;
    line-height: 1.55; letter-spacing: 0.2px;
  }

  .wc-tagline-text span { color: var(--pink); }

  .wc-shop-btn {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg, var(--pink), #c4006e);
    color: white; padding: 14px 40px; border-radius: 50px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif; font-size: 0.72rem;
    font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    box-shadow: 0 6px 20px rgba(233,30,140,0.3);
    transition: transform 0.2s, box-shadow 0.2s, gap 0.2s;
  }
  .wc-shop-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(233,30,140,0.42);
    gap: 14px;
  }

  /* ════════════════════════════════
     CATEGORY CIRCLES
  ════════════════════════════════ */
  .wc-cats-section {
    padding: 52px 0 44px;
    background: white;
  }

  .wc-section-eyebrow {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 0.62rem; letter-spacing: 4px; text-transform: uppercase;
    color: var(--pink); margin-bottom: 6px;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .wc-section-eyebrow::before,
  .wc-section-eyebrow::after { content: '✦'; }

  .wc-section-title {
    text-align: center;
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 500; color: var(--deep);
    margin-bottom: 36px; letter-spacing: 0.3px;
  }

  .wc-cats-inner {
    max-width: 1440px; margin: 0 auto; padding: 0 24px;
    display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;
  }

  .wc-cat-item {
    display: flex; flex-direction: column; align-items: center;
    gap: 12px; text-decoration: none; transition: transform 0.25s;
  }
  .wc-cat-item:hover { transform: translateY(-6px); }

  .wc-cat-ring {
    width: 92px; height: 92px; border-radius: 50%; overflow: hidden;
    border: 2.5px solid var(--border);
    background: var(--pink-pale);
    box-shadow: 0 4px 16px rgba(233,30,140,0.08);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }
  .wc-cat-item:hover .wc-cat-ring {
    border-color: var(--pink);
    box-shadow: 0 6px 24px rgba(233,30,140,0.22);
  }
  .wc-cat-ring img { width: 100%; height: 100%; object-fit: cover; }

  .wc-cat-initial {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem; color: var(--pink);
    background: linear-gradient(135deg, var(--pink-pale), var(--pink-soft));
  }

  .wc-cat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 0.72rem; color: var(--text); font-weight: 500;
    text-align: center; max-width: 90px; line-height: 1.4;
  }

  /* ════════════════════════════════
     FEATURES STRIP
  ════════════════════════════════ */
  .wc-features-strip {
    background: linear-gradient(135deg, var(--deep) 0%, #5c1040 100%);
    position: relative; overflow: hidden;
  }

  .wc-features-strip::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(233,30,140,0.04) 20px,
      rgba(233,30,140,0.04) 40px
    );
  }

  .wc-features-inner {
    max-width: 1440px; margin: 0 auto; position: relative;
    display: grid; grid-template-columns: repeat(4, 1fr);
  }

  .wc-feature-cell {
    display: flex; align-items: center; gap: 14px; padding: 24px 20px;
    border-right: 1px solid rgba(233,30,140,0.15);
    transition: background 0.2s;
  }
  .wc-feature-cell:last-child { border-right: none; }
  .wc-feature-cell:hover { background: rgba(233,30,140,0.06); }

  .wc-feature-icon {
    width: 42px; height: 42px; border-radius: 50%;
    background: rgba(233,30,140,0.18); color: var(--pink-light);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    border: 1px solid rgba(233,30,140,0.25);
  }

  .wc-feature-cell h4 {
    font-family: 'Poppins', sans-serif; font-size: 0.8rem; font-weight: 600;
    color: white; margin-bottom: 2px;
  }
  .wc-feature-cell p {
    font-family: 'Poppins', sans-serif; font-size: 0.68rem;
    color: rgba(255,255,255,0.45); line-height: 1.5;
  }

  /* ════════════════════════════════
     TRUST BADGES
  ════════════════════════════════ */
  .wc-trust-strip {
    background: var(--gold-pale);
    border-top: 1px solid #f0dfa8;
    border-bottom: 1px solid #f0dfa8;
    padding: 16px 24px;
    display: flex; align-items: center; justify-content: center;
    gap: 40px; flex-wrap: wrap;
  }

  .wc-trust-item {
    display: flex; align-items: center; gap: 8px;
    font-family: 'Poppins', sans-serif; font-size: 0.72rem;
    font-weight: 500; color: var(--gold);
  }

  .wc-trust-item span { color: var(--text-muted); font-weight: 400; }

  /* ════════════════════════════════
     CATEGORY PRODUCT SECTIONS
  ════════════════════════════════ */
  .wc-cat-sections { background: var(--cream); }

  .wc-cat-section {
    padding: 56px 0 64px;
    border-bottom: 1px solid var(--border);
  }
  .wc-cat-section:nth-child(even) {
    background: white;
  }
  .wc-cat-section:last-child { border-bottom: none; }

  .wc-cat-section-inner {
    max-width: 1440px; margin: 0 auto; padding: 0 24px;
  }

  .wc-cat-section-head {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 28px; padding-bottom: 18px;
    border-bottom: 2px solid var(--border);
    position: relative;
  }

  .wc-cat-section-head::after {
    content: '';
    position: absolute; bottom: -2px; left: 0;
    width: 60px; height: 2px;
    background: linear-gradient(90deg, var(--pink), var(--gold));
    border-radius: 2px;
  }

  .wc-cat-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.3rem, 2.5vw, 1.75rem);
    font-weight: 500; color: var(--deep);
    letter-spacing: 0.3px;
  }

  .wc-cat-section-badge {
    display: inline-block;
    font-family: 'Poppins', sans-serif;
    font-size: 0.62rem; color: var(--pink);
    background: var(--pink-pale); border: 1px solid var(--border);
    border-radius: 20px; padding: 2px 10px; margin-left: 10px;
    font-weight: 500; vertical-align: middle;
  }

  .wc-cat-view-all {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--pink);
    border: 1.5px solid var(--pink);
    padding: 9px 22px; border-radius: 50px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif; font-size: 0.68rem;
    font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
    transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
  }
  .wc-cat-view-all:hover {
    background: var(--pink); color: white;
    box-shadow: 0 4px 16px rgba(233,30,140,0.3);
    gap: 12px;
  }

  .wc-cat-products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .wc-cat-products-grid > * {
    background: white;
  }

  .wc-cat-products-grid .product-card,
  .wc-cat-products-grid .uz-card {
    background: white !important;
  }

  .wc-cat-loading {
    display: flex; align-items: center; justify-content: center;
    padding: 60px; background: white;
    border: 1px solid var(--border); border-radius: 8px;
  }

  .wc-cat-empty {
    text-align: center; padding: 48px 20px;
    color: var(--text-muted);
    font-family: 'Poppins', sans-serif; font-size: 0.85rem;
    background: white; border: 1px solid var(--border); border-radius: 8px;
  }

  /* ════════════════════════════════
     INSTAGRAM CTA BLOCK
  ════════════════════════════════ */
  .wc-insta-block {
    background: linear-gradient(135deg, var(--pink-pale) 0%, var(--pink-soft) 100%);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    text-align: center; padding: 44px 24px;
  }

  .wc-insta-block p {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 2vw, 1.35rem);
    font-style: italic; color: var(--deep);
    margin-bottom: 14px; line-height: 1.6;
  }

  .wc-insta-handle {
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem; font-weight: 600;
    color: var(--pink); letter-spacing: 1px;
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 6px;
    transition: opacity 0.2s;
  }
  .wc-insta-handle:hover { opacity: 0.75; }

  /* ════════════════════════════════
     LOADING / EMPTY
  ════════════════════════════════ */
  .wc-loading {
    display: flex; align-items: center; justify-content: center;
    padding: 80px;
  }
  .wc-empty {
    text-align: center; padding: 64px 20px;
    color: var(--text-muted);
    font-family: 'Poppins', sans-serif; font-size: 0.9rem;
  }

  /* ════════════════════════════════
     RESPONSIVE
  ════════════════════════════════ */
  @media (max-width: 1024px) {
    .wc-cat-products-grid { grid-template-columns: repeat(3, 1fr); }
    .wc-features-inner { grid-template-columns: repeat(2, 1fr); }
    .wc-feature-cell:nth-child(2) { border-right: none; }
    .wc-feature-cell:nth-child(3),
    .wc-feature-cell:nth-child(4) { border-top: 1px solid rgba(233,30,140,0.12); }
  }
  @media (max-width: 768px) {
    .wc-slider-track { height: 360px; }
    .wc-slide-content { padding: 0 24px 40px; }
    .wc-cat-products-grid { grid-template-columns: repeat(2, 1fr); }
    .wc-hero-fallback { padding: 52px 24px; }
    .wc-cat-section { padding: 40px 0 48px; }
    .wc-trust-strip { gap: 20px; }
  }
  @media (max-width: 480px) {
    .wc-slider-track { height: 300px; }
    .wc-features-inner { grid-template-columns: repeat(2, 1fr); }
    .wc-feature-cell { padding: 16px 12px; gap: 10px; }
    .wc-cat-ring { width: 74px; height: 74px; }
    .wc-cat-section-title { font-size: 1.2rem; }
    .wc-cat-view-all { padding: 8px 16px; font-size: 0.62rem; }
  }
`;

// Marquee items
const MARQUEE_ITEMS = [
  '👗 New Arrivals', '💝 Best Quality', '🚚 Fast Delivery',
  '👜 Kurtis & Sets', '🌸 Sarees', '💳 Online Payment Only',
  '🎀 Budget Friendly', '✨ Women\'s Choice',
];

// Fetch products for a category
const useCategoryProducts = (categoryId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;
    setLoading(true);
    getProducts({ category: categoryId, sort: 'newest' })
      .then(r => setProducts(r.data.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [categoryId]);

  return { products, loading };
};

// Single category section
const CategorySection = ({ category, isEven }) => {
  const { products, loading } = useCategoryProducts(category.id);
  if (!loading && products.length === 0) return null;

  return (
    <section className="wc-cat-section" style={{ background: isEven ? 'white' : 'var(--cream)' }}>
      <div className="wc-cat-section-inner">
        <div className="wc-cat-section-head">
          <div>
            <h2 className="wc-cat-section-title">
              {category.name}
              {category.product_count > 0 && (
                <span className="wc-cat-section-badge">{category.product_count} items</span>
              )}
            </h2>
          </div>
          <Link to={`/products?category=${category.id}`} className="wc-cat-view-all">
            View All <ArrowRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className="wc-cat-loading"><div className="spinner" /></div>
        ) : (
          <div className="wc-cat-products-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
};

// ── MAIN HOME COMPONENT ──
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [settings, setSettings]     = useState({});
  const [loading, setLoading]       = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideTimer = useRef(null);

  const bannerSlides = (() => {
    try { return JSON.parse(settings.banner_slides || '[]'); }
    catch { return []; }
  })();

  const features = [
    { icon: <Truck size={18} />,     title: settings.feature1_title || 'Fast Delivery',      desc: settings.feature1_desc  || '5–10 working days to your door' },
    { icon: <Shield size={18} />,    title: settings.feature2_title || 'Secure Payment',     desc: settings.feature2_desc  || 'GPay, PhonePe, Paytm & more' },
    { icon: <Heart size={18} />,     title: settings.feature3_title || 'Genuine Products',   desc: settings.feature3_desc  || '99% best product delivered' },
    { icon: <Phone size={18} />,     title: settings.feature4_title || 'WhatsApp Support',   desc: settings.feature4_desc  || 'Message us for any queries' },
  ];

  useEffect(() => {
    Promise.all([getCategories(), getSettings()])
      .then(([c, s]) => {
        setCategories(c.data);
        const d = s.data?.shop_name !== undefined
          ? s.data
          : (s.data?.data || s.data || {});
        setSettings(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (bannerSlides.length > 1) {
      slideTimer.current = setInterval(
        () => setCurrentSlide(s => (s + 1) % bannerSlides.length),
        4500
      );
    }
    return () => clearInterval(slideTimer.current);
  }, [bannerSlides.length]);

  const prevSlide = () => {
    clearInterval(slideTimer.current);
    setCurrentSlide(s => (s - 1 + bannerSlides.length) % bannerSlides.length);
  };
  const nextSlide = () => {
    clearInterval(slideTimer.current);
    setCurrentSlide(s => (s + 1) % bannerSlides.length);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="wc-home">

        {/* ── HERO ── */}
        <section className="wc-hero">
          {bannerSlides.length > 0 ? (
            <div className="wc-slider-track">
              {bannerSlides.map((slide, i) => (
                <div
                  key={i}
                  className={`wc-slide ${i === currentSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="wc-slide-overlay" />
                  {(slide.title || slide.subtitle) && (
                    <div className="wc-slide-content">
                      {slide.subtitle && (
                        <span className="wc-slide-eyebrow">{slide.subtitle}</span>
                      )}
                      {slide.title && (
                        <h1 className="wc-slide-title">{slide.title}</h1>
                      )}
                      {slide.cta_label && slide.cta_link && (
                        <Link to={slide.cta_link} className="wc-slide-cta">
                          {slide.cta_label} <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {bannerSlides.length > 1 && (
                <>
                  <button className="wc-slider-arrow left" onClick={prevSlide}>
                    <ChevronLeft size={19} />
                  </button>
                  <button className="wc-slider-arrow right" onClick={nextSlide}>
                    <ChevronRight size={19} />
                  </button>
                  <div className="wc-slider-dots">
                    {bannerSlides.map((_, i) => (
                      <button
                        key={i}
                        className={`wc-dot ${i === currentSlide ? 'active' : ''}`}
                        onClick={() => { clearInterval(slideTimer.current); setCurrentSlide(i); }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="wc-hero-fallback">
              <div className="wc-hero-fallback-inner">
                <span className="wc-slide-eyebrow" style={{ color: 'var(--gold-light)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.65rem', letterSpacing: '5px', textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif' }}>
                  ✿ New Collection ✿
                </span>
                <h1 className="wc-slide-title" style={{ color: 'white', marginBottom: 18 }}>
                  {settings.hero_title || <>Style That <em>Speaks</em> to You</>}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Poppins, sans-serif', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: 32, maxWidth: 400 }}>
                  {settings.hero_subtitle || 'Kurtis, sarees, sets & more — curated for every Indian woman. Budget-friendly, always beautiful.'}
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Link to="/products" className="wc-slide-cta">
                    Shop Now <ArrowRight size={14} />
                  </Link>
                  <Link to="/orders" className="wc-hero-ghost-btn">Track Order</Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── MARQUEE STRIP ── */}
        <div className="wc-marquee-strip">
          <div className="wc-marquee-inner">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="wc-marquee-item">
                {item} <span className="wc-marquee-dot" />
              </span>
            ))}
          </div>
        </div>

        {/* ── TAGLINE BLOCK ── */}
        <div className="wc-tagline-block">
          <p className="wc-tagline-text">
            {settings.shop_tagline
              ? settings.shop_tagline
              : <><span>Women's Choice</span> — Where Style Meets <span>Comfort</span> 🌸</>
            }
          </p>
          <Link to="/products" className="wc-shop-btn">
            Explore Collection <ArrowRight size={14} />
          </Link>
        </div>

        {/* ── CATEGORY CIRCLES ── */}
        {categories.length > 0 && (
          <section className="wc-cats-section">
            <p className="wc-section-eyebrow">Browse</p>
            <h2 className="wc-section-title">Shop by Category</h2>
            <div className="wc-cats-inner">
              {categories.map(cat => (
                <Link key={cat.id} to={`/products?category=${cat.id}`} className="wc-cat-item">
                  <div className="wc-cat-ring">
                    {cat.image_url
                      ? <img src={cat.image_url} alt={cat.name} />
                      : <div className="wc-cat-initial">{cat.name.charAt(0)}</div>
                    }
                  </div>
                  <span className="wc-cat-label">{cat.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── FEATURES STRIP ── */}
        <section className="wc-features-strip">
          <div className="wc-features-inner">
            {features.map((f, i) => (
              <div key={i} className="wc-feature-cell">
                <div className="wc-feature-icon">{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TRUST BADGES ── */}
        <div className="wc-trust-strip">
          {[
            { icon: '✅', label: '8,900+ Happy Customers', sub: 'on Instagram' },
            { icon: '📦', label: '99% Best Products', sub: 'delivered safely' },
            { icon: '🌸', label: '3,700+ Products', sub: 'posted & sold' },
            { icon: '💬', label: 'WhatsApp Support', sub: '7010354442' },
          ].map((b, i) => (
            <div key={i} className="wc-trust-item">
              <span style={{ fontSize: '1.1rem' }}>{b.icon}</span>
              <div>
                <div>{b.label}</div>
                <span>{b.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── PRODUCT SECTIONS ── */}
        {loading ? (
          <div className="wc-loading"><div className="spinner" /></div>
        ) : categories.length === 0 ? (
          <div className="wc-empty">
            <p>No categories yet. Add some from the admin panel!</p>
          </div>
        ) : (
          <div className="wc-cat-sections">
            {categories.map((cat, index) => (
              <CategorySection key={cat.id} category={cat} isEven={index % 2 !== 0} />
            ))}
          </div>
        )}

        {/* ── INSTAGRAM CTA ── */}
        <div className="wc-insta-block">
          <p>Follow us for daily new arrivals & exclusive offers 💕</p>
          <a
            href="https://www.instagram.com/_womens_choice._/"
            target="_blank"
            rel="noopener noreferrer"
            className="wc-insta-handle"
          >
            📸 @_womens_choice._
          </a>
        </div>

      </div>
    </>
  );
};

export default Home;