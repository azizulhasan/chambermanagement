
export  class FormValue {
	getFormattedDynamicAttribute(formData) {
		let data = {};
		for (const [keyName, value] of formData) {
			let key = keyName;
			if (keyName.includes('[]')) {
				key = keyName.replace('[]', '');
				if(data.hasOwnProperty(key)){
					let index = data[key].length;
					data[key][index] = value;
				}else{
					data[key] = [value];
				}

			} else {
				data[keyName] = value;
			}
		}

		return data;
	}
}
