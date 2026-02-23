/**
 * Maps Tailwind gradient color class strings to CSS linear-gradient values.
 * Shared by Services and ServiceDetailPage components.
 */
export const getGradientStyle = (colorClass: string): string => {
  const gradients: Record<string, string> = {
    'from-red-500 to-red-600': 'linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))',
    'from-blue-500 to-blue-600': 'linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))',
    'from-indigo-500 to-indigo-600': 'linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))',
    'from-emerald-500 to-emerald-600': 'linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))',
    'from-cyan-500 to-cyan-600': 'linear-gradient(135deg, rgb(6, 182, 212), rgb(8, 145, 178))',
  };
  return gradients[colorClass] || gradients['from-red-500 to-red-600'];
};
