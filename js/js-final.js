//JS for final JS Project (To-do List)
//Version 1.6

// Gets the document ready!
$(document).ready (function(){

  //Clears the to-do item and moves it to "completed" when checkbox is clicked
  $(document).on( "click" , ".checkbox-new input" , function (e){

      //Gets the to-do list item input value
      var $newItemInput = $(this).closest(".todo-row").find ("input[type=text]").val();

      //Gets the whole row that contains "this" checkbox
      var $newItemParent = $(this).closest(".todo-row");

      //Gets the checkbox
      var $checkedInput = $(this).closest(".todo-row").find ("input[type=checkbox]")

      //HTML code to be appended to the "completed" section
      var $checkedItemDiv =  $ (`<div class="container-fluid todo-new-container">
                                  <div class="todo-row row">
                                    <div class="checkbox col-1"><input type="checkbox" name="" value="" class="checkbox1" checked="checked"/> </div>
                                    <div class="todo-item complete-item col-10">  <input type="text" name="" value="`+ $newItemInput +`" placeholder="" class="todo-input" /></div>
                                    <div class="todo-delete col-1"></div>
                                  </div>
                                </div>`);

      if ( $checkedInput.is(":checked") && $newItemInput !="")  {

        //fades out the completed item
        $newItemParent.hide(1000);

        //puts the value of completed item in the "completed" section
        $("#todo-completed-items").append($checkedItemDiv);

      } else {
          alert("It's empty of anything to do...");
          e.preventDefault();
      }
  });

  // Moves completed item back to "to do" if unchecked
  $(document).on( "click" , "#todo-completed-items .checkbox input" , function (e){

      //Gets the to-do list item input value
      var $uncheckedItemInput = $(this).closest(".todo-row").find ("input[type=text]").val();

      //Gets the whole row that contains "this" checkbox
      var $newItemParent = $(this).closest(".todo-row");

      //Gets the checkbox
      var $checkedInputCompleted = $(this).closest(".todo-row").find ("input[type=checkbox]")

      //HTML code to be put to the top of the list
      var $unclickedItemDiv = $(`<li><div class="container-fluid todo-new-container">
                                    <div class="todo-row row">
                                      <div class="checkbox checkbox-new col-1"><input type="checkbox" name="" value="" class="checkbox1"/> </div>
                                      <div class="todo-item new-item col-10">  <input type="text" name="" value="` + $uncheckedItemInput + ` " class="todo-input" /></div>
                                      <div class="todo-delete col-1"></div>
                                    </div>
                                  </div></li>`);


      if (!$checkedInputCompleted.is(":checked")) {

          //This fades out the current row
          $newItemParent.hide (1000);

          //Puts the value of unclicked "completed item" back into "to do list"
          $("#sortable").prepend($unclickedItemDiv);

      } else {
        e.preventDefault();
      }
  });

  //Adds a new to-do item by creating a new to-do-item line below
  //When new text is entered into a field, as soon as it's not empty, a new line is created. It must start out empty.
  $(document).on("keypress" , ".todo-input" , function  (){

      //Gets the value of the input field
      var newInputField = $(this).val();

      //HTML for the new row
      var $newItemDiv = $(`  <li><div class="container-fluid todo-new-container">
                        <div class="todo-row row">
                          <div class="checkbox checkbox-new col-1"><input type="checkbox" name="" value="" class="checkbox1"/> </div>
                          <div class="todo-item new-item col-10">  <input type="text" name="" value="" placeholder="+ add new item" class="todo-input" /></div>
                          <div class="todo-delete col-1"></div>
                        </div>
                      </div>
                      </li>`);

      //when the new field isn't blank, a new row is appended to "todo-new-items"
      if (newInputField === "" ) {
        $("#sortable").append($newItemDiv);
      }
  });

  //Adds a new to-do item when the "add new item" button is clicked
  $("button.add-new").click ( function(){

    //HTML for the new row
    var $newItemDiv = $(`<li><div class="container-fluid todo-new-container">
                      <div class="todo-row row">
                        <div class="checkbox checkbox-new col-1"><input type="checkbox" name="" value="" class="checkbox1"/> </div>
                        <div class="todo-item new-item col-10">  <input type="text" name="" value="" placeholder="+ add new item" class="todo-input" /></div>
                        <div class="todo-delete col-1"></div>
                      </div>
                    </div>
                    </li>`);

    //HTML is added immediately before the closing </ul> tag
    $("#sortable").append ($newItemDiv);
  });

  //Shows the delete icon when to-do item is hovered, and deletes item if clicked on, yikes!
  $(document).on("mouseover" , ".todo-row" , function (e){

      //Gets the delete button from "this" row and shows it
      var $deleteButton = $(this).find (".todo-delete");
      $deleteButton.show();

      //When delete button is clicked, its containing row is removed completely
      $deleteButton.click (function(){
        $(this).closest (".todo-row").remove ();
      });
  });

  //Hides the delete icon when to-do item is not hovered
  $(document).on("mouseout" , ".todo-row" , function (e){

      //Gets the delete button from this rows
      var $deleteButton = $(this).find (".todo-delete");
      $deleteButton.hide();
  });

  //  Deletes all the completed Items
  $(".clear-completed").click( function (){
      $("#todo-completed-items .todo-row").slideUp(1000, function (){
          $("#todo-completed-items .todo-row").remove();
      });
  });

  // Sorts the list! This is a plugin from jQuery UI
  $( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  });

});
