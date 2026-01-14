# Ryokome - Travel Search & Comparison Website

Ryokome is a production-ready, static travel comparison website focused on helping travelers find and compare flights, car rentals, and airport transfers.

## Overview

This is a fully static website built with:
- **Pure HTML5** for semantic markup
- **Vanilla CSS** with mobile-first responsive design
- **Vanilla JavaScript** for navigation and interactions
- **No build tools or frameworks** required

The site is optimized for:
- Google SEO and E-E-A-T compliance
- Mobile-first user experience
- Cloudflare Pages deployment
- Affiliate monetization

## Project Structure

```
ryokome/
├── index.html                  # Homepage
├── flights.html                # Flights comparison (primary revenue page)
├── cars.html                   # Car rental comparison
├── airport-transfers.html      # Airport transfer information
├── travel-checklist.html       # Authoritative travel checklist
├── about.html                  # About page
├── privacy-policy.html         # Privacy policy
├── terms-of-service.html       # Terms of service
├── cookie-policy.html          # Cookie policy
├── affiliate-disclosure.html   # Affiliate disclosure
├── assets/
│   ├── css/
│   │   └── main.css           # Mobile-first CSS
│   ├── js/
│   │   └── main.js            # Vanilla JavaScript
│   └── images/
│       └── hero/
├── sitemap.xml                 # Sitemap index
├── sitemap-main.xml           # Main sitemap
├── robots.txt                  # Search engine directives
├── _redirects                  # Cloudflare Pages redirects
└── README.md                   # This file
```

## Features

### SEO Optimized
- Semantic HTML5 structure
- Proper heading hierarchy (one H1 per page)
- Meta descriptions and Open Graph tags
- XML sitemaps for search engines
- Clean internal linking structure
- Canonical URLs

### E-E-A-T Compliant
- Clear About page explaining site purpose
- Comprehensive Affiliate Disclosure
- Privacy Policy, Terms of Service, Cookie Policy
- Authoritative travel checklist with external links to trusted sources
- Transparent affiliate relationships
- High-quality, original content

### Mobile-First Design
- Responsive layout optimized for 360px screens first
- Touch-friendly navigation
- No horizontal scrolling
- Core Web Vitals optimized
- Works without JavaScript (progressive enhancement)

### Monetization
- Flight search widgets (primary revenue)
- Car rental widgets
- Popular routes widgets
- Pricing calendar widgets
- Map-based flight search

## Deployment

### Cloudflare Pages

1. Connect your Git repository to Cloudflare Pages
2. Build settings:
   - **Build command:** Leave empty (no build required)
   - **Build output directory:** `/` (root)
   - **Root directory:** `/` (or leave empty)

3. Deploy - the site will be served directly from the repository

### Other Static Hosts

This site can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any web server (Apache, Nginx, etc.)

Simply upload all files to the web root. No build process needed.

## Content Guidelines

### Creating New Pages
When adding new pages:
1. Use semantic HTML5 markup
2. Include proper meta tags and descriptions
3. Follow mobile-first design principles
4. Add to sitemap-main.xml
5. Update navigation in all existing pages
6. Ensure footer links are consistent

### SEO Best Practices
- One `<h1>` per page
- Logical heading hierarchy (h1 > h2 > h3)
- Meaningful alt text for images
- Internal linking to related pages
- External links to authoritative sources
- 300+ words of unique, valuable content per page

### Affiliate Widgets

Current affiliate widgets (all from Travelpayouts):
- Flight Search Widget (promo_id: 7879)
- Pricing Calendar Widget (promo_id: 2811)
- Popular Routes Widget (promo_id: 4044)
- Prices on Map Widget (promo_id: 4054)
- Car Rental Widget (promo_id: 4850)

All widgets use:
- trs: 482158
- shmarker: 691366
- campaign_id: 100

## Browser Support

This website supports:
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No framework overhead
- Minimal JavaScript
- Optimized CSS
- Async widget loading
- Fast page loads

## License

All rights reserved. © 2026 Ryokome

## Future Development

This is the core site only. The following are planned for separate development:
- Route-specific pages (e.g., /flights/new-york-to-london)
- Blog content
- Additional destination guides
- Enhanced search functionality

## Contact

For questions about this project, see the About page on the live site.

## Technical Notes

- All pages render without JavaScript (progressive enhancement)
- Navigation uses vanilla JavaScript for mobile menu toggle
- CSS uses mobile-first media queries (@media min-width)
- Widgets are loaded asynchronously to avoid blocking page render
- Site is fully crawlable by search engines
- No cookies set by core site (only by third-party widgets)

## Google Search Console Setup

1. Submit `sitemap.xml` (the index file, not sitemap-main.xml)
2. Verify ownership via HTML file upload or DNS
3. Monitor indexing status
4. Check for mobile usability issues
5. Review Core Web Vitals

## Maintenance

Regular maintenance tasks:
- Update lastmod dates in sitemaps when content changes
- Review and update legal pages annually
- Check for broken external links quarterly
- Monitor widget functionality
- Update copyright year in footer
