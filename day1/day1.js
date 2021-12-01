const { readFile } = require("fs");

readFile(process.argv[2], "utf-8", (error, data) => {
    if (error) {
        throw error;
    }

    const stringArray = data.trim().split("\n");
    const dataArray = stringArray.map((line) => parseInt(line, 10));
    depthCounter(dataArray);
    slidingCounter(dataArray);
});

const depthCounter = (input) => {
    const total = input.reduce(
        ([total, prev], current) => {
            return current > prev ? [total + 1, current] : [total, current];
        },
        [0, undefined]
    );

    console.log(total);
};

const slidingCounter = (input) => {
    const total = input.reduce(
        ([total, slider, prev], current) => {
            slider.push(current);
            if (slider.length < 3) return [total, slider, prev];

            const sliderValue = slider.reduce((a, b) => a + b, 0);

            return [
                sliderValue > prev ? total + 1 : total,
                slider.slice(1),
                sliderValue,
            ];
        },
        [0, [], undefined]
    );

    console.log(total);
};
