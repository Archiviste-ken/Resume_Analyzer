// app/page.tsx
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import { BentoCard } from '@/components/ui/BentoCard';
import { Zap, Target, ShieldCheck, BarChart3, Cpu, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-black selection:bg-[#7C3AED] selection:text-white">
      {/* Decorative Grid Background */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v2h-2v-2h2zm0 20v2h-2v-2h2zm0-40v2h-2v-2h2zM6 34v2H4v-2h2zm0 20v2H4v-2h2zm0-40v2H4v-2h2zm20 0v2h-2v-2h2zm0 20v2h-2v-2h2zm0 20v2h-2v-2h2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      <Navbar />

      {/* HERO: VIBRANT & PUNCHY */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#7C3AED] text-white border-[3px] border-black px-6 py-2 font-black uppercase tracking-widest -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles size={18} /> Trusted by 10k+ Candidates
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter">
            Stop Being <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Ignored.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-bold text-gray-700 bg-white border-[3px] border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            The AI-powered parser that shreds ATS filters. Get the <span className="underline decoration-[#7C3AED] decoration-4">exact keywords</span> you're missing.
          </p>

          <div className="flex flex-col sm:row justify-center gap-6 pt-8">
            <Button href="/analyze" variant="primary" className="text-2xl px-12 py-6 bg-[#A8FF35] hover:bg-[#96E62F]">
              Scan My Resume →
            </Button>
            <Button href="#how" className="bg-white hover:bg-gray-50">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* BENTO GRID: PROFESSIONAL SAAS STYLE */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          
          <BentoCard 
            className="md:col-span-3 lg:col-span-4"
            icon={<Cpu size={32} />}
            color="bg-[#A8FF35]"
            title="Neural Parsing"
            description="Deep extraction of experience, even from complex multi-column PDFs."
            badge="Advanced"
          />

          <BentoCard 
            className="md:col-span-3 lg:col-span-8"
            icon={<BarChart3 size={32} />}
            color="bg-[#7C3AED] text-white"
            title="Interactive ATS Heatmap"
            description="Visualize exactly where recruiters drop off. We analyze keyword density, formatting, and role relevance across 50+ industry standards."
          />

          <BentoCard 
            className="md:col-span-6 lg:col-span-8"
            icon={<Target size={32} />}
            color="bg-[#FF5733]"
            title="Role-Match Alignment"
            description="Compare your resume directly against specific JD requirements. Our AI gives you a 1:1 match percentage and tells you exactly what phrases to add to land the interview."
            badge="Popular"
          />

          <BentoCard 
            className="md:col-span-6 lg:col-span-4"
            icon={<ShieldCheck size={32} />}
            color="bg-[#33DBFF]"
            title="Privacy First"
            description="Your data is encrypted and never sold. We analyze, you succeed."
          />

        </div>
      </section>

      {/* THE "COOL" STATS SECTION */}
      <section className="bg-black text-white py-20 border-y-[4px] border-black overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around gap-12 text-center relative z-10">
          <div>
            <div className="text-6xl font-black text-[#A8FF35]">94%</div>
            <div className="font-bold uppercase tracking-widest">Interview Rate</div>
          </div>
          <div>
            <div className="text-6xl font-black text-[#EC4899]">2.4s</div>
            <div className="font-bold uppercase tracking-widest">Analysis Time</div>
          </div>
          <div>
            <div className="text-6xl font-black text-[#33DBFF]">50k+</div>
            <div className="font-bold uppercase tracking-widest">Resumes Scanned</div>
          </div>
        </div>
      </section>
    </main>
  );
}