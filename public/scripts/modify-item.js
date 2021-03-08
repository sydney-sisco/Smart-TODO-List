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
    $(`${itemId}`).text(`${data.name}`)
    console.log(data)
  })
}

$(() => {
  $(`${itemId}`).on('submit', updateItemNameHandler)

})
