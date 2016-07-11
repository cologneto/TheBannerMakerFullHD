﻿var dailyMatches = [];
var dailyMatchesSelections = [];
var selections = [];
var arratOfFOOTPics = ["url(../images/FootballFullHDBackground1.jpg)", "url(../images/FootballFullHDBackground2.jpg)"];
var arratOfBASKPics = ["url(../images/BasketballFullHDBackground1.jpg)", "url(../images/BasketballFullHDBackground2.jpg)"];
var arratOfVOLLPics = ["url(../images/VolleyballFullHDBackground1.jpg)", "url(../images/VolleyballFullHDBackground2.jpg)"];
var arratOfTENNPics = ["url(../images/TennisFullHDBackground2.jpg)", "url(../images/TennisFullHDBackground3.jpg)"];
var arratOfOLYMPPics = ["url(../images/OlympicFullHDBackground2.jpg)", "url(../images/OlympicFullHDBackground`.jpg)"];
var currGlobalIndex = 0;

function changeBackgroundPics(arrayOfPics, matchName, currentMatchName, currentIndex) {
    if (matchName == currentMatchName) {
        currGlobalIndex = currentIndex;
        return arrayOfPics[currGlobalIndex];
    }
    else {
        currGlobalIndex = Math.abs(currentIndex - 1);
        return arrayOfPics[currGlobalIndex];
    }
}

function changingSlidesAll() {

    var counter = 0;
    var main = $('#main-container');
    var matchNameContainer = $("#matchName");
    var marketName = $('#marketName');
    var sportMarketContainer = $(".marketText > span");
    var background = $('#background');
    var regularMarket = $('.regularMarket');
    var moreSelectionsMarket = $('.moreSelectionsMarket');
    var isStarting = false;
    var currentMatchName = "";


    function changeSlides() {
        main.css('cursor', 'pointer');
        main.hide();
        matchNameContainer.text(dailyMatches[counter].MatchName)
        sportMarketContainer.text(dailyMatches[counter].Market)
        var language = dailyMatches[counter].Language;

        //==========================
        //show starting background
        //==========================
        if (counter == 0 && isStarting) {
            isStarting = false;

            if (language == "BG") {
                background.css('background-image', 'url(../images/FullHDBackgroundsTopOdds.jpg)');
            }
            if (language == "UK") {
                background.css('background-image', 'url(../images/topOddsUK.jpg)');
            }
            if (language == "TR") {
                background.css('background-image', 'url(../images/topOddsTR.jpg)');
            }
            if (language == "SQ") {
                background.css('background-image', 'url(../images/topOddsSQ.jpg)');
            }

            main.hide();
            $('#efbet').hide();
        }
        else {
            if (dailyMatches[counter].Selections.length == 0) {
                counter++;
                if (dailyMatches[counter].Selections == 0) {
                    counter++;
                }
            }
            $('#efbet').show();
            main.fadeIn(1000);
            //===================
            // Two markets
            //===================
            if (dailyMatches[counter].Selections.length == 2 || dailyMatches[counter].Market == "Брой Голове 2,5") {
                moreSelectionsMarket.hide();
                marketName.show();
                regularMarket
                    .children('.selectionsAndOdds')
                    .eq(0).find('.selection1').text(dailyMatches[counter].Selections[0].SelectionName);
                regularMarket
                   .children('.selectionsAndOdds')
                   .eq(0).find('.selection3').text(dailyMatches[counter].Selections[1].SelectionName);
                regularMarket
                   .children('.selectionsAndOdds')
                   .eq(0).find('.odd1').text(dailyMatches[counter].Selections[0].SelectionValue.toFixed(2));
                regularMarket
                   .children('.selectionsAndOdds')
                   .eq(0).find('.odd3').text(dailyMatches[counter].Selections[1].SelectionValue.toFixed(2));
                regularMarket.children('.selectionsAndOdds').eq(1).hide();
                marketName.attr('class', 'paddingTop60');
                regularMarket.show();
                //home.text(dailyMatches[counter].Selections[0].SelectionName);
                //away.text(dailyMatches[counter].Selections[1].SelectionName);
                //oddHome.text(dailyMatches[counter].Selections[0].SelectionValue.toFixed(2));
                //oddAway.text(dailyMatches[counter].Selections[1].SelectionValue.toFixed(2));
                //logo.show();
                //efbet.hide();
                //promotionText.hide();
                //matchNameContainer.text(matchNameContainer.text().toUpperCase());
            }
                //==================
                //three markets
                //==================
            else if (dailyMatches[counter].Selections.length == 3 || dailyMatches[counter].Selections.length == 4) {

                moreSelectionsMarket.hide();
                regularMarket.children('.selectionsAndOdds').eq(1).show();
                marketName.attr('class', 'paddingTop40');
                marketName.show();
                regularMarket.show();


                regularMarket
                    .children('.selectionsAndOdds')
                    .eq(0).find('.selection1').text(dailyMatches[counter].Selections[0].SelectionName);
                regularMarket
                   .children('.selectionsAndOdds')
                   .eq(0).find('.selection3').text(dailyMatches[counter].Selections[1].SelectionName);
                regularMarket
                   .children('.selectionsAndOdds')
                   .eq(0).find('.odd1').text(dailyMatches[counter].Selections[0].SelectionValue.toFixed(2));
                regularMarket
                   .children('.selectionsAndOdds')
                   .eq(0).find('.odd3').text(dailyMatches[counter].Selections[1].SelectionValue.toFixed(2));

                regularMarket
                    .children('.selectionsAndOdds')
                    .eq(1).find('.selection1').text(dailyMatches[counter].Selections[2].SelectionName);

                regularMarket
                   .children('.selectionsAndOdds')
                   .eq(1).find('.odd1').text(dailyMatches[counter].Selections[2].SelectionValue.toFixed(2));
                if (dailyMatches[counter].Selections.length == 4) {
                    regularMarket
                  .children('.selectionsAndOdds')
                  .eq(1).find('.selection3').text(dailyMatches[counter].Selections[3].SelectionName);
                    regularMarket
                       .children('.selectionsAndOdds')
                       .eq(1).find('.odd3').text(dailyMatches[counter].Selections[3].SelectionValue.toFixed(2));
                }

                else {
                    regularMarket
                  .children('.selectionsAndOdds')
                  .eq(1).find('.selection3').text('');
                    regularMarket
                       .children('.selectionsAndOdds')
                       .eq(1).find('.odd3').text('');
                }

            }
            else {
                var data = dailyMatches[counter];
                //data.Selections = data.Selections.splice(10, data.Selections.length - 1);
                regularMarket.hide();
                marketName.attr('class', 'noPadding');
                var selectionCounter = 0;
                for (var i = 0; i < 10; i++) {
                    moreSelectionsMarket.children('.selectionsAndOdds2').eq(selectionCounter).find('.selection1').text(data.Selections[i].SelectionName);
                    moreSelectionsMarket.children('.selectionsAndOdds2').eq(selectionCounter).find('.odd1').text(data.Selections[i].SelectionValue.toFixed(2));
                    i++;
                    moreSelectionsMarket.children('.selectionsAndOdds2').eq(selectionCounter).find('.selection3').text(data.Selections[i].SelectionName);
                    moreSelectionsMarket.children('.selectionsAndOdds2').eq(selectionCounter).find('.odd3').text(data.Selections[i].SelectionValue.toFixed(2));
                    selectionCounter++;
                }
                marketName.hide();
                moreSelectionsMarket.show();
                //$('#bootstrap-template')
                //    .tmpl(data).appendTo('.marketContent');
                //$.get('../htmlBanners/GridView.html', function (template) {
                //    $.tmpl(template, data).appendTo('.background2');
                //});
                //$('.background').hide();
                //$('.background2').show();
                //$('.background2').load("GridView.html");
            }
            if (dailyMatches[counter].Sport == "Футбол") {
              
                background.css('background-image', changeBackgroundPics(arratOfFOOTPics, dailyMatches[counter].MatchName, currentMatchName, currGlobalIndex));
                background.fadeIn('slow');
                currentMatchName = dailyMatches[counter].MatchName;
            }
            else if (dailyMatches[counter].Sport == "Волейбол") {
               
                background.css('background-image', changeBackgroundPics(arratOfVOLLPics, dailyMatches[counter].MatchName, currentMatchName, currGlobalIndex));
                background.fadeIn('slow');
                currentMatchName = dailyMatches[counter].MatchName;
            }
            else if (dailyMatches[counter].Sport == "Баскетбол") {
               
                background.css('background-image', changeBackgroundPics(arratOfBASKPics, dailyMatches[counter].MatchName, currentMatchName, currGlobalIndex));
                background.fadeIn('slow');
                currentMatchName = dailyMatches[counter].MatchName;
            }
            else if (dailyMatches[counter].Sport == "Тенис") {
              
                background.css('background-image', changeBackgroundPics(arratOfTENNPics, dailyMatches[counter].MatchName, currentMatchName, currGlobalIndex));
                background.fadeIn('slow');
                currentMatchName = dailyMatches[counter].MatchName;
            }
            else if (dailyMatches[counter].Sport == "Олимпийски игри") {
                
                background.css('background-image', changeBackgroundPics(arratOfOLYMPPics, dailyMatches[counter].MatchName, currentMatchName, currGlobalIndex));
                background.fadeIn('slow');
                currentMatchName = dailyMatches[counter].MatchName;
            }
            counter++;
            if (counter >= dailyMatches.length) { counter = 0; isStarting = true; }
        }
        
        
    };
   
    setInterval(changeSlides, 3400);
}

//Get JSON file Bulgarian
function ajaxCall2() {
    $.getJSON("../Json/testBG.json", function (json) {
        dailyMatches = json;
        //addInplayMarketsToJSON(dailyMatches);
    });
    changingSlidesAll();
};

function ajaxCall2UK() {
    $.getJSON("../Json/testUK.json", function (json) {
        dailyMatches = json;
    });
    changingSlidesAll();
};

function ajaxCall2TR() {
    $.getJSON("../Json/testTR.json", function (json) {

        dailyMatches = json;
    });
    changingSlidesAll();
};

function ajaxCall2SQ() {
    $.getJSON("../Json/testSQ.json", function (json) {

        dailyMatches = json;
    });
    changingSlidesAll();
};