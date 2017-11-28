'use strict';

const articleView = {};

articleView.populateFilters = function() {
    $('article').each(function() {
        let authorName, category, optionTag;
        if (!$(this).hasClass('template')) {
            authorName = $(this).attr('data-author');

            optionTag = `<option value="${authorName}">${authorName}</option>`;

            if($(`#author-filter option[value="${authorName}"]`).length === 0){
                $('#author-filter').append(optionTag);
            }

            category = $(this).attr('data-category');

            optionTag = `<option value="${category}">${category}</option>`;

            if($(`#category-filter option[value="${category}"]`).length === 0){
                $(`#category-filter`).append(optionTag);
            }
        }
    });
};

articleView.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            const selectAuthor = $(this).val();
            $(`article[data-author='${selectAuthor}']`).fadeIn();
        } else {
            $('article').not('.template').show();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function(){
        if($(this).val()){
            $('article').hide();
            const selectCategory = $(this).val();
            $(`article[data-category='${selectCategory}']`).fadeIn();
        }else{
            $('article').not('.template').show();
        }
        $('#author-filter').val('');
    });
};

articleView.handleMainNav = function() {
    $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('.read-on').on('click', function(event){
        event.preventDefault();
        $(this).siblings().find('*:nth-of-type(n+2)').show();
    });
};

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
    articleView.populateFilters();
    articleView.handleAuthorFilter();
    articleView.handleCategoryFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
});
