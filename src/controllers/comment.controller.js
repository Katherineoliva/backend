import { saveComment } from "../services/comment.service.js";
import { commentErrorCodes } from "../utils/errorCodes/comment.errorCodes.js";
import { toggleComments } from "../services/undertaking.service.js";
import { undertakingErrorCodes } from "../utils/errorCodes/undertaking.errorCodes.js";
import createError from "http-errors";

export const createCommentController = async (req, res, next) => {
    try{
        const comment=req.body;
        const newComment = await saveComment(comment);
        await toggleComments(newComment.undertakingId, newComment._id);
        res.status(201).json(newComment);
    }catch(e){
        switch(e.code){
            case commentErrorCodes.COMMENT_NOT_CREATED:
                next(createError(500, "Comment not created"));
                break;
            case commentErrorCodes.COMMENT_NOT_FOUND:
                next(createError(404, "Comment not created"));
                break;
            case undertakingErrorCodes.UNDERTAKING_ERROR:
                next(createError(404, "Error save comment"));
                break;
            default:
                next(e);
        }
    }
}