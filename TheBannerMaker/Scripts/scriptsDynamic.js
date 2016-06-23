var dailyMatches = [];
var dailyMatchesSelections = [];
var arrInplayJsonObjects = [];
var selections = [];
var currGlobalIndex = 0;

function changeLongName(name) {
    if (name == "Северна Ирландия") {
        return "С. Ирландия"
    }
    else {
        return name;
    }
}

function changingSlidesAll() {
    var counter = 0;
   
    var home = $(".selection1");
    var draw = $(".selection2");
    var away = $(".selection3");
    var oddHome = $(".odd1");
    var oddDraw = $(".odd2");
    var oddAway = $(".odd3");
    var marketName = $(".marketName");
    var homeTeam = $('.homeTeam');
    var awayTeam = $('.awayTeam');
    var cupLogo = $('.cupLogo');

    function changeSlides() {
       
        if (dailyMatches[counter].IsInplay) {
            cupLogo.attr('src', '..//images//dynamicLogo.png');
        }
        else {
            cupLogo.attr('src', '..//images//home-marquee-logo-_x200_02.png');
        }
            if (dailyMatches[counter].Selections.length == 0) {
                counter++;
                if (dailyMatches[counter].Selections == 0) {
                    counter++;
                }
            }
            if (dailyMatches[counter].Selections.length == 2 || dailyMatches[counter].Selections.length == 4) {
                draw.hide();
                oddDraw.hide();
               
                marketName.text(dailyMatches[counter].Market);
                //matchNameContainer.text(dailyMatches[counter].MatchName);
                //sportMarketContainer.text(dailyMatches[counter].Market);
                home.text(changeLongName(dailyMatches[counter].Selections[0].SelectionName));
                away.text(changeLongName(dailyMatches[counter].Selections[1].SelectionName));
                oddHome.text(dailyMatches[counter].Selections[0].SelectionValue.toFixed(2));
                oddAway.text(dailyMatches[counter].Selections[1].SelectionValue.toFixed(2));
                
               
            }
            else if (dailyMatches[counter].Selections.length == 3) {

                if (dailyMatches[counter].Market == 'Краен изход') {
                    homeTeam.text(changeLongName(dailyMatches[counter].Selections[0].SelectionName));
                    awayTeam.text(changeLongName(dailyMatches[counter].Selections[2].SelectionName));
                } 
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
                marketName.text(dailyMatches[counter].Market);
                //matchNameContainer.text(dailyMatches[counter].MatchName);
                //sportMarketContainer.text(dailyMatches[counter].Market);
                home.text(changeLongName(dailyMatches[counter].Selections[0].SelectionName));
                draw.text(dailyMatches[counter].Selections[1].SelectionName);
                away.text(changeLongName(dailyMatches[counter].Selections[2].SelectionName));
                oddHome.text(dailyMatches[counter].Selections[0].SelectionValue.toFixed(2));
                oddDraw.text(dailyMatches[counter].Selections[1].SelectionValue.toFixed(2));
                oddAway.text(dailyMatches[counter].Selections[2].SelectionValue.toFixed(2));
            }
            counter++;
            if (counter >= dailyMatches.length) { counter = 0; isStarting = true; }
        
        //asdfasdf
    };
    //$('.background').each(function () {
    //    $(this).click(function (e) {
    //        if (!dailyMatches[counter-1].IsInplayNow) {
    //            window.open("https://www.efbet.com/" + dailyMatches[counter - 1].Language + "/541/sports#action=market-group-list&event=" + dailyMatches[counter-1].MatchId);
    //        }
    //        else {
    //            window.open("https://www.efbet.com/" + dailyMatches[counter - 1].Language + "/541/inplay#idfoevent=" + dailyMatches[counter-1].MatchId + "&idfosporttype=" + changeSportsForInplay(dailyMatches[counter-1].Sport));
    //        }
    //    })
    //});
    setInterval(changeSlides, 3400);
}

//Get JSON file Bulgarian
function ajaxCall2() {
    $.getJSON("../Json/testBG.json", function (json) {
        dailyMatches = json;
        
    });
    changingSlidesAll();
};
