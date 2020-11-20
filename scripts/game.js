//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Container = PIXI.Container;

let app = new Application({});

document.getElementById("game-container").appendChild(app.view);

app.renderer.resize(window.innerWidth - 250, window.innerHeight);
document.getElementById("game-container").style.width = window.innerWidth - 250;


let mapContainer = new Container();
app.stage.addChild(mapContainer);
let mapContainerMouseDown = false;




let coronaHotspot = new PIXI.Graphics();
coronaHotspot.beginFill(0xFF0000);
// coronaHotspot.lineStyle(10, 0x880000, 1);
coronaHotspot.drawCircle(0, 0, 50);
coronaHotspot.endFill();
coronaHotspot.x = 100;
coronaHotspot.y = 100;
coronaHotspot.alpha = 0.6;
coronaHotspot.pivot.set(25, 25);
mapContainer.addChild(coronaHotspot);
mapContainer.sortableChildren = true;


PIXI.loader.add("images/map.png").load(() => {
    let mapSprite = new Sprite(TextureCache["images/map.png"]);

    mapSprite.width = 1920;
    mapSprite.height = 1080;

    // mapSprite.alpha = 0.5;

    mapContainer.addChild(mapSprite);

    coronaHotspot.zIndex = 10;
    mapSprite.zIndex = -10;
});

let overGameContainer = false;
document.getElementById("game-container").addEventListener("mouseenter", () => {overGameContainer = true});
document.getElementById("game-container").addEventListener("mouseleave", () => {overGameContainer = false});