var dataset = [
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": "N555QS",
      "events": "Weather",
      "etd": "23:30"
    },
    {
      "tail_no": "N555QS",
      "flight": "JKCA",
      "messages": "Hello",
      "recovery_options": "N999QS",
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
      "recovery_options": "N555QS",
      "events": "Weather",
      "etd": "23:30"
    },
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": "N555QS",
      "events": "Weather",
      "etd": "23:30"
    },
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": "N555QS",
      "events": "Weather",
      "etd": "23:30"
    },
    {
      "tail_no": "N999QS",
      "flight": "KJAC",
      "messages": "Hi",
      "recovery_options": "N555QS",
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
    return '<table cellpadding="5" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Recovery Options:</td>'+
            '<td>'+d.recovery_options+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>etd:</td>'+
            '<td>'+d.etd+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
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