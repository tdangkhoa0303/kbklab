
$(document).ready(function(){
var count = 0
$('#cm').click(function(){
	
	$('#cm').effect("bounce", { times:3 }, 350);
	
	
	
	$('#xxxddd').before($('<input>',{
			type:'text',
			name:'Ingredient_name'.concat(count.toString()),
			placeholder:'Ingredient_name'
		}))
	$('#xxxddd').before($('<input>',{
			type:'text',
			name:'Ingredient_amount'.concat(count.toString()),
			placeholder:'Ingredient_amount'
		}))
	$('#xxxddd').before($('<input>',{
			type:'text',
			name:'Measurement_unit'.concat(count.toString()),
			placeholder:'Measurement_unit'
		}))
	count++
	
		
	})
	
})