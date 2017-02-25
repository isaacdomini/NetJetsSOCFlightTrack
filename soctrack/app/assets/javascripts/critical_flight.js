  /* Formatting function for row details - modify as you need */
  var table = "";
  var initalized = false;
  function format (rowData) {
      // `d` is the original data object for the row
      return `<div class="container"><div class="row">
                <div class="col-md-9">${getExpandedSection(rowData)}</div>
                <div class="col"><button class="btn btn-default" onclick="addRecoveryOption()">Add</button></div>
              </div></div>`;
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

  function getExpandedSection(data){
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
    function getDropdownList(role){
      listHTML = "";
      recoveryReactionSelectors[role].forEach(option=> {
        listHTML += `<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-${recoveryReactionOptions[option]}"></span>${option}</a></li>`
      });
      return listHTML;
    }
    function getDefaultIcon(role, indexOfIcon){
      // console.log("Role: "+role+" Index: "+indexOfIcon);
      // console.log(recoveryReactionOptions[recoveryReactionSelectors[role][3]]);
      if(indexOfIcon==0){
        return "empty-dot";
      }else{
        return recoveryReactionOptions[recoveryReactionSelectors[role][indexOfIcon-1]]
      }
    }
    var expandedSection = `<div class="row text-center">Recovery Options:</div>`;
    if(data.recovery.length>0){
      expandedSection += `<div class="row">`;
      expandedSection += `<div class="col-md-2 col-sm-2"><b>Flights</b></div>`;
      recoveryReactionHeaders.forEach(reactionHeader=> expandedSection += `<div class="col-md-1 col-sm-1"><b>${reactionHeader}</b></div>`);
      expandedSection += `</div> <hr style="margin:0px;height:2px;background-color:#333;">`;
      data.recovery.forEach(recoveryItem=> {
        expandedSection +=
        `<div id="${data.flight.leg}-${recoveryItem.flight.leg}-popover" class="hide"><table>
          <tr><th>Leg</th><th>ETD</th><th>Departure</th><th>Arrival</th></tr>
          <tr><td>${recoveryItem.flight.leg}</td><td>${recoveryItem.flight.etd}</td>
          <td>${recoveryItem.flight.departure}</td><td>${recoveryItem.flight.arrival}</td></tr>
        </table></div>`;

        /// COME BACK TO THIS POPEVER THING
        expandedSection +=`<div class="col-md-2">${recoveryItem.flight.tail}
        <a class="controlBtn" href="#" rel="recoveryItemPopover" data-trigger="focus" data-popover-content="#${data.flight.leg}-${recoveryItem.flight.leg}-popover" id="${data.flight.leg}-${recoveryItem.flight.leg}">
        <span class="glyphicon glyphicon-info-sign"></span></a></div><div class="col-md-1">...</div>`;

        //Dropdown reaction selector
        Object.keys(recoveryReactionSelectors).forEach(role=> {
          expandedSection +=
          `<div class="col-md-1"><div class="dropdown">
              <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-${getDefaultIcon(role, recoveryItem[role])}"></span>
              <span class="caret"></span></button>
              <ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">${getDropdownList(role)}</ul>
          </div></div>`
        });
        expandedSection += `<div class="col-md-1" style="margin-top:10px;"><a class="controlBtn" title="Remove Flight"><span class="glyphicon glyphicon-remove"></span></a></div>`;
      });
      expandedSection += `</div>`
    }
    expandedSection += `<script>recoveryReactionPopover()</script>`
    return expandedSection;
  }

  function dropdown(node){
      var y = node.parentNode.previousSibling
      y.innerHTML = node.children[0].children[0].outerHTML + '<span class="caret"></span></button>';
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

  function addRecoveryOption(){
    bootbox.prompt({
      title: "This is a prompt with a date input!",
      inputType: 'date',
      callback: function (result) {
          console.log(result);
      }
    });
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

  $(document).ready(function() {
    if(!initalized){
      initalized = true;
      $.getJSON('critical_flights.json', function(data){
        table = $('#flightsTable').DataTable( {
          data: data,
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
      });
    }
    $.validator.addMethod("regx", function(value, element, regexpr) {
      console.log(value);
      return regexpr.test(value);
    }, "Invalid format");
    $('#newFlightForm').validate({
        rules: {
            tail: {
              required: true,
              regx: /^N[0-9]{3}QS$/
            },
            leg: {
              required: true,
              regx: /^[0-9]{8}$/
            },
            source: {
              required: true,
              regx: /^K[A-Z]{3}$/
            },
            destination: {
              required: true,
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
    $('#eventsSelector').on('changed.bs.select', function (event, clickedIndex, newValue, oldValue) {
      // console.log(event);
      // console.log(clickedIndex);
      console.log(newValue);
      // console.log(oldValue);
    });
  });
