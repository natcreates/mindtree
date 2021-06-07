import gsap from 'gsap';

export const animate = () => {
    // setup();
    gsap.set('svg', {
        visibility: 'visible'
    })

    let tl = gsap.timeline({repeat: -1});
    tl.from('#trunk', {
        scale: 0,
        duration: 1,
        transformOrigin: "bottom bottom",
        ease: 'ease-in-out'
    })
        .from('#branch-rb', {
            scale: 0,
            duration: 1,
            delay: 1,
            transformOrigin: "left bottom",
            ease: 'ease-in-out'
        })
        .from('#branch-lb', {
            scale: 0,
            duration: 1,
            transformOrigin: "right bottom",
            ease: 'ease-in-out'
        })
        .from('#branch-lt', {
            scale: 0,
            duration: 1,
            transformOrigin: "right bottom",
            ease: 'ease-in-out'
        })
        .from('#branch-rt', {
            scale: 0,
            duration: 1,
            transformOrigin: "left bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-rb .top-leaf', {
            scale: 0,
            duration: 1,
            transformOrigin: "center bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-rb .leaf-lt', {
            scale: 0,
            duration: 1,
            transformOrigin: "right bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-rb .leaf-rt', {
            scale: 0,
            duration: 1,
            transformOrigin: "left bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-lb .top-leaf', {
            scale: 0,
            duration: 1,
            transformOrigin: "center bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-lb .leaf-rt', {
            scale: 0,
            duration: 1,
            transformOrigin: "left bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-lb .leaf-lt', {
            scale: 0,
            duration: 1,
            transformOrigin: "right bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-lb .leaf-lb', {
            scale: 0,
            duration: 1,
            transformOrigin: "right top",
            ease: 'ease-in-out'
        })
        .from('#leaves-lt .top-leaf', {
            scale: 0,
            duration: 1,
            transformOrigin: "center bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-lt .apple-branch', {
            scale: 0,
            duration: 1,
            transformOrigin: "right top",
            ease: 'ease-in-out'
        })
        .from('#leaves-lt .leaf-lb', {
            scale: 0,
            duration: 1,
            transformOrigin: "right center",
            ease: 'ease-in-out'
        })
        .from('#leaves-lt .leaf-rt', {
            scale: 0,
            duration: 1,
            transformOrigin: "left bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-lt .leaf-lt', {
            scale: 0,
            duration: 1,
            transformOrigin: "right bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-rt .top-leaf', {
            scale: 0,
            duration: 1,
            transformOrigin: "center bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-rt .leaf-rt', {
            scale: 0,
            duration: 1,
            transformOrigin: "left bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-rt .leaf-lt', {
            scale: 0,
            duration: 1,
            transformOrigin: "right bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-top .top-leaf', {
            scale: 0,
            duration: 1,
            transformOrigin: "center bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-top .leaf-lt', {
            scale: 0,
            duration: 1,
            transformOrigin: "right bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-top .leaf-rt', {
            scale: 0,
            duration: 1,
            transformOrigin: "left bottom",
            ease: 'ease-in-out'
        })
        .from('#leaves-top .leaf-lb', {
            scale: 0,
            duration: 1,
            transformOrigin: "right top",
            ease: 'ease-in-out'
        })
        .from('#leaves-rb .apple-branch', {
            scale: 0,
            duration: 0.5,
            transformOrigin: "left top",
            ease: 'ease-in-out'
        })
        .from('#leaves-lb .apple-branch', {
            scale: 0,
            duration: 0.5,
            transformOrigin: "right top",
            ease: 'ease-in-out'
        })
        .from('#leaves-rt .apple-branch', {
            scale: 0,
            duration: 0.5,
            transformOrigin: "left top",
            ease: 'ease-in-out'
        })
        .from('#leaves-top .apple-branch', {
            scale: 0,
            duration: 0.5,
            transformOrigin: "right top",
            ease: 'ease-in-out'
        })
        .from('.apple', {
            scale: 0,
            duration: 1,
            transformOrigin: "center top",
            ease: 'ease-in-out'
        })


    
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

