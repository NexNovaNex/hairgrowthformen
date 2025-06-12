'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Playfair_Display, Inter } from 'next/font/google'
import Image from 'next/image'
import BuyBox from '../components/BuyBox';

// Add this TypeScript declaration at the top, after imports
// @ts-ignore
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Page() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 22 * 60 + 33); // 2h 22m 33s in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  function formatTime(secs: number) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const loadTally = () => {
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          if (window.Tally) {
            // @ts-ignore
            window.Tally.loadEmbeds();
          }
        };
        document.body.appendChild(script);
      }
    };

    loadTally();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900">
      <div className="bg-gradient-to-r from-slate-50 to-white">
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center gap-8 px-4 md:px-8 pt-8 md:pt-16 pb-8 md:pb-24">
          {/* Left: Text Content */}
          <div className="flex-1 max-w-xl">
            <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900`}>
              Sick of Watching Your Hairline Fade? <span className="text-gray-900 font-extrabold">The Daily Stress, Mirror Avoidance, and That Gut-Punch Feeling When Nothing Works… Yeah, We've Been There.</span>… We Get It.
            </h1>
            
            {/* Product Image - Only visible on mobile */}
            <div className="flex md:hidden justify-center mb-6">
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-2">
                <Image src="/OG1-placeholder.jpg" alt="Person holding product" className="w-[340px] h-[420px] object-cover rounded-xl" width={340} height={420} />
              </div>
            </div>

            <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
              <span className="text-lg">🧠</span>
              The First System Built to Fix Hair Loss at the Root
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-slate-200">
                <span className="text-2xl mt-1">🔬</span>
                <div>
                  <div className="font-semibold text-gray-900">Engineered for Real Male Pattern Baldness*</div>
                  <div className="text-gray-500 text-sm">Targets the hormonal overload and follicle damage — not just patch it up.</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-slate-200">
                <span className="text-2xl mt-1">⚙️</span>
                <div>
                  <div className="font-semibold text-gray-900">Built for Lasting Regrowth</div>
                  <div className="text-gray-500 text-sm">Long-lasting freshness, no matter how active your day.</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-slate-200">
                <span className="text-2xl mt-1">💪</span>
                <div>
                  <div className="font-semibold text-gray-900">Confidence You Can Feel Again</div>
                  <div className="text-gray-500 text-sm">Feel fresh, clean, and confident all day long</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-slate-200">
                <span className="text-2xl mt-1">🛠️</span>
                <div>
                  <div className="font-semibold text-gray-900">Total Root Repair</div>
                  <div className="text-gray-500 text-sm">Blocks DHT, shuts down PGD₂, and fuels your scalp with what it's been starving for.</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 text-slate-700 font-semibold text-center">
            Take Back Control<br/>
              <span className="text-slate-600 font-normal">No more hiding. No more second-guessing. Just you — with your edge back.</span>
            </div>
            <div className="text-xs text-gray-400 mb-4">Backed by real science on scalp biology, hormone control, and follicle recovery.</div>
            <div className="flex justify-center mb-6">
              <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg transition w-full md:w-auto" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>Start Your Hair Re-growth Journey Today</button>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 items-center justify-center md:justify-center mt-2">
              <div className="flex items-center gap-1"><span className="text-lg">🧬</span> Science-Based Formula</div>
              <div className="flex items-center gap-1"><span className="text-lg">🌿</span> Powered by Nature</div>
              <div className="flex items-center gap-1"><span className="text-lg">🛡️</span> No Harsh Chemicals</div>
              <div className="flex items-center gap-1"><span className="text-lg">⚡</span> Microneedle Delivery System</div>
            </div>
          </div>

          {/* Right: Image - Only visible on desktop */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-2">
              <Image src="/OG1-placeholder.jpg" alt="Person holding product" className="w-[440px] h-[520px] object-cover rounded-xl" width={440} height={520} />
            </div>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Confidence with Knox</h2>
          <p className="text-center text-gray-600 mb-8">"See how real guys dealing with hair loss are finally getting their confidence — and identity — back. No pills. No fluff. Just results that feel real.</p>
          <div className="flex flex-col gap-4 mb-8">
            {/* Review 1 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile1.jpg" alt="Tasha P." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Mark T..</div>
                <div className="text-gray-700 text-sm">I stopped looking in mirrors. Not out of denial — just because I hated what I saw. Two weeks into Knox and for the first time in years, I actually liked my reflection. That hit harder than I expected.</div>
              </div>
            </div>
            {/* Review 2 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile2.jpg" alt="Marie S." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Jason M.</div>
                <div className="text-gray-700 text-sm">I tried everything. Serums, shampoos, Reddit "hacks." Nothing lasted. Knox is the first thing that made my scalp feel healthy — like it wasn't fighting me anymore. That alone was a win.</div>
              </div>
            </div>
            {/* Review 3 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile3.jpg" alt="Maya R." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Chris R.</div>
                <div className="text-gray-700 text-sm">It's not just about regrowth. It's about not thinking about it all day. I wore a hat for five years straight — now I forget I even have one. That's what Knox gave me. Headspace.</div>
              </div>
            </div>
            {/* Review 4 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile4.jpg" alt="Elise M." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Eli K.</div>
                <div className="text-gray-700 text-sm">Why does no one talk about this stuff honestly? Everyone just says, "Shave it." But Knox actually made me feel like I had a shot again. Like I wasn't broken — just needed the right fix.</div>
              </div>
            </div>
            {/* Review 5 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile5.jpg" alt="Shannon R." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Sean D.</div>
                <div className="text-gray-700 text-sm">It wasn't overnight. But it was steady. And one day, I realized I wasn't hiding from pictures anymore. Wasn't cropping out my forehead. Knox gave me that version of me back — the one I thought was gone.</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg transition" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>Reclaim Your Confidence</button>
          </div>
        </div>
      </section>
      {/* Founder Story Section */}
      <section className="w-full flex justify-center bg-slate-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-start">
          {/* Left: Story */}
          <div className="flex-1 min-w-0 flex flex-col items-start md:items-start">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/founder-avatar.jpg" alt="Lina founder avatar" className="w-12 h-12 rounded-full object-cover border-2 border-slate-300" width={48} height={48} />
              <span className="text-lg font-semibold text-slate-700">Hey, I'm Jack — I'm the one who started <span className='text-slate-600 font-bold'>Knox.</span></span>
            </div>
            <div className="text-gray-700 mb-4">
            Not because I set out to build a brand… but because I hit a breaking point.<br/><br/>
              For years, I thought I was just being dramatic about my hair.<br/><br/>
              I figured it was normal. Genetic. Part of getting older.<br/><br/>
              But the mirror told a different story — and it was brutal.<br/><br/>
              At first, it was just a little thinning.<br/><br/>
              Then it became constant scalp checks. Obsessing. Comparing. Avoiding eye contact.<br/><br/>
              It felt like I was disappearing… strand by strand..<br/><br/>
            </div>
            <div className="bg-white border-l-4 border-slate-400 rounded-r-xl p-2 md:p-4 mb-4 text-slate-700 font-medium shadow">
            I tried everything — oils, shampoos, Reddit stacks, even Minoxidil..
            </div>
            <div className="text-gray-700 mb-4">
            Some things helped… for a week. But left side effects and my mood changed. Most just made me feel more hopeless.<br/><br/>
              <ul className="list-none pl-0 mb-4">
                <li className="flex items-center gap-2 text-slate-600 font-medium"><span className="text-xl">✗</span> I avoided photos</li>
                <li className="flex items-center gap-2 text-slate-600 font-medium"><span className="text-xl">✗</span> I wore hats every day — even indoors</li>
                <li className="flex items-center gap-2 text-slate-600 font-medium"><span className="text-xl">✗</span> I stopped flirting and going on dates</li>
                <li className="flex items-center gap-2 text-slate-600 font-medium"><span className="text-xl">✗</span> I felt like I didn't recognize myself anymore</li>
              </ul>
              And then one night, while scrolling Reddit at 2am…
              I saw this guy say, "It's not your hair. It's the environment it's trying to grow in."
              That hit me. Hard.
            </div>
          </div>
          {/* Right: Before/After */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center md:items-center">
            <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-xs mx-auto">
              <Image src="/before-after.jpg" alt="PCOS Hair Transformation" className="rounded-xl w-full object-cover mb-2" width={400} height={300} />
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Before<br/>3 months ago</span>
                <span>After<br/>Today</span>
              </div>
              <div className="text-center text-slate-700 font-semibold text-sm">My Hair Transformation</div>
              <div className="text-center text-gray-500 text-xs">After just 12 weeks using Knox</div>
            </div>
          </div>
        </div>
      </section>
      {/* Root Causes Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">And Just Like That… It Finally Made Sense</h2>
          <p className="text-center text-blue-800 font-medium mb-8">Turns out my hair loss wasn't just "bad genetics" or "getting older."
          It was the result of a perfect storm happening under the surface: <span className="italic">cause…</span></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🧬</span>
              <div>
                <div className="font-bold text-slate-700 mb-1">DHT Overload</div>
                <div className="text-gray-700 text-sm">Your body turns testosterone into DHT — a hormone that clings to your follicles and slowly shuts them down.</div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🚫</span>
              <div>
                <div className="font-bold text-blue-800 mb-1">PGD₂ Overproduction</div>
                <div className="text-gray-700 text-sm">This chemical builds up in the scalp and acts like a "stop sign" — telling your hair to stop growing.</div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🩸</span>
              <div>
                <div className="font-bold text-orange-700 mb-1">Low Blood Flow to Follicles</div>
                <div className="text-gray-700 text-sm">As follicles shrink, they get less oxygen and nutrients — so even healthy hairs can't survive.</div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🔥</span>
              <div>
                <div className="font-bold text-purple-700 mb-1">Inflamed, Starved Scalp
                <div className="text-gray-700 text-sm">Years of stress, inflammation, and nutrient loss create a hostile environment where hair can't grow — no matter what you put on it.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border-l-4 border-slate-400 rounded-r-xl p-2 md:p-4 mb-4 text-slate-700 font-bold mb-4">
          That's when I realized: It wasn't about more shampoo. It was about fixing the system that grows the hair in the first place.
        </div>
        <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="italic text-2xl md:text-3xl text-slate-800 font-bold mb-4">For the first time, I understood why nothing ever worked: Every product I tried was treating the symptom — not the system. It wasn't about the hair I lost. It was about why my scalp stopped supporting growth in the first place.</div>
            <div className="text-gray-700">
            So after that Reddit comment, I went full rabbit hole mode. PubMed. YouTube derms. Trichology blogs. Forum debates. 2AM deep dives. I became obsessed with one question: What actually helps guys like me?
            </div>
            <div className="text-gray-700">
            Some talked about blocking DHT. Others swore by circulation boosters. One guy said caffeine only works if you also microneedle. Another broke down PGD₂ like it was a villain in a Marvel movie.
            </div>
            <div className="text-gray-700">
            So after that Reddit comment, I went full rabbit hole mode. PubMed. YouTube derms. Trichology blogs. Forum debates. 2AM deep dives. I became obsessed with one question: What actually helps guys like me?
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/founder-avatar.jpg" alt="Root cause research" className="rounded-2xl shadow-lg w-full max-w-xs object-cover" width={320} height={320} />
          </div>
        </div>
      </section>
      {/* Key Ingredients Section */}
      <section className="w-full flex flex-col items-center bg-purple-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-2">I Kept Seeing the Same Ingredients — Over and Over — And It Finally Clicked</h2>
          <p className="text-center text-purple-700 mb-10">These weren't trendy shampoo swaps or influencer "hair hacks."
They were grounded in real biology — and built for guys like me, the ones who were tired of wasting money on stuff that never reached the root. Saw Palmetto. Caffeine. Apigenin. Microneedling. Not magic — but mechanisms. Not hype — but hormones, blood flow, and scalp repair.

That's when it hit me: It wasn't about forcing hair to grow. It was about rebuilding the place it grows from.
</p>
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
            {/* Saw Palmetto */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-saw-palmetto.jpg" alt="Paeoniae Radix (Bai Shao)" className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-2 md:mb-4 border-4 border-purple-200" width={96} height={96} />
              <div className="font-bold text-purple-800 mb-1">Saw Palmetto</div>
              <div className="text-gray-700 text-sm">🧬 Blocks 5α-reductase — the enzyme that converts testosterone into DHT, the main hormone responsible for shrinking hair follicles</div>
            </div>
            {/* Myo + D-Chiro Inositol */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-inositol.jpg" alt="L-Tyrosine" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Caffeine</div>
              <div className="text-gray-700 text-sm">⚡⚡Protects follicles by reducing DHT binding, while stimulating root-level circulation to help "wake up" dormant growth zones.</div>
            </div>
            {/* Berberine */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-berberine.jpg" alt="Angelica sinensis (Dang Gui)" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Apigenin</div>
              <div className="text-gray-700 text-sm">🛑 Interrupts PGD₂ — the chemical "stop sign" that tells hair to stop growing. Also acts as a powerful antioxidant and inflammation reducer..</div>
            </div>
            {/* Curcumin */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-curcumin.jpg" alt="Ligusticum chuanxiong" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Adenosineg</div>
              <div className="text-gray-700 text-sm">🔁 Stimulates dermal papilla cells (key to hair growth cycle), improving hair thickness and pushing follicles back into the active growth phase.</div>
            </div>
            {/* Zinc */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-zinc.jpg" alt="Bupleurum (Chai Hu)" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Ginseng (Panax)</div>
              <div className="text-gray-700 text-sm">💉 Enhances blood flow to the scalp, delivering more oxygen and nutrients directly to struggling follicles.</div>
            </div>
            {/* New Ingredient */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-placeholder.jpg" alt="Poria (Fu Ling)" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Biotin </div>
              <div className="text-gray-700 text-sm">🔩 Supports keratin infrastructure, strengthening hair from the inside out and helping reinforce the structure of new strands.</div>
            </div>
          </div>
        </div>
      </section>
      {/* System Failure & Solution Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-center">
          {/* Left: Text */}
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">It stopped feeling like bad luck… and started feeling like a system failure. That was the moment everything shifted.</div>
            <div className="text-gray-700 mb-4">No one had actually connected the dots. Everything out there felt like guesswork — underdosed, generic, or completely blind to what was really causing hair loss in the first place.</div>
            <div className="text-2xl font-bold text-purple-700 italic mb-2">So I decided to build it myself</div>
            <div className="text-gray-700 mb-4">I partnered with a clinical formulation lab. Spent months buried in research. Talking to dermatologists, trichologists, and endocrinologists. Refining the formula. Scrapping it. Starting over. Again and again. Not because I wanted to launch a brand. Because I needed something that actually worked.</div>
            <div className="text-gray-700">But a formula alone wasn't enough. If the ingredients can't get past the scalp barrier, they never reach the follicle zone. That's why Knox uses microneedling — not just to deliver deeper, but to wake up blood flow and jumpstart regrowth from the inside out.</div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-center">
            <Image src="/root-cause-.jpg" alt="I got this" className="rounded-xl w-full max-w-xs object-cover" width={320} height={320} />
          </div>
        </div>
      </section>
      {/* What Makes Knox Different Section */}
      <section className="w-full flex flex-col items-center bg-slate-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">What Makes Knox Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Not built for the masses */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">✅</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Not built for the "just shave it" crowd</div>
                <div className="text-gray-600 text-sm">Knox was made for guys who've tried everything — and still can't look in the mirror without flinching.</div>
              </div>
            </div>
            {/* Not another gimmick */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">❌</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Not another copy-paste serum</div>
                <div className="text-gray-600 text-sm">No fluff. No filler. Just proven ingredients that target the real root causes of hair loss — DHT, PGD₂, inflammation, and blood flow.</div>
              </div>
            </div>
            {/* Not for people who've never been dismissed by doctors */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">🧠</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Not for guys who've never obsessed over their hairline</div>
                <div className="text-gray-600 text-sm">This is for the ones who've tracked every strand, compared every photo, and still felt dismissed by "experts."</div>
              </div>
            </div>
            {/* Created because nothing else worked */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">🛠️</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Created because nothing else actually fixed it</div>
                <div className="text-gray-600 text-sm">Knox wasn't born in a boardroom. It was built out of frustration, science, and a refusal to keep wasting time on false promises.</div>
              </div>
            </div>
          </div>
          {/* Made for us — not them */}
          <div className="flex items-start gap-3 mt-8">
            <span className="text-2xl mt-1">🔒</span>
            <div>
              <div className="font-bold text-gray-900 mb-1">Made for us — not them</div>
              <div className="text-gray-600 text-sm">For the ones who stopped going out, avoided old friends, and still believe it's not too late to take back control.</div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Introduction Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-center">
          {/* Left: Product Image and Badges */}
          <div className="flex-1 flex flex-col items-center md:items-start relative mb-8 md:mb-0 w-full">
            <div className="w-full text-center mb-4">
              <span className="text-2xl align-middle">🔥</span>
              <span className="text-purple-700 font-extrabold text-lg sm:text-xl md:text-2xl align-middle ml-2">Introducing...</span>
            </div>
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center mb-2 mx-auto">
              <Image src="/bottle-placeholder.jpg" alt="Product bottle" className="w-full h-auto object-contain rounded-xl" width={320} height={400} />
              <span className="absolute top-3 right-3 bg-pink-200 text-pink-700 text-xs font-bold px-3 py-1 rounded-full shadow">Limited Supply</span>
            </div>
          </div>
          {/* Right: Product Details */}
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Just One Serum + Microneedle, Once a Week</div>
            <div className="text-blue-600 font-semibold text-lg mb-2">Target the Real Root Causes of Hair Loss — and Finally See Growth That Lasts</div>
            <div className="text-gray-700 mb-3">This isn't another shampoo. It's not a placebo spray. It's a system designed to go beneath the surface — where the real damage is happening.
            Knox works by restoring the broken signals in your scalp: Blocking DHT. Interrupting PGD₂. Recharging blood flow. All delivered through precision microneedling — so it actually gets where it needs to go.</div>
            <div className="italic text-gray-600 mb-6">Formulated by real people who've lived through the hair loss spiral. Built for those who are still in it — and ready to fight back.</div>
            <button
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-full text-lg transition mb-2 flex items-center justify-center gap-2 shadow text-center"
              onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              SUBSCRIBE & SAVE <span>🛒</span>
            </button>
            <div className="flex gap-6 mt-2">
              <div className="flex items-center gap-2 text-blue-600 text-sm"><span>●</span> 60-Day Money Back Guarantee</div>
              <div className="flex items-center gap-2 text-blue-600 text-sm"><span>●</span> Free Shipping</div>
            </div>
          </div>
        </div>
      </section>
      {/* Transformation Experience Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Here's What You'll Feel With <span className='text-blue-600'>Knox</span></h2>
          <div className="text-center text-gray-500 text-sm mb-8">(Not hype. Just what the science — and real guys — keep saying.)</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {/* Peaceful Showers Again */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">🪞</span>
              <div className="font-bold text-slate-700 mb-1">Mirror Relief</div>
              <div className="text-gray-700 text-sm">You'll catch your reflection… and not flinch. No more scanning the hairline in dread.</div>
            </div>
            {/* Full, Feminine Hair */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">🧠</span>
              <div className="font-bold text-slate-700 mb-1">Mental Clarity</div>
              <div className="text-gray-700 text-sm">When you're not obsessing over every shed hair, you can finally focus on life again.</div>
            </div>
            {/* Mirror Moments */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">🧬</span>
              <div className="font-bold text-slate-700 mb-1">Scalp Feels Alive Again</div>
              <div className="text-gray-700 text-sm">Less tension. Better blood flow. The surface feels healthier — because it is.</div>
            </div>
            {/* Self-Love Again */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">📸</span>
              <div className="font-bold text-slate-700 mb-1">Photos Without the Hat</div>
              <div className="text-gray-700 text-sm">You stop reaching for the cap. You stop dodging photos. You start showing up again.</div>
            </div>
            {/* Made for PCOS Warriors */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">🔁</span>
              <div className="font-bold text-slate-700 mb-1">Steady Progress</div>
              <div className="text-gray-700 text-sm">Hair doesn't just grow — the whole environment changes. And it feels less like hope… more like momentum.</div>
            </div>
            {/* Dating Confidence */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">🛠️</span>
              <div className="font-bold text-slate-700 mb-1">Made for Hair Loss Sufferers</div>
              <div className="text-gray-700 text-sm">This isn't for everyone. It's for the ones who were dismissed, mocked, or told "just shave it." Knox was made for us.</div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg transition shadow" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>RECLAIM YOUR CONFIDENCE</button>
          </div>
        </div>
      </section>
      {/* Knox Transformation Journey Section */}
      <section className="w-full flex flex-col items-center bg-slate-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-2">Your Hair Growth Journey</h2>
          <div className="text-center text-gray-600 mb-10">This isn't instant. But it's real. Here's what starts to shift as your body learns how to feel confident again.</div>
          <div className="flex flex-col gap-8 mb-8">
            {/* Day 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-slate-500 text-white rounded-full flex items-center justify-center font-bold mb-1">1</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Day 1</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">YYou apply your first microneedling session. - You won't see it yet, but your scalp is already more receptive — and active ingredients are finally reaching the follicle zone.</div>
              </div>
            </div>
            {/* Week 2 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-slate-500 text-white rounded-full flex items-center justify-center font-bold mb-1">2</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Week 2</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">Your scalp feels less irritated. Less oily. - There's a subtle shift — your hair looks the same, but the environment underneath? Starting to change.</div>
              </div>
            </div>
            {/* Month 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-slate-500 text-white rounded-full flex items-center justify-center font-bold mb-1">3</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Month 1</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">You're shedding less in the shower. - You catch yourself not checking your hair every five minutes. One mirror glance didn't wreck your morning — for the first time in a long time.</div>
              </div>
            </div>
            {/* Month 3 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-slate-500 text-white rounded-full flex items-center justify-center font-bold mb-1">4</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Month 3</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">You notice fine hairs at the front. Or maybe in that one thinning patch. More importantly? You feel like you again — walking out the door without a hat. And not thinking twice about it.</div>
              </div>
            </div>
            {/* Month 12 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-slate-500 text-white rounded-full flex items-center justify-center font-bold mb-1">5</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Month 12</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">You're not "fighting hair loss" anymore. You're just living. Growth is steady. Confidence is back. And when you look in the mirror… you see someone you actually recognize.</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg transition shadow" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>RECLAIM YOUR CONFIDENCE</button>
          </div>
        </div>
      </section>
      {/* Old Way vs New Way Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Old Way */}
          <div className="bg-red-50 rounded-2xl p-3 md:p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-red-500 mb-6">THE OLD WAY</div>
            <div className="flex flex-col gap-6 w-full relative">
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Staring in the mirror, pulling your hair back to check how much you've lost</div>
              <div className="h-4 w-1 bg-red-200 mx-auto"></div>
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Wasting money on shampoos, oils, and influencer "fixes" that never actually work</div>
              <div className="h-4 w-1 bg-red-200 mx-auto"></div>
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Taking supplements that "might help" — with zero noticeable change</div>
              <div className="h-4 w-1 bg-red-200 mx-auto"></div>
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Contemplating spending thousands on a hair transplant</div>
              <div className="h-4 w-1 bg-red-200 mx-auto"></div>
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Wearing hats to dates, work, the gym — just to avoid the shame
              </div>
              <div className="h-4 w-1 bg-red-200 mx-auto"></div>
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Hearing the same advice: "just shave it" or "it's normal" — and getting nowhere</div>
            </div>
          </div>
          {/* New Way */}
          <div className="bg-slate-50 rounded-2xl p-3 md:p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-slate-600 mb-6">THE NEW WAY</div>
            <div className="flex flex-col gap-6 w-full relative">
              <div className="bg-slate-100 rounded-lg p-2 md:p-4 text-center text-slate-900 shadow">Target the real root: DHT overload, PGD₂, inflammation, and blood-starved follicles</div>
              <div className="h-4 w-1 bg-slate-200 mx-auto"></div>
              <div className="bg-slate-100 rounded-lg p-2 md:p-4 text-center text-slate-900 shadow">Powered by science — not hope, hype, or TikTok tricks</div>
              <div className="h-4 w-1 bg-slate-200 mx-auto"></div>
              <div className="bg-slate-100 rounded-lg p-2 md:p-4 text-center text-slate-900 shadow">A 2-part system: microneedle + active serum, built to reach deep beneath the scalp barrier</div>
              <div className="h-4 w-1 bg-slate-200 mx-auto"></div>
              <div className="bg-slate-100 rounded-lg p-2 md:p-4 text-center text-slate-900 shadow">Block the hormonal attack, restore circulation, and reawaken dormant follicles</div>
              <div className="h-4 w-1 bg-slate-200 mx-auto"></div>
              <div className="bg-slate-100 rounded-lg p-2 md:p-4 text-center text-slate-900 shadow">Watch shedding slow, fine hairs return, and your confidence rebuild</div>
              <div className="h-4 w-1 bg-slate-200 mx-auto"></div>
              <div className="bg-slate-100 rounded-lg p-2 md:p-4 text-center text-slate-900 shadow">Wake up knowing you're finally doing something that works</div>
            </div>
          </div>
        </div>
      </section>
      {/* Real Women Testimonials Section */}
      <section className="w-full flex flex-col items-center bg-slate-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-10">What Real Hair Loss Sufferers Are Saying After Finding Knox</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Testimonial 1 */}
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow p-3 md:p-6 gap-4 md:gap-6">
              <Image src="/profile2.jpg" alt="Layla M." className="w-32 h-32 object-cover rounded-xl mb-4 md:mb-0" width={128} height={128} />
              <div className="flex-1">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">★</span>))}</div>
                <div className="font-bold text-slate-600 mb-1 flex items-center gap-2"><span role="img" aria-label="quote">🗣️</span> "The first time in years I liked my reflection."</div>
                <div className="font-semibold text-gray-700 mb-1">- Daniel C.</div>
                <div className="text-gray-600 text-sm">I used to avoid the bathroom mirror. I'd throw on a hoodie just to feel okay. Three weeks into using Knox and I actually caught myself fixing my hair instead of hiding it. Might not sound like much — but to me, that was huge.</div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow p-3 md:p-6 gap-4 md:gap-6">
              <div className="flex-1 order-2 md:order-1">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">★</span>))}</div>
                <div className="font-bold text-slate-600 mb-1 flex items-center gap-2"><span role="img" aria-label="quote">🗣️</span> "Finally… something that actually made a difference."</div>
                <div className="font-semibold text-gray-700 mb-1">- Marcus W.</div>
                <div className="text-gray-600 text-sm">I've tried every serum, vitamin, and scalp scrub out there. Knox was the first thing that didn't just sit on my scalp. I could feel the difference after microneedling — my scalp felt less tense, and the shedding slowed. I stopped checking my hairline 10 times a day.</div>
              </div>
              <Image src="/profile3.jpg" alt="Rina D." className="w-32 h-32 object-cover rounded-xl mb-4 md:mb-0 order-1 md:order-2" width={128} height={128} />
            </div>
            {/* Testimonial 3 */}
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow p-3 md:p-6 gap-4 md:gap-6">
              <Image src="/profile1.jpg" alt="Samira F." className="w-32 h-32 object-cover rounded-xl mb-4 md:mb-0" width={128} height={128} />
              <div className="flex-1">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">★</span>))}</div>
                <div className="font-bold text-slate-600 mb-1 flex items-center gap-2"><span role="img" aria-label="quote">🗣️</span> "No more hiding under hats."</div>
                <div className="font-semibold text-gray-700 mb-1">- Victor R.</div>
                <div className="text-gray-600 text-sm">My girlfriend used to ask why I wore a hat indoors. Truth was — I hated how my hair looked. Knox gave me back that part of myself. Now we take photos without me angling my head or cropping the top off. It's not just my hair — it's my confidence that's growing back.</div>
              </div>
            </div>
            {/* Testimonial 4 (placeholder image) */}
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow p-3 md:p-6 gap-4 md:gap-6">
              <div className="flex-1 order-2 md:order-1">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">★</span>))}</div>
                <div className="font-bold text-slate-600 mb-1 flex items-center gap-2"><span role="img" aria-label="quote">🗣️</span> "I didn't even realize how much it was affecting me."</div>
                <div className="font-semibold text-gray-700 mb-1">- Omar S.</div>
                <div className="text-gray-600 text-sm">Losing hair was something I tried to ignore. But I didn't realize how much it chipped away at my confidence until I started feeling like myself again. My scalp feels healthier, less irritated, and I'm starting to see growth around my temples. More than that, I'm less anxious about it every day.</div>
              </div>
              <Image src="/profile4.jpg" alt="Placeholder" className="w-32 h-32 object-cover rounded-xl mb-4 md:mb-0 order-1 md:order-2" width={128} height={128} />
            </div>
          </div>
        </div>
      </section>
      {/* Urgency Section */}
      <section className="w-full flex flex-col items-center bg-white py-6 md:py-12 px-2 md:px-4">
        <div className="max-w-3xl w-full flex flex-col items-center">
          <div className="w-full bg-purple-700 rounded-2xl flex flex-row items-center p-3 md:p-8 mb-6">
            {/* Image and badge */}
            <div className="relative w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center mr-6">
              <Image src="/bottle-placeholder.jpg" alt="Limited Supply" className="w-16 h-16 object-contain" width={64} height={64} />
              <span className="absolute top-2 left-2 bg-pink-200 text-pink-700 text-xs font-bold px-2 py-1 rounded-full shadow">Limited Supply</span>
            </div>
            {/* Text */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-300 text-lg">⚠️</span>
                <span className="font-bold text-lg md:text-xl">June has a high risk of selling out</span>
              </div>
              <div className="text-white/90 text-sm md:text-base">Knox uses rare, high-quality actives like Apigenin and Saw Palmetto — combined with a precision microneedling system. Each batch is small-run to ensure potency. When it's gone, restocks take time. - If it's in stock, don't wait.</div>
            </div>
          </div>
          <button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-full text-lg transition mb-2 flex items-center justify-center gap-2 shadow"
            onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            UNLOCK YOUR TRUE POWER <span>🛒</span>
          </button>
          <div className="flex gap-6 mt-2">
            <div className="flex items-center gap-2 text-slate-600 text-sm"><span>●</span> 60-Day Money Back</div>
            <div className="flex items-center gap-2 text-slate-600 text-sm"><span>●</span> Free Shipping</div>
          </div>
        </div>
      </section>
      {/* Relatable Problems Section */}
      <section className="w-full flex flex-col items-center bg-slate-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2">If Any of This Sounds Familiar… You're Not Alone</h2>
          <div className="text-center text-slate-700 mb-10">Hair loss isn't just cosmetic. It's quiet, constant, and hits deeper than most people realize.</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🪞</span>
              <div className="font-bold text-slate-800 mb-1">Avoiding mirrors</div>
              <div className="text-gray-600 text-sm">You already know what you'll see — and it wrecks your mood before the day starts.</div>
            </div>
            {/* Problem 2 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🧢</span>
              <div className="font-bold text-slate-800 mb-1">Wearing a hat everywhere</div>
              <div className="text-gray-600 text-sm">Not for fashion. But because you don't want to explain "what happened."</div>
            </div>
            {/* Problem 3 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">📸</span>
              <div className="font-bold text-slate-800 mb-1">Dodging photos and old friends</div>
              <div className="text-gray-600 text-sm">The fear of someone noticing it's worse than before keeps you on edge.</div>
            </div>
            {/* Problem 4 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🙄</span>
              <div className="font-bold text-slate-800 mb-1">Being dismissed</div>
              <div className="text-gray-600 text-sm">Doctors say "it's just aging." People say "shave it." No one gets what it does to you.</div>
            </div>
            {/* Problem 5 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">💥</span>
              <div className="font-bold text-slate-800 mb-1">Losing confidence fast</div>
              <div className="text-gray-600 text-sm">It's more than hair. It's how you see yourself — and how connected you feel to others.</div>
            </div>
            {/* Problem 6 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🧪</span>
              <div className="font-bold text-slate-800 mb-1">Trying everything</div>
              <div className="text-gray-600 text-sm">Shampoos. Oils. Scalp brushes. Reddit hacks. You've lost count — and still nothing sticks.</div>
            </div>
          </div>
        </div>
      </section>
      {/* Let Down Story Section */}
      <section className="w-full flex flex-col items-center bg-white py-8 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            Why Why Men with Hair Loss Have Been <span className="text-slate-500">LET DOWN</span> For Years…
          </h2>
          <div className="flex flex-col md:flex-row gap-8 mb-8 items-center">
            <Image src="/letdown1.jpg" alt="Body Odor story" className="w-48 h-48 object-cover rounded-xl grayscale" width={192} height={192} />
            <div className="bg-slate-50 rounded-xl p-3 md:p-6 flex-1 text-gray-800 shadow">
              <style jsx>{`
                .letdown-strong-text { color: #1a1a1a; }
              `}</style>
              <span className="letdown-strong-text">For decades, hair loss was brushed off as just "part of getting older." Something you were supposed to laugh off, shave off, or just live with.<br/><br/>
              Derms shrugged.<br/><br/>
              Drugstore shelves filled with copy-paste shampoos. Forums offered hacks, oils, and sketchy stacks.<br/><br/>
              But none of it actually worked — Because none of it addressed what was really happening beneath the surface.<br/><br/>
              DHT overload. Blood-starved follicles. Hormonal blockades. Inflammation. That's the real reason hair stops growing — and why Knox was built to fix it.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-slate-600 text-lg">●</span>
            <span className="font-bold text-lg md:text-xl text-gray-900">BHair Loss Isn't Just a Receding Hairline — It's a System Breakdown.</span>
          </div>
          <div className="text-gray-900 mb-4">The truth is, men with hair loss face a perfect storm beneath the surface — deep in the biology of their scalp:</div>
          <ul className="mb-4">
            <li className="flex items-center gap-2 mb-1 text-gray-900"><span className="text-purple-600">✔</span> <span className="font-bold">DHT overload</span>— your body turns testosterone into a more aggressive form that shrinks and chokes your follicles.</li>
            <li className="flex items-center gap-2 mb-1 text-gray-900"><span className="text-slate-600">✔</span> <span className="font-bold">PGD₂ hormone buildup</span>— this chemical acts like a "stop sign," blocking hair from re-entering the growth phase.</li>
            <li className="flex items-center gap-2 mb-1 text-gray-900"><span className="text-red-500">✔</span> <span className="font-bold">Low blood flow + inflammation</span>— follicles are starved of oxygen and nutrients, while inflammation slowly destroys the growth environment.</li>
          </ul>
          <div className="font-bold text-gray-900 mb-8">No shampoo, pill, or placebo can fix that — unless it works at the root. - That's exactly where Knox starts.</div>
          <div className="w-full border-2 border-red-400 bg-red-50 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 mb-4">
            <span className="text-3xl text-red-500 mr-2">❌</span>
            <div>
              <div className="font-bold text-gray-900 mb-1 text-lg md:text-xl">But for years, no one built a real solution for us.</div>
              <div className="text-gray-900 text-sm md:text-base">Most "hair loss treatments" just push growth — without fixing why it stopped in the first place.<br/><br/>Minoxidil? Feels like forcing sprouts from dying soil — and comes with side effects no one talks about.<br/><br/>Hair transplants? Expensive. Invasive. And useless if your scalp environment is still toxic.<br/><br/>And the rest?<br/><br/>Serums that sit on the surface. Reddit hacks. Hype without science.<br/><br/>None of it works — because none of it reaches the root.</div>
            </div>
          </div>
        </div>
      </section>
      {/* Informative Formula Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-12 px-2 md:px-4">
        <div className="max-w-3xl w-full">
          <h2 className="text-xl md:text-2xl font-bold text-slate-600 flex items-center gap-2 mb-2">
            <span role="img" aria-label="formula">🧬</span> Finally, a Formula That Works From the Root Up.
          </h2>
          <div className="text-gray-600 mb-6">Backed by clinical research, scalp biology, and real-world regrowth results — featuring ingredients like:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            {/* Paeoniae Radix (Bai Shao) */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-500 text-lg">🧠</span>
                <span className="font-bold text-slate-700">Saw Palmetto</span>
              </div>
              <div className="text-gray-700 text-sm">(Helps block 5α-reductase — the enzyme that turns testosterone into follicle-shrinking DHT)</div>
            </div>
            {/* L-Tyrosine */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-purple-500 text-lg">🌿</span>
                <span className="font-bold text-purple-700">Apigenin</span>
              </div>
              <div className="text-gray-700 text-sm">(Suppresses PGD₂ — the chemical that tells your hair to stop growing)</div>
            </div>
            {/* Berberine + Curcumin */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-pink-500 text-lg">💉</span>
                <span className="font-bold text-pink-700">Caffeine + Ginseng</span>
              </div>
              <div className="text-gray-700 text-sm">(Boost blood flow and revive dormant follicles with increased nutrient delivery)</div>
            </div>
            {/* Paeoniae Radix (Bai Shao) */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-500 text-lg">⚡⚡</span>
                <span className="font-bold text-yellow-700">Delivered with Precision Microneedling</span>
              </div>
              <div className="text-gray-700 text-sm">So the actives don't just sit on the surface — they go deep, where hair actually grows.</div>
            </div>
          </div>
          <div className="italic text-gray-600 mt-2">All combined in one targeted system designed to repair the ground your hair grows from — and finally give it a reason to grow back.</div>
        </div>
      </section>
      {/* Pricing/Package Choice Section */}
      <BuyBox />
      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 md:py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-gray-500">
          <div className="mb-2">© {new Date().getFullYear()} knoxhairgrowth. All rights reserved.</div>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}