/**
 * SEO Utilities for MegaBlog
 * Dynamic meta tag updates and schema markup generation
 */

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://mega-blog-prashantkhuvas-projects.vercel.app';

/**
 * Update document meta tags dynamically
 */
export function updateMetaTags({ title, description, image, url, type = 'website' }) {
  // Title
  document.title = title;

  // Meta description
  updateMeta('name', 'description', description);

  // Canonical URL
  updateLink('canonical', url || BASE_URL);

  // Open Graph
  updateMeta('property', 'og:title', title);
  updateMeta('property', 'og:description', description);
  updateMeta('property', 'og:image', image || `${BASE_URL}/og-image.png`);
  updateMeta('property', 'og:url', url || BASE_URL);
  updateMeta('property', 'og:type', type);

  // Twitter
  updateMeta('name', 'twitter:title', title);
  updateMeta('name', 'twitter:description', description);
  updateMeta('name', 'twitter:image', image || `${BASE_URL}/og-image.png`);
}

/**
 * Update a meta tag by attribute
 */
function updateMeta(attrType, attrValue, content) {
  let meta = document.querySelector(`meta[${attrType}="${attrValue}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrType, attrValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Update a link tag
 */
function updateLink(rel, href) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Generate BlogPosting schema for a post
 */
export function generateBlogPostingSchema(post) {
  if (!post) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": getExcerpt(post.content, 160),
    "image": post.featuredImage || `${BASE_URL}/og-image.png`,
    "datePublished": post.$createdAt,
    "dateModified": post.$updatedAt || post.$createdAt,
    "author": {
      "@type": "Person",
      "name": post.authorName || "MegaBlog Author"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MegaBlog",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/favicon.svg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/post/${post.$id}`
    },
    "wordCount": getWordCount(post.content),
    "articleBody": stripHtml(post.content)
  };
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Inject schema into document
 */
export function injectSchema(schema) {
  if (!schema) return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Remove all injected schemas (for cleanup)
 */
export function clearInjectedSchemas() {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  scripts.forEach(script => {
    // Keep the Organization and WebSite schemas from index.html
    if (!script.textContent.includes('"@type": "Organization"') &&
        !script.textContent.includes('"@type": "WebSite"')) {
      script.remove();
    }
  });
}

/**
 * Get plain text excerpt from HTML content
 */
function getExcerpt(html, maxLength = 160) {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Strip HTML tags from content
 */
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Get word count from HTML content
 */
function getWordCount(html) {
  const text = stripHtml(html);
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 60) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
