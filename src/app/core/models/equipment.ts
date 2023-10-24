import { User } from "./auth.models";

export class Equipment{
    id?:number;
    name:string;
    equipment:string;
    purpose:string;
    creator:User;
    createdate:Date;
    startdate:Date;
    enddate:Date;
    status:string;

    constructor(){
        this.id=0;
        this.name='';
        this.equipment='';
        this.purpose='';
        this.creator={id:0 ,firstname:'',lastname: '', email:'', role:''};
        this.createdate=null;
        this.startdate=null;
        this.enddate=null;
        this.status='';
    }
}