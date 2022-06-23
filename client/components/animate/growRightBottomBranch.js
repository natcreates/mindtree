import {GROWTH_LEVELS, ANIMATION_DEFAULT} from "./constants";
import enableVisibility from "./enableVisibility";

export default (timeline, valueScore) => {
    if (valueScore >= GROWTH_LEVELS[0]) {
        enableVisibility('leaves-rb', 'top-leaf');
        timeline.from('#leaves-rb .top-leaf', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "center bottom",
        }, '>');
    }

    if (valueScore >= GROWTH_LEVELS[1]) {
        enableVisibility('leaves-top', 'leaf-lt');
        timeline.from('#leaves-rb .leaf-lt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "right bottom",
        }, '>');
    }

    if (valueScore >= GROWTH_LEVELS[3]) {
        enableVisibility('leaves-top', 'leaf-rt');
        timeline.from('#leaves-rb .leaf-rt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "left bottom",
        }, '>');
    }
};
