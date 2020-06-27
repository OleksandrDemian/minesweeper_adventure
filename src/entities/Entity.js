class Entity {
	constructor ({ color, type, onClick, onOpen, img }) {
		this.color = color;
		this.type = type;
		this.shown = false;
		this.enemies = 0;
		
		this.onClick = onClick;
		this.onOpen = onOpen;
		this.img = img;
	}
	
	click(){
		this.onClick && this.onClick();
	}
	
	open(){
		this.onOpen && this.onOpen();
	}
}

export default Entity;