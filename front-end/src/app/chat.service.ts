import { ChatBubble, ChatBubbleText, ChatBubbleImage, ChatBubbleLoading, ChatBubbleOption } from './components/chatbubble/chatbubble.model'
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment'

@Injectable()

export class ChatService {

    public messages: Array<ChatBubbleText|ChatBubbleImage|ChatBubbleLoading|ChatBubbleOption> = [];
    private watsonObject: any;
    private url: string;
    public enableInput: boolean;
    navchange: EventEmitter<boolean> = new EventEmitter();
    public bubbles: EventEmitter<string> = new EventEmitter();

    constructor(private http: Http) {
        this.watsonObject = {};
        if(environment.production){
            this.getJSON().subscribe(data => {
            //console.log(data)
            const body = JSON.parse(data._body)
            this.url = body.url
            console.log(this.url)
            this.sendToWatson("");
            });
        }else{
            this.url = "http://localhost:3000"
            this.sendToWatson("");
        }
    }

    public getJSON(): Observable<any> {
        return this.http.get("../assets/back_config.json")
    }

    submitTextMessage(text: string, user: string) {
        if (text != "") {
            this.messages.push(new ChatBubbleText(user, text));
            this.bubbles.emit('Created')
            return this.messages[this.messages.length-1]
        }
        
    }
    submitOptiontMessage(options: Array<string>, title?: string) {
        if (options != []) {
            this.messages.push(new ChatBubbleOption(options, title));
            this.bubbles.emit('Created')
        }
    }

    submitImageMessage(url: string, user: string, title?:string, description?:string){
        if(url != ""){
                this.messages.push(new ChatBubbleImage(user, url, title, description))
                this.bubbles.emit('Created')
        }
    }

    submitLoadingMessage(delay:number, callback?:Promise<any>) {
        let chatbubble = new ChatBubbleLoading()
        this.messages.push(chatbubble)
        this.bubbles.emit('Created')
        if(delay > 0){
            if(callback) {
                return new Promise((resolve) => {
                    callback.then(()=>{
                            setTimeout(() => {
                                this.deleteMessage(chatbubble);
                                resolve()
                            }, delay);
                    })
                });
            }else{
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.deleteMessage(chatbubble);
                        resolve()
                    }, delay);
                });
            } 
        }else{
            if(callback){
                return new Promise((resolve) => {
                    callback.then(() => {
                        this.deleteMessage(chatbubble)
                        resolve()
                    })
                })
            }else{
                return
            }
        }
        
        
    }

    deleteMessage(bubble:ChatBubble){
        let index = this.messages.findIndex(serv => serv === bubble);
        this.messages.splice(index,1);
    }

    async sendToWatson(text: string) {
        this.submitTextMessage(text, "user");
        let watsonObject = this.watsonObject;
        let headers = new Headers();
        let body = {
            "input": {
                "text": text
            },
            "context": watsonObject.context
        }
        headers.append('Content-Type', 'application/json');
        this.submitLoadingMessage(0, new Promise((resolve_post)=>{
            this.http.post(this.url + '/api/v1/conversation', body, { headers: headers }).map(res => {
                //console.log(res)
                return res.json()})
            .toPromise().then(watsonObject => {
                //console.info("Resposta do assistant",watsonObject)
                this.iteractionOutputTextArray(watsonObject);
                resolve_post()
            }, error => {
                this.submitTextMessage("Desculpe, estou sem acesso ao servidor de back-end.", "watson");
                this.bubbles.emit('Finished')
                console.log(error);
                resolve_post()
            });
        }))
        
    }

    async iteractionOutputTextArray(watsonObject) {
        this.watsonObject = watsonObject;

        for (let i = 0; i < watsonObject.output.generic.length; i++) {
            const generic = watsonObject.output.generic[i];
            switch(generic.response_type){
                case 'text':
                    this.submitTextMessage(generic.text, 'watson')
                    break;
                case "option":
                    this.submitOptiontMessage( generic.options,generic.title)
                    break;
                case 'image':
                    this.submitImageMessage(generic.source, 'watson',generic.title,generic.description)
                    break;
                case 'pause':
                    await this.submitLoadingMessage(generic.time)
                default:
                    if(generic.text != undefined){
                        this.submitTextMessage(generic.text, 'watson')
                    }
                    else{
                    } 
            }
        }
        setTimeout(()=>{
            this.bubbles.emit('Finished')
        },100)
    }
}