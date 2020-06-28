class Entity {
	constructor ({ color, type, onClick, onOpen, img, data }) {
		this.color = color;
		this.type = type;
		this.shown = false;
		this.enemies = 0;
		
		this.onClick = onClick;
		this.onOpen = onOpen;
		this.img = img;
		this.enabled = true;
		
		this.data = data;
	}
	
	click(){
		this.onClick && this.onClick();
	}
	
	open(){
		this.onOpen && this.onOpen();
	}
	
	enable(action = true){
		this.enabled = action;
	}
}

export default Entity;