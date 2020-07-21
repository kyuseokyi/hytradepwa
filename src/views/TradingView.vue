<template class="tempA">
    <div class="root d-flex flex-row flex-grow-1">
        <div class="left_side d-flex flex-column">
            <picture>
                <img class="logo" src="../../public/img/ic_notifi_t.png" />
            </picture>

            <button class="side_btn portfolio m-2 btn"><i class="far fa-folder"></i></button>
            <button class="side_btn ranking m-2 btn"><i class="fas fa-chart-bar"></i></button>
            <button class="side_btn asset m-2 btn"><i class="fas fa-wallet"></i></button>
            <button class="side_btn notification m-2 btn"><i class="fas fa-bell"></i></button>
            <button class="side_btn my_page m-2 btn"><i class="fa fas fa-user"></i></button>
        </div>
        <div class="d-flex flex-column flex-grow-1">
            <div class="header d-flex align-items-center">
                <button class="side_btn my_page btn mr-auto"><i class="fa fa-plus"></i></button>
                <button id="streamButton" class="streamButton side_btn btn" onclick="startStream()">Start
                    Stream</button>
                <div class="account_setting_btn m-1 d-flex flex-column align-self-end">
                    <div class="acc_set_text"><i class="fas fa-caret-down"></i> 연습 계정</div>
                    <div class="acc_set_text"><i class="fa fa-bank"></i> 10.000.000</div>
                </div>
                <button class="deposit_btn btn btn-outline-success btn-lg">입금</button>
            </div>
            <div class="contents_row d-flex flex-row flex-grow-1">
<!--                                <div id="chartContainer" class="chart_container  flex-grow-1"></div>-->
                <vue-anychart class="chart_container" :options="lineOptions" ref="lineChart"></vue-anychart>
                <div class="right_side d-flex flex-column">

                    <div class="order_info m-1 border-dark rounded">
                        <p class="p-1 text-left">만료 시간 : 19:05</p>
                        <p class="p-1 text-left">입장 가격 : 9218.93</p>
                    </div>

                    <div class="order_amount_at_one_time m-1 border-dark rounded">
                        <p class="p-1 text-left">투자 금액: 1</p>
                    </div>

                    <div class="order_profit m-1">
                        <p class="p-1 text-left">수익: 85%</p>
                    </div>

                    <button type="button" class="order_btn_call my_page m-2 btn btn-success"><i
                            class="far fa-arrow-alt-circle-up"></i> 콜</button>
                    <button type="button" class="order_btn_put my_page m-2 btn btn-danger"><i
                            class="far fa-arrow-alt-circle-down"></i> 풋</button>

                </div>
            </div>
            <div class="footer d-flex flex-row">
                <select id="typeSelect" class="typeSelect btn fa fa-bar-chart" onchange="switchType()">
                    <option value="area" class="chart_option">Area</option>
                    <option value="ohlc" class="chart_option">OHLC</option>
                    <option value="candlestick" class="chart_option">Japanese Candlestick</option>
                    <option value="hilo" class="chart_option">HiLo</option>
                    <option value="range-area" class="chart_option">Range Area</option>
                    <option value="range-column" class="chart_option">Range Column</option>
                    <option value="range-spline-area" class="chart_option">Range Spline Area</option>
                    <option value="range-step-area" class="chart_option">Range Step Area</option>
                </select>

                <div class="d-flex justify-content-around">
                    <!--                    -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */

    import VueAnychart from '../components/TradingChart'
    import * as data from '../data/data'
    import Anychart from 'anychart'

    export default {
        name: 'App',
        components: {
            VueAnychart
        },
        data() {
            return {
                Anychart: Anychart,
                lineOptions: data.LineData,
                lineSeriesCount: 0,
                xAxisIsModified: false,
                pieDataIsModified: false
            }
        },
        mounted() {
            this.$nextTick(function() {
                //after child component mounted
            })

        },
        methods: {
            remove() {
                this.$refs.lineChart.removeSeries()
                this.lineSeriesCount--
            },
            add(data) {
                this.$refs.lineChart.addSeries(data)
                this.lineSeriesCount++
            },
            removeAll() {
                this.$refs.lineChart.removeAllSeries()
                this.lineSeriesCount = 0
            },
            modifiedXAxis() {
                let xAxis = this.$refs.areaChart.chart.xAxis(0);
                xAxis.orientation('top');
                xAxis.labels().format(function () {
                    return this.value.slice(0, 3)
                });

                this.xAxisIsModified = true;
            },
            updatePieData() {
                this.$refs.pieChart.chart.data([
                    ['Product A', 4755],
                    ['Product B', 5205],
                    ['Product C', 1504]
                ]);

                this.pieDataIsModified = true;
            },
            getRandomData() {
                return [
                    {'x': 'January', 'value': this.getRandomInt(1, 15) * 1000},
                    {'x': 'February', 'value': this.getRandomInt(3, 18) * 1000},
                    {'x': 'March', 'value': this.getRandomInt(2, 15) * 1000},
                    {'x': 'April', 'value': this.getRandomInt(1, 18) * 1000},
                    {'x': 'May', 'value': this.getRandomInt(3, 18) * 1000}
                ]
            },
            getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
            }
        }
    };
</script>

<style lang="css">
    @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
    @import '../assets/style/tradingview.css';

    #chart_container {
        width: 100%;
        height: 400px;
        margin-bottom: 10px;
    }

    .chart-container {
        text-align: center;
        margin-top: 75px;
        margin-bottom: 15px;
    }

</style>


<!--<script>-->
<!--    /* eslint-disable */-->

<!--    import VueAnychart from './../components/TradingChart'-->
<!--    import * as data from './../data/data'-->
<!--    import Anychart from 'anychart'-->

<!--    export default {-->
<!--        name: 'App',-->
<!--        component: {-->
<!--            VueAnychart-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
<!--                Anychart: Anychart,-->
<!--                areaOptions: data.AreaData,-->
<!--                pieOptions: data.PieData,-->
<!--                lineOptions: data.LineData,-->
<!--                CombineOptions: data.CombineData,-->
<!--                lineSeriesCount: 0,-->
<!--                xAxisIsModified: false,-->
<!--                pieDataIsModified: false-->
<!--                // chart: null,-->
<!--                // timeData: null,-->
<!--                // areaSeries: null,-->
<!--                // _data: null,-->
<!--                // _firstStreamTime: null,-->
<!--                // _lastStreamTime: null,-->
<!--                // _lastVerticalLineTime: null,-->
<!--                // dataTable: null,-->
<!--                // plot: null,-->
<!--                // previousPrice: null,-->
<!--            }-->
<!--        },-->
<!--        mounted() {-->
<!--            //this.lineSeriesCount = this.$refs.lineChart.chart.getSeriesCount()-->
<!--            console.log("mounted")-->
<!--            this.$loadScript("https://cdn.anychart.com/releases/v8/themes/dark_blue.min.js")-->
<!--                .then(() => {-->
<!--                    // Script is loaded, do something-->
<!--                    if (!this.chart && this.options) {-->
<!--                        this.init();-->
<!--                    }-->
<!--                })-->
<!--                .catch(() => {-->
<!--                    // Failed to fetch script-->
<!--                });-->
<!--        },-->
<!--        methods: {-->

<!--            // init() {-->
<!--            //     console.log("init function")-->
<!--            //     // if (true) {-->
<!--            //     let _Anychart = Anychart;-->
<!--            //     _Anychart.theme("darkBlue")-->
<!--            //-->
<!--            //     this._data = this.makeOHLC();-->
<!--            //-->
<!--            //     this._firstStreamTime = this._data[0][0];-->
<!--            //     this._lastVerticalLineTime = this._data[this._data.length - 1][0];-->
<!--            //     let _next = this.makeNextDate(this._lastStreamTime);-->
<!--            //     debugger-->
<!--            //     this._lastVerticalLineTime = _next[_next.length - 1][0];-->
<!--            //-->
<!--            //     console.log(`======= [KES] _firstStreamTime:${this._firstStreamTime}, lastStreamTime:${this._lastStreamTime}, lastVertialLineTme:${this._lastVerticalLineTime}`);-->
<!--            //-->
<!--            //     this.dataTable = _Anychart.data.table()-->
<!--            //-->
<!--            //     let jsonObj = this._data;-->
<!--            //-->
<!--            //     for (let i = 0; i < _next.length; i++) {-->
<!--            //         jsonObj.push(_next[i]);-->
<!--            //     }-->
<!--            //-->
<!--            //     this.dataTable.addData(jsonObj);-->
<!--            //     console.log("000000000000000000")-->
<!--            //     // map loaded data-->
<!--            //     let mapping = dataTable.mapAs();-->
<!--            //     mapping.addField('open', 1, 'first');-->
<!--            //     mapping.addField('high', 2, 'max');-->
<!--            //     mapping.addField('low', 3, 'min');-->
<!--            //     mapping.addField('close', 4, 'last');-->
<!--            //     mapping.addField('value', 4, 'last');-->
<!--            //     //mapping.addField('stroke', 5, 'orange');-->
<!--            //-->
<!--            //     let volumeMapping = this.dataTable.mapAs({value: 5, type: 'average'});-->
<!--            //     debugger-->
<!--            //     this.chart = _Anychart.stock();-->
<!--            //-->
<!--            //     this.chart.padding().right(100);-->
<!--            //-->
<!--            //     // zoom on mouse wheel-->
<!--            //     let interactivity = chart.interactivity();-->
<!--            //     interactivity.zoomOnMouseWheel(true);-->
<!--            //-->
<!--            //     this.plot = this.chart.plot();-->
<!--            //-->
<!--            //     //last marker-->
<!--            //     this.plot.markerPalette(['circle']);-->
<!--            //-->
<!--            //     //x,y grid-->
<!--            //     this.plot.yGrid()-->
<!--            //         .enabled(true)-->
<!--            //         .stroke({color: 'gray', thickness: '0.15', dash: "3 1"})-->
<!--            //-->
<!--            //     this.plot.xGrid()-->
<!--            //         .enabled(true)-->
<!--            //         .stroke({color: 'gray', thickness: '0.15', dash: "3 1"})-->
<!--            //-->
<!--            //     //yAxis formatter.-->
<!--            //     this.plot.yAxis().labels().format(function () {-->
<!--            //         return _Anychart.format.number(this.value.toFixed(3), {-->
<!--            //             scale: false,-->
<!--            //             zeroFillDecimals: false,-->
<!--            //         });-->
<!--            //     });-->
<!--            //     console.log("1111111111111")-->
<!--            //     //vertical line(t1,t2);-->
<!--            //     this.timeData = this.makeVerticalLine(this.plot, _next[30][0]);-->
<!--            //     console.log('[KES] timeData:', this.timeData);-->
<!--            //-->
<!--            //     //area series-->
<!--            //     let areaSeries = this.plot.area(mapping);-->
<!--            //     areaSeries.name('ETH/USDT');-->
<!--            //-->
<!--            //     this.plot.yAxis(0).orientation("right");-->
<!--            //-->
<!--            //     //price indicator-->
<!--            //     let indicator = this.plot.priceIndicator();-->
<!--            //     indicator-->
<!--            //         .value('last-visible')-->
<!--            //         .stroke({color: '#99ccff', thickness: 1, dash: '7 2'})-->
<!--            //         .label({fontColor: 'black'});-->
<!--            //-->
<!--            //     //price indicator label.-->
<!--            //     indicator-->
<!--            //         .label()-->
<!--            //         .background()-->
<!--            //         .corners(10, 0, 0, 10)-->
<!--            //         .cornerType('cut')-->
<!--            //         .fill(_Anychart.color.lighten('white', 0.9))-->
<!--            //         .stroke({color: 'white', thickness: 1});-->
<!--            //-->
<!--            //     //indicator formatter.-->
<!--            //     this.previousPrice = 0;-->
<!--            //     indicator.label().useHtml(true).format(function () {-->
<!--            //         let r = String(this.value).split('.');-->
<!--            //-->
<!--            //         let color = previousPrice <= this.value ? '#00cc00' : '#ff3300';-->
<!--            //         if (r.length == 2) {-->
<!--            //             return this.value.toFixed(0) + "." + "<p style='color:" + color + "; font-size:14px;'><b>" + r[1].substring(0, 2) + "</b></p>";-->
<!--            //         } else {-->
<!--            //             return this.value.toFixed(2);-->
<!--            //         }-->
<!--            //     });-->
<!--            //-->
<!--            //     //xAxis when 1second interval-->
<!--            //     let scaleX = this.chart.xScale();-->
<!--            //     scaleX.ticks([{major: {unit: 'second', count: 30}, minor: {unit: 'second', count: 30}}]);-->
<!--            //     //scaleX.maximumGap({intervalsCount: 60, unitType: 'second', unitCount: 4});-->
<!--            //-->
<!--            //     //yAxis-->
<!--            //     this.plot.yScale().minimumGap(0.1);-->
<!--            //     this.plot.yScale().maximumGap(1);-->
<!--            //-->
<!--            //     //fill color of area-->
<!--            //     this.areaSeries.fill(['#3F9CD7 0', '#3F9CD7 0.5'], 0);-->
<!--            //-->
<!--            //     // create scroller series with mapped data-->
<!--            //     let scroller = this.chart.scroller();-->
<!--            //     scroller.line(mapping);-->
<!--            //     scroller.xAxis(false);-->
<!--            //-->
<!--            //-->
<!--            //     // set container id for the chart-->
<!--            //     this.chart.container(this.$el)-->
<!--            //     // initiate chart drawing-->
<!--            //     this.chart.draw();-->
<!--            //-->
<!--            //     // create range picker-->
<!--            //     let rangePicker = _Anychart.ui.rangePicker();-->
<!--            //     // init range picker-->
<!--            //     rangePicker.render(this.chart);-->
<!--            //-->
<!--            //     // create range selector-->
<!--            //     let rangeSelector = _Anychart.ui.rangeSelector();-->
<!--            //-->
<!--            //     //this.chart = new _Anychart.fromJson(this.options);-->
<!--            //-->
<!--            //     // custom ranges-->
<!--            //     let customRanges = [-->
<!--            //         {-->
<!--            //             'text': '1s',-->
<!--            //             'type': 'unit',-->
<!--            //             'unit': 'second',-->
<!--            //             'count': 100,-->
<!--            //             'anchor': 'first-visible-date'-->
<!--            //         },-->
<!--            //         {-->
<!--            //             'text': '5s',-->
<!--            //             'type': 'unit',-->
<!--            //             'unit': 'second',-->
<!--            //             'count': 50,-->
<!--            //             'anchor': 'first-visible-date'-->
<!--            //         },-->
<!--            //         {-->
<!--            //             'text': '1m',-->
<!--            //             'type': 'unit',-->
<!--            //             'unit': 'minute',-->
<!--            //             'count': 30,-->
<!--            //             'anchor': 'first-visible-date'-->
<!--            //         }-->
<!--            //     ];-->
<!--            //     rangeSelector.ranges(customRanges);-->
<!--            //-->
<!--            //     // init range selector-->
<!--            //     rangeSelector.render(this.chart);-->
<!--            //     }-->
<!--            //},-->
<!--            makeOHLC() {-->
<!--                let t1 = new Date()-->
<!--                t1.setDate(t1.getDate() - 1);-->

<!--                let end = 238;-->
<!--                let start = 220;-->

<!--                let data = [];-->
<!--                for (let i = 0; i < 100; i++) {-->
<!--                    let date = t1.setSeconds(t1.getSeconds() + 1);-->
<!--                    //console.log(`i=${i} d=${t1}`);-->

<!--                    let open = start + Math.random();-->
<!--                    let high = open + Math.random();-->
<!--                    let low = open + high - open;-->
<!--                    let close = open;-->
<!--                    let volume = 0;-->

<!--                    data.push([date, open, high, low, close, volume]);-->
<!--                }-->
<!--                return data;-->
<!--            },-->
<!--            makeNextDate(lastDate, count = 90, gap = 1) {-->
<!--                //let t1 = new Date()-->
<!--                let t1 = new Date(lastDate);-->

<!--                let end = 238;-->
<!--                let start = 220;-->
<!--                //let gap = 1;-->
<!--                let data = [];-->
<!--                for (let i = 0; i < count; i++) {-->
<!--                    let date = t1.setSeconds(t1.getSeconds() + gap);-->
<!--                    //console.log(`i=${i} d=${t1}`);-->
<!--                    data.push([date, , , , ,]);-->
<!--                }-->
<!--                return data;-->
<!--            },-->
<!--            makeVerticalLine(plot, datetime, gap = 30) {-->
<!--                let d1 = new Date(datetime);-->
<!--                let d2 = new Date(datetime);-->

<!--                console.log('[KES] makeVerticalLine time:', datetime);-->

<!--                d2 = d2.setSeconds(d2.getSeconds() + gap);-->

<!--                plot.annotations().removeAllAnnotations();-->


<!--                let annotation = plot.annotations();-->

<!--                let v1 = annotation.verticalLine({-->
<!--                        xAnchor: d1,-->
<!--                        stroke: {-->
<!--                            thickness: 1,-->
<!--                            color: 'lightblue',-->
<!--                            dash: '3 2'-->
<!--                        }-->
<!--                    }-->
<!--                ).allowEdit(false);-->

<!--                let v2 = annotation.verticalLine({-->
<!--                        xAnchor: d2,-->
<!--                        stroke: {-->
<!--                            thickness: 1,-->
<!--                            color: 'red',-->
<!--                            dash: '3 2'-->
<!--                        }-->
<!--                    }-->
<!--                ).allowEdit(false);-->

<!--                return {-->
<!--                    inputLimitTime: typeof (d1) != 'number' ? d1.getTime() : d1,-->
<!--                    calcualteTime: typeof (d2) != 'number' ? d2.getTime() : d2-->
<!--                }-->
<!--            },-->
<!--            calculate(time) {-->
<!--                //console.log(`current:${time.getTime()}, timeData:${JSON.stringify(timeData)}`);-->

<!--                if (time.getTime() == this.timeData.inputLimitTime) {-->
<!--                    console.log('[KES] intput limit time!!:', time);-->

<!--                    //first stream time for date range.-->
<!--                    let t0 = new Date(this._firstStreamTime);-->
<!--                    t0 = t0.setSeconds(t0.getSeconds() + 30);-->

<!--                    this._firstStreamTime = t0;-->
<!--                    console.log('[KES] calculate _firstStreamTime:', this._firstStreamTime);-->

<!--                    // build next data-->
<!--                    let _next = this.makeNextDate(this._lastVerticalLineTime, 60, 1);-->
<!--                    this._lastVerticalLineTime = _next[_next.length - 1][0]-->


<!--                    let jsonObj = [];-->
<!--                    for (let i = 0; i < _next.length; i++) {-->
<!--                        jsonObj.push(_next[i]);-->
<!--                    }-->
<!--                    this.dataTable.addData(jsonObj);-->

<!--                    // draw vertical line-->
<!--                    let t1 = new Date(time);-->
<!--                    t1 = t1.setSeconds(t1.getSeconds() + 30);-->

<!--                    this.timeData = this.makeVerticalLine(this.plot, t1);-->

<!--                    //date range-->
<!--                    this.chart.selectRange(this._firstStreamTime, this.timeData.calcualteTime + 1000 * 60);-->
<!--                }-->

<!--                if (time.getTime() == this.timeData.calcualteTime) {-->
<!--                    console.log('[KES] calculate time!!:', time);-->
<!--                }-->
<!--            },-->
<!--            startStream() {-->
<!--                // adjust button content-->
<!--                var streamButton = document.getElementById("streamButton");-->
<!--                streamButton.innerHTML = "Stop" + "\nstream";-->

<!--                let s3;-->

<!--                let streamDate = new Date(this._lastStreamTime);-->
<!--                // set interval of data stream-->
<!--                var myVar = setInterval(-->
<!--                    // data streaming itself-->
<!--                    function () {-->
<!--                        //let now = new Date();-->

<!--                        this.plot.removeSeries('s3');-->

<!--                        streamDate.setSeconds(streamDate.getSeconds() + 1);-->

<!--                        let now = new Date(streamDate);-->
<!--                        let end = 238;-->
<!--                        let start = 220;-->
<!--                        //let value = Math.floor((Math.random() * (end-start+1)) + start);-->
<!--                        let value = start + Math.random();-->
<!--                        //console.log(`date:${now}, value:${value}`);-->


<!--                        //-->
<!--                        this.calculate(now);-->
<!--                        //-->

<!--                        this.dataTable.addData([[now, value + 1, value + 100, value - 10, value, value]])-->

<!--                        //marker of last price-->
<!--                        s3 = this.plot.marker([[now, value, , , , ,]]).fill('#C5E1A5');-->
<!--                        s3.id('s3');-->

<!--                        //previous price for color.-->
<!--                        this.previousPrice = value;-->
<!--                    }, 1000-->
<!--                );-->

<!--                //-->
<!--                streamButton.onclick = function () {-->
<!--                    // clears interval which stops streaming-->
<!--                    clearInterval(myVar);-->
<!--                    streamButton.onclick = function () {-->
<!--                        this.startStream();-->
<!--                    };-->
<!--                    streamButton.innerHTML = "Start" + "\nstream";-->
<!--                };-->
<!--            },-->
<!--            switchType() {-->
<!--                var select = document.getElementById("typeSelect");-->
<!--                this.areaSeries.seriesType(select.value);-->
<!--            },-->
<!--            remove() {-->
<!--                this.$refs.lineChart.removeSeries()-->
<!--                this.lineSeriesCount&#45;&#45;-->
<!--            },-->
<!--            add(data) {-->
<!--                this.$refs.lineChart.addSeries(data)-->
<!--                this.lineSeriesCount++-->
<!--            },-->
<!--            removeAll() {-->
<!--                this.$refs.lineChart.removeAllSeries()-->
<!--                this.lineSeriesCount = 0-->
<!--            },-->
<!--            modifiedXAxis() {-->
<!--                let xAxis = this.$refs.areaChart.chart.xAxis(0);-->
<!--                xAxis.orientation('top');-->
<!--                xAxis.labels().format(function () {-->
<!--                    return this.value.slice(0, 3)-->
<!--                });-->

<!--                this.xAxisIsModified = true;-->
<!--            },-->
<!--            updatePieData() {-->
<!--                this.$refs.pieChart.chart.data([-->
<!--                    ['Product A', 4755],-->
<!--                    ['Product B', 5205],-->
<!--                    ['Product C', 1504]-->
<!--                ]);-->

<!--                this.pieDataIsModified = true;-->
<!--            },-->
<!--            getRandomData() {-->
<!--                return [-->
<!--                    {'x': 'January', 'value': this.getRandomInt(1, 15) * 1000},-->
<!--                    {'x': 'February', 'value': this.getRandomInt(3, 18) * 1000},-->
<!--                    {'x': 'March', 'value': this.getRandomInt(2, 15) * 1000},-->
<!--                    {'x': 'April', 'value': this.getRandomInt(1, 18) * 1000},-->
<!--                    {'x': 'May', 'value': this.getRandomInt(3, 18) * 1000}-->
<!--                ]-->
<!--            },-->
<!--            getRandomInt(min, max) {-->
<!--                min = Math.ceil(min);-->
<!--                max = Math.floor(max);-->
<!--                return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive-->
<!--            }-->
<!--        }-->
<!--    };-->
<!--</script>-->

<!--<style>-->
<!--    @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';-->
<!--    @import './../assets/style/tradingview.css';-->

<!--    #nav a {-->
<!--        font-weight: bold;-->
<!--        color: #2c3e50;-->
<!--    }-->

<!--    #nav a.router-link-exact-active {-->
<!--        color: #42b983;-->
<!--    }-->
<!--</style>-->
