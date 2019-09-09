/*!

=========================================================
* Paper Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
const Chart = require("chart.js");

Chart.pluginService.register({
  beforeDraw: function(chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      var ctx = chart.chart.ctx;

      //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || "Arial";
      var txt = centerConfig.text;
      var color = centerConfig.color || "#000";
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      //Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = chart.innerRadius * 2;

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
    }
  }
});

// default color for the charts
let chartColor = "#FFFFFF";
// ##############################
// // // Function that converts a hex color number to a RGB color number
// #############################
const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

// import { ArticleActions } from 'Actions/ArticleActions';
const mapStateToProps = (state) => ({
  datas : state.articlereducers.datas
})
const a =(dispatch) => ({
  listofArticle: (page, size,boardId) => dispatch('LISTOF_ARTICLE'(1, 10,"notice"))
});

// dispatch(ArticleActions.ListofArticle(1, 10,"notice"));
// console.log(datas)


// #########################################
// // // used inside src/views/Charts.jsx
// #########################################


const datatest = [85, 80, 91, 87, 88, 93, 75]

const chartExample9 = {
  data: {
    labels: ["", "0513","0613", "0721", "0821", "0905"],
    datasets: [
      {
        label: "Active Users",
        borderColor: "#f17e5d",
        pointBackgroundColor: "#f17e5d",
        pointRadius: 3,
        pointHoverRadius: 3,
        lineTension: 0,
        fill: false,
        borderWidth: 5,
        data:[85, 84, 91, 87, 88, 93, 82]
      },
      {
        label: "Active Users",
        borderColor: " #4d4dff",
        pointBackgroundColor: "#f17e5d",
        pointRadius: 3,
        pointHoverRadius: 3,
        lineTension: 0,
        fill: false,
        borderWidth: 5,
        data: [83, 90, 92, 84, 90, 87,85]
      },
    ]
  },
  options: {
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "#9f9f9f",
            beginAtZero: false,
            maxTicksLimit: 5
          },
          gridLines: {
            drawBorder: false,
            borderDash: [8, 5],
            zeroLineColor: "transparent",
            color: "#9f9f9f"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            borderDash: [8, 5],
            color: "#9f9f9f",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9f9f9f"
          }
        }
      ]
      ,
      
    }
  }
};

module.exports = {
  chartExample9
};

