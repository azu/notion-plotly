# Notion Plotly

## Usage

Pass following parameters to URL.

- `type=?`: type of plot
  - `bar`: bar chart
- `x=1,2,3,4`: x values
- `y=1,2,3,4`: y values
- `group=A,A,B,B`: group values
- `sortBy=?`: sort values by `x` or `y` or `group`

## Examples

- <https://notion-plotly.netlify.app/examples.html>

## Integration with Notion

1. Create new Database
2. Add the database's relation to another database which you want to collect data from
3. Rollup properties
4. Create URL using formula

Example
   
```js
"https://notion-plotly.netlify.app/index.html?type=bar&sortBy=x&y=" + prop("Value") + "&x=" + replaceAll(replaceAll(replaceAll(prop("Date"), "年", "/"), "月", "/"), "日", "") + "&group=" + prop("Company")
```

:memo: Notion does not allow to use non-Ascii URL for embed.

## Supports

Powered by netlify and plotly.
