import React, { useState } from 'react';

const pricing = {
  subscribe: {
    2: { price: 79, old: 218, percent: 64 },
    4: { price: 129, old: 436, percent: 70 },
    6: { price: 169, old: 654, percent: 74 }
  },
  once: {
    2: { price: 109, old: 218, percent: 50 },
    4: { price: 169, old: 436, percent: 61 },
    6: { price: 229, old: 654, percent: 65 }
  }
};

const checkoutLinks = {
  subscribe: {
    2: '#',
    4: '#',
    6: '#'
  },
  once: {
    2: '#',
    4: '#',
    6: '#'
  }
};

const BuyBox = () => {
  const [mode, setMode] = useState<'subscribe' | 'once'>('subscribe');
  const [bottles, setBottles] = useState<2 | 4 | 6>(4);
  const priceData = pricing[mode][bottles as 2 | 4 | 6];
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
      <div className="max-w-3xl w-full mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-green-50 via-white to-green-50 border-2 border-green-200 p-0 md:p-0">
        <div className="px-6 md:px-12 pt-8 pb-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-2">Hair Regrowth System</h2>
          <div className="text-lg text-green-500 mb-4 font-semibold">Limited Time Offer</div>
          {/* Product Image */}
          <div className="flex justify-center mb-6">
            <img src="/bottle-placeholder.jpg" alt="Knox Hair Regrowth System" className="w-48 h-56 md:w-64 md:h-80 object-contain rounded-xl shadow-lg border-4 border-green-100 bg-white" width={256} height={320} />
          </div>
          {/* Toggle */}
          <div className="flex flex-col items-center mb-2">
            <div className="flex items-center gap-2 rounded-full p-1 border-2 border-green-300 bg-white">
              <button
                id="buyOnceBtn"
                className={`buy-toggle px-6 py-2 rounded-full font-bold border-2 transition ${mode === 'once' ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-green-700 border-green-300'}`}
                onClick={() => setMode('once')}
              >
                Buy Once
              </button>
              <button
                id="subscribeBtn"
                className={`buy-toggle px-6 py-2 rounded-full font-bold border-2 transition ${mode === 'subscribe' ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-green-700 border-green-300'}`}
                onClick={() => setMode('subscribe')}
              >
                Subscribe & Save{priceData.percent > 0 ? ` ${priceData.percent}%` : ''}
              </button>
            </div>
            {/* Features/Benefits Box */}
            <div className="w-full max-w-lg mx-auto mt-2">
              <ul id="benefitsList" className="border-2 border-green-200 bg-white rounded-xl px-6 py-4 grid grid-cols-1 gap-2 text-base font-medium shadow">
                <li className="flex items-center justify-between gap-2" data-benefit="ebook">
                  <span className="flex items-center gap-2 text-green-600">📚 <span className="font-bold">FREE</span> Ebook on Hair Growth For Men</span>
                  <span className="line-through text-green-400">$19</span>
                </li>
                <li className="flex items-center justify-between gap-2" data-benefit="brush">
                  <span className="flex items-center gap-2 text-green-600">🧴 <span className="font-bold">FREE</span> Massager Brush</span>
                  <span className="line-through text-green-400">$29</span>
                </li>
                <li className="flex items-center justify-between gap-2" data-benefit="needle">
                  <span className="flex items-center gap-2 text-green-600">💉 <span className="font-bold">FREE</span> Extra Micro Precision Needle</span>
                  <span className="line-through text-green-400">$29</span>
                </li>
                <li className="flex items-center justify-between gap-2" data-benefit="shipping">
                  <span className="flex items-center gap-2 text-green-600">🚚 <span className="font-bold">FREE</span> Priority Shipping</span>
                  <span className="line-through text-green-400">$9</span>
                </li>
                <li className="flex items-center gap-2 text-green-600 font-bold" data-benefit="guarantee">
                  <span>✔ 90 Day Money Back Guarantee</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Bottle Options */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
            {[2, 4, 6].map((n) => (
              <div
                key={n}
                id={`option${n}`}
                className={`bottle-option border-2 rounded-2xl p-6 text-center cursor-pointer transition relative ${bottles === n
                  ? 'border-green-600 bg-green-100 text-green-900 shadow-lg'
                  : 'border-green-300 bg-white text-green-700 hover:shadow-lg'}`}
                onClick={() => setBottles(n as 2 | 4 | 6)}
              >
                {n === 4 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-300 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg border-2 border-yellow-400 z-10">MOST POPULAR</div>
                )}
                {n === 6 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-200 text-green-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg border-2 border-green-400 z-10">BEST VALUE</div>
                )}
                <div className="font-bold text-lg">{n} Months Supply</div>
                <div className="text-2xl font-extrabold mb-1 break-words md:text-2xl text-xl">
                  <span className="line-through text-gray-400 text-lg mr-1">${pricing[mode][n as 2 | 4 | 6].old}</span> <span id={`price${n}`}>${pricing[mode][n as 2 | 4 | 6].price}</span>
                </div>
                <div className="text-xs">Per Pack</div>
              </div>
            ))}
          </div>
          {/* Savings Message */}
          {showSavings && (
            <div id="savingsMsg" className="bg-green-100 border border-green-300 rounded-xl px-4 py-2 mb-4 text-green-700 font-semibold text-center text-base shadow">
              🎉 You're saving <span id="savingsPercent">{priceData.percent}%</span> + Getting $86 in FREE Gifts
            </div>
          )}
          {/* Add to Cart Button */}
          <a
            id="addToCartBtn"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-full text-xl transition flex items-center justify-center gap-2 shadow-lg mt-2 mb-2"
            href={checkoutLinks[mode][bottles as 2 | 4 | 6]}
            onClick={handleAddToCart}
          >
            ADD TO CART - <span id="cartPrice">${priceData.price}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BuyBox; 
