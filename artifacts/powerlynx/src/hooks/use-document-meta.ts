import { useEffect } from 'react';

interface DocumentMetaOptions {
  title: string;
  description?: string;
  path?: string;
}

const SITE_NAME = 'POWERLYNX';
const SITE_ORIGIN = 'https://powerlinkus.com';

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Updates the document title and key meta tags for the current route.
 * This is a CSR app, so this mainly helps social-share unfurls and
 * crawlers that execute JavaScript (e.g. Googlebot), while index.html
 * carries the default tags for crawlers that only fetch static HTML.
 */
export function useDocumentMeta({ title, description, path }: DocumentMetaOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('name', 'twitter:title', fullTitle);

    if (path) {
      setCanonical(`${SITE_ORIGIN}${path}`);
      setMetaTag('property', 'og:url', `${SITE_ORIGIN}${path}`);
    }
  }, [title, description, path]);
}
