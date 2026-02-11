export function initializeItems() {
  const $listContainer = $('#list-container');
  
  if (!$listContainer.length) return;
  
  // Add event listener for the container using event delegation
  $listContainer    
    .on('click', 'li', function(e) {
      // Check if we clicked on the text (not the buttons)
      if (!$(e.target).hasClass('edit-btn') && !$(e.target).hasClass('delete-btn')) {
        import('./app.js').then(module => {
          module.toggleChecked($(this));
        });
      }
    })
    // Handle delete button click
    .on('click', '.delete-btn', function(e) {
      e.stopPropagation(); // Prevent triggering LI click
      import('./app.js').then(module => {
        module.removeItem($(this));
      });
    })
    // Handle edit button click
    .on('click', '.edit-btn', function(e) {
      e.stopPropagation(); // Prevent triggering LI click
      import('./app.js').then(module => {
        module.editItem($(this));
      });
    });
}