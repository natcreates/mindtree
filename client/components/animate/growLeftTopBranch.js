import {GROWTH_LEVELS, ANIMATION_DEFAULT} from "./constants";
import enableVisibility from "./enableVisibility";

export default (timeline, valueScore) => {
    if (valueScore >= GROWTH_LEVELS[0]) {
        enableVisibility('leaves-lt', 'top-leaf');
        timeline.from('#leaves-lt .top-leaf', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "center bottom",
        }, '>');
    }

    if (valueScore >= GROWTH_LEVELS[1]) {
        enableVisibility('leaves-lt', 'apple-branch');
        timeline.from('#leaves-lt .apple-branch', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "right top",
        }, '>');
    }

    if (valueScore >= GROWTH_LEVELS[2]) {
        enableVisibility('leaves-lt', 'leaf-lb');
        enableVisibility('leaves-lt', 'leaf-rt');
        timeline.from('#leaves-lt .leaf-lb', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "right center",
        }, '>').from('#leaves-lt .leaf-rt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "left bottom",
        });
    }

    if (valueScore > GROWTH_LEVELS[3]) {
        enableVisibility('leaves-lt', 'leaf-lt');
        timeline.from('#leaves-lt .leaf-lt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "right bottom",
        }, '>');
    }

}

