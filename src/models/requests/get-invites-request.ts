import type InviteStatus from "../../enums/invite-status";
import type PaginationParamsRequest from "./pagination-params-request";

export interface GetInvitesRequest extends PaginationParamsRequest {
  emailSearchText?: string;
  roleInclude?: string;
  status?: InviteStatus;
}

export default GetInvitesRequest;
