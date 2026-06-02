Add a new division to the AZ Audio Solutions website. The user will provide the division details via $ARGUMENTS or you should ask for them.

> **Important:** This skill creates a **placeholder-level** division page using the shared `<DivisionPage>` template. It is intentionally minimal — equivalent to CommercialAudioPage or ResidentialAudioPage. For a full standalone design (like `MasjidSoundSolutionsPage`), the placeholder is a starting point only and the page will need a full design pass afterward.

## What to collect

If not provided in $ARGUMENTS, ask the user for:
1. **Division name** — e.g. "Church Audio Solutions" (used as the page title and nav label)
2. **URL slug** — e.g. `church-audio-solutions` (the route path, kebab-case)
3. **Subtitle** — one sentence describing the division (used inside the DivisionPage card)
4. **Page description** — one sentence shown below the page title in DivisionPage
5. **Bullet points** — 4–6 service bullet points for the division card

## Files to create / edit

### 1. Create `src/pages/{DivisionName}Page.jsx`

Follow this exact pattern (see `src/pages/CommercialAudioPage.jsx` as reference):

```jsx
import DivisionPage from '../components/DivisionPage'

const divisions = [
  {
    title: '{Division Name}',
    subtitle: '{Subtitle}',
    logo: '/logo-az.png',
    points: [
      '{point 1}',
      '{point 2}',
      // ...
    ]
  }
]

export default function {DivisionName}Page() {
  return (
    <DivisionPage
      eyebrow='AZ Audio Division'
      title='{Division Name}'
      text='{Page description}'
      divisions={divisions}
    />
  )
}
```

### 2. Edit `src/App.jsx`

- Add the import at the top with the other page imports
- Add `<Route path='/{slug}' element={<{DivisionName}Page />} />` inside `<Routes>`, grouped with the other division routes (before `/about`)

### 3. Edit `src/components/Layout.jsx`

- Add `{ to: '/{slug}', label: '{Division Name}' }` to the `navItems` array, after the existing division entries and before `About`

## After making the changes

Confirm all three files were updated and show the user:
- The new file path
- The new route
- Where it appears in the nav
