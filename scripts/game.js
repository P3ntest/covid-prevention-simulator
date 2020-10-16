//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Container = PIXI.Container;

//test

//Create a Pixi Application
let app = new Application({});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);


let mapContainer = new Container();
app.stage.addChild(mapContainer);
//mapContainerMouseDown.interactive = true;
let mapContainerMouseDown = false;

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

var currentMapContainerZoom = 1;

document.addEventListener("mousewheel", (event) => {
    currentMapContainerZoom += event.wheelDeltaY * -0.001;
    currentMapContainerZoom = Math.max(1, currentMapContainerZoom);
    currentMapContainerZoom = Math.min(4, currentMapContainerZoom);

    let mousePos = app.renderer.plugins.interaction.mouse.global;

    let partX = (mousePos.x - mapContainer.x) / mapContainer.width;
    let partY = (mousePos.y - mapContainer.y) / mapContainer.height;

    mapContainer.scale.set(currentMapContainerZoom, currentMapContainerZoom);

    let mapX = Math.min(0, mousePos.x - partX * mapContainer.width);
    let mapY = Math.min(0, mousePos.y - partY * mapContainer.height);

    if (mapX + mapContainer.width < window.innerWidth) {
        mapX = window.innerWidth - mapContainer.width;
    }

    if (mapY + mapContainer.height < window.innerHeight) {
        mapY = window.innerHeight - mapContainer.height;
    }

    mapContainer.x = mapX;
    mapContainer.y = mapY;
}, false);


PIXI.loader.add("images/map.png").load(() => {
    let mapSprite = new Sprite(TextureCache["images/map.png"]);

    mapSprite.width = 1920;
    mapSprite.height = 1080;

    mapContainer.addChild(mapSprite);
});