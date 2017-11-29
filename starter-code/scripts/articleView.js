'use strict';

const articleView = {};

articleView.populateFilters = function() {
    $('article').each(function() {
        let authorName, category, optionTag;
        if (!$(this).hasClass('template')) {
            authorName = $(this).attr('data-author');
            optionTag = `<option value='${authorName}'>${authorName}</option>`;

            if ($(`#author-filter option[value=${authorName}]`.length === 0)) {
                $('#author-filter').append(optionTag);
            }

            category = $(this).attr('data-category');
            optionTag = `<option value=${category}>${category}</option>`;

            if ($(`#category-filter option [value= '${category}']`).length === 0) {
                $('#category-filter').append(optionTag);
                //still has repeats in selection options
            }
        }
    });
};


articleView.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-author = '${$(this).val()}']`).fadeIn();
        } else {
            $('article').show();
            $('article.template').hide();
        }
        $('#category-filter').val('');
    });
};


articleView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-category = '${$(this).val()}']`).fadeIn();
        } else {
            $('article').show();
            $('article.template').hide();
        }
        $('#author-filter').val('');
    });
};


articleView.handleMainNav = function() { //not working
    $('li[class = tab]').click(changeTabs);
    function changeTabs(){
        const clickedTab = $(this).attr('data-content');
        console.log(clickedTab + 'was Clicked');
        $('.tab-content').hide();
        $(`section#${clickedTab}`).show();
    }

    // TODO: Add an event handler to .main-nav elements that will power the Tabs feature.
    // Clicking any .tab element should hide all the .tab-content sections, and then reveal the single .tab-content section that is associated with the clicked .tab element.
    // So: You need to dynamically build a selector string with the correct ID, based on the data available to you on the .tab element that was clicked.


    // REVIEW: Now trigger a click on the first .tab element, to set up the page.

    $('.main-nav .tab:first').click();
};


articleView.setTeasers = function() {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('a[class = read-on]').click(readOn);
    function readOn(){
        event.preventDefault();
        $(this).parent().find('.article-body *').show();
    }
};


$(document).ready(function() {
    articleView.populateFilters();
    articleView.handleAuthorFilter();
    articleView.handleCategoryFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
});
