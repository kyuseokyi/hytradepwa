<template>
    <div class="chart"></div>
</template>

<script>
    /* eslint-disable */
    import Anychart from 'anychart'
    import stockDataHelper from "../common/stockData";

    export default {
        props: ['Anychart', 'testData'],
        name: 'VueAnychart',
        data() {
            return {
                chart: null,
                _data: null,
                _firstStreamTime: null,
                _lastStreamtime: null,
                _lastVerticalLinetime: null,
                dataTable: null,
                plot: null,
                timeData: null,
                previousPrice: 0,
                areaSeries: null,
            }
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        async mounted() {
            console.log(this.testData)
            this.$loadScript("https://cdn.anychart.com/releases/v8/themes/dark_blue.min.js")
                .then(() => {
                    // Script is loaded, do something
                    this.init();
                })
                .catch(() => {
                    // Failed to fetch script
                });
        },
        methods: {

            switchType() {
                let select = document.getElementById("typeSelect");
                this.areaSeries.seriesType(select.value);
            },
            init() {
                if (!this.chart) {
                    let _Anychart = this.Anychart || Anychart;
                    _Anychart.theme("darkBlue");
                    this._data = stockDataHelper.makeOHLC();
                    console.log(`makeOHLC ${this._data}`)
                    this._firstStreamTime = this._data[0][0];
                    this._lastStreamTime = this._data[this._data.length - 1][0];
                    let _next = stockDataHelper.makeNextDate(this._lastStreamTime);
                    console.log(`=======makeNextDate: ${_next}`);

                    this._lastVerticalLineTime = _next[_next.length - 1][0];

                    console.log(`======= [KES] _firstStreamTime:${this._firstStreamTime}, lastStreamTime:${this._lastStreamTime}, lastVertialLineTme:${this._lastVerticalLineTime}`);

                    this.dataTable = Anychart.data.table();

                    let jsonObj = this._data;

                    console.log(`jsonObje ${jsonObj}`)

                    for (let i = 0; i < _next.length; i++) {
                        jsonObj.push(_next[i]);
                    }

                    this.dataTable.addData(jsonObj);

                    console.log('add data dataTable ^--------^')

                    let mapping = this.dataTable.mapAs();
                    mapping.addField('open', 1, 'first');
                    mapping.addField('high', 2, 'max');
                    mapping.addField('low', 3, 'min');
                    mapping.addField('close', 4, 'last');
                    mapping.addField('value', 4, 'last');

                    let volumeMapping = this.dataTable.mapAs({ value: 5, type: 'average' });

                    this.chart =  Anychart.stock();
                    this.chart.padding().right(100);

                    this.plot = this.chart.plot();
                    console.log("this.plot", this.plot)
                    this.plot.legend(false)

                    //last marker
                    this.plot.markerPalette(['circle']);

                    //x,y grid
                    this.plot.yGrid()
                        .enabled(true)
                        .stroke({ color: 'gray', thickness: '0.15', dash: "3 1" })

                    this.plot.xGrid()
                        .enabled(true)
                        .stroke({ color: 'gray', thickness: '0.15', dash: "3 1" })


                    //let timeZoneOffset = new Date().getTimezoneOffset();
                    //console.log('============== timeZoneOffset:', timeZoneOffset);

                    //yAxis formatter.
                    this.plot.yAxis().labels().format(function () {
                        return Anychart.format.number(this.value.toFixed(3), {
                            scale: false,
                            zeroFillDecimals: false,
                        });
                    });

                    //disable crosshair
                    //var crosshair = plot3.crosshair();
                    //crosshair.xLabel(false).yLabel(false).yStroke(false).xStroke(false);

                    //vertical line(t1,t2);
                    this.timeData = stockDataHelper.makeVerticalLine(this.plot, _next[30][0]);
                    console.log('[KES] timeData:', this.timeData);

                    //area series
                    this.areaSeries = this.plot.area(mapping);
                    this.areaSeries.name('ETH/USDT');

                    this.plot.yAxis(0).orientation("right");

                    //price indicator
                    let indicator = this.plot.priceIndicator();
                    indicator
                        .value('last-visible')
                        .stroke({ color: '#99ccff', thickness: 1, dash: '7 2' })
                        .label({ fontColor: 'black' });

                    //price indicator label.
                    indicator
                        .label()
                        .background()
                        .corners(10, 0, 0, 10)
                        .cornerType('cut')
                        .fill(Anychart.color.lighten('white', 0.9))
                        .stroke({ color: 'white', thickness: 1 });

                    indicator.label().useHtml(true).format(function () {
                        let r = String(this.value).split('.');

                        let color = this.previousPrice <= this.value ? '#00cc00' : '#ff3300';
                        if (r.length == 2) {
                            return this.value.toFixed(0) + "." + "<p style='color:" + color + "; font-size:14px;'><b>" + r[1].substring(0, 2) + "</b></p>";
                        }
                        else {
                            return this.value.toFixed(2);
                        }
                    });

                    // create scroller series with mapped data
                    let scroller = this.chart.scroller();
                    scroller.line(mapping);
                    scroller.xAxis(false);
                    // scroller.allowRangeChange(false)
                    // this.chart.scroller().enabled(false);
                    this.chart.container(this.$el);
                    this.chart.draw();

                    // create range picker
                    var rangePicker = Anychart.ui.rangePicker();
                    // init range picker
                    rangePicker.render(this.chart);

                    // create range selector
                    var rangeSelector = Anychart.ui.rangeSelector();

                    // custom ranges
                    var customRanges = [
                        {
                            'text': '1s',
                            'type': 'unit',
                            'unit': 'second',
                            'count': 100,
                            'anchor': 'first-visible-date'
                        },
                        {
                            'text': '5s',
                            'type': 'unit',
                            'unit': 'second',
                            'count': 50,
                            'anchor': 'first-visible-date'
                        },
                        {
                            'text': '1m',
                            'type': 'unit',
                            'unit': 'minute',
                            'count': 30,
                            'anchor': 'first-visible-date'
                        }
                    ];
                    rangeSelector.ranges(customRanges);

                    // init range selector
                    rangeSelector.render(this.chart);
                }
            },
            calculate(time) {
                //console.log(`current:${time.getTime()}, timeData:${JSON.stringify(timeData)}`);

                if (time.getTime() == this.timeData.inputLimitTime) {
                    console.log('[KES] intput limit time!!:', time);

                    //first stream time for date range.
                    let t0 = new Date(this._firstStreamTime);
                    t0 = t0.setSeconds(t0.getSeconds() + 30);

                    this._firstStreamTime = t0;
                    console.log('[KES] calculate _firstStreamTime:', this._firstStreamTime);

                    // build next data
                    let _next = stockDataHelper.makeNextDate(this._lastVerticalLineTime, 60, 1);
                    this._lastVerticalLineTime = _next[_next.length - 1][0]


                    let jsonObj = [];
                    for (let i = 0; i < _next.length; i++) {
                        jsonObj.push(_next[i]);
                    }
                    this.dataTable.addData(jsonObj);

                    // draw vertical line
                    let t1 = new Date(time);
                    t1 = t1.setSeconds(t1.getSeconds() + 30);

                    this.timeData = stockDataHelper.makeVerticalLine(this.plot, t1);

                    //date range
                    this.chart.selectRange(this._firstStreamTime, this.timeData.calcualteTime + 1000 * 60);
                }

                if (time.getTime() == this.timeData.calcualteTime) {
                    console.log('[KES] calculate time!!:', time);
                }
            },
            startStream() {
                // adjust button content
                var self = this;
                var streamButton = document.getElementById("streamButton");
                streamButton.innerHTML = "Stop" + "\nstream";

                let s3;

                let streamDate = new Date(this._lastStreamTime);
                // set interval of data stream
                var myVar = setInterval(
                    // data streaming itself
                    function () {
                        //let now = new Date();
                        self.plot.removeSeries('s3');

                        streamDate.setSeconds(streamDate.getSeconds() + 1);

                        let now = new Date(streamDate);
                        let end = 238;
                        let start = 220;
                        //let value = Math.floor((Math.random() * (end-start+1)) + start);
                        let value = start + Math.random();
                        //console.log(`date:${now}, value:${value}`);


                        //
                        self.calculate(now);
                        //

                        self.dataTable.addData([[now, value + 1, value + 100, value - 10, value, value]])

                        //marker of last price
                        s3 = self.plot.marker([[now, value, , , , ,]]).fill('#C5E1A5');
                        s3.id('s3');

                        //previous price for color.
                        self.previousPrice = value;
                    }, 1000
                );

                //
                streamButton.onclick = function () {
                    // clears interval which stops streaming
                    clearInterval(myVar);
                    streamButton.onclick = function () {
                        self.startStream();
                    };
                    streamButton.innerHTML = "Start" + "\nstream";
                };
            }
        },
        //refactor
        computed: {

        },
        watch: {

        },
        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
                this.chart = null;
            }
        }
    }

</script>
