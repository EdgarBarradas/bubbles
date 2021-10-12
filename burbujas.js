var circulos=[];
var seq=0;
var fill_obj;
var t_creacion=1000;
var circulos_iniciales=3;
var juego_activo=false;
var audio_pop=new Audio("pop.wav");
var audio_crear=new Audio("create.wav");

window.onload=inicio_window;
window.onresize=screen_size;


function inicio_window(){
	alert("Explota todas las burbujas");
	screen_size();
	/*-------------Creación de Gradiente para pintar las burbujas---------------*/
	fill_obj=document.createElement("radialGradient");
	fill_obj.setAttribute("id","fill_id");
	fill_obj.setAttribute("cx","0.5");
	fill_obj.setAttribute("cy","0.5");
	fill_obj.setAttribute("r","1");
	fill_obj.setAttribute("fx","0.6");
	fill_obj.setAttribute("fy","0.3");
	document.getElementById("root_svg").appendChild(fill_obj);
	let stop_0=document.createElement("stop");
	stop_0.setAttribute("offset","0%");
	stop_0.setAttribute("stop-color","#6699CC00");
	let stop_1=document.createElement("stop");
	stop_1.setAttribute("offset","100%");
	stop_1.setAttribute("stop-color","#3366FFFF");
	document.getElementById("fill_id").appendChild(stop_0);
	document.getElementById("fill_id").appendChild(stop_1);
	/*---------------Creación de los círculos iniciales---------------------------*/
	juego_activo=true;
	for (let i=0;i<circulos_iniciales;i++){
		crear();
	}
	/*----------------------------------------------------------------------------*/
}


function crear(){
	if (juego_activo==true){
		let alto=window.innerHeight;
		let ancho=window.innerWidth;
		let rcx=Math.round(Math.random()*ancho);
		let rcy=Math.round(Math.random()*alto);
		let rr=Math.round(Math.random()*190)+10;
 		let new_circulo_id="c"+seq;
 		var new_circulo=document.createElement("circle");
 		new_circulo.setAttribute("id",new_circulo_id);
 		new_circulo.setAttribute("class","circulo");
 		new_circulo.setAttribute("cx",rcx);
 		new_circulo.setAttribute("cy",rcy);
 		new_circulo.setAttribute("r",rr);
 		new_circulo.setAttribute("fill","url(#fill_id)");
 		new_circulo.setAttribute("onclick","clicked(event)");
 		document.getElementById("root_svg").appendChild(new_circulo);
 		document.getElementById("root_svg").innerHTML += "";
 		circulos.push(new_circulo_id);
 		seq=seq+1;
 		audio_crear.play();
	}
}

function screen_size() {
	let alto=window.innerHeight;
	let ancho=window.innerWidth;
	document.getElementById("root_svg").setAttribute("width",ancho);
	document.getElementById("root_svg").setAttribute("height",alto);
}

setInterval(function(){crear();},t_creacion);

function clicked(event){/*----------para explotar burbujas---------------*/
	delete circulos.splice([(circulos.indexOf(event.target.id)+1)],1);
	document.getElementById(event.target.id).remove();
	audio_pop.play();
	if (document.getElementsByClassName("circulo").length==0){
		juego_activo=false;
		setTimeout(final,10);
	}
}

function final(){
	if (document.getElementsByClassName("circulo").length==0){alert("Muy bien");}
	else {juego_activo=true;}
}

function mostrar_menu(){
	alert("menu");
}
