var addMouseTriggerOnResult = function(result) {
    result.mouseenter(function() {
        $(this).children(".action-button").css("display", "block");
    }).mouseleave(function() {
        $(this).children(".action-button").css("display", "none");
    });
};

var addMouseTriggerOnActionButton = function(actionButton) {
    actionButton.mouseenter(function() {
        $(this).css("background-color", "#f7f7f7")
    }).mouseleave(function() {
        $(this).css("background-color", "rgba(247, 247, 247, 0.5)")
    });
};

var addResultsTrigger = function(results) {
    results.click(function() {
        $(".deleted-result-holder").append($(this).clone());
        addDeleteResultsTrigger($(".deleted-result-holder>div:last"));
        $(this).remove();

        $(".deleted-result-holder:first>div").sort(function(a, b) {
            return $(a).children('img').attr('src') > $(b).children('img').attr('src') ? 1 : -1;
        }).appendTo($(".deleted-result-holder"));

        $('.deleted-result-holder').animate({
            'scrollLeft': '+=2000'
        }, 500);
    });
};

var addDeleteResultsTrigger = function(deletedResults) {
    deletedResults.click(function() {
        $(".result-holder:first").append($(this).clone());
        addResultsTrigger($(".result-holder:first>div:last"));
        $(this).remove();

        $(".result-holder:first>div").sort(function(a, b) {
            return $(a).children('img').attr('src') > $(b).children('img').attr('src') ? 1 : -1;
        }).appendTo($(".result-holder:first"));
    });
};

var handleDropdownCustomTrigger = function() {
    $(".dropdown-menu").click(function(e) {
        e.stopPropagation();
    });

    $(".dropdown-custom>button").click(function() {
        $(this).parent().children(".dropdown-content").toggleClass("custom-show");
    });
};

var handleFiltersData = function(categories, attributes, concepts, activities, locations, songs) {
    // Sort array
    categories.sort((a, b) => a - b);
    attributes.sort((a, b) => a - b);
    concepts.sort((a, b) => a - b);
    activities.sort((a, b) => a - b);
    locations.sort((a, b) => a - b);
    songs.sort((a, b) => a - b);

    // Query element
    allCategories = $('.category-filter .all-data');
    allAttributes = $('.attribute-filter .all-data');
    allConcepts = $('.concept-filter .all-data');
    dictionary = $('.dictionary');
    categorySeachbar = $('.category-filter .search-bar input');
    attributeSeachbar = $('.attribute-filter .search-bar input');
    conceptSeachbar = $('.concept-filter .search-bar input');
    categoryResult = $('.category-filter .dropdown-content');
    attributeResult = $('.attribute-filter .dropdown-content');
    conceptResult = $('.concept-filter .dropdown-content');
    extradataActivity = $('.extradata-filter .extradata-activity');
    extradataLocation = $('.extradata-filter .extradata-location');
    extradataSong = $('.extradata-filter .extradata-song');

    // Handle event click
    dictionary.children('span').click(function() {
        var parent = $(this).parent();

        parent.children('span').removeClass('custom-selected');
        $(this).addClass('custom-selected');

        al = $(this).text()
        parent.parent().children('.all-data').children('span').each(function() {
            child = $(this);
            text = child.text();
            child.addClass('custom-hidden');
            if (text[0].toLowerCase() == al.toLowerCase()) {
                child.removeClass('custom-hidden');
            }
        });
    });

    categorySeachbar.keyup(function(e) {
        keyword = $(this).val();
        if (keyword.length == 0) {
            categoryResult.removeClass('custom-show');
            return;
        }

        categoryResult.empty();
        let results = categories.filter(category => category.toLowerCase().includes(keyword.toLowerCase()));
        if (results.length > 0) {
            categoryResult.addClass('custom-show');
            results.forEach(result => categoryResult.append(`<a href="#">${result}</a>`));
        } else {
            categoryResult.removeClass('custom-show');
        }
    });

    attributeSeachbar.keyup(function(e) {
        keyword = $(this).val();
        if (keyword.length == 0) {
            attributeResult.removeClass('custom-show');
            return;
        }

        attributeResult.empty();
        let results = attributes.filter(attribute => attribute.toLowerCase().includes(keyword.toLowerCase()));
        if (results.length > 0) {
            attributeResult.addClass('custom-show');
            results.forEach(result => attributeResult.append(`<a href="#">${result}</a>`));
        } else {
            attributeResult.removeClass('custom-show');
        }
    });

    conceptSeachbar.keyup(function(e) {
        keyword = $(this).val();
        if (keyword.length == 0) {
            conceptResult.removeClass('custom-show');
            return;
        }

        conceptResult.empty();
        let results = concepts.filter(concept => concept.toLowerCase().includes(keyword.toLowerCase()));
        if (results.length > 0) {
            conceptResult.addClass('custom-show');
            results.forEach(result => conceptResult.append(`<a href="#">${result}</a>`));
        } else {
            conceptResult.removeClass('custom-show');
        }
    });

    $('.dictionary span:first-child').trigger('click');

    extradataActivity.find('.dropdown-content input').keyup(function(e) {
        let textField = $(this);
        let keyword = textField.val();
        let allActivities = textField.parent().find('a');

        let results = activities.filter(activity => !activity.toLowerCase().includes(keyword.toLowerCase()));
        allActivities.removeClass('custom-hidden');
        if (results.length > 0) {
            allActivities.each(function() {
                let activity = $(this).text();
                if (results.findIndex(result => result == activity) != -1) {
                    $(this).addClass('custom-hidden');
                }
            });
        }
    });

    extradataLocation.find('.dropdown-content input').keyup(function(e) {
        let textField = $(this);
        let keyword = textField.val();
        let allLocations = textField.parent().find('a');

        let results = locations.filter(location => !location.toLowerCase().includes(keyword.toLowerCase()));
        allLocations.removeClass('custom-hidden');
        if (results.length > 0) {
            allLocations.each(function() {
                let location = $(this).text();
                if (results.findIndex(result => result == location) != -1) {
                    $(this).addClass('custom-hidden');
                }
            });
        }
    });

    extradataSong.find('.dropdown-content input').keyup(function(e) {
        let textField = $(this);
        let keyword = textField.val();
        let allSongs = textField.parent().children('a');

        let results = songs.filter(song => !song.toLowerCase().includes(keyword.toLowerCase()));
        allSongs.removeClass('custom-hidden');
        if (results.length > 0) {
            allSongs.each(function() {
                let song = $(this).text();
                if (results.findIndex(result => result == song) != -1) {
                    $(this).addClass('custom-hidden');
                }
            });
        }
    });

    allExtradata = $('.extradata-filter .dropdown-custom .dropdown-content a');
    allExtradata.click(function() {
        data = $(this).text();
        button = $(this).parent().parent().parent().children('button');
        button.text(data);
        $(this).parent().parent().removeClass('custom-show');
    });
};

var handleTagTrigger = function() {
    // Remove tags
    var tagElRmBtns = $('.tag span i');

    var removeTagFunc = function() {
        var tag = $(this).parent().text();
        $(this).parent().remove();

        console.log(tag);
        masterTagHolder = $('.container-fluid>.tag');
        masterTagHolder.children('span').each(function() {
            console.log(`current tag ${$(this).text()}`);
            if ($(this).text() == tag) {
                $(this).remove();
            }
        });
    }

    var removeMasterTagFunc = function() {
        var tag = $(this).parent().text();
        $(this).parent().remove();

        console.log(tag);
        tagHolder = $('.filter-holder .dropdown-menu .tag');
        tagHolder.children('span').each(function() {
            if ($(this).text() == tag) {
                $(this).remove();
            }
        });
    }

    tagElRmBtns.click(removeTagFunc);

    //Add tag
    var allTags = $('.filter-holder .all-data span');

    allTags.click(function() {
        var tag = $(this).text();
        var dropdownMenu = $(this).closest('.dropdown-menu');
        var tagHolder = dropdownMenu.children('.tag');
        var masterTagHolder = $('.container-fluid>.tag');

        var selectedTags = tagHolder.children('span').map(function() {
            return $(this).text();
        }).toArray();

        var isSelected = selectedTags.filter((v) => v.includes(tag)).length > 0;
        if (isSelected) {
            return;
        }

        var tagEl = `
        <span class="bg-light border tag-item">${tag}
            <i class="fa fa-times"></i>
        </span>
        `;

        tagHolder.append(tagEl);
        masterTagHolder.append(tagEl);

        tagHolder.find('span:last i').click(removeTagFunc);
        masterTagHolder.find('span:last i').click(removeMasterTagFunc);
    });
};

var renderTemplate = function(categories, attributes, concepts, activities, locations, songs) {
    Handlebars.registerPartial(
        'createDataEl',
        `
        {{#each data}}
        <span class="custom-hidden">{{this}}</span>
        {{/each}}
        `
    );

    Handlebars.registerPartial(
        'createExtraDataEl',
        `
        {{#each data}}
        <a href="#">{{this}}</a>
        {{/each}}
        `
    )

    cateTemplate = Handlebars.compile(`{{>createDataEl}}`);
    actiTemplate = Handlebars.compile(`{{>createExtraDataEl}}`);

    $('.category-filter .all-data').html(cateTemplate({
        'data': categories
    }));
    $('.attribute-filter .all-data').html(cateTemplate({
        'data': attributes
    }));
    $('.concept-filter .all-data').html(cateTemplate({
        'data': concepts
    }));
    $('.extradata-activity .dropdown-content div').html(actiTemplate({
        'data': activities
    }));
    $('.extradata-location .dropdown-content div').html(actiTemplate({
        'data': locations
    }));
    $('.extradata-song .dropdown-content div').html(actiTemplate({
        'data': songs
    }));
};

var sendQuery = function(query) {
    var onSuccess = function(data) {
        resultsTemplate = Handlebars.compile(`
        {{#each results}}
        <div class="col-md-2 result" data-result-id="{{this}}">
            <div class="action-button"></div>
            <img src="./mock_dataset/{{this}}" alt="result">
        </div>
        {{/each}}
        `);

        $('.result-holder:first').html(resultsTemplate({
            'results': JSON.parse(data)
        }));

        addResultsTrigger($(".result-holder:first>div"));
    };

    $.ajax({
        type: "POST",
        url: "/search",
        data: "",
        success: onSuccess,
    });
};

var setCountdownTimer = function() {
    // Set the date we're counting down to
    var DEFAULT_TIME = 5 * 60;

    var distance = DEFAULT_TIME;

    var pause = true;

    var timer = function() {
        if (pause) {
            return;
        }

        distance--;

        setTimer(distance);

        // If the count down is over, write some text 
        if (distance < 0) {
            $('.timer-holder>i:first').trigger('click');
            $('#countdown-timer').val('0');
        }
    }

    var setTimer = function(distance) {
        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor(distance / 60);
        var seconds = Math.floor(distance % 60);

        // Output the result in an element with id="demo"
        $('#countdown-timer').val(minutes + "m " + seconds + "s");
    };

    setTimer(DEFAULT_TIME);

    // Update the count down every 1 second
    setInterval(timer, 1000);

    $('.timer-holder>i:first').click(function() {
        if (pause) {
            $(this).removeClass('fa-play').addClass('fa-pause');
            pause = false;
            return;
        }
        $(this).removeClass('fa-pause').addClass('fa-play');
        pause = true;
    });

    $('.timer-holder>i:last').click(function() {
        pause = true;
        $('.timer-holder>i:first').removeClass('fa-pause').addClass('fa-play');
        distance = DEFAULT_TIME;
        setTimer(distance);
    });

    $('#countdown-timer').focus(function() {
        pause = true;
        $('.timer-holder>i:first').removeClass('fa-pause').addClass('fa-play');
    });

    $('#countdown-timer').keyup(function(e) {
        if (e.which == 13) {
            if (parseInt($(this).val()) != 0) {
                DEFAULT_TIME = parseInt($(this).val())
            }
            distance = DEFAULT_TIME;
            setTimer(distance);
        }
    });
}

var setTaxonomySidebar = function() {
    $(".btn-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    var itemClickedCallback = function(event) {
        var childWrapper = $(this).children('.child-wrapper');
        if (childWrapper.hasClass('custom-show')) {
            childWrapper.children('input').remove();
            childWrapper.removeClass('custom-show');
        } else {
            childWrapper.addClass('custom-show');
        }
        event.stopPropagation();
    }

    var inputKeyupCallback = function(event) {
        if (event.which != 13 || $(this).val() == '') {
            return;
        }
        var value = $(this).val();
        $(this).parent().children('ul').append(
            `<li> 
            <a href="#"><span>${value}</span> <i class="fa fa-hand-point-left"></i> <i class="fa fa-plus"></i> <i class="fa fa-times"></i></a>
            <div class="child-wrapper">
            <ul></ul>
            </div>
            </li>`
        );
        var newChild = $(this).parent().children('ul').children('li:last');
        newChild.click(itemClickedCallback);
        newChild.children('a').children('i').click(actionBtnClickedCallback);
        $(this).val('');
    }

    var actionBtnClickedCallback = function(event) {
        if ($(this).hasClass('fa-times')) {
            $(this).closest('li').remove();
        }
        if ($(this).hasClass('fa-plus')) {
            var childWrapper = $(this).closest('li').children('.child-wrapper');
            childWrapper.addClass('custom-show');
            if (childWrapper.children('input').length != 0) {
                childWrapper.children('input').remove();
            } else {
                childWrapper.append('<input type="text" placeholder="Add new item">');
                childWrapper.children('input').click(function(event) {
                    event.stopPropagation();
                });
                childWrapper.children('input').keyup(inputKeyupCallback);
            }
        }
        if ($(this).hasClass('fa-hand-point-left')) {

        }
        event.stopPropagation();
    }

    $('#sidebar-wrapper ul>li').click(itemClickedCallback);

    $('#sidebar-wrapper .sidebar-nav li>a>i').click(actionBtnClickedCallback);

    $('#sidebar-wrapper>input').keyup(inputKeyupCallback)
}

$(document).ready(async function() {
    handleDropdownCustomTrigger();

    var activities = JSON.parse(await $.get("/data/activities"));

    var locations = JSON.parse(await $.get("/data/locations"));

    var songs = JSON.parse(await $.get("/data/songs"));

    var concepts = JSON.parse(await $.get("/data/concepts"));

    var attributes = JSON.parse(await $.get("/data/attributes"));

    var categories = JSON.parse(await $.get("/data/categories"));

    renderTemplate(categories, attributes, concepts, activities, locations, songs)

    handleFiltersData(categories, attributes, concepts, activities, locations, songs);

    handleTagTrigger();

    setCountdownTimer();

    setTaxonomySidebar();

    $('header .search-bar i:last').click(function() {
        var query = $('header .search-bar input').val();
        sendQuery(query);
    });

    $('.import-export .export a').click(function() {
        var results = $('.result-holder:first>div').map(function(params) {
            return $(this).data('result-id');
        }).toArray();

        $(this).attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(results.join('\n')));
        $(this).attr('download', 'results');
    });
});