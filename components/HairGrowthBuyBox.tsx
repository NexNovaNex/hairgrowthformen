import React, { useState } from 'react';

const pricing = {
  subscribe: {
    1: { price: 39, old: 59, percent: 34 },
    3: { price: 99, old: 177, percent: 44 },
    6: { price: 179, old: 354, percent: 49 }
  },
  once: {
    1: { price: 49, old: 59, percent: 17 },
    3: { price: 129, old: 177, percent: 27 },
    6: { price: 239, old: 354, percent: 32 }
  }
};

const checkoutLinks = {
  subscribe: {
    1: 'https://your-shopify-store.com/subscriptions/checkout/product1',
    3: 'https://your-shopify-store.com/subscriptions/checkout/product3',
    6: 'https://your-shopify-store.com/subscriptions/checkout/product6'
  },
  once: {
    1: 'https://your-shopify-store.com/cart/product1',
    3: 'https://your-shopify-store.com/cart/product3',
    6: 'https://your-shopify-store.com/cart/product6'
  }
};

const HairGrowthBuyBox = () => {
  const [mode, setMode] = useState<'subscribe' | 'once'>('subscribe');
  const [bottles, setBottles] = useState<1 | 3 | 6>(3);
  const priceData = pricing[mode][bottles as 1 | 3 | 6];
  const showSavings = priceData.percent > 0;

  const handleAddToCart = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        value: priceData.price,
        currency: 'USD',
        contents: [{ id: `${mode}-${bottles}`, quantity: 1 }],
        content_type: 'product',
      });
    }
  };

  return (
    <section id="pricing-section" className="w-full flex flex-col items-center bg-white py-8 md:py-16 px-2 md:px-4">
      <div className="max-w-3xl w-full mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-200 p-0 md:p-0">
        <div className="px-6 md:px-12 pt-8 pb-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2">Professional Hair Growth System</h2>
          <div className="text-lg text-blue-500 mb-4 font-semibold">Special Launch Offer</div>
          {/* Product Image */}
          <div className="flex justify-center mb-6">
            <img src="/microneedle-kit.jpg" alt="Hair Growth Microneedle Kit" className="w-32 h-40 md:w-40 md:h-52 object-contain rounded-xl shadow-lg border-4 border-blue-100 bg-white" width={128} height={160} />
          </div>
          {/* Toggle */}
          <div className="flex flex-col items-center mb-2">
            <div className="flex items-center gap-2 rounded-full p-1 border-2 border-blue-300 bg-white">
              <button
                id="buyOnceBtn"
                className={`buy-toggle px-6 py-2 rounded-full font-bold border-2 transition ${mode === 'once' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-blue-700 border-blue-300'}`}
                onClick={() => setMode('once')}
              >
                Buy Once
              </button>
              <button
                id="subscribeBtn"
                className={`buy-toggle px-6 py-2 rounded-full font-bold border-2 transition ${mode === 'subscribe' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-blue-700 border-blue-300'}`}
                onClick={() => setMode('subscribe')}
              >
                Subscribe & Save{priceData.percent > 0 ? ` ${priceData.percent}%` : ''}
              </button>
            </div>
            {/* Features/Benefits Box */}
            <div className="w-full max-w-lg mx-auto mt-2">
              <ul id="benefitsList" className="border-2 border-blue-200 bg-white rounded-xl px-6 py-4 grid grid-cols-1 gap-2 text-base font-medium shadow">
                <li className={`flex items-center justify-between gap-2 ${mode === 'once' ? 'line-through text-gray-400 opacity-60' : ''}`} data-benefit="discount">
                  <span className={`flex items-center gap-2 ${mode === 'once' ? 'text-gray-400' : 'text-green-600 font-bold'}`}>✔ 34% off for life</span>
                  <span className="line-through text-blue-400">$20</span>
                </li>
                <li className={`flex items-center justify-between gap-2 ${mode === 'once' ? 'line-through text-gray-400 opacity-60' : ''}`} data-benefit="guide">
                  <span className={`flex items-center gap-2 ${mode === 'once' ? 'text-gray-400' : 'text-blue-600'}`}>📱 <span className="font-bold">FREE</span> Hair Growth Progress App</span>
                  <span className="line-through text-blue-400">$25</span>
                </li>
                <li className={`flex items-center justify-between gap-2 ${mode === 'once' ? 'line-through text-gray-400 opacity-60' : ''}`} data-benefit="video">
                  <span className={`flex items-center gap-2 ${mode === 'once' ? 'text-gray-400' : 'text-blue-600'}`}>🎥 <span className="font-bold">FREE</span> Video Tutorial Series</span>
                  <span className="line-through text-blue-400">$29</span>
                </li>
                <li className={`flex items-center justify-between gap-2 ${mode === 'once' ? 'line-through text-gray-400 opacity-60' : ''}`} data-benefit="shipping">
                  <span className={`flex items-center gap-2 ${mode === 'once' ? 'text-gray-400' : 'text-blue-600'}`}>🚚 <span className="font-bold">FREE</span> Priority Shipping</span>
                  <span className="line-through text-blue-400">$9</span>
                </li>
                <li className={`flex items-center gap-2 ${mode === 'once' ? 'line-through text-gray-400 opacity-60' : ''}`} data-benefit="vip">
                  <span className={`flex items-center gap-2 ${mode === 'once' ? 'text-gray-400' : 'text-green-600 font-bold'}`}>✔ VIP Access to Hair Care Specialists</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Bottle Options */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
            {[1, 3, 6].map((n) => (
              <div
                key={n}
                id={`option${n}`}
                className={`bottle-option border-2 rounded-2xl p-6 text-center cursor-pointer transition relative ${bottles === n
                  ? 'border-blue-600 bg-blue-100 text-blue-900 shadow-lg'
                  : 'border-blue-300 bg-white text-blue-700 hover:shadow-lg'}`}
                onClick={() => setBottles(n as 1 | 3 | 6)}
              >
                {n === 3 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-300 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg border-2 border-yellow-400 z-10">MOST POPULAR</div>
                )}
                {n === 6 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-200 text-green-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg border-2 border-green-400 z-10">BEST VALUE</div>
                )}
                <div className="font-bold text-lg">{n} Kit{n > 1 ? 's' : ''}</div>
                <div className="mb-2">{n * 30} day supply</div>
                <div className="text-2xl font-extrabold mb-1 break-words md:text-2xl text-xl">
                  <span className="line-through text-gray-400 text-lg mr-1">${pricing[mode][n as 1 | 3 | 6].old}</span> <span id={`price${n}`}>${pricing[mode][n as 1 | 3 | 6].price}</span>
                </div>
                <div className="text-xs">Per {n > 1 ? 'Pack' : 'Kit'}</div>
              </div>
            ))}
          </div>
          {/* Savings Message */}
          {showSavings && (
            <div id="savingsMsg" className="bg-blue-100 border border-blue-300 rounded-xl px-4 py-2 mb-4 text-blue-700 font-semibold text-center text-base shadow">
              🎉 Congrats! You're saving <span id="savingsPercent">{priceData.percent}%</span>
            </div>
          )}
          {/* Add to Cart Button */}
          <a
            id="addToCartBtn"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full text-xl transition flex items-center justify-center gap-2 shadow-lg mt-2 mb-2"
            href={checkoutLinks[mode][bottles as 1 | 3 | 6]}
            onClick={handleAddToCart}
          >
            ADD TO CART - <span id="cartPrice">${priceData.price}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HairGrowthBuyBox; 