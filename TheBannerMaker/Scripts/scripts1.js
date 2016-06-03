var dailyMatches = [];
var dailyMatchesSelections = [];
var arrInplayJsonObjects = [];
var selections = [];
var arratOfFOOTPics = ["url(../images/soccer2_02.jpg)", "url(../images/stadiumFoot2_03.jpg)"];
var arratOfBASKPics = ["url(../images/basketball_02.jpg)", "url(../images/basketball2_02.jpg)"];
var arratOfVOLLPics = ["url(../images/volleyball_02.jpg)", "url(../images/volleyball2_02.jpg)"];
var arratOfTENNPics = ["url(../images/tennis_02.jpg)", "url(../images/tennis2_01.jpg)"];
var currGlobalIndex = 0;

function changeSportsForInplay(expression) {
    switch (expression) {
        case "Баскетбол":
            return "Basketball";
        case "Футбол":
            return "FOOTBALL";
        case "Тенис":
            return "Tennis";
        case "Волейбол":
            return "VOLLEY";
        default:
    }
}

function addInplayMarketsToJSON(matchesArray) {
    var marketArray = [];
    //new market choose
    $(matchesArray).each(function (index, element) {
        // element == this
        if (element.IsInplayNow) {
            getMarketsInplay(element);
            dailyMatches.shift();
        }
    });
    return matchesArray;
}

function getMarketsInplay(jsonElement) {
    var selectionArr = [];
    $.ajax({
        type: "GET",
        url: "https://www.efbet.com/cache/marketsByEvent/BG/" + jsonElement.MatchId + ".xml",
        dataType: "xml",
        success: xmlParser,
        complete: function (data) {
            // Schedule the next
            //setTimeout(ajaxCall, interval);
            console.log(arrInplayJsonObjects);
            dailyMatches = arrInplayJsonObjects.concat(dailyMatches);
            //changingSlidesAll();
        },
        error: function (data) {
            //changingSlidesAll();
        }
    });
    function xmlParser(xml) {
        $(xml).find("externaldescription:lt(3)")
            .each(function (index1) {
                var jsonObjectInplay = {
                    "Sport": jsonElement.Sport,
                    "MatchName": jsonElement.MatchName,
                    "MatchId": jsonElement.MatchId,
                    "Selections": [],
                    "MatchInplayId": "0",
                    "MatchTime": jsonElement.MatchTime,
                    "Market": null,
                    "Language": jsonElement.Language,
                    "IsInplayNow": true,
                    "IsInplay": false,
                    "IsSpecial": false
                };
                var marketName = $(this).text();
                var selection = $(this).parent().find('selection');
                var obj = jsonObjectInplay;
                obj.Market = marketName;
                selection.each(function (index) {
                    var selectionObj = { "SelectionName": "", "SelectionValue": "" };
                    selectionObj.SelectionName = $(this).find('name').text();
                    selectionObj.SelectionValue = ((1 + parseInt($(this).find('currentpriceup').text()) / parseInt($(this).find('currentpricedown').text())));
                    obj.Selections[index] = selectionObj;
                });
                arrInplayJsonObjects[index1] = obj;
            });
    }
}

function changeBackgroundPics(arrayOfPics, matchName, currentMatchName, currentIndex) {
    if (matchName == currentMatchName) {
        currGlobalIndex = currentIndex
        return arrayOfPics[currGlobalIndex];
    }
    else {
        currGlobalIndex = Math.abs(currentIndex - 1)
        return arrayOfPics[currGlobalIndex];
    }
}

function changingSlidesAll() {
    var counter = 0;
    var matchNameContainer = $(".match-name");
    var sportMarketContainer = $(".sport-market");
    var home = $(".selection1");
    var draw = $(".selection2");
    var away = $(".selection3");
    var oddHome = $(".odd1");
    var oddDraw = $(".odd2");
    var oddAway = $(".odd3");
    var drawTriangle = $(".selection-draw-triangle");
    var drawBox = $(".selection-draw-yellow-box");
    var allTextContainers = $(".text").children().children();
    var isStarting = false;
    var stopCanvas2Image = false;
    var logo = $(".logo");
    var efbet = $("#efbet");
    var promotionText = $("#promotionText");
    var changeFootballPic = false;
    var currentMatchName = "";
    logo.hide();
    $('#inplay').hide();
    function changeSlides() {
        $('.background').show();
        $('.text').hide();
        $('.text').fadeIn('slow');
        //$('.background').slideDown();

        $('.background2').hide();
        if (counter == 0 && isStarting) {
            $('.header-rectangle1').show();
            $('.header-triangle1').show();
            efbet.show();
            promotionText.show();
            drawTriangle.hide();
            drawBox.hide();
            $(".line2").css('background-image', 'url(../images/allSports_02.jpg)');
            logo.hide();
            $('.text').hide();
            isStarting = false;
        }
        else {
            if (dailyMatches[counter].Selections.length == 0) {
                counter++;
                if (dailyMatches[counter].Selections == 0) {
                    counter++;
                }
            }
            if (dailyMatches[counter].Selections.length == 2 || dailyMatches[counter].Selections.length == 4) {
                $('#inplay').hide();
                if (dailyMatches[counter].IsInplayNow) {
                    $('#inplay').show();
                }
                $('.header-rectangle1').hide();
                $('.header-triangle1').hide();
                $('.text').show();
                draw.hide();
                oddDraw.hide();
                drawBox.hide();
                drawTriangle.hide();
                matchNameContainer.text(dailyMatches[counter].MatchName);
                sportMarketContainer.text(dailyMatches[counter].Market);
                home.text(dailyMatches[counter].Selections[0].SelectionName);
                away.text(dailyMatches[counter].Selections[1].SelectionName);
                oddHome.text(dailyMatches[counter].Selections[0].SelectionValue.toFixed(2));
                oddAway.text(dailyMatches[counter].Selections[1].SelectionValue.toFixed(2));
                logo.show();
                efbet.hide();
                promotionText.hide();
                matchNameContainer.text(matchNameContainer.text().toUpperCase());
            }
            else if (dailyMatches[counter].Selections.length == 3) {
                //Check if the match is inplay
                $('#inplay').hide();
                if (dailyMatches[counter].IsInplayNow) {
                    $('#inplay').show();
                }
                $('.header-rectangle1').hide();
                $('.header-triangle1').hide();
                $('.text').show();
                draw.show();
                oddDraw.show();
                drawBox.show();
                drawTriangle.show();
                matchNameContainer.text(dailyMatches[counter].MatchName);
                sportMarketContainer.text(dailyMatches[counter].Market);
                home.text(dailyMatches[counter].Selections[0].SelectionName);
                draw.text(dailyMatches[counter].Selections[1].SelectionName);
                away.text(dailyMatches[counter].Selections[2].SelectionName);
                oddHome.text(dailyMatches[counter].Selections[0].SelectionValue.toFixed(2));
                oddDraw.text(dailyMatches[counter].Selections[1].SelectionValue.toFixed(2));
                oddAway.text(dailyMatches[counter].Selections[2].SelectionValue.toFixed(2));
                logo.show();
                efbet.hide();
                promotionText.hide();
                matchNameContainer.text(matchNameContainer.text().toUpperCase());
            }
            else {
                //var data = dailyMatches[counter];
                //data.Selections = data.Selections.splice(10, data.Selections.length - 1);
                //$('#bootstrap-template')
                //    .tmpl(data).appendTo('.marketContent');
                //$.get('../htmlBanners/GridView.html', function (template) {
                //    $.tmpl(template, data).appendTo('.background2');
                //});
                $('.background').hide();
                $('.background2').show();
                //$('.background2').load("GridView.html");
            }
            if (dailyMatches[counter].Sport == "Футбол") {
                $(".line2").css('background-image', changeBackgroundPics(arratOfFOOTPics, dailyMatches[counter].MatchName, currentMatchName, currGlobalIndex));
                currentMatchName = dailyMatches[counter].MatchName;
            }
            else if (dailyMatches[counter].Sport == "Волейбол") {
                $(".line2").css('background-image', changeBackgroundPics(arratOfVOLLPics, dailyMatches[counter].MatchName, currentMatchName, currGlobalIndex));
                currentMatchName = dailyMatches[counter].MatchName;
            }
            else if (dailyMatches[counter].Sport == "Баскетбол") {
                $(".line2").css('background-image', changeBackgroundPics(arratOfBASKPics, dailyMatches[counter].MatchName, currentMatchName, currGlobalIndex));
                currentMatchName = dailyMatches[counter].MatchName;
            }
            else if (dailyMatches[counter].Sport == "Тенис") {
                $(".line2").css('background-image', changeBackgroundPics(arratOfTENNPics, dailyMatches[counter].MatchName, currentMatchName, currGlobalIndex));
                currentMatchName = dailyMatches[counter].MatchName;
            }
            counter++;
            if (counter >= dailyMatches.length) { counter = 0; isStarting = true; }
        }
        
    };
    $('.background').each(function () {
        $(this).click(function (e) {
            if (!dailyMatches[counter-1].IsInplayNow) {
                window.open("https://www.efbet.com/" + dailyMatches[counter - 1].Language + "/541/sports#action=market-group-list&event=" + dailyMatches[counter-1].MatchId);
            }
            else {
                window.open("https://www.efbet.com/" + dailyMatches[counter - 1].Language + "/541/inplay#idfoevent=" + dailyMatches[counter-1].MatchId + "&idfosporttype=" + changeSportsForInplay(dailyMatches[counter-1].Sport));
            }
        })
    });
    setInterval(changeSlides, 3400);
}

//Get JSON file Bulgarian
function ajaxCall2() {
    $.getJSON("../Json/testBG.json", function (json) {
        dailyMatches = json;
        addInplayMarketsToJSON(dailyMatches);
    });
    changingSlidesAll();
};

function ajaxCall2UK() {
    $.getJSON("../Json/testUK.json", function (json) {
        addInplayMarketsToJSON(json);
        dailyMatches = addInplayMarketsToJSON(json);
    });
    changingSlidesAll();
};

function ajaxCall2TR() {
    $.getJSON("../Json/testTR.json", function (json) {
        addInplayMarketsToJSON(json);
        dailyMatches = addInplayMarketsToJSON(json);
    });
    changingSlidesAll();
};

function ajaxCall2SQ() {
    $.getJSON("../Json/testSQ.json", function (json) {
        addInplayMarketsToJSON(json);
        dailyMatches = addInplayMarketsToJSON(json);
    });
    changingSlidesAll();
};
