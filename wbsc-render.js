function renderActionButtons() {
	var actionButtonsContainer = document.createElement("div");
	actionButtonsContainer.setAttribute('id', "wbsc-toolbar");
	actionButtonsContainer.setAttribute('class', "wbsc-buttons");
	
	var generateButton = document.createElement("button");
	generateButton.setAttribute('id', "generate-button");
	generateButton.setAttribute('type', "button");
	generateButton.setAttribute('class', "btn btn-primary wbsc-action-button");
	generateButton.setAttribute('onclick', "drawAction()");
	generateButton.innerHTML = "Generate action";
	actionButtonsContainer.appendChild(generateButton);
	
	var renderBRButton = document.createElement("button");
	renderBRButton.setAttribute('id', "batter-runner-button");
	renderBRButton.setAttribute('type', "button");
	renderBRButton.setAttribute('class', "btn btn-info wbsc-render-button");
	renderBRButton.setAttribute('onclick', "renderInputsForRunningBatter()");
	renderBRButton.innerHTML = " +BR ";
	actionButtonsContainer.appendChild(renderBRButton);
	
	var container = document.getElementById("wbsc-inputs");
	container.appendChild(actionButtonsContainer);
}

function renderInputsForBatter() {
	var batterInputsContainer = document.createElement("div");
	batterInputsContainer.setAttribute('id', "batter-inputs");
	batterInputsContainer.setAttribute('class', "wbsc-inputs");
	
	var baseActionLabel = document.createElement("label");
	baseActionLabel.setAttribute('for', "baseAction");
	baseActionLabel.innerHTML = "Base action:";
	batterInputsContainer.appendChild(baseActionLabel);
	
	var baseAction = document.createElement("select");
	baseAction.setAttribute('id', "baseAction");
	baseAction.setAttribute('onchange', "changeBaseAction()");
	baseAction.innerHTML = renderDefaultBaseAction();
	batterInputsContainer.appendChild(baseAction);
	
	batterInputsContainer.appendChild(document.createElement("br"));
	
	var specificActionLabel = document.createElement("label");
	specificActionLabel.setAttribute('for', "specificAction");
	specificActionLabel.innerHTML = "Specific action:";
	batterInputsContainer.appendChild(specificActionLabel);
	
	var specificAction = document.createElement("select");
	specificAction.setAttribute('id', "specificAction");
	specificAction.setAttribute('onchange', "changeSpecificAction()");
	specificAction.innerHTML = '<option class="blank" />';
	batterInputsContainer.appendChild(specificAction);
	
	batterInputsContainer.appendChild(document.createElement("br"));
	
	var playerSelection1Label = document.createElement("label");
	playerSelection1Label.setAttribute('for', "playerSelection1");
	playerSelection1Label.innerHTML = "Player 1:";
	batterInputsContainer.appendChild(playerSelection1Label);
	
	var playerSelection1 = document.createElement("select");
	playerSelection1.setAttribute('id', "playerSelection1");
	playerSelection1.setAttribute('disabled', "disabled");
	playerSelection1.setAttribute('onchange', "changePlayerSelection()");
	batterInputsContainer.appendChild(playerSelection1);
	
	batterInputsContainer.appendChild(document.createElement("br"));
	
	var playerSelection2Label = document.createElement("label");
	playerSelection2Label.setAttribute('for', "playerSelection2");
	playerSelection2Label.innerHTML = "Player 2:";
	batterInputsContainer.appendChild(playerSelection2Label);
	
	var playerSelection2 = document.createElement("select");
	playerSelection2.setAttribute('id', "playerSelection2");
	playerSelection2.setAttribute('disabled', "disabled");
	batterInputsContainer.appendChild(playerSelection2);
	
	var container = document.getElementById("wbsc-inputs");
	container.appendChild(batterInputsContainer);
}

function renderInputsForRunningBatter() {
	var container = document.getElementById("wbsc-inputs");
	var toolbar = document.getElementById("wbsc-toolbar");
	
	var batterRunnerInputsContainer = document.createElement("div");
	batterRunnerInputsContainer.setAttribute('id', "batter-runner-inputs");
	batterRunnerInputsContainer.setAttribute('class', "wbsc-inputs");
	
	var brBaseLabel = document.createElement("label");
	brBaseLabel.setAttribute('for', "brBase");
	brBaseLabel.innerHTML = "Base:";
	batterRunnerInputsContainer.appendChild(brBaseLabel);
	
	var brBase = document.createElement("select");
	brBase.setAttribute('id', "brBase");
	brBase.innerHTML = renderDefaultBrBase();
	batterRunnerInputsContainer.appendChild(brBase);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	var brActionResultLabel = document.createElement("label");
	brActionResultLabel.setAttribute('for', "brActionResult");
	brActionResultLabel.innerHTML = "Action result:";
	batterRunnerInputsContainer.appendChild(brActionResultLabel);
	
	var brActionResult = document.createElement("select");
	brActionResult.setAttribute('id', "brActionResult");
	brActionResult.setAttribute('onchange', "changeBrActionResult()");
	brActionResult.innerHTML = renderDefaultBrActionResult();
	batterRunnerInputsContainer.appendChild(brActionResult);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	var brSpecificActionLabel = document.createElement("label");
	brSpecificActionLabel.setAttribute('for', "brSpecificAction");
	brSpecificActionLabel.innerHTML = "Specific action:";
	batterRunnerInputsContainer.appendChild(brSpecificActionLabel);
	
	var brSpecificAction = document.createElement("select");
	brSpecificAction.setAttribute('id', "brSpecificAction");
	batterRunnerInputsContainer.appendChild(brSpecificAction);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	var brPlayer1Label = document.createElement("label");
	brPlayer1Label.setAttribute('for', "brPlayer1");
	brPlayer1Label.innerHTML = "Player 1:";
	batterRunnerInputsContainer.appendChild(brPlayer1Label);
	
	var brPlayer1 = document.createElement("select");
	brPlayer1.setAttribute('id', "brPlayer1");
	brPlayer1.innerHTML = renderDefaultPlayerSelection();
	batterRunnerInputsContainer.appendChild(brPlayer1);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	var brPlayer2Label = document.createElement("label");
	brPlayer2Label.setAttribute('for', "brPlayer2");
	brPlayer2Label.innerHTML = "Player 2:";
	batterRunnerInputsContainer.appendChild(brPlayer2Label);
	
	var brPlayer2 = document.createElement("select");
	brPlayer2.setAttribute('id', "brPlayer2");
	brPlayer2.innerHTML = renderDefaultPlayerSelection();
	batterRunnerInputsContainer.appendChild(brPlayer2);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	container.insertBefore(batterRunnerInputsContainer, toolbar);
	
}

/*
function renderInputsForRunner() {
}
*/

function renderDefaultBaseAction() {
	var options = [];
	options.push('<option value=""></option>');
	options.push('<option value="StrikeOut">Strike out</option>');
	options.push('<option value="GroundOut">Ground out</option>');
	options.push('<option value="FlyOut">Fly out</option>');
	options.push('<option value="Hit">Hit</option>');
	options.push('<option value="FC">Fielder\'s choice</option>');
	options.push('<option value="Error">Error</option>');
	options.push('<option value="Advance">Advance to 1st</option>');
	return options;
}

function renderDefaultPlayerSelection() {
	var options = [];
	options.push('<option value=""></option>');
	options.push('<option value="1">Pitcher (P)</option>');
	options.push('<option value="2">Catcher (C)</option>');
	options.push('<option value="3">1st Baseman (1B)</option>');
	options.push('<option value="4">2nd Baseman (2B)</option>');
	options.push('<option value="5">3rd Baseman (3B)</option>');
	options.push('<option value="6">Shortstop (SS)</option>');
	options.push('<option value="7">Left Fielder (LF)</option>');
	options.push('<option value="8">Center Fielder (CF)</option>');
	options.push('<option value="9">Right Fielder (RF)</option>');
	return options;
}

function renderDefaultBrBase() {
	var options = [];
	options.push('<option value=""></option>');
	options.push('<option value="1">1st</option>');
	options.push('<option value="2">2nd</option>');
	options.push('<option value="3">3rd</option>');
	options.push('<option value="4">Home</option>');
	return options;
}

function renderDefaultBrActionResult() {
	var options = [];
	options.push('<option value=""></option>');
	options.push('<option value="safe">Safe</option>');
	options.push('<option value="out">Out</option>');
	return options;
}