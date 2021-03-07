$(() => {
  console.log('Document ready.');

  // form submission for new items
  $('form.item').submit(formSubmissionHandler);
});

// handler for the new tweet form
const formSubmissionHandler = function(event) {
  event.preventDefault();

  // get the item text from the form
  const item = $('input').val();

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
    console.log('response from server:', data);
    // we now have the catagory from the server
    // add the element to the correct list
    $newItem.detach().appendTo($(`.id-${data.category_id}>ul`));
  });

  // clear the form
  $('input').val('');
};
