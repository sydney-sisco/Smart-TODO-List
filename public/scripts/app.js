$(() => {
  console.log('Document ready.');

  // load existing items from the database
  loadItems();

  // form submission for new items
  $('form.item').submit(formSubmissionHandler);

  // Done list hide/show functionality
  $('.done-list').hide();
  $('.completed-title').click(doneListToggle);

});

const doneListToggle = function() {
  $this = $(this);
  $doneList = $(this).next();
  $todoList = $(this).parent().prev();

  if($this.hasClass('opened')) {
    $todoList.slideDown();
    $doneList.slideUp();
    $this.removeClass('opened');
  } else {
    $todoList.slideUp();
    $doneList.slideDown();
    $this.addClass('opened');
  }
};


const loadItems = () => {
  $.get('/items/')
  .then((items) => {
    // console.log(items);
    // console.log(typeof items);

    for (item of items) {
      // create a list element
      const $newItem = $(`<li><button><i class="complete-btn far fa-circle"></i></button><span>${item.name}</span><button><i class="details-btn fas fa-info"></i></button></li>`);

      // add item to the correct list
      $newItem.prependTo($(`.id-${item.category_id} .todo-list`));
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
    $('.error-text').text('Can\'t be blank!').show().fadeOut(1500);
    return;
  }

  // if item text is too long, show error
  if (item.length > 140) {
    $('.error-text').text('That\'s way too long!').show().fadeOut(1500);
    return;
  }

  // create a list element
  const $newItem = $(`<li><button><i class="complete-btn far fa-circle"></i></button><>span${item}</span><button><i class="details-btn fas fa-info"></i></button></li>`);
  // move the item to the pending area
  $('.pending>ul').append($newItem);

  // POST the item to the server using AJAX
  $.post('/items/', $(this).serialize())
  .then(function(data){
    console.log('response from server:', data);
    // we now have the catagory from the server
    // add the element to the correct list
    $newItem.detach().prependTo($(`.id-${data.category_id} .todo-list`));
  });

  // clear the form
  $('input').val('');
};
