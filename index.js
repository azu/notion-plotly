const main = document.getElementById('main');
const url = new URL(location.href);
const pX = url.searchParams.get('x');
const pY = url.searchParams.get('y');
const pType = url.searchParams.get('type');
const pGroup = url.searchParams.get('group');
const commaToArray = (str) => str.split(',');
const render = () => {
    Plotly.newPlot(main, [{
        type: pType,
        x: commaToArray(pX),
        y: commaToArray(pY)
    }]);
}
const renderGroup = () => {
    // https://plotly.com/javascript/bar-charts/#grouped-bar-chart
    const groups = commaToArray(pGroup);
    const groupMap = new Map();
    const xList = commaToArray(pX);
    const yList = commaToArray(pY);
    groups.forEach((group, i) => {
        const x = xList[i];
        const y = yList[i];
        const groupTrace = groupMap.get(group) ?? { name: group, type: pType, x: [], y: [] };
        groupTrace.x.push(x);
        groupTrace.y.push(y);
        groupMap.set(group, groupTrace);
    });
    const traces = Array.from(groupMap.values());
    console.log({traces})
    Plotly.newPlot(main, traces, { barmode: 'group' });
}
if (pGroup) {
    renderGroup();
} else {
    render();
}
