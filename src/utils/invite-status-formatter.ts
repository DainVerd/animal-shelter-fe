import InviteStatus from "../enums/invite-status";

const InviteStatusDisplayMap = new Map<number, string>([
  [InviteStatus.Accepted, "Accepted"],
  [InviteStatus.Expired, "Expired"],
  [InviteStatus.Pending, "Pending"],
  [InviteStatus.Revoked, "Revoked"],
]);

export const formatInviteStatusName = (
  inviteStatus: number | null | undefined,
): string => {
  if (!inviteStatus && inviteStatus !== 0) return "No Status";

  return InviteStatusDisplayMap.get(inviteStatus) || inviteStatus.toString();
};

export const getStatusColor = (status: InviteStatus): string => {
  switch (status) {
    case InviteStatus.Pending:
      return "warning";

    case InviteStatus.Accepted:
      return "success";

    case InviteStatus.Expired:
      return "error";

    case InviteStatus.Revoked:
      return "grey";

    default:
      return "grey";
  }
};

export const getStatusIcon = (status: InviteStatus): string => {
  switch (status) {
    case InviteStatus.Pending:
      return "mdi-clock-outline";

    case InviteStatus.Accepted:
      return "mdi-check-circle-outline";

    case InviteStatus.Expired:
      return "mdi-clock-alert-outline";

    case InviteStatus.Revoked:
      return "mdi-close-circle-outline";

    default:
      return "mdi-help-circle-outline";
  }
};
