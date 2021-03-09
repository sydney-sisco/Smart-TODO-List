let itemId = '#item-id-3';

const updateItemNameHandler = function(e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    method: 'PATCH',
    url: `/items/3`,
    data
  })
  .then(data => {
    $(itemId).text(`${data.name}`)
    console.log(data)
  })
}

const completeItemHandler = function(e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    method: 'PATCH',
    url: `/items/3`,
    data
  })
  .then(data => {
    console.log(`marked as done! need to move to completed section`)
  })
}

const updateCategoryHandler = function(e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    method: 'PATCH',
    url: `/items/3`,
    data
  })
  .then(data => {
    $(itemId).detach().appendTo($(`.id-${data.category_id}>ul`))
  })
}

const deleteItemHandler = function(e) {
  e.preventDefault();
  $.ajax({
    method: 'DELETE',
    url: `/items/3`,
  })
  .then(data => $(itemId).remove())
}


$(() => {
  $(`${itemId}`).on('submit', updateCategoryHandler)
})
