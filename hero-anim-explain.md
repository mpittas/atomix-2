Let's work on the animation inside hero again.

After the image container reaches the middle of the screen (@page.tsx#L37-45), then I want to continue from this moment in timeline but switch the scroll behaviour. From this moment on (when two images reach the middle of screen) when user scrolls only once (no more scroll trigger) we do the following animation:

- "def-hero-image-mobile" goes to the left and "def-hero-image-desktop" goes to the right, they both animate at the same time outwards and they need to move out of the screen and #def-hero-title-2 appears in the middle with a simple fade. (this is one time animation after user scrolls one)

When user scrolls once more then #def-hero-title-2 disappears and #def-hero-title-3 appears in the middle with a simple fade.

Make sure when user scrolls back up the animations reverse.

---

when user scrolls back and reaches the images being in the middle of the screen (just when we swtich the scroll behaviour) please make scroll to be scroll trigger again and reverse the animation, ensuring the title and animations are in the initial position.
