var dataset = [
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": [
        {"tail_no": "N555QS", "flight": "JKCA"},
        {"tail_no": "N777QS", "flight": "CMHA"} ],
      "events": "Weather",
      "etd": "23:30"
    },
    {
      "tail_no": "N555QS",
      "flight": "JKCA",
      "messages": "Hello",
      "recovery_options": [
        {"tail_no": "N555QS", "flight": "JKCA"},
        {"tail_no": "N777QS", "flight": "CMHA"} ],
      "events": "En Route",
      "etd": "23:30"
    },
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": "null",
      "events": "Weather",
      "etd": "23:30"
    },
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": [
        {"tail_no": "N555QS", "flight": "JKCA"} ],
      "events": "Weather",
      "etd": "23:30"
    },
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": [
        {"tail_no": "N555QS", "flight": "JKCA"},
        {"tail_no": "N777QS", "flight": "CMHA"} ],
      "events": "Weather",
      "etd": "23:30"
    },
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": [
        {"tail_no": "N555QS", "flight": "JKCA"},
        {"tail_no": "N777QS", "flight": "CMHA"} ],
      "events": "Weather",
      "etd": "23:30"
    },
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": [
        {"tail_no": "N555QS", "flight": "JKCA"},
        {"tail_no": "N777QS", "flight": "CMHA"} ],
      "events": "Weather",
      "etd": "23:30"
    },
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": "null",
      "events": "Weather",
      "etd": "23:30"
    }
]


/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    return '<div class="container">'+
              '<div class="row">'+
                  '<div class="col-md-6">'+
                      'etd: ' + d.etd +
                  '</div>' +
                  '<div class="col-md-6">'+
                      getRecoveryOptions(d) +
                  '</div>' +
              '</div>'+
            '</div>';
}

function getRecoveryOptions(d) {

    var ret = '<div class="row text-center">'+
                'Recovery Options:'+
              '</div>';
    if(d.recovery_options !== 'null') {
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
        d.recovery_options.forEach( function(item) {
            ret += '<div class="row">' +
                      '<div class="col-md-2">'+item.tail_no+'</div>' +
                      '<div class="col-md-1">...</div>'+
                      '<div class="col-md-1">'+
                        '<div class="dropdown">'+
                          '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'+
                              '<span class="glyphicon glyphicon-empty-dot"></span>'+
                              '<span class="caret"></span>'+
                          '</button>'+
                          '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                          '</ul>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-md-1">'+
                        '<div class="dropdown">'+
                          '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                          '<span class="caret"></span></button>'+
                          '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                          '</ul>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-md-1">'+
                        '<div class="dropdown">'+
                          '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                          '<span class="caret"></span></button>'+
                          '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                          '</ul>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-md-1">'+
                        '<div class="dropdown">'+
                          '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                          '<span class="caret"></span></button>'+
                          '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                          '</ul>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-md-1">'+
                        '<div class="dropdown">'+
                          '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                          '<span class="caret"></span></button>'+
                          '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                          '</ul>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-md-1">'+
                        '<div class="dropdown">'+
                          '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                          '<span class="caret"></span></button>'+
                          '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                          '</ul>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-md-1">'+
                        '<div class="dropdown">'+
                          '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                          '<span class="caret"></span></button>'+
                          '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                          '</ul>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-md-1">'+
                        '<div class="dropdown">'+
                          '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-empty-dot"></span>'+
                          '<span class="caret"></span></button>'+
                          '<ul class="dropdown-menu" id="divNewNotifications" role="menu" aria-labelledby="menu1">'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-green-dot"></span>Yes</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-yellow-dot"></span>Maybe</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-red-dot"></span>No</a></li>'+
                            '<li onclick="dropdown(this);" role="presentation"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-blue-dot"></span>Working</a></li>'+
                          '</ul>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-md-1" style="margin-top:10px;"> <span class="glyphicon glyphicon-remove"></span> </div>'+
                    '</div>';
                    counter++;
        });
    }

    ret += '<div class="row text-center" style="margin-top:15px;">'+
              '<button class="btn btn-default">Add</button>'+
            '</div>';
    return ret;
}

$(document).ready(function() {
    var table = $('#example').DataTable( {
        data: dataset,
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "tail_no" },
            { "data": "flight" },
            { "data": "events" },
            { "data": "messages" },
            { "data": "recovery_options" }
        ],
        "aoColumnDefs":[{
          "aTargets":[ 5 ],
          "mRender": function(data, type, full) {
            return (data == "null") ? "No" : "Yes";
          }
        }],
        "order": [[1, 'asc']]
    } );

    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

} );

function dropdown(node){
    var y = node.parentNode.previousSibling
    y.innerHTML = node.children[0].children[0].outerHTML + '<span class="caret"></span></button>';
}
