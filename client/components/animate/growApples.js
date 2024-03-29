import enableVisibility from "./enableVisibility";
import {ANIMATION_DEFAULT} from "./constants";

export default (timeline, scoresKeyedByValueId, branchToValueIdMap) => {
    const branchTransformMap = {
        'leaves-lb': "right top",
        'leaves-rb': "left top",
        'leaves-lt': "right top",
        'leaves-rt': "left top",
        'leaves-top': "right top",
    };

    return Object.keys(branchToValueIdMap).filter((branch) => branchToValueIdMap[branch]).map((branch) => {
        if (scoresKeyedByValueId[branchToValueIdMap[branch]] >= 50) {
            enableVisibility(branch, 'apple-branch');
            enableVisibility(branch, 'apple');
            timeline.from(`#${branch} .apple-branch`, {
                ...ANIMATION_DEFAULT,
                duration: 0.5,
                transformOrigin: branchTransformMap[branch],
            }, '>').from(`#${branch} .apple`, {
                ...ANIMATION_DEFAULT,
                duration: 1,
                transformOrigin: "center top",
            });
        }
    })
}
