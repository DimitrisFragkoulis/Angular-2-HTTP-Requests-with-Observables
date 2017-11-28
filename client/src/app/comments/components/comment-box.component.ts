import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmitterService } from '../../emitter.service';
import { CommentService } from '../services/comment.service';

@Component({
    selector: 'comment-box',
    template: `
    <div class="panel panel-default">
    <div class="panel-heading">{{comment.author}}</div>
    <div class="panel-body">
        {{comment.text}}
    </div>
    <div class="panel-footer">
        <button class="btn btn-info" (click)="editComment()"><span class="glyphicon glyphicon-edit"></span></button>
        <button class="btn btn-danger" (click)="deleteComment(comment.id)"><span class="glyphicon glyphicon-remove"></span></button>
    </div>
</div>
    `
,
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