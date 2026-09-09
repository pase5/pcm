# Tuition Centre Website — Complete Implementation Specification

**Document status:** Implementation-ready specification  
**Project type:** Responsive marketing and enquiry website  
**Audience:** Kerala State Syllabus and CBSE students in Classes 8–12, parents, and guardians  
**Learning modes:** Offline and online classes  
**Reference UI:** `a00aa31e-fc12-4fcb-9278-0ac0e6de2a05.png`

---

## 1. Project vision

Build a fast, visually distinctive tuition-centre website that presents the institution as modern, reliable, academically focused, and approachable. The site must convert visitors into enquiries while clearly explaining boards, classes, subjects, learning modes, faculty, results, and the admission process.

The experience should borrow the visual language of the supplied reference: a dark page canvas, large white rounded surfaces, vibrant yellow accents, bold display typography, modular cards, monochrome photography, and overlapping section transitions. It must not reproduce the reference brand, copy, logo, exact composition, or proprietary imagery.

### Primary goals

1. Make courses for Kerala State and CBSE Classes 8–12 easy to discover.
2. Promote both online and offline tuition.
3. Generate qualified leads through forms, calls, and WhatsApp.
4. Establish trust using results, faculty profiles, testimonials, and real photographs.
5. Showcase classroom life through a Pinterest-style masonry gallery.
6. Connect educational YouTube content without slowing down the site.
7. Deliver polished 3D scroll effects and transitions with graceful mobile fallbacks.

### Success metrics

- Demo-class enquiries
- WhatsApp and phone CTA clicks
- Course-detail views
- Enquiry-form completion rate
- YouTube video plays and channel visits
- Gallery engagement
- Organic-search traffic for class, subject, board, and locality keywords
- Core Web Vitals pass rate

---

## 2. Scope

### Phase 1 — Launch version

- Responsive public website
- Home, Courses, Course Details, Online Classes, Results, Gallery, Videos, About, and Contact pages
- Kerala State/CBSE and class-level filters
- Faculty and testimonial sections
- Pinterest-style gallery with lightbox
- YouTube video integration
- Demo-class/enquiry form
- Click-to-call, email, Google Maps, and WhatsApp actions
- Content management for courses, results, faculty, gallery, testimonials, and videos
- SEO, analytics, accessibility, performance, and security setup

### Phase 2 — Optional learning platform

- Student and parent login
- Attendance and progress reports
- Fee payment and receipts
- Timetable and announcements
- Recorded-class library
- Study-material downloads
- Online examinations and results
- Assignment submission

Phase 2 must be treated as a separate authenticated product, not forced into the marketing-site architecture.

---

## 3. Users and key journeys

### Parent

1. Opens site from search, poster, or WhatsApp.
2. Immediately sees supported boards, Classes 8–12, and online/offline availability.
3. Reviews results, faculty, teaching benefits, and testimonials.
4. Selects the child's class and board.
5. Submits a demo request or starts a WhatsApp conversation.

### Student

1. Enters through a YouTube video, social link, or search result.
2. Explores subjects, videos, gallery, and batch options.
3. Checks learning mode and faculty.
4. Books a demo class or shares the course with a parent.

### Administrator

1. Updates courses, schedules, faculty, results, gallery items, and videos.
2. Receives structured enquiries.
3. Tracks lead source and status outside the public interface.

---

## 4. Information architecture

### Main navigation

- Home
- Courses
- Online Classes
- Results
- Gallery
- Videos
- About
- Contact
- Primary CTA: **Book a Free Demo**

### Routes

| Route | Purpose |
|---|---|
| `/` | Main landing and conversion page |
| `/courses` | Searchable course catalogue |
| `/courses/[slug]` | Individual course information |
| `/online-classes` | Online-learning format and benefits |
| `/results` | Student outcomes and achievement stories |
| `/gallery` | Masonry gallery and albums |
| `/videos` | YouTube lessons, tips, and playlists |
| `/about` | Story, approach, facilities, and faculty |
| `/contact` | Enquiry form, contact information, and map |
| `/privacy` | Privacy notice |
| `/terms` | Website and enrolment terms |
| `/thank-you` | Form-submission confirmation and next steps |

The header should remain compact and sticky after the first viewport. On mobile, use a full-screen menu panel with large tap targets and a persistent bottom action bar for **Call** and **WhatsApp**.

---

## 5. Reference UI translation

### Elements to retain as inspiration

| Reference characteristic | Tuition-centre translation |
|---|---|
| Dark outer canvas | Premium charcoal site background |
| Large white rounded hero | Bright academic hero card with student/teacher imagery |
| Yellow highlights | CTA, active filters, badges, icons, and emphasis |
| Black-and-white photography | Faculty/classroom storytelling with selective colour accents |
| Dark statistic panel | Animated student, result, board, and experience metrics |
| Service selector | Interactive board/class/course selector |
| Expert cards | Faculty cards |
| Testimonial cards | Student and parent success stories |
| Yellow conversion block | High-visibility demo-class CTA and footer |
| Rounded stacked sections | Layered scroll rhythm with controlled overlap |

### Elements that must change

- Use original tuition-centre branding and logo.
- Replace all agency-focused text with educational content.
- Use licensed or institution-owned student, classroom, and faculty media.
- Avoid duplicating the exact hero composition and card arrangement.
- Add education-specific filters, course data, results, schedules, and admissions actions.
- Preserve readability and accessibility where the reference uses decorative contrast.

---

## 6. Homepage specification

### 6.1 Loading experience

- Show only on the first visit per session.
- Duration target: 800–1,600 ms; never block longer than required assets.
- Animate the brand mark, a book/page motif, or a progress line.
- Transition into the hero through scale, mask, or rounded-corner reveal.
- Respect `prefers-reduced-motion` and skip nonessential animation.
- Never use a fake percentage that delays access.

### 6.2 Header

- Transparent over hero initially; solid dark surface after scrolling.
- Logo on left, navigation in centre/right, yellow demo CTA at end.
- Active-page indicator and visible keyboard focus.
- Desktop height: 72–80 px; mobile height: 60–68 px.
- Mobile drawer traps focus, closes with Escape, and restores focus to trigger.

### 6.3 Hero

**Eyebrow:** `Kerala State & CBSE • Classes 8–12`  
**Working headline:** `Building Strong Foundations for Brighter Futures`  
**Supporting copy:** `Expert guidance, individual attention, regular assessments, and flexible online or offline learning.`

Required elements:

- Primary CTA: **Book a Free Demo**
- Secondary CTA: **Explore Courses**
- Trust note: response time, locality, or admissions status
- Student/teacher cutout or original classroom image
- Floating subject badges or academic symbols
- Optional class/board quick-selector

3D treatment:

- Use one lightweight 3D academic object or a layered 2.5D composition.
- Mouse movement on desktop: maximum rotation ±4°.
- Scroll movement: shallow depth separation, not continuous spinning.
- Mobile: static WebP/AVIF poster or simple CSS layers.
- The headline and CTAs must remain readable before 3D assets load.

### 6.4 Trust metrics

Possible metrics, shown only after verification:

- Students taught
- Years of teaching experience
- Board-exam success rate
- Subjects offered
- Online and offline batches

Use count-up animation once per session. Do not publish placeholder or unverifiable statistics.

### 6.5 Boards and classes

Provide two primary tabs: **Kerala State** and **CBSE**. Then present class groups:

- Classes 8–10
- Plus One / Class 11
- Plus Two / Class 12

Each card contains board, class, subjects, mode, batch status, short benefit, and course link. Filters must be usable without animation and encoded in the URL where helpful.

### 6.6 Teaching approach

**Working heading:** `Turning Lessons into Lasting Knowledge`

Feature:

- Concept-first teaching
- Individual attention
- Regular examinations
- Doubt-clearing sessions
- Parent progress updates
- Exam-focused revision
- Recorded support for online students, if available

Use editorial imagery and an asymmetrical card composition inspired by the reference.

### 6.7 Featured courses

Use an interactive selector on large screens and stacked cards on mobile. Each course preview includes:

- Course title
- Board and class
- Subjects
- Mode: online/offline/hybrid
- Schedule summary
- Faculty names or count
- Batch availability
- **View Course** and **Enquire** actions

### 6.8 Value divider

Large statement: `Learn ✦ Practise ✦ Achieve`

Use a subtle horizontal movement or word-by-word reveal. On reduced-motion devices, display static text.

### 6.9 Faculty

Cards contain photograph, name, subject, qualification, experience, teaching philosophy, and optional profile link. Desktop cards may use a maximum 3° hover tilt; mobile cards remain flat.

### 6.10 Results

- Separate verified marks/ranks from general testimonials.
- Display student consent where required.
- Include academic year, board, class, score/grade, and subject achievements.
- Allow filters by year, board, and class.
- Avoid claims such as “100% success” unless evidence is current and complete.

### 6.11 Testimonials

Show student and parent entries with role labels. Use a controlled carousel with buttons, pagination, swipe support, and no forced fast autoplay.

### 6.12 Gallery preview

- Masonry preview of 6–10 images.
- Mixed aspect ratios with consistent spacing.
- Category tags: Classroom, Events, Achievements, Online Learning, Celebrations.
- Lazy-load below-the-fold media.
- Open accessible lightbox with caption, keyboard navigation, and close control.

### 6.13 YouTube preview

- One featured video and 3–6 thumbnail cards.
- Use privacy-enhanced YouTube embeds where possible.
- Load the iframe only after the user selects a video.
- Show title, category, class, duration, publish date, and channel link.
- Do not automatically play audio.

### 6.14 Conversion section

**Working heading:** `Ready to Improve Your Results?`

- Short demo-class form or CTA button opening the full form.
- WhatsApp CTA with a prefilled, editable message.
- Phone CTA.
- State expected response time truthfully.
- Use the reference-inspired bright yellow panel and an original student/teacher cutout.

### 6.15 Footer

- Brand description
- Courses and quick links
- Contact details
- Address and map link
- Class timings
- YouTube and social links
- Policies and copyright
- Yellow surface with dark text, subject to contrast testing

---

## 7. Secondary page requirements

### Courses catalogue

- Filters: board, class, stream, subject, mode, and availability.
- Search by subject or course name.
- Filter state should be shareable using query parameters.
- Provide clear empty states and a filter reset.

### Course detail

- Course overview
- Board, class, stream, and subjects
- Learning outcomes
- Faculty
- Batch schedule and learning mode
- Assessment and material details
- Eligibility/prerequisites
- FAQs
- Sticky enquiry CTA
- Related courses

### Online classes

- Platforms and device requirements
- Live vs recorded availability
- How to join
- Class interaction and doubt support
- Attendance and assessments
- Sample video/interface imagery
- Online-class FAQ and demo CTA

### Results

- Filterable result grid
- Featured achievements
- Improvement stories
- Testimonial distinction
- Disclaimer explaining the represented batch/year where necessary

### Gallery

- Pinterest-style CSS masonry or calculated grid
- Category and year filters
- Image caption, date, alt text, and album
- Responsive lightbox
- Optional album sharing

### Videos

- Featured video
- Categories/playlists by class and subject
- Search and filters
- Thumbnail-first loading
- YouTube channel CTA

### About

- Institution story
- Mission and learning philosophy
- Facilities
- Faculty directory
- Milestones
- Safety and student-support practices

### Contact

- Complete enquiry form
- Contact cards
- Map link or lazy-loaded embed
- Opening/class hours
- Transport or landmark information if relevant
- WhatsApp and click-to-call

---

## 8. Design system

### 8.1 Design principles

1. **Academic clarity:** information comes before decoration.
2. **Confident energy:** bold typography and yellow accents communicate momentum.
3. **Human credibility:** use real faculty, classroom, student, and result content.
4. **Layered depth:** rounded surfaces and restrained 3D effects create richness.
5. **Mobile-first conversion:** every important action works comfortably on a phone.
6. **Accessible motion:** animation supports orientation and hierarchy.

### 8.2 Colour tokens

Initial values must be adjusted after the final logo and imagery are available.

| Token | Hex | Use |
|---|---:|---|
| `color.canvas` | `#0B0B0A` | Main dark page background |
| `color.surface.dark` | `#171816` | Dark cards and header |
| `color.surface.darkRaised` | `#242521` | Raised dark cards |
| `color.surface.light` | `#F7F6F0` | Main light surfaces |
| `color.surface.white` | `#FFFFFF` | Cards and fields |
| `color.brand.primary` | `#FFD91A` | CTA, highlights, active states |
| `color.brand.primaryHover` | `#E9C400` | Yellow hover state |
| `color.brand.secondary` | `#B7E85A` | Optional positive/success accent |
| `color.text.onDark` | `#F8F8F3` | Primary text on dark surfaces |
| `color.text.mutedDark` | `#B9BAB2` | Secondary text on dark surfaces |
| `color.text.onLight` | `#121310` | Primary text on light surfaces |
| `color.text.mutedLight` | `#5E6058` | Secondary text on light surfaces |
| `color.border.dark` | `#32332E` | Dark-surface borders |
| `color.border.light` | `#DADBD3` | Light-surface borders |
| `color.success` | `#278A4B` | Valid state and success |
| `color.warning` | `#B86C00` | Warnings |
| `color.error` | `#C63F3F` | Errors |

Never place white body text directly on primary yellow. Use `color.text.onLight` and verify WCAG contrast.

### 8.3 Typography

Recommended open-source pairing:

- Display: **Space Grotesk** or **Bricolage Grotesque**
- Body/UI: **Inter**
- Malayalam content, if required: **Noto Sans Malayalam**

| Style | Desktop | Mobile | Weight | Line height |
|---|---:|---:|---:|---:|
| Display XL | 72–88 px | 42–52 px | 700 | 0.96–1.02 |
| H1 | 56–72 px | 38–48 px | 700 | 1.00–1.08 |
| H2 | 40–52 px | 30–38 px | 650–700 | 1.08–1.15 |
| H3 | 26–32 px | 22–28 px | 600–700 | 1.15–1.25 |
| Body L | 18–20 px | 17–18 px | 400 | 1.55 |
| Body | 16 px | 16 px | 400 | 1.55–1.65 |
| Label | 13–14 px | 13–14 px | 600 | 1.3 |

Use `clamp()` for fluid headings and prevent headings from exceeding comfortable line lengths.

### 8.4 Spacing

Use a 4 px base unit:

`4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128`

- Desktop section padding: 96–128 px vertically.
- Tablet: 72–96 px.
- Mobile: 56–72 px.
- Grid gap: 24 px desktop, 16 px mobile.
- Text measure: 60–75 characters for body copy.

### 8.5 Layout

- Maximum content width: 1280 px.
- Desktop: 12-column grid.
- Tablet: 8-column grid.
- Mobile: 4-column grid.
- Outer gutters: 24–32 px desktop, 16–20 px mobile.
- Full-bleed dark canvas with inset rounded content surfaces.

### 8.6 Radius and shape

| Token | Value | Use |
|---|---:|---|
| `radius.sm` | 10 px | Inputs and small controls |
| `radius.md` | 16 px | Standard cards |
| `radius.lg` | 24 px | Feature cards |
| `radius.xl` | 32–40 px | Major sections |
| `radius.pill` | 999 px | Buttons, badges, filters |

### 8.7 Borders, shadows, and texture

- Prefer 1 px low-contrast borders over heavy shadows.
- Light cards: `0 18px 50px rgba(0,0,0,.12)` when elevated.
- Dark surfaces may use soft yellow radial glows at 4–10% opacity.
- Optional grain texture must be subtle, CSS-based or highly compressed, and ignored by assistive technology.
- Avoid excessive glassmorphism because it reduces contrast and performance.

### 8.8 Icons

- Use one consistent outlined icon set such as Lucide.
- Standard sizes: 16, 20, 24, and 32 px.
- Decorative icons are hidden from screen readers; functional icons receive accessible labels.

### 8.9 Imagery

- Prioritize original tuition-centre photography.
- Obtain permission for identifiable minors and results.
- Hero media: portrait/cutout with clear subject separation.
- Gallery: preserve natural aspect ratios.
- Export AVIF with WebP fallback and responsive source sets.
- Avoid embedding important text inside images.

### 8.10 Interactive states

Every component must define default, hover, focus-visible, active, disabled, loading, error, and success states. Focus rings should use a 2–3 px high-contrast outline with sufficient offset.

---

## 9. Component inventory

### Global

- Announcement bar
- Header and desktop navigation
- Mobile navigation drawer
- Breadcrumbs
- Footer
- Cookie/consent control if required
- Sticky mobile call/WhatsApp actions

### Content

- Hero composition
- Section heading
- Statistics strip
- Board tabs
- Class filters
- Course card
- Faculty card
- Result card
- Testimonial card/carousel
- Feature card
- Masonry gallery
- Lightbox
- YouTube thumbnail/player facade
- FAQ accordion
- CTA banner
- Map facade

### Forms

- Text, email, phone, select, radio, checkbox, and textarea controls
- Inline validation message
- Loading/success/error notice
- Spam-protection field or service
- Consent checkbox

### Enquiry form fields

- Student name
- Parent/guardian name
- Phone number
- Optional email
- Board
- Class
- Stream, where applicable
- Subjects of interest
- Preferred mode: online/offline/hybrid
- Preferred batch/time
- Message
- Consent to be contacted
- Hidden campaign/referral source

On submission, show a confirmation page and optionally offer WhatsApp as the immediate next step. Never expose private form data in analytics events or URLs.

---

## 10. Motion and 3D system

### Motion principles

- Motion explains hierarchy, continuity, and state changes.
- Entrance animations occur once and remain short.
- Scrolling must never be hijacked.
- Text and controls remain usable before animation initializes.

### Timing tokens

| Token | Duration | Use |
|---|---:|---|
| `motion.instant` | 100 ms | Press feedback |
| `motion.fast` | 180 ms | Hover and small UI transitions |
| `motion.base` | 320 ms | Cards and menus |
| `motion.slow` | 600 ms | Section reveal |
| `motion.hero` | 900–1,200 ms | Hero choreography |

Suggested easing:

- Standard: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- Exit: `cubic-bezier(0.4, 0, 1, 1)`
- Avoid spring overshoot on important reading content.

### Scroll effects

- Hero layers: translate at different rates within 24–80 px total movement.
- Major section cards: mask/clip reveal and small vertical offset.
- Statistics: count-up after intersection.
- Course cards: 40–70 ms stagger, capped at six visible items.
- Images: scale from 1.04 to 1.00 inside overflow-hidden frames.
- Value divider: restrained horizontal text movement.

### 3D implementation rules

- Use WebGL only for the hero or one signature section.
- Lazy-load the 3D bundle after primary content.
- Cap device pixel ratio around 1.5 on performance-constrained devices.
- Pause rendering when canvas is offscreen or tab is hidden.
- Provide a static fallback image.
- No animation should cause layout shift.
- Disable or reduce effects for `prefers-reduced-motion`, small screens, data-saving mode, or low-capability devices.

---

## 11. Responsive behaviour

Suggested breakpoints:

- Small: 0–639 px
- Medium: 640–899 px
- Large: 900–1199 px
- Extra large: 1200 px+

### Mobile priorities

- Single-column content order.
- Heading sizes reduced without losing impact.
- Hero visual moves below essential copy when needed.
- 3D becomes static or 2.5D.
- Filter groups use chips, drawers, or native selects.
- Gallery shifts to two columns where width permits and one column on narrow screens.
- Tables transform into cards or horizontal scrolling with labels.
- Tap targets are at least 44 × 44 px.
- Sticky bottom actions must not cover form controls or browser UI.

Test at 320, 360, 390, 768, 1024, 1280, and 1440 px widths, plus landscape phone orientation.

---

## 12. Technology architecture

### Recommended stack

- Framework: Next.js with TypeScript
- Styling: Tailwind CSS plus CSS custom properties for design tokens
- UI motion: Motion/Framer Motion
- Advanced scroll sequences: GSAP ScrollTrigger only where necessary
- 3D: Three.js with React Three Fiber and Drei
- Content: Sanity, Payload, or another headless CMS
- Validation: Zod
- Forms: server actions or API route plus transactional email/CRM/Sheet connection
- Image delivery: framework image optimization or image CDN
- Analytics: Google Analytics 4 and Search Console, configured with consent requirements
- Deployment: Vercel or equivalent Node-compatible platform

Avoid adding both animation libraries to every component. Use the smaller UI-motion library for ordinary interactions and GSAP only for complex timelines.

### Suggested source structure

```text
src/
  app/
    courses/[slug]/
    courses/
    online-classes/
    results/
    gallery/
    videos/
    about/
    contact/
    privacy/
    terms/
  components/
    layout/
    navigation/
    sections/
    cards/
    gallery/
    video/
    forms/
    motion/
    ui/
  content/
  lib/
    analytics/
    cms/
    forms/
    seo/
    youtube/
  styles/
  types/
public/
  images/
  models/
  icons/
```

### Rendering strategy

- Statically generate stable marketing pages.
- Use incremental revalidation for CMS content.
- Generate course and result pages from structured content.
- Keep interactive filters client-side but make base content crawlable.
- Use server-side endpoints for forms and protected integrations.

---

## 13. Content models

### Course

- `title`, `slug`, `board`, `classLevel`, `stream`
- `subjects[]`, `mode[]`, `summary`, `description`
- `learningOutcomes[]`, `features[]`
- `faculty[]`, `scheduleSummary`, `batchStatus`
- `feeDisplayPolicy`, `featuredImage`, `seo`

### Faculty

- `name`, `photo`, `subjects[]`, `qualification`
- `experience`, `bio`, `teachingPhilosophy`, `displayOrder`

### Result

- `studentName`, `photo`, `academicYear`, `board`, `classLevel`
- `score`, `grade`, `subjectScores[]`, `achievement`
- `consentRecorded`, `featured`

### Gallery item

- `image`, `altText`, `caption`, `category`, `eventDate`, `album`
- `photographerCredit`, `consentRecorded`, `featured`

### Video

- `youtubeId`, `title`, `description`, `thumbnail`
- `classLevel`, `subject`, `category`, `duration`, `publishedAt`, `featured`

### Testimonial

- `name`, `role`, `classOrRelationship`, `quote`, `photo`
- `academicYear`, `consentRecorded`, `featured`

### Global settings

- Brand name, logo, description
- Phone, WhatsApp, email, address, map link
- Opening hours and social links
- Default SEO image
- Announcement and admissions status

---

## 14. YouTube integration

### Preferred launch approach

Store curated YouTube video IDs in the CMS. This provides editorial control and avoids unnecessary API dependency.

### Optional automated approach

Use the YouTube Data API to fetch approved playlists or recent uploads, with server-side caching and quota monitoring. The API key must remain server-side.

### Performance requirements

- Render thumbnail and play button first.
- Replace facade with iframe only after interaction.
- Use `youtube-nocookie.com` where compatible.
- Lazy-load below-the-fold embeds.
- Include a text link to YouTube if embedding fails.

---

## 15. Gallery implementation

- Use CSS columns for a simple editorial masonry effect or a calculated grid where strict ordering is required.
- Preserve semantic reading order regardless of visual columns.
- Serve responsive AVIF/WebP images with width and height metadata.
- Use blur/colour placeholders to avoid layout shift.
- Lightbox supports captions, previous/next, Escape, swipe, focus management, and scroll locking.
- Do not publish student images without documented permission.

---

## 16. SEO and discoverability

- Unique title and meta description per page.
- Course pages target combinations of board, class, subject, and locality naturally.
- Logical H1–H3 structure.
- Canonical URLs and XML sitemap.
- Robots configuration for production and staging.
- Open Graph and social-sharing images.
- Structured data where accurate: `EducationalOrganization`, `Course`, `BreadcrumbList`, `FAQPage`, and `VideoObject`.
- Add full name, address, phone, location, and service area consistently.
- Create human-readable alt text and captions.
- Do not create thin pages for every keyword combination.

---

## 17. Accessibility requirements

Target WCAG 2.2 AA.

- Complete keyboard navigation.
- Visible focus indicators.
- Semantic landmarks and heading order.
- Form labels and contextual errors.
- Colour is never the sole indicator.
- Text contrast: at least 4.5:1 for normal text and 3:1 for large text/UI boundaries where applicable.
- Pause/stop controls for automatic movement.
- Reduced-motion alternative.
- Focus-safe modal, menu, lightbox, and carousel interactions.
- Captions or transcripts for important educational video content where available.
- English and Malayalam text use appropriate `lang` attributes.

---

## 18. Performance targets

At the 75th percentile on mobile:

- Largest Contentful Paint: under 2.5 seconds
- Interaction to Next Paint: under 200 ms
- Cumulative Layout Shift: under 0.1
- Initial page JavaScript target: under 180 KB compressed where practical, excluding lazy-loaded 3D/video code
- Hero image: preferably under 250 KB at common mobile size

Implementation controls:

- Optimize and size all images.
- Subset/self-host fonts and minimize weights.
- Lazy-load WebGL, gallery, maps, and video players.
- Dynamically import animation-heavy components.
- Pause offscreen animation loops.
- Avoid multiple scroll listeners; use Intersection Observer and requestAnimationFrame-backed libraries.
- Cache CMS and video responses.

---

## 19. Security and privacy

- Validate and sanitize every form submission server-side.
- Add rate limiting, honeypot/CAPTCHA as necessary, and CSRF-safe patterns.
- Keep API keys and credentials in server environment variables.
- Collect only required enquiry information.
- Do not send personal information to analytics.
- Publish a clear privacy notice and retention policy.
- Restrict CMS access and enable multi-factor authentication.
- Keep dependencies updated and run automated security checks.
- Review consent and legal requirements before displaying minors, marks, or testimonials.

---

## 20. Analytics event plan

| Event | Trigger |
|---|---|
| `demo_cta_click` | User selects a demo CTA |
| `enquiry_start` | First meaningful form interaction |
| `enquiry_submit` | Successful validated submission |
| `whatsapp_click` | WhatsApp CTA selected |
| `phone_click` | Click-to-call selected |
| `course_view` | Course detail opened |
| `course_filter` | Course filter changed |
| `video_play` | YouTube facade activated |
| `gallery_open` | Gallery item opened in lightbox |
| `map_open` | Map link selected |

Record only non-sensitive dimensions such as board, class, course slug, page, and campaign source.

---

## 21. Content required before launch

- Final centre name, logo, colours, and tagline
- Address, map location, phone, WhatsApp, email, and hours
- Boards, classes, streams, subjects, modes, schedules, and batch availability
- Faculty photographs, qualifications, and biographies
- Verified results with year and permission
- Student/parent testimonials with permission
- Original classroom/event/gallery images with captions and alt-text context
- YouTube channel and selected video/playlist links
- Teaching approach and institution story
- Fee visibility decision
- Demo-class process and response expectations
- Privacy and terms content

---

## 22. Development roadmap

### Stage 1 — Discovery and content audit

- Confirm audience, locality, courses, differentiators, and conversion actions.
- Collect and audit all content and media.
- Confirm whether bilingual English/Malayalam support is required.

### Stage 2 — UX and wireframes

- Finalize sitemap and user journeys.
- Produce mobile-first wireframes.
- Validate the hero, course discovery, gallery, video, and enquiry flows.

### Stage 3 — Visual design

- Convert the reference language into an original brand system.
- Design key desktop and mobile screens.
- Prototype hero depth, section transitions, gallery, and form interactions.

### Stage 4 — Design-system build

- Implement tokens and reusable UI components.
- Test contrast, states, typography, spacing, and responsive behaviour.

### Stage 5 — Frontend and CMS

- Build routes, structured content, responsive sections, and motion.
- Connect CMS previews and editing workflow.

### Stage 6 — Integrations

- Connect enquiry delivery, WhatsApp, YouTube, maps, analytics, and SEO.
- Verify error, empty, loading, and offline-like conditions.

### Stage 7 — QA and content entry

- Enter final content.
- Test browsers, devices, forms, accessibility, animation, and performance.
- Proofread academic claims and contact details.

### Stage 8 — Launch

- Configure production domain, HTTPS, analytics, indexing, redirects, and backups.
- Run final smoke tests and monitor enquiries.

### Stage 9 — Improvement

- Review analytics and enquiries after 2–4 weeks.
- Improve low-performing CTAs/pages.
- Refresh results, batches, gallery, and videos regularly.

---

## 23. Quality assurance checklist

### Functional

- Navigation and every CTA work.
- Filters and search return correct content.
- Forms validate, submit, notify, and handle failure.
- Phone, email, WhatsApp, maps, and YouTube links work.
- Lightbox, carousel, menus, and accordions support keyboard use.

### Responsive

- No horizontal overflow.
- No clipped headings, cards, or floating visuals.
- Mobile sticky actions do not cover content.
- Gallery and filters remain usable at 320 px.

### Visual

- Tokens are used consistently.
- Reference-inspired styling remains original.
- Photography has correct permission, crop, quality, and alt text.
- Loading and section transitions feel coherent.

### Performance

- Core Web Vitals checked on representative mobile and desktop devices.
- Images, fonts, video, maps, and 3D content are optimized and lazy-loaded.
- No avoidable layout shifts or permanent animation loops.

### Accessibility

- Keyboard-only journey completed.
- Screen-reader labels and heading order checked.
- Contrast and zoom to 200% checked.
- Reduced-motion mode verified.

### SEO and launch

- Metadata, canonical URLs, sitemap, robots, redirects, and structured data validated.
- Staging pages are not indexed.
- Production analytics and form delivery are verified.
- 404 and error experiences are branded and useful.

---

## 24. Definition of done

The launch version is complete when:

1. All agreed routes and CMS content types are operational.
2. Kerala State, CBSE, Classes 8–12, and online/offline offerings are immediately understandable.
3. The gallery and YouTube experience work without harming initial load speed.
4. Enquiries reliably reach the designated destination and show a confirmation.
5. The site passes agreed responsive, accessibility, performance, security, and SEO checks.
6. Motion and 3D effects have working reduced-motion and mobile fallbacks.
7. Final content, claims, permissions, legal copy, and contact details are approved.

---

## 25. Immediate decisions required

- Tuition-centre name and logo
- Location and service area
- Final list of subjects for each board/class
- Exact online/offline teaching model
- Whether fees should be public
- Enquiry destination: email, WhatsApp, CRM, Google Sheet, or admin dashboard
- CMS preference and who will maintain it
- YouTube channel/playlist links
- English-only or bilingual English/Malayalam
- Availability of original photographs and verified results

These inputs should be confirmed before high-fidelity UI design begins. Until then, the copy and metrics in this specification are clearly treated as working placeholders.
