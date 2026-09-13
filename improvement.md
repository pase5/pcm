# PCM Website Audit & Improvement Plan

**Website:** https://pcm.pranavs.online/  
**Audit date:** 13 September 2026  
**Tested viewport:** Desktop, 1363 × 936 px  
**Pages tested:** Home, Courses, Online Classes, Results, Gallery, Videos, Contact, and About

## Executive verdict

The site already has a clean, premium visual direction: strong typography, consistent rounded cards, clear course grouping, usable filters, and good gallery interactions. However, it should not be treated as production-ready yet.

The most urgent problems are not visual polish; they affect trust and lead conversion:

1. **Ananthu's PCM and Zenith Academy are mixed throughout the website.**
2. **The displayed phone number and the number opened by Call/WhatsApp are different.**
3. **Every lesson card plays the same placeholder YouTube video.**
4. **Enquiry forms use unsafe/incomplete fallback behavior and pre-check marketing consent.**
5. **Privacy and Terms links do nothing.**

Fix the P0 items below before promoting or running advertisements for the site.

## What is working

- HTTP correctly redirects to HTTPS.
- All eight main internal HTML pages open successfully.
- Home-page section links for About, Methodology, and Learning Modes reach valid section IDs.
- Course text search works for subject and course keywords.
- Board and class filters work and update the visible course count.
- Course Details opens a populated detail modal.
- Course Enquire opens the demo-registration modal.
- Required-field browser validation blocks an empty form submission.
- Gallery category filters work.
- Gallery lightbox opens correctly; Right Arrow changes the image and Escape closes it.
- Main images loaded during the test; there were no visible broken content images.
- Demo modals have `role="dialog"`, `aria-modal="true"`, and can be closed with Escape.

## P0 — Fix before launch

### 1. Remove all “Zenith Academy” template content

The home page is branded as **Ananthu's PCM**, but the home testimonials, learning-mode copy, WhatsApp messages, all secondary-page titles/footers, metadata, Contact page, About page, and email address still refer to **Zenith Academy**.

Examples found:

- `Courses & Batches — Zenith Academy...`
- `Contact & Admissions — Zenith Academy...`
- `About Us — Zenith Academy...`
- `© 2025–2026 Zenith Academy`
- `admissions@zenithacademy.edu.in`
- WhatsApp prefilled messages beginning with “Hello Zenith Academy”
- Testimonials saying “Zenith...”

**Fix:** Create one shared site configuration object for brand name, address, email, phone, WhatsApp number, academic year, and social URLs. Render those values everywhere instead of duplicating strings across pages.

**Acceptance test:** Searching the deployed HTML, page titles, metadata, JavaScript data, and outbound messages for `Zenith` returns zero results.

### 2. Correct every phone and WhatsApp destination

The website visibly shows **+91 6282296414**, but Call and WhatsApp links repeatedly target **+91 9847012345**.

This can send enquiries to the wrong person and directly lose leads.

**Fix:** After confirming the official number, update all:

- `tel:` links
- `wa.me` links
- prefilled WhatsApp messages
- footer links
- Contact page direct lines
- course-detail CTAs
- floating/mobile CTA links

Use digits only in the WhatsApp URL, for example `https://wa.me/916282296414`, if 6282296414 is the confirmed number.

**Acceptance test:** Every visible phone number matches the final digits of its `tel:` and `wa.me` destination.

### 3. Replace the placeholder video system

All six video cards opened the same embed:

`https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1`

They also all opened with the title **“Ray Optics Derivations: Guaranteed 5-Mark Questions”**, regardless of which card was clicked. The Subscribe CTA only goes to the YouTube home page.

**Fix:**

- Store a unique YouTube video ID and title per lesson card.
- Populate the modal from the clicked card.
- Replace the placeholder ID with real Ananthu's PCM videos.
- Link Subscribe to the exact channel URL.
- Give the iframe a meaningful `title`.
- Make each video card a real `<button>` or `<a>`, or add `role="button"`, `tabindex="0"`, Enter/Space handling, and a clear accessible name.
- Keep `youtube-nocookie.com` if privacy-enhanced embedding is desired.

**Acceptance test:** Each of the six cards opens its own expected title and video ID; keyboard users can open every card.

### 4. Replace the current form submission architecture

Every inspected form has `method="get"` and points back to the current HTML page. If JavaScript fails or does not intercept submission, student name and phone number can be placed in the URL, browser history, analytics, and server logs.

The audit did not send a live enquiry. Empty-form validation was tested only.

Also found:

- Consent checkboxes are pre-checked on Courses, Online Classes, and Contact.
- Most inputs and selects have visible text labels but no programmatic label association (`id`/`for` or wrapping label).
- No visible privacy link explains how enquiry data will be used.
- The Online Classes form has an empty hidden `mode` value.
- Its board/class values default to Kerala State and Class 10 instead of requiring an explicit choice.

**Fix:**

- Use a secure `POST` endpoint or serverless API.
- Never place personal data in query strings.
- Leave consent unchecked by default.
- Link the consent text to a real privacy notice.
- Add unique IDs and `<label for="...">` associations to every control.
- Validate and sanitize on the server as well as the client.
- Return clear success/error states without silently reloading.
- Disable the submit button while sending and prevent duplicate enquiries.
- Add rate limiting and spam protection that does not block accessibility.
- Set `mode="Online Live Tuition"` for the online form and require users to select board/class.

**Acceptance test:** With JavaScript enabled and disabled, no personal data appears in the URL; a test submission reaches the intended backend once; consent starts unchecked; every control has an accessible name.

### 5. Publish real Privacy and Terms pages

The home footer links for **Privacy Notice** and **Terms of Enrolment** both use `href="#"` and only jump to the top of the page.

**Fix:** Add `/privacy.html` and `/terms.html`, or remove these labels until real documents exist. Privacy content should cover contact-form data, WhatsApp/phone follow-up, analytics, retention, deletion requests, and parent/guardian consent for minors.

## P1 — High-impact UX and conversion fixes

### 6. Shorten or remove the home-page preloader

The home page remained behind a full-screen preloader after 5.5 seconds in repeated tests. The loader also runs a full-screen particle canvas and can intercept clicks while the page content is already available underneath.

**Recommendation:**

- Prefer no preloader for an information/lead-generation site.
- If retained, cap it at roughly 600–800 ms and never wait for decorative assets.
- Immediately dismiss it on `window.load`, with a short hard timeout fallback.
- Respect `prefers-reduced-motion` and stop the canvas animation when hidden.
- Ensure the overlay changes to `pointer-events: none` before fading.

### 7. Preserve context when a CTA opens the form

All three home learning-mode CTAs opened the form, but the selected mode stayed **Offline Campus (Kochi)**, including:

- Claim Free 2-Day Pass
- Join Online Class

Course-detail → Enrol also opened the form without preselecting the course, board, or class. The Online Classes modal left its hidden mode empty.

**Fix:** Pass structured context into the modal, for example:

```js
openDemoModal({
  source: 'home-learning-mode',
  mode: 'Live Online Tuition',
  courseId: 'cbse-class-12-science',
  board: 'CBSE',
  classLevel: 'Class 12'
});
```

Show the selected programme at the top of the form and include it in the submitted payload.

### 8. Remove placeholder or unverifiable proof content

The site presents specific claims—18+ years, 14,500+ alumni, 99.4% pass rate, 340+ Full A+/centum scorers, named faculty, named toppers, exact scores, and testimonials—alongside stock images from Unsplash.

If these are drafts, replace them before launch. If they are real, add credible proof and obtain consent for student/parent names and photographs.

Recommended proof patterns:

- Results by year and board
- Scanned/verified score evidence with sensitive fields removed
- Real classroom and faculty photography
- Short parent/student video testimonials
- Faculty qualifications that can be verified
- A clear explanation of how pass-rate statistics were calculated

### 9. Fix domain canonicalization and error handling

Observed behavior:

| URL or action | Result | Required improvement |
|---|---|---|
| `http://pcm.pranavs.online/` | Redirects to HTTPS | Working |
| `https://pcm.pranavs.online/` | Loads home | Choose as canonical |
| `/index.html` | Also loads home with no redirect | 301 redirect to `/` or add canonical |
| `https://www.pcm.pranavs.online/` | 502 Bad Gateway | Configure DNS/hosting and redirect to non-www, or remove the record |
| Unknown page | Generic GitHub Pages 404 | Add a branded `404.html` with Home, Courses, Contact, and WhatsApp actions |
| Privacy / Terms | `#` | Publish real pages |
| YouTube Subscribe | YouTube home page | Link exact channel |
| Google Maps | Generic “MG Road Kochi” search | Link the exact verified campus pin |

Add a canonical URL to every page and consistent Open Graph/Twitter metadata. The tested home page had no canonical, Open Graph, or Twitter-card metadata. A web search for the domain returned no indexed results during this audit.

### 10. Reduce home-page scroll distance and blank space

The home document measured roughly 7,580 px tall at the tested desktop viewport. Large animation/pinning gaps make the page feel slower than its content requires.

**Recommendation:**

- Reduce vertical gaps between About, Solutions, Results, Learning Modes, and the final CTA.
- Keep the strongest conversion path visible every 1–2 screen heights.
- Remove decorative scroll distance that does not add information.
- Add `scroll-margin-top: 96px` to anchored sections; current section links align targets at the viewport top, where the floating header can cover the start of the section.

### 11. Make navigation and naming consistent

The home navigation uses **About / Courses / Classes / Results / Gallery / Contact**, while secondary pages use **About / Methodology / Programs / Results / Batches / Contact**. Videos and Online Classes are only exposed through secondary/mobile paths.

Choose one information architecture and reuse it everywhere. Recommended desktop structure:

- Home
- About
- Courses
- Online Classes
- Results
- Gallery
- Videos
- Contact

If space is limited, group Gallery and Videos under **Resources**.

## P2 — Accessibility and polish

### 12. Accessibility fixes

- Associate every form field with a real label.
- Restore focus to the CTA that opened a modal; Escape currently closes the demo modal but focus returns to the page body.
- Give gallery Previous/Next controls descriptive labels such as `aria-label="Previous image"`.
- Give the video iframe a descriptive title.
- Remove the empty heading found on the Videos page.
- Add a “Skip to main content” link.
- Verify visible focus states on all buttons, pills, cards, and links.
- Respect reduced-motion preferences for GSAP, smooth scrolling, cursor effects, and the particle loader.
- Recheck gray body text and navigation contrast against translucent backgrounds.
- Use semantic buttons instead of clickable `<div>` cards where possible.

### 13. Content and copy improvements

- Replace “Let's Create Something Exceptional” with an academic benefit, such as **“Build Stronger Concepts Before the Next Exam.”**
- Replace generic claims like “Kerala's top academic faculty” unless supported.
- Use one CTA label consistently: **Book a Free Demo**.
- State location accurately and consistently; use the verified address rather than alternating between “Kochi MG Road Campus” and a generic map query.
- Clarify whether the trial is one class or two days; both messages currently appear.
- Use the real academic year dynamically or review it before every admission cycle.

### 14. SEO and sharing

- Add canonical links to all pages.
- Add unique Open Graph title, description, image, and URL per page.
- Add Twitter/X card metadata.
- Add `LocalBusiness` or `EducationalOrganization` structured data using verified details only.
- Create and submit `sitemap.xml` and ensure `robots.txt` references it.
- Add descriptive internal links instead of sending every footer programme to the top of Courses.
- Create dedicated landing sections or query parameters for specific programmes.
- Keep a single clean home URL rather than splitting authority between `/` and `/index.html`.

## Interaction test matrix

| Area | Test | Result |
|---|---|---|
| Main navigation | Opened every internal HTML destination | Pass |
| Home section links | About, Methodology, Learning Modes | Pass; add header offset |
| Home demo CTA | Open modal and close with Escape | Pass |
| Learning-mode CTAs | Open demo modal | Opens, but wrong/default mode context |
| Course search | Physics, Commerce, Biology, no-result query | Pass |
| Course filters | Board and class pills | Pass |
| Course Details | Open course-detail modal | Pass |
| Course Enquire | Open demo modal | Pass; selected course is not carried forward |
| Empty enquiry submit | Browser required-field validation | Pass |
| Gallery filters | All five filter pills | Pass |
| Gallery image | Open lightbox | Pass |
| Lightbox keyboard | Right Arrow and Escape | Pass |
| Video cards | Open each of six lessons | Fail; all open the same placeholder video/title |
| Call links | Compare visible number with target | Fail; numbers do not match |
| WhatsApp links | Compare brand/number/message | Fail; wrong number and mixed brand |
| Privacy / Terms | Open footer links | Fail; both use `#` |
| Non-www domain | Open website | Pass |
| WWW domain | Open website | Fail; 502 response |
| Invalid route | Open nonexistent page | Generic GitHub Pages 404 |

## Page-by-page priorities

| Page | Primary issue | Priority |
|---|---|---|
| Home | Loader delay, Zenith copy, wrong CTA context, dead legal links, phone mismatch | P0/P1 |
| Courses | Zenith footer/WhatsApp, form consent and GET fallback, lost course context | P0 |
| Online Classes | Zenith copy, empty hidden mode, preselected board/class, placeholder contacts | P0 |
| Results | Verify statistics, names, scores, and stock portraits; replace Zenith metadata/footer | P0/P1 |
| Gallery | Replace stock imagery with authentic campus content; label lightbox arrows | P1/P2 |
| Videos | Every card plays the same placeholder video; cards are not keyboard controls | P0 |
| Contact | Wrong call/WhatsApp targets, Zenith email/metadata, unsafe form fallback, generic map pin | P0 |
| About | Entire page still describes Zenith Academy and potentially placeholder faculty/history | P0 |

## Recommended implementation order

### Phase 1 — One-day launch safety pass

1. Confirm official brand, phone, WhatsApp, email, address, map pin, and YouTube channel.
2. Replace all Zenith/template strings.
3. Correct phone, WhatsApp, email, map, and YouTube links.
4. Replace/remove placeholder videos.
5. Publish Privacy/Terms or temporarily remove the dead links.
6. Remove the preloader or cap it below one second.

### Phase 2 — Forms and conversion

1. Build the `POST` enquiry endpoint.
2. Fix consent defaults and accessible labels.
3. Carry course/mode/source context into the form.
4. Add success, error, loading, and duplicate-prevention states.
5. Test delivery to the actual admissions workflow.

### Phase 3 — Authenticity, responsive QA, and SEO

1. Replace stock/fabricated-looking proof content with verified material.
2. Test at 360, 390, 768, 1024, and 1440 px, including landscape orientation.
3. Test keyboard-only use and a screen reader.
4. Add canonical, social, structured-data, sitemap, and branded 404 support.
5. Re-run link, form, accessibility, and performance tests after deployment.

## Final acceptance checklist

- [ ] Zero `Zenith` references in deployed pages, metadata, scripts, and messages
- [ ] One verified phone/WhatsApp number everywhere
- [ ] Real email, address, exact map pin, and YouTube channel
- [ ] Every video card plays its intended lesson
- [ ] Enquiries use POST and never expose personal data in the URL
- [ ] Consent is unchecked by default
- [ ] Each form field has a programmatic label
- [ ] CTA source, course, board, class, and mode are preserved
- [ ] Privacy and Terms pages work
- [ ] `/index.html` canonicalizes to `/`
- [ ] `www` redirects correctly or is removed
- [ ] Branded 404 page exists
- [ ] Loader cannot block interaction for more than one second
- [ ] Real results/testimonials have evidence and consent
- [ ] Desktop, mobile, keyboard, reduced-motion, and screen-reader checks pass

## Audit limitation

The live production UI was tested interactively in a desktop browser. No real enquiry was submitted, so final backend delivery, WhatsApp handoff after submission, email notifications, data storage, and spam controls remain unverified. Mobile breakpoints should be re-tested on physical Android and iOS devices after the P0 fixes.
