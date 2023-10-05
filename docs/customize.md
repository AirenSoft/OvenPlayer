---
description: >-
  This section explains how to change the UI of OvenPlayer, such as modify
  styles, view templates, and more.
---

# UI Customize

## CSS Skinning

### How to change accent the color

You can easily change the color by overriding the `--op-accent-color` class in your web page:

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>OvenPlayer</title>
    <style>

        /* Change the accent color */
        #player_id {
            --op-accent-color: red;
        }

    </style>
</head>
<body>

<div id="player_id"></div>

<script src="https://cdn.jsdelivr.net/npm/ovenplayer/dist/ovenplayer.js"></script>
<script>

    // Initialize OvenPlayer
    const player = OvenPlayer.create('player_id', {
        sources: [
            ...
        ]
    });
</script>
</body>
</html>
```

### How to change the style

```
ovenplayer
...
├── src/
│    ├── assets/
│    │    ├── fonts/
│    │    └── images/
│    ...
│    └── stylesheet/
│        └── ovenplayer.less
...
```

`assets/` contains the image file used as the button in OvenPlayer. And you can modify the style yourself in `stylesheet/ovenplayer.less`.

If you want to know how to build and run, go to the [Builds](builds.md) tab.

## Add and Edit a new UI

```
ovenplayer
...
├── src/
│    ├── js/
│    │    ├── api/
│    │    ├── utils/
│    │    └── view/
│    │         ├── components/
│    │         ├── engine/
│    │         │    ├── OvenTemplate.js
│    │         │    └── Templates.js
│    │         ├── example/
│    │         ├── global/
│    │         ├── view.js
│    │         └── viewTemplate.js
...
```

The view of OvenPlayer has consisted of a template that extended OvenTemplate.

The template has a minimal life cycle starting with `onRendered()` and ending with `onDestroyed()`, and you can set an event callback with a valid scope in the template.

![](<.gitbook/assets/player_template.png>)

The top-level parent template is `view/view.js`. View creates child `Controls` and `Helpers` templates. Also, Controls and Helpers create and control child templates, respectively.

Through our example `TextView (view/example/textview.js)`, we will explain in the following part how child templates are created, controlled, and passed data by the parent template.

### Register a template

The OvenPlayer template has a pair of `controller` and `view`, each named `{templateName}.js` and `{templateName}Template.js`.

```
ovenplayer
...
├── src/
│    ├── js/
│    │    ├── api/
│    │    ├── utils/
│    │    └── view/
│    │         ├── components/
│    │         ├── engine/
│    │         ├── example/
│    │         │    ├── textview.js
│    │         │    └── textviewTemplate.js
...
```

You need to register `view` separately in Templates.

We have configured `textviewTemplate.js` corresponding to the view in the TextView. So you register `textviewTemplate.js` in `view/engine/Templates.js`.

{% code title="view/engine/Templates.js" %}
```
import TextViewTemplate from 'view/example/textviewTemplate';
import ViewTemplate from 'view/viewTemplate';
import HelpersTemplate from 'view/components/helpers/mainTemplate';
...

const Templates = {
    TextViewTemplate,
    ViewTemplate,
    HelpersTemplate,
    BigButtonTemplate,
    ...
};

export default Templates;
```
{% endcode %}

### Use a template

In this part, we will show you how to create the TextView in `helpers/main.js`, the top-level parent of Helpers.

You import `textview.js` which is `controller` in the TextView.

{% code title="view/components/helpers/main.js" %}
```
import OvenTemplate from "view/engine/OvenTemplate";
import BigButton from "view/components/helpers/bigButton";
import MessageBox from "view/components/helpers/messageBox";
import CaptionViewer from "view/components/helpers/captionViewer";
import Spinner from "view/components/helpers/spinner";
//It adds a textview template for testing.
import TextView from 'view/example/textview'; 
...

const Helpers = function($container){
let bigButton = "", messageBox = "",  captionViewer = "", spinner = "", textView; 
 ...
 
 const onRendered = function($current, template){
  //It creates the TextView right after Helper is loaded on the screen.
  textView = TextView($current, api, "Hello world. Nice to meet you.");
  ...
  
 });
 
 //Callback that is called when Helpers are removed in OvenPlayer.
 const onDestroyed = function(template){
  textView.destroy(); //When Helpers, which is the parent template, is removed, the textView is also removed.
  
  api.off(READY, null, template);
  api.off(PLAYER_STATE, null, template);
  ...
 };
 
 //The event to be used by Helpers. However, Helpers are used as a container for the template, so there are no special events.
 const events = {
 };
 
 return OvenTemplate($container, "Helpers", null, events, onRendered, onDestroyed );
};

export default Helpers;
```
{% endcode %}

The source of the `TextView` is:

{% code title="/view/example/textview.js" %}
```
import OvenTemplate from 'view/engine/OvenTemplate';

const TextView = function($container, api, text){

    const onRendered = function($current, template){
    };
    
    const onDestroyed = function(template){
        //Do nothing.
    };
    
    const events = {
        "click .btn" : function(event, $current, template){
            event.preventDefault();
            alert("Hi!");
        }
    };

    return OvenTemplate($container, "TextView", text events, onRendered, onDestroyed );

};

export default TextView;
```
{% endcode %}

`$container` means the parent's element, and in onRendered(), onDestroyed(), and events(), `$current` means the element owned by each item.

{% code title="/view/example/textviewTemplate.js" %}
```
const TextViewTemplate = function(text){
    return `<div class="textView" style="padding : 5px; background: red; position : absolute; top: 0;">` +
                `<h3>${text}</h3>` +
                `<button type="button" class="btn">button</button>` +
            `</div>`;
};

export default TextViewTemplate;
```
{% endcode %}

### LikeA$&#x20;

`$container` and `$current` in OvenPlayerTemplate consist of `LikeA$` object.

#### Create LikeA$ object

```
import LA$ from 'utils/likeA$';
... 

let $player = LA$("#player");
```

#### Search element

```
$player.find(".textView");
```

#### Access element

```
$player.find(".textView").get();
```

#### Edit CSS

```
$player.find(".textView").css("color", "#d9d9d9");
```

Please check `/utils/likeA$.js` for more information. This is slightly more inconvenient than jquery but enough to control OvenPlayer.

## Build and Run

You can build OvenPlayer through the  [Builds](builds.md) chapter.

```
npm run watch
```

You can see the added TextView by building OvenPlayer and running `dist/development/ index.html`.

![Test run screen](<.gitbook/assets/custom_ui.png>)

In this way, you can add a new UI or customize the template.
