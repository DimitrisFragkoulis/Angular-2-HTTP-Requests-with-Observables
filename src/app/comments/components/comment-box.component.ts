import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Comment } from '../model/comment'
import { EmitterService } from '../../emitter.service';
import { CommentService } from '../services/comment.service';

@Component({
    selector: 'comment-box',
    template: `
       <!-- Removed for brevity 'ssake -->
    `

})
export class CommentBoxComponent { 

     constructor(
        private commentService: CommentService
        ){}

    @Input() comment: Comment;
    @Input() listId: string;
    @Input() editId:string;

    editComment() {
        EmitterService.get(this.editId).emit(this.comment);
    }

    deleteComment(id:string) {
        this.commentService.removeComment(id).subscribe(
                                comments => {
                                    EmitterService.get(this.listId).emit(comments);
                                }, 
                                err => {
                                    console.log(err);
                                });
    }
}