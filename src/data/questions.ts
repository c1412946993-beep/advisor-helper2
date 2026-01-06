export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  text: string;
  whyMatters: string;
  redFlags: string[];
  greenFlags: string[];
}

export interface GeneratedQuestion {
  id: string;
  category: string;
  text: string;
  whyMatters: string;
  redFlags: string[];
  greenFlags: string[];
  priority: number;
}

export interface QuestionnaireItem {
  id: string;
  question: string;
  type: 'single' | 'multi';
  options: QuestionOption[];
}

export const questionnaire: QuestionnaireItem[] = [
  {
    id: 'net_worth',
    question: 'What is your approximate investable net worth?',
    type: 'single',
    options: [
      { id: 'under_100k', label: 'Under $100,000' },
      { id: '100k_500k', label: '$100,000 - $500,000' },
      { id: '500k_2m', label: '$500,000 - $2 million' },
      { id: '2m_5m', label: '$2 million - $5 million' },
      { id: 'over_5m', label: 'Over $5 million' },
    ],
  },
  {
    id: 'primary_goal',
    question: 'What is your primary financial goal?',
    type: 'single',
    options: [
      { id: 'retirement', label: 'Retirement planning (building wealth for retirement)' },
      { id: 'wealth_preservation', label: 'Wealth preservation (already wealthy, protecting assets)' },
      { id: 'debt_management', label: 'Debt management & financial foundation' },
      { id: 'tax_optimization', label: 'Tax optimization & complex planning (business owner, stock options, etc.)' },
      { id: 'major_life_event', label: 'Major life event (inheritance, divorce, selling business)' },
    ],
  },
  {
    id: 'payment_preference',
    question: 'How do you prefer to pay for financial advice?',
    type: 'single',
    options: [
      { id: 'fee_only', label: 'I prefer fee-only (I pay directly, no commissions)' },
      { id: 'commission_based', label: 'I\'m open to commission-based (advisor earns from products sold)' },
      { id: 'not_sure', label: 'I\'m not sure what the difference is' },
    ],
  },
  {
    id: 'experience_level',
    question: 'What is your investment experience level?',
    type: 'single',
    options: [
      { id: 'beginner', label: 'Beginner (little to no investing experience)' },
      { id: 'intermediate', label: 'Intermediate (have investments, understand basics)' },
      { id: 'advanced', label: 'Advanced (confident in markets, strategies, and products)' },
    ],
  },
  {
    id: 'special_circumstances',
    question: 'Do any of these apply to you?',
    type: 'multi',
    options: [
      { id: 'business_owner', label: 'I own a business' },
      { id: 'stock_options', label: 'I have stock options or RSUs' },
      { id: 'divorce', label: 'I\'m going through/have gone through a divorce' },
      { id: 'inheritance', label: 'I\'m receiving/received an inheritance' },
      { id: 'pension', label: 'I have a pension or annuity' },
    ],
  },
];

const universalQuestions: QuizQuestion[] = [
  // CREDENTIALS & FIDUCIARY DUTY (4 questions)
  {
    id: 'q_fiduciary',
    category: 'Credentials & Fiduciary Duty',
    text: 'Are you a fiduciary 100% of the time, and will you provide that in writing?',
    whyMatters: 'Some advisors are only fiduciaries "when providing advice" but not when selling products. Get it in writing.',
    redFlags: [
      '"I act in your best interest" (vague, not fiduciary)',
      '"When I\'m giving advice, yes" (loophole for product sales)',
      '"That\'s complicated..." (should be a simple yes)',
    ],
    greenFlags: [
      '"Yes, I\'m an RIA and fiduciary at all times. Here\'s our ADV Part 2."',
      '"Yes, and I\'ll sign a fiduciary oath for you."',
    ],
  },
  {
    id: 'q_licenses',
    category: 'Credentials & Fiduciary Duty',
    text: 'What licenses and certifications do you hold, and what\'s the difference between them?',
    whyMatters: 'A Series 65 (RIA) is different from Series 7 (broker). CFP® is a gold standard; insurance-only licenses are limited.',
    redFlags: [
      'Can\'t clearly explain their licenses',
      'Only has insurance licenses (limited scope)',
      'Defensive or evasive about credentials',
    ],
    greenFlags: [
      'Clear explanation: "CFP®, CFA, and Series 65 RIA"',
      'Can explain the scope and limitations of each credential',
    ],
  },
  {
    id: 'q_registered',
    category: 'Credentials & Fiduciary Duty',
    text: 'Are you or your firm registered with the SEC or state as a Registered Investment Advisor (RIA)?',
    whyMatters: 'RIAs have a legal fiduciary duty. Brokers only need to meet a lower "suitability" standard.',
    redFlags: [
      '"No, I\'m a broker-dealer representative"',
      'Confusion about registration status',
    ],
    greenFlags: [
      '"Yes, we\'re registered with the SEC as an RIA. You can verify us on the SEC IAPD."',
    ],
  },
  {
    id: 'q_conflicts',
    category: 'Credentials & Fiduciary Duty',
    text: 'Do you earn any commissions, bonuses, or other compensation from products you recommend to me?',
    whyMatters: 'Commissions create conflicts of interest. Fee-only advisors don\'t have this conflict.',
    redFlags: [
      '"A small percentage" (any commission is a conflict)',
      'Evasive or unclear',
      '"Only standard industry commissions"',
    ],
    greenFlags: [
      '"No, I\'m fee-only. I only earn from the fees you pay directly."',
      '"Yes, we disclose all compensation and it\'s in writing."',
    ],
  },

  // FEE TRANSPARENCY (5 questions)
  {
    id: 'q_total_cost',
    category: 'Fee Transparency',
    text: 'How do you get paid, and how much will I pay in total each year—including all fees, commissions, and product costs?',
    whyMatters: 'You need to understand the full cost. Some advisors hide fees in fund expenses or spreads.',
    redFlags: [
      '"It\'s very competitive" (not a specific answer)',
      'Refuses to provide a written fee schedule',
      'Changes numbers when pressed',
    ],
    greenFlags: [
      '"1% AUM annually, billed quarterly, with no product commissions. Here\'s our written fee schedule."',
      '"Flat $5,000/year planning fee, no AUM fees or commissions."',
    ],
  },
  {
    id: 'q_fee_structure',
    category: 'Fee Transparency',
    text: 'Will I pay you a percentage of assets under management (AUM), a flat fee, hourly rate, or commissions?',
    whyMatters: 'Different fee structures create different incentives. AUM aligns with growth, flat fees align with planning.',
    redFlags: [
      'Vague or variable pricing',
      'Suggests commission-based products without transparency',
    ],
    greenFlags: [
      '"We offer three options: 0.75% AUM for accounts over $250K, flat fees for planning, or hourly ($300/hr)."',
    ],
  },
  {
    id: 'q_hidden_fees',
    category: 'Fee Transparency',
    text: 'Are there any soft-dollar arrangements, 12b-1 fees, revenue-sharing with custodians, or other hidden costs I should know about?',
    whyMatters: 'These are hidden payments that create conflicts even in "fee-only" arrangements.',
    redFlags: [
      '"I don\'t think so" (should be confident)',
      'Doesn\'t understand the question',
    ],
    greenFlags: [
      '"No, we have no soft-dollar arrangements. All compensation is transparent."',
    ],
  },
  {
    id: 'q_account_minimum',
    category: 'Fee Transparency',
    text: 'Are there any account minimums, and what happens if I fall below them?',
    whyMatters: 'Some advisors drop you or reduce service if accounts shrink. This matters especially for smaller investors.',
    redFlags: [
      '"We prefer at least $250K"',
      'Says you\'ll be "transitioned to another advisor"',
    ],
    greenFlags: [
      '"We have no minimums. Everyone gets the same level of service."',
      '"Our minimum is $50K, and if you fall below it, fees go to a flat $100/month."',
    ],
  },
  {
    id: 'q_fee_transparency_special',
    category: 'Fee Transparency',
    text: 'What specific services are included in your fee, and what costs extra?',
    whyMatters: 'Advisors often charge separately for tax planning, estate planning, or financial planning. Know what\'s included.',
    redFlags: [
      '"Everything is included" (unlikely)',
      'Vague about what\'s extra',
    ],
    greenFlags: [
      '"Financial planning is included. Tax prep with a CPA is extra at $2,000/year."',
    ],
  },

  // INVESTMENT PHILOSOPHY & CONFLICTS (4 questions)
  {
    id: 'q_philosophy',
    category: 'Investment Philosophy & Conflicts',
    text: 'What\'s your investment philosophy, and how do you decide between active and passive investing?',
    whyMatters: 'Passive (low-cost index funds) often outperforms active. Beware advisors who overcomplicate strategies.',
    redFlags: [
      'Always recommends active management',
      'Can\'t articulate a clear philosophy',
      'Dismisses index funds as "unsophisticated"',
    ],
    greenFlags: [
      '"We use low-cost index funds as the core, with strategic active managers for specialized areas."',
      '"We believe most investors are better served by passive, diversified index portfolios."',
    ],
  },
  {
    id: 'q_proprietary',
    category: 'Investment Philosophy & Conflicts',
    text: 'Do you sell proprietary products or have partnerships with product companies that benefit you financially?',
    whyMatters: 'Proprietary products often have higher fees. You need to know if they\'re recommended for your benefit or theirs.',
    redFlags: [
      'Recommends their own products excessively',
      'Defensive about proprietary holdings',
    ],
    greenFlags: [
      '"No, we\'re independent and use third-party funds and investments."',
      '"We don\'t have any proprietary products. All recommendations are unbiased."',
    ],
  },
  {
    id: 'q_products_concentration',
    category: 'Investment Philosophy & Conflicts',
    text: 'What percentage of your clients have annuities or permanent life insurance, and why?',
    whyMatters: 'If >50% have these, they may be pushed as commission-generators. These are rarely appropriate for many investors.',
    redFlags: [
      '"Most of them" (indicates over-reliance on commissions)',
      'Can\'t justify the usage rate',
    ],
    greenFlags: [
      '"Less than 10%. We only use them when appropriate for specific, limited situations."',
    ],
  },
  {
    id: 'q_portfolio_volatility',
    category: 'Investment Philosophy & Conflicts',
    text: 'How do you approach portfolio volatility and market downturns? Can you show me how your portfolio performed in 2008 and March 2020?',
    whyMatters: 'You need to know their real-world track record and risk management approach during crises.',
    redFlags: [
      'Avoids the question',
      'Blames clients for bad outcomes',
    ],
    greenFlags: [
      '"Our average client portfolio fell 22% in 2020, recovered within 18 months. Here\'s the historical data."',
    ],
  },

  // TRACK RECORD & REFERENCES (3 questions)
  {
    id: 'q_references',
    category: 'Track Record & References',
    text: 'Can you provide 3 references from clients in a situation similar to mine?',
    whyMatters: 'References reveal service quality and whether they actually serve clients like you.',
    redFlags: [
      'Refuses or hesitates',
      '"I\'d need to ask permission first"',
    ],
    greenFlags: [
      '"Absolutely. Here are 3 clients who match your profile. Feel free to contact them directly."',
    ],
  },
  {
    id: 'q_regulatory_history',
    category: 'Track Record & References',
    text: 'Have you or your firm ever been disciplined by regulators, and can I check your record independently?',
    whyMatters: 'Always verify independently on BrokerCheck and SEC IAPD. This is non-negotiable.',
    redFlags: [
      'Defensive or evasive',
      '"Nothing serious"',
    ],
    greenFlags: [
      '"No disciplinary history. Here\'s the SEC IAPD link to verify."',
    ],
  },
  {
    id: 'q_complaint_history',
    category: 'Track Record & References',
    text: 'What was your experience during major market downturns? How did you communicate with clients?',
    whyMatters: 'Communication during crises is critical. Bad advisors disappear when markets tank.',
    redFlags: [
      'Can\'t recall what they did',
      'Blames clients',
    ],
    greenFlags: [
      '"We held client meetings every month, rebalanced portfolios, and sent regular updates."',
    ],
  },
];

const conditionalQuestions: Record<string, QuizQuestion[]> = {
  // SERVICE MODEL FIT (for under $100k)
  service_model: [
    {
      id: 'q_service_level',
      category: 'Service Model Fit',
      text: 'If I have less than $100,000, what services will I actually receive for the fee I pay?',
      whyMatters: 'Many advisors don\'t actively manage small accounts but still charge full fees. Some assign you to junior staff.',
      redFlags: [
        '"Limited portfolio review"',
        '"Mostly self-service"',
      ],
      greenFlags: [
        '"Same service as all clients: quarterly reviews, rebalancing, and direct access."',
      ],
    },
  ],

  // ADVANCED SERVICES (for $2M+)
  advanced_services: [
    {
      id: 'q_estate_planning',
      category: 'Advanced Services',
      text: 'What experience do you have with estate planning, trusts, and multi-generational wealth transfer?',
      whyMatters: 'High-net-worth individuals need comprehensive estate planning strategies.',
      redFlags: [
        '"I refer clients to attorneys"',
        'Limited expertise shown',
      ],
      greenFlags: [
        '"We coordinate directly with your CPA and estate attorney on comprehensive planning."',
      ],
    },
    {
      id: 'q_tax_strategies',
      category: 'Advanced Services',
      text: 'How do you handle tax-loss harvesting, Roth conversions, charitable gifting, and other advanced tax strategies?',
      whyMatters: 'These strategies can save substantial money for wealthy clients.',
      redFlags: [
        '"We don\'t focus on tax strategies"',
      ],
      greenFlags: [
        '"Tax optimization is core to our planning. We coordinate with your CPA on strategy."',
      ],
    },
    {
      id: 'q_alternative_investments',
      category: 'Advanced Services',
      text: 'Do you recommend alternative investments (hedge funds, private equity, real estate)? How do you justify their fees?',
      whyMatters: 'Alternatives have high fees and illiquidity. Their benefits need to be clear.',
      redFlags: [
        'Pushes alternatives without justification',
        'Can\'t explain the benefit',
      ],
      greenFlags: [
        '"We use alternatives sparingly in specific circumstances where they add diversification value."',
      ],
    },
  ],

  // HOLISTIC PLANNING (for debt management goal)
  holistic_planning: [
    {
      id: 'q_debt_foundation',
      category: 'Holistic Planning',
      text: 'Are you trained to help with debt payoff strategy, emergency funds, and financial foundation-building?',
      whyMatters: 'Not all advisors are good at foundational financial planning. Some only focus on investments.',
      redFlags: [
        '"We focus on investments, not budgeting"',
        'Dismisses debt concerns',
      ],
      greenFlags: [
        '"We start with comprehensive financial planning before touching investments."',
      ],
    },
  ],

  // TAX CREDENTIALS (for tax optimization goal)
  tax_credentials: [
    {
      id: 'q_tax_credentials',
      category: 'Tax Credentials',
      text: 'Do you have a CPA or EA certification, or do you partner with a CPA who specializes in tax planning?',
      whyMatters: 'Tax optimization requires deep tax knowledge. Not all investment advisors have this expertise.',
      redFlags: [
        '"Not required"',
        'No CPA partnership',
      ],
      greenFlags: [
        '"I\'m a CFP® and CPA. We do comprehensive tax planning year-round."',
        '"We work directly with your CPA on integrated tax and investment strategy."',
      ],
    },
  ],

  // SPECIALIZED EXPERIENCE (for major life event goal)
  specialized_experience: [
    {
      id: 'q_special_situations',
      category: 'Specialized Experience',
      text: 'Have you helped clients through similar situations (inheritance, divorce, business sale)? Can you share examples?',
      whyMatters: 'These are specialized situations requiring expertise. You need to know they\'ve done this before.',
      redFlags: [
        '"No specific experience"',
        'Vague examples',
      ],
      greenFlags: [
        '"I\'ve handled 20+ business sales and helped clients optimize the proceeds."',
      ],
    },
  ],

  // FEE EDUCATION RED FLAGS (for "not sure" payment preference)
  fee_education: [
    {
      id: 'q_commission_risk',
      category: 'Fee Education & Red Flags',
      text: 'Can you explain the difference between fiduciary and suitability standards, and why it matters to me?',
      whyMatters: 'Understanding this is critical. Suitability is a much lower standard than fiduciary.',
      redFlags: [
        'Can\'t explain clearly',
        'Dismisses the difference',
      ],
      greenFlags: [
        '"Fiduciary means I must act in your best interest at all times. Suitability just means the product isn\'t unsuitable. It\'s a big difference."',
      ],
    },
    {
      id: 'q_commission_products',
      category: 'Fee Education & Red Flags',
      text: 'What\'s your typical client makeup for annuities, life insurance, and mutual funds? Are these due to client needs or commission opportunities?',
      whyMatters: 'This reveals if products are sold based on client needs or advisor compensation.',
      redFlags: [
        'High concentration of commission products',
        'Can\'t distinguish need vs. commission',
      ],
      greenFlags: [
        '"We use commission products very rarely, only when they truly fit the client\'s needs."',
      ],
    },
  ],

  // PRODUCT COMPLEXITY WARNINGS (for beginner experience)
  product_complexity: [
    {
      id: 'q_product_complexity',
      category: 'Product Complexity Warnings',
      text: 'Do you recommend complex products like structured notes, inverse ETFs, or other derivatives to beginning investors?',
      whyMatters: 'Beginners should use simple, transparent products. Complex products hide fees and risk.',
      redFlags: [
        '"Structured notes are great for diversification"',
        'Recommends options/derivatives to beginners',
      ],
      greenFlags: [
        '"For beginners, we stick with index funds and simple, transparent products."',
      ],
    },
    {
      id: 'q_fee_impact_beginner',
      category: 'Product Complexity Warnings',
      text: 'Can you show me how fees impact my long-term returns using specific examples?',
      whyMatters: 'Beginners need to understand that 1% fee difference = 30% less wealth over 30 years.',
      redFlags: [
        'Dismisses fee impact',
        'Can\'t calculate examples',
      ],
      greenFlags: [
        '"A 1% fee difference compounds to 30% less wealth over 30 years. We prioritize low-cost strategies."',
      ],
    },
  ],

  // BUSINESS OWNER EXPERTISE
  business_owner: [
    {
      id: 'q_business_retirement',
      category: 'Business Owner Expertise',
      text: 'What\'s your knowledge of business retirement plans like SEP IRAs, Solo 401(k)s, and cash balance plans?',
      whyMatters: 'Business owners have specialized retirement planning opportunities. Advisors must understand these.',
      redFlags: [
        '"You should ask your CPA"',
        'No knowledge of options',
      ],
      greenFlags: [
        '"I specialize in business owner planning. A Solo 401(k) lets you contribute $69K/year and take loans."',
      ],
    },
    {
      id: 'q_business_taxation',
      category: 'Business Owner Expertise',
      text: 'How can you help me minimize taxes on business income and take money out of my business efficiently?',
      whyMatters: 'Tax optimization on business income can save tens of thousands per year.',
      redFlags: [
        '"That\'s your CPA\'s job"',
      ],
      greenFlags: [
        '"We integrate with your CPA on salary vs. distribution decisions, C-corp vs. S-corp elections, and retirement contributions."',
      ],
    },
    {
      id: 'q_business_succession',
      category: 'Business Owner Expertise',
      text: 'Do you have experience with business succession planning, valuations, and sale structuring?',
      whyMatters: 'Business sales are major financial events. You need an advisor who understands the nuances.',
      redFlags: [
        '"Not really"',
      ],
      greenFlags: [
        '"I\'ve helped 15+ business owners structure sales and manage the proceeds."',
      ],
    },
  ],

  // EQUITY COMPENSATION
  equity_compensation: [
    {
      id: 'q_equity_strategy',
      category: 'Equity Compensation',
      text: 'Do you understand 83(b) elections, AMT calculations, and concentration risk for stock options and RSUs?',
      whyMatters: 'Equity compensation requires specialized knowledge. Wrong decisions cost thousands.',
      redFlags: [
        '"I\'m not familiar with 83(b)"',
        'Dismisses the complexity',
      ],
      greenFlags: [
        '"Yes, we coordinate with your CPA on 83(b) elections, AMT impact, and vesting strategies."',
      ],
    },
    {
      id: 'q_concentrated_position',
      category: 'Equity Compensation',
      text: 'If I have a concentrated position in company stock or RSUs, what\'s your approach to diversification?',
      whyMatters: 'Concentration risk is huge. You need a thoughtful diversification strategy.',
      redFlags: [
        '"Hold through vesting, then diversify" (slow and risky)',
        'Dismisses concentration risk',
      ],
      greenFlags: [
        '"We create a diversification plan that considers tax implications and volatility."',
      ],
    },
  ],

  // MAJOR TRANSACTION EXPERIENCE
  major_transaction: [
    {
      id: 'q_major_event_experience',
      category: 'Major Transaction Experience',
      text: 'Have you handled QDROs (Qualified Domestic Relations Orders) for divorces or inherited IRA distributions?',
      whyMatters: 'These situations have strict legal timelines. One mistake costs thousands.',
      redFlags: [
        '"I haven\'t dealt with that"',
        'Unsure about timelines',
      ],
      greenFlags: [
        '"Yes, I work closely with divorce attorneys on QDRO execution and inherited account setup."',
      ],
    },
  ],
};

export function generateQuestions(answers: {
  net_worth: string;
  primary_goal: string;
  payment_preference: string;
  experience_level: string;
  special_circumstances: string[];
}): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];
  let priority = 1;

  // Always add universal questions
  universalQuestions.forEach((q) => {
    questions.push({
      ...q,
      priority: priority++,
    });
  });

  // Add conditional questions based on answers
  if (answers.net_worth === 'under_100k') {
    conditionalQuestions.service_model.forEach((q) => {
      questions.push({ ...q, priority: priority++ });
    });
  }

  if (['2m_5m', 'over_5m'].includes(answers.net_worth)) {
    conditionalQuestions.advanced_services.forEach((q) => {
      questions.push({ ...q, priority: priority++ });
    });
  }

  if (answers.primary_goal === 'debt_management') {
    conditionalQuestions.holistic_planning.forEach((q) => {
      questions.push({ ...q, priority: priority++ });
    });
  }

  if (answers.primary_goal === 'tax_optimization') {
    conditionalQuestions.tax_credentials.forEach((q) => {
      questions.push({ ...q, priority: priority++ });
    });
  }

  if (answers.primary_goal === 'major_life_event') {
    conditionalQuestions.specialized_experience.forEach((q) => {
      questions.push({ ...q, priority: priority++ });
    });
  }

  if (answers.payment_preference === 'not_sure') {
    conditionalQuestions.fee_education.forEach((q) => {
      questions.push({ ...q, priority: priority++ });
    });
  }

  if (answers.experience_level === 'beginner') {
    conditionalQuestions.product_complexity.forEach((q) => {
      questions.push({ ...q, priority: priority++ });
    });
  }

  if (answers.special_circumstances.includes('business_owner')) {
    conditionalQuestions.business_owner.forEach((q) => {
      questions.push({ ...q, priority: priority++ });
    });
  }

  if (answers.special_circumstances.includes('stock_options')) {
    conditionalQuestions.equity_compensation.forEach((q) => {
      questions.push({ ...q, priority: priority++ });
    });
  }

  if (answers.special_circumstances.includes('divorce') || answers.special_circumstances.includes('inheritance')) {
    conditionalQuestions.major_transaction.forEach((q) => {
      questions.push({ ...q, priority: priority++ });
    });
  }

  return questions;
}
