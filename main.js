/* variables */
var appsByGender;
var appColors = {
    facebook: {
        "users": "#748DC3",
        "daily users": "#2A52A7"
    },
    instagram: {
        "users": "#F075EC",
        "daily users": "#B900B4"
    },
    linkedin: {
        "users": "#E2B88D",
        "daily users": "#E68523"
    },
    snapchat: {
        "users": "#666666",
        "daily users": "#333333"
    },
    twitter: {
        "users": "#8BC5EA",
        "daily users": "#1DA1F2"
    },
}

var heightSmall = 220;
var heightBig = 500;
var colorUser = "#748DC3";
var colorDailyUser = "#2A52A7";
var colorHours = "#2A52A7";

/* Tabs */
var tabs = document.getElementsByClassName("tab");
for (i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', tabClick);
}

function tabClick(e) {
    var child = e.target;
    updateTabsUI(child);
}

function updateTabsUI(child) {
    var parent = child.parentNode;
    var grandparent = parent.parentNode.parentNode;

    var index = Array.prototype.indexOf.call(parent.children, child);
    //change style of tabs
    for (i = 0; i < parent.children.length; i++) {
        parent.children[i].setAttribute("class", "tab");
    }
    child.setAttribute("class", "tab selected-tab");

    //change tab content
    var tabContents = grandparent.getElementsByClassName('tab-content');
    for (i = 0; i < tabContents.length; i++) {
        tabContents[i].setAttribute("style", "");
    }
    tabContents[index].setAttribute("style", "display: block");

    //console.log(tabContents[index].innerHTML);
}

/* App Tabs */ {
    var appTabs = document.getElementsByClassName("app-tab");
    for (i = 0; i < appTabs.length; i++) {
        appTabs[i].addEventListener('click', appTabClick);
    }

    function appTabClick(e) {
        console.log("app tab click");
        var child = e.target;
        updateAppTabsUI(child);
    }

    function updateAppTabsUI(child) {
        var parent = child.parentNode;
        var grandparent = parent.parentNode.parentNode;

        var index = Array.prototype.indexOf.call(parent.children, child);
        //change style of tabs
        for (i = 0; i < parent.children.length; i++) {
            parent.children[i].setAttribute("class", "tab");
        }
        child.setAttribute("class", "tab selected-tab");

        //change tab content
        var tabContents = grandparent.getElementsByClassName('app-tab-content');
        for (i = 0; i < tabContents.length; i++) {
            tabContents[i].setAttribute("style", "");
        }
        tabContents[index].setAttribute("style", "display: block");
        //console.log(tabContents[index].innerHTML);
    }
}

/* Iphone */
var selectedApp = document.getElementById("selected-app");
var top5 = ["facebook", "instagram", "linkedin", "snapchat", "twitter"];
var selectedApps = [false, false, false, false, false];
var regularClass = "app-button";
var availableClass = regularClass + " app-button-available";
var selectedClass = regularClass + " app-button-selected";
var disabledClass = regularClass + " app-button-disabled";

var appListItems = document.getElementsByClassName("app-list-item");
for (i = 0; i < appListItems.length; i++) {
    appListItems[i].addEventListener('click', appClick);
}

function appClick(e) {
    //get index
    var child = e.target;
    while (child.getAttribute("class") != "app-list-item") {
        child = child.parentNode;
    }
    var parent = child.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child);
    var app = top5[index];

    //flip selection for index
    selectedApps[index] = !selectedApps[index];
    var numberOfSelectedApps = 0;
    for (j = 0; j < selectedApps.length; j++) {
        if (selectedApps[j]) {
            numberOfSelectedApps++;
        }
    }

    if (numberOfSelectedApps > 2) {
        selectedApps[index] = !selectedApps[index];
    } else { //continue

        //update all app buttton style
        for (i = 0; i < parent.children.length; i++) {
            var selected = selectedApps[i];
            parent.children[i].setAttribute("style", (selected) ? "background: #F2F2F2;" : "");
        }
        //get buttons 
        var buttons = document.getElementsByClassName(regularClass);

        //update all app buttton style
        for (i = 0; i < parent.children.length; i++) {
            var selected = selectedApps[i];
            buttons[i].setAttribute("class", (selected) ? selectedClass : (numberOfSelectedApps < 2) ? availableClass : disabledClass);
            buttons[i].innerHTML = (selected) ? "Hide" : "Show";
        }
        //child.setAttribute("style", "background: #DEDEDE;");
        // The equivalent of parent.children.indexOf(child)
        var appNames = "";
        var c = [];
        var counter = 0;
        var value = [];
        for (i = 0; i < selectedApps.length; i++) {
            if (selectedApps[i]) {
                var app = top5[i];
                counter++;
                appNames = appNames + ((counter < 2) ? app : " vs " + app);
                value.push(app + '.users');
                value.push(app + '.daily users');
                var users = "users";
                var daily = "daily users";
                c[app + '.users'] = appColors[app]["users"];
                c[app + '.daily users'] = appColors[app]["daily users"];
            }
        }
        console.log(c);
        //selectedApp.innerHTML = appNames;

        //Load the right content
        //generate over time
        //c3.generate(getChartData('what-apps-over-time', 'line', 'year', [app + '.users', app + '.daily users'], 100, 0, 'number'));
        c3.generate(getChartData('what-apps-over-time', 'line', 'year', value, 100, 0, 'number', c, heightBig, false));
        //generate by age
        //c3.generate(getChartData('what-apps-by-age', 'bar', 'age', [app + '.users', app + '.daily users'], 100, 0, 'category'));
        c3.generate(getChartData('what-apps-by-age', 'bar', 'age', value, 100, 0, 'category', c, heightBig, true));
        //generate by gender
        //appsByGender = c3.generate(getChartData('what-apps-by-gender', 'bar', 'gender', [app + '.users', app + '.daily users'], 100, 0, 'category'));
        appsByGender = c3.generate(getChartData('what-apps-by-gender', 'bar', 'gender', value, 100, 0, 'category', c, heightBig, false));
    }
}

/* Charts */
function getChartData(id, chartType, xKey, yValues, yMax, yMin, xType, c, height, zoom) {
    return {
        bindto: '#' + id,
        size: {
            "height": height,
            "width": 680
        },
        zoom: {
            enabled: zoom
        },
        data: {
            url: 'data/' + id + '.json',
            mimeType: 'json',
            type: chartType,
            labels: true,
            empty: {
                label: {
                    text: "Select app(s) on phone."
                }
            },
            keys: {
                x: xKey, // it's possible to specify 'x' when category axis
                value: yValues
                //value: ['12-15', '16-25', '26-35', '36-45', '46-55', '56-65', '66-75', '76+'],
            },
            colors: c
        },
        axis: {
            y: {
                max: yMax,
                min: yMin,
                padding: { top: 0, bottom: 0 }
            },
            x: {
                type: xType,
                padding: {
                    left: 0.15,
                    right: 0.15,
                }
            }
        },
        legend: {
            hide: false,
            position: 'right'
        },
        point: {
            r: 5
        }
    }
}

/* Init */


//how many?
c3.generate(getChartData('how-many-over-time', 'line', 'year', ['user', 'daily'], 100, 0, 'number', { 'user': colorUser, 'daily': colorDailyUser }, heightSmall, false));
c3.generate(getChartData('how-many-by-age', 'bar', 'age', ['user', 'daily'], 100, 0, 'category', { 'user': colorUser, 'daily': colorDailyUser }, heightSmall, false));
c3.generate(getChartData('how-many-by-gender', 'bar', 'gender', ['user', 'daily'], 100, 0, 'category', { 'user': colorUser, 'daily': colorDailyUser }, heightSmall, false));
//how long?
c3.generate(getChartData('for-how-long-over-time', 'line', 'year', ["hours"], 10, 0, 'number', { 'hours': colorHours }, heightSmall, false));
c3.generate(getChartData('for-how-long-by-age', 'bar', 'age', ["hours"], 15, 0, 'category', { 'hours': colorHours }, heightSmall, false));
c3.generate(getChartData('for-how-long-by-gender', 'bar', 'gender', ['hours'], 10, 0, 'category', { 'hours': colorHours }, heightSmall, false));

//what apps?
c3.generate(getChartData('what-apps-over-time', 'line', 'year', [], 100, 0, 'number', {}, heightBig, false));
c3.generate(getChartData('what-apps-by-age', 'bar', 'age', [], 100, 0, 'category', {}, heightBig, true));
c3.generate(getChartData('what-apps-by-gender', 'bar', 'gender', [], 100, 0, 'category', {}, heightBig, false));

//select tabs
var usersOverTime = document.getElementsByClassName("tab")[0];
var hoursOverTime = document.getElementsByClassName("tab")[3];
var appsOverTime = document.getElementsByClassName("app-tab")[0];
updateTabsUI(usersOverTime);
updateTabsUI(hoursOverTime);
updateAppTabsUI(appsOverTime);
//updateTabsUI(thirdTabs);

//set buttons available
var appButtons = document.getElementsByClassName(regularClass);
for (i = 0; i < appButtons.length; i++) {
    var button = appButtons[i];
    button.setAttribute("class", availableClass);
    button.innerHTML = "Show";
}
