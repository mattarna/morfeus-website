import { redirect } from 'next/navigation';

/**
 * Root Page Redirect
 * 
 * This file handles the initial entry to the website at the root domain (/).
 * It automatically redirects the user to the default language (English).
 * 
 * The middleware also handles this, but having this file ensures a 
 * smooth redirect even if the middleware is bypassed or during 
 * static generation phases.
 */
export default function RootPage() {
  redirect('/en');
}




