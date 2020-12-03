var currentMapContainerZoom = 1;
let mouseDown = false;

let overGameContainer = false;
document.getElementById("game-container").addEventListener("mouseenter", () => {overGameContainer = true});
document.getElementById("game-container").addEventListener("mouseleave", () => {overGameContainer = false});

let from = {};

document.getElementById("game-container").addEventListener("mousedown", (event) => {
    mouseDown = true;

    if (overGameContainer) {
        from.x = event.screenX;
        from.y = event.screenY;
    }
});

document.getElementById("game-container").addEventListener("mouseup", (event) => {
    mouseDown = false;
});

document.getElementById("game-container").addEventListener("mousemove", (event) => {
    if (mouseDown && overGameContainer) {
        pan(event);
        from.x = event.screenX;
        from.y = event.screenY;
    }
})

function pan(event) {
    let xDelta = event.screenX - from.x;
    let yDelta = event.screenY - from.y;

    let mapX =  mapContainer.x + xDelta;
    let mapY = mapContainer.y + yDelta;

    let gameW = document.getElementById("game-container").getBoundingClientRect().width;
    let gameH = document.getElementById("game-container").getBoundingClientRect().height;

    mapX = Math.min(0, mapX);
    mapY = Math.min(0, mapY);

    mapX = Math.max(gameW - mapContainer.width, mapX);
    mapY = Math.max(gameH - mapContainer.height, mapY);

    mapContainer.x = mapX;
    mapContainer.y = mapY;
}

document.addEventListener("mousewheel", (event) => {
    if (!overGameContainer)
        return;

    currentMapContainerZoom += event.wheelDeltaY * -0.002;
    currentMapContainerZoom = Math.max(1, currentMapContainerZoom);
    currentMapContainerZoom = Math.min(12, currentMapContainerZoom);

    let mousePos = app.renderer.plugins.interaction.mouse.global;

    let partX = (mousePos.x - mapContainer.x) / mapContainer.width;
    let partY = (mousePos.y - mapContainer.y) / mapContainer.height;

    mapContainer.scale.set(currentMapContainerZoom, currentMapContainerZoom);

    let mapX = Math.min(0, mousePos.x - partX * mapContainer.width);
    let mapY = Math.min(0, mousePos.y - partY * mapContainer.height);

    let gameW = document.getElementById("game-container").getBoundingClientRect().width;
    let gameH = document.getElementById("game-container").getBoundingClientRect().height;

    if (mapX + mapContainer.width < gameW) {
        mapX = gameW - mapContainer.width;
    }

    if (mapY + mapContainer.height < gameH) {
        mapY = gameH - mapContainer.height;
    }

    mapContainer.x = mapX;
    mapContainer.y = mapY;
}, false);