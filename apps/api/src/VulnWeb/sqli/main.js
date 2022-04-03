var count=1
	
// This part is for adding recipes to the list
	function select_append(id_name,r_text,r_id,s_name){
		$(id_name).append($('<option>',{
			text: r_text,
			value: r_id,
			id: s_name
		}))
		++count
	}
	



