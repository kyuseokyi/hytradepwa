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
                <button id="streamButton" class="streamButton side_btn btn" v-on:click="startStreamHandler" >Start
                    Stream</button>
                <div class="account_setting_btn m-1 d-flex flex-column align-self-end">
                    <div class="acc_set_text"><i class="fas fa-caret-down"></i> 연습 계정</div>
                    <div class="acc_set_text"><i class="fa fa-bank"></i> 10.000.000</div>
                </div>
                <button class="deposit_btn btn btn-outline-success btn-lg">입금</button>
            </div>
            <div class="contents_row d-flex flex-row flex-grow-1">
                <vue-anychart class="chart_container" :testData="testValue" ref="stockChart"></vue-anychart>
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
    import Anychart from 'anychart'

    export default {
        name: 'App',
        components: {
            VueAnychart
        },
        data() {
            return {
                Anychart: Anychart,
                testValue: "test",
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
        mounted() {
            this.$nextTick(function() {
                //after child component mounted
            })

        },
        methods: {
            initChartData() {

            },
            updateChartData() {
                //stock chart data update
            },
            makeChartData(type) {
                //ohlc chart data make for type(chart type)
            },
            //test data stream function
            startStreamHandler() {
                this.$refs.stockChart.startStream()
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
</style>
