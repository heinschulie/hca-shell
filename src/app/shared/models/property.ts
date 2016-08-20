import { Media } from './media';

export class Property {
    _id: string; 
    address: string;
	featured: boolean;
	published: Date;
	bedrooms: number;
    cost: number; 
    featuredimage: Media;
    floorarea: number;
    marketstatus: string;
    webreference: string; 
    
    constructor(_id: string,
                address: string,
	            featured: boolean,
	            published: Date,
	            bedrooms: number,
	            cost: number,
	            featuredimage: Media,
	            floorarea: number,
	            marketstatus: string,
	            webreference: string){
        this._id = _id; 
        this.address = address;
        this.featured = featured;
        this.published = published;
        this.bedrooms = bedrooms;
        this.cost = cost;
        this.featuredimage = featuredimage;
        this.floorarea = floorarea;
        this.marketstatus = marketstatus;
        this.webreference = webreference;
    }

    public static returnNewEmptyInstance() : Property  {
        let newMedia = Media.returnNewEmptyInstance(); 
        let newProperty = new Property('', '', false, new Date(), 0, 0, newMedia, 0, '', ''); 
        return newProperty; 
    }  
}

