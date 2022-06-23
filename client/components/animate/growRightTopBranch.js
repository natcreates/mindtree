import {GROWTH_LEVELS, ANIMATION_DEFAULT} from "./constants";
import enableVisibility from "./enableVisibility";

export default (timeline, valueScore) => {
    if (valueScore >= GROWTH_LEVELS[0]) {
        enableVisibility('leaves-rt', 'top-leaf');
        timeline.from('#leaves-rt .top-leaf', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "center bottom",
        }, '>');
    }

    if (valueScore >= GROWTH_LEVELS[1]) {
        enableVisibility('leaves-rt', 'leaf-rt');
        timeline.from('#leaves-rt .leaf-rt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "left bottom",
        }, '>');
    }

    if (valueScore > GROWTH_LEVELS[2]) {
        enableVisibility('leaves-rt', 'leaf-lt');
        timeline.from('#leaves-rt .leaf-lt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "right bottom",
        }, '>');
    }
}

