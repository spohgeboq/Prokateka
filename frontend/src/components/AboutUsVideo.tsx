"use client";

import React from "react";
import { Language } from "@/data/translations";

interface AboutUsVideoProps {
  language: Language;
}

export const AboutUsVideo: React.FC<AboutUsVideoProps> = ({ language }) => {
  return (
    <section className="py-12 sm:py-16 bg-navy-950 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">
          {language === "kz" ? "Біз туралы" : "О нашей компании"}
        </h2>
        
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-navy-900/50 shadow-2xl p-5 sm:p-6 backdrop-blur-md">
          {/* Video Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black shadow-inner">
            <iframe
              src="https://www.youtube.com/embed/yP2RjVf02g4?autoplay=0&rel=0"
              title="PROkateka - Аренда строительного оборудования"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Text below video */}
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed text-justify space-y-4">
            <p>
              {language === "kz"
                ? "Біз PROkateka прокат желісіміз - құрылыс нысандарын қауіпсіз, тиімді және жоғары өнімділікпен қамтамасыз етуге бағытталған толық қызмет көрсететін жабдықтарды жалға беру бойынша жетекші компаниямыз."
                : "Мы сеть прокатов PROkateka - ведущая компания по аренде оборудования с полным спектром услуг, предоставляющая клиентам оборудование, услуги и решения, необходимые для достижения оптимальной производительности безопасно, эффективно и результативно."}
            </p>
            <p>
              {language === "kz"
                ? "Біздің компания технологиялық инновациялар мен кеңейтілген өнім ұсыныстары, қосымша қызметтер мен тұтынушылардың жобаларын қолдау үшін консультативтік шешімдер арқылы дамуын және өсуін жалғастыруда."
                : "Наша компания лидер в сфере аренды оборудования, продолжает развиваться и расти за счет технологических инноваций, расширенного предложения продуктов, дополнительных услуг и консультативных решений для поддержки проектов клиентов."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
