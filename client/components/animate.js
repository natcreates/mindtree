import gsap from 'gsap';

const animationDefault = {
    scale: 0,
    duration: 1,
    ease: 'ease-in-out',
};

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
    const trunkGradientStops = document.querySelectorAll('.tree stop');
    Array.from(trunkGradientStops).forEach((stop) => {
        stop.setAttribute('stop-color', colour);
    });
}

const enableVisibility = (leafGroup, child) => {
    const leaf = document.querySelector(`#${leafGroup} .${child}`);
    console.log('leaf', leaf);
    leaf.setAttribute('style', 'display: initial;');
}

const growLeftBottomBranch = (timeline, valueScore) => {
    if (valueScore >= 30) {
        enableVisibility('leaves-lb', 'top-leaf');
        timeline.from('#leaves-lb .top-leaf', {
            ...animationDefault,
            transformOrigin: "center bottom",
        }, '>');
    }

    if (valueScore >= 35) {
        enableVisibility('leaves-lb', 'leaf-rt');
        timeline.from('#leaves-lb .leaf-rt', {
            ...animationDefault,
            transformOrigin: "left bottom",
        }, '>');
    }

    if (valueScore >= 40 ) {
        enableVisibility('leaves-lb', 'leaf-lt');
        timeline.from('#leaves-lb .leaf-lt', {
            ...animationDefault,
            transformOrigin: "right bottom",
        }, '>');
    }

    if (valueScore > 45) {
        enableVisibility('leaves-lb', 'leaf-lb');
        timeline.from('#leaves-lb .leaf-lb', {
            ...animationDefault,
            transformOrigin: "right top",
        }, '>');
    }
}

const growLeftTopBranch = (timeline, valueScore) => {
    if (valueScore >= 30) {
        enableVisibility('leaves-lt', 'top-leaf');
        timeline.from('#leaves-lt .top-leaf', {
            ...animationDefault,
            transformOrigin: "center bottom",
        }, '>');
    }

    if (valueScore >= 35) {
        enableVisibility('leaves-lt', 'apple-branch');
        timeline.from('#leaves-lt .apple-branch', {
            ...animationDefault,
            transformOrigin: "right top",
        }, '>');
    }

    if (valueScore >= 40 ) {
        enableVisibility('leaves-lt', 'leaf-lb');
        enableVisibility('leaves-lt', 'leaf-rt');
        timeline.from('#leaves-lt .leaf-lb', {
            ...animationDefault,
            transformOrigin: "right center",
        }, '>').from('#leaves-lt .leaf-rt', {
            ...animationDefault,
            transformOrigin: "left bottom",
        });
    }

    if (valueScore > 45) {
        enableVisibility('leaves-lt', 'leaf-lt');
        timeline.from('#leaves-lt .leaf-lt', {
            ...animationDefault,
            transformOrigin: "right bottom",
        }, '>');
    }

}

const growRightTopBranch = (timeline, valueScore) => {
    if (valueScore >= 30) {
        enableVisibility('leaves-rt', 'top-leaf');
        timeline.from('#leaves-rt .top-leaf', {
            ...animationDefault,
            transformOrigin: "center bottom",
        }, '>');
    }

    if (valueScore >= 35) {
        enableVisibility('leaves-rt', 'leaf-rt');
        timeline.from('#leaves-rt .leaf-rt', {
            ...animationDefault,
            transformOrigin: "left bottom",
        }, '>');
    }

    if (valueScore > 45) {
        enableVisibility('leaves-rt', 'leaf-lt');
        timeline.from('#leaves-rt .leaf-lt', {
            ...animationDefault,
            transformOrigin: "right bottom",
        }, '>');
    }
}

const growTopBranch = (timeline, valueScore) => {
    if (valueScore >= 30) {
        enableVisibility('leaves-top', 'top-leaf');
        timeline.from('#leaves-top .top-leaf', {
            ...animationDefault,
            transformOrigin: "center bottom",
        }, '>');
    }

    if (valueScore >= 35) {
        enableVisibility('leaves-top', 'leaf-lt');
        timeline.from('#leaves-top .leaf-lt', {
            ...animationDefault,
            transformOrigin: "right bottom",
        }, '>');
    }

    if (valueScore >= 40) {
        enableVisibility('leaves-top', 'leaf-rt');
        timeline.from('#leaves-top .leaf-rt', {
            ...animationDefault,
            transformOrigin: "left bottom",
        }, '>');
    }

    if (valueScore > 45) {
        enableVisibility('leaves-top', 'leaf-lb');
        timeline.from('#leaves-top .leaf-lb', {
            ...animationDefault,
            transformOrigin: "right top",
        }, '>');
    }
}

const growRightBottomBranch = (timeline, valueScore) => {
    if (valueScore >= 30) {
        enableVisibility('leaves-rb', 'top-leaf');
        timeline.from('#leaves-rb .top-leaf', {
            ...animationDefault,
            transformOrigin: "center bottom",
        }, '>');
    }

    if (valueScore >= 35) {
        enableVisibility('leaves-top', 'leaf-lt');
        timeline.from('#leaves-rb .leaf-lt', {
            ...animationDefault,
            transformOrigin: "right bottom",
        }, '>');
    }

    if (valueScore >= 45 ) {
        enableVisibility('leaves-top', 'leaf-rt');
        timeline.from('#leaves-rb .leaf-rt', {
            ...animationDefault,
            transformOrigin: "left bottom",
        }, '>');
    }
};

const growApples = (timeline, scoresKeyedByValueId, valueScoresMap) => {
    const branchTransformMap = {
        'leaves-lb': "right top",
        'leaves-rb': "left top",
        'leaves-lt': "right top",
        'leaves-rt': "left top",
        'leaves-top': "right top",
    };

    return Object.keys(scoresKeyedByValueId).map((branch) => {
        if (valueScoresMap[branch] >= 50) {
            enableVisibility(branch, 'apple-branch');
            enableVisibility(branch, 'apple');
            timeline.from(`#${branch} .apple-branch`, {
                ...animationDefault,
                duration: 0.5,
                transformOrigin: branchTransformMap[branch],
            }, '>').from(`#${branch} .apple`, {
                ...animationDefault,
                duration: 1,
                transformOrigin: "center top",
            });
        }
    })
}

export const animate = (values) => {
    console.log('values', values);
    const sortedValues = values.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    console.log('sortedValues', sortedValues);
    const sortedValueIds = sortedValues.map(({value_id}) => value_id);
    const valueBranchMap = assignValuesToBranches(sortedValueIds);
    const scoresKeyedById = values.reduce((acc, value) => ({
        ...acc,
        [value.value_id]: value.score,
    }), {});


    const isShoot = values.some(({score}) => score < 10);
    const isSapling = values.every(({score}) => score >= 10 && score < 25);
    const isTree = values.some(({score}) => score >= 25);
    // const fruitingValues = values.find((value) => value.score >= 40);

    if (isShoot) {
        sizeAndColourTree('400', 'lightgreen');
    }

    if (isSapling) {
        sizeAndColourTree('600', 'green');
    }

    if (isTree) {
        const tree = document.querySelector('.tree');
        tree.setAttribute('height', '800');

    }

    gsap.set('svg', {
        visibility: 'visible'
    })

    let tl = gsap.timeline({repeat: -1});

    tl.from('#trunk', {
        ...animationDefault,
        transformOrigin: "bottom bottom",
    }).from('#branch-lb', {
        delay: 1,
        ...animationDefault,
        transformOrigin: "right bottom",
    })
        .from('#branch-rb', {
            ...animationDefault,
            transformOrigin: "left bottom",
        })
        .from('#branch-lt', {
            ...animationDefault,
            transformOrigin: "right bottom",
        })
        .from('#branch-rt', {
            ...animationDefault,
            transformOrigin: "left bottom",
        });

    if (isTree) {
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

