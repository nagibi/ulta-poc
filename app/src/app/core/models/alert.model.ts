export enum AlertType{
    PRIMARY= "alert-primary",
    WARNING= "alert-warning ",
    SECONDARY= "alert-secondary ",
    DANGER= "alert-primary",
    INFO= "alert-info ",
    SUCCESS= "alert-success",
    DARK= "alert-dark",
    LIGHT= "alert-light ",
}

export class Alert {
    type:AlertType;
    text:string;
    icon?:any;
    timeClose?:number;

    constructor(text:string, type:AlertType, icon?:any, timeClose?:number){
        this.type = type
        this.text = text
        this.icon = icon
        this.timeClose = timeClose;
    }
}

