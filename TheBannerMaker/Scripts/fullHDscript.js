
var dailyMatches = [];
var homeFlag = $('.homeFlag img');
var awayFlag = $('.awayFlag img');
var homeLogo = $('.homeTeamLogo img');
var awayLogo = $('.awayTeamLogo img');
var cupLogo = $('.euroLogo');
var threeWay = $('.oneMarket');
var twoWay = $('.doubleMarkets');
var twelveWay = $('.goalscorer');
var fourWay = $('.tripleMarkets');
var counterDailyMatches = 0;
var counterSlides = 0;
var slideShow = $('.slideshow');
var currTwelveCounter = 0;

function startUK() {


    $.getJSON("../Json/testUK.json", function (json) {

        var currentMatchId = "";

        for (var dmi = 0; dmi < json.length; dmi++) {

            if (currentMatchId === json[dmi].MatchId) {
                continue;
            }
            else {

                dailyMatches.push($.grep(json, function (n, i) {
                    return (n.MatchId === json[dmi].MatchId);
                }));
                currentMatchId = json[dmi].MatchId;
            }

        }

    }).done(function () {
        changeSlides(0);
    });

}
function start() {


    $.getJSON("../Json/testBG.json", function (json) {

        var currentMatchId = "";

        for (var dmi = 0; dmi < json.length; dmi++) {

            if (currentMatchId === json[dmi].MatchId) {
                continue;
            }
            else {

                dailyMatches.push($.grep(json, function (n, i) {
                    return (n.MatchId === json[dmi].MatchId);
                }));
                currentMatchId = json[dmi].MatchId;
            }

        }

    }).done(function () {
        changeSlides(0);
    });

}

function fillMatchOdds(arrayOfMatchOdds) {

    //change flags and logos
    var homeTeam = arrayOfMatchOdds[0].Selections[0].SelectionName;
    var draw = arrayOfMatchOdds[0].Selections[1].SelectionName;
    var awayTeam = arrayOfMatchOdds[0].Selections[2].SelectionName;
    
    if (arrayOfMatchOdds[0].Language == "UK") {
        $('body').find(".selectionsAndOdds").find('img').css('margin-right', '-20px');

        if (arrayOfMatchOdds[0].IsInplay) {
            cupLogo.find('img').attr("src", "..\\FlagsEurope\\logo.png");
            homeFlag.attr("src", "..\\FlagsEurope\\" + switchTeamLogosAndFlagsUK(homeTeam) + "-flag-medium.png");
            awayFlag.attr("src", "..\\FlagsEurope\\" + switchTeamLogosAndFlagsUK(awayTeam) + "-flag-medium.png");
            homeLogo.attr("src", "..\\FlagsEurope\\" + switchTeamLogosAndFlagsUK(homeTeam) + ".png");
            awayLogo.attr("src", "..\\FlagsEurope\\" + switchTeamLogosAndFlagsUK(awayTeam) + ".png");
        }
        else {
            cupLogo.find('img').attr("src", "..\\FlagsAmerica\\home-marquee-logo-_x200.png");
            homeFlag.attr("src", "..\\FlagsAmerica\\" + switchTeamLogosAndFlagsUK(homeTeam) + "-flag-medium.png");
            awayFlag.attr("src", "..\\FlagsAmerica\\" + switchTeamLogosAndFlagsUK(awayTeam) + "-flag-medium.png");
            homeLogo.attr("src", "..\\FlagsAmerica\\" + switchTeamLogosAndFlagsUK(homeTeam) + ".png");
            awayLogo.attr("src", "..\\FlagsAmerica\\" + switchTeamLogosAndFlagsUK(awayTeam) + ".png");
        }
    }
    else {
        if (arrayOfMatchOdds[0].IsInplay) {
            cupLogo.find('img').attr("src", "..\\FlagsEurope\\logo.png");
            homeFlag.attr("src", "..\\FlagsEurope\\" + switchTeamLogosAndFlags(homeTeam) + "-flag-medium.png");
            awayFlag.attr("src", "..\\FlagsEurope\\" + switchTeamLogosAndFlags(awayTeam) + "-flag-medium.png");
            homeLogo.attr("src", "..\\FlagsEurope\\" + switchTeamLogosAndFlags(homeTeam) + ".png");
            awayLogo.attr("src", "..\\FlagsEurope\\" + switchTeamLogosAndFlags(awayTeam) + ".png");
        }
        else {
            cupLogo.find('img').attr("src", "..\\FlagsAmerica\\home-marquee-logo-_x200.png");
            homeFlag.attr("src", "..\\FlagsAmerica\\" + switchTeamLogosAndFlags(homeTeam) + "-flag-medium.png");
            awayFlag.attr("src", "..\\FlagsAmerica\\" + switchTeamLogosAndFlags(awayTeam) + "-flag-medium.png");
            homeLogo.attr("src", "..\\FlagsAmerica\\" + switchTeamLogosAndFlags(homeTeam) + ".png");
            awayLogo.attr("src", "..\\FlagsAmerica\\" + switchTeamLogosAndFlags(awayTeam) + ".png");
        }
    }

    //3-way single market
    threeWay.find('.selection1').text(arrayOfMatchOdds[0].Selections[0].SelectionName);
    threeWay.find('.selection2').text(arrayOfMatchOdds[0].Selections[1].SelectionName);
    threeWay.find('.selection3').text(arrayOfMatchOdds[0].Selections[2].SelectionName);
    threeWay.find('.odd1').text(arrayOfMatchOdds[0].Selections[0].SelectionValue.toFixed(2));
    threeWay.find('.odd2').text(arrayOfMatchOdds[0].Selections[1].SelectionValue.toFixed(2));
    threeWay.find('.odd3').text(arrayOfMatchOdds[0].Selections[2].SelectionValue.toFixed(2));

    //2 - way four- markets

    twoWay.find('.row').each(function (i) {
        //.css('font-size', '50px')
        $(this).find('.marketText span').text(arrayOfMatchOdds[i + 1].Market);
        $(this).find('.selectionsAndOdds .selection1').text(arrayOfMatchOdds[i + 1].Selections[0].SelectionName)
            .css({
                'font-size': '70px',
                'padding-top': '15px'
            });
        $(this).find('.selectionsAndOdds .selection3').text(arrayOfMatchOdds[i + 1].Selections[1].SelectionName)
            .css({
                'font-size': '70px',
                'padding-top': '15px'
            });
        $(this).find('.selectionsAndOdds .odd1').text(arrayOfMatchOdds[i + 1].Selections[0].SelectionValue.toFixed(2));
        $(this).find('.selectionsAndOdds .odd3').text(arrayOfMatchOdds[i + 1].Selections[1].SelectionValue.toFixed(2));
    });

    //12 way markets 
    twelveWay.find('.marketText span').text(arrayOfMatchOdds[5].Market);
    twelveWay.find('.selectionsAndOdds').each(function (i) {


        //if (i == 0) {
        $(this).find('.selection1').text(arrayOfMatchOdds[5].Selections[currTwelveCounter].SelectionName).css({
            'font-size': '40px',
            'padding-top': '35px'
        });
        $(this).find('.odd1').text(arrayOfMatchOdds[5].Selections[currTwelveCounter].SelectionValue.toFixed(2));
        currTwelveCounter++;

        $(this).find('.selection3').text(arrayOfMatchOdds[5].Selections[currTwelveCounter].SelectionName).css({
            'font-size': '40px',
            'padding-top': '35px'
        });
        $(this).find('.odd3').text(arrayOfMatchOdds[5].Selections[currTwelveCounter].SelectionValue.toFixed(2));
        currTwelveCounter++;

        if (i === 5) {
            currTwelveCounter = 0;
        }

    });

    //4-3 way markets
    fourWay.find('.row').each(function (i) {
        $(this).find('.marketText span').text(arrayOfMatchOdds[i + 6].Market);
        $(this).find('.selectionsAndOdds').each(function (n) {
            if (arrayOfMatchOdds[i + 6].Selections.length == 3 && n == 1) {
                $(this).find('.selection1').text(arrayOfMatchOdds[i + 6].Selections[n + 1].SelectionName);
                console.log($(this).find('selection1').outerWidth(true));
                $(this).find('.odd1').text(arrayOfMatchOdds[i + 6].Selections[n + 1].SelectionValue.toFixed(2));
                $(this).find('.selection3').hide();
                $(this).find('.odd3').hide();
                return false;
            }
            else if (n == 0) {
                $(this).find('.selection1').text(arrayOfMatchOdds[i + 6].Selections[n].SelectionName);
                $(this).find('.odd1').text(arrayOfMatchOdds[i + 6].Selections[n].SelectionValue.toFixed(2));
                $(this).find('.selection3').text(arrayOfMatchOdds[i + 6].Selections[n + 1].SelectionName);
                $(this).find('.odd3').text(arrayOfMatchOdds[i + 6].Selections[n + 1].SelectionValue.toFixed(2));
            }
            else {
                $(this).find('.selection1').text(arrayOfMatchOdds[i + 6].Selections[n + 1].SelectionName);
                $(this).find('.odd1').text(arrayOfMatchOdds[i + 6].Selections[n + 1].SelectionValue.toFixed(2));
                $(this).find('.selection3').text(arrayOfMatchOdds[i + 6].Selections[n + 2].SelectionName);
                $(this).find('.odd3').text(arrayOfMatchOdds[i + 6].Selections[n + 2].SelectionValue.toFixed(2));
            }


        })
    });


}

function switchTeamLogosAndFlags(team) {
    switch (team) {
        //Американски отбори
        case "САЩ":
            return "american";
        case "Аржентина":
            return "argentinian";
        case "Боливия":
            return "bolivian";
        case "Бразилия":
            return "brazilian";
        case "Чили":
            return "chilean";
        case "Колумбия":
            return "colombian";
        case "Коста Рика":
            return "costa-rican";
        case "Еквадор":
            return "ecuadorian";
        case "Хаити":
            return "haitian";
        case "Ямайка":
            return "jamaican";
        case "Мексико":
            return "mexican";
        case "Панама":
            return "panamanian";
        case "Парагвай":
            return "paraguayan";
        case "Перу":
            return "peruvian";
        case "Уругвай":
            return "uruguayan";
        case "Венецуела":
            return "venezuelan";

            //Европейски отбори
        case "Албания":
            return "albanian";
        case "Австрия":
            return "austrian";
        case "Белгия":
            return "belgian";
        case "Хърватска":
            return "croatian";
        case "Чехия":
            return "czech";
        case "Англия":
            return "english";
        case "Франция":
            return "french";
        case "Германия":
            return "german";
        case "Унгария":
            return "hungarian";
        case "Исландия":
            return "icelander";
        case "Ирландия":
            return "irish";
        case "Италия":
            return "italian";
        case "Северна Ирландия":
            return "nirish";
        case "Полша":
            return "polish";
        case "Португалия":
            return "portuguese";
        case "Румъния":
            return "romanian";
        case "Русия":
            return "russian";
        case "Словакия":
            return "slovakian";
        case "Испания":
            return "spanish";
        case "Швеция":
            return "swedish";
        case "Швейцария":
            return "swiss";
        case "Турция":
            return "turkish";
        case "Украйна":
            return "ukrainian";
        case "Уелс":
            return "wales";
        default:

    }
};

function switchTeamLogosAndFlagsUK(team) {
    switch (team) {
        //Американски отбори
        case "Usa":
            return "american";
        case "Argentina":
            return "argentinian";
        case "Bolivia":
            return "bolivian";
        case "Brazil":
            return "brazilian";
        case "Chile":
            return "chilean";
        case "Colombia":
            return "colombian";
        case "Costa Rica":
            return "costa-rican";
        case "Ecuador":
            return "ecuadorian";
        case "Haiti":
            return "haitian";
        case "Jamaica":
            return "jamaican";
        case "Mexico":
            return "mexican";
        case "Panama":
            return "panamanian";
        case "Paraguay":
            return "paraguayan";
        case "Peru":
            return "peruvian";
        case "Uruguay":
            return "uruguayan";
        case "Venezuela":
            return "venezuelan";

            //Европейски отбори
        case "Albania":
            return "albanian";
        case "Austria":
            return "austrian";
        case "Belgium":
            return "belgian";
        case "Croatia":
            return "croatian";
        case "Czech Republic":
            return "czech";
        case "England":
            return "english";
        case "France":
            return "french";
        case "Germany":
            return "german";
        case "Hungary":
            return "hungarian";
        case "Iceland":
            return "icelander";
        case "Republic of Ireland":
            return "irish";
        case "Italy":
            return "italian";
        case "Northern Ireland":
            return "nirish";
        case "Poland":
            return "polish";
        case "Portugal":
            return "portuguese";
        case "Romania":
            return "romanian";
        case "Russia":
            return "russian";
        case "Slovakia":
            return "slovakian";
        case "Spain":
            return "spanish";
        case "Sweden":
            return "swedish";
        case "Switzerland":
            return "swiss";
        case "Turkey":
            return "turkish";
        case "Ukraine":
            return "ukrainian";
        case "Wales":
            return "wales";
        default:

    }
};

function changeSlides(index) {
    console.log(dailyMatches[index]);
    fillMatchOdds(dailyMatches[index]);
    var count = 0;

    $('.slideshow .slide').hide(); // hide all slides
    $('.slideshow .slide:first-child').show(); // show first slide
    setInterval(function () {
        counterSlides++;
        if (counterSlides === 4) {
            counterDailyMatches++;

            counterSlides = 0;
            if (counterDailyMatches === dailyMatches.length) {
                counterDailyMatches = 0;
                count++;
                if (count === 3) {
                    location.reload();
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:50810/HtmlBanners/BannerFullHDSingleMarket.html",
                        data: "name=John&location=Boston",
                        dataType: "html",
                        success: function (response) {
                            console.log(response);
                        }
                    });
                }

            }

            //setTimeout(function () {
            fillMatchOdds(dailyMatches[counterDailyMatches]);
            $('.slideshow').remove();
            slideShow.insertAfter('.ins');
            //}, 8000);


        }
        $('.slideshow .slide:first-child').hide()
              .next('.slide').fadeIn(1000)
              .end().appendTo('.slideshow');
    }, 10000);

}


//changeSlides();
