function write_header(_text, _type, _align, _style) {
	var _write = "<h" + _type + " ";
	_write += `align="` + _align + `"`;
	_write += `style="` + _style + `"`;
	_write += ">" + _text + "</h" + _type + ">";
	document.write(_write);
}

function write_input(_id, _text, _type) {
	var	_write = "<p><b>Enter your " + _text + ":</b><br>",
		_width = 80;
		
	if(_type == "textarea"){
		_write += "<" + _type + ` id="` + _id + `" rows=9 cols=61></` + _type + ">";
	}
	else{
		_write += `<input type="` + _type + `" id="` + _id + `" size=80 />`;
	}
	
	_write += "</p>";
	
	document.write(_write);
}

function write_employment(_id, _text) {
	document.write("<br>");
	write_header(_text, 2, "left", "");
	write_input(_id + "Strt", "entry date", "date");
	write_input(_id + "Exit", "exit date", "date");
	write_input(_id + "Info", "details", "textarea");
}

function resume_date(_dateStrt, _dateExit) {
	var _text = "";
	if(_dateStrt != "" && _dateExit != ""){
		var	_strt = new Date(_dateStrt + "T00:00"),
			_exit = new Date(_dateExit + "T00:00"),
			_mnthList = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
			
		_text += _mnthList[_strt.getMonth()];
		if(_strt.getFullYear() != _exit.getFullYear()){
			_text += " " + _strt.getFullYear();
		}
		_text += " - " + _mnthList[_exit.getMonth()] + " " + _exit.getFullYear();
	}
	return _text;
}

function resume_row(_name, _text) {
	var t = "";
	if(_name != "" || _text != ""){
		t += `<div class="row">`;
		if(_name != "") t += `<div class="col name">` + _name + "</div>";
		if(_text != "") t += `<div class="col text">` + _text + "</div>";
		t += "</div>";
	}
	return t;
}

function resume_create() {
	 // Compile Resume Values:
    var	_keys = [
			"name", "addr", "cell", "mail", "info", "goal", "educ",
			"job1Strt", "job1Exit", "job1Info",
			"job2Strt", "job2Exit", "job2Info",
			"job3Strt", "job3Exit", "job3Info",
			"job4Strt", "job4Exit", "job4Info",
			"refsBusi"
		],
		_dict = {};
		
	for(var i = 0; i < _keys.length; i++){
		var _name = _keys[i];
		_dict[_name] = document.getElementById(_name).value;
	}
	_dict["refsChar"] = "Upon request";
	
	 // Email Validation:
	if(!_dict["mail"].includes("@")){
		alert("Email address must contain the @ symbol.");
		return 0;
	}
	
	 // Create Resume:
	var _windowText = `
	<html>
	
		<head>
		
			<title>Resume</title>
			
			<style>
				* {
					font-family: "Courier New";
				}
				.col {
					float: left;
				}
				.name {
					width: 40%;
				}
				.text {
					width: 60%;
					white-space: pre-line;
				}
				.row:after {
					content: "";
					display: table;
					padding-bottom: 16px;
					box-sizing: border-box;
					clear: both;
				}
			</style>
			
		</head>
		
		<body>
		
			<header>
			
				<p>
					${_dict["name"]}<br>
					${_dict["addr"]}<br>
					${_dict["cell"]} / ${_dict["mail"]}
				</p>
				<hr>
				
			</header>
			
			${resume_row("CAREER<br>OBJECTIVES",							_dict["goal"])}
			${resume_row("PERSONAL DATA",									_dict["info"])}
			${resume_row("EDUCATION",										_dict["educ"])}
			${resume_row("EMPLOYMENT<br>EXPERIENCE",						"")}
			${resume_row(resume_date(_dict["job1Strt"], _dict["job1Exit"]),	_dict["job1Info"])}
			${resume_row(resume_date(_dict["job2Strt"], _dict["job2Exit"]),	_dict["job2Info"])}
			${resume_row(resume_date(_dict["job3Strt"], _dict["job3Exit"]),	_dict["job3Info"])}
			${resume_row(resume_date(_dict["job4Strt"], _dict["job4Exit"]),	_dict["job4Info"])}
			${resume_row("CHARACTER<br>REFERENCES",							_dict["refsChar"])}
			${resume_row("BUSINESS<br>REFERENCES",							_dict["refsBusi"])}
			
		</body>
		
	</html>`;
	
    var _window = window.open("/resume", "resume", "width=800,height=800");
    _window.document.write(_windowText);
}

 // Headers:
write_header(
	"Ryan E. Wilke",
	1,
	"center",
	"color:red; font-family:Tahoma"
);
write_header(
	"CSC 227",
	2,
	"center",
	"color:red; font-family:Garamond; font-style:italic"
);
write_header(
	"Build Your Resume",
	1,
	"center",
	""
);

 // Submit Zone:
document.write(`<input type="button" value="Create Resume" onclick="resume_create()"/>`);

 // Input Zone:
write_input("name", "full name",				"text");
write_input("addr", "address",					"text");
write_input("cell", "phone number",				"text");
write_input("mail", "email address",			"text");
write_input("info", "personal information",		"textarea");
write_input("goal", "career objectives",		"textarea");
write_input("educ", "educational background",	"textarea");
write_employment("job1", "Previous Employment 1");
write_employment("job2", "Previous Employment 2");
write_employment("job3", "Previous Employment 3");
write_employment("job4", "Previous Employment 4");
document.write("<br><br>");
write_input("refsBusi", "business references", "textarea");