const main = document.getElementById('main');
const url = new URL(location.href);
const pX = url.searchParams.get('x');
const pY = url.searchParams.get('y');
const sortBy = url.searchParams.get('sortBy');
const pType = url.searchParams.get('type');
const pGroup = url.searchParams.get('group');
const commaToArray = (str) => {
    return str.split(',');
};
const createSortBy = ({ x, y, group }) => {
    const sortedView = x.map((_, index) => {
        return {
            x: x[index],
            y: y[index],
            group: group[index]
        }
    });
    if (sortBy === "x" || sortBy === "y" || sortBy === "group") {
        return sortedView.sort((a, b) => {
            return a[sortBy].localeCompare(b[sortBy]);
        });
    }
    return sortedView;
}
const render = () => {
    const sortedView = createSortBy({
        x: commaToArray(pX),
        y: commaToArray(pY),
        group: pGroup ? commaToArray(pGroup) : []
    });
    Plotly.newPlot(main, [{
        type: pType,
        x: sortedView.map((v) => v.x),
        y: sortedView.map((v) => v.y)
    }]);
}
const renderGroup = () => {
    // https://plotly.com/javascript/bar-charts/#grouped-bar-chart
    const groupMap = new Map();
    const sortedView = createSortBy({ x: commaToArray(pX), y: commaToArray(pY), group: commaToArray(pGroup) });
    sortedView.forEach((_, i) => {
        const x = sortedView[i].x;
        const y = sortedView[i].y;
        const group = sortedView[i].group;
        const groupTrace = groupMap.get(group) ?? { name: group, type: pType, x: [], y: [] };
        groupTrace.x.push(x);
        groupTrace.y.push(y);
        groupMap.set(group, groupTrace);
    });
    const traces = Array.from(groupMap.values());
    Plotly.newPlot(main, traces, { barmode: 'group' });
}

if (!pX || !pY) {
    location.href = './examples.html';
}
if (pGroup) {
    renderGroup();
} else {
    render();
}
