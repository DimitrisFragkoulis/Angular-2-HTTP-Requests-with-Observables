import { Component, EventEmitter, Input, OnChanges } from '@angular/core';
import { NgForm }    from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { CommentService } from '../../services/comment.service';
import { EmitterService } from '../../../emitter.service';


@Component({
    selector: 'comment-form',
    template: `
       <!-- Removed for brevity, included above -->
    `
})
export class CommentFormComponent implements OnChanges { 
    constructor(
        private commentService: CommentService
        ){}
    private model = new Comment(new Date(), '', '');
    private editing = false;

     @Input() editId: string;
     @Input() listId: string;

    submitComment(){
        let commentOperation:Observable<Comment[]>;

        if(!this.editing){
            commentOperation = this.commentService.addComment(this.model)
        } else {
             commentOperation = this.commentService.updateComment(this.model)
        }

        commentOperation.subscribe(
                                comments => {
                                    EmitterService.get(this.listId).emit(comments);
                                    this.model = new Comment(new Date(), '', '');
                                    if(this.editing) this.editing = !this.editing;
                                }, 
                                err => {
                                    console.log(err);
                                });
    }

    ngOnChanges() {
        EmitterService.get(this.editId).subscribe((comment:Comment) => {
            this.model = comment
            this.editing = true;
        });
    }
 }