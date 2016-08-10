export class Property {
    _id: string; 
    address: string;
	featured: boolean;
	published: Date;
	bedrooms: number;
    cost: number; 
    image: string;
    floorarea: number; 
    
    constructor(_id: string,
                address: string,
	            featured: boolean,
	            published: Date,
	            bedrooms: number,
	            cost: number,
	            image: string,
	            floorarea: number){
        this._id = _id; 
        this.address = address;
        this.published = published;
        this.bedrooms = bedrooms;
        this.cost = cost;
        this.image = image;
        this.floorarea = floorarea;
    }
}
