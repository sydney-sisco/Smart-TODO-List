$(() => {
  // $('#submit-btn').on('click', (event) => {
  //   event.preventDefault();
  //   const inputStr = $('#item-input').val();
  //   console.log($('#category-container').children());
  //   $('.items-list').append(`<div>
  //   <button class='complete-btn'>COMPLETE</button>
  //   <li>${inputStr}</li>
  //   <button class='delete-btn'>DELETE</button>
  //   </div>`);
  //   deleteBtnListener();
  //   completeBtnListener();
  // });
  console.log('We are ready.');
  // form submission for new items
  $('form.item').submit(formSubmissionHandler);

});

// handler for the new tweet form
const formSubmissionHandler = function(event) {
  event.preventDefault();

  // get the item text from the form
  const item = $('input').val();
  // console.log(item);

  // if the form is empty, error
  if (!item) {
    $('.error-text').text('Can\'t be blank!').show().fadeOut(1500);
    return;
  }

  // if item text is too long, show error
  if (item.length > 140) {
    $('.error-text').text('That\'s way too long!').show().fadeOut(1500);
    return;
  }

  // create a list element
  const $newItem = $(`<li>${item}</li>`);
  // move the item to the pending area
  $('.pending>ul').append($newItem);

  // POST the item to the server using AJAX
  $.post('/items/', $(this).serialize())
  .then(function(data){
    console.log(data);
    console.log('item:',item);
    // we now have the catagory from the server
    // add the element to the correct list
    console.log('element text:',$newItem.text());
    $newItem.remove();
    $(`.id-${data.category_id}>ul`).append($newItem);
  });

  // clear the form
  $('input').val('');
};




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
