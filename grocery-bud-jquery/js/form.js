import { handleFormSubmit } from "./app.js";

export function initializeForm() {
  const $addBtn = $('#add-btn');
  const $inputBox = $('#grocery-input');
  
  if (!$addBtn.length || !$inputBox.length) return;
  
  $addBtn.on('click', () => {
    handleFormSubmit($inputBox.val().trim());
    if (!$addBtn.text().includes('Update')) {
      $inputBox.val(''); // Only clear if not in edit mode
    }
    $inputBox.focus(); // Keep focus on input
  });

}