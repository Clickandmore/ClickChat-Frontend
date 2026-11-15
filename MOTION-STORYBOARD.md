# Navy Canvas — motion storyboard

**2026-11-14.** Status: every section is built. Hero B (Stage Sheet) is the chosen direction; hero C stays available for comparison.

**Open it:** `index.html` is hero B (Stage Sheet). `c.html` is hero C (The Column). Both open by double-click.

## Rules of the motion language

- **One motif:** the logo's bubble and its three dots. No Sadu pattern, no gold.
- **One line style:** orthogonal routes with rounded corners, mint, drawn from the channel toward the product. A coloured dot rides the line; where it lands, the product UI reacts.
- **One text reveal:** headline lines rise out of a mask; a mint rule draws under the key phrase.
- **No pinning.** Scroll effects are scrubbed, never blocking.
- **Reduced motion:** the page renders its final state; the live loops do not run.
- **Copy:** verbatim from clickchat.sa. Product UI and inbox rows are illustrative and labelled so.

## Built

### A · Hero B — Stage Sheet

| Beat | Time | What happens |
|---|---|---|
| 1 | 0.0s | Light page. The navy sheet rises from the bottom with rounded shoulders; two outline echoes follow it. |
| 2 | 0.35s | Headline lines rise from their masks, right to left. |
| 3 | 0.6s | The laptop lifts into place, breaking the sheet's top edge. |
| 4 | 1.0s | The mint rule draws under «في مكان واحد». Lead and buttons fade up. |
| 5 | 1.35s | The screen wakes: inbox rows slide in, then the conversation bubbles. |
| 6 | 1.55s | Five channel cards arrive from their own side, one by one. |
| 7 | 2.0s | Each card draws its line to the laptop; a port dot pops on the lid. |
| 8 | loop | Every 1.9s a card pulses, a dot rides its line, a row lands in the inbox, a teammate is assigned, and the three dots "type". |

- **Pointer:** cards and laptop shift at different depths.
- **Scroll:** the sheet widens to the full page and squares its corners, becoming the metrics band. Cards drift up faster than the laptop.
- **Phone:** the laptop is replaced by the readable inbox panel on the sheet, with five channel tiles feeding it.

### A · Hero C — The Column

Same beats and loop, different stage:

- A navy column wipes in from the left edge (40% of the width). The laptop sits across the seam.
- Channels live on the navy side (three beside the lid, two above it); the headline, stacked in three lines, owns the light side.
- The three dots sit vertically on the seam and nudge sideways on each arrival.
- **Phone:** the seam turns horizontal and the inbox panel straddles it.

### Metrics

The four live figures rise out of their rules, one after another, on the navy band.

### B · Channels to one inbox

- The five channels are a numbered editorial index, not cards.
- As the section scrolls in, five coloured routes draw from the index, bend, and merge into one mint trunk that enters the navy slab.
- The slab wipes open from the side the trunk arrives on; the inbox rises inside it.
- Loop: a dot rides a route; the row lands, the channel's counter ticks, a teammate is assigned.
- Interaction: selecting a channel dims the other routes and rows and renames the filter.

### I · Closing CTA

A bubble outline draws around the headline with the scroll; lines rise from masks; the three dots sit above.

## Built on 2026-11-14, second pass (hero B chosen)

| Section | Surface | Motion as built |
|---|---|---|
| **C · AI** | Violet-tinted light, navy console | "The reading line": the customer message appears, a violet rule reads across it, the intent lifts out as a tag, a route lights up (bot or teammate), then the reply types. A rail on the side fills step by step. Two scenarios: enquiry (auto-reply, the live «متجر العود» text) and complaint (hand-off). |
| **D · Campaigns** | Coral on navy | "The send sheet": 112 contact squares change with the scroll from sent, to delivered (coral), to read (mint), to replied (white); four counters follow. |
| **E · Team** | Mist | "The hand-off board": every 2.6s a conversation slides from "unassigned" to the next teammate, its status changes to assigned, and the oldest one is marked resolved and leaves. |
| **F · Integrations** | White | "The socket board": 12 logos in a ruled grid; a navy fill rises on hover and the logo turns mint. |
| **G · Analytics** | Navy | Three large figures count up and act as filters; the chart draws from today backwards and morphs between series; team bars fill. |
| **H · Pricing** | Navy stage on mist | "The plan deck" (third pass; the ledger of ruled rows was rejected). The four plans are a stack of cards on a navy stage. Picking a plan from the list brings its card to the top and sends the others behind it; the top card leans toward the pointer; the billing switch rolls the prices. |

## Added in the third pass (the live sections that were missing)

| Section | Surface | Motion as built |
|---|---|---|
| **Problem → solution** | Mist with a navy slab | Four pairs. As each row scrolls in, the problem is struck out in coral, a mint line crosses to the navy slab, and its answer arrives. |
| **Steps** | White | Three oversized outlined numerals. A mint line runs across with the scroll and fills each numeral as it reaches it; the third turns mint. |
| **Security** | White | Four ruled items with a navy sweep on hover, beside a live audit log that adds an entry every few seconds. |
| **FAQ** | White | The five live questions and answers in a ruled accordion; the plus turns into a minus as the answer opens. |

Also added in this pass:

- **Western numerals** everywhere (metrics, trust line, prices).
- **Brand-kit patterns:** the chat-bubbles pattern is the texture of the navy sheet, the inbox slab and the closing section. The Sadu band (kit file, white + mint) sits on the top edge of each navy chapter and slides with the scroll.

## Open points

1. **Plans:** copied as shown on clickchat.sa on 2026-11-14: Starter (free), Pro ($29, $290 yearly), Business ($99, $990 yearly) with their English text, and «الإحترافية» (500 ر.س. monthly). On the live site the yearly switch shows «الإحترافية» as free, which looks like a bug, so it stays at the monthly price here.
2. **Laptop photo:** it was shot on navy and is cut out in CSS. A studio shot with a transparent background would give cleaner edges.
3. **Product UI:** all screens are illustrative HTML. Real screenshots would replace them.
4. **Mint on light:** mint text fails contrast on light surfaces, so the key phrase is navy with a mint rule under it.

## Checked

Headless Edge, both heroes, at 1440×900, 1024×768 and 390×844: no console errors, no horizontal overflow. Channel filter, live inbox loop and reduced-motion state were tested in the page. Not yet tested: Safari, Firefox, real phones, and performance on a real device. English layout is not built.
