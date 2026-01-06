import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveQuizSubmission(
  sessionId: string,
  answers: {
    net_worth: string;
    primary_goal: string;
    payment_preference: string;
    experience_level: string;
    special_circumstances: string[];
  },
  generatedQuestions: any[]
) {
  const { error } = await supabase.from('quiz_submissions').insert({
    session_id: sessionId,
    net_worth: answers.net_worth,
    primary_goal: answers.primary_goal,
    payment_preference: answers.payment_preference,
    experience_level: answers.experience_level,
    special_circumstances: answers.special_circumstances,
    generated_questions: generatedQuestions,
    completed_at: new Date().toISOString(),
  });

  if (error) throw error;
}

export async function trackAnalytics(step: string) {
  const { data: existing } = await supabase
    .from('quiz_analytics')
    .select('*')
    .eq('step', step)
    .eq('event_date', new Date().toISOString().split('T')[0])
    .maybeSingle();

  if (existing) {
    await supabase
      .from('quiz_analytics')
      .update({ count: (existing.count || 0) + 1 })
      .eq('id', existing.id);
  } else {
    await supabase.from('quiz_analytics').insert({
      step,
      count: 1,
    });
  }
}
