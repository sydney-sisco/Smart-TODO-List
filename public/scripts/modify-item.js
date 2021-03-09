let itemId = null;
let num = null;
let newCat = null;

const updateItemNameHandler = function(e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    method: 'PATCH',
    url: `/items/${num}`,
    data
  })
  .then(data => {
    $(`#${itemId} span`).text(`${data.name}`)
    $('.mod-items-wrapper').remove();
    $('.body-container').css('filter','blur(0px)')
    console.log(data)
  })
}

// const completeItemHandler = function(e) {
//   e.preventDefault();
//   const data = $(this).serialize();
//   $.ajax({
//     method: 'PATCH',
//     url: `/items/${num}`,
//     data
//   })
//   .then(data => {
//     $('.mod-items-wrapper').remove();
//     $('.body-container').css('filter','blur(0px)')
//     console.log(`marked as done! need to move to completed section`)
//   })
// }

const updateCategoryHandler = function(e) {
  e.preventDefault();
  // const data = $(this).serialize();
  // console.log(data)
  $.ajax({
    method: 'PATCH',
    url: `/items/${num}`,
    data: `category_id=${newCat}`
  })
  .then(data => {
    $('.mod-items-wrapper').remove();
    $('.body-container').css('filter','blur(0px)')
    console.log('in here')
    $(`#${itemId}`).detach().appendTo($(`.id-${data.category_id}>ul`))
  })
}

const deleteItemHandler = function(e) {
  e.preventDefault();
  console.log('in this handler')
  $.ajax({
    method: 'DELETE',
    url: `/items/${num}`,
  })
  .then(data => {
    $('.mod-items-wrapper').remove();
    $('.body-container').css('filter','blur(0px)')
    $(`#${itemId}`).remove()
  })
}

$(() => {

  $(document).on('click','.details-btn',function(e) {
    itemId = $(this).parent().parent()[0].id
    num = itemId.split('item-id-')[1]

    $('body').append(`
    <div class="mod-items-wrapper card">
    <div id="modify-item-form" class="card-body">
      <h3 class="card-title">Item Name</h3>
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

      <div>
        <form id="cancel-modify">
          <button type="submit" form="cancel-modify" class="cancel-btn far fa-window-close"></button>
        </form>
      </div>
      <hr>
      <p> Placeholder for details</p>

    </div>
  </div>
    `);

    $('#edit-item-form').hide()


    $('.body-container').css('filter','blur(1rem)')

    // clicking out of the form will exit
    $('.body-container').click(e => {
      e.preventDefault();
      $('.mod-items-wrapper').remove();
      $('.body-container').css('filter','blur(0px)')
    })
  });

  // Cancelling as normal will exit too
  $(document).on('submit','#cancel-modify', (e)=>{
    e.preventDefault();
    $('.body-container').css('filter','blur(0px)')
    $('.mod-items-wrapper').remove();
  })


  // edit animation and functionality
  $('#edit-item-form').hide();
  $(document).on('click', '#edit-item-toggle', (e)=>{
    $('#edit-item-form').slideToggle();
  })

  $(document).on('submit','#edit-item-form', updateItemNameHandler)
  $(document).on('submit','#delete-item-form', deleteItemHandler)


  // change categories depending which drop down is selected and update styling

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



})
