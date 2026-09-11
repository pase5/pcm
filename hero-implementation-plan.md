**Ananthu’s PCM — Hero implementation plan**

Build a welcoming, interactive tuition website hero that makes “Learn with clarity. Perform with confidence.” tangible. Keep the current white, black, lime, and lavender identity. Give visitors a clear route to book a free demo, alongside one small learning activity guided by the character.

This plan is based on the hero screenshot supplied in this conversation and the interactive cube concept shown afterward. The source repository, installed dependencies, booking destination, video URL, and character model have not been inspected. Dimensions, animation timings, and asset budgets below are proposed implementation values, not measurements of the existing site.

The first complete experience should include the revised layout, functional booking action, Maths cube, responsive controls, microinteractions, and model fallback. The rigged character completes the intended 3D treatment when its asset is available. Physics and Chemistry activities are later extensions.

| Order | Work package | Depends on | Reviewable result |
|---|---|---|---|
| 1 | Inspect the existing project and assets | Repository access during implementation | Confirmed integration points and asset inventory |
| 2 | Build the responsive hero layout | Package 1 | Complete static hero with working navigation and CTA |
| 3 | Implement the Maths activity | Package 2 | Rotatable cube, side-length control, and correct volume |
| 4 | Integrate the character | Package 2; rigged model for full movement | Friendly character with limited head/eye tracking and fallback |
| 5 | Add coordinated microinteractions | Packages 2–4 | Button, navbar, headline, dot-grid, and scroll feedback |
| 6 | Verify and optimize | Working hero | Responsive, keyboard-accessible, failure-tolerant implementation |

1. **Inspect the existing project and establish the integration points.**

   Read the repository instructions, package manifest, lockfile, current hero component, routing, global styles, and asset directory. Record the current build command and take baseline screenshots at desktop and mobile widths. Identify existing animation and 3D dependencies before adding packages.

   Reuse the existing framework, styling conventions, navigation destinations, and booking flow. If the application uses React, component names below map naturally to React components. If it uses another framework, keep the same responsibilities and implement them in that framework.

   | Requirement | Preferred implementation |
   |---|---|
   | Layout, text, navigation, buttons, lesson controls | Semantic HTML and the existing CSS system |
   | Simple hover, press, and colour feedback | CSS transitions |
   | Coordinated React entrances and spring movement | Existing animation library; otherwise Motion for React |
   | First Maths cube | CSS 3D transforms with native HTML controls |
   | Rigged character | Three.js; use React Three Fiber if already appropriate for the React project |
   | Static character fallback | Optimized transparent WebP/AVIF or the existing transparent image |

   Motion supports React layout, gesture, and scroll animation; its current entry point is `motion/react`. Confirm package compatibility with the installed project before installation. [Motion documentation](https://motion.dev/docs/react)

   Keep each animated property owned by one system. For example, put scroll translation on an outer wrapper and pointer tilt on an inner wrapper so they do not overwrite one another.

   Completion check: the project builds in its existing configuration, and every proposed control has a known destination or a clearly identified integration dependency.

2. **Rebuild the hero composition and design tokens.**

   Use a shared container for the navbar and hero. The left column contains the message and actions. The right column contains the character and a single compact lesson. Replace the three oversized information cards with wrapping labels beneath the copy or CTA: “Classes 8–12,” “CBSE + Kerala State,” and “Online + Offline.” These labels are informational and should not behave like buttons.

   Preserve the current headline. Shorten the supporting paragraph to explain the benefit without repeating all three labels. Use “Book a Free Demo” consistently in the navbar and hero. Include “Watch a Sample Lesson” only when a valid video is available; open it on user activation and provide a clear close control. Bind booking to the actual existing booking/contact route.

   | Token or component | Proposed value |
   |---|---|
   | Page background | `#FFFFFF` |
   | Primary text and main CTA | `#171719` |
   | Supporting text | `#686879` |
   | Lime accent | `#CFFF59`, with dark text |
   | Lavender surface | `#DEDAFF`, with dark text |
   | Neutral border | `#E9E9EF` |
   | Content container | Maximum 1,248 px; fluid width |
   | Horizontal page padding | 20 px mobile, 32 px tablet, 48 px desktop |
   | Desktop columns | Approximately 1.1fr / 1fr, with 48–56 px gap |
   | Desktop headline | 56–64 px, weight 700, line height around 1.08 |
   | Mobile headline | 36–40 px, weight 700; allow natural wrapping |
   | Supporting copy | 18 px desktop / 16 px mobile; line height around 1.6 |
   | Primary CTA | 52 px high; 24 px horizontal padding; 16 px semibold label |
   | CTA corner radius | 12 px |
   | Lesson panel corner radius | 24 px |
   | Spacing scale | 8, 12, 16, 24, 32, 48, 64 px |

   Retain the existing font if confirmed from the code; Poppins is a suitable fallback direction for the reference. Reuse locally hosted font assets where available and provide a system fallback.

   At widths of 1,200 px and above, allow a character approximately 190–210 px wide beside a lesson approximately 300–320 px wide within the right column. Use anchored regions with reserved dimensions. At narrower widths, switch to the compact composition rather than squeezing both elements.

   | Viewport | Layout and behaviour |
   |---|---|
   | 1,200 px and above | Two-column hero; full character beside the lesson |
   | 992–1,199 px | Two columns; compact character presentation associated with the lesson header |
   | 768–991 px | Copy and CTA first; lesson scene beneath; compact navbar if needed |
   | Below 768 px | One column; wrapping labels; full-width primary CTA; touch-first lesson |

   Let content determine height. On short screens, permit ordinary scrolling instead of shrinking text or clipping the scene to force everything into one viewport. Keep the logo readable and place a soft contact shadow beneath the character. Use genuine testimonials or existing results if available; otherwise rely on the verified class and syllabus information for supporting evidence.

   Completion check: at 390 px and 1,440 px widths, the headline, booking action, class details, and lesson remain legible without overlap or horizontal scrolling.

3. **Implement the Maths cube as the first learning interaction.**

   Replace the decorative chat panel with a lesson titled “See it. Understand it.” and a topic label “Maths · Volume.” Keep the activity independent of character loading so it works with the static fallback.

   | Behaviour | Exact first-release specification |
   |---|---|
   | Initial state | Side length 3 cm; volume 27 cm³ |
   | Size input | Native range control: minimum 1, maximum 5, step 1 |
   | Calculation | Volume equals side length cubed |
   | Visual size | Cube edge proportional to side length; constant scene scale |
   | Pointer/touch rotation | Horizontal drag changes yaw; fixed gentle downward viewing angle |
   | Keyboard alternative | Visible “Rotate left” and “Rotate right” buttons, 30° per activation |
   | Native keyboard input | Arrow keys operate the focused range input |
   | Feedback | Update the visible side length and volume immediately |
   | Start/reset | Start at the same initial state after a fresh page load |

   Model the cube with six CSS-transformed faces. Show a consistent grid if each division represents one centimetre. Keep the full cube inside the scene at the largest size and all supported angles. Reserve scene height before interaction so the page does not move as the cube grows.

   Preserve vertical page scrolling on touch. Capture the pointer only for the interaction region, handle cancellation, and offer the buttons as a complete alternative to dragging. Keep lesson text and numeric output in HTML. Announce committed value changes to assistive technology without narrating every animation frame.

   Essential calculation examples are 1 cm → 1 cm³, 3 cm → 27 cm³, and 5 cm → 125 cm³. Rotation must not change the result. A model-loading failure must not disable this activity.

   Keep the first release focused on Maths. Add subject tabs when a second working activity is ready. A later Physics activity can explore pendulum length; a later Chemistry activity can show a labelled water molecule. Each requires its own correct content and accessible controls before being offered to students.

   Completion check: the lesson works using a mouse, keyboard, and touch, with the same values and no dependency on a WebGL character.

4. **Prepare and integrate the 3D character.**

   Keep the reference character’s recognizable hairstyle, dark polo, and overall style, while using a more approachable resting expression. The screenshot is a visual reference; it is not a rigged model. Genuine head turns need a 3D asset with the required controls. A flat-image fallback may receive a small whole-layer tilt but should not be presented as an independently animated head.

   | Asset | Requirements |
   |---|---|
   | Character GLB | Optimized mesh, materials, and named rig controls |
   | Head and neck | Independently controllable bones with a documented neutral pose |
   | Eyes | Eye bones or equivalent look controls |
   | Expression controls | Blink controls; a friendly neutral expression |
   | Short animation clips | Point toward lesson; brief acknowledgement |
   | Poster image | Same framing as the model; transparent background where needed |
   | Model handoff notes | Bone names, clip names, scale, axis orientation, and required decoders |

   Use Three.js GLTFLoader for the model and configure the loader for any compression actually used by the asset. [Three.js GLTFLoader documentation](https://threejs.org/docs/pages/GLTFLoader.html)

   Start model preparation when the layout work begins. If the model is unavailable, finish the layout and Maths activity using the poster. Track full head/eye tracking as an outstanding asset-dependent item until the model is integrated.

   | Character state | Trigger | Behaviour |
   |---|---|---|
   | Poster | Initial load, unavailable model, or rendering failure | Show the static character in the reserved slot |
   | Neutral | Model ready; no interaction | Friendly resting pose |
   | Looking | Fine pointer moves inside the illustration area | Head yaw up to ±6°; pitch up to ±4°; smaller eye movement |
   | Teaching | User starts the lesson | One short pointing gesture toward the activity |
   | Acknowledging | User completes an input change | Brief response, with a cooldown to avoid repeated gestures |
   | Settling | Pointer leaves or action completes | Smooth return to the neutral pose |
   | Paused | Hero offscreen, hidden tab, or decorative motion disabled | Stop decorative updates and resume in a stable state |

   Normalize pointer coordinates relative to the illustration container. Apply clamped rotations relative to the neutral bone pose, not accumulated rotations. Use time-based damping so movement behaves consistently at different frame rates. Blend gesture animation and procedural look movement deliberately to prevent both from driving the same bones at full strength.

   Process pointer movement through refs or an equivalent mutable structure and update during an animation frame. Keep high-frequency motion out of React state. With React Three Fiber, use on-demand rendering for settled scenes and request frames while movement or clips are active; a demand loop needs explicit invalidation for these changes. [React Three Fiber performance guidance](https://github.com/pmndrs/react-three-fiber/blob/master/docs/advanced/scaling-performance.mdx)

   Completion check: the character returns naturally to neutral, never twists beyond the intended limits, and reliably falls back to its poster when rendering fails.

5. **Add microinteractions as a coordinated layer.**

   Apply the following values as starting points, then tune them in the actual layout. Render essential text and the CTA immediately. Let the entrance animate supporting layers and the highlight without holding the message behind a loading sequence.

   | Element | Trigger | Effect | Duration or limit |
   |---|---|---|---|
   | Headline accent | First eligible hero appearance | Lime underline or highlight behind “clarity” | 500 ms, once |
   | Supporting visual | Initial appearance | Translate upward 12 px and settle | 450–600 ms |
   | Primary CTA arrow | Hover or keyboard focus | Move right 4 px | 180 ms |
   | Primary CTA surface | Press | Scale to 0.98, then restore | 120–180 ms |
   | Secondary action | Hover or focus | Underline and colour feedback | 180 ms |
   | Navbar active item | Active section changes | Move a small indicator to the current link | 220 ms |
   | Navbar surface | Scroll exceeds roughly 40 px | Slightly compact its inner surface | 240 ms |
   | Clickable lesson card | Hover, if the whole card performs an action | Lift 3 px with a small shadow change | 200 ms |
   | Character look | Pointer in the illustration area | Follow with a soft, clamped response | Approximately 200–300 ms settling |
   | Decorative dots | Fine pointer near a dot | Repel locally, then settle | Radius about 110 px; displacement up to 8 px |
   | Hero exit | Normal downward scrolling | Small differential movement of decorative layers | Up to 24 px character / 12 px background |

   Keep the primary button stationary in the layout so it remains easy to target. Navigation links should scroll or navigate to real sections, with active states based on those sections. Reserve the navbar’s outer height while its inner treatment changes, and apply suitable scroll offset to section anchors.

   Place the dot grid behind the illustration only. Start with approximately 60–100 dots on desktop and a static grid on touch layouts. Use one local pointer listener, a single scheduled update loop, and stop when the dots have settled. Decoration should ignore pointer hit testing and stay outside the accessibility tree.

   Use the native cursor and normal page scrolling. Keep the hero unpinned. Defer subject-transition animation until multiple working lessons exist. Avoid loading an additional animation engine solely for these effects.

   Prefer transform and opacity for frequently animated UI properties; keep expensive visual effects restrained and profile the actual result. [Animation performance guidance](https://web.dev/articles/animations-guide)

   Completion check: animation improves action feedback and visual continuity while text, links, and controls stay stable and readable.

6. **Define component responsibilities and loading behaviour.**

   The following names are proposed modules to adapt to the repository, not claims about existing files.

   | Module | Responsibility |
   |---|---|
   | `HeroSection` | Responsive structure, spacing, and shared content container |
   | `HeroNavigation` | Existing section links, active indicator, mobile navigation |
   | `HeroCopy` | Single H1, short supporting copy, and class labels |
   | `HeroActions` | Booking destination and optional sample-video action |
   | `HeroExperience` | Coordinates the character and lesson layout |
   | `MathsLesson` | Owns side length, cube orientation, calculation, and controls |
   | `CharacterScene` | Lazy-loaded renderer, model loading, rig, and lighting |
   | `CharacterPoster` | Immediate stable visual and failure fallback |
   | `HeroDots` | Local decorative pointer response |
   | `useHeroMotionPolicy` | Reduced-motion preference, visibility, and input capability |
   | `hero.config` | Copy, verified destinations, design values, and motion limits |

   Keep lesson state local: side length, orientation, and whether the activity has been used. Keep asset state explicit: loading, ready, or failed. Send discrete lesson events to the character; the lesson must not wait for a character response.

   Load in this sequence:

   - Render the HTML shell, heading, real links, class labels, and dimensioned character poster.
   - Attach the small UI and lesson interactions.
   - Load the optional character runtime and model after the initial content is painted. On constrained connections, keep the poster and offer an explicit option to load the character animation.
   - Replace the poster only after the first model frame is ready and correctly framed.
   - On model error or context loss, restore the poster and preserve the lesson and CTA.

   If a script or enhancement never loads, the main content and booking link must remain usable. Do not place a full-page loader in front of the hero. If loading feedback is useful, keep it local to the character area and avoid indefinite spinners or repeated automatic retries.

7. **Apply mobile, accessibility, and performance requirements.**

   Treat 44 × 44 CSS px as the project’s minimum intended control target, with the main CTA at 52 px high. This is a design target; verify the actual layout and spacing. Provide visible keyboard focus and descriptive labels. Mobile navigation and the sample-video dialog need usable close controls, Escape handling where appropriate, and focus restoration.

   Honour `prefers-reduced-motion`: remove decorative tracking, dot repulsion, parallax, and entrance translations. Keep the lesson functional with immediate visual changes and explicit rotation buttons. If idle decorative animation is added later, provide a way to pause it. Motion’s reduced-motion configuration can cover its components; separately apply the preference to custom CSS and the 3D loop. [Motion accessibility guidance](https://motion.dev/docs/react-accessibility)

   Measure contrast from the actual colours. Normal text should meet at least 4.5:1, with the applicable 3:1 threshold for large text. Use dark text on the lime and lavender surfaces. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

   | Performance item | Initial project budget or target |
   |---|---|
   | Character poster | Aim for 180 KB or less |
   | Character model and embedded textures | Aim for 2 MB or less; measure transfer and decode costs |
   | Incremental hero UI JavaScript | Aim for 80 KB gzip or less before optional 3D runtime |
   | WebGL contexts | One for the character; CSS cube needs none |
   | Render resolution | Start with a device pixel ratio cap around 1–1.5 and tune visually |
   | Idle rendering | Stop decorative render loops after settling and when offscreen |
   | Geometry/materials | Reuse resources; reduce unnecessary materials and draw calls |
   | Shadows | Start with a simple contact shadow; add dynamic shadows only if budget permits |

   These budgets are engineering starting points, not measured results. Use load and interaction profiling to adjust them.

   Aim for LCP within 2.5 seconds, INP below 200 milliseconds, and CLS below 0.1. Pre-release lab results are diagnostic; confirm real-user performance after release when sufficient data exists. [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals)

8. **Verify the finished experience and hand it over.**

   | Check | Required outcome |
   |---|---|
   | Responsive layout | No overlap or horizontal overflow at 360, 390, 768, 1,024, and 1,440 px widths |
   | Text enlargement | Content remains usable at 200% zoom; layout reflows naturally |
   | Touch interaction | Cube dragging does not block vertical page scrolling |
   | Keyboard interaction | Navigation, booking, lesson controls, and any dialog work without a mouse |
   | Booking action | Reaches the verified booking or contact destination |
   | Lesson accuracy | 1, 3, and 5 cm produce 1, 27, and 125 cm³; orientation does not change the result |
   | Reduced motion | Decorative movement stops; lesson values and controls remain usable |
   | Slow or failed model load | Poster remains visible and other hero functions continue |
   | Hidden tab/offscreen hero | Decorative animation and rendering pause |
   | Model integration | Head/eyes clamp correctly and return to the neutral pose |
   | Cleanup | Removing the hero cleans up listeners, observers, timers, and owned 3D resources |
   | Browser coverage | Inspect current Chrome, Safari, Firefox, and at least one real touch device where available |

   Reuse the project’s existing lint, type-check, and build gates. Add focused automated checks for lesson calculations, booking destination wiring, and model-failure behaviour where the current test setup supports them. Use manual visual and interaction checks for motion quality instead of tests that merely duplicate CSS values. Stop expanding testing once these concrete risks are resolved.

   Hand over the integrated source changes, optimized character assets and rig notes, relevant desktop/mobile screenshots, and a brief validation record. State clearly whether the rigged character is complete or still awaiting its asset. Document any unavailable sample-video or booking integration rather than presenting a placeholder as a finished action.

   The core layout and lesson can be delivered while the character model is being prepared. The full planned hero is complete when visitors can understand the tuition offering, book a demo, use the lesson on desktop and mobile, and experience the intended rigged character behaviour with a reliable fallback. If the model is still missing, report the character milestone as outstanding. A later release can expand into Physics and Chemistry after the first activity is working well.
