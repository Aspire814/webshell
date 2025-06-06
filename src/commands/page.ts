import { createAboutPage } from '../pages/About';

export function page(input: string): string[] {
  if (input === 'about') {
    return createAboutPage();
  }
  
  return [
    '<span class="error">Page not found</span>',
    'Available pages:',
    '  about - About this project',
    '<br>'
  ];
} 