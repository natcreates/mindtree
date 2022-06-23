import {GROWTH_LEVELS, ANIMATION_DEFAULT} from "./constants";
import enableVisibility from "./enableVisibility";

export default (timeline, valueScore) => {
    if (valueScore >= GROWTH_LEVELS[0]) {
        enableVisibility('leaves-top', 'top-leaf');
        timeline.from('#leaves-top .top-leaf', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "center bottom",
        }, '>');
    }

    if (valueScore >= GROWTH_LEVELS[1]) {
        enableVisibility('leaves-top', 'leaf-lt');
        timeline.from('#leaves-top .leaf-lt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "right bottom",
        }, '>');
    }

    if (valueScore >= GROWTH_LEVELS[2]) {
        enableVisibility('leaves-top', 'leaf-rt');
        timeline.from('#leaves-top .leaf-rt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "left bottom",
        }, '>');
    }

    if (valueScore > GROWTH_LEVELS[3]) {
        enableVisibility('leaves-top', 'leaf-lb');
        timeline.from('#leaves-top .leaf-lb', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "right top",
        }, '>');
    }
}


