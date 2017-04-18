  firebaseAuthFlag = false;
  var chat;
  var firechat;
  var i= 0;

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
  
  const roleRestrictions = {
    "AB" : ["AB"],
    "OS" : ["AB","OS"],
    "CS" : ["AB","CS"],
    "DX" : ["AB","DX"],
    "OPS" : ["AB","OPS"],
    "MX" : ["AB","MX"],
    "ITP" : ["AB","ITP"],
    "SC" : ["AB","SC"],
    "add" : ["AB"],
    "accept" : ["AB"],
    "remove" : ["AB"]
  }
 
  function roleActions (action){
    return roleRestrictions[action].includes(window._userrole); 
  }
  function disableRestriction(action){
    return roleActions(action) ? "":"disabled ";
  }
  function hideRestriction(action){
    return roleActions(action) ? "":"hide ";
  }


  function format (rowData) {
      // `d` is the original data object for the row
      return `<div id="expandedSection-${rowData.flight.leg}" class="col-md-12">
                <div class="row"><div id="critical_flight_row_${rowData.id}">${getExpandedSection(rowData)}</div></div>
                <br/>
                <div><div class="${hideRestriction("add")} col-md-offset-5"><button id="critical_flight_add_recovery-${rowData.id}" data-toggle="modal" data-target="#addRecoveryModal" class="${disableRestriction("add")}btn btn-default addRecoveryButton">Add</button></div></div>`;
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
    }if(data.action == "acceptrecovery"){
      console.log("received");
      console.log("recoveryreaction");
      console.log(data.content);
      acceptRecoveryOptionDashboard(data.content);
    }else{
      console.log("error");
      console.log(data.action);
    }
  }

  function acceptRecoveryOptionDashboard(data){
    console.log(data.recovery_id);
    $("#"+data.critical_flight_id+"-"+data.recovery_id+"-row").addClass('acceptedRecovery');
  }

  function removeRecoveryFromDashboard(data){
    $(`#${data.critical_flight_id}-${data.recovery_id}-row`).remove();
    criticalFlightData.forEach(cFlight=> {
      if(cFlight.id == data.critical_flight_id){
        i = 0;
        deleteIndex = -1;
        cFlight.recovery.forEach(r=> {
          if(r.id == data.recovery_id){
            deleteIndex = i;
          }
        });
        if(deleteIndex!=-1){
          cFlight.recovery.splice(deleteIndex,1);
        }
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
        //   cFlight.recovery.push(recovery);
        // }
      }
    });
    if(options.department == "OS"){
      $(`#${options.critical_flight_id}-${options.recovery_id}-osreaction`).html(getOSAcceptContent(options.reaction_number));
    }
  }

  function addRecoveryOptionToDashboard(recovery){
    cFlightRow = $(`#critical_flight_row_${recovery.critical_flight_id}`);
    if(cFlightRow.find(`#${recovery.critical_flight_id}-${recovery.id}-row`).length == 0){
      cFlightRow.append(recoveryOptionExpandedHTML(recovery).toString());
      recoveryReactionPopover();
      criticalFlightData.forEach(cFlight=> {
        if(cFlight.id == recovery.critical_flight_id){
          rIndex = -1;
          rIterator = 0;
          cFlight.recovery.forEach(r=> {
            if(r.id == recovery.id){
              rIndex = rIterator;
            }
            rIterator ++;
          });
          if(rIndex==-1){
            cFlight.recovery.push(recovery);
          }
        }
      });
    }

  }

  function recoveryReactionPopover(){
    $('[rel="recoveryPopoverSelected"]').popover({
        container: 'body',
        html: true,
        content: function () {
            var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
            return clone;
        }
    }).click(function(e) {
        e.preventDefault();
    });
    $('[rel="recoveryPopover"]').popover({
        container: 'body',
        html: true,
        content: function () {
            var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
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
  function getDropdownList(recovery, role){
    listHTML = "";
    recoveryReactionSelectors[role].forEach(option=> {
      listHTML += `<li class="recoveryReactionDropdown" id="${recovery.critical_flight_id}-${recovery.id}-${role}-${recoveryReactionSelectors[role].indexOf(option)+1}-dropdownitem" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-${recoveryReactionOptions[option]}"></span>${option}</a></li>`
    });
    return listHTML;
  }
  function getDefaultIcon(role, indexOfIcon){
    return indexOfIcon == 0 ? "empty-dot" : recoveryReactionOptions[recoveryReactionSelectors[role][indexOfIcon-1]]
  }
  function getOSAcceptContent(osReaction){
      if(parseInt(osReaction)==5 || parseInt(osReaction)==6){         
          return '<a id="acceptRecoveryOptionButton" class="controlBtn acceptRecoveryOptionButton" title="Accept Flight" onclick="acceptRecoveryOption(this)"><span class="glyphicon glyphicon-ok"></span></a>'
          //return `<span class="glyphicon glyphicon-${getDefaultIcon("OS",parseInt(osReaction))}"></span>`;
      }
      return ""
  }

  function getExpandedSection(data){

    var expandedSection = `<div class="row text-center">Recovery Options:</div>`;
    expandedSection += `<div class="row">`;
    expandedSection += `<div class="col-md-2 col-sm-2"><b>Flights</b></div>`;
    recoveryReactionHeaders.forEach(reactionHeader=> expandedSection += `<div class="col-md-1 col-sm-1"><b>${reactionHeader}</b></div>`);
    expandedSection += `</div> <hr style="margin:0px;height:2px;background-color:#333;">`;
    data.recovery.forEach(recovery=> {
      expandedSection +=recoveryOptionExpandedHTML(recovery);
    });
    return expandedSection;
  }
  function selectedRecoveryClass(recovery){
    return  recovery.selected ? "acceptedRecovery" : "";
  }

  function recoveryOptionExpandedHTML(recovery){
    returnString = "";
    returnString+=`<div id="${recovery.critical_flight_id}-${recovery.id}-popover" class="hide"><table class="table">
      <thead><tr><th>Leg</th><th>ETD</th><th>Departure</th><th>Arrival</th></tr></thead>
      <tbody><tr><td>${recovery.flight.leg}</td><td>${formatEtd(recovery.flight.etd)}</td>
      <td>${recovery.flight.departure}</td><td>${recovery.flight.arrival}</td></tr></tbody>
    </table></div>`;

    returnString +=`<div class="row ${selectedRecoveryClass(recovery)}" id="${recovery.critical_flight_id}-${recovery.id}-row"><div class="col-md-2 col-sm-2">${recovery.flight.tail}
    <a class="controlBtn" href="#" rel="recoveryPopover" data-trigger="focus" data-popover-content="#${recovery.critical_flight_id}-${recovery.id}-popover" id="${recovery.critical_flight_id}-${recovery.id}">
    <span class="glyphicon glyphicon-info-sign"></span></a></div><div id="${recovery.critical_flight_id}-${recovery.id}-osreaction" class="col-md-1 col-sm-1">${getOSAcceptContent(recovery["OS"])}</div>`;

    //Dropdown reaction selector
    Object.keys(recoveryReactionSelectors).forEach(role=> {
      returnString +=
      `<div class="col-md-1 col-sm-1"><div class="dropdown actionsDropdown">
          <button class="${disableRestriction(role)}btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span id="${recovery.critical_flight_id}-${recovery.id}-${role}-selectedrecovery" class="glyphicon glyphicon-${getDefaultIcon(role, parseInt(recovery[role]))}"></span>
          <span class="caret"></span></button>
          <ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">${getDropdownList(recovery, role)}</ul>
      </div></div>`
    });
    returnString += `<div class="col-md-1 col-sm-1 ${hideRestriction("remove")}" style="margin-top:10px;"><a id="removeRecoveryOptionButton" class="${disableRestriction("remove")}controlBtn removeRecoveryOptionButton" title="Remove Flight" onclick="removeRecoveryOption(this)"><span id="${recovery.id}-${recovery.critical_flight_id}" class="glyphicon glyphicon-remove"></span></a>`;
    returnString += `</div></div>`
    return returnString
  }

  function removeRecoveryOption(node){
    var childId = node.children[0].id;
    var ids = childId.split("-");
    var recoveryId = ids[0];
    var criticalFlightId = ids[1];
    $.post( "/critical_flight/remove_recovery",
      {
        authenticity_token: window._token,
        "critical_flight": criticalFlightId,
        "recovery": recoveryId
      })
    .done(function( data ){
      console.log("Recovery Removed");
    })
  }

  function acceptRecoveryOption(node){
    var parentId = node.parentNode.parentNode.id;
    var ids = parentId.split("-");
    var recoveryId = ids[0];
    var criticalFlightId = ids[1];
    $.post( "/critical_flight/accept_recovery",
      {
        authenticity_token: window._token,
        "critical_flight": recoveryId,
        "recovery": criticalFlightId
      })
    .done(function( data ){
      console.log("Recovery Accepted");
    })
  }

function showAll(node){
    table.rows().every( function (){
      var tr = this.node();
      var sp = this.node().querySelector(".expand");
      this.child( format(this.data())).show();
      if(tr.className.includes("odd")){
        tr.className = "odd shown";
      } else if(tr.className.includes("even")){
        tr.className = "even shown";
      } else {
        tr.className = "shown";
      }
      if(sp!=null){
        sp.className = "glyphicon glyphicon-minus expand";
      }
    });
    recoveryReactionPopover();
  }

  function hideAll(node){
    table.rows().every( function (){
      var tr = this.node();
      var sp = this.node().querySelector(".expand");
      this.child.hide();
      if(tr.className.includes("odd")){
        tr.className = "odd";
      } else if(tr.className.includes("even")){
        tr.className = "even";
      } else {
        tr.className = "";
      }
      if(sp!=null){
        sp.className = "glyphicon glyphicon-plus expand";
      }
    });
  }

  function getCurrentStatus(tr){
    if(tr.hasClass("shown")){
      return 'minus'
    } else {
      return 'plus'
    }
  }
  function tableComplete(){
    console.log("initComplete");
  }

  function tableDrawUpdateElements(){
    console.log("drawUpdateTable");
    $('td.details-control').each(function(i, obj) {
      if($(this).children().length < 1){
      //console.log($(this).parent())
        tr = $(this).parent()
        $(this).append(`<span class="glyphicon glyphicon-${getCurrentStatus(tr)} expand"></span>`);
      }
    });
    $('td.favorites-control').each(function(i, obj) {
      if($(this).children().length < 1){
        $(this).append('<span class="glyphicon glyphicon-star"></span>');
      }
    });
        $('.details-control').unbind().on('click', function (e) {
        e.stopPropagation();
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

    $('.favorites-control').on('click', function (e) {
        e.stopPropagation();
        var sp = $(this).find('span');
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        var favStatus = true;
        if(sp.hasClass('favorite')) {
          sp.removeClass('favorite');
          favStatus = false;
        } else {
          sp.addClass('favorite');
          favStatus = true;
        }

        criticalFlightId = row.data().id;

        $.post( "/user/update_favorites",
        {
          authenticity_token: window._token,
          user: window._userid,
          "critical_flight": criticalFlightId,
          "favorite": favStatus
        })
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
    if(idCount==0){
      criticalFlightData.push(newData);
      promptCriticalFlightCreationToUser();
    }
  }

  function promptCriticalFlightCreationToUser(){
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
          "className": 'favorites-control',
          "data": null,
          "defaultContent": '',
          "width": '16px'
        },
        {
          "className": 'details-control',
          "orderable": false,
          "data": null,
          "defaultContent": '',
          "width": '13px'
        },
        { "data": "flight.tail" },
        { "data": "flight.leg" },
        { "data": "flight.departure" },
        { "data": "flight.arrival" },
        { "data": "event" },
        { "data": "recovery",
          "width": "15%" },
        { 
          "data": "flight.etd",
          "width": "15%"
        },
        { "data": null,
          "orderable": false,
          "defaultContent": '<a class="controlBtn"><span class="glyphicon glyphicon-comment" id="flightChatBtn"></span></a>'
        }
      ],
      "aoColumnDefs":[
        {
          "mRender": function(data, type, full) {
              for(var i = 0; i < Object.keys(data).length; i++){
                var recovery = data[i];
                if(recovery.selected){
                  return `<div id="${recovery.critical_flight_id}-${recovery.id}-popoverselected" class="hide"><table class="table">
                          <thead><tr><th>Leg</th><th>ETD</th><th>Departure</th><th>Arrival</th></tr></thead>
                          <tbody><tr><td>${recovery.flight.leg}</td><td>${formatEtd(recovery.flight.etd)}</td>
                          <td>${recovery.flight.departure}</td><td>${recovery.flight.arrival}</td></tr></tbody>
                          </table></div>
                          <div class="row ${selectedRecoveryClass(recovery)}">
                          <div>${recovery.flight.tail}
                          <a class="controlBtn" href="#" rel="recoveryPopoverSelected" data-trigger="focus" data-popover-content="#${recovery.critical_flight_id}-${recovery.id}-popoverselected" id="${recovery.critical_flight_id}-${recovery.id}">
                          <span class="glyphicon glyphicon-info-sign"></span></a></div>`;
                }
              }
            return "None Selected";
          },
          "aTargets":[ 7 ]
        },
        {
          "mRender": function(data, type, full) {
            return formatEtd(data);
          },
          "aTargets":[ 8 ]
        }

      ],
      "fnDrawCallback": tableDrawUpdateElements,
      "order": [[2, 'asc']],
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

  function formatEtd(data){
    var flightDate = moment(data).format("YYYY MM DD HH:mm:ss");
    var currentDate = moment().format("YYYY MM DD HH:mm:ss");
    var ms = moment(flightDate,"YYYY MM DD HH:mm:ss").diff(moment(currentDate, "YYYY MM DD HH:mm:ss"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
    formatFlightDate = moment(data).format("MM/DD HH:mm");
    if(s.includes("-")){
      //flight already happened
      return formatFlightDate.toString() + "<span class=\"pastFlight\"> (" + s +")</span>";
    } else {
      //flight in the future
      return formatFlightDate.toString() + "<span class=\"futureFlight\"> (+" + s + ")</span>";
    }
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

    $('#changePane').on('click', function (e) {
      if ($("#dashboardPane").hasClass("col-md-9")) {
        $("#dashboardPane").removeClass("col-md-9");
      }else{
        $("#dashboardPane").addClass("col-md-9");
      }
      if ($("#chatPane").hasClass("col-md-3")) {
        $("#chatPane").removeClass("col-md-3");
      }else{
        $("#chatPane").addClass("col-md-3");
      }
    });
    $(document).on("click",".findFlightsButton",function(){
      var url = "/flights.json?"
      var paramCount = 0;
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
      if(paramCount>0){
        $.getJSON(url, function(data){
          flightsSelectTable = form.find("tbody");
          flightsSelectTable.html("");
          flightsSelectTableContent = ""
          data.forEach(d=> {
            flightsSelectTableContent+=`<tr><td><input id="flightsSelectTableLeg${d.leg}" type="checkbox" class="radio" value="1" name="flightsSelect" /></td>
            <td>${d.tail}</td><td id="flightsSelectTableLeg">${d.leg}</td><td>${d.departure}</td><td>${d.arrival}</td><td>${formatEtd(d.etd)}</td></tr>`;
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
      // changeRecoveryReactionCall(this.id);
      reactionOptions = this.id.split("-");
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
        flightLeg = tr.slice(21);
        eventsArray = $("#eventsSelector").siblings("button")[0].title.split(", ");
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
      $("#addFlightModal").attr("data-critical_flight_id" , this.id.split("-")[1]);
    });
    $(document).on("click",".removeRecoveryOptionButton",function(){
      var childId = this.children[0].id;
      var ids = childId.split("-");
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
    $(document).on("click", "#flightChatBtn", function(){
      var data = table.row($(this).parents('tr')).data();
      var legID = data.flight.leg;
      var flightChatName = "Leg ID:" + legID;
      var roomList;
      var roomExists = false;
      firechat.getRoomList(function(obj) {
        roomList = obj;
        for(var key in roomList) {
          if(flightChatName == obj[key].name) {
            roomExists = true;
            break;
          }
        }
        if(!roomExists) {
          firechat.createRoom(flightChatName, "public", function(roomId) {});
        }

        $("#firechat-btn-rooms").click();

       setTimeout(function() {
          $("li[data-room-name='Leg ID:"+legID+"'] a").click();
       }, 1000);
      });
    });

    chatPaneTop = $("#chatPane").offset().top;
    $(window).scroll(function() {
      $("#chatPane").toggleClass('staticChatPane', $(window).scrollTop() > chatPaneTop);
    }); 

  }

  function initFireChat() {
      initApp();
      var userId = window._userid;
      var token = generateToken(userId);
      signIn(token);
  }

  // Generate an ID token and sign it with the private key.
  function generateToken(userId) {
    var kid = "d6d95f9ffc24ac9ebe3adac7008386f4cd27d37c";
    var sPKCS8PEM = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC89Xljk8Od2V1d\n3SxANYFwxvmykghB1/iBsWRF0iQ03zUmxnIjqQqvpn5WB6hcxa7tEnGarmiwQFHZ\ndVcFpxKD8UXpImsXq/dup92AtU524sfr14RCRbE6AuqfJshWqN5Z9JF5b2t/nkqh\nkxUJSMxfCLaNaw7KvJKA2VjitoKk5WKm3q7Jz5BAReVbQDAAG7RNqbZkhTALdf9E\np1VsjmQnvmKIGBZeU/I9iDhnDvgZBhuWwItr2Yz9EYMVVUpMJT9kUVoed4/5iJEz\n+00+CG7Co0hGQZWCgsx0vq1foTDHobGa6Pza2A7n5SfKmxST7XBTzU7r4SAaEc8A\ngfVU7muVAgMBAAECggEATObacFxC0IsWJI1O5RLhizRviu1DzwhGawH2/TN46Muu\npgk9iqXRY4su/3Q+YQNTHcjT01AH6zNCHG5U7EgCkRAwk6EeVJP4L2DCFQ+0z02c\nb69WdGJIroNhWUQ/ZIV1eMbALdvatCWH2hoyBYVLJ6I0KXnYm0oDlczfD+WXZeQA\n0Pm7i9kmbXFqhxKFKRqpAPMxJHJmPcb1SqSi+Z8mB7L9Q32gyaShHmFcIWxMqFGf\n45hxm7yzJ9RPVvpXz1L9fxxqUMXaPbCVdi8VsQ13n7eo6w+40uzAcuJoGpe4nxUo\nIGIj+/C8r9G/neCBxVcmGQNyaZCCFD4f66DIk0w0QQKBgQD4vNTkzGw2F32hL4q7\nfJPCrUKVnyV/WwQXOykmTDhYPEkwrg9k5MiH5spMHlfm3kjeHMS+hsWygomQ2rnQ\ntw+NWr9BBAIeQL65YhCyECMDWmQ0gMSE2fmVmbUcD+GK2qg4HV+kOS5xdHAQhlYh\nOei050Vg40sapy7yEC74dbF8zwKBgQDCedTXS/hyNNbHZBjZwgkTTOXNdo8KXzvS\nD7GnFKT8CVE2PjXNM3cKe5MhPR3S1gOmUHCd3M0RkQi41tkRXp4YcqunVeNym/eT\nkfzrpfUAFtyOcnpqxzJC/bd0xsQ5cMIe1NGiq5loT4mFYSOhIs0vD2BaVB00Pecf\nfoXHZAeSWwKBgQDTHTJ0nyyZHIb8b6WIS8v9x6Bj7Zed6FoofYYHg1mvSju0nYdj\nUusArdm1kWt5/+BI5JH4Q9s4D6NC1uIvS7BfgU4imIxTsRAvuBQDjb6p8eZqyYAC\nYh974eHd13zOpZdxST0L3ZyVnwYegGZJ/SSNpl00RrZQAOXPffzf1MS38QKBgHZs\ngfNoy62gB3n7tjZENgqOtRFctNX4EBFmhSPdKmpfshh54YFHaaH0hi+ja9nLgQVx\nzmIS5r1fuBP2oNA28capbWXEo3BTEXvHVmCY+oxHX59OjsUe77hjj6eIskzYIR1t\nMwr/u7cNWAzkjjG9Y3zYvC/FMNNzLp67CPPWMdYpAoGBAICtP2FaLpn9POhG7EEl\n+Niua1i03+Usy69Tgi91UZsNqGa+Ij/ShgCcJgUx2j4J7qjEsTEMRgbzyC6Qb70p\nTFdwin13lJYT0N2rqRRZwTC6ewbls9Oqo/Bg0/SpwoLkst+BxJJBX15BPcGOzOWl\ne6MOIgfXiXWKImsB9uweNDzk\n-----END PRIVATE KEY-----\n";
    var sub = "firebase-adminsdk-pdqba@soctrackdev-1e409.iam.gserviceaccount.com";

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
    return sJWT
  }

  function signIn(token) {
      firebase.auth().signInWithCustomToken(token).catch(function(error, authData) {
        console.log("Error authenticating user:", error);
      });
    }

  function initChat(user) {
        // Get a Firebase Database ref
        var chatRef = firebase.database().ref("firechat");

        // Create a Firechat instance
        chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
        firechat = new Firechat(chatRef);

        // Set the Firechat user
        chat.setUser(user.uid, window._username);

       $("#firechat-btn-rooms").click();

       setTimeout(function() {
          $("li[data-room-id='GeneralChat'] a").click();
       }, 1000);

       setTimeout(function() {
          $("li[data-room-id='" + window._userrole + "Chat'] a").click();
       }, 3000);

  }

  function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user && !firebaseAuthFlag) {
        firebaseAuthFlag = true;
        initChat(user);
      }
    });
  }

  $(document).ready(function() {
    window.localStorage.clear();
    if(window._userid !== undefined) {
      dataTableInitialize();
      addValidatorRegExMethod();
      flightFormValidation('#newFlightForm');
      checkboxInit();
      initializeEventListeners();
      initFireChat();
    }
  });
