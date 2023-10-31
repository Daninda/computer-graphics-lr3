const width = 800;
const height = 800;
const title = document.getElementById('title');
const canv = document.getElementById('canvas');
canv.width = width;
canv.height = height;
const ctx = canv.getContext('2d');
let imageData = ctx.createImageData(width, height);

blankCanvas(imageData);


brezenhamLine(imageData, 100, 700, 700, 700, [255,0,0]);
bezier3(imageData, 100, 700, 400, -100, 700, 700, [255,0,0]);
bezier3(imageData, 400, 700, 500, 300, 600, 700, [0,0,255]);
bezier4(imageData, 260, 540, 300, 620, 260, 685, 300, 540, [0,255,0]);
bezier4(imageData, 250, 530, 300, 620, 260, 685, 310, 530, [0,255,0]);
bezier4(imageData, 270, 530, 300, 620, 260, 685, 300, 530, [0,255,0]);
brezenhamCircle(imageData, 550, 600, 10, [0,0,0]);
brezenhamCircle(imageData, 300, 550, 80, [0,0,255]);
brezenhamLine(imageData, 300, 470, 300, 630, [0,0,0]);
brezenhamLine(imageData, 220, 550, 380, 550, [0,0,0]);

brezenhamLine(imageData, 400, 50, 600, 60, [0,0,0]);

brezenhamCircle(imageData, 150, 150, 50, [255,255,0]);
brezenhamLine(imageData, 150, 215, 150, 275, [255,255,0]);
brezenhamLine(imageData, 150, 85, 150, 25, [255,255,0]);
brezenhamLine(imageData, 215, 150, 275, 150, [255,255,0]);
brezenhamLine(imageData, 85, 150, 25, 150, [255,255,0]);
brezenhamLine(imageData, 195, 195, 250, 250, [255,255,0]);
brezenhamLine(imageData, 105, 195, 50, 250, [255,255,0]);
brezenhamLine(imageData, 105, 105, 50, 50, [255,255,0]);
brezenhamLine(imageData, 195, 105, 250, 50, [255,255,0]);

lissaFigure(imageData, 500, 750, 100, 50, Math.PI / 6, Math.PI / 30, [0,255,0]);

seededAlgorithm(imageData, 150, 150, [255,255,0]);
seededAlgorithm(imageData, 550, 600, [0,0,0]);


let pattern1 = [[1,0,0,0,0]];
modifyedSeededAlgorithm(imageData, 450, 650, pattern1, [128,50,10]);

pattern1 = [[1,0,0,0,0,0,1],
            [0,1,0,1,0,1,0],
            [0,0,1,0,1,0,0],
            [0,1,0,0,0,1,0],
            [0,0,1,0,1,0,0],
            [0,1,0,1,0,1,0],
            [1,0,0,0,0,0,1]];
modifyedSeededAlgorithm(imageData, 400, 350, pattern1, [125,10,0]);

pattern1 = [[0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0],
            [1,1,1,1,1,1,1],
            [0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0]];
modifyedSeededAlgorithm(imageData, 150, 150, pattern1, [255,0,0]);

pattern1 = [[0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]];
modifyedSeededAlgorithm(imageData, 0, 0, pattern1, [0,0,255]);

ctx.putImageData(imageData, 0, 0);

function lissaFigure(imageData, x, y, R1, R2, w1, w2, color) {
    let x1 = x + R1;
    let y1 = y;
    let x2, y2;
    for (let t = 1; t <= 360; t++) {
        x2 = Math.round(x + R1 * Math.cos(t * w1));
        y2 = Math.round(y + R2 * Math.sin(t * w2));
        brezenhamLine(imageData, x1, y1, x2, y2, color);
        x1 = x2;
        y1 = y2;
    }
}

function brezenhamLine(imageData, x0, y0, x1, y1, color) {
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
        setPoint(imageData, x, y, pattern = [[1]], color);
    } 
}

function brezenhamCircle(imageData, x0, y0, r, color) {
    let x = 0;
    let y = r;
    let d = 3 - 2 * r;
    while (y >= x) {
        setPoint(imageData, x0 + x, y0 + y, pattern = [[1]], color);
        setPoint(imageData, x0 + x, y0 - y, pattern = [[1]], color);
        setPoint(imageData, x0 - x, y0 + y, pattern = [[1]], color);
        setPoint(imageData, x0 - x, y0 - y, pattern = [[1]], color);
        setPoint(imageData, x0 + y, y0 + x, pattern = [[1]], color);
        setPoint(imageData, x0 + y, y0 - x, pattern = [[1]], color);
        setPoint(imageData, x0 - y, y0 + x, pattern = [[1]], color);
        setPoint(imageData, x0 - y, y0 - x, pattern = [[1]], color);
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

function bezier3(imageData, x0, y0, x1, y1, x2, y2, color) {
    let x, y;
    for (let t = 0; t <= 1; t = t + 0.0001) {
        x = (1 - t)**2 * x0 + 2 * (1 - t) * t * x1 + t**2 * x2;
        y = (1 - t)**2 * y0 + 2 * (1 - t) * t * y1 + t**2 * y2;
        setPoint(imageData, Math.round(x), Math.round(y), pattern = [[1]], color);
    }
}

function bezier4(imageData, x0, y0, x1, y1, x2, y2, x3, y3, color) {
    let x, y;
    for (let t = 0; t < 1; t += 0.0001) {
        x = (1-t)**3*x0 + 3*t*(1-t)**2*x1 + 3*t**2*(1-t)*x2 + t**3*x3;
        y = (1-t)**3*y0 + 3*t*(1-t)**2*y1 + 3*t**2*(1-t)*y2 + t**3*y3;
        setPoint(imageData, Math.round(x), Math.round(y), pattern = [[1]], color);
    }
}

function seededAlgorithm(imageData, x0, y0, color) {
    let pixelColor = getColor(imageData, x0, y0);
    if (checkColor(imageData, x0, y0, color)) return;
    let stack = [];
    let pixel = {x: x0, y: y0};
    stack.push(pixel);
    do {
        pixel = stack.pop();
        setPoint(imageData, pixel.x, pixel.y, [[1]], color);
        let adjacent = getAdjacent(imageData, pixel.x, pixel.y, pixelColor);
        for (let i = 0; i < adjacent.length; i++) {
            stack.push(adjacent[i]);
        }
    } while (stack.length != 0)
}

function modifyedSeededAlgorithm(imageData, x0, y0, pattern = [[1]], color) {
    if (checkColor(imageData, x0, y0, color)) return;
    let pixelColor = getColor(imageData, x0, y0);
    imageDataForPattern = new ImageData(imageData.width, imageData.height);
    blankCanvas(imageDataForPattern);
    let stack = [];
    let pixel = {x: x0, y: y0};
    let x, y;
    stack.push(pixel);
    do {
        let xLeft, xRight;
        pixel = stack.pop();
        x = pixel.x;
        y = pixel.y;
        while (x >= 0 && checkColor(imageData, x, y, pixelColor)) {
            setPoint(imageData, x, y, [[1]], color);
            setPoint(imageDataForPattern, x, y, [[1]], [0,0,0]);
            x--;
        }
        xLeft = x + 1;

        x = pixel.x + 1;
        while (x < imageData.width && checkColor(imageData, x, y, pixelColor)) {
            setPoint(imageData, x, y, [[1]], color);
            setPoint(imageDataForPattern, x, y, [[1]], [0,0,0]);
            x++;
        }
        xRight = x - 1;

        let colorChange;
        y = pixel.y - 1;
        if (y != -1) {
            colorChange = 0;
            for (let x = xRight; x >= xLeft; x--) {
                if (checkColor(imageData, x, y, pixelColor) && colorChange == 0) {
                    colorChange = 1;
                    stack.push({x: x, y: y});
                }
                else if (!checkColor(imageData, x, y, pixelColor) && colorChange == 1) {
                    colorChange = 0;
                }
            }
        }
        
        y = pixel.y + 1;
        if (y != imageData.height) {
            colorChange = 0;
            for (let x = xRight; x >= xLeft; x--) {
                if (checkColor(imageData, x, y, pixelColor) && colorChange == 0) {
                    colorChange = 1;
                    stack.push({x: x, y: y});
                }
                else if (!checkColor(imageData, x, y, pixelColor) && colorChange == 1) {
                    colorChange = 0;
                }
            }
        }
    } while (stack.length != 0)
    applyPattern(imageData, imageDataForPattern, pattern, color, pixelColor);
}

function applyPattern(imageData, imageDataForPattern, pattern, color, prevColor) {
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            if (checkColor(imageDataForPattern, x, y, [0,0,0])) {
                setPoint(imageData, x, y, pattern, color, prevColor);
            }
        }
    }
}

function blankCanvas(imageData) {
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            imageData.data[y * (imageData.width * 4) + x * 4 + 0] = 255;
            imageData.data[y * (imageData.width * 4) + x * 4 + 1] = 255;
            imageData.data[y * (imageData.width * 4) + x * 4 + 2] = 255;
            imageData.data[y * (imageData.width * 4) + x * 4 + 3] = 255;
        }
    }
}

function getAdjacent(imageData, x, y, color) {
    let result = [];
    if (y + 1 < imageData.height && checkColor(imageData, x, y + 1, color)) {
        result.push({x: x, y: y + 1});
    }
    if (x + 1 < imageData.width && checkColor(imageData, x + 1, y, color)) {
        result.push({x: x + 1, y: y});
    }
    if (y - 1 >= 0 && checkColor(imageData, x, y - 1, color)) {
        result.push({x: x, y: y - 1});
    }
    if (x - 1 >= 0 && checkColor(imageData, x - 1, y, color)) {
        result.push({x: x - 1, y: y});
    }
    return result;
}

function setPoint(imageData, x, y, pattern = [[1]], color, prevColor = color) {
    if (pattern[y % pattern.length][x % pattern[0].length] == 1) {
        imageData.data[y * (imageData.width * 4) + x * 4 + 0] = color[0];
        imageData.data[y * (imageData.width * 4) + x * 4 + 1] = color[1];
        imageData.data[y * (imageData.width * 4) + x * 4 + 2] = color[2];
    }
    else {
        imageData.data[y * (imageData.width * 4) + x * 4 + 0] = prevColor[0];
        imageData.data[y * (imageData.width * 4) + x * 4 + 1] = prevColor[1];
        imageData.data[y * (imageData.width * 4) + x * 4 + 2] = prevColor[2];
    }
}

function getColor(imageData, x, y) {
    return [imageData.data[y * (imageData.width * 4) + x * 4 + 0],
            imageData.data[y * (imageData.width * 4) + x * 4 + 1],
            imageData.data[y * (imageData.width * 4) + x * 4 + 2]]
}

function checkColor(imageData, x, y, color) {
    return (imageData.data[y * (imageData.width * 4) + x * 4 + 0] == color[0] &&
            imageData.data[y * (imageData.width * 4) + x * 4 + 1] == color[1] &&
            imageData.data[y * (imageData.width * 4) + x * 4 + 2] == color[2])
}