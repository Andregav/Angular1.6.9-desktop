import { Data } from './../data/data.js';
import { City } from './../data/city.js';
import { Category } from './../data/category.js';

var images = [
    { image: "images/card-img1.png" },
    { image: "images/card-img2.png" },
    { image: "images/card-img3.png" },
    { image: "images/card-img2.png" },
    { image: "images/card-img3.png" },
];

Data.sort(function(a, b) {
    return a.city - b.city;
});

for (let key in Data) {
    for (let key1 in City) {
        Data[key].city = City[key].name;
    }
}
Data.sort(function(a, b) {
    return a.category - b.category;
});

for (let key in Data) {
    for (let key2 in Category) {
        switch (Data[key].category) {
            case 1:
                Data[key].category = Category[0].name;
                break;
            case 2:
                Data[key].category = Category[1].name;
                break;
            case 4:
                Data[key].category = Category[key].name;
                break;
            case 5:
                Data[key].category = Category[key].name;
                break;
        }
    }
}

let dataPrice = Data.slice()

dataPrice.sort(function(a, b) { return a.price - b.price });
let minPrice = dataPrice[0].price;

dataPrice.sort(function(a, b) { return b.price - a.price });
let maxPrice = dataPrice[0].price;

let on = { on: false };

for (let key in Data) {
    Object.assign(Data[key], on, images[key]);
}

var dataApp = angular.module('dataApp', []);

dataApp.filter('unique', function() {
    return function(collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;



    };
});


dataApp.filter('categoryFilter', function() {
    return function(input, categories) {
        if (!categories || categories.length === 0) return input;
        var out = [];
        angular.forEach(input, function(item) {
            angular.forEach(categories, function(categ) {
                if (item.category === categ.category) {
                    out.push(item);
                }
            });
        });
        return out;
    }
});

dataApp.filter('rangeFilter', function() {
    return function(items, attr, min, max) {
        var range = [],
            min = parseFloat(min),
            max = parseFloat(max);
        for (var i = 0, l = items.length; i < l; ++i) {
            var item = items[i];
            if (item[attr] <= max && item[attr] >= min) {
                range.push(item);
            }
        }
        return range;
    };
});



dataApp.controller('dataCtrl', function($scope, $http) {
    $scope.data = Data;
    $scope.minPrice = minPrice;
    $scope.maxPrice = maxPrice;

    $scope.ui = {
        min: $scope.minPrice,
        max: $scope.maxPrice,
        sort: 'name'
    };
});



// ---range-slider---

function getVals() {
    // Get slider values
    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat(slides[0].value);
    var slide2 = parseFloat(slides[1].value);
    // Neither slider will clip the other, so make sure we determine which is larger
    if (slide1 > slide2) {
        var tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }

    var displayElement = parent.getElementsByClassName("rangeslider__value")[0];
    displayElement.innerHTML = "$" + slide1 + " <span>-</span> " + "$" + slide2;
}

window.onload = function() {
    // Initialize Sliders
    var sliderSections = document.getElementsByClassName("aside__rangeslider");
    for (var x = 0; x < sliderSections.length; x++) {
        var sliders = sliderSections[x].getElementsByTagName("input");
        for (var y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals;
                // Manually trigger event first time to display values
                sliders[y].oninput();
            }
        }
    }
}
// ---end range-slider---