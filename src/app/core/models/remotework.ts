import { User } from "./auth.models";

export class Remotework{
    id?:number;
    name:string;
    position:string;
    nbdays:number;
    createdate:Date;
    startdate:Date;
    returndate:Date;
    motif:string;
    creator:User;
    status:string;

    constructor(){
        this.id=0;
        this.name='';
        this.position='';
        this.nbdays=0;
        this.createdate=null;
        this.startdate=null;
        this.returndate=null;
        this.motif='';
        this.creator={ id:0 ,firstname:'',lastname: '', email:'', role:''};        ;
        this.status='';
    }
}