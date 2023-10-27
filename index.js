const width = 800;
const height = 800;
const title = document.getElementById('title');
const canv = document.getElementById('canvas');
canv.width = width;
canv.height = height;
const ctx = canv.getContext('2d');
let imageData = ctx.createImageData(width, height);

brezenhamLine(imageData, 100, 700, 700, 700);
bezier3(imageData, 100, 700, 400, -100, 700, 700);
bezier3(imageData, 400, 700, 500, 300, 600, 700);
bezier4(imageData, 260, 540, 300, 620, 260, 685, 300, 540);
bezier4(imageData, 250, 530, 300, 620, 260, 685, 310, 530);
bezier4(imageData, 270, 530, 300, 620, 260, 685, 300, 530);
brezenhamCircle(imageData, 550, 600, 10);
brezenhamCircle(imageData, 300, 550, 80);
brezenhamLine(imageData, 300, 470, 300, 630);
brezenhamLine(imageData, 220, 550, 380, 550);

brezenhamCircle(imageData, 150, 150, 50);
brezenhamLine(imageData, 150, 215, 150, 275);
brezenhamLine(imageData, 150, 85, 150, 25);
brezenhamLine(imageData, 215, 150, 275, 150);
brezenhamLine(imageData, 85, 150, 25, 150);
brezenhamLine(imageData, 195, 195, 250, 250);
brezenhamLine(imageData, 105, 195, 50, 250);
brezenhamLine(imageData, 105, 105, 50, 50);
brezenhamLine(imageData, 195, 105, 250, 50);

lissaFigure(imageData, 500, 750, 100, 50, Math.PI / 6, Math.PI / 30);

seededAlgorithm(imageData, 550, 600);

let pattern = [[1,0,0,0,0]];
modifyedSeededAlgorithm(imageData, 450, 650, pattern);

pattern = [[1,0,0,0,0,0,1],
            [0,1,0,1,0,1,0],
            [0,0,1,0,1,0,0],
            [0,1,0,0,0,1,0],
            [0,0,1,0,1,0,0],
            [0,1,0,1,0,1,0],
            [1,0,0,0,0,0,1]];
modifyedSeededAlgorithm(imageData, 400, 350, pattern);

pattern = [[0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0],
            [1,1,1,1,1,1,1],
            [0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0]];
modifyedSeededAlgorithm(imageData, 150, 150, pattern);

pattern = [[0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]];
modifyedSeededAlgorithm(imageData, 0, 0, pattern);

ctx.putImageData(imageData, 0, 0);

function lissaFigure(imageData, x, y, R1, R2, w1, w2) {
    let x1 = x + R1;
    let y1 = y;
    let x2, y2;
    for (let t = 1; t <= 360; t++) {
        x2 = Math.round(x + R1 * Math.cos(t * w1));
        y2 = Math.round(y + R2 * Math.sin(t * w2));
        brezenhamLine(imageData, x1, y1, x2, y2);
        x1 = x2;
        y1 = y2;
    }
}

function brezenhamLine(imageData, x0, y0, x1, y1) {
    if (x0 > x1) {
        let v = x0;
        x0 = x1;
        x1 = v;
        v = y0;
        y0 = y1;
        y1 = v;
    }
    let x = x0, y = y0;
    let dx = x1 - x0;
    let dy = y1 - y0;
    let e;
    while (!(x == x1 && y == y1)) {
        e = (x - x0 + 1) * dy / dx - (y - y0);
        if (e < -2) {
            y--;
        }
        else if (e >= -2 && e < -0.5) {
            x++;
            y--;
        }
        else if (e >= -0.5 && e < 0.5) {
            x++;
        }
        else if(e >= 1/2 && e < 2) {
            x++;
            y++;
        }
        else {
            y++;
        }
        setPoint(imageData, x, y);
    } 
}

function brezenhamCircle(imageData, x0, y0, r) {
    let x = 0;
    let y = r;
    let d = 3 - 2 * r;
    while (y >= x) {
        setPoint(imageData, x0 + x, y0 + y);
        setPoint(imageData, x0 + x, y0 - y);
        setPoint(imageData, x0 - x, y0 + y);
        setPoint(imageData, x0 - x, y0 - y);
        setPoint(imageData, x0 + y, y0 + x);
        setPoint(imageData, x0 + y, y0 - x);
        setPoint(imageData, x0 - y, y0 + x);
        setPoint(imageData, x0 - y, y0 - x);
        if (d <= 0) {
            d = d + 4 * x + 6;
        }
        else {
            d = d + 4 * (x - y) + 10;
            y--;
        }
        x++;
    }
}

function bezier3(imageData, x0, y0, x1, y1, x2, y2) {
    let x, y;
    for (let t = 0; t <= 1; t = t + 0.0001) {
        x = (1 - t)**2 * x0 + 2 * (1 - t) * t * x1 + t**2 * x2;
        y = (1 - t)**2 * y0 + 2 * (1 - t) * t * y1 + t**2 * y2;
        setPoint(imageData, Math.round(x), Math.round(y));
    }
}

function bezier4(imageData, x0, y0, x1, y1, x2, y2, x3, y3) {
    let x, y;
    for (let t = 0; t < 1; t += 0.0001) {
        x = (1-t)**3*x0 + 3*t*(1-t)**2*x1 + 3*t**2*(1-t)*x2 + t**3*x3;
        y = (1-t)**3*y0 + 3*t*(1-t)**2*y1 + 3*t**2*(1-t)*y2 + t**3*y3;
        setPoint(imageData, Math.round(x), Math.round(y));
    }
}

function seededAlgorithm(imageData, x0, y0) {
    if (checkFilled(imageData, x0, y0)) return;
    let stack = [];
    let pixel = {x: x0, y: y0};
    stack.push(pixel);
    do {
        pixel = stack.pop();
        setPoint(imageData, pixel.x, pixel.y);
        let adjacent = getAdjacent(imageData, pixel.x, pixel.y);
        for (let i = 0; i < adjacent.length; i++) {
            stack.push(adjacent[i]);
        }
    } while (stack.length != 0)
}

function modifyedSeededAlgorithm(imageData, x0, y0, pattern = [[1]]) {
    if (checkFilled(imageData, x0, y0)) return;
    imageDataForPattern = new ImageData(imageData.width, imageData.height);
    let stack = [];
    let pixel = {x: x0, y: y0};
    let x, y;
    stack.push(pixel);
    do {
        let xLeft, xRight
        pixel = stack.pop();
        x = pixel.x;
        y = pixel.y;
        while (x >= 0 && !checkFilled(imageData, x, y)) {
            setPoint(imageData, x, y);
            setPoint(imageDataForPattern, x, y);
            x--;
        }
        xLeft = x + 1;

        x = pixel.x + 1;
        while (x < imageData.width && !checkFilled(imageData, x, y)) {
            setPoint(imageData, x, y);
            setPoint(imageDataForPattern, x, y);
            x++;
        }
        xRight = x - 1;

        let colorChange;
        y = pixel.y - 1;
        if (y != -1) {
            colorChange = 0;
            for (let x = xRight; x >= xLeft; x--) {
                if (!checkFilled(imageData, x, y) && colorChange == 0) {
                    colorChange = 1;
                    stack.push({x: x, y: y});
                }
                else if (checkFilled(imageData, x, y) && colorChange == 1) {
                    colorChange = 0;
                }
            }
        }
        
        y = pixel.y + 1;
        if (y != imageData.height) {
            colorChange = 0;
            for (let x = xRight; x >= xLeft; x--) {
                if (!checkFilled(imageData, x, y) && colorChange == 0) {
                    colorChange = 1;
                    stack.push({x: x, y: y});
                }
                else if (checkFilled(imageData, x, y) && colorChange == 1) {
                    colorChange = 0;
                }
            }
        }
    } while (stack.length != 0)
    applyPattern(imageData, imageDataForPattern, pattern);
}

function applyPattern(imageData, imageDataForPattern, pattern) {
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            if (checkFilled(imageDataForPattern, x, y)) {
                setPoint(imageData, x, y, pattern);
            }
        }
    }
}

function getAdjacent(imageData, x, y) {
    let result = [];
    if (y + 1 < imageData.height && !checkFilled(imageData, x, y + 1)) {
        result.push({x: x, y: y + 1});
    }
    if (x + 1 < imageData.width && !checkFilled(imageData, x + 1, y)) {
        result.push({x: x + 1, y: y});
    }
    if (y - 1 >= 0 && !checkFilled(imageData, x, y - 1)) {
        result.push({x: x, y: y - 1});
    }
    if (x - 1 >= 0 && !checkFilled(imageData, x - 1, y)) {
        result.push({x: x - 1, y: y});
    }
    return result;
}

function setPoint(imageData, x, y, pattern = [[1]]) {
    imageData.data[y * (imageData.width * 4) + x * 4 + 3] = pattern[y % pattern.length][x % pattern[0].length] * 255;
}

function checkFilled(imageData, x, y) {
    return imageData.data[y * (imageData.width * 4) + x * 4 + 3] == 255
}