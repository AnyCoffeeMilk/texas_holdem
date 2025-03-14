## Update Log

### Day 1
Set up basic stucture of the next framework and add all basic components of 'texas holdem game'. 
Added Draw card/shuffle deck and Start a new game method.

### Day 2
Complete the card pattern detect algorithm (Can get the score of each card pattern).
Complete the winner detect algorithm (Can get the winner of the game according to the scores).
Add a flip card method for the PokerCard component for testing and fun.

### Day 3
Complete the turn queue system (Including Call, Raise, Fold function for player side).
Implement of the winner detect system to the turn queue system.
Winner detect bug fix.

### Day 4
Apple the design to the layout frame.
Add responsive effect to the buttons.
Gathered some icon for after use.

### Day 5
Icon implement (including using useMemo to optimize loading performance). 
Style update (icluding design of cards, borders and paddings).
New font update.
New Icon.
New Homepage (including navigation of game page).
More button click response.
Add Action bar in game page.

### Day 6
More icon implement (using React component to import SVGs)
Game page button style update, lock while not in turn function update.
Add profile edit server action and profile edit page (/home/profile).
Add profile data read for Game page.
Add Shop page (/home/profile), for bank currency loaning (test play).
Add Settings page (/home/settings), no function, just a demo.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
