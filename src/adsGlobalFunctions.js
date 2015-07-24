// Automatically apply numeric formatting to elements with a data attribute
$(document).on('blur', '[data-decimals]', function() {
	var decimals = $(this).attr('data-decimals');
	
	limit_decimals($(this), decimals);

});

// Parse a number containing commas
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

// Restrict a number to a certain amount of decimals places
function limit_decimals(object, precision) {
	var num = object.val().replace(/,/g, '');
	if (isNaN( parseFloat(num) ))
		return;
	
	num = parseFloat(num);
    object.val(numberWithCommas(num.toFixed(precision)));
}

// Set datables to display a specified length of data
function updateDataTableLength(key, length) {
	blockUI();

	var request = $.ajax({
		method: "POST",
		url: urlDataTableUpdateLengthPost,
		cache: false,
		data: { key: key, length: length}
		});

	request.done(function( msg ) {
		$.unblockUI();

	});

	request.fail(function( jqXHR, textStatus ) {
		$.unblockUI();
		alert( "Request failed: " + textStatus );
	});

}

$(document).on('change', '.dataTables_length select', function() {
	updateDataTableLength('datatable.length', $(this).val());
});

$(document).ready(function () {
	$('.dataTables_filter input').addClass('form-control').attr('placeholder','Search');
	$('.dataTables_length select').select2({minimumResultsForSearch: 6});
});

function blockUI() {
	$.blockUI({ message: '' });
}

// Fix for duplicate modals
$(document).on('hidden.bs.modal', function (e) {
    $(e.target).removeData('bs.modal');
});

// Hides data messages
window.setTimeout(function() {
    $(".alert-removable").fadeTo(1500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
}, 2500);
