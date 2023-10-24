import { User } from "src/app/core/models/auth.models";

export class Dayoff {
    // id?:number;
    name:string;
    position:string;
    nbdays:any;
    type:any;
    createdate:any;
    startdate:any;
    returndate:any;
    backupperson?:any;
    motif:string;
    creator:any;
    status?:any;
    constructor(){
        // this.id=0;
        this.name=null;
        this.position=null;
        this.nbdays=0;
        this.type=null;
        this.createdate=null;
        this.startdate=null;
        this.returndate=null;
        this.motif=null;
        this.creator=null;
        this.status=null;
    }
}













