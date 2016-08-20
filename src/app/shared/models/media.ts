
export class Media {
    _id: string; 
    url: string;
	caption: string;
	owner: string;
	type: string;
    date: Date; 
    orientation: string;
    stereo: boolean; 
    tags: string[];  

    constructor(_id: string,
                url: string,
                caption: string,
	            owner: string,
	            type: string,
                date: Date,
                orientation: string,
                stereo: boolean,
                tags: string[]){
        this._id = _id; 
        this.url = url;
        this.caption = caption;
        this.owner = owner;
        this.type = type;
        this.date = date;
        this.orientation = orientation;
        this.stereo = stereo; 
        this.tags = tags; 
    }

    public static returnNewEmptyInstance() : Media  {
        let newMedia = new Media('', '', '', '', '', new Date(), '', false, []); 
        return newMedia; 
    } 
}
