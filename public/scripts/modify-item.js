let itemId = null;
let num = null

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

const completeItemHandler = function(e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    method: 'PATCH',
    url: `/items/${num}`,
    data
  })
  .then(data => {
    $('.mod-items-wrapper').remove();
    $('.body-container').css('filter','blur(0px)')
    console.log(`marked as done! need to move to completed section`)
  })
}

const updateCategoryHandler = function(e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    method: 'PATCH',
    url: `/items/${num}`,
    data
  })
  .then(data => {
    $('.mod-items-wrapper').remove();
    $('.body-container').css('filter','blur(0px)')
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
    <div class="mod-items-wrapper">
    <div id="modify-item-form">
    <div>
      <form id="edit-item-form" method="PATCH" action="/items/${num}">
        <input type="text" name="name" placeholder="Click & Type to Update"></input>
        <button form="edit-item-form" type="submit">EDIT</button>
      </form>
    </div>
    <div>
      <form id="delete-item-form" method="DELETE" action="/items/${num}"">
        <label for="DELETE ME">DELETE ME</label>
        <button form="delete-item-form" type="submit">DELETE</button>
      </form>
    </div>
    <div>
      <form id="change-cat-form" method="PATCH" action="/items/${num}"">
        <div class="dropdown">
          <a class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Change Categories
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" name="1" href="#">Watch</a>
            <a class="dropdown-item" name="2" href="#">Eat</a>
            <a class="dropdown-item" name="3" href="#">Read</a>
            <a class="dropdown-item" name="4" href="#">Buy</a>
            <a class="dropdown-item" name="5" href="#">General</a>
          </div>
        </div>
        <input type="text" name="category_id" placeholder="CATEGORY ID BUT WILL BE A DROP DOWN LATER"></input>
        <button form="change-cat-form" type="submit">CHANGE</button>
      </form>
    </div>
    <form id="cancel-modify">
      <button form="cancel-modify">Cancel</button>
    </form>
    </div>
    </div>
    `);

    $('.body-container').css('filter','blur(5px)')

    // clicking out of the form will exit
    $('.body-container').click(e => {
      e.preventDefault();
      $('.mod-items-wrapper').remove();
      $('.body-container').css('filter','blur(0px)')
    })

  });

  $(document).on('submit','#edit-item-form', updateItemNameHandler)
  $(document).on('submit','#delete-item-form', deleteItemHandler)
  $(document).on('submit','#change-cat-form', updateCategoryHandler)
  $(document).on('submit','#cancel-modify', (e)=>{
    e.preventDefault();
    $('.body-container').css('filter','blur(0px)')
    $('.mod-items-wrapper').remove();
  })
})
