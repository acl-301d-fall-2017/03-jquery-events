'use strict';

const articleView = {};

articleView.populateFilters = function() {
    $('article').each(function() {
        let authorName, category, optionTag;
        if (!$(this).hasClass('template')) {
            authorName = $(this).attr('data-author');

            optionTag = `<option value=${authorName}>${authorName}</option>`;

            if ($(`#author-filter option[value=${authorName}]`.length === 0)) {
                $('#author-filter').append(optionTag);
            }

            category = $(this).attr('data-category');

            optionTag = `<option value=${category}>${category}</option>`;

            if ($(`#category-filter option[value=${category}]`.length === 0)) {
                $('#category-filter').append(optionTag);
                //still has repeats in menu
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

articleView.handleMainNav = function() {
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
    // REVIEW: Hide elements beyond the first 2 in any article body.
    $('.article-body *:nth-of-type(n+2)').hide();

    // TODO: Add an event handler to reveal all the hidden elements, when the .read-on link is clicked. You can go ahead and hide the "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
    // Ideally, we'd attach this as just one event handler on the #articles section, and let it process (in other words... delegate) any .read-on clicks that happen within child nodes.
    $('a[class = read-on]').click(readOn);
    function readOn(){
        event.preventDefault();

        $(this).parent().find('.article-body *').show();
    }
};

// TODO: Call all of the above functions, once we are sure the DOM is ready.

$(document).ready(function() {
    articleView.populateFilters();
    articleView.handleAuthorFilter();
    articleView.handleCategoryFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
});
