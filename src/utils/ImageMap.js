function ImageMap(context, src, onLoad, mapping) {
	const img = new Image();
	img.src = src;
	img.onload = onLoad;
	
	this.context = context;
	this.image = img;
	this.mapping = mapping;
}

ImageMap.prototype.draw = function (tag, x, y) {
	const targetPosition = this.mapping[tag];
	this.context.drawImage(this.image,
		targetPosition.x*32, targetPosition.y*32,
		32, 32,
		x * 32, y * 32,
		32, 32
	);
};

export default ImageMap;