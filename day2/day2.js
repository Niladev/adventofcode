const { readFile } = require("fs");

readFile(process.argv[2], "utf-8", (error, data) => {
    if (error) {
        throw error;
    }

    const lines = data.split("\n");

    const p1Answer = calculateHorDepth(lines);
    const p2Answer = calculateHorDepthAim(lines);

    console.log("part1", p1Answer);
    console.log("part2", p2Answer);
});

const calculateHorDepthAim = (lines) => {
    const [hor, aim, dpth] = lines.reduce(
        ([horizontal, aim, depth], line) => {
            const [direction, units] = line.split(" ");
            const parsedUnit = parseInt(units, 10);

            switch (direction) {
                case "up":
                    return [
                        horizontal,
                        aim - parsedUnit > 0 ? aim - parsedUnit : 0,
                        depth,
                    ];
                case "down":
                    return [horizontal, aim + parsedUnit, depth];
                case "forward":
                    return [
                        horizontal + parsedUnit,
                        aim,
                        depth + aim * parsedUnit,
                    ];
            }
        },
        [0, 0, 0]
    );
    console.log(hor, aim, dpth);
    return hor * dpth;
};

const calculateHorDepth = (lines) => {
    const [hor, dpth] = lines.reduce(
        ([horizontal, depth], line) => {
            const [direction, units] = line.split(" ");
            const parsedUnit = parseInt(units, 10);
            switch (direction) {
                case "up":
                    return [horizontal, depth - parsedUnit];
                case "down":
                    return [horizontal, depth + parsedUnit];
                case "forward":
                    return [horizontal + parsedUnit, depth];
            }
        },
        [0, 0]
    );

    return hor * dpth;
};
