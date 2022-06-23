export default (leafGroup, child) => {
    const leaf = document.querySelector(`#${leafGroup} .${child}`);
    console.log('leaf', leaf);
    leaf.setAttribute('style', 'display: initial;');
}
