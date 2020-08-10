# :neckbeard: VuMeter demo

VuMeter is a lightweight animated front web component highly customizable.

Here you will find the api to display a vu-meter throught different styles and directions.  

No assets required nor external dependencies, just 30 lines of procedural vanilla js and a bunch of css.

## Demo

### Raw

![VuMeter Horizontal Raw](doc/img/raw.gif)

``` html
<div id="vumhboarded1" class="vum vumh gradienthdefault">
    <div class="vumoverlay vumoverlayh" data-tooltip=""></div>
</div>
```

### Boarded

![VuMeter Horizontal Boarded](doc/img/boarded.gif)

``` html
 <div class="board gradientmetal">
    <div class="screwgridh">
        <div class="screwbox">
            <div class="hexagon screwcenter"></div>
        </div>
        <div class="screwbox">
            <div class="hexagon screwcenter"></div>
        </div>
        <div class="screwbox">
            <div class="hexagon screwcenter"></div>
        </div>
    </div>
    <div id="vumhboarded1" class="vum vumh gradienthdefault">
        <div class="vumoverlay vumoverlayh" data-tooltip=""></div>
    </div>
    <div class="screwgridh">
        <div class="screwbox">
            <div class="hexagon screwcenter"></div>
        </div>
        <div class="screwbox">
            <div class="hexagon screwcenter"></div>
        </div>
        <div class="screwbox">
            <div class="hexagon screwcenter"></div>
        </div>
    </div>
</div>
```

### Gradients

A collection of exisiting gradients can be found in [gradient.css](src/css/gradient.css).

### Masks

A collection of exisiting masks can be found in [mask.css](src/css/mask.css).

### Board

A sample board can be found in [board.css](src/css/board.css).

### Screew

A sample screew can be found in [screew.css](src/css/screew.css).

## Usage

Clone or download this repo then open index.html into your web browser.  
To package and use in your own project, peek css sheet code then include [vumeter.js](src/js/vumeter.js).

## Todo

### Features

* Clipping
* Svg masks
