$(() => {
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
    $todoList.slideDown(300);
    $doneList.slideUp(300);
    $(this).find('i').removeClass('rotate');
    $(this).removeClass('open-border');
    $this.removeClass('opened');
  } else {
    $todoList.slideUp(300);
    $doneList.slideDown(300);
    $(this).find('i').addClass('rotate');
    $(this).addClass('open-border');
    $this.addClass('opened');
  }
};


// Uses AJAX to fetch items from the server
const loadItems = () => {
  $.get('/items/')
  .then((items) => {
    for (const item of items) {
      if (item.done) {
        const $doneItem = $(`<li id="item-id-${item.id}" class='completed'><button><i class="complete-btn fas fa-circle"></i></button><span>${item.name}</span><button><i class="details-btn fas fa-info"></i></button></li>`);

        $doneItem.prependTo($(`.id-${item.category_id} .done-list`));
      } else {
        const $newItem = $(`<li id="item-id-${item.id}"><button><i class="complete-btn far fa-circle"></i></button><span>${item.name}</span><button><i class="details-btn fas fa-info"></i></button></li>`);

        $newItem.prependTo($(`.id-${item.category_id} .todo-list`));
      }
    }
    $('.complete-btn').on('click', completedToggle);
  })
};

const completedToggle = event => {
  const cardClassList = $(event.target).parents('.list-card').attr('class');
  const categoryId = Number(cardClassList.slice(cardClassList.length - 1));
  const elementId = $(event.target).parent().parent().attr('id');
  const itemId = idFinder(elementId);

  $.get(`/items/${itemId}`).then(item => {
    item.done ? item.done = false : item.done = true;
    const data = {
      done: item.done
    };
    $.ajax({
      url: `/items/${itemId}`,
      method: 'PATCH',
      data: data
    }).then(function() {
      $listItem = $(event.target).parent().parent();
      if (item.done) {
        $listItem.detach().prependTo(`.id-${categoryId} .done-list`);
        $listItem.addClass('completed');
        $listItem.find('.complete-btn').removeClass('far').addClass('fas');
      } else {
        $listItem.detach().prependTo(`.id-${categoryId} .todo-list`);
        $listItem.removeClass('completed');
        $listItem.find('.complete-btn').removeClass('fas').addClass('far');
      }
    }).catch(err => console.log('AJAX patch error:', err));
  });
};

// helper to extract ID from element ID
const idFinder = str => {
  let idStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === '-') break;
    idStr = str[i] + idStr;
  }
  return Number(idStr);
};

// handler for the new item form
const formSubmissionHandler = function(event) {
  event.preventDefault();

  // get the item text from the form
  const item = $('input').val().trim();

  // error conditionals
  if (!item) {
    $('main header h2').hide().fadeIn(200).text('Can\'t be blank!');
    $('main header h2').addClass('error');
    return;
  }
  if (item.length > 99) {
    $('main header h2').hide().fadeIn(200).text('That\'s way too long!');
    $('main header h2').addClass('error');
    return;
  }

  // reset error text
  $('main header h2').text('Let\'s get to sorting!');
  $('main header h2').removeClass('error');

  // item sent to pending
  const $pendingNewItem = $(`<li>${item}<i class="loader fas fa-spinner"></i></li>`);
  $('.pending>ul').append($pendingNewItem);

  // POST the item to the server using AJAX
  $.post('/items/', $(this).serialize())
  .then(function(data){
    const $itemToList = $(`<li id="item-id-${data.id}"><button><i class="complete-btn far fa-circle"></i></button><span>${data.name}</span><button><i class="details-btn fas fa-info"></i></button></li>`);

    $pendingNewItem.remove();
    $itemToList.prependTo($(`.id-${data.category_id} .todo-list`));

    // complete btn listener for finished
    $('.complete-btn').on('click', completedToggle);
  });

  // clear the form
  $('input').val('');

  // trigger an input event to update the counter
  $('form.item').trigger('input');
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
