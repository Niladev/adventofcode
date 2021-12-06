const { readFile, linkSync } = require("fs");

readFile(process.argv[2], "utf-8", (error, data) => {
    if (error) {
        throw error;
    }

    const lines = data.split("\n");

    const [gamma, epsilon] = findGammaEpsilon(lines);
    findCO2Oxygen(lines);
    console.log("problem 1", gamma * epsilon);
});

const splitList = (lines, index, reverse) => {
    if (lines.length === 1) {
        return lines;
    }

    const [one, zero] = lines.reduce(
        ([o, z], line) => {
            return parseInt(line[index], 10) === 0
                ? [o, [line, ...z]]
                : [[...o, line], z];
        },
        [[], []]
    );

    return splitList(
        reverse
            ? one.length > zero.length || one.length === zero.length
                ? one
                : zero
            : one.length > zero.length || one.length === zero.length
            ? zero
            : one,
        index + 1,
        reverse
    );
};

const findCO2Oxygen = (lines) => {
    const oxygen = splitList(lines, 0, false);
    const CO2 = splitList(lines, 0, true);

    console.log(parseInt(oxygen[0], 2) * parseInt(CO2[0], 2));
};

const findGammaEpsilon = (lines) => {
    const final = ["", ""];
    lines
        .reduce(
            (prev, line) => {
                return line.split("").map((value, index) => {
                    return prev[index] + parseInt(value, 10);
                });
            },
            Array.from({ length: parseInt(lines[0].length, 10) }, () => 0)
        )
        .forEach((value) => {
            if (value > lines.length / 2) {
                final[0] = final[0] + 1;
                final[1] = final[1] + 0;
            } else {
                final[0] = final[0] + 0;
                final[1] = final[1] + 1;
            }
        });

    return [parseInt(final[0], 2), parseInt(final[1], 2)];
};
