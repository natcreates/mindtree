import {ANIMATION_DEFAULT, GROWTH_LEVELS} from "./constants";
import enableVisibility from "./enableVisibility";

export default (timeline, valueScore) => {
    if (valueScore >= GROWTH_LEVELS[0]) {
        enableVisibility('leaves-lb', 'top-leaf');
        timeline.from('#leaves-lb .top-leaf', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "center bottom",
        }, '>');
    }

    if (valueScore >= GROWTH_LEVELS[1]) {
        enableVisibility('leaves-lb', 'leaf-rt');
        timeline.from('#leaves-lb .leaf-rt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "left bottom",
        }, '>');
    }

    if (valueScore >= GROWTH_LEVELS[2]) {
        enableVisibility('leaves-lb', 'leaf-lt');
        timeline.from('#leaves-lb .leaf-lt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "right bottom",
        }, '>');
    }

    if (valueScore > GROWTH_LEVELS[3]) {
        enableVisibility('leaves-lb', 'leaf-lb');
        timeline.from('#leaves-lb .leaf-lb', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "right top",
        }, '>');
    }
}
