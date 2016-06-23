/// <reference path="C:\efbet\TheBannerMakerFullHD\TheBannerMaker\HtmlBanners/DinamycBanner250x250.html" />
(function () {
    var date = new Date();
    
    console.log(date.getHours() + "  " + date.getMinutes());
    
    if (((date.getHours() === 19 && date.getMinutes() >= 10) || date.getHours() === 20) && (date.getMinutes() < 45)) {

        $('body').load("../HtmlBanners/LiveMarketsAll.html");
        $('.main-container').remove();
    }

    if (((date.getHours() === 19 && date.getMinutes() >=10) || date.getHours() === 20) && (date.getMinutes() < 45)) {

        $('body').load("../HtmlBanners/LiveMarketsAll.html");
        $('.main-container').remove();
    }
       
    else if ((date.getHours() === 22 && date.getMinutes() >= 10) && (date.getMinutes() < 45)) {

        $('body').load("../HtmlBanners/LiveMarketsAll.html");
        $('.main-container').remove();
    }
   
})();