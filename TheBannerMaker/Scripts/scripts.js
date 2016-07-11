var dailyMatches = [];

$(document).on('click', "#deleteMarket", function (e) {
    e.preventDefault();
    console.log("aaaaaaaaaaaaaa");
    $(this).parent().remove();
});


$(function () {

    

    var count = 1;

    //Drop down arrange list
    $("#sortable").sortable();
    $("#sortable").disableSelection();
    
    $.getJSON("/Home/SportList",
       function (data) {
           var items = "<option>Please select sport</option>";
           $.each(data, function (i, sport) {
               if (sport.Text == "Волейбол" || sport.Text == "Футбол" || sport.Text == "Баскетбол" || sport.Text == "Тенис" || sport.Text == "Олимпийски игри") {
                   items += "<option style=\"color:red; font-size:1.5em; \" value='" + sport.Value + "'>" + sport.Text + "</option>";
               }
               else {
                   items += "<option value='" + sport.Value + "'>" + sport.Text + "</option>";
               }

           });

           $('#sports').html(items);

       }

   );



    //Sport dropdown change event
    $("#sports").change(function () {

        if ($("#sports > option:selected").attr("value")=="") {
            console.log("Please select a sport");
            $('#tournament').empty();
            
        }

        console.log($("#sports > option:selected").attr("value"));

        $('#tournament').html('<option value="">---- Select tournament ----</option>');
        $('#matches').html('<option value="">---- Select match ----</option>');
        $('#matches').empty();
        $('#markets').empty();

        if ($("#Language > option:selected").attr("value") == "") {
            console.log("Please select language");
        }

        $.getJSON("/Home/GetTournaments/" + $("#sports > option:selected").attr("value"), function (data) {
            var items = "<option>---- Select tournament ----</option>";
            $.each(data, function (i, tournament) {
                items += "<option value='" + tournament.Value + "'>" + tournament.Text + "</option>";
            });
            $("#tournaments").show();
            $("#tournaments").html(items);
        });

    });

    //Tournaments dropdown change event
    $("#tournaments").change(function () {
        $('#markets').empty();
        $.getJSON("/Home/GetMatches/" + $("#tournaments > option:selected").attr("value") + $("#Language > option:selected").attr("value"), function (data) {
            var items = "<option>---- Select match ----</option>";
            $.each(data, function (i, match) {
                items += "<option value='" + match.MatchID + "' data-inplayId='" + match.MatchIDInPlay + "'>" + match.MatchName + "</option>";
            });
            $("#matches").show();
            $("#matches").html(items);
        });
    });


    ////Matches dropdown change event
    $("#matches").change(function (e) {
        $.getJSON("/Home/GetMarkets/" + "Error" + $("#matches > option:selected").attr("value").toString().slice(0, -2) + $("#Language > option:selected").attr("value"), function (data) {
            $('#markets').empty();
            $("#markets").hide();
            var items = "";
            $.each(data, function (i, market) {
                items += "<option value='" + market.Value + "'>" + market.Text + "</option>";
            });
            $("#markets").show();
            $("#markets").html(items);
        });
    });

    //Add market to drop down list 
    $("#btnAddMarket").click(function (e) {
        e.preventDefault();

        $(".MarketContainer").clone().addClass("mc" + count).insertAfter(".MarketContainer").removeClass("MarketContainer").addClass("mc").addClass("ui-state-default");


        $(".mc" + count).find(".MatchName").text($("#matches > option:selected").text());
        $(".mc" + count).find(".MatchId").text($("#matches > option:selected").attr("value"));
        $(".mc" + count).find(".MarketName").text($("#markets > option:selected").text());
        $(".mc" + count).find(".MatchStart").text($("#markets > option:selected").attr("value"));
        $(".mc" + count).find(".IsInPlay").text($('#isInPlay').is(":checked"));
        $(".mc" + count).find(".IsInPlayNow").text($('#isInPlayNow').is(":checked"));
        $(".mc" + count).find(".IsSpecial").text($('#isSpecial').is(":checked"));
        $(".mc" + count).find(".MatchInPlayId").text($("#matches > option:selected").attr("data-inplayid"));
        $(".mc" + count).find("#deleteMarket").show();

        //MatchInPlayId
        //data - inplayid
        count++;
        //$(".match-name").text($("#matches > option:selected").text());
        //$(".MatchId").text($("#matches > option:selected").attr("value"));
        //$(".sport-market").text($("#markets > option:selected").text());
        //$(".MatchStart").text($("#markets > option:selected").text());

        $("#markets > option:selected").remove();

    });



$('#btnToDatabase').click(function (e) {
    e.preventDefault();

    $.each($(".mc"), function (mcCount, match) {

        jsonObject = {
            "Sport": $('#sports > option:selected').text(),
            "MatchName": $(this).find(".MatchName").text(),
            "MatchId": $(this).find(".MatchId").text(),
            "MatchInplayId": $(this).find(".MatchInPlayId").text(),
            "MatchTime": $(this).find(".MatchStart").text(),
            "Market": $(this).find(".MarketName").text(),
            "Language": $('#Language > option:selected').attr("value"),
            "IsInplayNow": $(this).find(".IsInPlayNow").text() === "true",
            "IsInplay": $(this).find(".IsInPlay").text() === "true",
            "IsSpecial": $(this).find(".IsSpecial").text() === "true"
        };

        $(".text").clone().addClass("text" + mcCount).insertAfter(".text").removeClass("text").addClass("txt");
        var currentMarket = $(".text" + mcCount);

        dailyMatches[mcCount] = jsonObject;

    });

    function ajaxCall() {

        $.ajax({
            url: "/Home/AddEvents",
            type: "POST",
            data: JSON.stringify(dailyMatches),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: function (response) {
                //alert(response.responseText);
            },
            success: function (response) {
            },

        });

    }

    ajaxCall();
    $(".mc").remove();
});


});