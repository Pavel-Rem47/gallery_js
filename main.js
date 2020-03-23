'use strict'

window.onload = function() {
	let arr = ['image/image_1.jpg', 'image/image_2.jpg', 'image/image_3.jpg', 'image/image_4.jpg', 'image/image_5.jpg', 'image/image_6.jpg', 'image/image_7.jpg']
	createFileList(arr);
    openFullscreen(arr);
	
}

function openFullscreen(arr) {
	let file = document.getElementsByClassName('file')
    
	for (let i=0; i<file.length; i++) {
		
		file[i].onclick = function(){
								fullscreen(arr, i);
							}
	}
}

function createFileList(arrlink) {
	let content = document.getElementsByClassName('main_block')[0];
	for (let i=0; i<arrlink.length; i++) {
		let div = document.createElement('div');
		div.className = 'file';
		div.style.width = '200px';
		div.style.height = '200px';
		div.style.backgroundImage = "url('"+ arrlink[i] + "')";
		content.appendChild(div);
	}
}

	
	//Создание картинки - передаем ссылку и блок куда вставляем
	function create_img (src, block) {
		let fullScr = document.getElementsByClassName('fullScrBlock')[0];
		let img = document.createElement('img');
		img.src = src;
		if (img.width > fullScr.clientWidth) {
			img.style.width = fullScr.clientWidth;
		}
		else {
			img.style.width = img.width;
		}
		if (img.height > fullScr.clientWidth) {
			img.style.height = fullScr.clientHeight;
		}
		else {
			img.style.height = img.height;
		}
		block.appendChild(img);
	}
	
	// Открытие фуллскрина, передаем ссылку на картинки
	function fullscreen(arr, fileopen) {
		
		let img_el = document.getElementsByTagName('img');
		
		//Создаем оверлей
		let overlayBlock = document.createElement('div');
		overlayBlock.className = 'overlay';
		document.body.appendChild(overlayBlock);
		let overlay = document.getElementsByClassName('overlay')[0];
		
		//Создаем блок для вставки контента и помещаем в блок оверлея
		let fullScrBlock = document.createElement('div');
		fullScrBlock.className = 'fullScrBlock';
		overlay.appendChild(fullScrBlock);
		let fullScr = document.getElementsByClassName('fullScrBlock')[0];
		
		//Создаем кнопку закрытия фуллскрина
		let closeBut = document.createElement('div');
		closeBut.className = 'closeBut';
		closeBut.innerHTML = '✖';
		overlay.appendChild(closeBut);
		let closeFullscr = document.getElementsByClassName('closeBut')[0];
		
		//Создаем стрелки
		let arrowRight = document.createElement('div');
		arrowRight.className = 'arrowRight';
		arrowRight.innerHTML = '⯈'
		arrowRight.style.marginLeft = fullScr.clientHeight -75;
		fullScr.appendChild(arrowRight);
		let arrowR = document.getElementsByClassName('arrowRight')[0];
		
		let arrowLeft = document.createElement('div');
		arrowLeft.className = 'arrowLeft';
		arrowLeft.innerHTML = '	⯇'
		fullScr.appendChild(arrowLeft);
		let arrowL = document.getElementsByClassName('arrowLeft')[0];
		
		//обработчик нажатия правой стрелки
		arrowR.onclick = function() {	
		
			let src = img_el[0].src;
			arr.forEach((item, index, array) => {
				
				if (src.includes(item) && index !=arr.length-1) {
					document.getElementsByTagName('img')[0].remove();
					create_img(arr[index + 1], fullScr);
					arrowL.style.visibility = 'visible';
				}
				else if (src.includes(arr[arr.length-2], fullScr)){
					arrowR.style.visibility = 'hidden';
				}
			});	
			
		}
		
		//обработчик нажатия левой стрелки
		arrowL.onclick = function() {
			
			let src = img_el[0].src;
			
			arr.forEach((item, index, array) => {
				
				if (src.includes(item) && index !=0) {
					document.getElementsByTagName('img')[0].remove();
					create_img(arr[index - 1], fullScr);
					arrowR.style.visibility = 'visible';
				}
				else if (src.includes(arr[1])){
					arrowL.style.visibility = 'hidden';
				}
			});	
		
	    }
		
		// Создаем картинку
		create_img(arr[fileopen], fullScr);	
		
		//Записываем ее ссылку в переменную
		let src = document.getElementsByTagName('img')[0].src;
		
		// Если открыта первая или последняя прячем стрелку
		if (src.includes(arr[0])){
			arrowL.style.visibility = 'hidden';
		}
		else if (src.includes(arr[arr.length-1])){
			arrowR.style.visibility = 'hidden';
		}
		
		// Закрытие фуллскрина по клику в оверлей
		overlay.onclick = function() {
			if (event.target == overlay || event.target == fullScr || event.target == closeFullscr) {
				overlay.remove();
			}
		}
    }