  /* Formatting function for row details - modify as you need */
  var table = "";
  var initalized = false;
  var criticalFlightData = "";
  const recoveryReactionHeaders = ["...","AB","OS","CS","DX","OPS","MX","ITP","SC","-"];
  const recoveryReactionOptions = {
    "null":"empty-dot", "Yes":"green-dot", "Maybe":"yellow-dot", "No":"red-dot", "Working":"blue-dot", "Accept":"thumbs-up" ,"Decline":"thumbs-down", "ITP":"plane", "SC":"globe"
  };
  const recoveryReactionSelectors = {
    "AB" : ["Yes", "Maybe", "No", "Working"],
    "OS" : ["Yes", "Maybe", "No", "Working", "Accept", "Decline"],
    "CS" : ["Yes", "Maybe", "No", "Working"],
    "DX" : ["Yes", "Maybe", "No", "Working"],
    "OPS" : ["Yes", "Maybe", "No", "Working"],
    "MX" : ["Yes", "Maybe", "No", "Working"],
    "ITP" : ["Yes", "Maybe", "No", "Working","ITP"],
    "SC" : ["Yes", "Maybe", "No", "Working", "SC"],
  }


  function format (rowData) {
      // `d` is the original data object for the row
      return `<div class="container"><div class="row">
                <div class="row"><div class="col-md-9" id="critical_flight_row_${rowData.id}">${getExpandedSection(rowData)}</div></div>
                <br/>
                <div class="container"><div class="row"><div class="col-md-offset-5"><button id="critical_flight_add_recovery-${rowData.id}" data-toggle="modal" data-target="#addRecoveryModal" class="btn btn-default addRecoveryButton">Add</button></div></div></div>
              </div></div>`;
  }

  function actionCableHandle(data){
    if(data.action=="flightcreate"){
      console.log("received");
      console.log(data.content);
      addToCriticalFlightData(data.content);
      console.log("pushed to table");
    }else if(data.action == "removerecovery"){
      console.log("received");
      console.log("deleted");
      console.log(data.content);
      removeRecoveryFromDashboard(data.content);
    }else if(data.action == "addrecovery"){
      console.log("received");
      console.log("addingrecovery");
      console.log(data.content);
      addRecoveryOptionToDashboard(data.content);
    }else if(data.action == "recoveryreaction"){
      console.log("received");
      console.log("recoveryreaction");
      console.log(data.content);
      changeRecoveryReaction(data.content);
    }else{
      console.log("error");
    }
  }


  function removeRecoveryFromDashboard(data){
    console.log(data);
    $(`#${data.critical_flight_id}-${data.recovery_id}-row`).remove();
    criticalFlightData.forEach(cFlight=> {
      if(cFlight.id == data.critical_flight_id){
        console.log(cFlight.recovery);
        i = 0;
        deleteIndex = -1;
        cFlight.recovery.forEach(r=> {
          if(r.id == data.recovery_id){
            deleteIndex = i;
            console.log(`deleteIndex set to: ${deleteIndex}`);
          }
        });
        if(deleteIndex!=-1){
          cFlight.recovery.splice(deleteIndex,1);
        }
        console.log(cFlight.recovery);
      }
    });
  }

  function changeRecoveryReaction(options){
    dropdownitem = $(`#${options.critical_flight_id}-${options.recovery_id}-${options.department}-selectedrecovery`);
    dropdownitem.removeClass();
    dropdownitem.addClass(`glyphicon glyphicon-${getDefaultIcon(options.department, parseInt(options.reaction_number))}`);

    criticalFlightData.forEach(cFlight=> {
      if(cFlight.id == options.critical_flight_id){
        rIndex = -1;
        rIterator = 0;
        cFlight.recovery.forEach(r=> {
          if(r.id == options.recovery_id){
            rIndex = rIterator;
            r[options.department]=options.reaction_number;
          }
          rIterator ++;
        });
        console.log("Found CriticalFlight in dataset");

        // if(rIndex==-1){
        //   cFlight.recovery.push(recoveryItem);
        // }
      }
    });
    if(options.department == "OS"){
      $(`#${options.critical_flight_id}-${options.recovery_id}-osreaction`).html(getOSAcceptContent(options.reaction_number));
    }
  }

  function addRecoveryOptionToDashboard(recoveryItem){
    cFlightRow = $(`#critical_flight_row_${recoveryItem.critical_flight_id}`);
    console.log("CFLIGHT ROW "+ `critical_flight_row_${recoveryItem.critical_flight_id}`);
    console.log($(`#critical_flight_row_${recoveryItem.critical_flight_id}`).html());
    console.log("CHILD");
    console.log($(`#critical_flight_row_${recoveryItem.critical_flight_id}`).find(`#${recoveryItem.critical_flight_id}-${recoveryItem.id}-row`));
    if(cFlightRow.find(`#${recoveryItem.critical_flight_id}-${recoveryItem.id}-row`).length == 0){
      console.log("about to add");
      console.log(recoveryOptionExpandedHTML(recoveryItem));
      cFlightRow.append(recoveryOptionExpandedHTML(recoveryItem).toString());
      recoveryReactionPopover();
      criticalFlightData.forEach(cFlight=> {
        if(cFlight.id == recoveryItem.critical_flight_id){
          rIndex = -1;
          rIterator = 0;
          cFlight.recovery.forEach(r=> {
            if(r.id == recoveryItem.id){
              rIndex = rIterator;
            }
            rIterator ++;
          });
          console.log("Found CriticalFlight in dataset");
          if(rIndex==-1){
            cFlight.recovery.push(recoveryItem);
          }
        }
      });
    }

  }

  function recoveryReactionPopover(){
    // console.log("REcovery Option Popover");
    // console.log($('[rel="recoveryItemPopover"]'));
    $('[rel="recoveryItemPopover"]').popover({
        container: 'body',
        html: true,
        content: function () {
            var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
            console.log("CONTETN");
            console.log(clone);
            return clone;
        }
    }).click(function(e) {
        e.preventDefault();
    });
  }

  function dropdown(node){
      var y = node.parentNode.previousSibling
      y.innerHTML = node.children[0].children[0].outerHTML + '<span class="caret"></span></button>';
  }
  function getDropdownList(recoveryItem, role){
    listHTML = "";
    recoveryReactionSelectors[role].forEach(option=> {
      listHTML += `<li class="recoveryReactionDropdown" id="${recoveryItem.critical_flight_id}-${recoveryItem.id}-${role}-${recoveryReactionSelectors[role].indexOf(option)+1}-dropdownitem" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-${recoveryReactionOptions[option]}"></span>${option}</a></li>`
    });
    return listHTML;
  }
  function getDefaultIcon(role, indexOfIcon){
    return indexOfIcon == 0 ? "empty-dot" : recoveryReactionOptions[recoveryReactionSelectors[role][indexOfIcon-1]]
  }
  function getOSAcceptContent(osReaction){
    console.log(osReaction);
    return parseInt(osReaction) == 5 ? `<span class="glyphicon glyphicon-thumbs-up"></span>` : "..."
  }

  function getExpandedSection(data){

    var expandedSection = `<div class="row text-center">Recovery Options:</div>`;
    expandedSection += `<div class="row">`;
    expandedSection += `<div class="col-md-2 col-sm-2"><b>Flights</b></div>`;
    recoveryReactionHeaders.forEach(reactionHeader=> expandedSection += `<div class="col-md-1 col-sm-1"><b>${reactionHeader}</b></div>`);
    expandedSection += `</div> <hr style="margin:0px;height:2px;background-color:#333;">`;
    data.recovery.forEach(recoveryItem=> {
      expandedSection +=recoveryOptionExpandedHTML(recoveryItem);
    });
    return expandedSection;
  }

  function recoveryOptionExpandedHTML(recoveryItem){
    returnString = "";
    returnString+=`<div id="${recoveryItem.critical_flight_id}-${recoveryItem.id}-popover" class="hide"><table class="table">
      <thead><tr><th>Leg</th><th>ETD</th><th>Departure</th><th>Arrival</th></tr></thead>
      <tbody><tr><td>${recoveryItem.flight.leg}</td><td>${recoveryItem.flight.etd}</td>
      <td>${recoveryItem.flight.departure}</td><td>${recoveryItem.flight.arrival}</td></tr></tbody>
    </table></div>`;

    returnString +=`<div class="row" id="${recoveryItem.critical_flight_id}-${recoveryItem.id}-row"><div class="col-md-2 col-sm-2">${recoveryItem.flight.tail}
    <a class="controlBtn" href="#" rel="recoveryItemPopover" data-trigger="focus" data-popover-content="#${recoveryItem.critical_flight_id}-${recoveryItem.id}-popover" id="${recoveryItem.critical_flight_id}-${recoveryItem.id}">
    <span class="glyphicon glyphicon-info-sign"></span></a></div><div id="${recoveryItem.critical_flight_id}-${recoveryItem.id}-osreaction" class="col-md-1 col-sm-1">${getOSAcceptContent(recoveryItem["OS"])}</div>`;

    //Dropdown reaction selector
    Object.keys(recoveryReactionSelectors).forEach(role=> {
      returnString +=
      `<div class="col-md-1 col-sm-1"><div class="dropdown">
          <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span id="${recoveryItem.critical_flight_id}-${recoveryItem.id}-${role}-selectedrecovery" class="glyphicon glyphicon-${getDefaultIcon(role, parseInt(recoveryItem[role]))}"></span>
          <span class="caret"></span></button>
          <ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">${getDropdownList(recoveryItem, role)}</ul>
      </div></div>`
    });
    returnString += `<div class="col-md-1 col-sm-1" style="margin-top:10px;"><a id="removeRecoveryOptionButton" class="controlBtn removeRecoveryOptionButton" title="Remove Flight" onclick="removeRecoveryOption(this)"><span id="${recoveryItem.id}-${recoveryItem.critical_flight_id}" class="glyphicon glyphicon-remove"></span></a></div>`;
    returnString += `</div>`
    return returnString
  }

  function showAll(node){
    table.rows().every( function (){
      var tr = this.node();
      var sp = this.node().querySelector("span");
      this.child( format(this.data())).show();
      tr.className += " shown";
      if(sp!=null){
        sp.className = "glyphicon glyphicon-minus";
      }
    });
    recoveryReactionPopover();
  }

  function hideAll(node){
    table.rows().every( function (){
      var tr = this.node();
      var sp = this.node().querySelector("span");
      this.child.hide();
      if(tr.className == "odd shown"){
        tr.className = "odd";
      } else if(tr.className == "even shown"){
        tr.className = "even";
      }
      if(sp!=null){
        sp.className = "glyphicon glyphicon-plus";
      }
    });
  }

  function removeRecoveryOption(node){
    console.log(node.children[0]);
    var childId = node.children[0].id;
    var ids = childId.split("-");
    console.log(ids[0]);
    console.log(ids[1]);
    var criticalFlightId = ids[0];
    var recoveryId = ids[1];
    console.log(" "+criticalFlightId+" : "+recoveryId);
    $.post( "/critical_flight/remove_recovery",
      {
        authenticity_token: window._token,
        "critical_flight": recoveryId,
        "recovery": criticalFlightId
      })
    .done(function( data ){
      console.log("Recovery Removed");
      console.log(data);
    })
  }

  function tableDrawUpdateElements(){
    $('td.details-control').each(function(i, obj) {
      if($(this).children().length < 1){
        $(this).append('<span class="glyphicon glyphicon-plus"></span>');
      }
    });


    $('.details-control').on('click', function (e) {
        e.stopPropagation();
        console.log("clicked");
        var sp = $(this).find('span');
        var tr = $(this).closest('tr');
        var row = table.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
            sp.removeClass('glyphicon-minus');
            sp.addClass('glyphicon-plus');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
            sp.removeClass('glyphicon-plus');
            sp.addClass('glyphicon-minus');
        }
        recoveryReactionPopover();
    } );
  }

  function addToCriticalFlightData(newData){
    newId = newData.id
    idCount = 0;
    criticalFlightData.forEach(cFlight=> {
      if(cFlight.id == newId){
        idCount++;
      }
    });
    console.log("checked everyflight");
    if(idCount==0){
      criticalFlightData.push(newData);
      promptCriticalFlightCreationToUser();
    }
  }

  function promptCriticalFlightCreationToUser(){
    console.log("prompt called");
    $('#updateTableAlertDiv').removeClass('hide');
  }

  function refreshTable(flightsData){
    if($.fn.DataTable.isDataTable('#flightsTable')){
      table.destroy();
    }
    table = $('#flightsTable').DataTable( {
      data: flightsData,
      "rowId": "flight.leg",
      "columns": [
        {
          "className": 'details-control',
          "orderable": false,
          "data": null,
          "defaultContent": ''
        },
        { "data": "flight.tail" },
        { "data": "flight.leg" },
        { "data": "flight.departure" },
        { "data": "flight.arrival" },
        { "data": "event" },
        { "data": "recovery" },
        // { "data": "messages" },
        { "data": "flight.etd" }
      ],
      "aoColumnDefs":[{
        "aTargets":[ 6 ],
        "mRender": function(data, type, full) {
           return (data == "null") ? "No" : "Yes";
        }
      }],
      "fnDrawCallback": tableDrawUpdateElements,
      "order": [[1, 'asc']],
      dom: 'l<"toolbar">frtip',
      initComplete: function(){
      $("div.toolbar").html(`<div class="btn-group" role="toolbar" aria-label="...">
                            <button type="button" class="btn" role="group" aria-label="..." onclick="showAll(this)" id="showBtn">Show All</button>
                            <button type="button" class="btn" role="group" aria-label="..." onclick="hideAll(this)" id="hideBtn">Hide All</button>
                            <button type="button" class="btn btn-primary" role="group" aria-label="..." data-toggle="modal" data-target="#addFlightModal">Add Critical Flight</button>
                            </div>`);

      }
    });
  }

  function dataTableInitialize(){
    if(!initalized){
      initalized = true;
      $.getJSON('critical_flights.json', function(data){
        criticalFlightData = data;
        refreshTable(criticalFlightData);
      });
    }
  }

  function checkboxInit(){
    $("input:checkbox").on('click', function() {
      var $box = $(this);
      if ($box.is(":checked")) {
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        $(group).prop("checked", false);
        $box.prop("checked", true);
      } else {
        $box.prop("checked", false);
      }
    });
  }

  function addValidatorRegExMethod(){
    $.validator.addMethod("regx", function(value, element, regexpr) {
      return regexpr.test(value);
    }, "Invalid format");
  }

  function flightFormValidation(formID){
    $(formID).validate({
        rules: {
            tail: {
              // required: true,
              regx: /^N[0-9]{3}QS$/
            },
            leg: {
              // required: true,
              regx: /^[0-9]{8}$/
            },
            departure: {
              // required: true,
              regx: /^K[A-Z]{3}$/
            },
            arrival: {
              // required: true,
              regx: /^K[A-Z]{3}$/
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
  }

  function initializeEventListeners(){
    $(document).on("click",".findFlightsButton",function(){
      var url = "/flights.json?"
      var paramCount = 0;
      console.log("TEST");
      form = $(this).parents('form:first');
      if(form.find('input[name="tail"]').val() != ""){
        url+=`tail=${form.find('input[name="tail"]').val()}`;
        paramCount++;
      }
      if(form.find('input[name="leg"]').val() != ""){
        if(paramCount>0){
          url+="&"
        }
        url+=`leg=${form.find('input[name="leg"]').val()}`;
        paramCount++;
      }
      if(form.find('input[name="departure"]').val() != ""){
        if(paramCount>0){
          url+="&"
        }
        url+=`departure=${form.find('input[name="departure"]').val()}`;
        paramCount++;
      }
      if(form.find('input[name="arrival"]').val() != ""){
        if(paramCount>0){
          url+="&"
        }
        url+=`arrival=${form.find('input[name="arrival"]').val()}`;
        paramCount++;
      }
      console.log(paramCount);
      if(paramCount>0){
        $.getJSON(url, function(data){
          console.log(data);
          flightsSelectTable = form.find("tbody");
          flightsSelectTable.html("");
          flightsSelectTableContent = ""
          data.forEach(d=> {
            flightsSelectTableContent+=`<tr><td><input id="flightsSelectTableLeg${d.leg}" type="checkbox" class="radio" value="1" name="flightsSelect" /></td>
            <td>${d.tail}</td><td id="flightsSelectTableLeg">${d.leg}</td><td>${d.departure}</td><td>${d.arrival}</td><td>${d.etd}</td></tr>`;
            flightsSelectTable.html(flightsSelectTableContent);
          });
          checkboxInit();
        });
      }else{
        alert("Fill at least one of the fields!");
      }
      checkboxInit();
    });

    $(document).on("click",".recoveryReactionDropdown",function(){
      console.log(this.id);
      // changeRecoveryReactionCall(this.id);
      reactionOptions = this.id.split("-");
      console.log(reactionOptions);
      $.post( "/critical_flight/recovery_reaction.json",
        {
          authenticity_token: window._token,
          critical_flight: reactionOptions[0],
          recovery: reactionOptions[1],
          department: reactionOptions[2],
          recovery_reaction: reactionOptions[3]
        })
      .done(function( data ){
        console.log("Recovery Removed");
      });
    });
    $(document).on("click","#addRecoveryOptionCallButton",function(){
      if($("#addRecoveryModal").find("input:checked").length != 1){
        alert("Pick 1 Flight.");
      }else{
        tr = $("#addRecoveryModal").find("input:checked").attr('id')
        // console.log(tr);
        console.log(tr.slice(21));
        flightLeg = tr.slice(21);
        criticalFlight = $("#addFlightModal").attr("data-critical_flight_id");
        $.post( "/critical_flight/add_recovery.json",
          {
            authenticity_token: window._token,
            "critical_flight": criticalFlight,
            "flight_leg": flightLeg
          })
        .done(function( data ) {
          console.log( "Data Loaded: " + data );
        });
        $("#addRecoveryModal").find(".flightsSelectTable").find("tbody").html(" ");
      }
    });
    $(document).on("click","#criticalFlightFormButton",function(){
      if($("#addFlightModal").find("input:checked").length != 1){
        alert("Pick 1 Flight.");
      }else{
        tr = $("#addFlightModal").find("input:checked").attr('id')
        // console.log(tr);
        console.log(tr.slice(21));
        flightLeg = tr.slice(21);
        eventsArray = $("#eventsSelector").siblings("button")[0].title.split(", ");
        console.log(eventsArray);
        $.post( "/critical_flights.json",
          {
            authenticity_token: window._token,
            critical_flight: {
              "flight_leg": flightLeg,
              "event": eventsArray
            }
          })
        .done(function( data ) {
          console.log( "Data Loaded: " + data );
        });
        $("#addFlightModal").find(".flightsSelectTable").find("tbody").html(" ")
      }
    });
    $(document).on("click",".addRecoveryButton",function(){
      console.log("CLICKED");
      console.log(this.id);
      $("#addFlightModal").attr("data-critical_flight_id" , this.id.split("-")[1]);
      console.log($("#addFlightModal").attr("data-critical_flight_id"));
    });
    $(document).on("click",".removeRecoveryOptionButton",function(){
      console.log(this.children[0]);
      var childId = this.children[0].id;
      var ids = childId.split("-");
      console.log(ids[0]);
      console.log(ids[1]);
      var criticalFlightId = ids[0];
      var recoveryId = ids[1];
      $.post( "/critical_flight/remove_recovery.json",
        {
          authenticity_token: window._token,
          critical_flight: {
            "critical_flight": criticalFlightId,
            "recovery": recoveryId
          }
        })
      .done(function( data ){
        console.log("Recovery Removed");
      });
    });
    $(document).on("click","#updateTableAlert",function(){
      $('#updateTableAlertDiv').addClass('hide');
      refreshTable(criticalFlightData);
    });
  }

  function initFireChat() {
      console.log("clickkk");
      console.log(this);
      initApp();
      var userId = window._userid;
      var token = generateToken(userId);
      signIn(token);
  }

  // Generate an ID token and sign it with the private key.
  function generateToken(userId) {
    console.log(userId);
    var kid = "618c8bdfb010aedd9ce33b8f7aeb3eff3fb49e99";
    var sPKCS8PEM = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDcyOgcm6rRMZa+\nVYrvjVgDh8o3b0fNc1UZODLEJDjIWHVGpLG3T8gomJXxe9/VtniwtSKp8M/WMAZ0\nt4gooxjl5rxT4agllqtd2WLoDWUfq05S4JZjoiEKUr2Kd5KPm6RniHE747Ap8HfN\ng7rXeO5JNNSy+RmDTbot1a6fQFrCX86mKCizpamsAeMnQpvLjC+MKaFVx2jCd73Y\nd4BVm9f3kjidJ6UOjeMeHyrqUnsWORNCyMQlK9zGuzSs7/tD7UqVqqZcBcsErju0\nNfb1gH58A1vS1jXtfXfyrgbEwtYBnIgZjqkToph04d1qhKueqYF6fRBMhkIaSWXK\nZOyDYR3xAgMBAAECggEBANAautYEUJz//dOH8/5aHwSs4Ikh5e8cb7DmzMseTTti\nTaB5ql1b4RGKyYKlvVTGurns8jB2oKCGAf/P4pJTMSu6MfdqssBDZWF/fv+1aITS\nRnBN6tMcxcHiPXAfxtB/5xYDgJ/vvGO7mmDncpyZCxmLp5TOwSKHiB6d1AudcC7W\nuPrna/330Xht4RkC/YVOOri3OGqUB97gFwft9e+LWnYtTKytQYenffuk/ijfz4Ya\nqKTgnVotRhCe3BmhBJOJOAs7vXyIQzrMxnS5BX1+L1/RLmfCX4IZ8yRjsUFJqTKG\ngngwFGauPs091U8CCrwENCeTfA1Kr/pBDObUi+GS6GUCgYEA9295FZ2QIlPYAVYk\n6MW0if2UOYw1mDcOrelcykLjqwGEHQAsVejZu+NDg8TuN2lOKihrX6ye8RhIpzS5\n6l5DaSV+4dV5Jpq6ObAYwVHmT3KL38vk27m/Ykg70rUxFFx3ZdYwvn5a+TPZ6Rwa\nn8jqqJGNdYKwD4RPQV9f3AkmVoMCgYEA5G1IOV5q98vfXOqypNxgYWjt+p4OxvJt\nXlNht/X2KzS5irT/ZP3j537ggKBQJIDLI1Kc8FJ2buQ9VGoN2Yt5XstbWCUrfZlX\nlXLBDc+l8x67hNvRsIQCffUc6ba/OHI+NNBZtz/12Lx9C+uvdWZpY5FRBzXGC+iB\nNJXIL+tGr3sCgYAfcjpYResQgclc+h68uoukUebpnWkeTDkAXz0cs32NuSaaLPB1\nhp9NYqes8nU385ksgHCM+zpD98sb/PZ3070LeulyOBgqkNWECV5MC2WSyUL/kUEn\nr6akDfwUXlS7erjt51fQjexv6WgTWTAFCJrSC5WHzrEjd7Q+4akkJMGLkwKBgQDJ\nMeg3f45AC/YE5UPMKb9KjR1vbOAfI1BpkI+1dJMKozn5jkqVLXsbX4lmQc3VGQvT\nZOSOWFOwgJ/0RiVEw7B3ai5eiP6xderK23RnMco9RYhtESC0lNGNF+QLhscOdLGN\n2yXqXg+wgvSxFzpH8ZhJ9qij7R0vR+7l3jeg3V45GQKBgAndlCOtggAMjlbrz+ir\ntla+AicmOm3XYsruMDuNfcR2LROrFPsMh7AMFsrN/lRZLrb0+CYqVt5qNIJBGNf2\nCxrNAT0Tn+iDYEtVwDD2qGgRaiG7AuUytJp4Brf9iDkrLtXWiPKoqQCNHfDv9Gxe\nLU0o1McF/DBIZZ0xp5ysPNDx\n-----END PRIVATE KEY-----\n";
    var sub = "firebase-adminsdk-glsqf@soctrack-5ec1b.iam.gserviceaccount.com";

    var uid = userId;
    if (uid == '') {
      console.log('Blank uid');
      return;
    }
    // Header
    var oHeader = {alg: 'RS256', kid: kid, typ: 'JWT'};
    // Payload
    var oPayload = {};
    var tNow = KJUR.jws.IntDate.get('now');
    var tEnd = KJUR.jws.IntDate.get('now + 1hour');
    oPayload.aud = 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit';
    oPayload.exp = tEnd;
    oPayload.iat = tNow;
    oPayload.iss = sub;
    oPayload.sub = sub;
    oPayload.user_id = uid;
    oPayload.scope = 'https://www.googleapis.com/auth/identitytoolkit';
    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(oPayload);
    var sJWT = KJUR.jws.JWS.sign(null, sHeader, sPayload, sPKCS8PEM, 'notasecret');
    console.log(sJWT);
    return sJWT
  }

  function signIn(token) {
      firebase.auth().signInWithCustomToken(token).catch(function(error) {
        console.log("Error authenticating user:", error);
      });
    }

  function initChat(user) {
        // Get a Firebase Database ref
        var chatRef = firebase.database().ref("chat");

        // Create a Firechat instance
        var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

        // Set the Firechat user
        console.log("userId: "+ user.uid + "    userName: ");
        chat.setUser(user.uid, window._username);
        console.log(user);
  }

  function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          initChat(user);
        }
      });
  }

  $(document).ready(function() {
    dataTableInitialize();
    addValidatorRegExMethod();
    flightFormValidation('#newFlightForm');
    checkboxInit();
    initializeEventListeners();
    initFireChat();
  });
