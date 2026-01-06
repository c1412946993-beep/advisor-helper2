import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card, CardHeader, CardContent } from '../components/Card';
import { GeneratedQuestion } from '../data/questions';
import { Download, RotateCcw, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';

interface ResultsPageProps {
  questions: GeneratedQuestion[];
  onRestart: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ questions, onRestart }) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const htmlContent = generateHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-advisor-interview-script.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Financial Advisor Interview Script</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; color: #1e293b; }
          h1 { color: #003366; border-bottom: 3px solid #003366; padding-bottom: 10px; }
          h2 { color: #003366; margin-top: 30px; }
          .question { margin-bottom: 25px; page-break-inside: avoid; }
          .question-text { font-weight: bold; margin-bottom: 8px; }
          .why-matters { background: #f0f4f8; padding: 12px; margin: 8px 0; border-left: 4px solid #003366; }
          .red-flags, .green-flags { margin: 12px 0; padding-left: 20px; }
          .flag-item { margin: 6px 0; }
          .disclaimer { margin-top: 40px; padding: 15px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 12px; }
          .resources { margin-top: 30px; padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; }
          .resource-link { margin: 8px 0; }
          a { color: #003366; }
        </style>
      </head>
      <body>
        <h1>Your Customized Financial Advisor Interview Script</h1>
        <p>Use this script when interviewing financial advisors. These questions are tailored to your financial situation.</p>
        ${questions
          .map(
            (q, idx) => `
          <div class="question">
            <p class="question-text">${idx + 1}. ${q.text}</p>
            <div class="why-matters"><strong>Why this matters:</strong> ${q.whyMatters}</div>
            ${
              q.redFlags.length > 0
                ? `
              <div class="red-flags">
                <strong style="color: #dc2626;">❌ Red Flags (What bad answers sound like):</strong>
                <ul>${q.redFlags.map((flag) => `<li class="flag-item">${flag}</li>`).join('')}</ul>
              </div>
            `
                : ''
            }
            ${
              q.greenFlags.length > 0
                ? `
              <div class="green-flags">
                <strong style="color: #16a34a;">✓ Green Flags (What good answers sound like):</strong>
                <ul>${q.greenFlags.map((flag) => `<li class="flag-item">${flag}</li>`).join('')}</ul>
              </div>
            `
                : ''
            }
          </div>
        `
          )
          .join('')}

        <div class="resources">
          <h2>Resources to Verify Advisor Credentials</h2>
          <div class="resource-link"><a href="https://brokercheck.finra.org/" target="_blank">FINRA BrokerCheck</a> - Check broker and advisor disciplinary history</div>
          <div class="resource-link"><a href="https://www.investor.gov/additional-resources/free-financial-tools" target="_blank">SEC Investment Adviser Public Disclosure (IAPD)</a> - Verify RIA registration and credentials</div>
          <div class="resource-link"><a href="https://www.cfp.net/" target="_blank">CFP Board</a> - Verify CFP® certification</div>
        </div>

        <div class="disclaimer">
          <strong>Disclaimer:</strong> This tool provides educational questions, not personalized financial advice. Always verify advisor credentials independently through official channels and consult with multiple advisors before making a decision. This script is for your personal use only.
        </div>
      </body>
      </html>
    `;
  };

  const groupedQuestions = questions.reduce(
    (acc, q) => {
      if (!acc[q.category]) {
        acc[q.category] = [];
      }
      acc[q.category].push(q);
      return acc;
    },
    {} as Record<string, GeneratedQuestion[]>
  );

  const categories = Object.keys(groupedQuestions);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-white py-12 px-4 sm:px-6 lg:px-8 print:bg-white">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8 print:shadow-none print:p-0">
          <CardHeader>
            <h1 className="text-4xl font-bold text-navy-900 mb-4">Your Customized Interview Script</h1>
            <p className="text-lg text-slate-600">
              Use these {questions.length} questions when interviewing financial advisors. They're personalized to your situation.
            </p>
          </CardHeader>
        </Card>

        <div className="flex gap-3 mb-8 print:hidden">
          <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Print Script
          </Button>
          <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download HTML
          </Button>
          <Button onClick={onRestart} variant="secondary" className="flex items-center gap-2 ml-auto">
            <RotateCcw className="w-4 h-4" />
            Start Over
          </Button>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-navy-700 mb-6 pb-3 border-b-2 border-navy-200">
                {category}
              </h2>

              <div className="space-y-6">
                {groupedQuestions[category].map((question, idx) => {
                  const isChecked = checkedItems.has(question.id);

                  return (
                    <Card key={question.id} className="print:shadow-none print:p-4">
                      <div className="print:hidden mb-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCheck(question.id)}
                            className="w-5 h-5 mt-1 accent-navy-700 flex-shrink-0"
                          />
                          <div className="flex-1">
                            <p className={`font-semibold text-lg ${isChecked ? 'text-slate-500 line-through' : 'text-navy-900'}`}>
                              {question.text}
                            </p>
                          </div>
                        </label>
                      </div>

                      <div className="hidden print:block mb-4">
                        <p className="font-semibold text-lg text-navy-900">{question.text}</p>
                      </div>

                      <div className="space-y-4 pl-0 print:pl-0">
                        <div className="bg-navy-50 p-4 rounded-lg border border-navy-200">
                          <p className="text-sm font-semibold text-navy-700 mb-2">Why this matters:</p>
                          <p className="text-slate-700">{question.whyMatters}</p>
                        </div>

                        {question.redFlags.length > 0 && (
                          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                            <div className="flex items-start gap-2 mb-2">
                              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm font-semibold text-red-900">Red Flags (avoid these answers):</p>
                            </div>
                            <ul className="space-y-2 ml-7">
                              {question.redFlags.map((flag, i) => (
                                <li key={i} className="text-sm text-red-800">
                                  • {flag}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {question.greenFlags.length > 0 && (
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-start gap-2 mb-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm font-semibold text-green-900">Green Flags (good answers):</p>
                            </div>
                            <ul className="space-y-2 ml-7">
                              {question.greenFlags.map((flag, i) => (
                                <li key={i} className="text-sm text-green-800">
                                  • {flag}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <Card className="mt-12 bg-blue-50 border border-blue-200 print:bg-white print:border-slate-200">
          <CardHeader>
            <h2 className="text-lg font-bold text-navy-900">Resources to Verify Credentials</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="https://brokercheck.finra.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-navy-700 hover:text-navy-900 font-semibold"
            >
              FINRA BrokerCheck <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://www.investor.gov/additional-resources/free-financial-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-navy-700 hover:text-navy-900 font-semibold"
            >
              SEC Investment Adviser Public Disclosure (IAPD) <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://www.cfp.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-navy-700 hover:text-navy-900 font-semibold"
            >
              CFP Board <ExternalLink className="w-4 h-4" />
            </a>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-slate-50 border border-slate-200 print:bg-white print:border-slate-200">
          <CardContent className="text-sm text-slate-700">
            <p className="font-semibold text-slate-900 mb-3">Disclaimer:</p>
            <p>
              This tool provides educational questions, not personalized financial advice. Always verify advisor credentials
              independently through official channels (BrokerCheck, SEC IAPD). Consult with multiple advisors before making
              decisions. This script is for your personal use only.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
