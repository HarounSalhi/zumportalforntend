import { type } from "os";
import { User } from "./auth.models";

export class Dayoff {
    id?:number;
    position:string;
    nbdays:number;
    type:string;
    createdate:Date;
    startdate:Date;
    returndate:Date;
    backupperson?:User;
    motif:string;
    creator:User;
    status:string;

    constructor(){
        this.id=0;
        this.position='';
        this.nbdays=0;
        this.type='';
        this.createdate=null;
        this.startdate=null;
        this.returndate=null;
        this.backupperson={ id:0 ,firstname:'',lastname: '', email:'', role:''};;
        this.motif='';
        this.creator={ id:0 ,firstname:'',lastname: '', email:'', role:''};;
        this.status='';
    }
}