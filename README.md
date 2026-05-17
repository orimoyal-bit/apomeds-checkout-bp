# Apomeds consultation prototype

Mobile-first checkout / consultation flow for testing UX on desktop and **iPhone**.

## Flow

1. **Welcome** — landing (Figma BP screen)
2. **15 questions** — mixed types (yes/no, single/multi choice, text, number, scale, date, cards, checkbox)
3. **Register** — email + password (mock)
4. **Product** — pick treatment (mock)
5. **Delivery** — address (mock)
6. **Payment** — mock checkout + answer summary

Tap **⚙** (bottom right) or open `/dev` for feature flags and jump to any step.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/

## Run on iPhone (same Wi‑Fi)

```bash
npm run dev:mobile
```

The script prints URLs like `http://192.168.x.x:5173/` — open that in **Safari** on your iPhone.

### If the phone cannot connect

1. Mac and iPhone on the **same Wi‑Fi** (not guest network).
2. macOS **System Settings → Network → Firewall** — allow incoming for Node/Vite, or turn firewall off briefly for testing.
3. Try your Mac’s IP from **System Settings → Wi‑Fi → Details**.

## Feature flags (`/dev`)

| Flag | Effect |
|------|--------|
| Skip questions | Welcome → Register |
| Fast checkout | Any question → Register |
| Mock payment | Test payment button |
| Step debug | Show current path under progress bar |

## Project structure

```
src/
  flow/          # steps config, questions, context, navigation
  pages/         # one page per route
  components/    # Welcome UI (header, hero)
  layout/        # shell, progress, dev FAB
```

## Add / change questions

Edit `src/flow/questions.ts` — routes are generated automatically in `App.tsx`.
