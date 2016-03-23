/****************************/
/****  AF THOMAS MIKKEL  ****/
/****    tho@ishoj.dk    ****/
/****************************/


// Debouncing ensures that exactly one signal is sent for an event that may be happening several times
// http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function ($, sr) {

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced() {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
	// smartresize
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');



(function($) {

  /***************************************/
  /****  D O C U M E N T   R E A D Y  ****/
  /***************************************/

  $(document).ready(function() {

    /*********************/
    /*** SET STRUCTURE ***/
    /*********************/
    function setStructure() {

      var windowWidth = $(window).width();


      if(windowWidth >= 768) {
        // DEL PÅ SOCIALE MEDIER
        if($(".delsiden")[0]) {
          $(".delsiden").appendTo(".social-desktop");
        }
      }
      else {
        // DEL PÅ SOCIALE MEDIER
        if($(".delsiden")[0]) {
          $(".delsiden").appendTo(".social-mobile");
        }
      }

      if(windowWidth >= 960) {
        if(menuStatus) {
          // MENUKNAP
          $(".btn-mobilmenu").removeClass("hide-me");
          $(".btn-mobilmenu-hide").addClass("hide-me");
          $("[data-role='mobilenav']").removeClass("animate");
          $(".arrow").removeClass("left");
          menuStatus = false;
          // SØGEBAR
          $(".arrow").removeClass("action");
        }

        // DEL PÅ SOCIALE MEDIER
        if($(".delsiden")[0] && !$(".sprite-printer")[0]) {
          $(".delsiden").prepend("<a class=\"sprite sprite-printer\" href=\"#\" title=\"Print siden\"><span><span class=\"screen-reader\">Print siden</span></span></a>");
        }
      }
      else {

        // DEL PÅ SOCIALE MEDIER
        if($(".sprite-printer")[0]) {
          $(".sprite-printer").remove();
        }
      }
    }



    /*************/
    /*** INITS ***/
    /*************/
    setStructure();

    /********************/
    /*** SMART RESIZE ***/
    /********************/
    $(window).smartresize(function() {
      setStructure();

    });


    /****************/
    /*** BREAKING ***/
    /****************/
    if($(".breaking")[0]) {
      setTimeout(function (){
        $(".breaking").addClass("show");
      }, 200);
    }
    $(".breaking-close").click(function(event){
      event.preventDefault();
      $(".breaking").removeClass("show");
    });


    /************************/
    /*** KLIK PÅ MENUKNAP ***/
    /************************/
    var menuStatus = false;

    // Når der klikkes på mobilmenu-knappen
    $(".btn-mobilmenu").click(function() {
      if(!menuStatus) {
        // Hvis søgebaren er aktiv, vent med at vise mobilmenuen, indtil søgebaren er skjult
        if(searchBarStatus) {
          setTimeout(function() {
            $(".btn-mobilmenu").addClass("hide-me");
            $(".btn-mobilmenu-hide").removeClass("hide-me");
            $("[data-role='mobilenav']").addClass("animate");
            $(".arrow").addClass("left");
            menuStatus = true;
          }, 300);
        }
        else {
          $(".btn-mobilmenu").addClass("hide-me");
          $(".btn-mobilmenu-hide").removeClass("hide-me");
          $("[data-role='mobilenav']").addClass("animate");
          $(".arrow").addClass("left");
          menuStatus = true;
        }

        // SØGEBAR
        $(".soegebar").removeClass("animate");
        $(".arrow").addClass("action");
        removeSearchResults(2);
        setTimeout(function(){
          $( ".soegebar form > div > input" ).val("");
        },300);
        searchBarStatus = false;
      }
    });
    // Når der klikkes på skjul-mobilmenu-knappen
    $(".btn-mobilmenu-hide").click(function() {
      if(menuStatus) {
        $(".btn-mobilmenu").removeClass("hide-me");
        $(this).addClass("hide-me");
        $("[data-role='mobilenav']").removeClass("animate");
        $(".arrow").removeClass("left");
        menuStatus = false;

        // SØGEBAR
        $(".arrow").removeClass("action");
        removeSearchResults(2);
        setTimeout(function(){
          $( ".soegebar form > div > input" ).val("");
        },300);
      }
    });


    /************************/
    /*** KLIK PÅ SØGEKNAP ***/
    /************************/
    var searchBarStatus = false;

    if($("body").hasClass("front")) { // Tilføj drupals page-klasser for de tre forsider (.front er en af dem)
//        $(".soegebar input[type=submit]").removeAttr("disabled");
        setTimeout(function(){
//          $(".soegebar form > div > input").focus();
          $(".soegebar form input").focus();
        },300);
        searchBarStatus = true;
    }
//    else {
//      $(".soegebar input[type=submit]").attr("disabled","disabled");
//    }

    $(".btn-search").click(function() {
      // NÅR DEN SKAL VISES
      if(!searchBarStatus) {
        // Hvis mobilmenuen er aktiv, vent med at vise søgebaren, indtil mobilmenuen er skjult
        if(menuStatus) {
          setTimeout(function() {
            $(".soegebar").addClass("animate");
            $(".arrow").addClass("action");
//            $(".soegebar input[type=submit]").removeAttr("disabled");
            setTimeout(function(){
//              $(".soegebar form > div > input").focus();
              $(".soegebar form input").focus();
            },300);
            searchBarStatus = true;
          }, 300);
        }
        else {
          $(".soegebar").addClass("animate");
          $(".arrow").addClass("action");
//          $(".soegebar input[type=submit]").removeAttr("disabled");
          setTimeout(function(){
//            $(".soegebar form > div > input").focus();
            $(".soegebar form input").focus();
          },300);
          searchBarStatus = true;
        }

        // MENUKNAP
        $(".btn-mobilmenu").removeClass("hide-me");
        $(".btn-mobilmenu-hide").addClass("hide-me");
        $("[data-role='mobilenav']").removeClass("animate");
        $(".arrow").removeClass("left");
        // FJERN SØGERESULTATER
        $(".soegeresultat").remove();
        $(".soegeresultat").removeClass("show");
		menuStatus = false;
      }
      // NÅR DEN SKAL SKJULES
      else {
        $(".soegebar").removeClass("animate");
        removeSearchResults(2);
        $(".arrow").removeClass("action");
//        $(".soegebar input[type=submit]").attr("disabled","disabled");
        setTimeout(function(){
//          $( ".soegebar form > div > input" ).val("");
          $( ".soegebar form input" ).val("");
        },300);
        searchBarStatus = false;
      }
    });

    /****************************/
    /**** VIS SØGERESULTATER ****/
    /****************************/

    var searchString = "";
    var showMoreResults = true;
    var moreResultsWasShown = false;

    // Midlertid testfunktion. showMoreResults skal genereres fra koden og ikke som her i testfunktionen
    $(".klik-mig").click(function() {
      if(showMoreResults) {
        showMoreResults = false;
      }
      else {
        showMoreResults = true;
      }
    });

    function searchChanged(val){
      if(searchString == val){
        return false;
      }
    }

    // NÅR DER INDTASTES I SØGEFELTET
//    $( ".soegebar form > div > input" ).keyup(function() {
    $( ".soegebar form input" ).keyup(function() {
      if(searchString == $(this).val()){
        return false;
      }
      searchString = $(this).val();
      getSearchResultsval($(this).val());
    });

    // NÅR DER SUBMITTES (KLIK PÅ ENTER-TASTEN ELLER PÅ SUBMIT-KNAPPEN)
    $( ".soegebar form" ).submit(function( event ) {
      event.preventDefault();
//      if(searchString == $(".soegebar form > div > input").val()){
      //if(searchString == $(".soegebar form input").val()){
      //  return false;
      //}
//      getSearchResultsval($( ".soegebar form > div > input" ).val());
      //getSearchResultsval($( ".soegebar form input" ).val());
      window.location.href = "/search/" + $(".soegebar form input").val();
    });

    // FJERNER SØGERESULTATER
    function removeSearchResults(i) {
      if(i == 2) {
        $(".soegeresultat, .search-more").removeClass("show");

        if($("#soegebar-resultater").hasClass("animate")) {
          $("#soegebar-resultater").removeClass("animate");
        }
        setTimeout(function() {
          $(".soegeresultat, .search-more").remove();
        }, 200);

        return false;
      }
      // Når søgeresultaterne lukker sig helt sammen, skal den fjerne hele elementet
      $(".soegeresultat").removeClass("show");
      $(".soegeresultat ul").children().remove();
      $(".search-more .grid-full").children().remove();
      if(i == 1) {
        $(".search-more").removeClass("show");
      }
      if($("#soegebar-resultater").hasClass("animate")) {
        $("#soegebar-resultater").removeClass("animate");
      }
    }

    // VISER SØGERESULTATER
    function getSearchResultsval(val) {
      if(val.length < 2) { // Min. to tegn, før der foretages en søgning
        removeSearchResults(1);
        return false;
      }
      var sStart = '<div class="row soegeresultat"><ul>';
      var sEnd   = '</ul></div><div class=\"row search-more\"><div class=\"grid-full\"></div></div>';
      var s      = '';


      var jqxhr = $.getJSON( "/search/search.php?query=" + encodeURIComponent(val), function() {
//
      })
        .done(function(data) {
        //  console.log( "second success\n\n" );

	  var resultLimit = 12;

          //$.each( data.response.docs, function( i, item ) {
          //  s += '<li class="grid-fourth"><a href="' + item.url + '" title="' + item.label + '"><h3><span>' + item.label + '</span></h3></a><li>';
          //});
   _paq.push(['trackSiteSearch',val,"content",data.hits.total]);
            console.log(val + ' ' + data.hits.total);
	  $.each(data.hits.hits, function( i, item ) {
	    if (i < resultLimit) {
	      s += '<li><a href="' + item._source.url + '" title="' + item._source.title + '"><span class="cat-icon"></span><span class="cat-text">' + item._source.title + '</span></a></li>';
	    }
          });

          if($(".soegeresultat")[0]) { // Der er allerede vist et søgeresultat
            removeSearchResults();
            $(".soegeresultat ul").append(s);
          }
          else {
//            $(".soegebar .container").append(sStart + s + sEnd);
            $(".soegebar-resultater .container").append(sStart + s + sEnd);
          }
          // Hvis der er flere end 12 søgeresultater
          if(showMoreResults && data.hits.hits.length > 12) {
            moreResultsWasShown = 1;
//            $(".search-more .grid-full").append("<p><a class=\"btn btn-large btn-outline flere-resultater\" href=\"#\"><span class=\"sprites-sprite sprite-arrow-right\"></span>" + encodeURIComponent(val) + "</a></p>");
            //$(".search-more .grid-full").append("<p><a class=\"btn btn-large btn-outline flere-resultater\" href=\"#\">" + encodeURIComponent(val) + "</a></p>");
            $(".search-more .grid-full").append("<p><a class=\"btn btn-large btn-outline flere-resultater\" href=\"\search/"+ $(".soegebar form input").val()+"\">Avanceret søgning</a></p>");

          }
//          console.log("\nmoreResultsWasShown = " + moreResultsWasShown);
//          console.log($(".search-more .grid-full").html());



          setTimeout(function(){
            $(".soegeresultat").addClass("show");

            if(!$("#soegebar-resultater").hasClass("animate")) {
              $("#soegebar-resultater").addClass("animate");
            }

            if(showMoreResults) {
              $(".search-more").addClass("show");
            }
          },10);



        })
        .fail(function() {
          console.log( "error" );
        })
        .always(function() {
          console.log( "complete" );
        });

    }


    // Se http://stackoverflow.com/questions/15620303/trouble-animating-div-height-using-css-animation
    // og http://css3.bradshawenterprises.com/animating_height/
//    function searchBoxHeight() {
//      console.log( "soegeresultat højde: " + $(".soegeresultat").height() );
//    }


    /*************************************/
    /**** MIKROARTIKLER FRA BORGER.DK ****/
    /*************************************/
    if($(".microArticleContainer")[0]) {
      $(".microArticle div.mArticle").hide();
      $(".microArticle > h2").prepend("<span class=\"sprites-sprite sprite-plus mikroartikel\"></span>").addClass("mArticle");
      $(".microArticle > h3").prepend("<span class=\"sprites-sprite sprite-plus mikroartikel\"></span>");

//      $(".microArticle h3.mArticle").click(function(){
      $(".microArticle h2.mArticle, .microArticle h3.mArticle").click(function(){
          $(this).parent().find("div.mArticle").slideToggle('fast');
          if($(this).parent().hasClass("active")){
              $(this).parent().removeClass("active");
              $(this).removeClass("active");
              $(this).find("span").removeClass("sprite-minus");
          }
          else {
              $(this).parent().addClass("active");
              $(this).addClass("active");
              $(this).find("span").addClass("sprite-minus");
          }
      });
    }


    /********************/
    /**** GOOGLE MAP ****/
    /********************/
    $(".map-btn").click(function(){
        if($("#map-canvas").hasClass("active")){
            $("#map-canvas").removeClass("active");
    $(this).text("Vis kort");
        }
        else {
            $("#map-canvas").addClass("active");
    $(this).text("Skjul kort");
        }
    });


    /********************/
    /**** DEL SIDEN ****/
    /********************/
    var popupCenter = function(url, title, w, h) {
      // Fixes dual-screen position                         Most browsers      Firefox
      var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
      var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
      var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      var left = ((width / 2) - (w / 2)) + dualScreenLeft;
      var top = ((height / 3) - (h / 3)) + dualScreenTop;
      var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus();
      }
    };
//    $(".delsiden a:not(.sprite-share, .sprite-printer)").click(function(e){
    $(".dimmer-delsiden a:not(.sprite-link, .breaking-close)").click(function(e){
      e.stopPropagation();
      popupCenter($(this).attr("href"), $(this).attr("title"), 580, 470);
      e.preventDefault();
    });
//    $(".dimmer-delsiden a:not(.dimmer-delsiden)").click(function(e){
//      e.stopPropagation();
//      popupCenter($(this).attr("href"), $(this).attr("title"), 580, 470);
//      e.preventDefault();
//    });
    // DEL-KNAPPEN
    $(".sprite-share").click(function(e){
      $(".dimmer-delsiden").removeClass("hidden");
      $(".dimmer-delsiden ul").addClass("show");
      e.preventDefault();
    });
    // LINK URL-KNAPPEN
    $(".sprite-link").click(function(e){
      e.stopPropagation();
      $(".link-url").addClass("show");
      e.preventDefault();
    });
    // URL TEKST
    $(".link-url textarea").click(function(e){
      e.stopPropagation();
      e.preventDefault();
      $(this).focus().select().toggleClass("show-bg");
    });
    // LUK-KNAP
    $(".dimmer-delsiden .breaking-close").click(function(e){
      e.stopPropagation();
      e.preventDefault();
      $(".dimmer-delsiden").addClass("hidden").children("> ul").removeClass(".show");
      $(".dimmer-delsiden ul").removeClass("show");
      $(".link-url textarea").removeClass("show-bg");
      $(".link-url").removeClass("show");
      $(".link-url span").removeClass("show-bg");

    });


    // DIMMER-DELSIDEN
    $(".dimmer-delsiden").click(function(e){
      $(this).addClass("hidden").children("> ul").removeClass(".show");
      $(".dimmer-delsiden ul").removeClass("show");
      $(".link-url textarea").removeClass("show-bg");
      $(".link-url").removeClass("show");
      $(".link-url span").removeClass("show-bg");
    });

    /*********************/
    /**** PRINT SIDEN ****/
    /*********************/
    $(document).on('click', '.sprite-printer', function(e) {
      window.print();
      e.preventDefault();
    });


    /*************************************/
    /**** ANDRE KOMMUNALE HJEMMESIDER ****/
    /*************************************/
    if ($("#hjemmesider")[0]) {
      $(function() {
        // bind change event to select
        $("#hjemmesider").bind("change", function() {
          if($(this).val() != "0") {
            selIndex = $(this).val();
            if(selIndex.substr(0,7) != 'http://'){
              selIndex = 'http://' + selIndex;
            }
            $("#hjemmesider option:first-child").attr("selected", true);
            window.location = selIndex;
          }
          return false;
        });
      });
    }

    /*******************************/
    /**** SWIPER SOCIAL-CONTENT ****/
    /*******************************/
    function findSlidesPerView(maxCol) {
      var ww = $(window).width();
      if (ww>=960) {
        if(maxCol == 4)
          return 4;
        if(maxCol == 3)
          return 3;
      }
      if (ww>=640 && ww<960) {
        return 2;
      }
      if (ww<640) {
        return 1;
      }
    }
    function findSpaceBetween() {
      var ww = $(window).width();
      if (ww>=960) {
          return 42;
      }
      if (ww>=640 && ww<960) {
        return 24;
      }
      if (ww<640) {
        return 12;
      }
    }
    function initSwiper() {
      // Init swipers
      // Social content
      if ($(".swiper-container-social-content")[0]) {
        var socialContentSwiper = new Swiper ('.swiper-container-social-content', {
          direction: 'horizontal',
          loop: false,
          spaceBetween: 1,
          slidesPerView: findSlidesPerView(4),
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev'
        });
        $(window).resize(function() {
          socialContentSwiper.params.slidesPerView = findSlidesPerView(4);
        });
      }
      // Nyhedsliste
      if ($(".swiper-container-news")[0]) {
        var newsSwiper = new Swiper ('.swiper-container-news', {
          direction: 'horizontal',
          loop: false,
          spaceBetween: findSpaceBetween(),
          slidesPerView: findSlidesPerView(3),
          nextButton: '.news-swiper-button-next',
          prevButton: '.news-swiper-button-prev'
        });
        $(window).resize(function() {
          newsSwiper.params.slidesPerView = findSlidesPerView(3);
          newsSwiper.params.spaceBetween  = findSpaceBetween();
        });
      }
      // TV-Ishøj Youtube
      if ($(".swiper-container-news_tvi")[0]) {
        var news_tviSwiper = new Swiper ('.swiper-container-news_tvi', {
          direction: 'horizontal',
          loop: false,
          spaceBetween: findSpaceBetween(),
          slidesPerView: findSlidesPerView(3),
          nextButton: '.news_tvi-swiper-button-next',
          prevButton: '.news_tvi-swiper-button-prev'
        });
        $(window).resize(function() {
          news_tviSwiper.params.slidesPerView = findSlidesPerView(3);
          news_tviSwiper.params.spaceBetween  = findSpaceBetween();
        });
      }
      // Aktiviteter
      if ($(".swiper-container-activities")[0]) {
        var activitiesSwiper = new Swiper ('.swiper-container-activities', {
          direction: 'horizontal',
          loop: false,
          spaceBetween: findSpaceBetween(),
          slidesPerView: findSlidesPerView(3),
          nextButton: '.activities-swiper-button-next',
          prevButton: '.activities-swiper-button-prev'
        });
        $(window).resize(function() {
          activitiesSwiper.params.slidesPerView = findSlidesPerView(3);
          activitiesSwiper.params.spaceBetween  = findSpaceBetween();
        });
      }

    }

    initSwiper();


    // Tilføj h2 til Aktivitetsidens søgeboks
    if($(".views-exposed-widgets")[0]) {
      $(".views-exposed-widgets").prepend("<h2>Søg aktiviteter</h2>");
    }

    // Tilføj måneds-friser til aktivitetslisten på Aktivitetessiden
    if($(".page-taxonomy-term-3013")[0]) {
      var bgMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var bgMonthsNames = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
      var bgMonthsNamesFull = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];

      $(".swiper-slide").each(function(){
        var datoText = $(this).find(".date").html();

        for(i = 0; i < bgMonths.length; i++) {
          if(datoText.indexOf(bgMonthsNames[i]) > -1) {
            if(bgMonths[i] == 1) {
              break;
            }
            else {
              bgMonths[i] = 1;
              console.log("Indsæt frise\n");
//              $( '<div class="swiper-slide fix-width"><div id="frise' + i + '" class="maanedsfrise ' + bgMonthsNames[i] + '" data-stellar-background-ratio="0.85"><div><div><div><h2>' + bgMonthsNamesFull[i] + '</h2></div></div></div></div></div>' ).insertBefore( $(this) );
              break;
            }
          }
        }
        console.log($(this).find(".date").html() + "\n");

      });
//      $.stellar({
//        horizontalScrolling: false,
////        verticalOffset: -1400,
//        responsive: true
//      });
    }



    /**********************/
    /**** MIKS MINIMAP ****/
    /**********************/
    function setMiksMiniMap() {
      var w = $(".miksminimap").width();
      var forholdfaktor = (500/850);
      $(".miksminimap").height(forholdfaktor * w);
    }
    if($(".miksminimap")[0]) {
      setMiksMiniMap();
      $('#minimapbody').css({width: "inherit", height: "inherit" });
      $(window).on('resize', function(){
        setMiksMiniMap();
      });
    }


    /**********************/
    /**** DRUPAL FIXES ****/
    /**********************/

    /* Fjerner styles-attributten på billeder, der er indsat i brødteksten. Herved kan billeder bliver skaleret responsivt via css */
    $(".artikel img").each(function(){
      if($(this).attr("style")) {
        $(this).removeAttr("style");
      }
    });


  });


  /*********************************/
  /****  W I N D O W   L O A D  ****/
  /*********************************/

  $(window).load(function() {

    /********************/
    /**** FLEXSLIDER ****/
    /********************/
    // https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
    if ($(".flexslider")[0]) {

      $(".flexslider").flexslider({
  //      startAt: 0,
        animation: "slide",
        slideshowSpeed: 7000,
        prevText: "",
        nextText: ""
      });
      $(".flex-direction-nav a.flex-prev").removeClass("flex-prev").addClass("icon").addClass("flex-prev"); // swapper klasserne
      $(".flex-direction-nav a.flex-next").removeClass("flex-next").addClass("icon").addClass("flex-next");
    }


  });


})(jQuery);
