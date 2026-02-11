import { initializeForm } from "./form.js";
import { initializeItems } from "./items.js";

function getLocalStorage() {
  const list = localStorage.getItem("groceryList");
  return list ? list : '';
}

function setLocalStorage(htmlContent) {
  localStorage.setItem("groceryList", htmlContent);
}

let listContainerHtml = getLocalStorage();
let editMode = false;
let itemToEdit = null;

function saveList() {
  const $listContainer = $('#list-container');
  if ($listContainer.length) {
    setLocalStorage($listContainer.html());
    listContainerHtml = $listContainer.html();
  }
}

function loadList() {
  const $listContainer = $('#list-container');
  if ($listContainer.length && listContainerHtml) {
    // Parse and fix old items
    const $tempDiv = $('<div>').html(listContainerHtml);
    const $items = $tempDiv.find('li');
    
    // Clear container
    $listContainer.empty();
    
    // Recreate items with proper structure
    $items.each(function() {
      const $item = $(this);
      const text = $item.contents().first().text() || $item.text();
      const isChecked = $item.hasClass('checked');
      
      const $li = $('<li>').text(text);
      if (isChecked) {
        $li.addClass('checked');
      }
      
      // Create buttons container
      const $buttonsSpan = $('<span>').addClass('item-buttons');
      
      // Edit button with ✎ icon
      const $editBtn = $('<span>')
        .addClass('edit-btn')
        .html('✎')
        .attr('title', 'Edit item');
      
      // Delete button with × icon
      const $deleteBtn = $('<span>')
        .addClass('delete-btn')
        .html('×')
        .attr('title', 'Delete item');
      
      $buttonsSpan.append($editBtn, $deleteBtn);
      $li.append($buttonsSpan);
      
      $listContainer.append($li);
    });
    
    // Save the fixed structure
    saveList();
  }
}


$(document).ready(() => {
  initializeForm();
  initializeItems();
  loadList();
});