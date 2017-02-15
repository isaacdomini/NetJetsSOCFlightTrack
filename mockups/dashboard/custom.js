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

    var ret = '<div class="row">'+
                'Recovery Options:'+
              '</div>';
    if(d.recovery_options !== 'null') {
        ret += '<div class="row">'+
                  '<div class="col-md-2"><b>Flights</b></div>' +
                  '<div class="col-md-1">...</div>'+
                  '<div class="col-md-1">AB</div>'+
                  '<div class="col-md-1">AB</div>'+
                  '<div class="col-md-1">AB</div>'+
                  '<div class="col-md-1">AB</div>'+
                  '<div class="col-md-1">AB</div>'+
                  '<div class="col-md-1">AB</div>'+
                  '<div class="col-md-1">AB</div>'+
                  '<div class="col-md-1">AB</div>'+
                  '<div class="col-md-1">-</div>'+
                '</div>';
        /*d.recovery_options.forEach( function(item) {
            ret += item.tail_no + ' ' + item.flight;
        });*/
    }

    ret += '<div class="row">'+
              '<button>Add</button>'+
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