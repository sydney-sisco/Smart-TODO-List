$(() => {
  console.log('Document ready.');

  // load existing items from the database
  loadItems();

  // form submission for new items
  $('form.item').submit(formSubmissionHandler);
});


const loadItems = () => {
  $.get('/items/')
  .then((items) => {
    // console.log(items);
    // console.log(typeof items);

    for (item of items) {
      // create a list element
      const $newItem = $(`<li>${item.name}</li>`);

      // add item to the correct list
      $newItem.appendTo($(`.id-${item.category_id}>ul`));
    }
  });
};

// handler for the new tweet form
const formSubmissionHandler = function(event) {
  event.preventDefault();

  // get the item text from the form
  const item = $('input').val();

  // if the form is empty, error
  if (!item) {
    $('main header h2').text('Can\'t be blank!');
    $('main header h2').addClass('error');
    return;
  }

  // if item text is too long, show error
  if (item.length > 30) {
    $('main header h2').text('That\'s way too long!');
    $('main header h2').addClass('error');
    return;
  }

  // reset error text
  $('main header h2').text('Let\'s get to sorting!');
  $('main header h2').removeClass('error');

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
