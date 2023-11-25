# Slider-library

This is a basic slider library that provides you with all the necessary toolkits that you may need to create an effective slider, and you can create as many sliders as you like without any fear of conflict with pre-existing elements.

This library is a class base library that allows you to create a slider instance, in that instance's parameter, you must assign the slider content in the parameter object, the container ID in which this slider will fit, whether you want to enable autoplay or not, whether or not you want to enable loop or not, the structure of instance creation is as follow:

let slider = new Slider({
    "containerId": //This requires the ID of the container in which the slider will be placed,
    "autoplay": //This object parameter takes in value as a boolean and determines whether the slider will autoplay or not,
    "loop": //This object parameter takes in value as a boolean and determines whether the slider will loop on itself or not,
    "duration": //This will define the change duration from one slide to another in seconds,
    "transition": //This will define the transition duration from one slide to another in seconds,
    "content": [// this array will have the content of your slider, more content array, more slider],
    advanceSetting: {
        sliderWidthPercent: //This will define the amount of with occupied by the slider of the parent element
    }
})

Once the instance has been created, you must initialize the slider with the remaining settings, which are as follows.

as we have made it clear that the "slider" variable is the slider instance, we will use it to initialize the slider

slider.init({
    "nav": //This will take the value in boolean and determine whether it will have navigation or not,
    "page": //This will take the value in boolean and determine whether it will have a pagination or not,
    "navSetting":{
        "Left": //If navigation is enabled you can put a custom element whether it would be an image or anything to represent the left arrow,
        "Right": //If navigation is enabled you can put a custom element whether it would be an image or anything to represent the right arrow,
    },
    "pageSetting":{
        "active": //You can assign a custom active element in pagination if pagination is active,
        "inactive: //You can assign a custom inactive element in pagination if pagination is active,
    },
})
