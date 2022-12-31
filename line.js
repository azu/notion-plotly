const main = document.getElementById('main');
const url = new URL(location.href);
// ?<name>.x=<values>&<name>.y=<values>
const lines = Array.from(url.searchParams.entries()).flatMap(([key, value]) => {
    console.log(key);
    if (!key) {
        return [];
    }
    const [name, type] = key.split('.');
    if (type === "x") {
        const xValues = value;
        const yValues = url.searchParams.get(`${name}.y`);
        if (!yValues) {
            throw new Error(`Not found "${name}.y=<values>" parameter

Please Specify x and y values.

/line.html?<name>.x=<values>&<name>.y=<values>
`);
        }
        return [{
            name,
            xValues,
            yValues
        }]
    }
    return [];
})
// sort by x or y
const sortBy = url.searchParams.get('sortBy') ?? "x";
const commaToArray = (str) => {
    return str.split(',');
};
const createSortBy = ({ x, y }) => {
    const sortedView = x.map((_, index) => {
        return {
            x: x[index],
            y: y[index],
        }
    });
    if (sortBy === "x" || sortBy === "y") {
        return sortedView.sort((a, b) => {
            return a[sortBy].localeCompare(b[sortBy], "ja", {
                numeric: true
            });
        });
    }
    return sortedView;
}
const render = () => {
    // https://plotly.com/javascript/line-charts/
    const traces = lines.map((line, i) => {
        console.log(line)
        const sortedView = createSortBy({
            x: commaToArray(line.xValues),
            y: commaToArray(line.yValues)
        });
        return {
            x: sortedView.map((v) => v.x),
            y: sortedView.map((v) => v.y),
            name: line.name,
            mode: "lines" // TODO: <name>.mode=<mode>
        }
    });
    Plotly.newPlot(main, traces);
}

if (lines.length === 0) {
    alert("Not found line parameters. Please check console error");
    location.href = './index.html';
}

render();
const resizeObserver = new ResizeObserver(() => {
    render();
});
resizeObserver.observe(main);

