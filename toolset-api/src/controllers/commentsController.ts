import { injectable } from 'inversify';
import { ControllerActionType } from '@/models/types/controllerRequest';
import { BadRequestResponse, OkResponse } from '@/models/types/controllerResponses';

type PathCommentId = {
    commentId: string;
};

@injectable()
export default class CommentsController {
    public likeComment(): ControllerActionType<OkResponse | BadRequestResponse, undefined, PathCommentId> {
        return async (req) => {

            return {
                statusCode: 200,
            };
        };
    }

    public unlikeComment(): ControllerActionType<OkResponse | BadRequestResponse, undefined, PathCommentId> {
        return async (req) => {

            return {
                statusCode: 200,
            };
        };
    }
}
