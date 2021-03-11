let itemId = null;
let num = null;
let newCat = null;
let highPriority = false;

const updateItemNameHandler = function(e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    method: 'PATCH',
    url: `/items/${num}`,
    data
  })
  .then(data => {
    $(`#${itemId} span`).html(`${data.priority? `<span class="fas fa-exclamation"></span>${data.name}`: data.name}`)
    $('#mod-items-wrapper').remove();
    $('.body-container').css('filter','blur(0px)')
  })
}

const changePriorityHandler = function(e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    method: 'PATCH',
    url: `/items/${num}`,
    data: `priority=${highPriority}`
  })
  .then(data => {
    const itemHTMLelem = $(`#${itemId}`);

    if(data.priority & !itemHTMLelem.hasClass("priority")){
      // adds the priority class if priority is set to high and class does not exist already
      $(`#${itemId} span`).html(`<span class="fas fa-exclamation"></span>${data.name}`)
      itemHTMLelem.addClass("priority");
      itemHTMLelem.detach().prependTo($(`.id-${data.category_id}>ul`))

    } else if (!data.priority & itemHTMLelem.hasClass("priority")){
      $(`#${itemId} span`).html(`${data.name}`)
      itemHTMLelem.removeClass("priority");
      itemHTMLelem.detach().appendTo($(`.id-${data.category_id}>ul`))
    }

    $('#mod-items-wrapper').remove();
    $('.body-container').css('filter','blur(0px)')
  })
}

const updateCategoryHandler = function(e) {
  e.preventDefault();
  $.ajax({
    method: 'PATCH',
    url: `/items/${num}`,
    data: `category_id=${newCat}`
  })
  .then(data => {
    $('#mod-items-wrapper').remove();
    $('.body-container').css('filter','blur(0px)')
    const $itemToMove = $(`#${itemId}`)
    $itemToMove.detach()
    addAfterPriority(data.category_id, $itemToMove)
  })
}

const deleteItemHandler = function(e) {
  e.preventDefault();
  $.ajax({
    method: 'DELETE',
    url: `/items/${num}`,
  })
  .then(data => {
    $('#mod-items-wrapper').remove();
    $('.body-container').css('filter','blur(0px)')
    $(`#${itemId}`).remove()
  })
}

$(() => {

  $(document).on('click','.details-btn',function(e) {
    const $parentCard = $(this).parents('.list-card');
    const classesStr = $parentCard.attr('class');
    const strSplit = classesStr.split('list-card id-')[1];
    const categoryId = Number(strSplit);
    itemId = $(this).parent().parent()[0].id;
    num = itemId.split('item-id-')[1];
    const itemName = $(this).parents('li').text()

    $('body').append(`
    <div id="mod-items-wrapper" class="mod-items-wrapper card">
    <div id="modify-item-form" class="card-body">
      <h3 class="card-title">${itemName}</h3>
      <div>
        <button class="submit-btn" id="edit-item-toggle" type="submit">Edit</button>
      </div>

      <div>
        <form id="edit-item-form" method="PATCH" action="/items/${num}">
          <input type="text" name="name" placeholder="New Item Name"></input>
          <button class="submit-btn" form="edit-item-form" type="submit">Update</button>
        </form>
      </div>

      <div>
        <form id="delete-item-form" method="DELETE" action="/items/${num}"></form>
          <button class="submit-btn" form="delete-item-form" type="submit">Delete</button>
        </form>
      </div>

      <div class="dropdown mod-dropdown" id="change-cat-form">
        <button class="submit-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Change Categories
        </button>
        <div class="dropdown-menu mod-dropdown-menu" aria-labelledby="dropdownMenuButton">
          <form class="" id="change-to-watch" method="PATCH" action="/items/${num}"">
            <input type="hidden" name="category_id" value="1"></input>
            <button class="submit-btn" form="change-to-watch" type="submit">Watch</button>
          </form>
          <form class="" id="change-to-eat" method="PATCH" action="/items/${num}"">
            <input type="hidden" name="category_id" value="2"></input>
            <button class="submit-btn" form="change-to-eat" type="submit">Eat</button>
          </form>
          <form class="" id="change-to-read" method="PATCH" action="/items/${num}"">
            <input type="hidden" name="category_id" value="3"></input>
            <button class="submit-btn" form="change-to-read" type="submit">Read</button>
          </form>
          <form class="" id="change-to-buy" method="PATCH" action="/items/${num}"">
            <input type="hidden" name="category_id" value="4"></input>
            <button class="submit-btn" form="change-to-buy" type="submit">Buy</button>
          </form>
          <form class="" id="change-to-general" method="PATCH" action="/items/${num}"">
            <input type="hidden" name="category_id" value="5"></input>
            <button class="submit-btn" form="change-to-general" type="submit">General</button>
          </form>
        </div>
      </div>


      <div class="dropdown mod-dropdown" id="change-priority-form">
        <button class="submit-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Set Priority
        </button>
        <div class="dropdown-menu mod-dropdown-menu" aria-labelledby="dropdownMenuButton">
          <form class="" id="change-to-high" method="PATCH" action="/items/${num}"">
            <input type="hidden" name="category_id" value="true"></input>
            <button class="submit-btn" form="change-to-high" type="submit">High</button>
          </form>
          <form class="" id="change-to-low" method="PATCH" action="/items/${num}"">
            <input type="hidden" name="category_id" value="false"></input>
            <button class="submit-btn" form="change-to-low" type="submit">Low</button>
          </form>
        </div>
      </div>

      <div>
        <form id="cancel-modify">
          <button type="submit" form="cancel-modify" class="cancel-btn far fa-window-close"></button>
        </form>
      </div>
      <hr>
      <div id='extra-details'>Retrieving more details<i class="loader fas fa-spinner"></i></div>

    </div>
  </div>
    `);

    //  clicking out of the form will exit
    $('body').click(function(e) {
      if (!$(e.target).closest("#mod-items-wrapper").length){
          $("#mod-items-wrapper").remove();
          $('.body-container').css('filter','blur(0px)')
      }
    });


    $('#edit-item-form').hide()
    $('.body-container').css('filter','blur(1rem)')

    // TODO: add the other functions from the other apis.
    $.ajax({
      url: `/details/${num}`,
      timeout: 10000 // in milliseconds
    }).then(data => {
      console.log('data returned from server:', data);
      if (categoryId === 1) watchDetailStructure(data);
      if (categoryId === 2) eatDetailStructure(data);
      if (categoryId === 3) readDetailStructure(data);
      if (categoryId === 4) buyDetailStructure(data);
      if (categoryId === 5) generalDetailStructure(data);
    }).catch(err => {
      console.log('catch:',err);
      const $failHtml = `<p>Could not retrieve relevant details!</p>`;
      $('#extra-details').html($failHtml);
      console.log('GET error for extra details', err);
    });
  });


  // Cancelling as normal will exit too
  $(document).on('submit','#cancel-modify', (e)=>{
    e.preventDefault();
    $('.body-container').css('filter','blur(0px)')
    $('#mod-items-wrapper').remove();
  })


  // edit animation and functionality
  $('#edit-item-form').hide();
  $(document).on('click', '#edit-item-toggle', (e)=>{
    $('#edit-item-form').slideToggle();
  })

  //edit item name and delete item submit forms
  $(document).on('submit','#edit-item-form', updateItemNameHandler)
  $(document).on('submit','#delete-item-form', deleteItemHandler)

  // change categories depending which drop down is selected
  $(document).on('submit','#change-to-watch', (e) => {
    newCat = 1;
    updateCategoryHandler(e)
  })
  $(document).on('submit','#change-to-eat', (e) => {
    newCat = 2;
    updateCategoryHandler(e)
  })
  $(document).on('submit','#change-to-read', (e) => {
    newCat = 3;
    updateCategoryHandler(e)
  })
  $(document).on('submit','#change-to-buy', (e) => {
    newCat = 4;
    updateCategoryHandler(e)
  })
  $(document).on('submit','#change-to-general', (e) => {
    newCat = 5;
    updateCategoryHandler(e)
  })

  // change priorities depending on if high or low is selected
  $(document).on('submit','#change-to-low', (e) => {
    highPriority = false;
    changePriorityHandler(e)
  })
  $(document).on('submit','#change-to-high', (e) => {
    highPriority = true;
    changePriorityHandler(e)
  })

})

const readDetailStructure = bookInfo => {
  const authorStr = bookInfo.authors.join(", ");
  const categoriesStr = bookInfo.categories.join(", ");
  let $buyHtml = '';

  if (bookInfo.thumbnail) $buyHtml += `<img src="${bookInfo.thumbnail}">`;
  if (bookInfo.title) $buyHtml += `<p>Title: ${bookInfo.title}</p>`;
  if (bookInfo.subtitle) $buyHtml += `<p>Subtitle: ${bookInfo.subtitle}</p>`;
  if (bookInfo.authors) $buyHtml += `<p>Authors: ${authorStr}</p>`;
  if (bookInfo.categories) $buyHtml += `<p>Categories: ${categoriesStr}</p>`;
  if (bookInfo.link) $buyHtml += `<p>Read a sample preview <a target="_blank" href='${bookInfo.link}'>here</a></p>`;

  $('#extra-details').html($buyHtml);
};

const eatDetailStructure = itemInfo => {
  // remove spinner from details area
  $('#extra-details').empty();

  // build html for details
  let eatHTML = '';

  if(!itemInfo) {
    eatHTML = `<p>Could not retrieve relevant details!</p>`;
  } else {
    // add class for correct styling
    $('#extra-details').addClass('watch');

    if(itemInfo.url && itemInfo.thumbnail) eatHTML += `<a href="${itemInfo.url}" target="_blank" ><img src="${itemInfo.thumbnail}"/></a>`;
    if(itemInfo.name){
      eatHTML += `<div id="details">`;
      eatHTML += `<p>${itemInfo.name}</p>`;
      if(itemInfo.rating) eatHTML += `<p>${itemInfo.rating}/5⭐️</p>`;
      if(itemInfo.distance) eatHTML += `<p>Distance: ${Math.round((itemInfo.distance / 1000) * 10) / 10} km</p>`;
      if(itemInfo.url) eatHTML += `<a href="${itemInfo.url}" target="_blank" >More details...</a>`;
      eatHTML += `</div>`;
    }
  }

  // add html to container div
  $('#extra-details').html(eatHTML);
};

const watchDetailStructure = itemInfo => {
  // remove spinner from details area
  $('#extra-details').empty();

  let watchHTML = '';

  if(!itemInfo || !itemInfo.title) {
    watchHTML = `<p>Could not retrieve relevant details!</p>`;
    $('#extra-details').html(watchHTML);
    return;
  }

  // add class for correct styling
  $('#extra-details').addClass('watch');

  // build html for details
  if(itemInfo.thumbnail && itemInfo.url) watchHTML += `<a href="${itemInfo.url}" target="_blank" ><img src="${itemInfo.thumbnail}"/></a>`;
  watchHTML += `<div id="details">`;
  watchHTML += `<p>${itemInfo.title}</p>`;
  if(itemInfo.year) watchHTML += `<p>${itemInfo.year}</p>`;
  if(itemInfo.rating) watchHTML += `<p>${itemInfo.rating}/100⭐️</p>`;
  if (itemInfo.url) watchHTML += `<a href="${itemInfo.url}" target="_blank" >More details...</a>`;
  watchHTML += `</div>`;

  // add html to container div
  $('#extra-details').html(watchHTML);
};

const buyDetailStructure = productInfo => {
  let $readHtml = '';

  if (productInfo.thumbnail) $readHtml += `<img src="${productInfo.thumbnail}">`;
  if (productInfo.title) $readHtml += `<p>Title: ${productInfo.title}</p>`;
  if (productInfo.price) $readHtml += `<p>Price: ${productInfo.price}</p>`;
  if (productInfo.rating) $readHtml += `<p>Rating: ${productInfo.rating}/5 ⭐️</p>`;
  if (productInfo.link) $readHtml += `<p>Amazon.ca: <a target="_blank" href='${productInfo.link}'>View here</a></p>`;

  $('#extra-details').html($readHtml);
};

const generalDetailStructure = () => {
  const $generalHtml = `<p>Can not retrieve details!</p>`
  $('#extra-details').html($generalHtml);
};
