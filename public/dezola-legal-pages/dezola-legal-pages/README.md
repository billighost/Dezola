# Dezola Studio — Terms & Privacy Pages

Two new pages built to match your existing design system exactly (same
fonts, colors, hero treatment, dot-grid texture, gold accents, button
styles) — plus a "Download as PDF" button on each that exports a
fully-branded PDF, generated entirely in the browser (no backend needed).

## What's in here

```
src/
  data/
    legalData.js         ← all Terms + Privacy copy, structured
  pages/
    LegalPage.jsx         ← shared layout (hero, sticky TOC, sections)
    LegalPage.css
    TermsPage.jsx          ← thin wrapper: renders LegalPage with Terms data
    PrivacyPage.jsx        ← thin wrapper: renders LegalPage with Privacy data
  utils/
    generateLegalPDF.js   ← builds the downloadable branded PDF
```

## 1. Install the one new dependency

```bash
npm install jspdf
```

## 2. Drop the files in

Copy `src/data/legalData.js`, the four files in `src/pages/`, and
`src/utils/generateLegalPDF.js` into your project at the matching paths.

## 3. Add the two routes to `App.jsx`

Next to your other lazy-loaded pages:

```jsx
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'))
```

And inside `<Routes>`:

```jsx
<Route path="/terms" element={<TermsPage />} />
<Route path="/privacy" element={<PrivacyPage />} />
```

## 4. Link to them from the footer

In your `Footer` component, add a small links row (e.g. under
`footer-bottom`, next to the copyright line):

```jsx
<div className="footer-legal-links" style={{ display: 'flex', gap: 20 }}>
  <Link to="/terms" className="footer-credit" style={{ fontStyle: 'normal' }}>Terms & Conditions</Link>
  <Link to="/privacy" className="footer-credit" style={{ fontStyle: 'normal' }}>Privacy Policy</Link>
</div>
```

(Feel free to style this row however fits best — it intentionally
borrows `.footer-credit`'s look so it needs no extra CSS.)

## Design notes

- **Layout**: a hero identical in spirit to your Projects page hero
  (kicker, gold accent line, italic display title, giant low-opacity
  watermark), followed by a sticky numbered table-of-contents on the
  left (scrollspy-highlighted as you scroll) and the clauses on the
  right — numbering is used here because legal clauses genuinely are
  a referenced sequence, unlike the homepage where I'd avoid it.
- **Mobile**: the sidebar collapses into a dark dropdown toggle
  ("Jump to section") above the content, matching your mobile overlay
  treatment.
- **Download PDF**: click "Download as PDF" on either page to get a
  multi-page, print-ready PDF — ink cover page with your gold rule and
  serif title, cream content pages with gold section numerals and a
  footer (brand · doc name · page number). Generated fully client-side
  with `jspdf`, so no server or API cost.
- **Content**: Terms content is taken directly from your existing
  Terms & Conditions PDF, restructured into sections. Privacy Policy is
  newly written for Dezola, referencing the Nigeria Data Protection Act
  2023 — you should give it a read and adjust anything that doesn't
  match how you actually handle client/visitor data (especially the
  cookies/analytics section — only mention tools you actually use).
