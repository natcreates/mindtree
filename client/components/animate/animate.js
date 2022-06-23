import gsap from 'gsap';
import growLeftBottomBranch from "./growLeftBottomBranch";
import growRightBottomBranch from "./growRightBottomBranch";
import growLeftTopBranch from "./growLeftTopBranch";
import growRightTopBranch from "./growRightTopBranch";
import growTopBranch from "./growTopBranch";
import {ANIMATION_DEFAULT, COLOURS, HEIGHTS} from "./constants";
import growApples from "./growApples";

const assignValuesToBranches = (valueIds) => ({
    'leaves-lb': valueIds[0],
    'leaves-rb': valueIds[1],
    'leaves-lt': valueIds[2],
    'leaves-rt': valueIds[3],
    'leaves-top': valueIds[4],
});

const sizeAndColourTree = (size, colour) => {
    const tree = document.querySelector('.tree');
    tree.setAttribute('height', size);
    if (colour) {
        const trunkGradientStops = document.querySelectorAll('.tree stop');
        Array.from(trunkGradientStops).forEach((stop) => {
            stop.setAttribute('stop-color', colour);
        });
    }
}

const getStatus = (values) => {
    if (values.some(({score}) => score >= 10)) return 'tree';
    if (values.every(({score}) => score >= 5)) return 'sapling';
    return 'shoot';
}

export const animate = (values, timeline) => {
    if (timeline) {
        timeline.clear();
    }
    const sortedValues = values.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    const sortedValueIds = sortedValues.map(({value_id}) => value_id);
    const valueBranchMap = assignValuesToBranches(sortedValueIds);
    const scoresKeyedById = values.reduce((acc, value) => ({
        ...acc,
        [value.value_id]: value.score,
    }), {});

    const status = getStatus(values);
    sizeAndColourTree(HEIGHTS[status], COLOURS[status]);

    gsap.set('svg', {
        visibility: 'visible'
    })

    let tl = gsap.timeline();

    tl.from('#trunk', {
        ...ANIMATION_DEFAULT,
        transformOrigin: "bottom bottom",
    }).from('#branch-lb', {
        delay: 1,
        ...ANIMATION_DEFAULT,
        transformOrigin: "right bottom",
    })
        .from('#branch-rb', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "left bottom",
        })
        .from('#branch-lt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "right bottom",
        })
        .from('#branch-rt', {
            ...ANIMATION_DEFAULT,
            transformOrigin: "left bottom",
        });

    if (status === 'tree') {
        growLeftBottomBranch(tl, scoresKeyedById[valueBranchMap['leaves-lb']]);
        growRightBottomBranch(tl, scoresKeyedById[valueBranchMap['leaves-rb']]);
        growLeftTopBranch(tl, scoresKeyedById[valueBranchMap['leaves-lt']]);
        growRightTopBranch(tl, scoresKeyedById[valueBranchMap['leaves-rt']]);
        growTopBranch(tl, scoresKeyedById[valueBranchMap['leaves-top']]);

        growApples(tl, scoresKeyedById, valueBranchMap);

        // if (scoresKeyedById[valueBranchMap['leaves-lb']] >= 50) {
        // tl.from('#leaves-lb .apple-branch', {
        //     ...animationDefault,
        //         duration: 0.5,
        //         transformOrigin: "right top",
        //     }, '>');
        // }
        //
        // if (scoresKeyedById[valueBranchMap['leaves-rb']] >= 50) {
        //     tl.from('#leaves-rb .apple-branch', {
        //         ...animationDefault,
        //         duration: 0.5,
        //         transformOrigin: "left top",
        //     }, '>');
        // }
        //
        // if (scoresKeyedById[valueBranchMap['leaves-rt']] >= 50) {
        //     tl.from('#leaves-rt .apple-branch', {
        //         ...animationDefault,
        //         duration: 0.5,
        //         transformOrigin: "left top",
        //     }, '>');
        // }
        //
        // if (scoresKeyedById[valueBranchMap['leaves-top']] >= 50) {
        //     tl.from('#leaves-top .apple-branch', {
        //         ...animationDefault,
        //         duration: 0.5,
        //         transformOrigin: "right top",
        //     }, '>').
        // }
        //
    }

    return tl;
}


// function stopAndReset() {
//     gsap.killAll(false, true, false);
//     gsap.set("#tree", {clearProps: "all"});
//     gsap.set("#shadow", {clearProps: "all"});
//     gsap.set("#leaf-top", {clearProps: "all"});
//     gsap.set("#leaf-rb", {clearProps: "all"});
//     gsap.set("#leaf-rm", {clearProps: "all"});
//     gsap.set("#leaf-lb", {clearProps: "all"});
//     gsap.set("#leaf-lm", {clearProps: "all"});
//     gsap.set("#leaf-top", {clearProps: "all"});
//     gsap.set("#leaf-rb g", {clearProps: "all"});
//     gsap.set("#leaf-rm g", {clearProps: "all"});
//     gsap.set("#leaf-lb g", {clearProps: "all"});
//     gsap.set("#leaf-lm g", {clearProps: "all"});
// }

