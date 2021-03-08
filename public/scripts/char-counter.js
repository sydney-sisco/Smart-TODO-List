$(document).ready(function() {
  $('form.item').on('input', function(event) {
    const totalChars = 30;
    const currentChars = $(event.target).val().length
    const remainingChars = totalChars - currentChars;

    // console.log(this);
    // console.log($(this).target.val());
    // console.log($(event.target).val().length);

    // get the element that shows the character count
    const inputCounter = $('#input-counter');

    // turn the counter red if the user has typed too much
    // do this by adding the class 'toolong'
    if (remainingChars < 0) {
      $(inputCounter).addClass('too-long');
    } else {
      $(inputCounter).removeClass('too-long');
    }

    $(inputCounter).text(remainingChars);
  });
});
