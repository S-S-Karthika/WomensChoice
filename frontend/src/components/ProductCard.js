import React from 'react';
import { Link } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Poppins:wght@300;400;500;600;700&display=swap');

  /* ── ROYAL CARD WRAPPER ── */
  .wc-card-outer {
    position: relative;
    padding: 8px;
    margin: 4px;
  }

  /* Four corner ornament pieces */
  .wc-corner {
    position: absolute;
    width: 28px;
    height: 28px;
    z-index: 10;
    pointer-events: none;
  }
  .wc-corner.tl { top: 0;    left: 0; }
  .wc-corner.tr { top: 0;    right: 0;  transform: scaleX(-1); }
  .wc-corner.bl { bottom: 0; left: 0;   transform: scaleY(-1); }
  .wc-corner.br { bottom: 0; right: 0;  transform: scale(-1); }

  /* ── MAIN CARD ── */
  .wc-card {
    background: #fffaf6;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: box-shadow 0.25s, transform 0.25s;
    /* Notched / chamfered corners — royal diamond cut */
    clip-path: polygon(
      0%      20px,
      10px    8px,
      20px    0%,
      calc(100% - 20px) 0%,
      calc(100% - 10px) 8px,
      100%    20px,
      100%    calc(100% - 20px),
      calc(100% - 10px) calc(100% - 8px),
      calc(100% - 20px) 100%,
      20px    100%,
      10px    calc(100% - 8px),
      0%      calc(100% - 20px)
    );
    outline: 1.5px solid rgba(233,30,140,0.2);
    outline-offset: -1px;
  }

  .wc-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 36px rgba(233,30,140,0.2);
    outline-color: rgba(233,30,140,0.55);
  }

  /* ── IMAGE ── */
  .wc-card-img-wrap {
    position: relative;
    overflow: hidden;
    aspect-ratio: 3/4;
    background: #fff0f7;
  }

  .wc-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.55s ease;
    display: block;
  }

  .wc-card:hover .wc-card-img-wrap img { transform: scale(1.05); }

  .wc-card-no-img {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e91e8c;
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    background: linear-gradient(135deg, #fff0f7, #fce4f3);
  }

  /* Sale badge */
  .wc-card-badge {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background: linear-gradient(135deg, #e91e8c, #c4006e);
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 50px;
    box-shadow: 0 3px 10px rgba(233,30,140,0.4);
    z-index: 4;
  }

  /* Dispatch badge */
  .wc-card-dispatch {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(6px);
    color: #c9922a;
    font-family: 'Poppins', sans-serif;
    font-size: 0.56rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 50px;
    border: 1px solid #f0d6e8;
    z-index: 4;
  }

  /* ── BODY ── */
  .wc-card-body {
    padding: 12px 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    background: #fffaf6;
    border-top: 1.5px solid #f0d6e8;
    position: relative;
  }

  /* Gold diamond divider at top of body */
  .wc-card-body::before {
    content: '✦';
    position: absolute;
    top: -9px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.68rem;
    color: #c9922a;
    background: #fffaf6;
    padding: 0 5px;
    line-height: 1;
  }

  .wc-card-name {
    font-family: 'Poppins', sans-serif;
    font-size: 0.83rem;
    font-weight: 500;
    color: #2d0a1e;
    line-height: 1.45;
    text-decoration: none;
    transition: color 0.2s;
    text-align: center;
  }

  .wc-card-name:hover { color: #e91e8c; }

  .wc-card-prices {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .wc-card-original {
    font-family: 'Poppins', sans-serif;
    font-size: 0.75rem;
    color: #8a6070;
    text-decoration: line-through;
  }

  .wc-card-sale {
    font-family: 'Poppins', sans-serif;
    font-size: 0.88rem;
    color: #e91e8c;
    font-weight: 700;
  }

  .wc-card-price {
    font-family: 'Poppins', sans-serif;
    font-size: 0.88rem;
    color: #2d0a1e;
    font-weight: 700;
    text-align: center;
  }

  .wc-card-options-btn {
    margin-top: 6px;
    width: 100%;
    padding: 9px 16px;
    background: transparent;
    border: 1.5px solid #e91e8c;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #e91e8c;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  }

  .wc-card-options-btn:hover {
    background: linear-gradient(135deg, #e91e8c, #c4006e);
    color: white;
    border-color: transparent;
    box-shadow: 0 4px 14px rgba(233,30,140,0.35);
  }

  .wc-card-oos {
    font-family: 'Poppins', sans-serif;
    font-size: 0.65rem;
    color: #8a6070;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-top: 2px;
    font-weight: 500;
    text-align: center;
  }
`;

/* Royal corner SVG ornament */
const CornerOrnament = () => (
  <svg
    width="28" height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer bracket */}
    <path
      d="M2 22 L2 6 Q2 2 6 2 L22 2"
      stroke="#e91e8c"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
      opacity="0.65"
    />
    {/* Inner bracket */}
    <path
      d="M6 18 L6 8 Q6 6 8 6 L18 6"
      stroke="#c9922a"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="2 2"
      fill="none"
      opacity="0.7"
    />
    {/* Corner jewel dot */}
    <circle cx="5" cy="5" r="2" fill="#c9922a" opacity="0.85" />
    <circle cx="5" cy="5" r="1" fill="#e8b84b" opacity="1" />
  </svg>
);

let stylesInjected = false;

const ProductCard = ({ product }) => {
  if (!stylesInjected) {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    stylesInjected = true;
  }

  const hasDiscount = product.original_price && parseFloat(product.original_price) > parseFloat(product.price);

  return (
    <div className="wc-card-outer">
      {/* Royal corner ornaments at all 4 corners */}
      <span className="wc-corner tl"><CornerOrnament /></span>
      <span className="wc-corner tr"><CornerOrnament /></span>
      <span className="wc-corner bl"><CornerOrnament /></span>
      <span className="wc-corner br"><CornerOrnament /></span>

      <div className="wc-card">
        <div className="wc-card-img-wrap">
          {product.image_url
            ? <img src={product.image_url} alt={product.name} loading="lazy" />
            : <div className="wc-card-no-img">{product.name?.charAt(0)}</div>
          }
          {product.stock > 0 && (
            <span className="wc-card-dispatch">Immediate Dispatch</span>
          )}
          {hasDiscount && <span className="wc-card-badge">🏷️ Sale</span>}
        </div>

        <div className="wc-card-body">
          <Link to={`/products/${product.id}`} className="wc-card-name">
            {product.name}
          </Link>

          <div className="wc-card-prices">
            {hasDiscount ? (
              <>
                <span className="wc-card-original">
                  Rs. {parseFloat(product.original_price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                <span className="wc-card-sale">
                  Rs. {parseFloat(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </>
            ) : (
              <span className="wc-card-price">
                Rs. {parseFloat(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>

          {product.stock === 0 ? (
            <span className="wc-card-oos">Out of stock</span>
          ) : (
            <Link to={`/products/${product.id}`} className="wc-card-options-btn">
              Choose options
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;