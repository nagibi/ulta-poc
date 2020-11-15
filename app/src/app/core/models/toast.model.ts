export enum ToastType{
    SUCESS= "toast-success",
    PRIMARY= "toast-primary",
    WARNING= "toast-warning ",
    SECONDARY= "toast-secondary ",
    ERROR= "toast-error",
    INFO= "toast-info ",
    SUCCESS= "toast-success",
    DARK= "toast-dark",
    LIGHT= "toast-light ",
}

export class Toast {
    type:ToastType;
    text:string;
    title?:string;
    icon?:any;
    timeClose?:number;

    constructor(text:string, type:ToastType, title?:string, icon?:any, timeClose?:number){
        this.type = type;
        this.text = text;
        this.title = title;
        this.icon = icon;
        this.timeClose = timeClose;
    }
}

