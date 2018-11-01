export class ChatBubble {

    public user: string;
    public type: string;

    constructor(user: string, type: string) {
        this.user = user;
        this.type = type;
    }


}

export class ChatBubbleText extends ChatBubble {
    public text: string;

    constructor(user: string, text: string) {
        super(user, 'text');
        this.text = text;
    }
}

export class ChatBubbleImage extends ChatBubble {
    public url: string;
    public title: string
    public description: string

    constructor(user: string, url: string, title?: string,description?:string) {
        super(user, 'image');
        this.url = url;
        if (title) this.title = title
        if (description) this.description = description
    }
}

export class ChatBubbleLoading extends ChatBubble {
    public url: string;

    constructor(){
        super("watson", 'loading');
        this.url = 'assets/loading4.gif';
    }
}

export class ChatBubbleOption extends ChatBubble {
    public title: string;
    public options: Array<string>;

    constructor(options: Array<string>,title?:string) {
        super("watson", 'option');
        this.options = options
        this.title = title
    }
}