$(() => {
  console.log('Document ready.');

  // call the resize handler when the page loads to draw the correct lists
  resizeHandler();

  // load existing items from the database
  loadItems();

  // form submission for new items
  $('form.item').submit(formSubmissionHandler);

  // Done list hide/show functionality
  $('.done-list').hide();
  $('.completed-title').click(doneListToggle);

  // mobile dropdown listener
  $('select').change(listSwitcherHander);

  // listen for resize events to switch layout
  $(window).resize(resizeHandler);
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


// Uses AJAX to fetch items from the server
const loadItems = () => {
  $.get('/items/')
  .then((items) => {
    for (item of items) {
      // create a list element
      const $newItem = $(`<li><button><i class="complete-btn far fa-circle"></i></button><span id="item-id-${item.id}">${item.name}</span><button><i class="details-btn fas fa-info"></i></button></li>`);

      // add item to the correct list
      $newItem.prependTo($(`.id-${item.category_id} .todo-list`));
    }
  });
};

// handler for the new item form
const formSubmissionHandler = function(event) {
  event.preventDefault();

  // trim the input before evaluating it
  $('input').val($.trim($('input').val()));

  // get the item text from the form
  const item = $('input').val();

  // if the form is empty, error
  if (!item) {
    $('main header h2').text('Can\'t be blank!');
    $('main header h2').addClass('error');
    return;
  }

  // if item text is too long, show error
  if (item.length > 99) {
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
    const $itemToList = $(`<li><button><i class="complete-btn far fa-circle"></i></button><span>${data.name}</span><button><i class="details-btn fas fa-info"></i></button></li>`);
    $newItem.remove();
    // we now have the catagory from the server
    // add the element to the correct list
    $itemToList.prependTo($(`.id-${data.category_id} .todo-list`));
  });

  // clear the form
  $('input').val('');
};

// called when the list switcher is used
const listSwitcherHander = (event) => {
  const listID = $(event.target).val();
  showList(listID);
};

// called when the page is resized
const resizeHandler = () => {
  // determine if mobile based on visibility of the dropdown
  const mobile = $('form.list-switcher').css('display') === 'block';

  if(mobile) {
    // get the current value from  the dropdown
    const listID = $( ".list-switcher option:selected" ).val();
    showList(listID);
  } else {
    // desktop
    // loop through the list-card elements and show all
    const lists = $('.list-card')
    for (list of lists) {
      $(list).css('display', 'flex')
    }
  }
};

// show a specific list on mobile
const showList = (listID) => {
  // get an array of list-card elements
  const lists = $('.list-card')

  // loop through lists, show selected and hide the rest
  for (list of lists) {
    const classArr = $(list).attr("class").split(/\s+/);

    if (classArr.includes(`id-${listID}`)) {
      $(list).css('display', 'flex');
    } else {
      $(list).css('display', 'none');
    }
  }
};
