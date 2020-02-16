/**
 * VPD
 * @author plant
 * @license MIT
 * @credit Northern_Loki (sha256::6F290BF833967127BE26C92C8F6B1C1A3949C55A7EABCEF3ECC785CD2D38D30D)
 */

function VPD () {
	
	// early veg
	this.range = [];
	this.range[1] = [];
	this.range[1]['min'] = 0.4;
	this.range[1]['max']= 0.8;
	// late veg
	this.range[2] = [];
	this.range[2]['min'] = 0.8;
	this.range[2]['max'] = 1.2;
	// early flower
	this.range[3] = [];
	this.range[3]['min'] = 1.2;
	this.range[3]['max'] = 1.6;
	
	this.getVPD = function (temperature, humidity) {
		// buck_1981
		var svpd = (0.61121 * Math.pow(2.7182818284590452353602875, (17.502 * temperature) / (temperature + 240.97)));
		var vpd_atmosphere = (humidity / 100) * svpd;
		var vpd_leaf = svpd;
		return vpd_leaf - vpd_atmosphere;
	}
	
	// range; 1 = early veg, 2 = late veg, 3 = late flower
	this.createHTMLTable = function (range) {
		var humidity = 0;
		var humidity_step = 5;
		var temperature = 5;
		var vpd = 0;
		// create the HTML table
		var table = document.createElement('table');
		// add class for style
		table.className = "vpd-table";
		var row = document.createElement('tr');
		// empty cell
		var cell = document.createElement('th');
		row.appendChild(cell);
		for (humidity = 0; humidity <= 100; humidity += humidity_step) {
			cell = document.createElement('th');
			cell.innerText = humidity + '%';
			row.appendChild(cell);
		}
		table.appendChild(row);
		// create rows
		for (temperature = 5; temperature <= 40; temperature += 1) {
			row = document.createElement('tr');
			cell = document.createElement('th');
			cell.innerText = temperature + '°C';
			cell.className = '';
			row.appendChild(cell);
			for (humidity = 0; humidity <= 100; humidity += humidity_step) {
				// get vpd
				vpd = this.getVPD(temperature, humidity);
				// create vpd cell
				cell = document.createElement('td');
				if (vpd >= this.range[range]['min'] && vpd <= this.range[range]['max']) 
					cell.className = 'in-range';
				else 
					cell.className = 'out-of-range';
				cell.innerText = vpd.toFixed(3);
				row.append(cell);
			}
			table.appendChild(row);
		}
		// return the DOM element
		return table;
	}
	
}