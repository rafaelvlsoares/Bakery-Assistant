import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
 
import { ModalService } from '../../modal.service';
import { Modal } from './modal.model';
 
@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
 
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;
    public modalmodel: Modal;
 
    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
        this.modalmodel =  new Modal("","null")
    }
 
    ngOnInit() : void {
        let modal = this;
 
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
 
        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        //this.element.nativeElement.par.appendChild(this.element);
 
        // close modal on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'jw-modal') {
                modal.close();
            }
        });
 
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }
 
    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }
 
    // open modal
    open(): void {
        this.element.style.display = 'block';
        this.element.parentElement.classList.add('jw-modal-open');
    }
 
    // close modal
    close(): void {
        this.element.style.display = 'none';
        this.element.parentElement.classList.remove('jw-modal-open');
    }

    setModel(modalmodel: Modal): void {
        this.modalmodel = modalmodel;
    }
}