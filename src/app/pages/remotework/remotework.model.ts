import { User } from "src/app/core/models/auth.models";

export class Remotework {
    id?:number;
    name:string;
    position:string;
    nbdays:number;
    createdate:any;
    creator?:any;
    startdate:any;
    returndate:any;
    motif:any;
    status?:any;
  remotework_plans: any;
    constructor(){
        this.id=0;
        this.name='';
        this.position='';
        this.nbdays=0;
        this.createdate=null;
        this.startdate=null;
        this.returndate=null;
        this.creator=null;
        this.motif='';
        this.status='';
        this.remotework_plans=null;
    }
}













