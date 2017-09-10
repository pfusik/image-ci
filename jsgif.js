function gif2canvas(input)
{
	var decoder = new GifDecoder();
	try {
		decoder.decode(input, input.length);
	} catch (e) {
		alert(e);
		return;
	}

	var canvas = document.getElementById("canvas");
	var width = decoder.getWidth();
	var height = decoder.getHeight();
	var palette = decoder.getPalette();
	var pixels = decoder.getPixels();
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext("2d");
	var imageData = context.createImageData(width, height);
	for (var i = 0; i < width * height; i++) {
		var rgb = palette[pixels[i]];
		var j = i << 2;
		imageData.data[j] = rgb >> 16;
		imageData.data[j + 1] = rgb >> 8 & 0xff;
		imageData.data[j + 2] = rgb & 0xff;
		imageData.data[j + 3] = 0xff;
	}
	context.putImageData(imageData, 0, 0);

	var status = document.getElementById("status");
	status.innerHTML = width + "x" + height;
}

function openFile(file)
{
	var reader = new FileReader();
	reader.onload = function (e) {
		gif2canvas(new Uint8Array(e.target.result));
	};
	reader.readAsArrayBuffer(file);
}

function dragHelper(e)
{
	e.stopPropagation();
	e.preventDefault();
}

function onDrop(e)
{
	dragHelper(e);
	openFile(e.dataTransfer.files[0]);
}