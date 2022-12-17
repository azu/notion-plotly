const main = document.getElementById('main');
const url = new URL(location.href);
const pValues = url.searchParams.get('values');
const pLabels = url.searchParams.get('labels');
const pType = url.searchParams.get('type') ?? "pie";
const commaToArray = (str) => {
    return str.split(',');
};
const render = () => {
    const values = commaToArray(pValues);
    const labels = commaToArray(pLabels);
    Plotly.newPlot(main, [{
        type: pType,
        values,
        labels
    }]);
}
if (!pValues || !pLabels) {
    location.href = './index.html';
}
render();
const resizeObserver = new ResizeObserver(entries => {
    render();
});
resizeObserver.observe(main);

