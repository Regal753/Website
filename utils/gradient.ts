/**
 * Maps configured gradient tokens to concrete CSS gradient values.
 * Kept centralized so service icons never lose their background color.
 */
const BRAND_PRIMARY_GRADIENT = 'linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))';

const GRADIENTS: Record<string, string> = {
  'from-red-500 to-red-600': 'linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))',
  'from-brand-primary-500 to-brand-primary-600': BRAND_PRIMARY_GRADIENT,
  'from-brand-primary-500 to-cyan-500': 'linear-gradient(135deg, rgb(99, 102, 241), rgb(6, 182, 212))',
  'from-brand-primary-500 to-indigo-500': 'linear-gradient(135deg, rgb(99, 102, 241), rgb(99, 102, 241))',
  'from-indigo-500 to-indigo-600': 'linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))',
  'from-emerald-500 to-emerald-600': 'linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))',
  'from-emerald-500 to-teal-500': 'linear-gradient(135deg, rgb(16, 185, 129), rgb(20, 184, 166))',
  'from-cyan-500 to-cyan-600': 'linear-gradient(135deg, rgb(6, 182, 212), rgb(8, 145, 178))',
  'from-amber-500 to-orange-500': 'linear-gradient(135deg, rgb(245, 158, 11), rgb(249, 115, 22))',
  // Backward-compatible aliases.
  'from-blue-500 to-blue-600': BRAND_PRIMARY_GRADIENT,
};

export const getGradientStyle = (colorClass: string): string => {
  const normalized = (colorClass || '').trim();
  const gradient = GRADIENTS[normalized];
  return gradient || BRAND_PRIMARY_GRADIENT;
};
