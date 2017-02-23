  /* Formatting function for row details - modify as you need */
  var table = ""
  function format ( d ) {
      // `d` is the original data object for the row
      return '<div class="container">'+
                '<div class="row">'+
                    '<div class="col-md-9">'+
                        getRecoveryOptions(d) +
                    '</div>' +
                    '<div class="col">'+
                         '<button class="btn btn-default" onclick="addRecoveryOption()">Add</button>' +
                    '</div>' +
                '</div>'+
              '</div>';
  }

  function getRecoveryOptions(d) {

      var ret = '<div class="row text-center">'+
                  'Recovery Options:'+
                '</div>';
      if(d.recovery !== 'null') {
          ret += '<div class="row">'+
                    '<div class="col-md-2"><b>Flights</b></div>' +
                    '<div class="col-md-1">...</div>'+
                    '<div class="col-md-1"><b>AB</b></div>'+
                    '<div class="col-md-1"><b>OS</b></div>'+
                    '<div class="col-md-1"><b>CS</b></div>'+
                    '<div class="col-md-1"><b>DX</b></div>'+
                    '<div class="col-md-1"><b>OP</b></div>'+
                    '<div class="col-md-1"><b>MX</b></div>'+
                    '<div class="col-md-1"><b>ITP</b></div>'+
                    '<div class="col-md-1"><b>SC</b></div>'+
                    '<div class="col-md-1">-</div>'+
                  '</div> <hr style="margin:0px;height:2px;background-color:#333;">';
          var counter = 0;
          d.recovery.forEach( function(item) {
              ret += '<div class="row">' +
                        '<div class="col-md-2">'+item.flight.tail+'<a class="controlBtn" onclick="showInfo()" title="Flight Info"><span class="glyphicon glyphicon-info-sign"></span></a></div>' +
                        '<div class="col-md-1">...</div>'+
                        '<div class="col-md-1">'+
                          '<div id="actionsDropdown" class="dropdown">'+
                            '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'+
                                '<span class="glyphicon glyphicon-empty-dot"></span>'+
                                '<span class="caret"></span>'+
                            '</button>'+
                            '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                        '<div class="col-md-1">'+
                          '<div class="dropdown">'+
                            '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                            '<span class="caret"></span></button>'+
                            '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-thumbs-up"></span>Accept</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-thumbs-down"></span>Decline</a></li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                        '<div class="col-md-1">'+
                          '<div class="dropdown">'+
                            '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                            '<span class="caret"></span></button>'+
                            '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                        '<div class="col-md-1">'+
                          '<div class="dropdown">'+
                            '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                            '<span class="caret"></span></button>'+
                            '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                        '<div class="col-md-1">'+
                          '<div class="dropdown">'+
                            '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                            '<span class="caret"></span></button>'+
                            '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                        '<div class="col-md-1">'+
                          '<div class="dropdown">'+
                            '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                            '<span class="caret"></span></button>'+
                            '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                        '<div class="col-md-1">'+
                          '<div class="dropdown">'+
                            '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                            '<span class="caret"></span></button>'+
                            '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-globe"></span></a></li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                        '<div class="col-md-1">'+
                          '<div class="dropdown">'+
                            '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                            '<span class="caret"></span></button>'+
                            '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                              '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" ><span class="glyphicon glyphicon-plane"></span></a></li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                        '<div class="col-md-1" style="margin-top:10px;"><a class="controlBtn" title="Remove Flight"><span class="glyphicon glyphicon-remove"></span></a></div>'+
                      '</div>';
                      counter++;
          });
      }

      return ret;
  }

  function dropdown(node){
      var y = node.parentNode.previousSibling
      y.innerHTML = node.children[0].children[0].outerHTML + '<span class="caret"></span></button>';
  }


  function showAll(node){
    var table = $('#flightsTable').DataTable();
    table.rows().every( function (){
      var tr = this.node();
      var sp = this.node().querySelector("span");
      this.child( format(this.data()) ).show();
      tr.className += " shown";
      sp.className = "glyphicon glyphicon-minus";
    });
  }

  function hideAll(node){
    var table = $('#flightsTable').DataTable();
    table.rows().every( function (){
      var tr = this.node();
      var sp = this.node().querySelector("span");
      this.child.hide();
      if(tr.className == "odd shown"){
        tr.className = "odd";
      } else if(tr.className == "even shown"){
        tr.className = "even";
      }
      sp.className = "glyphicon glyphicon-plus";
    });
  }

  function showInfo(){
    console.log("info clicked");
    bootbox.dialog({
      title: "Recovery Option Info",
      message: "<p>More Info</p>"
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


    $('#flightsTable tbody').on('click', 'td.details-control', function (e) {
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
        stopBubble(e);
    } );
  }

  var dataset = "";
  $(document).ready(function() {
  $.getJSON('critical_flights.json', function(data){
    console.log(data);
    dataset = data;
        table = $('#flightsTable').DataTable( {
            data: dataset,
            "columns": [
              {
                  "className":      'details-control',
                  "orderable":      false,
                  "data":           null,
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
              $("div.toolbar").html('<div class="btn-group" role="toolbar" aria-label="...">'+
                                    '<button type="button" class="btn" role="group" aria-label="..." onclick="showAll(this)" id="showBtn">Show All</button>'+
                                    '<button type="button" class="btn" role="group" aria-label="..." onclick="hideAll(this)" id="hideBtn">Hide All</button>'+
                                    '<button type="button" class="btn btn-primary" role="group" aria-label="..." data-toggle="modal" data-target="#addFlightModal">Add Critical Flight</button>'+
                                    '</div>');

            }
        } );
      });
  });
