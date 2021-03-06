const axios = require('axios');

$(() => {
  $('#submit-btn').on('click', (event) => {
    event.preventDefault();
    const inputStr = $('#item-input').val();
    console.log($('#category-container').children());
    $('.items-list').append(`<div>
    <button class='complete-btn'>COMPLETE</button>
    <li>${inputStr}</li>
    <button class='delete-btn'>DELETE</button>
    </div>`);
    deleteBtnListener();
    completeBtnListener();
  });



});

const deleteBtnListener = () => {
  $('.delete-btn').on('click', (event) => {
    $(event.target).parent().remove();
  });
};

const completeBtnListener = () => {
  $('.complete-btn').on('click', (event) => {
    $($(event.target).parent().parent().parent().siblings().children('ul')).append($(event.target).parent());

    $(event.target).toggleClass('complete-fill');
    $(event.target).next().toggleClass('complete-strike');
    $(event.target).next().next().toggleClass('complete-gray');
  });
};
