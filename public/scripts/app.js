let itemPriorityClass = ''
let itemPriorityDiv = '';

$(() => {
  // Dark mode
  checkDarkMode();
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

// checks user's localstorage to enable or disable dark mode
const checkDarkMode = () => {
  const $varElem = $('html').get(0).style;
  const isDarkOn = localStorage.getItem('darkMode') === 'enabled';

  isDarkOn ? enableDarkMode($varElem) : disableDarkMode($varElem);
};

const darkModeToggle = function() {
  const $varElem = $('html').get(0).style;
  const isDark = $('#dark-switch').attr('class') === 'dark';

  isDark ? disableDarkMode($varElem) : enableDarkMode($varElem);
};

const enableDarkMode = $elem => {
  $elem.setProperty('--leftColor', '#1f1f1f');
  $elem.setProperty('--rightColor', '#e69a2a');
  $elem.setProperty('--rightColorDark', '#e69a2a');
  $elem.setProperty('--textColor', 'rgb(177, 177, 177)');
  $elem.setProperty('--altTextColor', 'rgba(179, 179, 179, 0.932)');
  $elem.setProperty('--altTextColorLight', '#e6e6e6');
  $elem.setProperty('--altTextColorSuperLight', '#e6e6e6');
  $elem.setProperty('--cardColor', '#2C303A');
  $elem.setProperty('--errorTextColor', 'rgb(255, 255, 255)');
  $('#logo').attr('src', 'https://see.fontimg.com/api/renderfont4/w1l49/eyJyIjoiZnMiLCJoIjo2NCwidyI6MjAwMCwiZnMiOjMyLCJmZ2MiOiIjRkZDODBDIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/Tm90U29TbWFydA/marshmallow-personal-use-regular.png');
  $('#dark-switch').addClass('dark').children('button').html('Light');
  $('body').css('background', 'var(--leftColor)');
  $('body').css('background-image', 'none');
  localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = $elem => {
  $elem.setProperty('--leftColor', '#e2c35d');
  $elem.setProperty('--rightColor', '#da785d');
  $elem.setProperty('--rightColorDark', '#c74f2e');
  $elem.setProperty('--textColor', 'white');
  $elem.setProperty('--altTextColor', 'rgba(95, 95, 95, 0.932)');
  $elem.setProperty('--altTextColorLight', '#919191');
  $elem.setProperty('--altTextColorSuperLight', '#c4c4c4');
  $elem.setProperty('--cardColor', 'white');
  $elem.setProperty('--errorTextColor', 'rgb(255, 78, 78)');
  $('#logo').attr('src', 'https://see.fontimg.com/api/renderfont4/w1l49/eyJyIjoiZnMiLCJoIjo2NCwidyI6MjAwMCwiZnMiOjMyLCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/Tm90U29TbWFydA/marshmallow-personal-use-regular.png');
  $('#dark-switch').removeClass('dark').children('button').html('Dark');
  $('body').css('background', 'none');
  $('body').css('background-image', 'linear-gradient(135deg, var(--leftColor), var(--rightColor))');
  localStorage.setItem('darkMode', null);
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

        // highlights done list when item is moved
        const $doneTitle = $($listItem.parents('.todo-list').siblings()[2]); //1 for mobile
        $doneTitle.addClass("highlight");
        setTimeout(()=>{
          $doneTitle.removeClass("highlight");
        }, 1500)

        // adds the item in order it was completed regardless of priority;
        $listItem.detach().prependTo(`.id-${categoryId} .done-list`);
        $listItem.addClass('completed');
        $listItem.find('.complete-btn').removeClass('far').addClass('fas');
      } else {

        // highlights list title when item is moved back to the main spot
        const $listTitle = $($(`.id-${categoryId}`).children()[0]); //1 for mobile
        $listTitle.addClass("highlight");
        setTimeout(()=>{
          $listTitle.removeClass("highlight");
        }, 1500)

        addAfterPriority(categoryId, $listItem)
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

  if(easterEgg(item)) return;

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
      <li class="${itemPriorityClass} highlight" id="item-id-${data.id}">
        <button><i class="complete-btn far fa-circle"></i></button>
        <span>${itemPriorityDiv}${data.name}</span>
        <div class="details-btn-container"><button class="details-btn fas fa-ellipsis-h"></button></div>
      </li>`);

    $pendingNewItem.remove();

    addAfterPriority(data.category_id, $itemToList)

    // removes highlight so that toggle up on done
    setTimeout(()=>{
      $itemToList.removeClass("highlight");
    }, 1500)

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
  // determine if mobile based on visibility of the footer
  const mobile = $('.main-footer').css('display') === 'none';

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

      // set the dropdown value to match the list that is showing
      $(list).children('form').children('select').val(listID);
    } else {
      $(list).css('display', 'none');
    }
  }
};

const easterEgg = string => {
  const codeWords = ['Hosam Dahrooge', 'Connie Ho', 'Sydney Sisco', 'Thank you!'];

  if(!codeWords.includes(string)) {
    return false;
  }

  if(string === 'Thank you!') {
    window.location.replace("/thankyou");
  }

  if (codeWords.includes(string)) {
    const $elements = $( `p:contains("${string}")` );
    console.log($elements);
    $($elements[0]).parent().addClass("highlight");
       setTimeout(()=>{
        $($elements[0]).parent().removeClass("highlight");
       }, 2000);
    return true;
  }
  return false;
};
