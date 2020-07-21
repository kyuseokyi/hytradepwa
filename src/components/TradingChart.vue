<template>
    <div class="chart"></div>
</template>

<script>
    /* eslint-disable */

    import Anychart from 'anychart'

    export default {
        props: ['options', 'Anychart'],
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
            }
        },
        beforeCreate() {
        },

        async mounted() {
            this.$loadScript("https://cdn.anychart.com/releases/v8/themes/dark_blue.min.js")
                .then(() => {
                    // Script is loaded, do something
                    console.log(JSON.stringify(this.options))
                    this.init();
                })
                .catch(() => {
                    // Failed to fetch script
                });
        },
        methods: {
            makeNextDate(lastDate, count = 90, gap = 1) {
                //let t1 = new Date()
                let t1 = new Date(lastDate);

                let end = 238;
                let start = 220;
                //let gap = 1;
                let data = [];
                for (let i = 0; i < count; i++) {
                    let date = t1.setSeconds(t1.getSeconds() + gap);
                    //console.log(`i=${i} d=${t1}`);
                    data.push([date, , , , ,]);
                }
                return data;
            },
            makeOHLC() {
                let t1 = new Date()
                t1.setDate(t1.getDate() - 1);

                let end = 238;
                let start = 220;

                let data = [];
                for (let i = 0; i < 100; i++) {
                    let date = t1.setSeconds(t1.getSeconds() + 1);
                    //console.log(`i=${i} d=${t1}`);

                    let open = start + Math.random();
                    let high = open + Math.random();
                    let low = open + high - open;
                    let close = open;
                    let volume = 0;

                    data.push([date, open, high, low, close, volume]);
                }
                return data;
            },
            removeSeries() {
                if (this.chart.getSeriesCount()) {
                    this.chart.removeSeriesAt(0);
                }
            },
            removeAllSeries() {
                if (this.chart.getSeriesCount()) {
                    this.chart.removeAllSeries();
                }
            },
            addSeries(data) {
                this.delegateMethod('addSeries', data);
            },
            delegateMethod(name, data) {
                if (!this.chart) {
                    warn(`Cannot call [$name] before the chart is initialized. Set prop [options] first.`, this);
                    return
                }

                return this.chart[name](data)
            },
            async init() {
                if (!this.chart && this.options) {
                    let _Anychart = this.Anychart || Anychart;
                    _Anychart.theme("darkBlue");
                    // this.chart = new _Anychart.fromJson(this.options);
                    // this.chart.container(this.$el)
                    //     .draw();
                    this._data = this.makeOHLC();
                    console.log(`makeOHLC ${this._data}`)
                    this._firstStreamTime = this._data[0][0];
                    this._lastStreamTime = this._data[this._data.length - 1][0];
                    let _next = this.makeNextDate(this._lastStreamTime);
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
                        return anychart.format.number(this.value.toFixed(3), {
                            scale: false,
                            zeroFillDecimals: false,
                        });
                    });

                    //disable crosshair
                    //var crosshair = plot3.crosshair();
                    //crosshair.xLabel(false).yLabel(false).yStroke(false).xStroke(false);

                    //vertical line(t1,t2);
                    //this.timeData = makeVerticalLine(plot3, _next[30][0]);
                    console.log('[KES] timeData:', this.timeData);

                    //area series
                    let areaSeries = this.plot.area(mapping);
                    areaSeries.name('ETH/USDT');

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

                    this.chart.container(this.$el);
                    this.chart.draw();
                }
            }
        },
        watch: {
            options: function (options) {
                if (!this.chart && options) {
                    this.init()
                } else {
                    this.chart.dispose();
                    this.chart = null;
                    this.init();
                }
            }
        },
        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
                this.chart = null;
            }
        }
    }

    // function makeOHLC() {
    //     let t1 = new Date()
    //     t1.setDate(t1.getDate() - 1);
    //
    //     let end = 238;
    //     let start = 220;
    //
    //     let data = [];
    //     for (let i = 0; i < 100; i++) {
    //         let date = t1.setSeconds(t1.getSeconds() + 1);
    //         //console.log(`i=${i} d=${t1}`);
    //
    //         let open = start + Math.random();
    //         let high = open + Math.random();
    //         let low = open + high - open;
    //         let close = open;
    //         let volume = 0;
    //
    //         data.push([date, open, high, low, close, volume]);
    //     }
    //     return data;
    // }
</script>
