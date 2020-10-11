function renderAction() {
	var bInput = getInput(input_b);
	var brInput = getInput(input_br);
	var r1Input = getInput(input_r1);
	var r2Input = getInput(input_r2);
	var r3Input = getInput(input_r3);
	
	var playersInvolved = 0;
	var validation = "";
    if (bInput != null) {
		playersInvolved++;
		validation += attachValidation(validation, bInput[input_validation]);
	}
	if (brInput != null) {
		validation += attachValidation(validation, brInput[input_validation]);
	}
    if (r1Input != null) {
		playersInvolved++;
		validation += attachValidation(validation, r1Input[input_validation]);
	}
	if (r2Input != null) {
		playersInvolved++;
		validation += attachValidation(validation, r2Input[input_validation]);
	}
	if (r3Input != null) {
		playersInvolved++;
		validation += attachValidation(validation, r3Input[input_validation]);
	}
	
	if (validation == "") {
		window.canvas.height = playersInvolved * h - ((playersInvolved - 1) * 8);
        window.batter = playersInvolved;
		window.vOffset = 0;
		window.hOffset = 75;
		var displayed = 1;
		if (r3Input != null) {
			r3Input[input_origBase] = 3;
			drawAction(displayed++, r3Input, null, true);
			window.vOffset += h - 8;
		}
		if (r2Input != null) {
			r2Input[input_origBase] = 2;
			drawAction(displayed++, r2Input, null, true);
			window.vOffset += h - 8;
		}
		if (r1Input != null) {
			r1Input[input_origBase] = 1;
			drawAction(displayed++, r1Input, null, true);
			window.vOffset += h - 8;
		}
		if (bInput != null) {
			drawAction(displayed++, bInput, brInput, true);
			window.vOffset += h - 8;
		}
	} else {
		alert("The given input is invalid:\n" + validation);
	}
}

function drawAction(battingOrder, mainInput, extraInput, clear) {
	if (clear) {
		drawBackground(battingOrder);
	}
	
	if (mainInput[input_origBase] != null) {
		
		var origBaseAction = "*";
		if (mainInput[input_tie] == true) {
			origBaseAction = "TIE";
		}
		
		drawAdvance(mainInput[input_origBase], origBaseAction, "");
	}
	
	var base = parseInt(mainInput[input_base]);
	var action = mainInput[input_spec_action];
	var pos = mainInput[input_position];
	var outcome = "advance";
	
	switch (action) {
		case "EDF":
			base = 0;
			break;
		case "KS":
		case "KSO":
		case "KL":
		case "KLO":
		case "F":
		case "P":
		case "L":
		case "FF":
		case "FP":
		case "FL":
		case "IF":
		case "SH":
		case "SF":
		case "FSF":
			outcome = "out";
			base = 0;
			break;
		case "1B":
		case "1BB":
		case "O":
		case "FC":
		case "KSET":
		case "KSEM":
		case "KSWP":
		case "KSPB":
		case "KSFC":
		case "KLET":
		case "KLEM":
		case "KLWP":
		case "KLPB":
		case "KLFC":
		case "SHE":
		case "SHFC":
		case "SFE":
		case "SFO":
			base = 1;
			break;
		case "2B":
		case "2BG":
			base = 2;
			break;
		case "3B":
			base = 3;
			break;
		case "HR":
		case "HRI":
			base = 4;
			break;
		case "BB":
		case "IBB":
		case "HP":
			base = 1;
			pos = "";
			break;
	    case "bb":
	    case "ibb":
	    case "hp":
		case "WP":
		case "PB":
		case "BK":
		case "IP":
		case "SB":
			pos = window.batter;
			break;
		case "A":
			pos = "";
			break;
		case "GO":
		case "GOB":
			outcome = "out";
			if (base == 1) {
				base = 0;
			}
			break;
		case "CSO":
			outcome = "out";
			break;
		case "EF":
		case "ET":
		case "EM":
		case "ED":
			// np adjustment
			break;
	}
	
	if (pos != null) {
		if (pos[pos.length - 1] == "X") {
			pos = pos.substring(0, pos.length - 1) + "4";
		} else if (pos[pos.length - 1] == "Y") {
			pos = pos.substring(0, pos.length - 1) + "5";
		} else if (pos[pos.length - 1] == "Z") {
			pos = pos.substring(0, pos.length - 1) + "2";
		}
	}
	
	if (outcome == "advance") {
		drawAdvance(base, action, pos);
		
		if (extraInput != null) {
			drawAction(battingOrder, extraInput, null, false);
			drawConnector(base, parseInt(extraInput[input_base]));
		}
	} else {
		drawOut(base, action, pos);
	}
}

function drawBackground(battingOrder) {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0 + vOffset, w, h);
	
	ctx.lineWidth = 8;
	ctx.strokeStyle = '#00a7d7';
	
	ctx.strokeRect(4, 4 + vOffset, hOffset, h - 8);
	
	ctx.font = "bold 60px Verdana";
	ctx.textAlign = "center";
	ctx.fillStyle = '#00a7d7';
	ctx.fillText(battingOrder, 40,  h2 + 25 + vOffset);
	
	ctx.strokeRect(4 + hOffset, 4 + vOffset, w - 8, h - 8);
	
	ctx.lineWidth = 4;
	
	ctx.beginPath();
	ctx.moveTo(w2 + hOffset, 0 + vOffset);
	ctx.lineTo(w2 + hOffset, h3 + vOffset);
	ctx.stroke();
	ctx.moveTo(w2 + hOffset, h + vOffset);
	ctx.lineTo(w2 + hOffset, h - h3 + vOffset);
	ctx.stroke();
	ctx.moveTo(0 + hOffset, h2 + vOffset);
	ctx.lineTo(w3 + hOffset, h2 + vOffset);
	ctx.stroke();
	ctx.moveTo(w + hOffset, h2 + vOffset);
	ctx.lineTo(w - h3 + hOffset, h2 + vOffset);
	ctx.stroke();
}

function drawOut(base, situation, players) {
	ctx.lineWidth = 7;
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	switch (base) {
		case 0:
		case 1:
			ctx.arc(h2 + hOffset, h2 + vOffset, h2 - 20, 0, 2 * Math.PI);
			break;
		case 2:
			drawAdvanceLine(1);
			ctx.moveTo(h2 - 38 + hOffset + h3 - 12, h2 - 38 + vOffset);
			ctx.arc(h2 - 38 + hOffset, h2 - 38 + vOffset, h3 - 12, 0, 2 * Math.PI);
			break;
		case 3:
			drawAdvanceLine(2);
			ctx.moveTo(w4 + hOffset + h5, h2 + vOffset);
			ctx.arc(w4 + hOffset, h2 + vOffset, h5, 0, 2 * Math.PI);
			break;
		case 4:
			drawAdvanceLine(3);
			ctx.moveTo(w4 + hOffset + h5, h4 * 3 + vOffset);
			ctx.arc(w4 + hOffset, h4 * 3 + vOffset, h5, 0, 2 * Math.PI);
			break;
	}
	ctx.stroke();
	
	situationToWrite = situation + players;	
	writeSituation(base, situationToWrite);
}

function drawAdvance(base, situation, players) {
	drawAdvanceLine(base);
	situationToWrite = situation + players;
	writeSituation(base, situationToWrite);
}

function drawAdvanceLine(base) {
	ctx.lineWidth = 8;
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	if (base > 0) {
		ctx.moveTo(w2 + hOffset, h - h3 + vOffset);
		ctx.lineTo(w - w3 + hOffset, h2 + vOffset);
	}
	if (base > 1) {
		ctx.lineTo(w2 + hOffset, h3 + vOffset);
	}
	if (base > 2) {
		ctx.lineTo(w3 + hOffset, h2 + vOffset);
	}
	if (base > 3) {
		ctx.lineTo(w2 + 3 + hOffset, h - h3 + 3 + vOffset);
	}
	ctx.stroke();
}

function drawConnector(base1, base2) {
	if (base1 < 1 || base1 > 3 || base2 < 1 || base2 > 4 || base1 >= base2) {
		alert("Invalid input for consecutive action!");
	} else {
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
		
		var gap = 16;
		var length = 35;
		var arc = 20;
		
		ctx.beginPath();
		switch (base1) {
			case 1:
				ctx.moveTo(w - gap + hOffset, h2 + length + vOffset);
				ctx.lineTo(w - gap + hOffset, h2 - length + vOffset);
				if (base2 > 2) {
					ctx.lineTo(w - gap + hOffset, gap + vOffset + arc);
					ctx.moveTo(w - gap + hOffset - arc, gap + vOffset);
					ctx.lineTo(w2 - length + hOffset, gap + vOffset);
					ctx.arc(w - gap + hOffset - arc, gap + vOffset + arc, arc, 1.5*Math.PI, 0);
				}
				if (base2 > 3) {
					ctx.moveTo(w2 - length + hOffset, gap + vOffset);
					ctx.lineTo(gap + hOffset + arc, gap + vOffset);
					ctx.moveTo(gap + hOffset, gap + vOffset + arc);
					ctx.lineTo(gap + hOffset, h2 + length - 10 + vOffset);
					ctx.arc(gap + hOffset + arc, gap + vOffset + arc, arc, Math.PI, 1.5*Math.PI);
				}
				break;
			case 2:
				ctx.moveTo(w2 + length + hOffset, gap + vOffset);
				ctx.lineTo(w2 - length + hOffset, gap + vOffset);
				if (base2 > 3) {
					ctx.moveTo(w2 - length + hOffset, gap + vOffset);
					ctx.lineTo(gap + hOffset + arc, gap + vOffset);
					ctx.moveTo(gap + hOffset, gap + vOffset + arc);
					ctx.lineTo(gap + hOffset, h2 + length - 10 + vOffset);
					ctx.arc(gap + hOffset + arc, gap + vOffset + arc, arc, Math.PI, 1.5*Math.PI);
				}
				break;
			case 3:
				ctx.moveTo(gap + hOffset, h2 - length + vOffset);
			    ctx.lineTo(gap + hOffset, h2 + length - 10 + vOffset);
				break;
		}
		ctx.stroke();
	}
}

function writeSituation(base, situation) {
	if (situation == "*") {
		ctx.fillStyle = "red";
	} else {
		ctx.fillStyle = "black";
	}
	
	ctx.font = "bold 45px Verdana";
	var offset = 20;
	
	switch (base) {
		case 0:
			if (situation.startsWith("EDF")) {
				esituation = "E" + situation.substring(3) + " DF";
				ctx.font = "bold 20px Verdana";
				ctx.fillText(esituation, w2 * 1.5 + 18 + hOffset, h2 * 1.5 + 50 + vOffset);
			} else if (situation.startsWith("KSO") || situation.startsWith("KLO")) {
				ksituation1 = situation.substring(0,2);
				ctx.font = "bold 80px Verdana";
				offset = -10;
				ctx.fillText(ksituation1, w2 + hOffset, h2 + offset + vOffset);
				ksituation2 = situation.substring(3);
				if (ksituation2.length > 3) {
					offset = 60;
					ctx.font = "bold 60px Verdana";
				} else if (ksituation2.length > 2) {
					offset = 65;
					ctx.font = "bold 72px Verdana";
				} else {
					offset = 70;
				}
				ctx.fillText(ksituation2, w2 + hOffset, h2 + offset + vOffset);
			} else if (situation.startsWith("SH")) {
				ctx.font = "bold 75px Verdana";
				offset = -10;
				ctx.fillText("SH", w2 + hOffset, h2 + offset + vOffset);
				if (situation.length > 5) {
					ctx.font = "bold 58px Verdana";
					offset = 60;
				} else if (situation.length > 4) {
					ctx.font = "bold 68px Verdana";
					offset = 65;
				} else {
					offset = 70
				}
				ctx.fillText(situation.substring(2), w2 + hOffset, h2 + offset + vOffset);
			} else if (situation.startsWith("FSF")) {
				ctx.font = "bold 75px Verdana";
				offset = -5;
				ctx.fillText("FSF", w2 + hOffset, h2 + offset + vOffset);
				offset = 75;
				ctx.fillText(situation.substring(3), w2 + hOffset, h2 + offset + vOffset);
			} else {
				if (situation.startsWith("GOB")) {
					situation = situation.substring(3) + "B";
				} else if (situation.startsWith("GO")) {
					situation = situation.substring(2);
				}
				if (situation.length > 5) {
					ctx.font = "bold 45px Verdana";
					offset = 16;
				} else if (situation.length > 4) {
					ctx.font = "bold 52px Verdana";
					offset = 20;
				} else if (situation.length > 3) {
					ctx.font = "bold 68px Verdana";
					offset = 26;
				} else if (situation.length > 2) {
					ctx.font = "bold 90px Verdana";
					offset = 34;
				} else {
					ctx.font = "bold 110px Verdana";
					offset = 42
				}
				ctx.fillText(situation, w2 + hOffset, h2 + offset + vOffset);
			}
			break;
		case 1:
			if (situation.startsWith("A")) {
				ctx.fillText(window.batter, w2 * 1.5 + 12 + hOffset, h2 * 1.5 + 25 + vOffset);
		    } else if (situation.startsWith("K")) {
				ksituation1 = situation.substring(0,2);
				ctx.font = "bold 45px Verdana";
				offset = -5;
				ctx.fillText(ksituation1, w2 * 1.5 + hOffset, h2 * 1.5 + offset + vOffset);
				ksituation2 = situation.substring(2);
				if (ksituation2.startsWith("ET")) {
					ksituation2 = "E" + ksituation2.substring(2) + "T";
				} else if (ksituation2.startsWith("EM")) {
					if (ksituation2.length > 2) {
						ksituation2 = ksituation2.substring(2, ksituation2.length - 1) + "E" + ksituation2.substring(ksituation2.length - 1);
					} else {
						ksituation2 = "E";
					}
				} else if (ksituation2.startsWith("FC")) {
					ksituation2 = "O" + ksituation2.substring(2);
				}
				if (ksituation2.length > 4) {
					ctx.font = "bold 28px Verdana";
					offset = 36;
				} else if (ksituation2.length > 3) {
					ctx.font = "bold 36px Verdana";
					offset = 38;
				} else {
					offset = 40
				}
				ctx.fillText(ksituation2, w2 * 1.5 + hOffset, h2 * 1.5 + offset + vOffset);
			} else if (situation.startsWith("FC") || situation.startsWith("SH") || situation.startsWith("SF")) {
				situation1 = situation.substring(0,2);
				ctx.font = "bold 45px Verdana";
				offset = -5;
				ctx.fillText(situation1, w2 * 1.5 + hOffset, h2 * 1.5 + offset + vOffset);
				situation2 = situation.substring(2);
				if (situation2.startsWith("E") && situation2.length > 2) {
					situation2 = situation.substring(3, situation.length - 1) + "E" +  situation.substring(situation.length - 1);
				} 
				if (situation2.length > 4) {
					ctx.font = "bold 28px Verdana";
					offset = 36;
				} else if (situation2.length > 3) {
					ctx.font = "bold 36px Verdana";
					offset = 38;
				} else {
					offset = 40
				}
				ctx.fillText(situation2, w2 * 1.5 + hOffset, h2 * 1.5 + offset + vOffset);
			} else if (situation.startsWith("1B")) {
				if (situation.startsWith("1BB")) {
					hitSituation = situation.substring(3) + "B";
				} else {
					hitSituation = situation.substring(2);
				}
				if (hitSituation.length > 1) {
					ctx.font = "bold 40px Verdana";
				}
				drawHitSymbol(1);
				ctx.fillText(hitSituation, w2 * 1.5 + 12 + hOffset, h2 * 1.5 + 25 + vOffset);
			} else if (situation.startsWith("E")) {
				if (situation.length > 3) {
					esituation = situation.substring(2, situation.length - 1) + "E" +  situation.substring(situation.length - 1);
				} else {
					esituation = "E" + situation.substring(2);
				}
				switch (situation[1]) {
					case "T":
						esituation += "T";
						break;
					case "D":
						esituation += "F";
						break;
				}
				if (esituation.length > 5) {
					ctx.font = "bold 24px Verdana";
					offset = 12;
				} else if (esituation.length > 4) {
					ctx.font = "bold 30px Verdana";
					offset = 16;
				} else if (esituation.length > 3) {
					ctx.font = "bold 38px Verdana";
					offset = 18;
				}
				ctx.fillText(esituation, w2 * 1.5 + hOffset, h2 * 1.5 + offset + vOffset);
			} else {
				if (situation.length > 3) {
					ctx.font = "bold 36px Verdana";
				} 
				ctx.fillText(situation, w2 * 1.5 + hOffset, h2 * 1.5 + offset + vOffset);
			}
			break;
		case 2:
			if (situation.startsWith("A")) {
				ctx.fillText(window.batter, w2 * 1.5 + hOffset, h2 * 0.5 + offset + vOffset);
			} else if (situation.startsWith("2B")) {
				drawHitSymbol(2);
				if (situation.startsWith("2BG")) {
					ctx.font = "bold 35px Verdana";
					ctx.fillText(situation.substring(3), w2 * 1.5 + 22 + hOffset, h2 * 0.5 + vOffset);
					ctx.fillText("GR", w2 * 1.5 + 22 + hOffset, h2 * 0.5 + 35 + vOffset);
				} else {
					if (situation.substring(2).length > 1) {
						ctx.font = "bold 40px Verdana";
					}
					ctx.fillText(situation.substring(2), w2 * 1.5 + 15 + hOffset, h2 * 0.5 + 25 + vOffset);
				}
			} else if (situation.startsWith("CSE")) {
				csituation = situation.substring(3, situation.length - 1) + "E" + situation.substring(situation.length - 1);
				ctx.font = "bold 40px Verdana";
				row2font = "bold 40px Verdana";
				offset = 8;
				row2offset = 30;
				if (csituation.length > 4) {
					offset = 3;
					row2offset = 26;
					row2font = "bold 24px Verdana";
				} else if (csituation.length > 3) {
					offset = 5;
					row2offset = 28;
					row2font = "bold 30px Verdana";
				}
				ctx.fillText("CS", w2 * 1.5 + hOffset, h2 * 0.5 - offset + vOffset);
				ctx.font = row2font;
				ctx.fillText(csituation, w2 * 1.5 + hOffset, h2 * 0.5 + row2offset + vOffset);
			} else if (situation.startsWith("CSO")) {
				csituation = situation.substring(3);
				ctx.font = "bold 56px Verdana";
				row2font = "bold 56px Verdana";
				offset = 45;
				row2offset = 6;
				if (csituation.length > 3) {
					offset = 35;
					row2offset = 2;
					row2font = "bold 28px Verdana";
				} else if (csituation.length > 2) {
					offset = 40;
					row2offset = 4;
					row2font = "bold 36px Verdana";
				}
				ctx.fillText("CS", w2 * 0.7 + hOffset, h2 - offset + vOffset);
				ctx.font = row2font;
				ctx.fillText(csituation, w2 * 0.7 + hOffset, h2 + row2offset + vOffset);
			} else if (situation.startsWith("E") || situation.startsWith("e")) {
				if (situation.length > 3) {
					esituation = situation.substring(2, situation.length - 1) + situation.substring(0,1) +  situation.substring(situation.length - 1);
				} else {
					esituation = situation.substring(0,1) + situation.substring(2);
				}
				switch (situation[1]) {
					case "T":
						esituation += "T";
						break;
					case "D":
						esituation += "F";
						break;
				}
				if (esituation.length > 5) {
					ctx.font = "bold 24px Verdana";
					offset = 12;
				} else if (esituation.length > 4) {
					ctx.font = "bold 30px Verdana";
					offset = 16;
				} else if (esituation.length > 3) {
					ctx.font = "bold 38px Verdana";
					offset = 18;
				}
				ctx.fillText(esituation, w2 * 1.5 + hOffset, h2 * 0.5 + offset + vOffset);
			} else if (situation.match(/O\d+/)) {
				if (situation.length > 5) {
					ctx.font = "bold 45px Verdana";
				} else {
					ctx.font = "bold 56px Verdana";
				}
				ctx.fillText(situation.substring(2), w2 * 0.7 + hOffset, h2 - offset + vOffset);
			} else {
				if (situation.length > 2) {
					ctx.font = "bold 40px Verdana";
					offset = 18;
				} 
				ctx.fillText(situation, w2 * 1.5 + hOffset, h2 * 0.5 + offset + vOffset);
			}
			break;
		case 3:
			if (situation.startsWith("A")) {
				ctx.fillText(window.batter, w2 * 0.5 + hOffset, h2 * 0.5 + offset + vOffset);
			} else if (situation.startsWith("3B")) {
				drawHitSymbol(3);
				if (situation.substring(2).length > 1) {
					ctx.font = "bold 40px Verdana";
				}
				ctx.fillText(situation.substring(2), w2 * 0.5 + 15 + hOffset, h2 * 0.5 + 25 + vOffset);
			} else if (situation.startsWith("CSE")) {
				csituation = situation.substring(3, situation.length - 1) + "E" + situation.substring(situation.length - 1);
				ctx.font = "bold 40px Verdana";
				row2font = "bold 40px Verdana";
				offset = 8;
				row2offset = 30;
				if (csituation.length > 4) {
					offset = 3;
					row2offset = 26;
					row2font = "bold 24px Verdana";
				} else if (csituation.length > 3) {
					offset = 5;
					row2offset = 28;
					row2font = "bold 30px Verdana";
				}
				ctx.fillText("CS", w2 * 0.5 + hOffset, h2 * 0.5 - offset + vOffset);
				ctx.font = row2font;
				ctx.fillText(csituation, w2 * 0.5 + hOffset, h2 * 0.5 + row2offset + vOffset);
			} else if (situation.startsWith("CSO")) {
				csituation = situation.substring(3);
				ctx.font = "bold 40px Verdana";
				row2font = "bold 40px Verdana";
				offset = 5;
				row2offset = 35;
				if (csituation.length > 3) {
					offset = 4;
					row2offset = 26;
					row2font = "bold 28px Verdana";
				} else if (csituation.length > 2) {
					offset = 3;
					row2offset = 28;
					row2font = "bold 34px Verdana";
				}
				ctx.fillText("CS", w2 * 0.5 + hOffset, h2 - offset + vOffset);
				ctx.font = row2font;
				ctx.fillText(csituation, w2 * 0.5 + hOffset, h2 + row2offset + vOffset);
			} else if (situation.startsWith("E") || situation.startsWith("e")) {
				if (situation.length > 3) {
					esituation = situation.substring(2, situation.length - 1) + situation.substring(0,1) +  situation.substring(situation.length - 1);
				} else {
					esituation = situation.substring(0,1) + situation.substring(2);
				}
				switch (situation[1]) {
					case "T":
						esituation += "T";
						break;
					case "D":
						esituation += "F";
						break;
				}
				if (esituation.length > 5) {
					ctx.font = "bold 24px Verdana";
					offset = 12;
				} else if (esituation.length > 4) {
					ctx.font = "bold 30px Verdana";
					offset = 16;
				} else if (esituation.length > 3) {
					ctx.font = "bold 38px Verdana";
					offset = 18;
				}
				ctx.fillText(esituation, w2 * 0.5 + hOffset, h2 * 0.5 + offset + vOffset);
			} else if (situation.match(/O\d+/)) {
			    if (situation.length > 5) {
					ctx.font = "bold 32px Verdana";
					offset = 12;
				} else if (situation.length > 4) {
					ctx.font = "bold 40px Verdana";
					offset = 14;
				} else {
					ctx.font = "bold 48px Verdana";
					offset = 18;
				}
				ctx.fillText(situation.substring(2), w2 * 0.5 + hOffset, h2 + offset + vOffset);
			} else {
				if (situation.length > 2) {
					ctx.font = "bold 40px Verdana";
					offset = 18;
				} 
				ctx.fillText(situation, w2 * 0.5 + hOffset, h2 * 0.5 + offset + vOffset);
			}
			break;
		case 4:
		    if (situation.startsWith("A")) {
				ctx.fillText(window.batter, w2 * 0.5 + hOffset, h2 * 1.5 + offset + vOffset);
			} else if (situation.startsWith("CSE")) {
				csituation = situation.substring(3, situation.length - 1) + "E" + situation.substring(situation.length - 1);
				ctx.font = "bold 40px Verdana";
				row2font = "bold 40px Verdana";
				offset = 8;
				row2offset = 30;
				if (csituation.length > 4) {
					offset = 3;
					row2offset = 26;
					row2font = "bold 24px Verdana";
				} else if (csituation.length > 3) {
					offset = 5;
					row2offset = 28;
					row2font = "bold 30px Verdana";
				}
				ctx.fillText("CS", w2 * 0.5 + hOffset, h2 * 1.5 - offset + vOffset);
				ctx.font = row2font;
				ctx.fillText(csituation, w2 * 0.5 + hOffset, h2 * 1.5 + row2offset + vOffset);
			} else if (situation.startsWith("CSO")) {
				csituation = situation.substring(3);
				ctx.font = "bold 40px Verdana";
				row2font = "bold 40px Verdana";
				offset = 5;
				row2offset = 35;
				if (csituation.length > 3) {
					offset = 4;
					row2offset = 26;
					row2font = "bold 28px Verdana";
				} else if (csituation.length > 2) {
					offset = 3;
					row2offset = 28;
					row2font = "bold 34px Verdana";
				}
				ctx.fillText("CS", w2 * 0.5 + hOffset, h2 * 1.5  - offset + vOffset);
				ctx.font = row2font;
				ctx.fillText(csituation, w2 * 0.5 + hOffset, h2 * 1.5 + row2offset + vOffset);
			} else if (situation.startsWith("E") || situation.startsWith("e")) {
				if (situation.length > 3) {
					esituation = situation.substring(2, situation.length - 1) + situation.substring(0,1) +  situation.substring(situation.length - 1);
				} else {
					esituation = situation.substring(0,1) + situation.substring(2);
				}
				switch (situation[1]) {
					case "T":
						esituation += "T";
						break;
					case "D":
						esituation += "F";
						break;
				}
				if (esituation.length > 5) {
					ctx.font = "bold 24px Verdana";
					offset = 12;
				} else if (esituation.length > 4) {
					ctx.font = "bold 30px Verdana";
					offset = 16;
				} else if (esituation.length > 3) {
					ctx.font = "bold 38px Verdana";
					offset = 18;
				}
				ctx.fillText(esituation, w2 * 0.5 + hOffset, h2 * 1.5 + offset + vOffset);
			} else if (situation.match(/O\d+/)) {
			    if (situation.length > 5) {
					ctx.font = "bold 32px Verdana";
					offset = 12;
				} else if (situation.length > 4) {
					ctx.font = "bold 40px Verdana";
					offset = 14;
				} else {
					ctx.font = "bold 48px Verdana";
					offset = 18;
				}
				ctx.fillText(situation.substring(2), w2 * 0.5 + hOffset, h2 * 1.5 + offset + vOffset);
			} else if (situation.startsWith("HR")) {
				if (situation.startsWith("HRI")) {
					ipr = "I";
					situation = "HR" + situation.substring(3);
				} else {
					ipr = "";
				}
				if (situation.substring(2).length > 4) {
					ctx.font = "bold 35px Verdana";
					var lOffset = 65;
				} else if (situation.substring(2).length > 3) {
					ctx.font = "bold 40px Verdana";
					var lOffset = 60;
				} else {
					ctx.font = "bold 40px Verdana";
					var lOffset = 55;
				}
				ctx.fillText(ipr + "HR", lOffset + hOffset, h2 * 1.5 - 5 + vOffset);
				ctx.fillText(situation.substring(2), lOffset + hOffset, h2 * 1.5 + 40 + vOffset);
			} else {
				if (situation.length > 2) {
					ctx.font = "bold 40px Verdana";
					offset = 18;
				} 
				ctx.fillText(situation, w2 * 0.5 + hOffset, h2 * 1.5 + offset + vOffset);
			}
			break;
	}
}

function drawHitSymbol(base) {
	ctx.lineWidth = 6;
	ctx.beginPath();
	switch (base) {
		case 1:
			ctx.moveTo(w2 + 25 + hOffset, h - 35 + vOffset);
			ctx.lineTo(w2 + 50 + hOffset, h2 + 25 + vOffset);
			ctx.moveTo(w2 + 30 + hOffset, h2 + 40 + vOffset);
			ctx.lineTo(w2 + 58 + hOffset, h2 + 45 + vOffset);
			break;
		case 2:
			ctx.moveTo(w2 + 25 + hOffset, h2 - 35 + vOffset);
			ctx.lineTo(w2 + 50 + hOffset, 25 + vOffset);
			ctx.moveTo(w2 + 30 + hOffset, 35 + vOffset);
			ctx.lineTo(w2 + 58 + hOffset, 40 + vOffset);
			ctx.moveTo(w2 + 28 + hOffset, 45 + vOffset);
			ctx.lineTo(w2 + 56 + hOffset, 50 + vOffset);
			break;
		case 3:
			ctx.moveTo(20 + hOffset, h2 - 35 + vOffset);
			ctx.lineTo(45 + hOffset, 25 + vOffset);
			ctx.moveTo(25 + hOffset, 35 + vOffset);
			ctx.lineTo(53 + hOffset, 40 + vOffset);
			ctx.moveTo(23 + hOffset, 45 + vOffset);
			ctx.lineTo(51 + hOffset, 50 + vOffset);
			ctx.moveTo(21 + hOffset, 55 + vOffset);
			ctx.lineTo(49 + hOffset, 60 + vOffset);
			break;
	}
	ctx.stroke();
}