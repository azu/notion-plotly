# Notion Plotly

Simple graph generator for Notion.
This page render graph using url parameters.

- <https://notion-plotly.netlify.app>

## Usage

Pass following parameters to graph page.

### Bar Charts: `/bar.html`

- `x=1,2,3,4`: x values
- `y=1,2,3,4`: y values
- `group=A,A,B,B`: group values
- `sortBy=?`: sort values by `x` or `y` or `group`

### Pie Charts: `/pie.html`

- `values=1,2,3,4`: values
- `labels=a,b,c,d`: labels

## Examples

- <https://notion-plotly.netlify.app>

## Integration with Notion

Notion Template: <https://efcl.notion.site/Notion-Plotly-f38a5b4fafb342b6b9b3dea6e7de102c>

1. Create new Database
2. Add the database's relation to another database which you want to collect data from
3. Rollup properties
4. Create URL using formula

Example
   
```js
"https://notion-plotly.netlify.app/bar.html?sortBy=x&y=" + prop("Value") + "&x=" + replaceAll(replaceAll(replaceAll(prop("Date"), "年", "/"), "月", "/"), "日", "") + "&group=" + prop("Company")
```

:memo: Notion does not allow to use non-Ascii URL for embed.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Welcome to new charts

- [Plotly javascript graphing library in JavaScript](https://plotly.com/javascript/)

## License

MIT

## Supports

Powered by netlify and plotly.

