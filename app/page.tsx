import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle, Zap, Target, Search } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] text-black pb-20">
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-block bg-[#4CAF50] border-2 border-black px-4 py-1 font-bold rotate-[-2deg] mb-4">
            NEW: V2.0 Engine Live! 🚀
          </div>
          <h1 className="text-6xl lg:text-8xl font-black leading-none uppercase italic">
            Beat ATS Filters <br /> 
            <span className="text-[#FF4081] not-italic">Get Shortlisted.</span>
          </h1>
          <p className="text-xl font-bold max-w-xl border-l-8 border-[#FFB800] pl-4">
            Our AI analyzes your resume against industry standards, uncovers missing keywords, and gives you a data-backed score in seconds.
          </p>
          <ul className="space-y-3 font-bold text-lg">
            <li className="flex items-center gap-2"><CheckCircle className="text-[#4CAF50]" /> Real-time ATS Score (0-100)</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-[#4CAF50]" /> Skill Gap Identification</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-[#4CAF50]" /> Role-Specific Optimization</li>
          </ul>
          <div className="pt-4">
            <Button href="/analyze" variant="primary">
              🚀 Analyze My Resume →
            </Button>
          </div>
        </div>

        {/* HERO MOCKUP */}
        <div className="flex-1 w-full max-w-md">
          <Card bgColor="bg-white" className="rotate-[2deg] relative">
            <div className="absolute -top-6 -right-6 bg-[#FFB800] p-4 border-4 border-black font-black text-2xl animate-bounce">
              88% SCORE
            </div>
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-gray-200 border-2 border-black" />
              <div className="h-4 w-1/2 bg-gray-200 border-2 border-black" />
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-[#4CAF50] border-2 border-black rounded-full" />
                <div className="h-8 w-24 bg-[#FF4081] border-2 border-black rounded-full" />
              </div>
              <hr className="border-2 border-black" />
              <p className="font-bold">Missing Skills:</p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-red-200 border-2 border-black px-2 py-1 text-xs font-black">TYPESCRIPT</span>
                <span className="bg-red-200 border-2 border-black px-2 py-1 text-xs font-black">DOCKER</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="bg-[#FFB800] border-y-4 border-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black uppercase text-center mb-16 underline decoration-[#FF4081]">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Zap size={40} />} 
              title="Instant Scoring" 
              desc="Get a comprehensive ATS score based on 15+ industry metrics." 
            />
            <FeatureCard 
              icon={<Search size={40} />} 
              title="Skill Detection" 
              desc="Our AI identifies hard and soft skills extracted from your text." 
            />
            <FeatureCard 
              icon={<Target size={40} />} 
              title="Job Match" 
              desc="Compare your profile against specific job descriptions instantly." 
            />
            <FeatureCard 
              icon={<CheckCircle size={40} />} 
              title="Actionable Tips" 
              desc="Specific suggestions on how to reword your experience." 
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-black uppercase mb-16">3 Simple Steps</h2>
        <div className="grid md:grid-cols-3 gap-12 relative">
          <Step num="1" title="Upload" desc="Drop your PDF or DOCX resume into our secure analyzer." color="bg-[#4CAF50]" />
          <Step num="2" title="Analyze" desc="Our AI parses your experience and identifies key patterns." color="bg-[#FF4081]" />
          <Step num="3" title="Improve" desc="Receive a detailed report with specific fix suggestions." color="bg-[#FFB800]" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-4 border-black py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-6">
          <div className="text-2xl font-black uppercase">AI REZU</div>
          <p className="font-bold">© 2026 AI Resume Analyzer. Built for the bold.</p>
          <div className="flex gap-6 font-bold underline">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="hover:scale-105 transition-transform duration-200 flex flex-col items-center text-center gap-4">
      <div className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase">{title}</h3>
      <p className="font-bold text-gray-700">{desc}</p>
    </Card>
  );
}

function Step({ num, title, desc, color }: { num: string, title: string, desc: string, color: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-20 h-20 ${color} border-4 border-black flex items-center justify-center text-4xl font-black mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
        {num}
      </div>
      <h3 className="text-2xl font-black uppercase mb-2">{title}</h3>
      <p className="font-bold text-gray-600">{desc}</p>
    </div>
  );
}