//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Container = PIXI.Container;

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

PIXI.loader.add("images/cat.png").load(() => {
    let catSprite = new Sprite(TextureCache["images/cat.png"]);

    mapContainer.addChild(catSprite);
});