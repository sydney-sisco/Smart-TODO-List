let itemPriorityClass = ''
let itemPriorityDiv = '';

$(() => {
  // dark mode button listener
  $('#dark-switch').on('click', darkModeToggle);

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

const darkModeToggle = function() {
  const $varElem = $('html').get(0).style;
  const isDark = $('#dark-switch').attr('class') === 'dark';
  console.log(isDark);
  if (isDark) {
    $varElem.setProperty('--leftColor', '#e2c35d');
    $varElem.setProperty('--rightColor', '#da785d');
    $varElem.setProperty('--rightColorDark', '#c74f2e');
    $varElem.setProperty('--textColor', 'white');
    $varElem.setProperty('--altTextColor', 'rgba(95, 95, 95, 0.932)');
    $varElem.setProperty('--altTextColorLight', '#919191');
    $varElem.setProperty('--altTextColorSuperLight', '#c4c4c4');
    $varElem.setProperty('--cardColor', 'white');
    $varElem.setProperty('--errorTextColor', 'rgb(255, 78, 78)');
    $('#dark-switch').removeClass('dark');
    $('body').css('background', 'none');
    $('body').css('background-image', 'linear-gradient(135deg, var(--leftColor), var(--rightColor))');
  } else {
    $varElem.setProperty('--leftColor', '#1f1f1f');
    $varElem.setProperty('--rightColor', '#e69a2a');
    $varElem.setProperty('--rightColorDark', '#b87616');
    $varElem.setProperty('--textColor', 'rgb(177, 177, 177)');
    $varElem.setProperty('--altTextColor', 'rgba(179, 179, 179, 0.932)');
    $varElem.setProperty('--altTextColorLight', '#e6e6e6');
    $varElem.setProperty('--altTextColorSuperLight', '#e6e6e6');
    $varElem.setProperty('--cardColor', '#2C303A');
    $varElem.setProperty('--errorTextColor', 'rgb(255, 255, 255)');
    $('#dark-switch').addClass('dark');
    $('body').css('background', 'var(--leftColor)');
    $('body').css('background-image', 'none');
  }
};

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

      if(item.priority){
        itemPriorityClass = "priority"
        itemPriorityDiv = '<span class="fas fa-exclamation"></span>'
      } else {
        itemPriorityClass = ""
        itemPriorityDiv = ""
      }

      if (item.done) {
        const $doneItem = $(`
        <li class="${itemPriorityClass} completed" id="item-id-${item.id}" >
          <button><i class="complete-btn fas fa-circle"></i></button>
          <span>${itemPriorityDiv}${item.name}</span>
          <div class="details-btn-circle"><button class="details-btn fas fa-ellipsis-h"></button></div>
        </li>`);
        $doneItem.prependTo($(`.id-${item.category_id} .done-list`));
      } else {
        const $newItem = $(`
        <li class="${itemPriorityClass}" id="item-id-${item.id}"><button>
          <i class="complete-btn far fa-circle"></i></button>
          <span>${itemPriorityDiv}${item.name}</span>
          <div class="details-btn-container"><button class="details-btn fas fa-ellipsis-h"></button></div>
        </li>`);

        addAfterPriority(item.category_id, $newItem)
        // $newItem.prependTo($(`.id-${item.category_id} .todo-list`));
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

const escape =  str => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// handler for the new item form
const formSubmissionHandler = function(event) {
  event.preventDefault();

  // get the item text from the form
  const item = escape($('input').val().trim());

  // error conditionals
  if (!item) {
    $('main header h2').hide().fadeIn(200).html('Input can\'t be blank!');
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

    if(data.priority){
      itemPriorityClass = "priority"
      itemPriorityDiv = '<span class="fas fa-exclamation"></span>'
    } else {
      itemPriorityClass = ""
      itemPriorityDiv = ""
    }

    const $itemToList = $(`
      <li class="${itemPriorityClass}" id="item-id-${data.id}">
        <button><i class="complete-btn far fa-circle"></i></button>
        <span>${itemPriorityDiv}${data.name}</span>
        <div class="details-btn-container"><button class="details-btn fas fa-ellipsis-h"></button></div>
      </li>`);

    $pendingNewItem.remove();

    addAfterPriority(data.category_id, $itemToList)

    // Prepend to beginning; uncomment if this priority thing is no good
    // $itemToList.prependTo($(`.id-${data.category_id} .todo-list`));

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
