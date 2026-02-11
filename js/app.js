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

export function addItem(itemName) {
  const $listContainer = $('#list-container');
  if(itemName === '') {
    alert('You must write something!');
    return;
  }
  
  const $li = $('<li>').text(itemName);
  
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
  
  saveList();
  
  setTimeout(() => alert("Item Added Successfully!"), 0);
}


export function toggleChecked($liElement) {
  $liElement.toggleClass('checked');
  saveList();
}

export function removeItem($deleteBtn) {
  $deleteBtn.closest('li').remove();
  saveList();
  
  setTimeout(() => alert("Item Deleted Successfully!"), 0);
}

export function editItem($editBtn) {
  const $li = $editBtn.closest('li');
  const itemText = $li.contents().first().text();
  
  // Enter edit mode
  editMode = true;
  itemToEdit = $li;
  
  // Change input and button in form
  const $inputBox = $('#grocery-input');
  const $addBtn = $('#add-btn');
  
  if ($inputBox.length && $addBtn.length) {
    $inputBox.val(itemText).focus();
    $addBtn.text('Update Item').css('background', '#f39c12'); // Orange color for update
  }
}


export function updateItem(newText) {
  if (!itemToEdit || !editMode) return;
  
  if(newText === '') {
    alert('Item cannot be empty!');
    return;
  }
  
  // Update the text content (first child is text node)
  itemToEdit.contents().first().replaceWith(newText);
  
  // Exit edit mode
  editMode = false;
  itemToEdit = null;
  
  // Reset form
  const $inputBox = $('#grocery-input');
  const $addBtn = $('#add-btn');
  
  if ($inputBox.length && $addBtn.length) {
    $inputBox.val('');
    $addBtn.text('Add Item').css('background', '#27ae60'); // Reset to green
  }
  
  saveList();
  
  setTimeout(() => alert("Item Updated Successfully!"), 0);
}

export function handleFormSubmit(itemText) {
  if (editMode) {
    updateItem(itemText);
  } else {
    addItem(itemText);
  }
}


$(document).ready(() => {
  initializeForm();
  initializeItems();
  loadList();
});