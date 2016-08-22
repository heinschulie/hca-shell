
export class Media {
    _id: string; 
    url: string; 
    economic_url: string;
    card_url: string;
    grid_url: string;
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
        //Decompose url 
        let urlArray = url.split('/upload');
        this.economic_url = urlArray[0] + '/upload/q_auto,f_auto,dpr_auto' + urlArray[1]; 
        this.card_url = urlArray[0] + '/upload/ar_16:9,c_fill,g_auto,q_auto,f_auto,dpr_auto' + urlArray[1]; 
        this.grid_url = urlArray[0] + '/upload/ar_1:1,c_fill,g_auto,q_auto,f_auto,dpr_auto' + urlArray[1]; 

        //Set properties 
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

    public static newInstance(media : any) : Media{
        return new Media(
                media._id,
                media.url,
                media.caption,
                media.owner,
                media.type,
                media.date,
                media.orientation,
                media.stereo,
                media.tags
            );
    }

    public static newArray(media : any[]) : Media[]{
        let newarray : Media[] = [];
        // media.forEach(m => {
        //     newarray.push(this.newInstance(m)); 
        // })
        
        // media.forEach(m => {
        //     let newMedia = this.newInstance(m); 
        //     newarray.push(newMedia); 
        // })

        media.forEach(amedia => {
            let newMedia = new Media(
                amedia._id,
                amedia.url,
                amedia.caption,
                amedia.owner,
                amedia.type,
                amedia.date,
                amedia.orientation,
                amedia.stereo,
                amedia.tags
            ); 
            newarray.push(newMedia); 
        })
        return newarray; 
    }
}
