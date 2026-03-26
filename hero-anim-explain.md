Let's work on the animation inside hero again.

After the image container reaches the middle of the screen, then I want to switch the scroll behaviour. When user scrolls only once an animation will execute (not scroll triggered anymore).

The animation is:

- "def-hero-image-mobile" goes to the left and "def-hero-image-desktop" goes to the right, they both animate at the same time outwards.
- Animation continues and aftrer images above are out of the screen we wanna show #def-hero-title-2, after another scroll we wanna show #def-hero-title-3

basically we have 1 scroll action that triggers the animation, and then 2 more scroll actions that show the titles
