"use client";

import React, { useState } from 'react';
import { 
  AlertTriangle, TrendingUp, ArrowRight, 
  RefreshCcw, ShieldCheck, Zap, Brain, Target, Loader2 
} from 'lucide-react';

const QUESTIONS = [
  { id: 3, text: "仕様の不明点は、自分で判断せず「詳細な指示」を待つことが多い。", weight: -10 },
  { id: 4, text: "コードを書く作業自体が最も好きで、アーキテクチャ設計にはあまり関心がない。", weight: -8 },
  { id: 5, text: "AIが生成したコードのライセンスや脆弱性を、自分の目で即座に判定できる。", weight: 12 },
  { id: 6, text: "技術に詳しくない顧客に対し、その機能が「ビジネスにどう貢献するか」を説明できる。", weight: 10 },
  { id: 7, text: "顧客の要求に対し、「その機能は不要では？」と逆提案をしたことがある。", weight: 15 },
  { id: 8, text: "AIに指示を出す際、一発で正解を出すための「前提条件の設計」が得意だ。", weight: 8 },
  { id: 9, text: "エラー時、ログを深く追う前に「AIの回答」をそのままコピペして試すことが多い。", weight: -12 },
  { id: 10, text: "ドキュメント作成は、AIに下書きさせた上で「自分の意志」で最終調整している。", weight: 7 },
  { id: 11, text: "チームのモチベーション管理や感情のケアは、エンジニアの仕事ではないと思う。", weight: -8 },
  { id: 12, text: "週に一度は、海外の最新AI論文やツールの動向をチェックしている。", weight: 10 },
  { id: 13, text: "5年後、現在の職種が消滅しても、ITで価値を出せる自信がある。", weight: 15 },
  { id: 14, text: "AI生成物が原因で障害が起きた際、「AIのせい」にせず自分の責任として対応できる。", weight: 15 },
  { id: 15, text: "AIによる効率化で浮いた時間を、新しい「ビジネス価値」の創出に使っている。", weight: 12 },
  { id: 16, text: "AIが提示した「もっともらしい正解」に対し、違和感があれば自分の直感を信じて徹底的に疑い、検証することができる。", weight: 15 },
  { id: 17, text: "「自分にしかできない価値」を言語化でき、AIに代替されないためのキャリアパスを、自分自身で設計し続けている。", weight: 15 },
  { id: 18, text: "AIがどんなに正確な回答を出しても、結局のところ「人対人の信頼関係」や「泥臭い調整」がプロジェクトを完遂させると思う。", weight: 12 },
];

export default function DiagnosisSite() {
  const [step, setStep] = useState(0); 
  const [selectedWorks, setSelectedWorks] = useState<string[]>([]); // Step 1: 複数保持
  const [selectedRole, setSelectedRole] = useState<string | null>(null); // Step 2: 単一保持
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const calculateScore = () => {
    let score = 50; 
    
    // Step 1: 複数選択のスコア計算
    const hasUpstream = selectedWorks.some(w => ['コンサル', '要件定義', '設計'].includes(w));
    if (selectedWorks.some(w => ['コンサル', '要件定義'].includes(w))) score += 20;
    if (selectedWorks.includes('設計')) score += 10;

    if (!hasUpstream) {
      const hasDev = selectedWorks.includes('製造');
      const hasTest = selectedWorks.includes('試験');
      if (hasDev && hasTest) score -= 20;
      else if (hasDev) score -= 25;
    }

    // Step 2: 単一選択のスコア計算
    if (['PM', 'PL', 'PMO'].includes(selectedRole || '')) score += 20;
    if (selectedRole === 'スペシャリスト') score += 10;

    // Step 3: 質問のスコア計算
    Object.keys(answers).forEach((id) => {
      const q = QUESTIONS.find(q => q.id === Number(id));
      if (q && answers[q.id]) score += q.weight;
    });

    return Math.min(Math.max(Math.round(score), 0), 100);
  };

  const finalScore = calculateScore();

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(4);
    }, 2500);
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 relative overflow-hidden">
      <meta name='impact-site-verification' content='6b35cf92-8c80-4313-9ee1-a38183a08c6f'></meta>
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-3xl mx-auto pt-8">
        
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent italic">
            ENGINEER SURVIVAL
          </h1>
        </div>

        {step === 0 && (
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <p className="text-slate-400 leading-relaxed text-lg">
              2026年、AIは「道具」から「自律的な同僚」へ。<br />
              あなたの生存確率は、技術力ではなく「意志の力」で決まる。
            </p>
            <button 
              onClick={() => setStep(1)}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95 flex items-center mx-auto gap-2 overflow-hidden"
            >
              診断を開始する <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {(step >= 1 && step <= 3 && !isAnalyzing) && (
          <div className="space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
             <div className="flex items-center gap-3 text-blue-400 font-mono">
               {step === 1 && <Zap className="animate-bounce" />}
               {step === 2 && <ShieldCheck className="animate-spin-slow" />}
               {step === 3 && <Brain className="animate-pulse" />}
               <span>STEP 0{step}/03</span>
             </div>

             {/* Step 1: 複数選択 (現状維持) */}
             {step === 1 && (
               <div className="space-y-6">
                 <h2 className="text-2xl font-bold">担当工程を選択（複数可）</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                   {['コンサル', '要件定義', '設計', '製造', '試験', '運用・保守'].map(item => (
                     <button
                       key={item}
                       onClick={() => setSelectedWorks(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])}
                       className={`p-4 rounded-2xl border-2 transition-all ${selectedWorks.includes(item) ? 'border-blue-500 bg-blue-500/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-600'}`}
                     >
                       {item}
                     </button>
                   ))}
                 </div>
                 <button disabled={selectedWorks.length === 0} onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 disabled:opacity-30 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">NEXT</button>
               </div>
             )}

             {/* Step 2: 単一選択へ変更 */}
             {step === 2 && (
               <div className="space-y-6">
                 <h2 className="text-2xl font-bold">現在の主な役割を選択</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                   {['PM', 'PMO', 'PL', 'スペシャリスト', 'メンバー'].map(item => (
                     <button
                       key={item}
                       onClick={() => setSelectedRole(item)}
                       className={`p-4 rounded-2xl border-2 transition-all ${selectedRole === item ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-600'}`}
                     >
                       {item}
                     </button>
                   ))}
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button onClick={handleBack} className="flex-1 py-4 border border-slate-700 text-slate-400 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                        <ArrowRight className="rotate-180" size={18} /> BACK
                    </button>
                    <button disabled={!selectedRole} onClick={() => setStep(3)} className="flex-[2.5] py-4 bg-purple-600 disabled:opacity-30 rounded-2xl font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20">STANCE CHECK</button>
                 </div>
               </div>
             )}

             {step === 3 && (
               <div className="space-y-10 pb-12">
                 {QUESTIONS.map((q) => (
                   <div key={q.id} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl space-y-4 hover:border-slate-600 transition-colors">
                     <p className="text-lg font-medium leading-relaxed">{q.text}</p>
                     <div className="flex gap-4">
                       {[true, false].map((val) => (
                         <button 
                           key={val.toString()}
                           onClick={() => setAnswers({...answers, [q.id]: val})}
                           className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${answers[q.id] === val ? 'bg-white text-black border-white' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
                         >
                           {val ? "はい" : "いいえ"}
                         </button>
                       ))}
                     </div>
                   </div>
                 ))}
                 <div className="flex gap-4">
                    <button onClick={handleBack} className="flex-1 py-6 border border-slate-700 text-slate-400 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                        <ArrowRight className="rotate-180" size={18} /> BACK
                    </button>
                    <button 
                        disabled={Object.keys(answers).length < QUESTIONS.length}
                        onClick={handleStartAnalysis} 
                        className="flex-[2.5] py-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl font-black text-2xl animate-shimmer shadow-xl shadow-blue-500/20 disabled:opacity-50"
                    >
                        解析を開始
                    </button>
                 </div>
               </div>
             )}
          </div>
        )}

        {/* ... (解析中・結果画面はそのまま) ... */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-24 space-y-6 animate-in fade-in duration-300">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            <div className="text-center">
              <p className="text-xl font-mono text-blue-400 animate-pulse">MARKET_MATCHING...</p>
              <p className="text-slate-500 text-sm">あなたのキャリア資質を2026年の市場データと照合中</p>
            </div>
          </div>
        )}

        {step === 4 && !isAnalyzing && (
          <div className="space-y-8 animate-in zoom-in-95 fade-in duration-1000">
            <div className="text-center space-y-4">
              <div className="text-7xl md:text-9xl font-black italic tracking-tighter bg-gradient-to-b from-white to-slate-700 bg-clip-text text-transparent drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                {finalScore}%
              </div>
              <h3 className="text-2xl font-bold text-blue-400 tracking-widest uppercase">Survival Rate</h3>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
              {/* ... 結果表示ロジック ... */}
              {finalScore >= 80 ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-cyan-400"><TrendingUp size={32} /> <h4 className="text-3xl font-black">AI時代の指揮官</h4></div>
                  <p className="text-slate-300 text-lg">あなたはAIを「ツール」ではなく「部下」として使いこなしています。2026年、あなたの価値は爆騰します。</p>
                </div>
              ) : finalScore >= 50 ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-emerald-400"><Target size={32} /> <h4 className="text-3xl font-black">共存型エンジニア</h4></div>
                  <p className="text-slate-300 text-lg">生存圏内ですが、特定工程への依存がリスクです。問いを立てる力を磨けばさらに高みへ行けます。</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-rose-500"><AlertTriangle size={32} /> <h4 className="text-3xl font-black">代替リスク：警戒</h4></div>
                  <p className="text-slate-300 text-lg">現在の「作業中心」スタイルは危険信号です。AIを使いこなす側へのリスキリングを急ぎましょう。</p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <button className="p-4 bg-blue-600 rounded-2xl font-bold hover:scale-105 transition-transform">キャリア戦略を相談する</button>
                <button className="p-4 bg-slate-800 rounded-2xl font-bold border border-slate-700 hover:bg-slate-700 transition-colors">今の年収を診断</button>
              </div>
            </div>

            <button 
              onClick={() => {setStep(0); setAnswers({}); setSelectedWorks([]); setSelectedRole(null);}} 
              className="w-full py-4 text-slate-500 hover:text-white flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCcw size={18} /> 再診断
            </button>
          </div>
        )}
      </div>
    </div>
  );
}