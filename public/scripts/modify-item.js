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
    $('#modify-item-form').empty();
    $('#modify-item-form').hide();
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
    $('#modify-item-form').empty();
    $('#modify-item-form').hide();
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
    $('#modify-item-form').empty();
    $('#modify-item-form').hide();
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
    $('#modify-item-form').empty();
    $('#modify-item-form').hide();
    $(`#${itemId}`).remove()
  })
}

$(() => {

  $('#modify-item-form').hide();

  $(document).on('click','.details-btn',function(e) {
    itemId = $(this).parent().parent()[0].id
    num = itemId.split('item-id-')[1]
    console.log(itemId)
    console.log(num)
    $('#modify-item-form').append(`
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
        <input type="text" name="category_id" placeholder="CATEGORY ID BUT WILL BE A DROP DOWN LATER"></input>
        <button form="change-cat-form" type="submit">CHANGE</button>
      </form>
    </div>
    <form id="cancel-modify">
      <button form="cancel-modify">Cancel</button>
    </form>
    `);
    $('#modify-item-form').show();
  });

  $(document).on('submit','#edit-item-form', updateItemNameHandler)
  $(document).on('submit','#delete-item-form', deleteItemHandler)
  $(document).on('submit','#change-cat-form', updateCategoryHandler)
  $(document).on('submit','#cancel-modify', (e)=>{
    e.preventDefault();
    $('#modify-item-form').empty();
    $('#modify-item-form').hide();
  })
})
