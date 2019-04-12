const HtmlBuilder = {
  new: () => {
    let html = '';
    const builder = {
      listElement: val => {
        html += `<li>${val}</li>`
        return builder;
      },
      link: val => {
        html += `<a href="${val}">${val}</a>`
        return builder;
      },
      newLine: () => {
        html += `<br>`
        return builder;
      },
      table: () => {
        html += '<table border="0" cellspacing="0" cellpadding="0" width="0" style="border-collapse:collapse">';
        return builder;
      },
      tableHeader: (headers) => {
        html += '<tr style="background:#8e7cc3;height:15.75pt">';
        const widths = [97, 382];
        headers.forEach((value, i) => {
          html += `<th width="${widths[i]}" style="border: 1pt solid black;padding:1.5pt 2.25pt" align="center">${value}</th>`;
        });
        html += '</tr>';
        return builder;
      },
      tableRow: (dataList) => {
        html += '<tr>';
        const widths = [97, 382];
        dataList.forEach((value, i) => {
          const rowValue = i === 0 ? `<b>${value}</b>` : value;
          html += `<td width="${widths[i]}" style="border: 1pt solid black;padding:1.5pt 2.25pt" align="center">${rowValue}</td>`;
        });
        html += '</tr>';
        return builder;
      },
      endTable: () => {
        html += '</table>';
        return builder;
      },
      build: () => html
    };
    return builder;
  }
};

module.exports = HtmlBuilder;