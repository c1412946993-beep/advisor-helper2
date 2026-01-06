import React from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Shield, CheckCircle, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className="w-14 h-14 text-navy-700" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-5 leading-tight">
            Don't Hire a Financial Advisor Until You Ask These Questions
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get a personalized interview script tailored to your financial situation. Protect yourself from predatory advisors and hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-navy-700" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-navy-900 mb-2">Personalized Questions</h3>
            <p className="text-slate-600 text-sm">
              Answer 5 questions about your financial situation. Get 12-18 custom questions tailored to your needs.
            </p>
          </Card>

          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-10 h-10 text-navy-700" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-navy-900 mb-2">Identify Red Flags</h3>
            <p className="text-slate-600 text-sm">
              Learn what bad answers sound like and what to watch for in every response.
            </p>
          </Card>

          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="w-10 h-10 text-navy-700" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-navy-900 mb-2">Printable Script</h3>
            <p className="text-slate-600 text-sm">
              Download and print your interview script. Take it to your advisor meetings.
            </p>
          </Card>
        </div>

        <div className="bg-navy-50 border border-navy-200 rounded-xl p-7 md:p-9 mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-5">Why This Matters</h2>
          <ul className="space-y-3">
            <li className="flex gap-4">
              <span className="text-navy-700 font-bold flex-shrink-0">•</span>
              <span className="text-slate-700">
                <strong>Hidden fees:</strong> The average advisor charges 1% AUM + mutual fund expenses. That's 30% less wealth over 30 years.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-navy-700 font-bold flex-shrink-0">•</span>
              <span className="text-slate-700">
                <strong>Conflicts of interest:</strong> Commission-based advisors push high-fee products regardless of your needs.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-navy-700 font-bold flex-shrink-0">•</span>
              <span className="text-slate-700">
                <strong>Fake credentials:</strong> Many advisors aren't fiduciaries and don't have meaningful certifications.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-navy-700 font-bold flex-shrink-0">•</span>
              <span className="text-slate-700">
                <strong>One wrong choice:</strong> Hiring a predatory advisor can cost you hundreds of thousands in wealth over your lifetime.
              </span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <Button onClick={onStart} size="lg">
            Get Your Custom Questions
          </Button>
          <p className="text-sm text-slate-500 mt-4">
            No signup required. Takes 2-3 minutes.
          </p>
          <p className="text-sm text-slate-600 mt-3 max-w-2xl mx-auto">
            Learn how to choose a financial advisor with our comprehensive guide. Get expert interview questions to ask potential advisors and make an informed decision.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-center text-sm text-slate-500">
            <strong>Disclaimer:</strong> This tool provides educational questions, not personalized financial advice. Always verify advisor credentials independently through official channels (BrokerCheck, SEC IAPD) and consult with multiple advisors before making a decision.
          </p>
        </div>
      </div>
    </div>
  );
};
