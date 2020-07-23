export default {
    /**
     * make test chart data
     * @returns {[]}
     */
    makeOHLC() {
        let t1 = new Date()
        t1.setDate(t1.getDate() - 1);

        //let end = 238;
        let start = 220;

        let data = [];
        for (let i = 0; i < 100; i++) {
            let date = t1.setSeconds(t1.getSeconds() + 1);
            console.log(`i=${i} d=${t1}`);

            let open = start + Math.random();
            let high = open + Math.random();
            let low = open + high - open;
            let close = open;
            let volume = 0;

            data.push([date, open, high, low, close, volume]);
        }
        return data;
    },

    /**
     *
     * @param lastDate
     * @param count
     * @param gap
     * @returns {[]}
     */
    makeNextDate(lastDate, count = 90, gap = 1) {
        //let t1 = new Date()
        let t1 = new Date(lastDate);

        //let gap = 1;
        let data = [];
        for (let i = 0; i < count; i++) {
            let date = t1.setSeconds(t1.getSeconds() + gap);
            //console.log(`i=${i} d=${t1}`);
            // eslint-disable-next-line
            data.push([date, , , , ,]);
        }
        return data;
    },

    /**
     *
     * @param plot
     * @param datetime
     * @param gap
     * @returns {{calcualteTime: (*), inputLimitTime: (*)}}
     */
    makeVerticalLine(plot, datetime, gap = 30) {
        let d1 = new Date(datetime);
        let d2 = new Date(datetime);

        console.log('[KES] makeVerticalLine time:', datetime);

        d2 = d2.setSeconds(d2.getSeconds() + gap);

        plot.annotations().removeAllAnnotations();


        let annotation = plot.annotations();

        annotation.verticalLine({
                xAnchor: d1,
                stroke: {
                    thickness: 1,
                    color: 'lightblue',
                    dash: '3 2'
                }
            }
        ).allowEdit(false);

        annotation.verticalLine({
                xAnchor: d2,
                stroke: {
                    thickness: 1,
                    color: 'red',
                    dash: '3 2'
                }
            }
        ).allowEdit(false);

        return {
            inputLimitTime: typeof (d1) != 'number' ? d1.getTime() : d1,
            calcualteTime: typeof (d2) != 'number' ? d2.getTime() : d2
        }
    },
}
