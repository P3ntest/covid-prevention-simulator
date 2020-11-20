var currentMapContainerZoom = 1;

mapContainer.on("mousedown", () => {
    mapContainerMouseDown = true;
    console.log(true);
});
mapContainer.on("mouseup", () => {
    mapContainerMouseDown = false;
});
mapContainer.on("pointermove", ((event) => {
    if (mapContainerMouseDown) {
        console.log(event);
    }
}));

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